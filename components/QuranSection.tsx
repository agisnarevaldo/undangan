"use client";

export default function QuranSection() {
  return (
    <section className="bg-section pb-4">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-arabic text-3xl md:text-4xl mb-3 text-gray-900 dark:text-gray-100">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>
        <h2 className="font-esthetic mb-4 text-[2.25rem] text-gray-900 dark:text-gray-100">
          Allah Subhanahu Wa Ta&apos;ala berfirman
        </h2>
        <div
          className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow-lg p-4 mx-4 bg-white dark:bg-[#343a40]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <p className="text-[0.95rem] text-gray-700 dark:text-gray-300 mb-3">
            Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu
            mengingat (kebesaran Allah).
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            QS. Adh-Dhariyat: 49
          </p>
        </div>
        <div
          className="border border-gray-300 dark:border-gray-600 rounded-3xl shadow-lg p-4 mx-4 mt-3 bg-white dark:bg-[#343a40]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <p className="text-[0.95rem] text-gray-700 dark:text-gray-300 mb-3">
            dan sesungguhnya Dialah yang menciptakan pasangan laki-laki dan
            perempuan,
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            QS. An-Najm: 45
          </p>
        </div>
      </div>
    </section>
  );
}
