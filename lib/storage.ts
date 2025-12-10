import { Comment } from '@/types/comment'

const STORAGE_KEYS = {
    COMMENTS: 'wedding_comments',
    LIKED_COMMENTS: 'wedding_liked_comments',
    LAST_FETCH: 'wedding_comments_last_fetch',
}

export const storage = {
    getComments: (): Comment[] => {
        if (typeof window === 'undefined') return []
        try {
            const data = localStorage.getItem(STORAGE_KEYS.COMMENTS)
            return data ? JSON.parse(data) : []
        } catch {
            return []
        }
    },

    setComments: (comments: Comment[]) => {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments))
            localStorage.setItem(STORAGE_KEYS.LAST_FETCH, new Date().toISOString())
        } catch (error) {
            console.error('Failed to save comments to localStorage:', error)
        }
    },

    getLikedComments: (): string[] => {
        if (typeof window === 'undefined') return []
        try {
            const data = localStorage.getItem(STORAGE_KEYS.LIKED_COMMENTS)
            return data ? JSON.parse(data) : []
        } catch {
            return []
        }
    },

    addLikedComment: (commentId: string) => {
        if (typeof window === 'undefined') return
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
        if (typeof window === 'undefined') return true
        try {
            const lastFetch = localStorage.getItem(STORAGE_KEYS.LAST_FETCH)
            if (!lastFetch) return true

            const diff = Date.now() - new Date(lastFetch).getTime()
            return diff > 5 * 60 * 1000 // Refetch after 5 minutes
        } catch {
            return true
        }
    },

    invalidateCache: () => {
        if (typeof window === 'undefined') return
        localStorage.removeItem(STORAGE_KEYS.LAST_FETCH)
    },
}
