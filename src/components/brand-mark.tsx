"use client";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  glow?: boolean;
}

export function BrandMark({ className = "", glow = false }: BrandMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/dreamduo_logo.webp"
      alt="DreamDuo"
      className={[
        "object-contain",
        glow ? "animate-pulse-glow" : "",
        className,
      ].join(" ")}
    />
  );
}
