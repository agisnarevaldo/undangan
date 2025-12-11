import { supabase } from "./supabase";

/**
 * Upload avatar image to Supabase Storage
 * @param file - Image file to upload
 * @param userId - Unique identifier for the user (used as filename prefix)
 * @returns Public URL of uploaded image or null on error
 */
export async function uploadAvatar(
  file: File,
  userId: string
): Promise<string | null> {
  try {
    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
      );
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds 2MB limit.");
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${userId}-${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("comment-avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("comment-avatars")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Failed to upload avatar:", error);
    return null;
  }
}

/**
 * Delete avatar from Supabase Storage
 * @param avatarUrl - Full URL of the avatar to delete
 */
export async function deleteAvatar(avatarUrl: string): Promise<boolean> {
  try {
    // Extract filename from URL
    const urlParts = avatarUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage
      .from("comment-avatars")
      .remove([fileName]);

    if (error) {
      console.error("Failed to delete avatar:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting avatar:", error);
    return false;
  }
}
