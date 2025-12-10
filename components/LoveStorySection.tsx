'use client'

export default function LoveStorySection() {
    return (
        <section className="bg-section pb-4" id="story">
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
    )
}
