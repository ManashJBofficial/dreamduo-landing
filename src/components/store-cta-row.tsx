"use client";

import { AppStoreCTA } from "@/components/app-store-cta";
import { PlayStoreCTA } from "@/components/playstore-cta";
import { cn } from "@/lib/utils";

interface StoreCTARowProps {
  /** `hero` for light sections, `light` for dark ones. Mirrors the CTA props. */
  variant?: "hero" | "light";
  /** Tags the Play referrer and names the analytics events for both buttons. */
  placement: string;
  /** Animated glow halo behind the Play button. */
  glow?: boolean;
  className?: string;
}

/**
 * The Play + App Store pair. Stacks full width on phones so each button keeps a
 * comfortable tap target, then sits side by side from `sm` up.
 */
export function StoreCTARow({
  variant = "hero",
  placement,
  glow = false,
  className,
}: StoreCTARowProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4",
        className
      )}
    >
      <PlayStoreCTA variant={variant} glow={glow} placement={placement} />
      <AppStoreCTA variant={variant} placement={placement} />
    </div>
  );
}
