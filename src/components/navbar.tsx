"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { WAITLIST_ENABLED } from "@/lib/feature-flags";
import { BrandMark } from "@/components/brand-mark";
import { AppStoreCTA } from "@/components/app-store-cta";
import { PlayStoreCTA } from "@/components/playstore-cta";

// A "#" href scrolls (or jumps home first, see smoothScroll). Anything else is
// a real route and has to be a Link, or the blog would never be reachable from
// the nav and would only exist in the sitemap.
const navLinks = [
  { label: "Dreams", href: "/#dreams" },
  { label: "Features", href: "/#features" },
  { label: "Our Story", href: "/#story" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const el = document.getElementById(href.split("#")[1]);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    function onPointerOutside(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onPointerOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onPointerOutside);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-2 top-0 z-50 flex justify-center sm:inset-x-3 lg:inset-x-4"
      >
      {/* Fills the width up to max-w-6xl instead of shrink-wrapping its links.
          Articles, the footer and comparison pages use the same box, so every
          page shares one set of left and right edges. */}
      <div ref={navRef} className="relative w-full md:max-w-6xl">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center rounded-2xl bg-white px-4 pb-3 pt-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] sm:px-10 sm:pb-3.5 sm:pt-6 md:rounded-b-3xl md:rounded-t-none lg:px-12 lg:pt-7">
          {/* Left - Desktop nav links */}
          <div className="hidden items-center gap-0.5 lg:flex lg:gap-1">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 lg:px-3 lg:text-[15px]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 lg:px-3 lg:text-[15px]"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Center - Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 sm:px-10"
          >
            <BrandMark className="h-8 w-8" iconClassName="h-4 w-4" />
            <span className="text-lg font-bold tracking-tight text-slate-800">
              DreamDuo
            </span>
          </Link>

          {/* Right - CTA */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            {WAITLIST_ENABLED ? (
              <Link
                href="/#download"
                onClick={(e) => {
                  smoothScroll(e, "#download");
                  setMobileOpen(false);
                }}
                className="relative z-0 rounded-full p-[2px] before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-r before:from-rose-400 before:via-pink-400 before:via-amber-300 before:to-rose-400 before:bg-[length:200%_200%] before:animate-[gradient-rotate_3s_linear_infinite] after:absolute after:inset-[2px] after:-z-10 after:rounded-full after:bg-white"
              >
                <span className="block rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-800 transition-colors hover:text-rose-600 sm:px-5 sm:py-2 sm:text-sm">
                  Get beta invite
                </span>
              </Link>
            ) : (
              <>
                <PlayStoreCTA
                  variant="compact"
                  placement="navbar"
                  iconOnlyOnMobile
                />
                <AppStoreCTA
                  variant="compact"
                  placement="navbar"
                  iconOnlyOnMobile
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="absolute top-full mt-2 w-48 rounded-xl border border-slate-100 bg-white px-3 pb-3 pt-2 shadow-lg lg:hidden"
          >
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    smoothScroll(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
      </nav>

      {/* Preserve the navbar's layout space while it is fixed to the viewport. */}
      <div aria-hidden="true" className="h-[60px] sm:h-[70px] lg:h-[74px]" />
    </>
  );
}
