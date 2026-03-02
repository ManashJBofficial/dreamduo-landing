"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchWaitlistCount, type WaitlistStatus } from "@/lib/waitlist-api";

const countFormatter = new Intl.NumberFormat("en-US");
const DEFAULT_PUBLIC_COUNT = 30;
const LAST_COUNT_STORAGE_KEY = "waitlist_public_count";

export function WaitlistStrip() {
  const initialCount = getInitialCount();
  const [count, setCount] = useState<number>(initialCount);
  const [displayCount, setDisplayCount] = useState(initialCount);
  const displayRef = useRef(initialCount);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const nextCount = Math.max(DEFAULT_PUBLIC_COUNT, await fetchWaitlistCount());
        if (!cancelled) {
          setCount(nextCount);
          persistCount(nextCount);
        }
      } catch {
        // Keep showing the last known public count when backend is unavailable.
      }
    }

    loadCount();

    return () => {
      cancelled = true;
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const from = displayRef.current;
    const to = count;
    if (from === to) {
      return;
    }

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    const durationMs = 1100;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(from + (to - from) * eased);

      displayRef.current = nextValue;
      setDisplayCount(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [count]);

  useEffect(() => {
    const handleJoined = (event: Event) => {
      const customEvent = event as CustomEvent<{ status?: WaitlistStatus }>;
      if (
        customEvent.detail?.status === "subscribed" ||
        customEvent.detail?.status === "pending"
      ) {
        setCount((previous) => previous + 1);
      }
    };

    window.addEventListener("waitlist:joined", handleJoined as EventListener);
    return () => {
      window.removeEventListener(
        "waitlist:joined",
        handleJoined as EventListener
      );
    };
  }, []);

  useEffect(() => {
    persistCount(count);
  }, [count]);

  const formattedCount = useMemo(() => {
    return countFormatter.format(Math.max(displayCount, DEFAULT_PUBLIC_COUNT));
  }, [displayCount]);

  return (
    <section className="-mx-2 bg-slate-950 py-0 sm:-mx-3 lg:-mx-4">
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/60 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col items-center px-6 py-6 text-center sm:px-8 sm:py-7">
              <div
                aria-live="polite"
                className="font-display text-4xl font-extrabold leading-none tabular-nums text-transparent bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 bg-clip-text sm:text-5xl"
              >
                {`${formattedCount}+`}
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-white/65">
                Couples planning together
              </div>
            </div>

            <div className="flex flex-col items-center px-6 py-6 text-center sm:px-8 sm:py-7">
              <div className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                SYNCED
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-white/65">
                Money, habits, and plans in one place
              </div>
            </div>

            <div className="flex flex-col items-center px-6 py-6 text-center sm:px-8 sm:py-7">
              <div className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                PRIVATE
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-white/65">
                Private goals, shared dreams
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getInitialCount(): number {
  if (typeof window === "undefined") {
    return DEFAULT_PUBLIC_COUNT;
  }

  const raw = window.localStorage.getItem(LAST_COUNT_STORAGE_KEY);
  if (!raw) {
    return DEFAULT_PUBLIC_COUNT;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < DEFAULT_PUBLIC_COUNT) {
    return DEFAULT_PUBLIC_COUNT;
  }

  return Math.trunc(parsed);
}

function persistCount(value: number): void {
  if (typeof window === "undefined") {
    return;
  }

  const safeValue = Math.max(DEFAULT_PUBLIC_COUNT, Math.trunc(value));
  window.localStorage.setItem(LAST_COUNT_STORAGE_KEY, String(safeValue));
}
