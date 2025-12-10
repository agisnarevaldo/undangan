'use client'

import Link from "next/link"

interface BottomNavbarProps {
    isVisible?: boolean
}

export default function BottomNavbar({ isVisible = true }: BottomNavbarProps) {
    if (!isVisible) return null

    return (
        <nav className="text-center fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-[#212529bf] backdrop-blur-sm shadow-lg" id="navbar-menu">
            <div className="flex justify-around w-full items-center m-0 p-0 py-1">

                <Link className="nav-link flex flex-col items-center gap-1 py-2 px-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors no-underline" href="#home">
                    <i className="fa-solid fa-house text-center"></i>
                    <span className="block text-[0.65rem] leading-tight">Home</span>
                </Link>

                <Link className="nav-link flex flex-col items-center gap-1 py-2 px-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors no-underline" href="#bride">
                    <i className="fa-solid fa-user-group text-center"></i>
                    <span className="block text-[0.65rem] leading-tight">Mempelai</span>
                </Link>

                <Link className="nav-link flex flex-col items-center gap-1 py-2 px-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors no-underline" href="#wedding-date">
                    <i className="fa-solid fa-calendar-check text-base"></i>
                    <span className="block text-[0.65rem] leading-tight">Tanggal</span>
                </Link>

                <Link className="nav-link flex flex-col items-center gap-1 py-2 px-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors no-underline" href="#comment">
                    <i className="fa-solid fa-comments text-base"></i>
                    <span className="block text-[0.65rem] leading-tight">Ucapan</span>
                </Link>

            </div>
        </nav>
    )
}
