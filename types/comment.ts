export interface Comment {
  id: string;
  name: string;
  presence: 1 | 2; // 1=Datang, 2=Berhalangan
  comment: string;
  likes: number;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
  isLiked?: boolean; // Client-side only
  group?: string | null;
  avatar_url?: string | null; // Supabase Storage URL
}

export interface CommentFormData {
  name: string;
  presence: 1 | 2;
  comment: string;
  group?: string;
  avatar_url?: string; // Avatar URL from Supabase Storage
}

export interface PaginationParams {
  page: number;
  limit: number;
}
