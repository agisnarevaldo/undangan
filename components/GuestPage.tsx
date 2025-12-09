'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import AudioPlayer from './AudioPlayer'
import ThemeSwitcher from './ThemeSwitcher'

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

    // Dispatch custom event for audio and theme
    document.dispatchEvent(new Event('undangan.open'))

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
                <i className="fa-solid fa-envelope-open mr-2 animate-bounce"></i>Open Invitation
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
                <div className="relative" data-aos="fade-right" data-aos-duration="2000">
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
                <div className="relative" data-aos="fade-left" data-aos-duration="2000">
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

            <section className="bg-gray-100 dark:bg-gray-800 pb-4">
              <div className="mx-auto px-4 text-center">
                <h2 className="font-esthetic pt-4 mb-4 text-[2.25rem] text-gray-900 dark:text-gray-100">Allah Subhanahu Wa Ta&apos;ala berfirman</h2>
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-4 mx-4 bg-white dark:bg-gray-900" data-aos="fade-up" data-aos-duration="1500">
                  <p className="text-[0.95rem] text-gray-700 dark:text-gray-300 mb-3">Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">QS. Adh-Dhariyat: 49</p>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-4 mx-4 mt-3 bg-white dark:bg-gray-900">
                  <p className="text-[0.95rem] text-gray-700 dark:text-gray-300 mb-3">dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan perempuan,</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">QS. An-Najm: 45</p>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
              </svg>
            </div>

            <section className="bg-white dark:bg-gray-900 pb-4" id="story">
              <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
                  <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Kisah Cinta</h2>

                  <div className="relative rounded-2xl mb-2 overflow-hidden">
                    <video
                      className="w-full rounded-2xl shadow-sm m-0 p-0"
                      controls
                      poster="/images/bg.webp"
                    >
                      <source src="/video/265501_tiny.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="relative">
                    <div className="overflow-y-auto overflow-x-hidden p-2 max-h-60">
                      <div className="flex">
                        <div className="flex-none relative">
                          <p className="relative flex justify-center items-center bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 rounded-full m-0 p-0 z-10 w-8 h-8 text-sm">1</p>
                          <hr className="absolute top-0 left-1/2 -translate-x-1/2 border border-gray-400 dark:border-gray-500 h-full m-0 rounded" />
                        </div>
                        <div className="flex-1 mt-1 mb-3 ps-0 ms-3">
                          <p className="font-semibold mb-2">💼 Awal Pertemuan Sederhana</p>
                          <p className="text-sm mb-0 text-gray-700 dark:text-gray-300">
                            Pada Januari 2025, Wahyu, seorang desainer grafis berusia 28 tahun, bertemu Riski, copywriter yang dikenal cerdas dan pendiam, dalam proyek branding perusahaan. Interaksi mereka di ruang rapat terbatas pada urusan kerja, penuh adab dan profesional.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-none relative">
                          <p className="relative flex justify-center items-center bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 rounded-full m-0 p-0 z-10 w-8 h-8 text-sm">2</p>
                          <hr className="absolute top-0 left-1/2 -translate-x-1/2 border border-gray-400 dark:border-gray-500 h-full m-0 rounded" />
                        </div>
                        <div className="flex-1 mt-1 mb-3 ps-0 ms-3">
                          <p className="font-semibold mb-2">💞 Benih Cinta dalam Ujian</p>
                          <p className="text-sm mb-0 text-gray-700 dark:text-gray-300">
                            Memasuki Februari 2025, proyek mereka menghadapi krisis: klien menolak konsep awal dan mengancam membatalkan kontrak. Di tengah tekanan, Riski tampil dengan solusi kreatif yang menyelamatkan proyek, membuat Wahyu terkesan dengan ketenangan dan kecerdasannya.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-none relative">
                          <p className="relative flex justify-center items-center bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 rounded-full m-0 p-0 z-10 w-8 h-8 text-sm">3</p>
                        </div>
                        <div className="flex-1 mt-1 mb-3 ps-0 ms-3">
                          <p className="font-semibold mb-2">💍 Langkah Menuju Ridha Allah</p>
                          <p className="text-sm mb-0 text-gray-700 dark:text-gray-300">
                            Proses taaruf berjalan penuh keikhlasan, dengan pendamping yang memastikan setiap langkah sesuai syariat. Wahyu dan Riski saling terbuka tentang impian membangun keluarga yang diridhai Allah. Pada Maret 2025, setelah istikharah dan mendapat restu keluarga, Wahyu melamar Riski dalam acara sederhana namun penuh makna.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
              </svg>
            </div>

            <section className="bg-gray-100 dark:bg-gray-800 pb-8" id="wedding-date">
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

                <p className="py-2 m-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Demi kehangatan bersama, kami memohon kesediaan Anda untuk mengenakan dress code berikut:</p>
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-4 mx-4 mt-3 bg-white dark:bg-gray-900">
                  <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">Busana batik dan bersepatu.</p>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
              </svg>
            </div>

            <section className="bg-white dark:bg-gray-900 pb-5 pt-3" id="gallery">
              <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
                  <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Galeri</h2>

                  {/* Carousel 1 */}
                  <div id="carousel-image-one" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner rounded-2xl">
                      <div className="carousel-item active">
                        <img src="https://picsum.photos/1280/720?random=1" alt="image 1" className="block w-full cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=2" alt="image 2" className="block w-full cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=3" alt="image 3" className="block w-full cursor-pointer" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-image-one" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-image-one" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  {/* Carousel 2 */}
                  <div id="carousel-image-two" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carousel-image-two" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner rounded-2xl">
                      <div className="carousel-item active">
                        <img src="https://picsum.photos/1280/720?random=4" alt="image 4" className="block w-full cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=5" alt="image 5" className="block w-full cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=6" alt="image 6" className="block w-full cursor-pointer" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-image-two" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-image-two" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
              </svg>
            </div>

            <section className="bg-gray-100 dark:bg-gray-800 pb-3" id="gift">
              <div className="mx-auto px-4 text-center">
                <h2 className="font-esthetic pt-3 mb-4 text-[2.25rem] text-gray-900 dark:text-gray-100">Love Gift</h2>
                <p className="mb-1 text-[0.95rem] text-gray-700 dark:text-gray-300">Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:</p>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-3 mx-4 mt-4 text-start">
                  <i className="fa-solid fa-money-bill-transfer fa-lg"></i>
                  <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Transfer</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
                      <i className="fa-regular fa-user fa-sm mr-1"></i>Riski Siapa?
                    </p>
                    <button
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => navigator.clipboard.writeText('1234567891234')}
                    >
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-3 mx-4 mt-4 text-start">
                  <i className="fa-solid fa-qrcode fa-lg"></i>
                  <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Qris</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
                      <i className="fa-regular fa-user fa-sm mr-1"></i>Wahyu Siapa?
                    </p>
                    <button
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseQris"
                    >
                      <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
                    </button>
                  </div>
                  <div className="collapse mt-2" id="collapseQris">
                    <hr className="my-2" />
                    <div className="flex justify-center items-center">
                      <img src="/images/donate.png" alt="donate" className="max-w-full rounded bg-white p-2" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-3 mx-4 mt-4 text-start">
                  <i className="fa-solid fa-gift fa-lg"></i>
                  <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Gift</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
                      <i className="fa-regular fa-user fa-sm mr-1"></i>Wahyu Siapa?
                    </p>
                    <button
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseGift"
                    >
                      <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
                    </button>
                  </div>
                  <div className="collapse mt-2" id="collapseGift">
                    <hr className="my-2" />
                    <div className="flex justify-between items-center mb-2">
                      <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                        <i className="fa-solid fa-phone-volume mr-1"></i>0812345678
                      </p>
                      <button
                        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => navigator.clipboard.writeText('0812345678')}
                      >
                        <i className="fa-solid fa-copy"></i>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                        <i className="fa-solid fa-location-dot mr-1"></i>Jl. Example No. 123
                      </p>
                      <button
                        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => navigator.clipboard.writeText('Jl. Example No. 123')}
                      >
                        <i className="fa-solid fa-copy"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
              </svg>
            </div>

            <section className="bg-white dark:bg-gray-900 pb-2" id="comment">
              <div className="mx-auto px-4">
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-3 bg-white dark:bg-gray-800">
                  <h2 className="font-esthetic text-center py-2 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Ucapan &amp; Doa</h2>

                  <div className="mt-3">
                    <label htmlFor="form-name" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                      <i className="fa-solid fa-user mr-2"></i>Nama
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      id="form-name"
                      placeholder="Isikan Nama Anda"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="form-presence" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                      <i className="fa-solid fa-circle-check mr-2"></i>Presensi
                    </label>
                    <select
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      id="form-presence"
                    >
                      <option value="1">Hadir</option>
                      <option value="2">Tidak Hadir</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="form-comment" className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                      <i className="fa-solid fa-comment mr-2"></i>Ucapan &amp; Doa
                    </label>
                    <textarea
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      id="form-comment"
                      rows={4}
                      placeholder="Berikan Ucapan & Doa"
                    ></textarea>
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="w-full bg-gray-900 dark:bg-gray-700 text-white rounded-2xl py-2 text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <i className="fa-solid fa-paper-plane mr-2"></i>Send
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <i className="fa-solid fa-book-open mr-2"></i>
                      <span id="count-comment">0</span> Ucapan
                    </p>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-3">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Guest Name</p>
                          <small className="text-xs text-gray-500 dark:text-gray-400">2 menit lalu</small>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.</p>
                        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <button className="hover:text-red-500 transition-colors">
                            <i className="fa-regular fa-heart mr-1"></i>0
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="svg-wrapper overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg -mb-1">
                <path fill="currentColor" fillOpacity="1" d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
              </svg>
            </div>

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
              <li className="flex-1">
                <a className="nav-link flex flex-col items-center py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#comment">
                  <i className="fa-solid fa-comments text-lg"></i>
                  <span className="block text-[0.7rem]">Ucapan</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Fixed Button Group */}
      <div className="fixed flex flex-col" style={{ bottom: '10vh', right: '2vh', zIndex: 1030 }}>
        <ThemeSwitcher />
        <AudioPlayer />
      </div>

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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" integrity="sha256-2FMn2Zx6PuH5tdBQDRNwrOo60ts5wWPC9R8jK67b3t4=" crossOrigin="anonymous" />
    </>
  )
}
