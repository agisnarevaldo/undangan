'use client'

export default function BrideSection() {
    return (
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
    )
}
