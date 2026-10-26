import Image from "next/image";
import styles from "@/components/download-page.module.css";

export function DownloadBanner() {
  return (
    <figure className={styles.banner}>
      <Image
        src="/download-banner.svg"
        alt="DreamDuo app screens showing shared dreams and trip planning"
        width={1548}
        height={1555}
        unoptimized
        loading="lazy"
        className={styles.bannerImage}
      />
    </figure>
  );
}
