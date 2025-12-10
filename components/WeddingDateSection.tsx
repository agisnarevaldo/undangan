'use client'

interface WeddingDateSectionProps {
    countdown: {
        days: number
        hours: number
        minutes: number
        seconds: number
    }
}

export default function WeddingDateSection({ countdown }: WeddingDateSectionProps) {
    const pad = (num: number) => num.toString().padStart(2, '0')

    return (
        <section className="bg-white dark:bg-black pb-8" id="wedding-date">
            <div className="mx-auto px-4 text-center">
                <h2 className="font-esthetic py-4 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">Moment Bahagia</h2>
                <div className="border border-gray-300 dark:border-gray-600 rounded-full shadow py-2 px-4 mt-2 mb-4 inline-block bg-section">
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
                    <div className="py-2" data-aos="fade-right" data-aos-duration="1500">
                        <h2 className="font-esthetic m-0 py-2 text-2xl text-gray-900 dark:text-gray-100">Akad</h2>
                        <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">Pukul 10.00 WIB - Selesai</p>
                    </div>
                    <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
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

                {/* <p className="py-2 m-0 text-[0.95rem] text-gray-700 dark:text-gray-300">Demi kehangatan bersama, kami memohon kesediaan Anda untuk mengenakan dress code berikut:</p>
                <div className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow p-4 mx-4 mt-3 bg-white dark:bg-gray-900">
                    <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">Busana batik dan bersepatu.</p>
                </div> */}
            </div>
        </section>
    )
}
