interface ResponsiveArtworkProps {
  name: "hero" | "download";
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

const widths = [400, 640, 960, 1280];

export function ResponsiveArtwork({ name, alt, sizes, className, priority = false }: ResponsiveArtworkProps) {
  const srcSet = (format: string) => widths.map(width => `/optimized/${name}-${width}.${format} ${width}w`).join(", ");
  return (
    <>
      {priority && <>
        <link rel="preload" as="image" href={`/optimized/${name}-480.avif`} media="(max-width: 639px)" type="image/avif" fetchPriority="high" />
        <link rel="preload" as="image" href={`/optimized/${name}-640.avif`} media="(min-width: 640px)"
          imageSrcSet={srcSet("avif")} imageSizes={sizes} type="image/avif" fetchPriority="high" />
      </>}
      <picture>
        <source media="(max-width: 639px)" type="image/avif" srcSet={`/optimized/${name}-480.avif`} />
        <source media="(max-width: 639px)" type="image/webp" srcSet={`/optimized/${name}-480.webp`} />
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        {/* Static derivatives avoid an image-optimizer cold start for the LCP. */}
        <img src={`/optimized/${name}-640.webp`} width={1548} height={1555} alt={alt}
          loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}
          decoding="async" className={className} />
      </picture>
    </>
  );
}
