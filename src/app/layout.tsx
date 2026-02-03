import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DreamDuo — Build Your Dreams Together",
  description:
    "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
  keywords: [
    "couples goal tracker",
    "relationship goals",
    "shared savings",
    "couples app",
    "dream together",
  ],
  openGraph: {
    title: "DreamDuo — Build Your Dreams Together",
    description:
      "The goal tracker designed for couples who want more from life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
