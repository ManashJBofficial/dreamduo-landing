"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import styles from "@/components/navbar.module.css";

const links = [
  { label: "Dreams", href: "/#dreams" },
  { label: "Features", href: "/#features" },
  { label: "Our Story", href: "/#story" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
        <div ref={frameRef} className={styles.frame}>
          <Link
            href="/"
            aria-label="DreamDuo home"
            onClick={() => setOpen(false)}
            className={styles.brand}
          >
            <BrandMark className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
              DreamDuo
            </span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="primary-nav-links"
            onClick={() => setOpen((value) => !value)}
            className={styles.toggle}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          <div id="primary-nav-links" className={styles.links} data-open={open}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`home-nav-link ${styles.link}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/download" onClick={() => setOpen(false)} className={`home-button-compact ${styles.cta}`}>
            Try for free
          </Link>
        </div>
      </nav>

      <div aria-hidden="true" className={styles.spacer} />
    </>
  );
}
