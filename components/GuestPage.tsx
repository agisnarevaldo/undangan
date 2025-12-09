'use client'

import { useEffect, useState } from 'react'

export default function GuestPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Get guest name from URL query parameter
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to')
    if (name) {
      setGuestName(decodeURIComponent(name))
    }

    // Countdown timer - wedding date: March 15, 2023, 09:30 AM
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
      {/* Welcome Page */}
      {!isOpen && (
        <div className="loading-page bg-white-black flex justify-center items-center" style={{ opacity: 1 }}>
          <div className="flex flex-col text-center px-4">
            <h2 className="font-esthetic text-4xl mb-4">The Wedding Of</h2>
            
            <img 
              src="/assets/images/bg.webp" 
              alt="background" 
              className="img-center-crop rounded-full border-4 border-white shadow-lg mb-4 mx-auto"
            />
            
            <h2 className="font-esthetic text-4xl mb-4">Wahyu &amp; Riski</h2>
            
            {guestName && (
              <div className="my-2">
                <small className="text-sm">Kepada Yth Bapak/Ibu/Saudara/i</small>
                <p className="text-xl mt-1">{guestName}</p>
              </div>
            )}
            
            <button 
              type="button" 
              className="bg-white text-gray-800 shadow-lg rounded-2xl mt-3 mx-auto px-6 py-3 hover:bg-gray-100 transition-colors"
              onClick={openInvitation}
            >
              <i className="fa-solid fa-envelope-open fa-bounce mr-2"></i>Open Invitation
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row m-0 p-0 opacity-0" id="root">
        {/* Desktop Sidebar */}
        <div className="hidden sm:block sm:w-5/12 md:w-1/2 lg:w-7/12 xl:w-2/3 sticky top-0 h-screen overflow-hidden m-0 p-0">
          <div className="relative bg-white-black flex justify-center items-center h-screen">
            <div className="flex absolute w-full h-full">
              <div className="relative overflow-hidden w-screen">
                <div className="absolute h-full w-full opacity-30">
                  <img src="/assets/images/bg.webp" alt="bg" className="bg-cover-home" />
                </div>
              </div>
            </div>

            <div className="text-center p-4 bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10 rounded-[2rem] z-10">
              <h2 className="font-esthetic text-3xl mb-4">Wahyu &amp; Riski</h2>
              <p className="text-base">Rabu, 15 Maret 2023</p>
            </div>
          </div>
        </div>

        {/* Main Content - Mobile First */}
        <div className="w-full sm:w-7/12 md:w-1/2 lg:w-5/12 xl:w-1/3 m-0 p-0">
          <main className="relative">
            
            {/* Home Section */}
            <section id="home" className="relative overflow-hidden p-0 m-0 min-h-screen bg-[var(--bg-light-dark)]">
              <img 
                src="/assets/images/bg.webp" 
                alt="bg" 
                className="absolute opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover-home"
              />

              <div className="relative text-center">
                <h1 className="font-esthetic pt-12 pb-4 font-medium text-4xl">Undangan Pernikahan</h1>

                <img 
                  src="/assets/images/bg.webp" 
                  alt="bg" 
                  className="img-center-crop rounded-full border-4 border-white shadow-lg my-6 mx-auto cursor-pointer"
                />

                <h2 className="font-esthetic my-4 text-4xl">Wahyu &amp; Riski</h2>
                <p className="my-2 text-xl">Rabu, 15 Maret 2023</p>

                <button className="btn-outline-auto mt-4">
                  <i className="fa-solid fa-calendar-check mr-2"></i>Save Google Calendar
                </button>

                <div className="flex justify-center items-center mt-6 mb-2">
                  <div className="border-2 border-gray-400 rounded-full px-2 py-1 opacity-50">
                    <div className="scroll-animation rounded bg-gray-400"></div>
                  </div>
                </div>

                <p className="pb-4 text-gray-500 text-sm">Scroll Down</p>
              </div>
            </section>

            {/* Wave Separator */}
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full">
                <path fill="currentColor" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            {/* Bride Section */}
            <section className="bg-[var(--bg-white-black)] text-center py-8" id="bride">
              <h2 className="font-arabic py-4 text-3xl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
              <h2 className="font-esthetic py-4 text-3xl">Assalamualaikum Warahmatullahi Wabarakatuh</h2>
              <p className="pb-4 px-4 text-base">Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:</p>

              <div className="overflow-x-hidden pb-4">
                <div className="relative">
                  <div className="pb-1">
                    <img 
                      src="/assets/images/cowo.webp" 
                      alt="cowo" 
                      className="img-center-crop rounded-full border-4 border-white shadow-lg my-6 mx-auto cursor-pointer"
                    />
                    <h2 className="font-esthetic text-4xl">Nama Wahyu Siapa</h2>
                    <p className="mt-3 mb-1 text-xl">Putra ke-1</p>
                    <p className="mb-0 text-base">Bapak lorem ipsum</p>
                    <p className="mb-0 text-base">dan</p>
                    <p className="mb-0 text-base">Ibu lorem ipsum</p>
                  </div>
                </div>

                <h2 className="font-esthetic mt-4 text-7xl">&amp;</h2>

                <div className="relative">
                  <div className="pb-1">
                    <img 
                      src="/assets/images/cewe.webp" 
                      alt="cewe" 
                      className="img-center-crop rounded-full border-4 border-white shadow-lg my-6 mx-auto cursor-pointer"
                    />
                    <h2 className="font-esthetic text-4xl">Nama Riski Siapa</h2>
                    <p className="mt-3 mb-1 text-xl">Putri ke-2</p>
                    <p className="mb-0 text-base">Bapak lorem ipsum</p>
                    <p className="mb-0 text-base">dan</p>
                    <p className="mb-0 text-base">Ibu lorem ipsum</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Wave Separator */}
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full">
                <path fill="currentColor" fillOpacity="1" d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
              </svg>
            </div>

            {/* Wedding Date Section */}
            <section className="bg-[var(--bg-white-black)] pb-2 px-4" id="wedding-date">
              <div className="container mx-auto text-center">
                <h2 className="font-esthetic py-6 text-4xl">Moment Bahagia</h2>

                <div className="border rounded-full shadow-lg py-3 px-4 mt-2 mb-4">
                  <div className="flex justify-center gap-2">
                    <div className="flex-1 p-1">
                      <p className="inline text-xl m-0">{pad(countdown.days)}</p>
                      <small className="ml-1 text-xs">Hari</small>
                    </div>
                    <div className="flex-1 p-1">
                      <p className="inline text-xl m-0">{pad(countdown.hours)}</p>
                      <small className="ml-1 text-xs">Jam</small>
                    </div>
                    <div className="flex-1 p-1">
                      <p className="inline text-xl m-0">{pad(countdown.minutes)}</p>
                      <small className="ml-1 text-xs">Menit</small>
                    </div>
                    <div className="flex-1 p-1">
                      <p className="inline text-xl m-0">{pad(countdown.seconds)}</p>
                      <small className="ml-1 text-xs">Detik</small>
                    </div>
                  </div>
                </div>

                <p className="py-2 text-base">Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah kami akan menyelenggarakan acara:</p>

                <div className="overflow-x-hidden">
                  <div className="py-2">
                    <h2 className="font-esthetic py-2 text-3xl">Akad</h2>
                    <p className="text-base">Pukul 10.00 WIB - Selesai</p>
                  </div>

                  <div className="py-2">
                    <h2 className="font-esthetic py-2 text-3xl">Resepsi</h2>
                    <p className="text-base">Pukul 13.00 WIB - Selesai</p>
                  </div>
                </div>

                <div className="py-2">
                  <a 
                    href="https://goo.gl/maps/ALZR6FJZU3kxVwN86" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block btn-outline-auto mb-2"
                  >
                    <i className="fa-solid fa-map-location-dot mr-2"></i>Lihat Google Maps
                  </a>
                  <small className="block my-1 text-sm">RT 10 RW 02, Desa Pajerukan, Kec. Kalibagor, Kab. Banyumas, Jawa Tengah 53191.</small>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-[var(--bg-white-black)] pb-8 pt-3 px-4" id="gallery">
              <div className="container mx-auto">
                <div className="border rounded-[2rem] shadow-lg p-4">
                  <h2 className="font-esthetic text-center py-2 text-4xl">Galeri</h2>

                  <div className="mt-4 space-y-4">
                    <img src="https://picsum.photos/1280/720?random=1" alt="image 1" className="w-full rounded-2xl cursor-pointer" />
                    <img src="https://picsum.photos/1280/720?random=2" alt="image 2" className="w-full rounded-2xl cursor-pointer" />
                    <img src="https://picsum.photos/1280/720?random=3" alt="image 3" className="w-full rounded-2xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <section className="bg-[var(--bg-white-black)] py-2">
              <div className="container mx-auto text-center px-4">
                <p className="pb-2 pt-6 text-base">Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.</p>

                <h2 className="font-esthetic text-3xl">Wassalamualaikum Warahmatullahi Wabarakatuh</h2>
                <h2 className="font-arabic pt-6 text-3xl">اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</h2>

                <hr className="my-4" />

                <div className="flex flex-col items-center pb-4 space-y-2">
                  <div>
                    <small>Build with<i className="fa-solid fa-heart mx-1"></i>Dewanakl</small>
                  </div>
                  <div>
                    <small><i className="fa-brands fa-github mr-1"></i><a target="_blank" rel="noopener noreferrer" href="https://github.com/dewanakl/undangan" className="hover:underline">github</a></small>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Bottom Navbar */}
          <nav className="sticky bottom-0 rounded-t-2xl border-t p-0 bg-[var(--bg-white-black)]" id="navbar-menu">
            <ul className="flex justify-around items-center w-full py-2">
              <li>
                <a className="flex flex-col items-center px-2 py-1" href="#home">
                  <i className="fa-solid fa-house"></i>
                  <span className="text-xs mt-1">Home</span>
                </a>
              </li>
              <li>
                <a className="flex flex-col items-center px-2 py-1" href="#bride">
                  <i className="fa-solid fa-user-group"></i>
                  <span className="text-xs mt-1">Mempelai</span>
                </a>
              </li>
              <li>
                <a className="flex flex-col items-center px-2 py-1" href="#wedding-date">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span className="text-xs mt-1">Tanggal</span>
                </a>
              </li>
              <li>
                <a className="flex flex-col items-center px-2 py-1" href="#gallery">
                  <i className="fa-solid fa-images"></i>
                  <span className="text-xs mt-1">Galeri</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

