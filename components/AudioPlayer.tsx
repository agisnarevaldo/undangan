'use client'

import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Load audio after invitation is opened
        const handleOpen = () => {
            if (audioRef.current && !isLoaded) {
                audioRef.current.load()
                setIsLoaded(true)
            }
        }

        document.addEventListener('undangan.open', handleOpen)
        return () => document.removeEventListener('undangan.open', handleOpen)
    }, [isLoaded])

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
            <audio ref={audioRef} loop preload="none">
                <source src="/music/pure-love-304010.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <button
                type="button"
                id="button-music"
                onClick={toggleAudio}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full shadow-sm mt-3 p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle music"
            >
                {isPlaying ? (
                    <i className="fa-solid fa-circle-pause animate-spin"></i>
                ) : (
                    <i className="fa-solid fa-circle-play"></i>
                )}
            </button>
        </>
    )
}
