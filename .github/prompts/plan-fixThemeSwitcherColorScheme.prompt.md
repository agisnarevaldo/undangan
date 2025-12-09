# Fix Theme Switcher & Color Scheme - Tailwind Migration

## Problem Analysis

### Current Issues
1. **Theme button tidak terlihat** - Button theme switcher tidak muncul di UI
2. **Theme tidak bisa diubah** - Ketika di-set manual di DevTools, theme tidak berubah
3. **Color scheme tidak sesuai** - Warna tidak match dengan website original
4. **Mixed approach** - Menggunakan Bootstrap classes (`bg-light-dark`, `btn-transparent`) tanpa framework yang jelas

### Root Causes
1. Mixing Bootstrap class names dengan Tailwind CSS tanpa implementasi yang jelas
2. CSS custom classes tidak didefinisikan dengan baik dalam Tailwind approach
3. ThemeSwitcher tidak menggunakan Tailwind dark mode system
4. Tidak ada CSS variables untuk theme colors yang reusable

## Solution Plan - Tailwind First Approach

### Strategy
Migrate sepenuhnya ke Tailwind CSS dengan:
1. **Tailwind Dark Mode** - Gunakan `class` strategy dengan `dark:` prefix
2. **CSS Custom Properties** - Define color variables di `:root` dan `[data-theme="dark"]`
3. **@apply Directive** - Buat utility classes untuk Bootstrap-style names
4. **Maintain Compatibility** - Keep Bootstrap carousel/collapse functionality via CDN script only

### Step 1: Configure Tailwind Dark Mode
**File**: `tailwind.config.ts`

**Changes**:
- Enable `darkMode: 'class'` strategy
- Extend theme colors untuk light/dark variants
- Add custom utilities

**Code**:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'light-bg': '#f8f9fa',
        'light-surface': '#ffffff',
        'light-text': '#212529',
        
        // Dark mode colors
        'dark-bg': '#212529',
        'dark-surface': '#000000',
        'dark-text': '#f8f9fa',
      },
      backdropBlur: {
        'theme': '0.5rem',
      },
    },
  },
  plugins: [],
}
export default config
```

### Step 2: Update Layout for Tailwind Dark Mode
**File**: `app/layout.tsx`

**Changes**:
- Remove `data-bs-theme` attribute (use Tailwind `class` instead)
- Keep Bootstrap JS for carousel/collapse only
- Import Bootstrap Bundle JS di body end

**Code**:
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sacramento&family=Noto+Naskh+Arabic&display=swap"
          rel="stylesheet"
        />

        {/* FontAwesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css"
          integrity="sha256-4rTIfo5GQTi/7UJqoyUJQKzxW8VN/YBH31+Cy+vTZj4="
          crossOrigin="anonymous"
        />
      </head>
      <body className="overflow-x-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        {children}
        
        {/* Bootstrap JS for carousel/collapse only */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          integrity="sha256-5P1JGBOIxI7FBAvT/mb1fCnI5n/NhQKzNUuW7Hq0fMc="
          crossOrigin="anonymous"
          async
        />
      </body>
    </html>
  )
}
```

### Step 3: Create Tailwind-Based Theme Utilities
**File**: `app/globals.css`

**Changes**:
- Define CSS custom properties untuk theme colors
- Create utility classes dengan `@apply` directive
- Use Tailwind's dark mode selectors

**Add to globals.css (setelah Tailwind directives)**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Theme Color Variables */
@layer base {
  :root {
    --color-bg-light: 248 249 250; /* #f8f9fa */
    --color-bg-white: 255 255 255; /* #ffffff */
    --color-text-dark: 33 37 41;   /* #212529 */
  }

  .dark {
    --color-bg-dark: 33 37 41;     /* #212529 */
    --color-bg-black: 0 0 0;       /* #000000 */
    --color-text-light: 248 249 250; /* #f8f9fa */
  }
}

/* Bootstrap-Compatible Utility Classes */
@layer components {
  /* Background utilities */
  .bg-light-dark {
    @apply bg-[rgb(var(--color-bg-light))] dark:bg-[rgb(var(--color-bg-dark))];
  }

  .bg-white-black {
    @apply bg-[rgb(var(--color-bg-white))] dark:bg-[rgb(var(--color-bg-black))];
  }

  .bg-theme-auto {
    @apply bg-light-bg dark:bg-dark-bg;
  }

  /* Text utilities */
  .text-theme-auto {
    @apply text-[rgb(var(--color-text-dark))] dark:text-[rgb(var(--color-text-light))];
  }

  /* Button utilities */
  .btn {
    @apply inline-flex items-center justify-center transition-colors duration-200;
  }

  .btn-sm {
    @apply text-sm px-3 py-1.5;
  }

  .btn-transparent {
    @apply bg-white/50 dark:bg-gray-800/50 backdrop-blur-[0.5rem];
  }

  .btn-outline-auto {
    @apply border border-gray-900 dark:border-gray-100 
           text-gray-900 dark:text-gray-100
           hover:bg-gray-900 hover:text-gray-100
           dark:hover:bg-gray-100 dark:hover:text-gray-900;
  }

  /* SVG theme colors */
  .color-theme-svg {
    @apply text-white dark:text-black bg-light-bg dark:bg-dark-bg;
  }

  /* Navbar theme */
  .navbar {
    @apply bg-white/75 dark:bg-gray-900/75 backdrop-blur-[0.5rem];
  }
}

/* Keep existing animations and custom utilities */
/* ... rest of your existing CSS ... */
```

### Step 3: Simplify ThemeSwitcher Component
**File**: `components/ThemeSwitcher.tsx`

**Changes**:
- Remove Tailwind `dark` class logic
- Only use `data-bs-theme` attribute
- Simplify `applyTheme()` function

**Updated Code**:
```tsx
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('auto')
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'auto'
        setTheme(savedTheme)
        applyTheme(savedTheme)

        // Show button after invitation is opened
        const handleOpen = () => {
            setShowButton(true)
        }

        document.addEventListener('undangan.open', handleOpen)
### Step 4: Rewrite ThemeSwitcher with Tailwind Dark Mode
**File**: `components/ThemeSwitcher.tsx`

**Changes**:
- Use Tailwind's `dark` class on `<html>` element
- Remove Bootstrap `data-bs-theme` approach
- Add system preference listener for auto mode
- Full Tailwind utility classes

**Updated Code**:
```tsx
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('auto')
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'auto'
        setTheme(savedTheme)
        applyTheme(savedTheme)

        // Show button after invitation is opened
        const handleOpen = () => {
            setShowButton(true)
        }

        document.addEventListener('undangan.open', handleOpen)
        return () => document.removeEventListener('undangan.open', handleOpen)
    }, [])

    useEffect(() => {
        // Listen to system theme changes for auto mode
        if (theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = () => applyTheme('auto')
            
### Step 5: Update AudioPlayer Button Styling
**File**: `components/AudioPlayer.tsx`

**Changes**:
- Replace Bootstrap classes dengan Tailwind equivalents
- Match ThemeSwitcher styling

**Code**:
```tsx
<button
    type="button"
    id="button-music"
    onClick={toggleAudio}
    className="btn btn-transparent border border-gray-300 dark:border-gray-600 rounded-full shadow-sm mt-3 w-10 h-10"
    aria-label="Toggle music"
>
    {isPlaying ? (
        <i className="fa-solid fa-circle-pause spin-button"></i>
    ) : (
        <i className="fa-solid fa-circle-play"></i>
    )}
</button>
```

### Step 6: Update Viewport Export
**File**: `app/layout.tsx`

**Changes**:
- Set themeColor to white untuk light mode default
- Update description jika perlu

**Code**:
```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff', // White for light mode
}
```tener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }
    }, [theme])

    const applyTheme = (newTheme: Theme) => {
        const html = document.documentElement

        if (newTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefersDark) {
                html.classList.add('dark')
            } else {
                html.classList.remove('dark')
            }
        } else if (newTheme === 'dark') {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }

    const cycleTheme = () => {
        const themes: Theme[] = ['auto', 'light', 'dark']
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]

        setTheme(nextTheme)
        applyTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
    }

    if (!showButton) return null

    return (
        <button
            type="button"
            id="button-theme"
            onClick={cycleTheme}
            className="btn btn-transparent border border-gray-300 dark:border-gray-600 rounded-full shadow-sm mt-3 w-10 h-10"
            aria-label="Change theme"
            title={`Theme: ${theme}`}
        >
            <i className="fa-solid fa-circle-half-stroke"></i>
        </button>
    )
}
```
### DevTools Verification
- [ ] Inspect `<html>` element, attribute `data-bs-theme` ada
- [ ] Value `data-bs-theme` berubah saat klik button: "light" / "dark" / "auto"
- [ ] CSS variables Bootstrap terbaca di DevTools: `--bs-light-rgb`, `--bs-dark-rgb`
- [ ] `.bg-light-dark` class menggunakan warna dari CSS variables
- [ ] Console tidak ada error terkait theme

### Browser Compatibility
- [ ] Chrome/Edge - theme switching works
- [ ] Firefox - theme switching works
- [ ] Safari - theme switching works
- [ ] Mobile browser - button responsive, theme works

## Expected Behavior

### Light Mode
- Background sections: putih (#ffffff) dan abu terang (#f8f9fa)
- Text: hitam/abu gelap
- Button: semi-transparent terang dengan blur
- SVG dividers: putih fill

### Dark Mode
- Background sections: hitam (#000000) dan abu gelap (#212529)
- Text: putih/abu terang
- Button: semi-transparent gelap dengan blur
- SVG dividers: hitam fill
## Migration Path

### Phase 1: Core Theme System (This PR)
- [ ] Configure Tailwind dark mode
- [ ] Create CSS custom properties
- [ ] Migrate ThemeSwitcher to Tailwind
- [ ] Update AudioPlayer button
- [ ] Add utility classes for common patterns

### Phase 2: Component Migration (Future)
- [ ] Migrate all sections to use Tailwind classes
- [ ] Replace `.bg-light-dark` with Tailwind utilities
- [ ] Replace `.text-theme-auto` with Tailwind utilities
- [ ] Migrate navbar to Tailwind
- [ ] Migrate buttons to Tailwind

### Phase 3: Bootstrap Removal (Optional)
- [ ] Replace Bootstrap carousel with Embla/Swiper
- [ ] Replace Bootstrap collapse with Headless UI
- [ ] Remove Bootstrap JS dependency
- [ ] Pure Tailwind solution

## Reference

### Original Website
- URL: https://ulems.my.id/
- CSS: https://ulems.my.id/css/guest.css
- Uses Bootstrap 5.3.8 + custom CSS
- Theme system: `data-bs-theme` attribute on `<html>`

### Tailwind Documentation
- Dark Mode: https://tailwindcss.com/docs/dark-mode
- Customizing Colors: https://tailwindcss.com/docs/customizing-colors
- Adding Custom Styles: https://tailwindcss.com/docs/adding-custom-styles
- Functions & Directives: https://tailwindcss.com/docs/functions-and-directives

### Color Mapping (Bootstrap → Tailwind)
```css
/* Bootstrap */
--bs-light: #f8f9fa    → Tailwind: bg-gray-50 / bg-light-bg (custom)
--bs-dark: #212529     → Tailwind: bg-gray-900 / bg-dark-bg (custom)
--bs-white: #ffffff    → Tailwind: bg-white
--bs-black: #000000    → Tailwind: bg-black

/* Custom Variables */
:root {
  --color-bg-light: 248 249 250;   /* rgb(248, 249, 250) = #f8f9fa */
  --color-bg-white: 255 255 255;   /* rgb(255, 255, 255) = #ffffff */
  --color-text-dark: 33 37 41;     /* rgb(33, 37, 41) = #212529 */
}

.dark {
  --color-bg-dark: 33 37 41;       /* rgb(33, 37, 41) = #212529 */
  --color-bg-black: 0 0 0;         /* rgb(0, 0, 0) = #000000 */
  --color-text-light: 248 249 250; /* rgb(248, 249, 250) = #f8f9fa */
}
``` Issue 4: Button blur tidak terlihat
**Cause**: `backdrop-filter` tidak support atau CSS tidak applied
**Solution**: Check browser support, pastikan `btn-transparent` class ada

## Reference

### Original Website
- URL: https://ulems.my.id/
- CSS: https://ulems.my.id/css/guest.css
- Uses Bootstrap 5.3.8 + custom CSS
- Theme system: `data-bs-theme` attribute on `<html>`

### Bootstrap Theme Documentation
- Variables: https://getbootstrap.com/docs/5.3/customize/css-variables/
- Color modes: https://getbootstrap.com/docs/5.3/customize/color-modes/

### Key CSS Variables (Bootstrap 5.3.8)
```css
--bs-light-rgb: 248, 249, 250
--bs-dark-rgb: 33, 37, 41
--bs-white-rgb: 255, 255, 255
--bs-black-rgb: 0, 0, 0
--bs-light: #f8f9fa
--bs-dark: #212529
```
