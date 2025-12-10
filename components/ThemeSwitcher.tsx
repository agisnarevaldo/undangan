"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("auto");

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    useEffect(() => {
        // Listen to system theme changes for auto mode
        if (theme === "auto") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => applyTheme("auto");

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme]);

    const applyTheme = (newTheme: Theme) => {
        const html = document.documentElement;

        if (newTheme === "auto") {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (prefersDark) {
                html.classList.add("dark");
            } else {
                html.classList.remove("dark");
            }
        } else if (newTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };

    const cycleTheme = () => {
        const themes: Theme[] = ["auto", "light", "dark"];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        setTheme(nextTheme);
        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    return (
        <button
            type="button"
            id="button-theme"
            onClick={cycleTheme}
            className="btn btn-transparent border border-gray-300 dark:border-gray-600 rounded-full shadow-sm mt-3 w-12 h-12"
            aria-label="Change theme"
            title={`Theme: ${theme}`}
        >
            <i className="fa-solid fa-circle-half-stroke"></i>
        </button>
    );
}
