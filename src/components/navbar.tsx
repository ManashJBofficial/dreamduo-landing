"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import styles from "@/components/navbar.module.css";
import { useCampaign } from "@/lib/campaign-attribution";
import { trackDownload } from "@/lib/download-analytics";

const links = [
  { label: "Dreams", href: "/#dreams" },
  { label: "Features", href: "/#features" },
  { label: "Our Story", href: "/#story" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const campaign = useCampaign("navbar");
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // CSS can blur a hidden desktop link before the breakpoint callback runs.
  const linkHadFocus = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      setOpen(false);
      if (event.matches && document.activeElement === toggleRef.current) {
        frameRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      } else if (!event.matches && linkHadFocus.current) {
        toggleRef.current?.focus();
      }
      linkHadFocus.current = false;
    }
    desktop.addEventListener("change", onBreakpoint);
    return () => desktop.removeEventListener("change", onBreakpoint);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!frameRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Primary" className={styles.nav}>
        <div
          ref={frameRef}
          className={styles.frame}
          onFocusCapture={(event) => {
            linkHadFocus.current = !!document.getElementById("primary-nav-links")?.contains(event.target);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setOpen(false);
              if (event.relatedTarget || window.matchMedia("(min-width: 1024px)").matches) linkHadFocus.current = false;
            }
          }}
        >
          <Link prefetch={false} href="/" aria-label="DreamDuo home"
            onClick={() => setOpen(false)} className={styles.brand}>
            <BrandMark className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">DreamDuo</span>
          </Link>

          <div id="primary-nav-links" className={styles.links} data-open={open}>
            {links.map((link) => (
              <Link prefetch={false} key={link.href} href={link.href}
                onClick={() => {
                  setOpen(false);
                  if (window.location.pathname === "/" && link.href.startsWith("/#")) {
                    const section = document.getElementById(link.href.slice(2));
                    section?.setAttribute("tabindex", "-1");
                    section?.focus({ preventScroll: true });
                  }
                }} className={`home-nav-link ${styles.link}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <Link prefetch={false} href="/download" onClick={() => {
              setOpen(false);
              trackDownload("download_page_click", campaign, { placement: "navbar" });
            }} className={`home-button-compact ${styles.cta}`}>
              <span className={styles.desktopLabel}>Try for free</span>
              <span className={styles.mobileLabel}>Get app</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="primary-nav-links"
              onClick={() => {
                setOpen(!open);
                if (!open) requestAnimationFrame(() => {
                  document.getElementById("primary-nav-links")?.querySelector<HTMLAnchorElement>("a")?.focus();
                });
              }}
              className={styles.toggle}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
      <div aria-hidden="true" className={styles.spacer} />
    </>
  );
}
