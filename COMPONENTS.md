# Components Documentation

Proyek ini telah direfactor untuk meningkatkan maintainability dengan memisahkan komponen-komponen besar menjadi file-file yang lebih kecil dan terfokus.

## Struktur Komponen

### Main Components

#### `GuestPage.tsx`
Komponen utama yang mengatur state dan layout keseluruhan halaman undangan.
- **State Management**: isOpen, guestName, countdown
- **Event Handling**: openInvitation
- **Layout**: Desktop sidebar + Mobile content area

### Section Components

#### `WelcomeOverlay.tsx`
Overlay pembuka dengan tombol "Open Invitation"
- **Props**: `guestName`, `onOpenInvitation`

#### `HeroSection.tsx`
Section hero dengan countdown timer
- **Props**: `countdown`
- **Features**: Countdown timer, scroll animation

#### `BrideSection.tsx`
Section informasi mempelai
- **Features**: Foto dan data kedua mempelai, animasi AOS

#### `QuranSection.tsx`
Section ayat Al-Quran
- **Content**: QS. Adh-Dhariyat:49, QS. An-Najm:45

#### `LoveStorySection.tsx`
Section kisah cinta dengan timeline
- **Features**: Video player, 3-point timeline

#### `WeddingDateSection.tsx`
Section tanggal dan lokasi pernikahan
- **Props**: `countdown`
- **Features**: Countdown, akad & resepsi info, Google Maps link, dress code

#### `GallerySection.tsx`
Section galeri foto
- **Features**: 2 Bootstrap carousels (6 images total)

#### `GiftSection.tsx`
Section hadiah/love gift
- **Features**: Transfer, Qris (collapsible), Gift info (collapsible)

#### `CommentSection.tsx`
Section ucapan dan doa
- **Features**: Form input, comment display

### UI Components

#### `BottomNavbar.tsx`
Navigation bar sticky di bawah (mobile only)
- **Position**: Fixed bottom-0
- **Items**: Home, Mempelai, Tanggal, Galeri, Ucapan
- **Visibility**: Hidden pada screen ≥640px (sm breakpoint)

#### `SvgDivider.tsx`
Divider SVG dengan berbagai variasi
- **Props**: `variant` ('1' | '2' | '3' | '4' | '5' | '6')
- **Usage**: Pemisah antar section dengan wave pattern

#### `AudioPlayer.tsx`
Music player dengan play/pause toggle
- **Position**: Fixed bottom-right
- **Features**: Auto-play setelah invitation opened

#### `ThemeSwitcher.tsx`
Theme switcher (light/dark/auto)
- **Position**: Fixed bottom-right
- **Features**: localStorage persistence

#### `LoadingScreen.tsx`
Loading screen dengan progress bar
- **Features**: Animated progress 0-100%

## Penggunaan

### Import Components
```tsx
import GuestPage from './components/GuestPage'
```

### Customize Content
Setiap section component dapat di-customize dengan mengedit file masing-masing:
- Edit teks di `BrideSection.tsx` untuk data mempelai
- Edit countdown target di `GuestPage.tsx`
- Edit gallery images di `GallerySection.tsx`
- Edit gift info di `GiftSection.tsx`

## Styling

### Tailwind CSS
Semua komponen menggunakan Tailwind CSS v3 untuk styling dengan:
- Dark mode support
- Responsive design
- Custom colors (stat-*)
- Custom fonts (esthetic, arabic)
- Custom animations (scroll, spin-icon, love)

### Custom CSS
Styling tambahan ada di `app/globals.css`:
- Navigation styles
- Bootstrap carousel override
- Scrollbar styling
- Animations keyframes

## Features

### Responsive Design
- **Desktop**: Sidebar sticky + content area
- **Mobile**: Full width content + bottom navbar

### Animations
- AOS scroll animations
- Confetti on invitation open
- Floating hearts
- Spinning audio icon

### Interactive Features
- Copy to clipboard (gift info)
- Bootstrap collapse (Qris, Gift detail)
- Bootstrap carousel (gallery)
- Theme switcher
- Audio player

## Development

### Adding New Section
1. Buat file baru di `components/` (e.g., `NewSection.tsx`)
2. Import di `GuestPage.tsx`
3. Tambahkan di layout antara `SvgDivider` components
4. (Optional) Update `BottomNavbar.tsx` jika perlu menu baru

### Modifying Existing Section
Edit file component yang sesuai, tidak perlu touch `GuestPage.tsx`

## Performance

### Code Splitting
Komponen terpisah memungkinkan better code splitting dan lazy loading di masa depan.

### Reusability
Components dapat digunakan ulang di halaman lain jika diperlukan.
