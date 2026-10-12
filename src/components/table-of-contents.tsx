"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/blog";

/** How long scrolling must pause before a click-triggered scroll counts as finished. */
const SCROLL_IDLE_MS = 150;

/**
 * Where a heading ends up after a table-of-contents jump: the page's
 * scroll-padding-top (room for the fixed navbar) plus the heading's own
 * scroll-margin-top. Read from CSS rather than hard-coded, so the "current
 * section" line always matches where a clicked heading actually stops. When
 * the two disagreed, a clicked heading parked just short of the line and the
 * previous section stayed highlighted.
 */
function landingLine(el: HTMLElement): number {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  // A few px of slack for sub-pixel rounding in the browser's scroll position.
  return padding + margin + 8;
}

/**
 * The section being read: the last heading that has crossed its landing line.
 * A scroll listener rather than an IntersectionObserver, because an observer
 * only reports headings on screen, so it goes blank in the middle of a long
 * section with no heading in view.
 *
 * A click locks the highlight to the chosen heading until the smooth scroll
 * stops. Without the lock, every heading the page scrolls past on the way
 * lights up in turn.
 */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const locked = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const frame = useRef(0);

  const update = useCallback(() => {
    frame.current = 0;
    if (locked.current) return;

    let current = ids[0] ?? null;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= landingLine(el)) current = id;
    }
    setActive(current);
  }, [ids]);

  // Unlock once scrolling has been quiet for a moment, then sync to wherever
  // the page actually ended up (it can stop short near the bottom).
  const releaseWhenIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      locked.current = false;
      update();
    }, SCROLL_IDLE_MS);
  }, [update]);

  useEffect(() => {
    if (ids.length === 0) return;

    function onScroll() {
      if (locked.current) {
        releaseWhenIdle();
        return;
      }
      if (!frame.current) frame.current = requestAnimationFrame(update);
    }

    frame.current = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer.current);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ids, update, releaseWhenIdle]);

  const select = useCallback(
    (id: string) => {
      locked.current = true;
      setActive(id);
      // Also covers a click on the section already in view, where no scroll
      // event would fire to release the lock.
      releaseWhenIdle();
    },
    [releaseWhenIdle]
  );

  return { active, select };
}

function TocList({
  headings,
  active,
  onSelect,
}: {
  headings: Heading[];
  active: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <ul className="space-y-1 text-[14px] leading-snug">
      {headings.map((heading) => {
        const isActive = heading.id === active;
        return (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${heading.id}`}
              onClick={() => onSelect?.(heading.id)}
              aria-current={isActive ? "location" : undefined}
              className={
                "block border-l-2 py-1.5 pl-3 transition-colors " +
                (isActive
                  ? "border-rose-500 font-semibold text-slate-900"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800")
              }
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Desktop: sits in the sticky sidebar, scrolls on its own if it is taller than the screen. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  // Stable array identity, so the scroll listener is not torn down and
  // re-added on every render of the parent.
  const [ids] = useState(() => headings.map((h) => h.id));
  const { active, select } = useActiveHeading(ids);
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        Table of contents
      </p>
      <div className="mt-4 max-h-[calc(100vh-22rem)] overflow-y-auto pr-2">
        <TocList headings={headings} active={active} onSelect={select} />
      </div>
    </nav>
  );
}

/**
 * Phones and tablets: collapsed by default so it does not push the article
 * below the fold, one tap to open. Closes after a jump so the reader lands on
 * the section instead of a list covering it.
 */
export function MobileTableOfContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  if (headings.length === 0) return null;

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="group rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
        On this page
        <span
          aria-hidden="true"
          className="text-slate-400 transition-transform duration-200 group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="mt-3">
        <TocList headings={headings} active={null} onSelect={() => setOpen(false)} />
      </div>
    </details>
  );
}
