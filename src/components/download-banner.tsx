import { ResponsiveArtwork } from "@/components/responsive-artwork";
import styles from "@/components/download-page.module.css";

export function DownloadBanner() {
  return (
    <figure className={styles.banner}>
      <ResponsiveArtwork
        name="download"
        alt="DreamDuo app screens showing shared dreams and trip planning"
        sizes="(max-width: 540px) min(380px, calc(100vw - 48px)), (max-width: 1100px) 600px, 566px"
        priority
        className={styles.bannerImage}
      />
    </figure>
  );
}
