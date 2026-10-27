interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
  glow?: boolean;
}

export function BrandMark({ className = "", glow = false }: BrandMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/optimized/brand-mark.webp"
      alt=""
      width={112}
      height={112}
      className={[
        "object-contain",
        glow ? "animate-pulse-glow" : "",
        className,
      ].join(" ")}
    />
  );
}
