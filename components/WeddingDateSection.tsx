"use client";

interface WeddingDateSectionProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export default function WeddingDateSection({
  countdown,
}: WeddingDateSectionProps) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <section className="bg-white dark:bg-black pb-8" id="wedding-date">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic py-4 m-0 text-[2.25rem] text-gray-900 dark:text-gray-100">
          Moment Bahagia
        </h2>
        <div className="border border-gray-300 dark:border-gray-600 rounded-full shadow py-2 px-4 mt-2 mb-4 inline-block bg-section">
          <div className="flex justify-center gap-4">
            <div className="p-1">
              <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">
                {pad(countdown.days)}
              </p>
              <small className="ml-1 inline text-gray-600 dark:text-gray-400">
                Hari
              </small>
            </div>
            <div className="p-1">
              <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">
                {pad(countdown.hours)}
              </p>
              <small className="ml-1 inline text-gray-600 dark:text-gray-400">
                Jam
              </small>
            </div>
            <div className="p-1">
              <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">
                {pad(countdown.minutes)}
              </p>
              <small className="ml-1 inline text-gray-600 dark:text-gray-400">
                Menit
              </small>
            </div>
            <div className="p-1">
              <p className="inline m-0 p-0 text-xl text-gray-900 dark:text-gray-100">
                {pad(countdown.seconds)}
              </p>
              <small className="ml-1 inline text-gray-600 dark:text-gray-400">
                Detik
              </small>
            </div>
          </div>
        </div>
        <p className="py-2 m-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, insyaAllah
          kami akan menyelenggarakan acara:
        </p>
        <div className="relative">
          <div className="absolute top-0 right-[5%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="opacity-50 animate-love"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </div>
        </div>
        <div className="overflow-x-hidden">
          <div className="py-2" data-aos="fade-right" data-aos-duration="1500">
            <h2 className="font-esthetic m-0 py-2 text-2xl text-gray-900 dark:text-gray-100">
              Akad
            </h2>
            <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">
              Pukul {pad(countdown.hours)}:{pad(countdown.minutes)} WIB -
              Selesai
            </p>
          </div>
          <div className="py-2" data-aos="fade-left" data-aos-duration="1500">
            <h2 className="font-esthetic m-0 py-2 text-2xl text-gray-900 dark:text-gray-100">
              Resepsi
            </h2>
            <p className="text-[0.95rem] text-gray-700 dark:text-gray-300">
              Pukul 14.00 WIB - Selesai
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 left-[5%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="opacity-50 animate-love"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </div>
        </div>
        <div className="py-2">
          <a
            href="https://maps.app.goo.gl/nwq593KvAniv6UjD9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow rounded-full mb-2 px-3 py-1 text-[0.825rem] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <i className="fa-solid fa-map-location-dot mr-2"></i>Lihat Google
            Maps
          </a>
          <small className="block my-1 text-gray-600 dark:text-gray-400">
            Link Margasari RT07/RW05 Kec.langensari KEL.Bojongkantong Kota Banjar, Jawa Barat
          </small>
        </div>
      </div>
    </section>
  );
}
