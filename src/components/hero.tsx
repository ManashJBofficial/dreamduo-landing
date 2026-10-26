import Image from "next/image";
import { StoreCTARow } from "@/components/store-cta-row";
import { DownloadQrCode } from "@/components/download-qr-code";
import { QrVisibility } from "@/components/qr-visibility";
import { getDownloadQrUrl } from "@/lib/download-links";
import styles from "@/components/hero.module.css";

export function Hero() {
  const qrUrl = getDownloadQrUrl({ utm_campaign: "hero" });

  return (
    <section aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`site-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="hero-heading" className="home-title">
            Build your{" "}
            <span className="w-fit max-w-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              dreams together.
            </span>
          </h1>
          <p className={`home-body ${styles.description}`}>
            A shared space for couples to track dreams, build habits, and stay in
            sync.
          </p>
          <div className={styles.install}>
            <QrVisibility>
              <a
                href={qrUrl}
                aria-label="Download DreamDuo: one QR code for iPhone and Android"
                className={styles.qrCard}
              >
                <DownloadQrCode value={qrUrl} size={208} />
                <span className="home-small">iPhone &amp; Android</span>
              </a>
            </QrVisibility>

            <div className={styles.stores}>
              <StoreCTARow
                variant="hero"
                placement="hero"
                className={styles.storeRow}
              />
            </div>
          </div>
        </div>

        <div className={styles.artwork}>
          <Image
            src="/dreamduo-hero.svg"
            alt="DreamDuo app screens showing the Nudge Hub and shared trip planning"
            width={1548}
            height={1555}
            unoptimized
            priority
            fetchPriority="high"
            className={styles.phone}
          />
        </div>
      </div>
    </section>
  );
}
