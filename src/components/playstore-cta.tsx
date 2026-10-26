"use client";

import { track } from "@vercel/analytics";
import { getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/store-badge";
import styles from "@/components/store-badge.module.css";

interface PlayStoreCTAProps {
  className?: string;
  variant?: "hero" | "light" | "compact";
  placement: string;
}

export function PlayStoreCTA({ className, variant = "hero", placement }: PlayStoreCTAProps) {
  return (
    <a
      href={getPlayStoreUrl(placement)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("install_click", { placement })}
      aria-label="Download DreamDuo free on Google Play"
      className={cn(styles.link, styles.google, variant === "compact" && styles.compact, className)}
    >
      <StoreBadge store="google_play" />
    </a>
  );
}
