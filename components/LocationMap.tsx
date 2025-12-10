"use client";

export default function LocationMap() {
  return (
    <section className="bg-white dark:bg-black pb-8" id="location-map">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic py-4 m-0 text-2xl text-gray-900 dark:text-gray-100">
          Denah Lokasi
        </h2>

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
              {/* <text x="200" y="45" textAnchor="middle">
                Lancar
              </text> */}

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
                  r="3"
                  fill="white"
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
    </section>
  );
}
