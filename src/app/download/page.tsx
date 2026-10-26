import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadActions, DownloadPanel } from "@/components/download-actions";
import { DownloadBanner } from "@/components/download-banner";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import styles from "@/components/download-page.module.css";
import "../home.css";

export const metadata: Metadata = {
  title: "Download the DreamDuo Couples App",
  description: "Your shared dreams, daily moments, and a little more us. Download DreamDuo for free on iPhone and Android, or scan one QR code to get started.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download DreamDuo for iPhone and Android",
    description: "A shared space for your big dreams and everyday love. Free to start on iPhone and Android.",
    url: "/download",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function DownloadPage() {
  return (
    <div className={`home-page ${styles.page}`}>
      <a href="#download-content" className={styles.skipLink}>Skip to download</a>
      <Navbar />
      <main id="download-content" className={`site-container ${styles.main}`}>
        <section className={styles.copy} aria-labelledby="download-heading">
          <h1 id="download-heading">Download it now!</h1>
          <p className={styles.description}>Free to start on iPhone and Android.</p>
          <Suspense fallback={<DownloadPanel />}><DownloadActions /></Suspense>
        </section>
        <DownloadBanner />
      </main>
      <div className={styles.siteFooter}><Footer /></div>
    </div>
  );
}
