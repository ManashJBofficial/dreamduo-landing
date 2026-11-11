"use client";

import { useCampaign } from "@/lib/campaign-attribution";
import { getDownloadStoreUrl } from "@/lib/download-links";
import { trackDownload } from "@/lib/download-analytics";
import { StoreBadge } from "@/components/store-badge";
import styles from "@/components/store-badge.module.css";

interface PlayStoreCTAProps {
  className?: string;
  variant?: "hero" | "light" | "compact";
  placement: string;
  analyticsPlacement?: string;
  ctaVariant?: string;
}

export function PlayStoreCTA({ className, variant = "hero", placement, analyticsPlacement, ctaVariant }: PlayStoreCTAProps) {
  const campaign = useCampaign(placement);
  return (
    <a
      href={getDownloadStoreUrl("android", campaign)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload("download_store_click", campaign, { placement: analyticsPlacement ?? placement, store: "google_play", platform: "android", ...(ctaVariant ? { cta_variant: ctaVariant } : {}) })}
      aria-label="Download DreamDuo free on Google Play"
      className={[styles.link, styles.google, variant === "compact" && styles.compact, className].filter(Boolean).join(" ")}
    >
      <StoreBadge store="google_play" />
    </a>
  );
}
