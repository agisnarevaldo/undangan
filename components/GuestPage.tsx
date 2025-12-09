'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

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
        <div className="loading-page bg-white-black" id="welcome" style={{ opacity: 1 }}>
          <div className="d-flex justify-content-center align-items-center vh-100 overflow-y-auto">
            <div className="d-flex flex-column text-center">
              <h2 className="font-esthetic mb-4" style={{ fontSize: '2.25rem' }}>The Wedding Of</h2>
              
              <img 
                src="/assets/images/bg.webp" 
                alt="background" 
                className="img-center-crop rounded-circle border border-3 border-light shadow mb-4 mx-auto"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              
              <h2 className="font-esthetic mb-4" style={{ fontSize: '2.25rem' }}>Wahyu &amp; Riski</h2>
              
              {guestName && (
                <div className="m-2">
                  <small className="mt-0 mb-1 mx-0 p-0">Kepada Yth Bapak/Ibu/Saudara/i</small>
                  <p className="m-0 p-0" style={{ fontSize: '1.25rem' }}>{guestName}</p>
                </div>
              )}
              
              <button 
                type="button" 
                className="btn btn-light shadow rounded-4 mt-3 mx-auto"
                onClick={openInvitation}
              >
                <i className="fa-solid fa-envelope-open fa-bounce me-2"></i>Open Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="row m-0 p-0 opacity-0" id="root">
        {/* Desktop mode */}
        <div className="sticky-top vh-100 d-none d-sm-block col-sm-5 col-md-6 col-lg-7 col-xl-8 col-xxl-9 overflow-y-hidden m-0 p-0">
          <div className="position-relative bg-white-black d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex position-absolute w-100 h-100">
              <div className="position-relative overflow-hidden vw-100">
                <div className="position-absolute h-100 w-100 slide-desktop" style={{ opacity: 0.3 }}>
                  <img src="/assets/images/bg.webp" alt="bg" className="bg-cover-home" style={{ maskImage: 'none', opacity: '30%' }} />
                </div>
              </div>
            </div>

            <div className="text-center p-4 bg-overlay-auto rounded-5">
              <h2 className="font-esthetic mb-4" style={{ fontSize: '2rem' }}>Wahyu &amp; Riski</h2>
              <p className="m-0" style={{ fontSize: '1rem' }}>Rabu, 15 Maret 2023</p>
            </div>
          </div>
        </div>

        {/* Smartphone mode */}
        <div className="col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-3 m-0 p-0">
          {/* Main Content */}
          <main data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-root-margin="25% 0% 0% 0%" data-bs-smooth-scroll="true" tabIndex={0}>
            
            {/* Home */}
            <section id="home" className="bg-light-dark position-relative overflow-hidden p-0 m-0">
              <img src="/assets/images/bg.webp" alt="bg" className="position-absolute opacity-25 top-50 start-50 translate-middle bg-cover-home" />

              <div className="position-relative text-center bg-overlay-auto" style={{ backgroundColor: 'unset' }}>
                <h1 className="font-esthetic pt-5 pb-4 fw-medium" style={{ fontSize: '2.25rem' }}>Undangan Pernikahan</h1>

                <img 
                  src="/assets/images/bg.webp" 
                  alt="bg" 
                  className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />

                <h2 className="font-esthetic my-4" style={{ fontSize: '2.25rem' }}>Wahyu &amp; Riski</h2>
                <p className="my-2" style={{ fontSize: '1.25rem' }}>Rabu, 15 Maret 2023</p>

                <button className="btn btn-outline-auto btn-sm shadow rounded-pill px-3 py-1" style={{ fontSize: '0.825rem' }}>
                  <i className="fa-solid fa-calendar-check me-2"></i>Save Google Calendar
                </button>

                <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
                  <div className="mouse-animation border border-secondary border-2 rounded-5 px-2 py-1 opacity-50">
                    <div className="scroll-animation rounded-4 bg-secondary"></div>
                  </div>
                </div>

                <p className="pb-4 m-0 text-secondary" style={{ fontSize: '0.825rem' }}>Scroll Down</p>
              </div>
            </section>

            {/* Wave Separator */}
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
                <path fill="currentColor" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            {/* Bride Section */}
            <section className="bg-white-black text-center" id="bride">
              <h2 className="font-arabic py-4 m-0" style={{ fontSize: '2rem' }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
              <h2 className="font-esthetic py-4 m-0" style={{ fontSize: '2rem' }}>Assalamualaikum Warahmatullahi Wabarakatuh</h2>
              <p className="pb-4 px-2 m-0" style={{ fontSize: '0.95rem' }}>Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:</p>

              <div className="overflow-x-hidden pb-4">
                <div className="position-relative">
                  <div className="pb-1">
                    <img 
                      src="/assets/images/cowo.webp" 
                      alt="cowo" 
                      className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h2 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>Nama Wahyu Siapa</h2>
                    <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>Putra ke-1</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>Bapak lorem ipsum</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>dan</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>Ibu lorem ipsum</p>
                  </div>
                </div>

                <h2 className="font-esthetic mt-4" style={{ fontSize: '4.5rem' }}>&amp;</h2>

                <div className="position-relative">
                  <div className="pb-1">
                    <img 
                      src="/assets/images/cewe.webp" 
                      alt="cewe" 
                      className="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto cursor-pointer"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h2 className="font-esthetic m-0" style={{ fontSize: '2.125rem' }}>Nama Riski Siapa</h2>
                    <p className="mt-3 mb-1" style={{ fontSize: '1.25rem' }}>Putri ke-2</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>Bapak lorem ipsum</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>dan</p>
                    <p className="mb-0" style={{ fontSize: '0.95rem' }}>Ibu lorem ipsum</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Wave Separator */}
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="color-theme-svg no-gap-bottom">
                <path fill="currentColor" fillOpacity="1" d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
              </svg>
            </div>

            {/* Wedding Date */}
            <section className="bg-white-black pb-2" id="wedding-date">
              <div className="container text-center">
                <h2 className="font-esthetic py-4 m-0" style={{ fontSize: '2.25rem' }}>Moment Bahagia</h2>

                <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4">
                  <div className="row justify-content-center">
                    <div className="col-3 p-1">
                      <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>{pad(countdown.days)}</p>
                      <small className="ms-1 me-0 my-0 p-0 d-inline">Hari</small>
                    </div>
                    <div className="col-3 p-1">
                      <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>{pad(countdown.hours)}</p>
                      <small className="ms-1 me-0 my-0 p-0 d-inline">Jam</small>
                    </div>
                    <div className="col-3 p-1">
                      <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>{pad(countdown.minutes)}</p>
                      <small className="ms-1 me-0 my-0 p-0 d-inline">Menit</small>
                    </div>
                    <div className="col-3 p-1">
                      <p className="d-inline m-0 p-0" style={{ fontSize: '1.25rem' }}>{pad(countdown.seconds)}</p>
                      <small className="ms-1 me-0 my-0 p-0 d-inline">Detik</small>
                    </div>
                  </div>
                </div>

                <p className="py-2 m-0" style={{ fontSize: '0.95rem' }}>Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah kami akan menyelenggarakan acara:</p>

                <div className="overflow-x-hidden">
                  <div className="py-2">
                    <h2 className="font-esthetic m-0 py-2" style={{ fontSize: '2rem' }}>Akad</h2>
                    <p style={{ fontSize: '0.95rem' }}>Pukul 10.00 WIB - Selesai</p>
                  </div>

                  <div className="py-2">
                    <h2 className="font-esthetic m-0 py-2" style={{ fontSize: '2rem' }}>Resepsi</h2>
                    <p style={{ fontSize: '0.95rem' }}>Pukul 13.00 WIB - Selesai</p>
                  </div>
                </div>

                <div className="py-2">
                  <a 
                    href="https://goo.gl/maps/ALZR6FJZU3kxVwN86" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-auto btn-sm rounded-pill shadow mb-2 px-3"
                  >
                    <i className="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps
                  </a>
                  <small className="d-block my-1">RT 10 RW 02, Desa Pajerukan, Kec. Kalibagor, Kab. Banyumas, Jawa Tengah 53191.</small>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className="bg-white-black pb-5 pt-3" id="gallery">
              <div className="container">
                <div className="border rounded-5 shadow p-3">
                  <h2 className="font-esthetic text-center py-2 m-0" style={{ fontSize: '2.25rem' }}>Galeri</h2>

                  <div id="carousel-image-one" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carousel-image-one" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner rounded-4">
                      <div className="carousel-item active">
                        <img src="https://picsum.photos/1280/720?random=1" alt="image 1" className="d-block img-fluid cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=2" alt="image 2" className="d-block img-fluid cursor-pointer" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://picsum.photos/1280/720?random=3" alt="image 3" className="d-block img-fluid cursor-pointer" />
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
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="bg-white-black py-2 no-gap-bottom">
              <div className="container text-center">
                <p className="pb-2 pt-4" style={{ fontSize: '0.95rem' }}>Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.</p>

                <h2 className="font-esthetic" style={{ fontSize: '2rem' }}>Wassalamualaikum Warahmatullahi Wabarakatuh</h2>
                <h2 className="font-arabic pt-4" style={{ fontSize: '2rem' }}>اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ</h2>

                <hr className="my-3" />

                <div className="row align-items-center justify-content-between flex-column pb-3">
                  <div className="col-auto">
                    <small>Build with<i className="fa-solid fa-heart mx-1"></i>Dewanakl</small>
                  </div>
                  <div className="col-auto">
                    <small><i className="fa-brands fa-github me-1"></i><a target="_blank" rel="noopener noreferrer" href="https://github.com/dewanakl/undangan">github</a></small>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Navbar Bottom */}
          <nav className="navbar navbar-expand sticky-bottom rounded-top-4 border-top p-0" id="navbar-menu">
            <ul className="navbar-nav nav-justified w-100 align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  <i className="fa-solid fa-house"></i>
                  <span className="d-block" style={{ fontSize: '0.7rem' }}>Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bride">
                  <i className="fa-solid fa-user-group"></i>
                  <span className="d-block" style={{ fontSize: '0.7rem' }}>Mempelai</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#wedding-date">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span className="d-block" style={{ fontSize: '0.7rem' }}>Tanggal</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#gallery">
                  <i className="fa-solid fa-images"></i>
                  <span className="d-block" style={{ fontSize: '0.7rem' }}>Galeri</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* AOS Animation Library */}
      <Script
        src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).AOS) {
            (window as any).AOS.init()
          }
        }}
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
      />
    </>
  )
}
