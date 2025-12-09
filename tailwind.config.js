/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'serif'],
      },
      colors: {
        'light-dark': 'var(--bg-light-dark)',
        'white-black': 'var(--bg-white-black)',
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-bs-theme="dark"]'],
}
