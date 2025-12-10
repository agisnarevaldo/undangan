import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: commentId } = await params
        const ip_address = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Check if already liked
        const { data: existingLike } = await supabase
            .from('liked_comments')
            .select('id')
            .eq('comment_id', commentId)
            .eq('ip_address', ip_address)
            .maybeSingle()

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

        if (updateError) throw updateError

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
