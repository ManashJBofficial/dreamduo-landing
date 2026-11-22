import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Suspense } from "react";
import { CampaignCapture } from "@/components/campaign-capture";
import { HOMEPAGE_DESCRIPTION, HOMEPAGE_IMAGE, HOMEPAGE_TITLE } from "@/lib/homepage-copy";
import "./globals.css";

// Two self-hosted Latin WOFF2 files cover every weight used by the site.
// Keep text visible while loading; builds never need Google Fonts access.
const bricolageGrotesque = localFont({
  src: "./fonts/bricolage-latin-bold.woff2",
  variable: "--font-bricolage-grotesque",
  weight: "700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  weight: "400 700",
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
    default: HOMEPAGE_TITLE,
    template: "%s | DreamDuo",
  },
  description: HOMEPAGE_DESCRIPTION,
  applicationName: "DreamDuo",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  keywords: [
    "couples app",
    "daily questions for couples",
    "couples nudges",
    "shared goals for couples",
    "couples bucket list",
  ],
  authors: [{ name: "DreamDuo" }],
  creator: "DreamDuo",
  publisher: "DreamDuo",
  openGraph: {
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    url: "/",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "website",
    images: [HOMEPAGE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    images: [HOMEPAGE_IMAGE],
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
        <Suspense fallback={null}><CampaignCapture /></Suspense>
        {children}
        {process.env.VERCEL === "1" && <Analytics />}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
