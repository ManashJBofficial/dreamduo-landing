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
      src="/dreamduo-mark.webp"
      alt="DreamDuo"
      width={256}
      height={256}
      className={[
        "object-contain",
        glow ? "animate-pulse-glow" : "",
        className,
      ].join(" ")}
    />
  );
}
