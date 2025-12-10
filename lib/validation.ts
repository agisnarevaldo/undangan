import { CommentFormData } from '@/types/comment'

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
