"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Goals", href: "#goals" },
  { label: "Features", href: "#features" },
  { label: "Our Story", href: "#story" },
  { label: "FAQ", href: "#faq" },
];

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-center">
      <div className="flex items-center gap-6 rounded-b-2xl bg-white px-6 pb-3 pt-5 sm:gap-8 sm:rounded-b-3xl sm:px-8 sm:pb-3.5 sm:pt-6 lg:pt-7">
        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-900 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800">
            DreamDuo
          </span>
        </Link>

        {/* CTA */}
        <a
          href="#download"
          onClick={(e) => smoothScroll(e, "#download")}
          className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 sm:px-5 sm:py-2 sm:text-sm"
        >
          Join Waitlist
        </a>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="mx-auto max-w-sm px-4 pb-4 pt-1 md:hidden">
          {navLinks.map((link) => (
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
          ))}
        </div>
      )}
    </nav>
  );
}
