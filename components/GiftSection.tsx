"use client";

import { useState } from "react";

export default function GiftSection() {
  const [showQris, setShowQris] = useState(false);
  const [showGift, setShowGift] = useState(false);

  return (
    <section className="bg-section pb-3" id="gift">
      <div className="mx-auto px-4 text-center">
        <h2 className="font-esthetic pt-3 mb-4 text-[2.25rem] text-gray-900 dark:text-gray-100">
          Love Gift
        </h2>
        <p className="mb-1 text-[0.95rem] text-gray-700 dark:text-gray-300">
          Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada
          kami, dapat melalui:
        </p>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start"
          data-aos="fade-up"
          data-aos-duration="2500"
        >
          <i className="fa-solid fa-money-bill-transfer fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">
            Transfer
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Putri Suciati
              Siapa?
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={() => navigator.clipboard.writeText("1234567891234")}
            >
              <i className="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start"
          data-aos="fade-up"
          data-aos-duration="2500"
        >
          <i className="fa-solid fa-qrcode fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Qris</p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Tryanda Anggita
              Suwito Siapa?
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowQris(!showQris)}
            >
              <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showQris ? "max-h-96 mt-2" : "max-h-0"
            }`}
          >
            <hr className="my-2" />
            <div className="flex justify-center items-center">
              <img
                src="/images/donate.png"
                alt="donate"
                className="max-w-full rounded bg-white p-2"
              />
            </div>
          </div>
        </div>

        <div
          className="bg-[#f8f9fa] dark:bg-[#343a40] rounded-2xl shadow-lg p-3 mx-4 mt-4 text-start"
          data-aos="fade-up"
          data-aos-duration="2500"
        >
          <i className="fa-solid fa-gift fa-lg"></i>
          <p className="d-inline ms-2 text-gray-900 dark:text-gray-100">Gift</p>
          <div className="flex justify-between items-center mt-2">
            <p className="m-0 p-0 text-[0.95rem] text-gray-700 dark:text-gray-300">
              <i className="fa-regular fa-user fa-sm mr-1"></i>Tryanda Anggita
              Suwito Siapa?
            </p>
            <button
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowGift(!showGift)}
            >
              <i className="fa-solid fa-circle-info fa-sm mr-1"></i>Info
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showGift ? "max-h-96 mt-2" : "max-h-0"
            }`}
          >
            <hr className="my-2" />
            <div className="flex justify-between items-center mb-2">
              <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                <i className="fa-solid fa-phone-volume mr-1"></i>0812345678
              </p>
              <button
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => navigator.clipboard.writeText("0812345678")}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="m-0 p-0 text-sm text-gray-700 dark:text-gray-300">
                <i className="fa-solid fa-location-dot mr-1"></i>Jl. Example No.
                123
              </p>
              <button
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm rounded-2xl py-0 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() =>
                  navigator.clipboard.writeText("Jl. Example No. 123")
                }
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
