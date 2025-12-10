'use client'

import { useState, useEffect } from 'react'
import { Comment, CommentFormData } from '@/types/comment'
import { storage } from '@/lib/storage'
import { formatRelativeTime } from '@/lib/utils'

export default function CommentSection() {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [formData, setFormData] = useState<CommentFormData>({
        name: '',
        presence: 1,
        comment: '',
    })
    const [errors, setErrors] = useState<string[]>([])

    // Fetch comments on mount
    useEffect(() => {
        fetchComments(1, true)
    }, [])

    const fetchComments = async (pageNum: number, reset = false) => {
        try {
            setLoading(true)

            // Check cache first
            if (pageNum === 1 && !storage.shouldRefetch()) {
                const cached = storage.getComments()
                if (cached.length > 0) {
                    setComments(markLikedComments(cached))
                    setLoading(false)
                    return
                }
            }

            const response = await fetch(`/api/comments?page=${pageNum}&limit=10`)
            const result = await response.json()

            if (result.success) {
                const newComments = markLikedComments(result.data)

                if (reset) {
                    setComments(newComments)
                    storage.setComments(result.data)
                } else {
                    setComments(prev => [...prev, ...newComments])
                }

                setHasMore(pageNum < result.pagination.totalPages)
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error)
            // Load from cache on error
            const cached = storage.getComments()
            if (cached.length > 0) {
                setComments(markLikedComments(cached))
            }
        } finally {
            setLoading(false)
        }
    }

    const markLikedComments = (comments: Comment[]): Comment[] => {
        return comments.map(comment => ({
            ...comment,
            isLiked: storage.isLiked(comment.id),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors([])
        setSubmitting(true)

        try {
            console.log('Submitting comment:', formData)

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const result = await response.json()
            console.log('API Response:', { status: response.status, result })

            if (result.success) {
                // Reset form
                setFormData({ name: '', presence: 1, comment: '' })

                // Invalidate cache to force fresh fetch
                storage.invalidateCache()

                // Refresh comments
                await fetchComments(1, true)
                setPage(1)

                // Scroll to comments
                document.getElementById('comments-list')?.scrollIntoView({
                    behavior: 'smooth'
                })
            } else {
                const errorMessages = result.errors || [result.error || 'Gagal mengirim komentar']
                console.error('Submission failed:', errorMessages)
                setErrors(errorMessages)
            }
        } catch (error) {
            console.error('Failed to submit comment:', error)
            setErrors(['Gagal mengirim komentar. Coba lagi nanti.'])
        } finally {
            setSubmitting(false)
        }
    }

    const handleLike = async (commentId: string) => {
        // Optimistic update
        setComments(prev =>
            prev.map(comment =>
                comment.id === commentId
                    ? { ...comment, likes: comment.likes + 1, isLiked: true }
                    : comment
            )
        )

        storage.addLikedComment(commentId)

        try {
            const response = await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST',
            })

            const result = await response.json()

            if (!result.success) {
                // Revert on error
                setComments(prev =>
                    prev.map(comment =>
                        comment.id === commentId
                            ? { ...comment, likes: comment.likes - 1, isLiked: false }
                            : comment
                    )
                )
            }
        } catch (error) {
            console.error('Failed to like comment:', error)
        }
    }

    const loadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchComments(nextPage)
    }

    return (
        <section className="bg-section pb-2" id="comment">
            <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-[#f8f9fa] dark:bg-[#343a40]">
                    <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Ucapan &amp; Doa</h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {errors.length > 0 && (
                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                                {errors.map((error, i) => (
                                    <p key={i} className="text-sm text-red-600 dark:text-red-400 mb-0">
                                        {error}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="mt-3">
                            <label htmlFor="form-name" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                                <i className="fa-solid fa-user mr-2"></i>Nama
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-[#212529] text-gray-900 dark:text-gray-100"
                                id="form-name"
                                placeholder="Isikan Nama Anda"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label htmlFor="form-presence" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                                <i className="fa-solid fa-circle-check mr-2"></i>Presensi
                            </label>
                            <select
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-[#212529] text-gray-900 dark:text-gray-100"
                                id="form-presence"
                                value={formData.presence}
                                onChange={(e) => setFormData({ ...formData, presence: parseInt(e.target.value) as 1 | 2 })}
                            >
                                <option value="1">✅ Datang</option>
                                <option value="2">❌ Berhalangan</option>
                            </select>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="form-comment" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                                <i className="fa-solid fa-comment mr-2"></i>Ucapan &amp; Doa
                            </label>
                            <textarea
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-[#212529] text-gray-900 dark:text-gray-100"
                                id="form-comment"
                                rows={4}
                                placeholder="Berikan Ucapan & Doa"
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                maxLength={500}
                                required
                            ></textarea>
                        </div>

                        <div className="mt-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-gray-900 dark:bg-gray-700 text-white rounded-2xl py-2 text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-paper-plane mr-2"></i>Send
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <i className="fa-solid fa-book-open mr-2"></i>
                            <span id="count-comment">{comments.length}</span> Ucapan
                        </p>

                        {loading && comments.length === 0 ? (
                            <div className="text-center py-8">
                                <i className="fa-solid fa-spinner fa-spin text-2xl text-gray-400"></i>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Memuat ucapan...</p>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="text-center py-8">
                                <i className="fa-regular fa-comment text-4xl text-gray-300 dark:text-gray-600"></i>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Belum ada ucapan</p>
                            </div>
                        ) : (
                            <>
                                <div id="comments-list" className="space-y-3 max-h-96 overflow-y-auto">
                                    {comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="shadow-lg rounded-2xl p-3 border border-gray-300 dark:border-gray-600"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h6 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">
                                                        {comment.name}
                                                        <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                                                            {comment.presence === 1 ? '✅ Hadir' : '❌ Berhalangan'}
                                                        </span>
                                                    </h6>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatRelativeTime(comment.created_at)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => !comment.isLiked && handleLike(comment.id)}
                                                    disabled={comment.isLiked}
                                                    className={`flex items-center gap-1 text-xs transition-colors ${comment.isLiked
                                                        ? 'text-pink-500 cursor-default'
                                                        : 'text-gray-400 hover:text-pink-500'
                                                        }`}
                                                >
                                                    <i className={`fa-${comment.isLiked ? 'solid' : 'regular'} fa-heart`}></i>
                                                    <span>{comment.likes}</span>
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                                {comment.comment}
                                            </p>
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
                                                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>Memuat...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-chevron-down mr-2"></i>Muat Lebih Banyak
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
