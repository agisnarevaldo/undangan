"use client";

import { useRef, useEffect, useState } from "react";

interface WelcomeOverlayProps {
  guestName: string | null;
  onOpenInvitation: () => void;
}

export default function WelcomeOverlay({
  guestName,
  onOpenInvitation,
}: WelcomeOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMuted, setVideoMuted] = useState(true);

  // Try to unmute video on first user interaction
  const handleEnableSound = () => {
    if (videoRef.current && videoMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.6;
      setVideoMuted(false);
    }
  };

  const handleOpenInvitation = () => {
    // Mute video before opening invitation
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
    // Call parent handler which will trigger AudioPlayer
    onOpenInvitation();
  };

  return (
    <div
      className="fixed inset-0 bg-white dark:bg-black overflow-y-auto z-50 flex items-center justify-center p-4"
      id="welcome"
      onClick={handleEnableSound}
    >
      <div className="absolute inset-0 opacity-60 -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/cinematic.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sound indicator */}
      {videoMuted && (
        <div className="absolute top-6 right-6 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg animate-pulse">
          <i className="fa-solid fa-volume-xmark mr-2 text-red-500"></i>
          <span className="text-sm">Klik untuk aktifkan suara</span>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-col text-center">
          <h2 className="font-esthetic mb-4 text-[2.25rem]">The Wedding Of</h2>
          <img
            src="/images/updated/welcome.png"
            alt="background"
            className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md mb-4 mx-auto"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="font-esthetic mb-4 text-[2.25rem]">
            Tryanda &amp; Putri
          </h2>
          <small className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Kepada Yth Bapak/Ibu/Saudara/i
          </small>
          {guestName && (
            <div className="my-2">
              <p className="text-xl">{guestName}</p>
            </div>
          )}
          <button
            type="button"
            className="bg-white dark:bg-gray-100 text-gray-900 shadow-md rounded-full mt-3 mx-auto px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            onClick={handleOpenInvitation}
          >
            <i className="fa-solid fa-envelope-open mr-2 animate-bounce"></i>
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
