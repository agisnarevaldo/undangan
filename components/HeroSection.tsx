'use client'

interface HeroSectionProps {
    countdown: {
        days: number
        hours: number
        minutes: number
        seconds: number
    }
}

export default function HeroSection({ countdown }: HeroSectionProps) {
    const pad = (num: number) => num.toString().padStart(2, '0')

    return (
        <section id="home" className="bg-gray-100 dark:bg-gray-800 relative overflow-hidden p-0 m-0">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/images/bg.webp"
                    alt="bg"
                    className="w-full h-full object-cover opacity-25 blur-sm"
                />
            </div>
            <div className="relative text-center py-8">
                <h1 className="font-esthetic pt-5 pb-4 font-medium text-[2.25rem]">Undangan Pernikahan</h1>
                <img
                    src="/images/bg.webp"
                    alt="bg"
                    className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md my-4 mx-auto cursor-pointer"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h2 className="font-esthetic my-4 text-[2.25rem]">Wahyu &amp; Riski</h2>
                <p className="my-2 text-xl text-gray-700 dark:text-gray-300">Rabu, 15 Maret 2023</p>
                <button className="inline-block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow rounded-full px-3 py-1 text-[0.825rem] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors my-3">
                    <i className="fa-solid fa-calendar-check mr-2"></i>Save Google Calendar
                </button>
                <div className="flex justify-center items-center mt-4 mb-2">
                    <div className="mouse-animation border border-gray-400 border-2 rounded-full px-2 py-1 opacity-50">
                        <div className="scroll-animation rounded bg-gray-400"></div>
                    </div>
                </div>
                <p className="pb-4 m-0 text-gray-500 text-[0.825rem]">Scroll Down</p>
            </div>
        </section>
    )
}
