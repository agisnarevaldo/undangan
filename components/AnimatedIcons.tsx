import React from "react";

export const AnimatedCheckIcon = ({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox="0 0 52 52" className="checkmark">
        <circle
          className="checkmark__circle stroke-green-500/80 fill-none"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check stroke-green-500 fill-none"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <style jsx>{`
        .checkmark {
          display: block;
          border-radius: 50%;
          stroke-width: 3;
          stroke-miterlimit: 10;
          animation: scale 0.3s ease-in-out 0.9s both;
        }

        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale {
          0%,
          100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
      `}</style>
    </div>
  );
};

export const AnimatedCrossIcon = ({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox="0 0 52 52" className="cross">
        <circle
          className="cross__circle stroke-red-500/80 fill-none"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="cross__path stroke-red-500 fill-none"
          fill="none"
          d="M16 16 36 36 M36 16 16 36"
        />
      </svg>
      <style jsx>{`
        .cross {
          display: block;
          border-radius: 50%;
          stroke-width: 3;
          stroke-miterlimit: 10;
          animation: scale 0.3s ease-in-out 0.9s both;
        }

        .cross__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .cross__path {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale {
          0%,
          100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }
      `}</style>
    </div>
  );
};
