"use client";

import { track } from "@vercel/analytics";
import { getAppStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/store-badge";
import styles from "@/components/store-badge.module.css";

interface AppStoreCTAProps {
  className?: string;
  variant?: "hero" | "light" | "compact";
  placement: string;
}

export function AppStoreCTA({ className, variant = "hero", placement }: AppStoreCTAProps) {
  return (
    <a
      href={getAppStoreUrl(placement)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("install_click", { placement, store: "app_store" })}
      aria-label="Download DreamDuo on the App Store"
      className={cn(styles.link, styles.apple, variant === "compact" && styles.compact, className)}
    >
      <StoreBadge store="app_store" />
    </a>
  );
}
