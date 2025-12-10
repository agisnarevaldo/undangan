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

        // Log for debugging
        console.log('POST /api/comments - Received data:', JSON.stringify(body))

        // Validate input
        const errors = validateComment(body)
        if (errors.length > 0) {
            console.log('Validation errors:', errors)
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

        console.log('Sanitized comment data:', JSON.stringify(commentData))

        // Check rate limiting (max 10 comments per IP per hour - increased for better UX)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
        const { data: recentComments } = await supabase
            .from('comments')
            .select('id')
            .eq('ip_address', commentData.ip_address)
            .gte('created_at', oneHourAgo)

        if (recentComments && recentComments.length >= 10) {
            console.log('Rate limit exceeded for IP:', commentData.ip_address)
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

        if (error) {
            console.error('Supabase insert error:', error)
            throw error
        }

        console.log('Comment created successfully:', data?.id)
        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('POST /api/comments error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create comment' },
            { status: 500 }
        )
    }
}
