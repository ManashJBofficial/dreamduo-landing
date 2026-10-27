"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { trackDownload } from "@/lib/download-analytics";
import { useCampaign } from "@/lib/campaign-attribution";

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
 * scrolled off, then keeps the download link within thumb reach for the
 * rest of the page.
 */
export function StickyInstallBar() {
  const campaign = useCampaign("sticky_bar");
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
      className="home-dark animate-install-bar-in fixed inset-x-2 z-50 md:hidden"
      style={{ bottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2.5 shadow-[0_20px_40px_-18px_rgba(15,23,42,0.9)] backdrop-blur">
        <Image
          src="/dreamduo-logo.webp"
          alt="DreamDuo app icon"
          aria-hidden="true"
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 rounded-xl"
        />

        <div className="min-w-0 flex-1">
          <div className="home-label truncate text-sm font-bold text-white">DreamDuo</div>
          <div className="home-small truncate">
            Free to start
          </div>
        </div>

        <Link
          href="/download"
          onClick={() => trackDownload("download_page_click", campaign, { placement: "sticky_bar" })}
          className="home-button-compact inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-4 font-semibold text-slate-950 transition-colors hover:bg-rose-50"
        >
          Try for free
        </Link>

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
