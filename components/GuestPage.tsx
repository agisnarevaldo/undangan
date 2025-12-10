'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import AudioPlayer from './AudioPlayer'
import ThemeSwitcher from './ThemeSwitcher'
import WelcomeOverlay from './WelcomeOverlay'
import HeroSection from './HeroSection'
import SvgDivider from './SvgDivider'
import BrideSection from './BrideSection'
import QuranSection from './QuranSection'
import LoveStorySection from './LoveStorySection'
import WeddingDateSection from './WeddingDateSection'
import GallerySection from './GallerySection'
import GiftSection from './GiftSection'
import CommentSection from './CommentSection'
import BottomNavbar from './BottomNavbar'

export default function GuestPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to')
    if (name) {
      setGuestName(decodeURIComponent(name))
    }

    const targetDate = new Date('2023-03-15 09:30:00').getTime()

    const updateCountdown = () => {
      const now = Date.now()
      const distance = Math.abs(targetDate - now)
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const openInvitation = () => {
    console.log('🎉 Opening invitation...')
    setIsOpen(true)
    document.getElementById('root')?.classList.remove('opacity-0')

    // Dispatch custom event for audio and theme
    const event = new CustomEvent('undangan.open', {
      detail: { userInteraction: true }
    })
    document.dispatchEvent(event)
    console.log('📢 Event undangan.open dispatched with user interaction')

    // Initialize confetti animation
    if (typeof window !== 'undefined' && (window as any).confetti) {
      setTimeout(() => {
        ; (window as any).confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 500)
    }
  }

  return (
    <>
      {!isOpen && (
        <WelcomeOverlay guestName={guestName} onOpenInvitation={openInvitation} />
      )}

      <div className="flex m-0 p-0 opacity-0 transition-opacity" id="root">
        <div className="sticky top-0 h-screen hidden sm:flex sm:w-5/12 md:w-6/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 overflow-y-hidden m-0 p-0">
          <div className="relative bg-white dark:bg-gray-900 flex justify-center items-center w-full h-full">
            <div className="flex absolute w-full h-full">
              <div className="relative overflow-hidden w-screen">
                <div className="absolute h-full w-full slide-desktop opacity-30">
                  <img src="/images/bg.webp" alt="bg" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="text-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-[2rem]">
              <h2 className="font-esthetic mb-4 text-2xl">Wahyu &amp; Riski</h2>
              <p className="m-0 text-base text-gray-700 dark:text-gray-300">Rabu, 15 Maret 2023</p>
            </div>
          </div>
        </div>

        <div className="sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 m-0 p-0 overflow-y-auto pb-20">
          <main>
            <HeroSection countdown={countdown} />
            <SvgDivider className="" variant="1" />

            <BrideSection />
            <SvgDivider variant="2" />

            <QuranSection />
            <LoveStorySection />

            <SvgDivider variant="4" />
            <WeddingDateSection countdown={countdown} />

            <GallerySection />
            <SvgDivider variant="3" />

            <GiftSection />

            <CommentSection />
            <SvgDivider variant="6" />

            <section className="bg-white dark:bg-black">
              <div className="mx-auto px-4 text-center h-full pb-12">
                <p className="pb-2 pt-4 text-[0.95rem] text-gray-700 dark:text-gray-300">Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.</p>
                <h2 className="font-esthetic text-2xl text-gray-900 dark:text-gray-100">Wassalamualaikum Warahmatullahi Wabarakatuh</h2>
                <h2 className="font-arabic pt-4 text-2xl text-gray-900 dark:text-gray-100">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</h2>
                <hr className="my-3 border border-gray-300 dark:border-gray-700" />
              </div>
            </section>
          </main>
        </div>
      </div>

      <BottomNavbar isVisible={isOpen} />

      {/* Fixed Button Group */}
      {isOpen && (
        <div className="fixed flex flex-col" style={{ bottom: '10vh', right: '2vh', zIndex: 1030 }}>
          <ThemeSwitcher />
          <AudioPlayer autoPlay={isOpen} />
        </div>
      )}

      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha256-5P1JGBOIxI7FBAvT/mb1fCnI5n/NhQKzNUuW7Hq0fMc="
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).AOS) {
            (window as any).AOS.init()
          }
        }}
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />
    </>
  )
}
