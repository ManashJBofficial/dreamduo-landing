import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadActions, DownloadPanel } from "@/components/download-actions";
import { DownloadBanner } from "@/components/download-banner";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { HOMEPAGE_IMAGE } from "@/lib/homepage-copy";
import styles from "@/components/download-page.module.css";
import "../home.css";

const downloadDescription =
  "Answer daily questions, send little surprises, and make plans together with DreamDuo. Free to start on iPhone and Android.";

export const metadata: Metadata = {
  title: "Download the DreamDuo Couples App",
  description: downloadDescription,
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download DreamDuo for iPhone and Android",
    description: downloadDescription,
    url: "/download",
    images: [HOMEPAGE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download DreamDuo for iPhone and Android",
    description: downloadDescription,
    images: [HOMEPAGE_IMAGE],
  },
};

export default function DownloadPage() {
  return (
    <div className={`home-page ${styles.page}`}>
      <a href="#download-content" className={styles.skipLink}>Skip to download</a>
      <Navbar />
      <main id="download-content" className={`site-container ${styles.main}`}>
        <section className={styles.copy} aria-labelledby="download-heading">
          <h1 id="download-heading">Download DreamDuo</h1>
          <p className={styles.description}>{downloadDescription}</p>
          <Suspense fallback={<DownloadPanel />}><DownloadActions /></Suspense>
        </section>
        <DownloadBanner />
      </main>
      <div className={styles.siteFooter}><Footer /></div>
    </div>
  );
}
