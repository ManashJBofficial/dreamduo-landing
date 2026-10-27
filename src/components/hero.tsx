import { ResponsiveArtwork } from "@/components/responsive-artwork";
import { StoreCTARow } from "@/components/store-cta-row";
import { CampaignQrLink } from "@/components/campaign-qr-link";
import styles from "@/components/hero.module.css";

export function Hero() {
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
            <CampaignQrLink placement="hero" size={208} className={styles.qrCard} label="iPhone & Android" />

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
          <ResponsiveArtwork
            name="hero"
            alt="DreamDuo app screens showing the Nudge Hub and shared trip planning"
            priority
            sizes="(max-width: 639px) min(360px, calc(100vw - 48px)), (max-width: 1023px) 520px, (max-width: 1279px) 44vw, 566px"
            className={styles.phone}
          />
        </div>
      </div>
    </section>
  );
}
