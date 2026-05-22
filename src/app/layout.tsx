import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "fitflow — 30-денний онлайн-курс для жінок",
  description:
    "Фітнес-платформа для тренувань вдома. Програма для зайнятих українок 25–40: 20–30 хв на день, без жорстких дієт.",
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
      </body>
    </html>
  );
}
