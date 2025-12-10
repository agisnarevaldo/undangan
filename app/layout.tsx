import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Hari Istimewa Kami",
  description:
    "Anda diundang untuk merayakan pernikahan kami. Bergabunglah bersama kami di hari bahagia ini.",
  keywords:
    "undangan, wedding, undangan digital, undangan online, wedding invitation, undangan pernikahan online",
  authors: [{ name: "Wedding Invitation" }],
  robots: "index, follow, max-image-preview:large",
  openGraph: {
    title: "Undangan Pernikahan - Bergabunglah di Hari Istimewa Kami",
    description:
      "Anda diundang untuk merayakan pernikahan kami. Simpan tanggalnya dan bergabunglah bersama kami!",
    images: [
      {
        url: "/images/updated/bride.png",
        width: 1200,
        height: 630,
        alt: "Preview Undangan Pernikahan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  // icons auto-detected from app/icon.png
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan - Hari Istimewa Kami",
    description: "Anda diundang untuk merayakan pernikahan kami.",
    images: ["/images/updated/bride.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Undangan Pernikahan",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
      <body
        className="overflow-x-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100"
        suppressHydrationWarning
      >
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
  );
}
