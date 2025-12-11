"use client";

import { useState } from "react";

export default function LocationMap() {
  const [activeTab, setActiveTab] = useState<"denah" | "maps">("denah");

  return (
    <section className="bg-white dark:bg-black pb-8" id="location-map">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic py-4 m-0 text-4xl text-gray-900 dark:text-gray-100">
          Denah Lokasi
        </h2>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab("denah")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "denah"
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <i className="fa-solid fa-map mr-2"></i>
            Denah
          </button>
          <button
            onClick={() => setActiveTab("maps")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === "maps"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <i className="fa-solid fa-location-dot mr-2"></i>
            Google Maps
          </button>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Denah SVG */}
          {activeTab === "denah" && (
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              data-aos="fade-up"
            >
              <div className="relative w-full max-w-md mx-auto bg-transparent rounded-3xl overflow-hidden p-6 shadow-none">
                <svg
                  viewBox="0 0 400 600"
                  className="w-full h-auto"
                  style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                >
                  {/* Roads */}
                  <g
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="12"
                    className="dark:stroke-gray-400"
                  >
                    {/* Main Vertical Road */}
                    <path d="M 200,50 L 200,500" />

                    {/* Top Cross Road (Kota Banjar - Langensari) */}
                    <path d="M 20,100 L 380,100" />

                    {/* Road to Sasagaran (Left) */}
                    <path d="M 20,350 L 200,350" />

                    {/* Bottom Fork */}
                    {/* Left to Margasari (Lokasi) */}
                    <path d="M 200,500 L 100,580" />
                    {/* Right to Karang Baha */}
                    <path d="M 200,500 L 300,580" />
                  </g>

                  {/* Road Names & Locations */}
                  <g className="text-[12px] fill-gray-800 dark:fill-gray-200 font-sans font-semibold">
                    {/* Top: Pasar Langkap */}
                    <text x="200" y="30" textAnchor="middle">
                      Pasar Langkap Lancar
                    </text>

                    {/* Top Left: Kota Banjar */}
                    <text x="80" y="85" textAnchor="middle">
                      ← Kota Banjar
                    </text>

                    {/* Top Right: Langensari / Lakbok */}
                    <text x="320" y="85" textAnchor="middle">
                      Langensari / Lakbok →
                    </text>

                    {/* Landmark: Masjid At-Taqwa */}
                    <g transform="translate(230, 250)">
                      {/* Mosque Icon */}
                      <path
                        fill="#0d9488"
                        d="M15,2 L2,12 H28 L15,2 M5,12 V25 H25 V12"
                      />
                      <text
                        x="15"
                        y="40"
                        textAnchor="middle"
                        className="text-[10px]"
                      >
                        Masjid
                      </text>
                      <text
                        x="15"
                        y="52"
                        textAnchor="middle"
                        className="text-[10px]"
                      >
                        At-Taqwa
                      </text>
                    </g>

                    {/* Left Branch: Sasagaran */}
                    <text x="80" y="340" textAnchor="middle">
                      Sasagaran
                    </text>

                    {/* Bottom Right: Karang Baha */}
                    <text x="320" y="560" textAnchor="middle">
                      Karang Baha
                    </text>

                    {/* Bottom Left: Margasari & LOKASI */}
                    <text x="80" y="530" textAnchor="middle" className="animate-pulse">
                      Margasari
                    </text>

                    {/* Location Pin Marker */}
                    <g transform="translate(100, 560)">
                      {/* Pulse ring animation */}
                      <circle
                        cx="0"
                        cy="-5"
                        r="12"
                        fill="none"
                        stroke="#e66f6fff"
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-ping"
                      />
                      {/* Pin shape */}
                      <path
                        fill="#e66f6fff"
                        d="M0,-20 C-6,-20 -10,-16 -10,-10 C-10,-4 0,5 0,5 C0,5 10,-4 10,-10 C10,-16 6,-20 0,-20 Z"
                        className="animate-pulse"
                      />
                      {/* Pin inner circle */}
                      <circle
                        cx="0"
                        cy="-10"
                        fill="white"
                        r="3"
                        className="animate-pulse"
                      />
                      <text
                        x="-1"
                        y="40"
                        textAnchor="middle"
                        fill="#e66f6fff"
                        fontWeight="bold"
                        className="animate-pulse"
                      >
                        LOKASI
                      </text>
                    </g>
                  </g>
                </svg>
                <p className="text-center text-xs mt-4 text-gray-300">
                  *Ikuti petunjuk jalan arah Margasari
                </p>
              </div>
            </div>
          )}

          {/* Google Maps */}
          {activeTab === "maps" && (
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              data-aos="fade-up"
            >
              <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200/50 dark:border-gray-700/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3957.3834579!2d108.612462!3d-7.3834579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjMnMDAuNSJTIDEwOMKwMzYnNDQuOSJF!5e0!3m2!1sen!2sid!4v1733857200000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://www.google.com/maps/place/-7.3834579,108.612462/@-7.3834579,108.612462,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 font-medium"
                >
                  <i className="fa-solid fa-location-arrow"></i>
                  Buka di Google Maps
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-7.3834579,108.612462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-lg shadow-pink-500/30 transition-all hover:scale-105 font-medium"
                >
                  <i className="fa-solid fa-route"></i>
                  Petunjuk Arah
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
