"use client";

import { AppStoreCTA } from "@/components/app-store-cta";
import { PlayStoreCTA } from "@/components/playstore-cta";

interface StoreCTARowProps {
  /** `hero` for light sections, `light` for dark ones. Mirrors the CTA props. */
  variant?: "hero" | "light";
  /** Placement reported with the download_store_click event. */
  placement?: string;
  /** Existing attribution placement used to build the store URL. */
  campaignPlacement?: string;
  className?: string;
}

/**
 * Keep the official badges together, wrapping only when space is limited.
 */
export function StoreCTARow({
  variant = "hero",
  placement = "unknown",
  campaignPlacement = placement,
  className,
}: StoreCTARowProps) {
  return (
    <div
      className={[
        "flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:gap-4",
        className
      ].filter(Boolean).join(" ")}
    >
      <AppStoreCTA variant={variant} placement={campaignPlacement} analyticsPlacement={placement} />
      <PlayStoreCTA variant={variant} placement={campaignPlacement} analyticsPlacement={placement} />
    </div>
  );
}
