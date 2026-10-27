"use client";

import { useEffect, useRef, useState } from "react";

interface DeferredFeatureImageProps {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function DeferredFeatureImage({ id, src, alt, width, height, className }: DeferredFeatureImageProps) {
  const image = useRef<HTMLImageElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  useEffect(() => {
    if (!image.current) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }
    // Native lazy loading may fetch screenshots several screens ahead on 4G.
    // Keep the first viewport's bandwidth for its hero and fonts instead.
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(image.current);
    return () => observer.disconnect();
  }, []);
  return <>
    <picture>
      <source srcSet={nearViewport ? `/optimized/feature-${id}.avif` : undefined} type="image/avif" />
      <img ref={image} data-deferred-feature="" src={nearViewport ? src : undefined} alt={alt} width={width} height={height}
        className={className} decoding="async" loading="lazy" fetchPriority="low"
        style={{ visibility: nearViewport ? "visible" : "hidden" }} />
    </picture>
    {/* Retain a real screenshot when JavaScript is disabled. */}
    <noscript>
      <style>{"img[data-deferred-feature] { display: none; }"}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} className={className} loading="lazy" />
    </noscript>
  </>;
}
