import { ResponsiveArtwork } from "@/components/responsive-artwork";
import { StoreCTARow } from "@/components/store-cta-row";
import { CampaignQrLink } from "@/components/campaign-qr-link";
import { HERO_ACCENT, HERO_LEAD, HOMEPAGE_DESCRIPTION } from "@/lib/homepage-copy";
import styles from "@/components/hero.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`site-container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="hero-heading" className="home-title">
            {HERO_LEAD}{" "}
            <span className={`${styles.headlineAccent} bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent`}>
              {HERO_ACCENT}
            </span>
          </h1>
          <p className={`home-body ${styles.description}`}>
            {HOMEPAGE_DESCRIPTION}
          </p>
          <div className={styles.install}>
            <div className={styles.stores}>
              <StoreCTARow
                variant="hero"
                placement="hero"
                className={styles.storeRow}
              />
            </div>
            <CampaignQrLink
              placement="hero"
              size={128}
              className={styles.qrCard}
              label="Scan to install"
            />
          </div>
        </div>

        <div className={styles.artwork}>
          <ResponsiveArtwork
            name="hero"
            alt="Two DreamDuo app screens showing the Nudge Hub and a shared trip plan"
            priority
            sizes="(max-width: 639px) min(360px, calc(100vw - 48px)), (max-width: 1023px) 520px, (max-width: 1279px) 44vw, 566px"
            className={styles.phone}
          />
        </div>
      </div>
    </section>
  );
}
