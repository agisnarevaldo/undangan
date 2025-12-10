'use client'

export default function CommentSection() {
    return (
        <section className="bg-section pb-2" id="comment">
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
    )
}
