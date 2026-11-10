"use client";

import { useCampaign } from "@/lib/campaign-attribution";
import { getDownloadStoreUrl } from "@/lib/download-links";
import { trackDownload } from "@/lib/download-analytics";
import { StoreBadge } from "@/components/store-badge";
import styles from "@/components/store-badge.module.css";

interface AppStoreCTAProps {
  className?: string;
  variant?: "hero" | "light" | "compact";
  placement: string;
  analyticsPlacement?: string;
}

export function AppStoreCTA({ className, variant = "hero", placement, analyticsPlacement }: AppStoreCTAProps) {
  const campaign = useCampaign(placement);
  return (
    <a
      href={getDownloadStoreUrl("ios", campaign)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload("download_store_click", campaign, { placement: analyticsPlacement ?? placement, store: "app_store", platform: "ios" })}
      aria-label="Download DreamDuo on the App Store"
      className={[styles.link, styles.apple, variant === "compact" && styles.compact, className].filter(Boolean).join(" ")}
    >
      <StoreBadge store="app_store" />
    </a>
  );
}
