'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

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
    setIsOpen(true)
    document.getElementById('root')?.classList.remove('opacity-0')
  }

  const pad = (num: number) => num.toString().padStart(2, '0')

  return (
    <>
      {!isOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black overflow-y-auto z-50 flex items-center justify-center p-4" id="welcome">
          <div className="absolute inset-0 opacity-25 -z-10">
            <img src="/images/bg.webp" alt="background" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col text-center">
              <h2 className="font-esthetic mb-4 text-[2.25rem]">The Wedding Of</h2>
              <img
                src="/images/bg.webp"
                alt="background"
                className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md mb-4 mx-auto"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h2 className="font-esthetic mb-4 text-[2.25rem]">Wahyu &amp; Riski</h2>
              <small className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Kepada Yth Bapak/Ibu/Saudara/i</small>
              {guestName && (
                <div className="my-2">
                  <p className="text-xl">{guestName}</p>
                </div>
              )}
              <button
                type="button"
                className="bg-white dark:bg-gray-100 text-gray-900 shadow-md rounded-full mt-3 mx-auto px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
                onClick={openInvitation}
              >
                <i className="fa-solid fa-envelope-open mr-2"></i>Open Invitation
              </button>
            </div>
          </div>
        </div>
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

        <div className="sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 m-0 p-0 overflow-y-auto">
          <main>
            <section id="home" className="bg-gray-100 dark:bg-gray-800 relative overflow-hidden p-0 m-0">
              <img src="/images/bg.webp" alt="bg" className="absolute opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            <section className="bg-white dark:bg-gray-900 text-center py-8" id="bride">
              <h2 className="font-arabic py-4 m-0 text-2xl text-gray-900 dark:text-gray-100">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
              <h2 className="font-esthetic py-4 m-0 text-2xl text-gray-900 dark:text-gray-100">Assalamualaikum Warahmatullahi Wabarakatuh</h2>
              <p className="pb-4 px-2 m-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:</p>

              <div className="overflow-x-hidden pb-4">
                <div className="relative">
                  <div className="pb-1">
                    <img
                      src="/images/cowo.webp"
                      alt="cowo"
                      className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md my-4 mx-auto cursor-pointer"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h2 className="font-esthetic m-0 text-[2.125rem] text-gray-900 dark:text-gray-100">Nama Wahyu Siapa</h2>
                    <p className="mt-3 mb-1 text-xl text-gray-700 dark:text-gray-300">Putra ke-1</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Bapak lorem ipsum</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">dan</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Ibu lorem ipsum</p>
                  </div>
                </div>
                <h2 className="font-esthetic mt-4 text-[4.5rem] text-gray-900 dark:text-gray-100">&amp;</h2>
                <div className="relative">
                  <div className="pb-1">
                    <img
                      src="/images/cewe.webp"
                      alt="cewe"
                      className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md my-4 mx-auto cursor-pointer"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h2 className="font-esthetic m-0 text-[2.125rem] text-gray-900 dark:text-gray-100">Nama Riski Siapa</h2>
                    <p className="mt-3 mb-1 text-xl text-gray-700 dark:text-gray-300">Putri ke-2</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Bapak lorem ipsum</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">dan</p>
                    <p className="mb-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Ibu lorem ipsum</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
              </svg>
            </div>

            <section className="bg-white dark:bg-gray-900 pb-8" id="wedding-date">
              <div className="mx-auto px-4 text-center">
                <h2 className="font-esthetic py-4 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Moment Bahagia</h2>
                <div className="border border-gray-300 dark:border-gray-600 rounded-full shadow py-2 px-4 mt-2 mb-4 inline-block bg-white dark:bg-gray-800">
                  <div className="flex justify-center gap-4">
                    <div className="p-1">
                      <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">{pad(countdown.days)}</p>
                      <small className="ml-1 inline text-gray-600 dark:text-gray-400">Hari</small>
                    </div>
                    <div className="p-1">
                      <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">{pad(countdown.hours)}</p>
                      <small className="ml-1 inline text-gray-600 dark:text-gray-400">Jam</small>
                    </div>
                    <div className="p-1">
                      <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">{pad(countdown.minutes)}</p>
                      <small className="ml-1 inline text-gray-600 dark:text-gray-400">Menit</small>
                    </div>
                    <div className="p-1">
                      <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">{pad(countdown.seconds)}</p>
                      <small className="ml-1 inline text-gray-600 dark:text-gray-400">Detik</small>
                    </div>
                  </div>
                </div>
                <p className="py-2 m-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah kami akan menyelenggarakan acara:</p>
                <div className="overflow-x-hidden">
                  <div className="py-2">
                    <h2 className="font-esthetic m-0 py-2 text-2xl text-gray-900 dark:text-gray-100">Akad</h2>
                    <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">Pukul 10.00 WIB - Selesai</p>
                  </div>
                  <div className="py-2">
                    <h2 className="font-esthetic m-0 py-2 text-2xl text-gray-900 dark:text-gray-100">Resepsi</h2>
                    <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">Pukul 13.00 WIB - Selesai</p>
                  </div>
                </div>
                <div className="py-2">
                  <a
                    href="https://goo.gl/maps/ALZR6FJZU3kxVwN86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow rounded-full mb-2 px-3 py-1 text-[0.825rem] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <i className="fa-solid fa-map-location-dot mr-2"></i>Lihat Google Maps
                  </a>
                  <small className="block my-1 text-gray-600 dark:text-gray-400">RT 10 RW 02, Desa Pajerukan, Kec. Kalibagor, Kab. Banyumas, Jawa Tengah 53191.</small>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 pb-5 pt-3" id="gallery">
              <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
                  <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Galeri</h2>
                  <div className="mt-4">
                    <div className="rounded-2xl overflow-hidden">
                      <img src="https://picsum.photos/1280/720?random=1" alt="image 1" className="block w-full cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 py-8">
              <div className="mx-auto px-4 text-center">
                <p className="pb-2 pt-4 text-[0.95rem] text-gray-700 dark:text-gray-300">Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.</p>
                <h2 className="font-esthetic text-2xl text-gray-900 dark:text-gray-100">Wassalamualaikum Warahmatullahi Wabarakatuh</h2>
                <h2 className="font-arabic pt-4 text-2xl text-gray-900 dark:text-gray-100">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</h2>
                <hr className="my-3 border-gray-300 dark:border-gray-700" />
              </div>
            </section>
          </main>

          <nav className="sticky bottom-0 rounded-t-3xl border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 p-0" id="navbar-menu">
            <ul className="flex justify-around w-full items-center">
              <li className="flex-1">
                <a className="nav-link flex flex-col items-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#home">
                  <i className="fa-solid fa-house text-lg"></i>
                  <span className="block text-[0.7rem]">Home</span>
                </a>
              </li>
              <li className="flex-1">
                <a className="nav-link flex flex-col items-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#bride">
                  <i className="fa-solid fa-user-group text-lg"></i>
                  <span className="block text-[0.7rem]">Mempelai</span>
                </a>
              </li>
              <li className="flex-1">
                <a className="nav-link flex flex-col items-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#wedding-date">
                  <i className="fa-solid fa-calendar-check text-lg"></i>
                  <span className="block text-[0.7rem]">Tanggal</span>
                </a>
              </li>
              <li className="flex-1">
                <a className="nav-link flex flex-col items-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#gallery">
                  <i className="fa-solid fa-images text-lg"></i>
                  <span className="block text-[0.7rem]">Galeri</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

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
