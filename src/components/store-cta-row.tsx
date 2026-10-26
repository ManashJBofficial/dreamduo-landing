"use client";

import { AppStoreCTA } from "@/components/app-store-cta";
import { PlayStoreCTA } from "@/components/playstore-cta";
import { cn } from "@/lib/utils";

interface StoreCTARowProps {
  /** `hero` for light sections, `light` for dark ones. Mirrors the CTA props. */
  variant?: "hero" | "light";
  /** Tags the Play referrer and names the analytics events for both buttons. */
  placement: string;
  className?: string;
}

/**
 * Keep the official badges together, wrapping only when space is limited.
 */
export function StoreCTARow({
  variant = "hero",
  placement,
  className,
}: StoreCTARowProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:gap-4",
        className
      )}
    >
      <AppStoreCTA variant={variant} placement={placement} />
      <PlayStoreCTA variant={variant} placement={placement} />
    </div>
  );
}
