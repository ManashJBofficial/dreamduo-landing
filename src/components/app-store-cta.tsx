"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { IOSComingSoonModal } from "@/components/ios-coming-soon-modal";
import { cn } from "@/lib/utils";

type AppStoreVariant = "hero" | "light" | "compact";

interface AppStoreCTAProps {
  className?: string;
  /** Button text. Keep it short, this sits next to the Play Store button. */
  label?: string;
  variant?: AppStoreVariant;
  /** Names the analytics event and attributes the waitlist click. */
  placement: string;
  /**
   * Hide the label under `sm` and show the icon only. For tight rows such as
   * the navbar and the mobile sticky bar.
   */
  iconOnlyOnMobile?: boolean;
}

const base =
  "group inline-flex select-none items-center justify-center gap-2.5 rounded-full font-bold " +
  "transition-[transform,box-shadow,background-color] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 " +
  "motion-reduce:transition-none";

// Filled App Store blue. A white/outlined pill vanished against both the light
// hero and the white navbar, so iOS now carries its own colour. The Play button
// still leads on order and on its animated halo, which keeps the hierarchy.
const variantStyles: Record<AppStoreVariant, string> = {
  // On light sections.
  hero:
    "min-h-[3.25rem] w-full max-w-[19rem] bg-gradient-to-br from-sky-500 to-blue-600 px-6 " +
    "text-[15px] text-white shadow-[0_18px_40px_-16px_rgba(37,99,235,0.75)] " +
    "hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 " +
    "hover:shadow-[0_26px_55px_-18px_rgba(37,99,235,0.85)] " +
    "active:scale-[0.98] focus-visible:ring-offset-white sm:min-h-[3.5rem] sm:w-auto sm:px-8 sm:text-base",
  // On dark sections.
  light:
    "min-h-[3.25rem] w-full max-w-[19rem] bg-gradient-to-br from-sky-500 to-blue-600 px-6 " +
    "text-[15px] text-white shadow-[0_18px_40px_-16px_rgba(37,99,235,0.9)] " +
    "hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 " +
    "active:scale-[0.98] focus-visible:ring-offset-slate-900 sm:min-h-[3.5rem] sm:w-auto sm:px-8 sm:text-base",
  compact:
    "min-h-9 bg-gradient-to-br from-sky-500 to-blue-600 px-3 text-[11px] text-white " +
    "shadow-[0_10px_24px_-12px_rgba(37,99,235,0.9)] hover:from-sky-400 hover:to-blue-500 " +
    "active:scale-95 focus-visible:ring-offset-white sm:min-h-10 sm:px-4 sm:text-sm",
};

export function AppStoreCTA({
  className = "",
  label,
  variant = "hero",
  placement,
  iconOnlyOnMobile = false,
}: AppStoreCTAProps) {
  const [open, setOpen] = useState(false);
  const isCompact = variant === "compact";
  const text = label ?? (isCompact ? "iOS" : "Coming soon on iOS");

  return (
    <>
      <button
        type="button"
        onClick={() => {
          track("ios_cta_click", { placement });
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="DreamDuo for iPhone is coming soon, join the wishlist"
        className={cn(
          base,
          variantStyles[variant],
          // Squares off to an icon button under `sm`; twMerge drops the
          // variant's own width/padding so the two never fight.
          iconOnlyOnMobile &&
            (isCompact
              ? "aspect-square w-auto px-0 sm:aspect-auto sm:px-4"
              : "aspect-square w-auto px-0 sm:aspect-auto sm:px-8"),
          className
        )}
      >
        <Image
          src="/app-store.png"
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className={
            isCompact
              ? "h-4 w-4 shrink-0 rounded-[5px] ring-1 ring-white/80 sm:h-[18px] sm:w-[18px]"
              : "h-5 w-5 shrink-0 rounded-md ring-2 ring-white/80 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6"
          }
        />
        <span
          className={
            iconOnlyOnMobile
              ? "hidden whitespace-nowrap sm:inline"
              : "whitespace-nowrap"
          }
        >
          {text}
        </span>
      </button>

      <IOSComingSoonModal
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
      />
    </>
  );
}
