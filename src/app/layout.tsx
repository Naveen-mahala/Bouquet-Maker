import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Build Your Dream Bouquet | Custom Floral Arrangements & Message Cards",
  description: "Interactively design a personalized bouquet flower by flower on a florist's workspace table, write a greeting note, and export as PNG or PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#faf8f5] text-stone-800">
        {children}
      </body>
    </html>
  );
}

