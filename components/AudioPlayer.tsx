"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  // Auto-play when autoPlay prop becomes true
  useEffect(() => {
    if (autoPlay && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      console.log("🎵 Auto-play triggered from prop");

      const audio = audioRef.current;

      const attemptPlay = async () => {
        try {
          console.log("🎵 Attempting to play audio...");
          console.log(
            "📊 Current state - readyState:",
            audio.readyState,
            "networkState:",
            audio.networkState
          );

          // Set volume and mute first
          audio.volume = 0.5;
          audio.muted = true;

          console.log("▶️ Calling audio.play()...");
          // Try to play
          await audio.play();
          console.log("✅ Music started (muted), unmuting...");

          // Unmute after successful play
          setTimeout(() => {
            audio.muted = false;
            setIsPlaying(true);
            console.log("✅ Music playing successfully 🎵");
          }, 100);
        } catch (error: any) {
          console.warn("❌ Auto-play failed:", error.message);
          console.warn("📊 Error details:", error);
          console.warn("💡 Silakan klik tombol musik untuk memutar manual");
          audio.muted = false;
          setIsPlaying(false);
          hasAutoPlayed.current = false;
        }
      };

      // Event listeners for monitoring
      const handleCanPlay = () => {
        console.log("✅ Audio canplay event fired");
      };

      const handleLoadedData = () => {
        console.log("✅ Audio loadeddata event fired");
      };

      const handleError = (e: Event) => {
        const error = audio.error;
        if (error) {
          console.error("❌ Audio loading error:");
          console.error("  - Error code:", error.code);
          console.error("  - Error message:", error.message);
        }
        hasAutoPlayed.current = false;
      };

      // Add event listeners for monitoring
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("error", handleError);

      // Try to load
      try {
        audio.load();
        console.log("🔄 Audio load() called");

        // Try to play immediately (don't wait for load to complete)
        console.log("⏱️ Scheduling play attempt in 300ms...");
        setTimeout(() => {
          console.log("⏱️ Timeout fired, calling attemptPlay()");
          attemptPlay();
        }, 300);
      } catch (err) {
        console.error("❌ Error calling audio.load():", err);
      }

      return () => {
        console.log("🧹 Cleanup AudioPlayer effect");
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadeddata", handleLoadedData);
        audio.removeEventListener("error", handleError);
      };
    }
  }, [autoPlay]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/pure-love-304010.mp3"
      >
        Your browser does not support the audio element.
      </audio>

      <button
        type="button"
        id="button-music"
        onClick={toggleAudio}
        className={`btn btn-transparent border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-lg mt-3 w-12 h-12 flex items-center justify-center transition-all duration-500 ${
          isPlaying ? "rotate-center" : ""
        }`}
        aria-label="Toggle music"
        style={{ animation: isPlaying ? "spin 4s linear infinite" : "none" }}
      >
        <i
          className={`fa-solid fa-compact-disc text-2xl ${
            isPlaying ? "text-gray-800 dark:text-gray-200" : "text-gray-500"
          }`}
        ></i>
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
            <i className="fa-solid fa-play text-white text-xs"></i>
          </div>
        )}
      </button>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
