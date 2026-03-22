"use client";

import { Heart } from "lucide-react";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  glow?: boolean;
}

export function BrandMark({
  className = "",
  iconClassName = "",
  glow = false
}: BrandMarkProps) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 text-white",
        "shadow-[0_16px_34px_-18px_rgba(251,113,133,0.95)]",
        glow ? "animate-pulse-glow shadow-[0_18px_40px_-18px_rgba(251,113,133,1)]" : "",
        className
      ].join(" ")}
    >
      <Heart className={["fill-white text-white", iconClassName].join(" ")} />
    </div>
  );
}
