"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { getPlayStoreUrl } from "@/lib/store-links";

type PlayStoreVariant = "hero" | "light" | "compact";

interface PlayStoreCTAProps {
  className?: string;
  /** Button text. Keep it short, this is the thing eyes land on. */
  label?: string;
  variant?: PlayStoreVariant;
  /** Tags the Play install with a referrer and names the analytics event. */
  placement: string;
  /** Animated glow halo behind the button. */
  glow?: boolean;
}

const base =
  "group inline-flex select-none items-center justify-center gap-2.5 rounded-full font-bold " +
  "transition-[transform,box-shadow,background-color] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 " +
  "motion-reduce:transition-none";

const variantStyles: Record<PlayStoreVariant, string> = {
  // Wide enough on mobile to read as a primary button without going edge to edge.
  hero:
    "min-h-[3.25rem] w-full max-w-[19rem] border border-slate-900/10 bg-slate-950 px-6 " +
    "text-[15px] text-white shadow-[0_18px_40px_-16px_rgba(15,23,42,0.7)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_26px_55px_-18px_rgba(233,30,123,0.55)] " +
    "active:scale-[0.98] focus-visible:ring-offset-white sm:min-h-[3.5rem] sm:w-auto sm:px-8 sm:text-base",
  light:
    "min-h-[3.25rem] w-full max-w-[19rem] border border-white/15 bg-white px-6 " +
    "text-[15px] text-slate-900 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] " +
    "hover:-translate-y-0.5 hover:bg-slate-50 active:scale-[0.98] " +
    "focus-visible:ring-offset-slate-900 sm:min-h-[3.5rem] sm:w-auto sm:px-8 sm:text-base",
  compact:
    "min-h-9 border border-slate-900/10 bg-slate-950 px-3.5 text-[11px] text-white " +
    "shadow-[0_10px_24px_-12px_rgba(15,23,42,0.8)] hover:bg-slate-800 active:scale-95 " +
    "focus-visible:ring-offset-white sm:min-h-10 sm:px-4 sm:text-sm",
};

export function PlayStoreCTA({
  className = "",
  label,
  variant = "hero",
  placement,
  glow = false,
}: PlayStoreCTAProps) {
  const isCompact = variant === "compact";
  const text = label ?? (isCompact ? "Get the app" : "Get it on Google Play");

  const link = (
    <a
      href={getPlayStoreUrl(placement)}
      target="_blank"
      rel="noopener"
      onClick={() => track("install_click", { placement })}
      aria-label="Download DreamDuo free on Google Play"
      className={[base, variantStyles[variant], glow ? "relative z-10" : "", className].join(" ")}
    >
      <Image
        src="/google-play.png"
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        priority={variant === "hero"}
        className={
          isCompact
            ? "h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
            : "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6"
        }
      />
      <span className="whitespace-nowrap">{text}</span>
    </a>
  );

  if (!glow) return link;

  return (
    <div className="relative flex w-full justify-center sm:inline-flex sm:w-auto">
      <div
        aria-hidden="true"
        className="animate-install-halo pointer-events-none absolute -inset-2.5 rounded-full bg-gradient-to-r from-rose-400/50 via-fuchsia-400/50 to-amber-300/50 blur-lg"
      />
      {link}
    </div>
  );
}
