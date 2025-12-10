import React from "react";
import { AnimatedCheckIcon, AnimatedCrossIcon } from "./AnimatedIcons";

interface PresenceSelectorProps {
  value: 1 | 2;
  onChange: (value: 1 | 2) => void;
}

export default function PresenceSelector({
  value,
  onChange,
}: PresenceSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`relative overflow-hidden rounded-xl border px-4 py-2.5 transition-all duration-300 flex flex-row items-center justify-center gap-2
                    ${
                      value === 1
                        ? "border-green-500/50 bg-green-500/10 shadow-sm"
                        : "border-gray-200 dark:border-gray-700 hover:border-green-500/30 bg-white dark:bg-[#212529]"
                    }`}
      >
        {value === 1 ? (
          <AnimatedCheckIcon size={20} />
        ) : (
          <i className="fa-regular fa-circle-check text-lg text-gray-400"></i>
        )}
        <span
          className={`text-sm font-medium ${
            value === 1 ? "text-green-600 dark:text-green-400" : "text-gray-500"
          }`}
        >
          Hadir
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange(2)}
        className={`relative overflow-hidden rounded-xl border px-4 py-2.5 transition-all duration-300 flex flex-row items-center justify-center gap-2
                    ${
                      value === 2
                        ? "border-red-500/50 bg-red-500/10 shadow-sm"
                        : "border-gray-200 dark:border-gray-700 hover:border-red-500/30 bg-white dark:bg-[#212529]"
                    }`}
      >
        {value === 2 ? (
          <AnimatedCrossIcon size={20} />
        ) : (
          <i className="fa-regular fa-circle-xmark text-lg text-gray-400"></i>
        )}
        <span
          className={`text-sm font-medium ${
            value === 2 ? "text-red-600 dark:text-red-400" : "text-gray-500"
          }`}
        >
          Berhalangan
        </span>
      </button>
    </div>
  );
}
