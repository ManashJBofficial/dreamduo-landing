import Image from "next/image";
import styles from "@/components/store-badge.module.css";

export function StoreBadge({ store }: { store: "app_store" | "google_play" }) {
  const apple = store === "app_store";

  return (
    <Image
      src={apple ? "/app-store-badge.svg" : "/google-play-badge.webp"}
      width={apple ? 119.66407 : 564}
      height={apple ? 40 : 168}
      alt={apple ? "Download on the App Store" : "Get it on Google Play"}
      unoptimized
      className={styles.image}
    />
  );
}
