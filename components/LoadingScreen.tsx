'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 100)

        // Hide loading screen when progress reaches 100%
        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-[9999] transition-opacity duration-500"
            style={{ opacity: progress >= 100 ? 0 : 1 }}
            id="loading"
        >
            <div className="flex flex-col items-center justify-center max-w-xs w-full px-4">
                <img
                    src="/images/icon-192x192.png"
                    alt="icon"
                    className="w-14 h-14 object-cover mb-3 opacity-90"
                    loading="eager"
                />
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div
                        className="bg-gray-900 dark:bg-gray-100 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {Math.floor(Math.min(progress, 100))}%
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Booting application...
                </p>
                {/* <small className="text-xs text-gray-500 dark:text-gray-400">
                    from <span className="font-semibold">dewanakl</span>
                </small> */}
            </div>
        </div>
    )
}
