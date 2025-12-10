# 📝 Comment System Implementation Plan
## Full-Featured Production-Ready dengan Supabase

### 🎯 Overview
Implementasi sistem komentar lengkap dengan database Supabase, real-time updates, like system, pagination, dan anti-spam protection.

---

## 📋 Phase 1: Supabase Setup & Configuration

### 1.1 Create Supabase Project
- [ ] Sign up/login ke [supabase.com](https://supabase.com)
- [ ] Create new project:
  - Project name: `undangan-wedding`
  - Database password: (generate strong password)
  - Region: Singapore (closest to Indonesia)
  - Pricing: Free tier (500MB database, 50,000 monthly active users)

### 1.2 Get API Credentials
- [ ] Navigate to Project Settings → API
- [ ] Copy:
  - `Project URL` (e.g., https://xxxxx.supabase.co)
  - `anon public` key (safe for client-side)
  - `service_role` key (for server-side only)

### 1.3 Install Dependencies
```bash
npm install @supabase/supabase-js
npm install -D @types/node
```

### 1.4 Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Add to `.gitignore`:
```
.env.local
```

---

## 📋 Phase 2: Database Schema

### 2.1 Create Comments Table
Execute di Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    presence SMALLINT NOT NULL DEFAULT 1, -- 1=Datang, 2=Berhalangan
    comment TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    ip_address VARCHAR(45), -- IPv4 or IPv6
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_ip ON comments(ip_address);

-- Create liked_comments table (track who liked what)
CREATE TABLE liked_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(comment_id, ip_address) -- Prevent duplicate likes
);

-- Create index
CREATE INDEX idx_liked_comments_ip ON liked_comments(ip_address);

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE liked_comments ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read, insert, update)
CREATE POLICY "Enable read access for all users" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON comments
    FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON liked_comments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON liked_comments
    FOR INSERT WITH CHECK (true);

-- Create function to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 Test Data (Optional)
```sql
-- Insert sample comments
INSERT INTO comments (name, presence, comment, ip_address)
VALUES 
    ('Agis Narevaldo', 1, 'Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek 🎉', '127.0.0.1'),
    ('Budi Santoso', 1, 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fi khair ❤️', '127.0.0.2'),
    ('Siti Nurhaliza', 2, 'Maaf tidak bisa hadir, tapi doa selalu menyertai kalian 🤲', '127.0.0.3');
```

---

## 📋 Phase 3: Create Utility Functions

### 3.1 Supabase Client (`lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (with service role key)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

### 3.2 TypeScript Types (`types/comment.ts`)
```typescript
export interface Comment {
  id: string
  name: string
  presence: 1 | 2 // 1=Datang, 2=Berhalangan
  comment: string
  likes: number
  ip_address: string | null
  created_at: string
  updated_at: string
  isLiked?: boolean // Client-side only
}

export interface CommentFormData {
  name: string
  presence: 1 | 2
  comment: string
}

export interface PaginationParams {
  page: number
  limit: number
}
```

### 3.3 Validation Utilities (`lib/validation.ts`)
```typescript
export const validateComment = (data: CommentFormData): string[] => {
  const errors: string[] = []
  
  if (!data.name.trim()) {
    errors.push('Nama harus diisi')
  } else if (data.name.length > 100) {
    errors.push('Nama maksimal 100 karakter')
  }
  
  if (!data.comment.trim()) {
    errors.push('Ucapan & Doa harus diisi')
  } else if (data.comment.length < 10) {
    errors.push('Ucapan & Doa minimal 10 karakter')
  } else if (data.comment.length > 500) {
    errors.push('Ucapan & Doa maksimal 500 karakter')
  }
  
  if (![1, 2].includes(data.presence)) {
    errors.push('Presensi tidak valid')
  }
  
  return errors
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}
```

### 3.4 LocalStorage Utilities (`lib/storage.ts`)
```typescript
const STORAGE_KEYS = {
  COMMENTS: 'wedding_comments',
  LIKED_COMMENTS: 'wedding_liked_comments',
  LAST_FETCH: 'wedding_comments_last_fetch',
}

export const storage = {
  getComments: (): Comment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },
  
  setComments: (comments: Comment[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments))
      localStorage.setItem(STORAGE_KEYS.LAST_FETCH, new Date().toISOString())
    } catch (error) {
      console.error('Failed to save comments to localStorage:', error)
    }
  },
  
  getLikedComments: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKED_COMMENTS)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },
  
  addLikedComment: (commentId: string) => {
    const liked = storage.getLikedComments()
    if (!liked.includes(commentId)) {
      liked.push(commentId)
      localStorage.setItem(STORAGE_KEYS.LIKED_COMMENTS, JSON.stringify(liked))
    }
  },
  
  isLiked: (commentId: string): boolean => {
    return storage.getLikedComments().includes(commentId)
  },
  
  shouldRefetch: (): boolean => {
    try {
      const lastFetch = localStorage.getItem(STORAGE_KEYS.LAST_FETCH)
      if (!lastFetch) return true
      
      const diff = Date.now() - new Date(lastFetch).getTime()
      return diff > 5 * 60 * 1000 // Refetch after 5 minutes
    } catch {
      return true
    }
  },
}
```

### 3.5 Date Formatting (`lib/utils.ts`)
```typescript
export const formatRelativeTime = (date: string): string => {
  const now = new Date()
  const commentDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Baru saja'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`
  
  return commentDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return 'unknown'
  }
}
```

---

## 📋 Phase 4: Create API Routes

### 4.1 GET & POST Comments (`app/api/comments/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateComment, sanitizeInput } from '@/lib/validation'

// GET: Fetch comments with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('GET /api/comments error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST: Create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const errors = validateComment(body)
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }

    // Sanitize input
    const commentData = {
      name: sanitizeInput(body.name),
      presence: body.presence,
      comment: sanitizeInput(body.comment),
      ip_address: request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown',
    }

    // Check rate limiting (max 3 comments per IP per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentComments } = await supabase
      .from('comments')
      .select('id')
      .eq('ip_address', commentData.ip_address)
      .gte('created_at', oneHourAgo)

    if (recentComments && recentComments.length >= 3) {
      return NextResponse.json(
        { success: false, error: 'Terlalu banyak komentar. Coba lagi nanti.' },
        { status: 429 }
      )
    }

    // Insert comment
    const { data, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('POST /api/comments error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
```

### 4.2 Like Comment (`app/api/comments/[id]/like/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('liked_comments')
      .select('id')
      .eq('comment_id', commentId)
      .eq('ip_address', ip_address)
      .single()

    if (existingLike) {
      return NextResponse.json(
        { success: false, error: 'Already liked this comment' },
        { status: 400 }
      )
    }

    // Add like
    const { error: likeError } = await supabase
      .from('liked_comments')
      .insert({ comment_id: commentId, ip_address })

    if (likeError) throw likeError

    // Increment like count
    const { error: updateError } = await supabase.rpc('increment_likes', {
      comment_id: commentId
    })

    if (updateError) {
      // If RPC doesn't exist, use direct update
      await supabase
        .from('comments')
        .update({ likes: supabase.sql`likes + 1` })
        .eq('id', commentId)
    }

    // Fetch updated comment
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single()

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('POST /api/comments/[id]/like error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to like comment' },
      { status: 500 }
    )
  }
}
```

### 4.3 Create RPC Function (Execute di Supabase SQL Editor)
```sql
-- Create function to increment likes safely
CREATE OR REPLACE FUNCTION increment_likes(comment_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE comments
    SET likes = likes + 1
    WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📋 Phase 5: Update CommentSection Component

### 5.1 Main Component (`components/CommentSection.tsx`)
```typescript
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
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Reset form
        setFormData({ name: '', presence: 1, comment: '' })
        
        // Refresh comments
        await fetchComments(1, true)
        
        // Scroll to comments
        document.getElementById('comments-list')?.scrollIntoView({ 
          behavior: 'smooth' 
        })
      } else {
        setErrors(result.errors || [result.error])
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
        <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
          <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">
            Ucapan &amp; Doa
          </h2>

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
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
                <p className="mt-2 text-sm text-gray-500">Memuat ucapan...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <i className="fa-regular fa-comment text-4xl text-gray-300 dark:text-gray-600"></i>
                <p className="mt-2 text-sm text-gray-500">Belum ada ucapan</p>
              </div>
            ) : (
              <>
                <div id="comments-list" className="space-y-3 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-3 border border-gray-200 dark:border-gray-700"
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
                          className={`flex items-center gap-1 text-xs transition-colors ${
                            comment.isLiked
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
```

---

## 📋 Phase 6: Testing & Optimization

### 6.1 Manual Testing Checklist
- [ ] Form submission works
- [ ] Validation shows errors correctly
- [ ] Comments display in correct order (newest first)
- [ ] Like button works and prevents duplicate likes
- [ ] Pagination/load more works
- [ ] Dark mode styles correct
- [ ] LocalStorage caching works
- [ ] Rate limiting works (3 comments/hour per IP)
- [ ] Responsive on mobile
- [ ] Loading states work correctly

### 6.2 Performance Optimization
- [ ] Enable Supabase caching
- [ ] Add database indexes (already done in schema)
- [ ] Implement optimistic UI updates (already done)
- [ ] Add request debouncing
- [ ] Lazy load comments section

### 6.3 Security Checklist
- [ ] RLS policies enabled
- [ ] Input sanitization implemented
- [ ] Rate limiting active
- [ ] XSS protection
- [ ] SQL injection protection (Supabase handles this)
- [ ] Environment variables secured

---

## 📋 Phase 7: Deployment

### 7.1 Pre-deployment
- [ ] Test all features in production mode (`npm run build && npm start`)
- [ ] Check environment variables in Vercel
- [ ] Test on different browsers
- [ ] Test on mobile devices

### 7.2 Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "feat: implement comment system with Supabase"
git push origin main

# Or deploy directly
vercel --prod
```

### 7.3 Post-deployment
- [ ] Test production deployment
- [ ] Monitor Supabase dashboard for errors
- [ ] Check Vercel logs
- [ ] Set up alerts for errors

---

## 🎨 Optional Enhancements

### Nice-to-have Features
- [ ] Real-time updates dengan Supabase Realtime
- [ ] Admin panel untuk moderate comments
- [ ] Email notifications untuk new comments
- [ ] Export comments to CSV
- [ ] Comment reactions (not just likes)
- [ ] Reply to comments
- [ ] Sort by: newest, most liked, presence
- [ ] Filter by presence status
- [ ] Search comments
- [ ] Rich text editor
- [ ] Image upload support
- [ ] Share comment to social media

---

## 📊 Monitoring & Analytics

### Supabase Dashboard
- Monitor database size
- Check query performance
- Track API usage
- Review error logs

### Vercel Analytics
- Track API response times
- Monitor serverless function usage
- Check bandwidth usage

---

## 🚀 Success Metrics

### Technical Metrics
- [ ] API response time < 500ms
- [ ] Comment submission success rate > 99%
- [ ] Zero SQL injection vulnerabilities
- [ ] Zero XSS vulnerabilities
- [ ] Database usage < 50% of free tier

### User Experience Metrics
- [ ] Comment submission takes < 2 seconds
- [ ] Comments load in < 1 second
- [ ] Like interaction feels instant (optimistic UI)
- [ ] Mobile responsive on all screen sizes
- [ ] Dark mode works perfectly

---

## 📝 Notes

- Free tier Supabase limits: 500MB database, 50,000 monthly active users, 2GB bandwidth
- If limits exceeded, upgrade to Pro plan ($25/month)
- Consider adding pagination limit in production (prevent abuse)
- Monitor spam comments and add CAPTCHA if needed
- Backup database regularly via Supabase dashboard

---

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Deployment](https://vercel.com/docs)
- [PostgreSQL Best Practices](https://www.postgresql.org/docs/current/index.html)
