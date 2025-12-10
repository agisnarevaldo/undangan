"use client";

import { useState } from "react";

export default function GiftSection() {
  const [showQris, setShowQris] = useState(false);
  const [showGift, setShowGift] = useState(false);

  return (
    <section className="bg-section pb-4 border-b border-gray-300 dark:border-gray-700" id="gift">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic pt-3 mb-4 text-[2.25rem] text-gray-900 dark:text-gray-100">
          Love Gift
        </h2>
        <p className="mb-1 text-[0.95rem] text-gray-700 dark:text-gray-300">
          Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada
          kami, dapat melalui:
        </p>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start cursor-pointer transition-transform hover:scale-[1.02]"
          data-aos="fade-up"
          data-aos-duration="2500"
          onClick={() => { }}
        >
          <i className="fa-solid fa-wallet fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">DANA</p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Putri / Tryanda
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText("081395000225");
              }}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start cursor-pointer transition-transform hover:scale-[1.02]"
          data-aos="fade-up"
          data-aos-duration="2500"
          onClick={() => setShowQris(!showQris)}
        >
          <i className="fa-solid fa-qrcode fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Qris</p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Tryanda & Putri
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowQris(!showQris);
              }}
            >
              <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${showQris ? "max-h-96 mt-2" : "max-h-0"
              }`}
          >
            <hr className="my-2" />
            <div className="flex flex-col items-center gap-3">
              <img
                src="/images/payment/qris.png"
                alt="Qris Dana"
                className="max-w-[200px] rounded-lg border border-gray-200"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                a.n Tryanda Anggita Suwito
              </p>
              <a
                href="https://wa.me/6281395000225?text=Halo%20Tryanda%2C%20saya%20sudah%20kirim%20hadiah%20via%20QRIS%2FDana.%20Mohon%20diterima%20ya%20%F0%9F%99%8F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fa-brands fa-whatsapp"></i>
                Konfirmasi via WA
              </a>
            </div>
          </div>
        </div>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start cursor-pointer transition-transform hover:scale-[1.02]"
          data-aos="fade-up"
          data-aos-duration="2500"
          onClick={() => setShowGift(!showGift)}
        >
          <i className="fa-solid fa-gift fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">
            Kado Fisik
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Kirim ke Alamat
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowGift(!showGift);
              }}
            >
              <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${showGift ? "max-h-96 mt-2" : "max-h-0"
              }`}
          >
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                <i className="fa-solid fa-phone-volume mr-1"></i>0813-9500-0225
              </p>
              <button
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText("081395000225");
                }}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                <i className="fa-solid fa-location-dot mr-1"></i>Link Margasari
                RT 07 / RW 05 Kec. Langensari
              </p>
              <button
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    "Link Margasari RT 07 / RW 05 Kec. Langensari Kel. Bojongkantong Kota Banjar, Jawa Barat"
                  );
                }}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
