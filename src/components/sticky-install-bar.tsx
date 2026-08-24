"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";
import { getPlayStoreUrl } from "@/lib/store-links";

const DISMISS_KEY = "install_bar_dismissed";

function wasDismissedThisSession(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // Private mode or blocked storage: just show the bar.
    return false;
  }
}

/**
 * Mobile-only install bar. It stays out of the way until the hero CTA has
 * scrolled off, then keeps a one-tap Play Store link within thumb reach for the
 * rest of the page.
 */
export function StickyInstallBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show once the hero button has scrolled away, so the two never compete.
      setVisible(
        window.scrollY > window.innerHeight * 0.6 && !wasDismissedThisSession()
      );
    }

    // Deferred so a deep link that lands mid-page still gets the bar, without
    // setting state synchronously inside the effect body.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Nothing to persist to, the bar simply returns on the next visit.
    }
  }

  if (dismissed || !visible) return null;

  return (
    <div
      className="animate-install-bar-in fixed inset-x-2 z-50 md:hidden"
      style={{ bottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2.5 shadow-[0_20px_40px_-18px_rgba(15,23,42,0.9)] backdrop-blur">
        <Image
          src="/dreamduo_logo.webp"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-xl"
        />

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-white">DreamDuo</div>
          <div className="truncate text-[11px] text-slate-400">
            Free on Google Play
          </div>
        </div>

        <a
          href={getPlayStoreUrl("sticky_bar")}
          target="_blank"
          rel="noopener"
          onClick={() => track("install_click", { placement: "sticky_bar" })}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-5 text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Install
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install bar"
          className="-mr-1 flex h-9 w-7 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-slate-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
