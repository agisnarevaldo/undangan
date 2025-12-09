import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'dark light',
}

export const metadata: Metadata = {
  title: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
  description: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
  keywords: 'undangan, wedding, undangan digital, undangan online, wedding invitation, template undangan, template undangan pernikahan, undangan pernikahan, template undangan online, wedding invitation github, template website, template website undangan pernikahan',
  authors: [{ name: 'dewanakl' }],
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    title: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
    description: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
    images: [
      {
        url: 'https://ulems.my.id/assets/images/bg.webp',
        width: 980,
        height: 980,
        alt: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
      },
    ],
    locale: 'id_ID',
    type: 'website',
    url: 'https://ulems.my.id',
    siteName: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
  },
  icons: {
    icon: '/assets/images/icon-192x192.png',
    apple: '/assets/images/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Website Undangan Pernikahan Wahyu dan Riski Secara Online',
    statusBarStyle: 'black-translucent',
  },
}

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
