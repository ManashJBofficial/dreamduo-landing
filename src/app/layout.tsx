import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://dreamduo.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DreamDuo - Build Your Dreams Together",
    template: "%s | DreamDuo",
  },
  description:
    "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
  applicationName: "DreamDuo",
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
  alternates: {
    canonical: "/",
  },
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
      </body>
    </html>
  );
}
