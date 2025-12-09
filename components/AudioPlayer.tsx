'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
    autoPlay?: boolean
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const hasAutoPlayed = useRef(false)

    // Auto-play when autoPlay prop becomes true
    useEffect(() => {
        if (autoPlay && audioRef.current && !hasAutoPlayed.current) {
            hasAutoPlayed.current = true
            console.log('🎵 Auto-play triggered from prop')

            const audio = audioRef.current

            const attemptPlay = async () => {
                try {
                    console.log('🎵 Attempting to play audio...')
                    console.log('📊 Current state - readyState:', audio.readyState, 'networkState:', audio.networkState)

                    // Set volume and mute first
                    audio.volume = 0.5
                    audio.muted = true

                    console.log('▶️ Calling audio.play()...')
                    // Try to play
                    await audio.play()
                    console.log('✅ Music started (muted), unmuting...')

                    // Unmute after successful play
                    setTimeout(() => {
                        audio.muted = false
                        setIsPlaying(true)
                        console.log('✅ Music playing successfully 🎵')
                    }, 100)
                } catch (error: any) {
                    console.warn('❌ Auto-play failed:', error.message)
                    console.warn('📊 Error details:', error)
                    console.warn('💡 Silakan klik tombol musik untuk memutar manual')
                    audio.muted = false
                    setIsPlaying(false)
                    hasAutoPlayed.current = false
                }
            }

            // Event listeners for monitoring
            const handleCanPlay = () => {
                console.log('✅ Audio canplay event fired')
            }

            const handleLoadedData = () => {
                console.log('✅ Audio loadeddata event fired')
            }

            const handleError = (e: Event) => {
                const error = audio.error
                if (error) {
                    console.error('❌ Audio loading error:')
                    console.error('  - Error code:', error.code)
                    console.error('  - Error message:', error.message)
                }
                hasAutoPlayed.current = false
            }

            // Add event listeners for monitoring
            audio.addEventListener('canplay', handleCanPlay)
            audio.addEventListener('loadeddata', handleLoadedData)
            audio.addEventListener('error', handleError)

            // Try to load
            try {
                audio.load()
                console.log('🔄 Audio load() called')

                // Try to play immediately (don't wait for load to complete)
                console.log('⏱️ Scheduling play attempt in 300ms...')
                setTimeout(() => {
                    console.log('⏱️ Timeout fired, calling attemptPlay()')
                    attemptPlay()
                }, 300)
            } catch (err) {
                console.error('❌ Error calling audio.load():', err)
            }

            return () => {
                console.log('🧹 Cleanup AudioPlayer effect')
                audio.removeEventListener('canplay', handleCanPlay)
                audio.removeEventListener('loadeddata', handleLoadedData)
                audio.removeEventListener('error', handleError)
            }
        }
    }, [autoPlay])

    const toggleAudio = async () => {
        if (!audioRef.current) return

        try {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                await audioRef.current.play()
                setIsPlaying(true)
            }
        } catch (error) {
            console.error('Audio playback error:', error)
            setIsPlaying(false)
        }
    }

    return (
        <>
            <audio
                ref={audioRef}
                loop
                preload="auto"
                src="/music/pure-love-304010.mp3"
            >
                Your browser does not support the audio element.
            </audio>

            <button
                type="button"
                id="button-music"
                onClick={toggleAudio}
                className="btn btn-transparent border border-gray-300 dark:border-gray-600 rounded-full shadow-sm mt-3 w-10 h-10"
                aria-label="Toggle music"
            >
                {isPlaying ? (
                    <i className="fa-solid fa-circle-pause spin-button"></i>
                ) : (
                    <i className="fa-solid fa-circle-play"></i>
                )}
            </button>
        </>
    )
}
