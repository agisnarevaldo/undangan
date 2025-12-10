"use client";

import SvgDivider from "./SvgDivider";

interface HeroSectionProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export default function HeroSection({ countdown }: HeroSectionProps) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const handleAddToCalendar = () => {
    // Event details
    const eventDetails = {
      title: "Pernikahan Tryanda & Putri",
      description: "Undangan Pernikahan Tryanda & Putri",
      location: "Lokasi Acara", // Sesuaikan dengan lokasi sebenarnya
      startDate: "20251214T080000", // Format: YYYYMMDDTHHMMSS (14 Desember 2025, 08:00)
      endDate: "20251214T140000", // Format: YYYYMMDDTHHMMSS (14 Desember 2025, 14:00)
    };

    // Build Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}&dates=${
      eventDetails.startDate
    }/${eventDetails.endDate}`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <section
      id="home"
      className="bg-gray-100 dark:bg-[#212529] relative overflow-hidden p-0 m-0"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute opacity-60 inset-0 w-full h-full object-cover bg-cover-home"
      >
        <source src="/videos/cinematic.mp4" type="video/mp4" />
      </video>
      <div className="relative text-center py-8 z-10 backdrop-blur-[4px]">
        <h1 className="font-esthetic pt-5 pb-4 font-medium text-[2.25rem]">
          Undangan Pernikahan
        </h1>
        <img
          src="/images/updated/welcome.png"
          alt="bg"
          className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md my-4 mx-auto cursor-pointer"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <h2 className="font-esthetic my-4 text-[2.25rem]">
          Tryanda &amp; Putri
        </h2>
        <p className="my-2 text-xl text-gray-700 dark:text-gray-300">
          Minggu, 14 Desember 2025
        </p>
        <button
          onClick={handleAddToCalendar}
          className="inline-block bg-white dark:bg-[#212529bf] backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow rounded-full px-3 py-1 text-[0.825rem] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors my-3 cursor-pointer"
        >
          <i className="fa-solid fa-calendar-check mr-2"></i>Save Google
          Calendar
        </button>
        <div className="flex justify-center items-center mt-4 mb-2">
          <div className="w-5 h-8 border-2 border-gray-600 dark:border-gray-400 rounded-full flex items-start justify-center pt-1.5 opacity-70">
            <div className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-scroll-mouse"></div>
          </div>
        </div>
        <p className="pb-4 m-0 text-gray-500 text-[0.825rem]">Scroll Down</p>
      </div>
    </section>
  );
}
