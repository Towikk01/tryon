import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TryOn — Спробуй на собі",
  description:
    "TryOn — тренування для жінок для відновлення та зміцнення. Безпечні заняття 20–60 хв: Pilates, stretching, functional. Спробуй на собі.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-ink font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
