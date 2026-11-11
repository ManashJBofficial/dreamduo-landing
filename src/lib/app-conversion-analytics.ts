import { track } from "@vercel/analytics";

export interface AppCtaContext {
  cta_position: string;
  cta_variant: string;
}

function send(event: "app_cta_view" | "app_store_click", params: Record<string, string>) {
  try {
    track(event, params);
  } catch { /* Measurement must never affect reading or store navigation. */ }
  try {
    window.gtag?.("event", event, { ...params, transport_type: "beacon" });
  } catch { /* Use the existing Google tag and its consent state, if available. */ }
}

export function trackAppCtaView(articleSlug: string, context: AppCtaContext) {
  send("app_cta_view", { article_slug: articleSlug, ...context });
}

export function trackAppStoreClick(store: "ios" | "android", context: AppCtaContext) {
  if (typeof window === "undefined") return;
  const sourcePage = window.location.pathname;
  const articleSlug = /^\/blog\/([^/]+)\/?$/.exec(sourcePage)?.[1];
  send("app_store_click", {
    source_page: sourcePage,
    ...(articleSlug ? { article_slug: articleSlug } : {}),
    ...context,
    store,
  });
}

/** One scope per page view; survives CTA remounts but is discarded on navigation. */
export function createCtaImpressionScope() {
  const seen = new Set<string>();
  return {
    record(articleSlug: string, context: AppCtaContext) {
      const key = JSON.stringify([articleSlug, context.cta_position, context.cta_variant]);
      if (seen.has(key)) return;
      seen.add(key);
      trackAppCtaView(articleSlug, context);
    },
  };
}
