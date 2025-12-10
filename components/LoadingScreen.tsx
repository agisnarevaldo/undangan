"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loading screen when progress reaches 100%
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center z-[9999] transition-opacity duration-1000"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
      id="loading"
    >
      <div className="text-center animate-pulse">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">
          The Wedding of
        </p>
        <h1 className="font-esthetic text-5xl md:text-6xl text-gray-900 dark:text-gray-100 mb-6">
          Tryanda & Putri
        </h1>
      </div>

      <div className="w-48 bg-gray-200 dark:bg-gray-800 rounded-full h-[2px] mt-4 overflow-hidden">
        <div
          className="bg-gray-900 dark:bg-white h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      <p className="text-[10px] text-gray-400 mt-2 tracking-widest">
        Loading {Math.floor(Math.min(progress, 100))}%
      </p>
    </div>
  );
}
