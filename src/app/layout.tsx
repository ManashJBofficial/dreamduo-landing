import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Only the weights the page actually renders. Every extra weight is another
// font file on the critical path.
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const siteUrl = "https://dreamduo.app";

export const viewport: Viewport = {
  themeColor: "#e91e7b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DreamDuo - Build Your Dreams Together",
    template: "%s | DreamDuo",
  },
  description:
    "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
  applicationName: "DreamDuo",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/dreamduo_logo.webp", type: "image/webp" }],
    shortcut: [{ url: "/dreamduo_logo.webp", type: "image/webp" }],
    apple: [{ url: "/dreamduo_logo.webp", type: "image/webp" }],
  },
  keywords: [
    "couples goal tracker",
    "relationship goals",
    "shared savings",
    "couples app",
    "couples budgeting",
    "shared habits",
    "dream together",
  ],
  authors: [{ name: "DreamDuo" }],
  creator: "DreamDuo",
  publisher: "DreamDuo",
  openGraph: {
    title: "DreamDuo - Build Your Dreams Together",
    description:
      "The goal tracker designed for couples who want more from life.",
    url: "/",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DreamDuo - Build Your Dreams Together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamDuo - Build Your Dreams Together",
    description:
      "The goal tracker designed for couples who want more from life.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
        className={`${manrope.variable} ${bricolageGrotesque.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
