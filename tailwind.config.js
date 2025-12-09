/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                esthetic: ['Sacramento', 'cursive'],
                arabic: ['Noto Naskh Arabic', 'serif'],
            },
            colors: {
                'stat-comment': '#8573F1',
                'stat-present': '#7A5CD9',
                'stat-absent': '#6546B1',
                'stat-likes': '#4F3392',
            },
            animation: {
                'scroll': 'scroll 3s linear infinite',
                'spin-icon': 'spin-icon 5s linear infinite',
                'love': 'love 5s ease-in-out infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateY(1rem)', opacity: '0' },
                    '10%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(0)', opacity: '0' },
                },
                'spin-icon': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                love: {
                    '50%': { transform: 'translateY(1rem)' },
                },
                bounce: {
                    '0%, 100%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
            },
        },
    },
    plugins: [],
}
