"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { createCtaImpressionScope, type AppCtaContext } from "@/lib/app-conversion-analytics";

const ImpressionContext = createContext<ReturnType<typeof createCtaImpressionScope> | null>(null);

export function CtaImpressionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scope = useMemo(() => ({ pathname, ...createCtaImpressionScope() }), [pathname]);
  return <ImpressionContext.Provider value={scope}>{children}</ImpressionContext.Provider>;
}

export function useCtaImpression(articleSlug: string, { cta_position, cta_variant }: AppCtaContext) {
  const ref = useRef<HTMLElement>(null);
  const scope = useContext(ImpressionContext);
  useEffect(() => {
    const element = ref.current;
    if (!element || !scope || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25)) return;
      scope.record(articleSlug, { cta_position, cta_variant });
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [articleSlug, cta_position, cta_variant, scope]);
  return ref;
}
