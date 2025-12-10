"use client";

import { useState, useEffect } from "react";
import { Comment, CommentFormData } from "@/types/comment";
import { storage } from "@/lib/storage";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { uploadAvatar } from "@/lib/avatar-upload";
import PresenceSelector from "./PresenceSelector";
import { AnimatedCheckIcon, AnimatedCrossIcon } from "./AnimatedIcons";
import CommentSkeleton from "./CommentSkeleton";

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    presence: 1,
    comment: "",
    group: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0); // Total comments in DB
  const [showToast, setShowToast] = useState(false); // Success toast
  const [likingIds, setLikingIds] = useState<Set<string>>(new Set()); // Prevent like spam

  // Fetch comments on mount
  useEffect(() => {
    fetchComments(1, true);

    // Detect subdomain for group
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      if (parts.length > 2) {
        // e.g., irkon.trypss.xyz -> irkon
        // ignore 'www'
        if (parts[0] !== "www") {
          setFormData((prev) => ({ ...prev, group: parts[0] }));
        }
      }
    }
  }, []);

  // Realtime subscription for new comments
  useEffect(() => {
    console.log("Setting up realtime subscription...");

    const channel = supabase
      .channel("comments-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("New comment received:", payload.new);
          const newComment = payload.new as Comment;

          // Add isLiked property based on localStorage
          const commentWithLiked = {
            ...newComment,
            isLiked: storage.isLiked(newComment.id),
          };

          // Add to top of comments list
          setComments((prev) => [commentWithLiked, ...prev]);

          // Show notification (optional)
          if (typeof window !== "undefined" && "Notification" in window) {
            if (Notification.permission === "granted") {
              new Notification("Ucapan Baru!", {
                body: `${newComment.name}: ${newComment.comment.substring(
                  0,
                  50
                )}...`,
                icon: "/favicon.ico",
              });
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up realtime subscription...");
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchComments = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);

      // Check cache first
      if (pageNum === 1 && !storage.shouldRefetch()) {
        const cached = storage.getComments();
        if (cached.length > 0) {
          setComments(markLikedComments(cached));
          setLoading(false);
          return;
        }
      }

      const response = await fetch(`/api/comments?page=${pageNum}&limit=10`);
      const result = await response.json();

      if (result.success) {
        const newComments = markLikedComments(result.data);

        if (reset) {
          setComments(newComments);
          storage.setComments(result.data);
        } else {
          setComments((prev) => [...prev, ...newComments]);
        }

        setHasMore(pageNum < result.pagination.totalPages);
        setTotalCount(result.pagination.total); // Set total count from API
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      // Load from cache on error
      const cached = storage.getComments();
      if (cached.length > 0) {
        setComments(markLikedComments(cached));
      }
    } finally {
      setLoading(false);
    }
  };

  const markLikedComments = (comments: Comment[]): Comment[] => {
    return comments.map((comment) => ({
      ...comment,
      isLiked: storage.isLiked(comment.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      console.log("Submitting comment:", formData);

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", { status: response.status, result });

      if (result.success) {
        // Reset form (preserve group)
        setFormData((prev) => ({
          ...prev,
          name: "",
          presence: 1,
          comment: "",
          avatar_url: undefined, // Reset avatar
        }));

        // Reset avatar preview
        setAvatarPreview(null);

        // Reset textarea height
        const textarea = document.querySelector("textarea");
        if (textarea) {
          textarea.style.height = "auto";
        }

        // Invalidate cache to force fresh fetch
        storage.invalidateCache();

        // Don't refetch - let realtime handle the new comment
        //await fetchComments(1, true); // Removed to prevent duplicate
        setPage(1);

        // Show success toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        // Increment total count
        setTotalCount((prev) => prev + 1);

        // Scroll to top where new comment will appear
        setTimeout(() => {
          document.getElementById("comments-list")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 500);
      } else {
        const errorMessages = result.errors || [
          result.error || "Gagal mengirim komentar",
        ];
        console.error("Submission failed:", errorMessages);
        setErrors(errorMessages);
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setErrors(["Gagal mengirim komentar. Coba lagi nanti."]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    // Prevent spam - check if already liking
    if (likingIds.has(commentId)) return;

    // Add to liking set
    setLikingIds((prev) => new Set(prev).add(commentId));

    // Optimistic update
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1, isLiked: true }
          : comment
      )
    );

    storage.addLikedComment(commentId);

    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
      });

      const result = await response.json();

      if (!result.success) {
        // Revert on error
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, likes: comment.likes - 1, isLiked: false }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Failed to like comment:", error);
    } finally {
      // Remove from liking set
      setLikingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  return (
    <section className="bg-section pb-2" id="comment">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-5 duration-300">
          <i className="fa-solid fa-check-circle text-xl"></i>
          <span className="font-medium">Ucapan berhasil dikirim!</span>
        </div>
      )}

      <div className="mx-auto px-4">
        <div className="rounded-3xl shadow-xl p-6 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-gray-800">
          <h2 className="font-esthetic text-center py-2 m-0 text-4xl text-gray-900 dark:text-gray-100 mb-3">
            Doa &amp; Ucapan
          </h2>

          {/* Comments List */}
          <div className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <i className="fa-solid fa-book-open mr-2"></i>
              <span id="count-comment">{totalCount}</span> Ucapan
            </p>

            {loading && comments.length === 0 ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <CommentSkeleton key={i} />
                ))}
              </div>
            ) : comments.length === 0 ? (
              // Enhanced empty state
              <div className="text-center py-12 px-4">
                <i className="fa-regular fa-comments text-6xl text-gray-300 dark:text-gray-600 mb-4 block"></i>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Belum ada ucapan & doa
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Jadilah yang pertama memberikan ucapan! 💝
                </p>
              </div>
            ) : (
              <>
                <div
                  id="comments-list"
                  className="space-y-4 max-h-[500px] overflow-y-auto px-2 custom-scrollbar"
                >
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>

                      <div className="flex gap-2 mb-1">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              comment.avatar_url ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                comment.name
                              )}&background=random&size=40`
                            }
                            alt={comment.name}
                            className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 object-cover"
                            onError={(e) => {
                              // Fallback to ui-avatars if upload failed
                              (
                                e.target as HTMLImageElement
                              ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                comment.name
                              )}&background=random&size=40`;
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex-1 min-w-0">
                              <h6 className="font-bold text-sm text-gray-800 dark:text-gray-100 flex items-center gap-2 flex-wrap">
                                {comment.name}
                                {comment.group && (
                                  <span className="text-xs font-medium text-blue-600 dark:text-blue-100 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
                                    {comment.group}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  {comment.presence === 1 ? (
                                    <i className="fa-solid fa-check text-green-500"></i>
                                  ) : (
                                    <i className="fa-solid fa-xmark text-red-500"></i>
                                  )}
                                </span>
                              </h6>
                              <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                                {formatRelativeTime(comment.created_at)}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                !comment.isLiked && handleLike(comment.id)
                              }
                              disabled={comment.isLiked}
                              className={`flex items-center gap-1 text-xs transition-colors self-start ${
                                comment.isLiked
                                  ? "text-pink-500 cursor-default"
                                  : "text-gray-400 hover:text-pink-500"
                              }`}
                            >
                              <i
                                className={`fa-${
                                  comment.isLiked ? "solid" : "regular"
                                } fa-heart`}
                              ></i>
                              <span className="text-xs">{comment.likes}</span>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-3 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          Memuat...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-chevron-down mr-2"></i>
                          Muat Lebih Banyak
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Form - Moved to Bottom */}
          <form onSubmit={handleSubmit} className="mt-6">
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                {errors.map((error, i) => (
                  <p
                    key={i}
                    className="text-sm text-red-600 dark:text-red-400 mb-0"
                  >
                    {error}
                  </p>
                ))}
              </div>
            )}

            {/* Identity Section (Name & Presence) - Compact */}
            <div className="flex flex-col md:flex-row gap-2 mb-3">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
                  placeholder="Nama Kamu"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={100}
                  required
                />
              </div>
              <div className="flex-shrink-0">
                <PresenceSelector
                  value={formData.presence}
                  onChange={(val) =>
                    setFormData({ ...formData, presence: val })
                  }
                />
              </div>
            </div>

            {/* Telegram Style Chat Bar */}
            <div className="flex items-end gap-2 bg-gray-100 dark:bg-[#212529] p-1 rounded-[2rem] shadow-inner border border-gray-200 dark:border-gray-700">
              {/* Avatar Upload */}
              <div className="relative flex-shrink-0">
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  disabled={uploadingAvatar}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    try {
                      setUploadingAvatar(true);

                      // Upload to Supabase Storage
                      const userId = `user-${Date.now()}`;
                      const avatarUrl = await uploadAvatar(file, userId);

                      if (avatarUrl) {
                        // Set preview and form data
                        setAvatarPreview(avatarUrl);
                        setFormData((prev) => ({
                          ...prev,
                          avatar_url: avatarUrl,
                        }));
                      } else {
                        setErrors(["Gagal upload avatar. Coba lagi."]);
                      }
                    } catch (error) {
                      console.error("Avatar upload error:", error);
                      setErrors(["Gagal upload avatar. Coba lagi."]);
                    } finally {
                      setUploadingAvatar(false);
                    }
                  }}
                />
                <label
                  htmlFor="avatar-upload"
                  className="block w-9 h-9 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-gray-300 dark:bg-gray-700 flex items-center justify-center relative"
                >
                  {uploadingAvatar ? (
                    <i className="fa-solid fa-spinner fa-spin text-white text-xs"></i>
                  ) : (
                    <>
                      <img
                        src={
                          avatarPreview ||
                          "https://ui-avatars.com/api/?name=Guest&background=random"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://ui-avatars.com/api/?name=Guest&background=random";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                        <i className="fa-solid fa-camera text-white text-xs"></i>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Text Input */}
              <div className="flex-1 min-w-0 py-1">
                <textarea
                  className="w-full bg-transparent border-0 p-0 text-sm text-gray-900 dark:text-gray-100 focus:ring-0 focus:outline-none outline-none placeholder-gray-500 dark:placeholder-gray-400 resize-none leading-relaxed max-h-32 overflow-y-auto"
                  rows={1}
                  placeholder="Tulis pesan..."
                  value={formData.comment}
                  onFocus={(e) => {
                    // Auto-scroll to make sure input is visible above keyboard
                    setTimeout(() => {
                      e.target.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }, 300);
                  }}
                  onChange={(e) => {
                    setFormData({ ...formData, comment: e.target.value });
                    // Auto-resize
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  maxLength={500}
                  required
                ></textarea>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={
                  submitting ||
                  !formData.comment.trim() ||
                  formData.comment.trim().length < 10
                }
                className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                ) : (
                  <i className="fa-solid fa-paper-plane text-sm md:text-base ml-[-2px] mt-[1px]"></i>
                )}
              </button>
            </div>

            <div className="flex justify-between items-center mt-2 px-1">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                unggah profile kamu dan kirim ucapanmu
              </p>
              <p
                className={`text-xs ${
                  formData.comment.trim().length < 10
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {formData.comment.trim().length < 10
                  ? `Minimal ${
                      10 - formData.comment.trim().length
                    } karakter lagi`
                  : `${formData.comment.trim().length}/500`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
