"use client";

import Image from "next/image";

interface PlayStoreCTAProps {
  className?: string;
  label?: string;
}

export function PlayStoreCTA({
  className = "",
  label = "Coming soon on Google Play"
}: PlayStoreCTAProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex w-full max-w-full items-center gap-3.5 rounded-2xl border border-white/12",
        "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96))] px-5 py-4 text-slate-900",
        "shadow-[0_24px_50px_-34px_rgba(15,23,42,0.95)] backdrop-blur-sm transition",
        "hover:-translate-y-0.5 hover:border-white/25 hover:bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(248,250,252,0.98))] sm:w-auto sm:min-w-[18.5rem]",
        className
      ].join(" ")}
    >
      <Image
        src="/google-play.png"
        alt="Google Play"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0"
      />
      <div className="min-w-0 flex-1 text-left">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Android app
        </div>
        <div className="text-[15px] font-semibold leading-tight text-slate-900 sm:text-base">
          {label}
        </div>
      </div>
    </button>
  );
}
