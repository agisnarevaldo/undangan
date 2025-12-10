"use client";

export default function LocationMap() {
  return (
    <section className="bg-white dark:bg-black pb-8" id="location-map">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic py-4 m-0 text-2xl text-gray-900 dark:text-gray-100">
          Denah Lokasi
        </h2>

        <div className="relative w-full max-w-md mx-auto bg-[#f8f9fa] dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-3xl overflow-hidden p-6 shadow-md">
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
                Pasar Langkap
              </text>
              <text x="200" y="45" textAnchor="middle">
                Lancar
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
                <text x="15" y="40" textAnchor="middle" className="text-[10px]">
                  Masjid
                </text>
                <text x="15" y="52" textAnchor="middle" className="text-[10px]">
                  At-Taqwa
                </text>
              </g>

              {/* Left Branch: Sasagaran */}
              <text x="80" y="340" textAnchor="middle">
                Sasagaran
              </text>

              {/* Bottom Right: Tarang Baha */}
              <text x="320" y="560" textAnchor="middle">
                Tarang Baha
              </text>

              {/* Bottom Left: Margasari & LOKASI */}
              <text
                x="80"
                y="540"
                textAnchor="middle"
                transform="rotate(35, 80, 540)"
              >
                Margasari
              </text>

              {/* Location Marker */}
              <g transform="translate(100, 560)">
                <circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill="#ef4444"
                  className="animate-bounce"
                />
                <path
                  fill="white"
                  d="M-5,-5 L5,-5 L0,5 Z"
                  transform="translate(0,2)"
                />
                <text
                  x="0"
                  y="-20"
                  textAnchor="middle"
                  fill="#ef4444"
                  fontWeight="bold"
                >
                  LOKASI
                </text>
              </g>
            </g>
          </svg>
          <p className="text-center text-xs mt-4 text-gray-500">
            *Ikuti petunjuk jalan arah Margasari
          </p>
        </div>
      </div>
    </section>
  );
}
