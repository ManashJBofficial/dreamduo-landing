"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, Bell, Sparkles, X } from "lucide-react";
import { track } from "@vercel/analytics";
import { IOS_WAITLIST_URL } from "@/lib/store-links";

interface IOSComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  /** Which CTA opened the modal, so we can attribute waitlist clicks. */
  placement: string;
}

const perks = [
  {
    icon: Bell,
    title: "First in line",
    description: "We email you the day DreamDuo lands on the App Store.",
  },
  {
    icon: Sparkles,
    title: "TestFlight early access",
    description: "Waitlist members get the beta build before public launch.",
  },
];

/**
 * iOS "coming soon" sheet. Rendered in a portal because the landing page keeps a
 * fixed frame overlay at z-40 and a sticky bar at z-50, so an in-tree modal
 * would land inside the wrong stacking context.
 */
export function IOSComingSoonModal({
  open,
  onClose,
  placement,
}: IOSComingSoonModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-3 sm:items-center sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-coming-soon-title"
        aria-describedby="ios-coming-soon-description"
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-in relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-6 text-center shadow-[0_40px_80px_-30px_rgba(15,23,42,0.6)] sm:p-8"
      >
        {/* Aura behind the app icon, echoing the hero blooms. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/50 via-fuchsia-300/40 to-amber-200/40 blur-3xl"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close iOS waitlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:right-4 sm:top-4"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="relative">
          <Image
            src="/app-store.png"
            alt=""
            aria-hidden="true"
            width={64}
            height={64}
            className="mx-auto h-14 w-14 rounded-2xl shadow-lg sm:h-16 sm:w-16"
          />

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Coming soon
          </span>

          <h2
            id="ios-coming-soon-title"
            className="font-display mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-[28px]"
          >
            DreamDuo for iPhone is on the way
          </h2>

          <p
            id="ios-coming-soon-description"
            className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-[15px]"
          >
            We are building the iOS app right now. Join the wishlist and we will
            let you know the moment it is ready.
          </p>

          <ul className="mt-6 space-y-3 text-left">
            {perks.map((perk) => {
              const PerkIcon = perk.icon;
              return (
                <li key={perk.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <PerkIcon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900">
                      {perk.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-500">
                      {perk.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <a
            href={IOS_WAITLIST_URL}
            target="_blank"
            rel="noopener"
            onClick={() => track("ios_waitlist_click", { placement })}
            className="group mt-7 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-[15px] font-bold text-white shadow-[0_18px_40px_-16px_rgba(15,23,42,0.7)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_55px_-18px_rgba(233,30,123,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none sm:text-base"
          >
            Join the iOS wishlist
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-600"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
