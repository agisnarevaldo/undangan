'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('auto')
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'auto'
        setTheme(savedTheme)
        applyTheme(savedTheme)

        // Show button after invitation is opened
        const handleOpen = () => {
            setShowButton(true)
        }

        document.addEventListener('undangan.open', handleOpen)
        return () => document.removeEventListener('undangan.open', handleOpen)
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement

        if (newTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            root.classList.toggle('dark', prefersDark)
            root.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light')
        } else {
            root.classList.toggle('dark', newTheme === 'dark')
            root.setAttribute('data-bs-theme', newTheme)
        }
    }

    const cycleTheme = () => {
        const themes: Theme[] = ['auto', 'light', 'dark']
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]

        setTheme(nextTheme)
        applyTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
    }

    if (!showButton) return null

    return (
        <button
            type="button"
            id="button-theme"
            onClick={cycleTheme}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-full shadow-sm mt-3 p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Change theme"
            title={`Current: ${theme}`}
        >
            <i className="fa-solid fa-circle-half-stroke"></i>
        </button>
    )
}
