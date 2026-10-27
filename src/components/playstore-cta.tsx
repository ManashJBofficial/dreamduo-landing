"use client";

import { useCampaign } from "@/lib/campaign-attribution";
import { getDownloadStoreUrl } from "@/lib/download-links";
import { trackDownload } from "@/lib/download-analytics";
import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/store-badge";
import styles from "@/components/store-badge.module.css";

interface PlayStoreCTAProps {
  className?: string;
  variant?: "hero" | "light" | "compact";
  placement: string;
}

export function PlayStoreCTA({ className, variant = "hero", placement }: PlayStoreCTAProps) {
  const campaign = useCampaign(placement);
  return (
    <a
      href={getDownloadStoreUrl("android", campaign)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload("download_store_click", campaign, { placement, store: "google_play", platform: "android" })}
      aria-label="Download DreamDuo free on Google Play"
      className={cn(styles.link, styles.google, variant === "compact" && styles.compact, className)}
    >
      <StoreBadge store="google_play" />
    </a>
  );
}
