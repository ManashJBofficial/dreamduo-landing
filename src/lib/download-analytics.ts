import { track } from "@vercel/analytics";
import type { Campaign, DownloadPlatform } from "@/lib/download-links";
import { acquisitionReferrer, currentCampaign } from "@/lib/campaign-attribution";
import { trackAppStoreClick } from "@/lib/app-conversion-analytics";

type DownloadEvent = "download_view" | "download_qr_visit" | "download_store_click" | "download_redirect" | "download_page_click";

export function trackDownload(
  event: DownloadEvent,
  campaign: Campaign,
  details: { platform?: DownloadPlatform; store?: "app_store" | "google_play"; via?: string; placement?: string; cta_variant?: string } = {},
) {
  const referrer = acquisitionReferrer();
  const articleSlug = typeof window !== "undefined"
    ? /^\/blog\/([^/]+)\/?$/.exec(window.location.pathname)?.[1]
    : undefined;
  const eventDetails = event === "download_store_click"
    ? {
        ...details,
        placement: details.placement ?? "unknown",
        ...(typeof window !== "undefined" ? { page_path: window.location.pathname } : {}),
      }
    : details;
  const data = { ...campaign, ...currentCampaign(), ...eventDetails, referrer, ...(articleSlug ? { article_slug: articleSlug } : {}) };
  try {
    track(event, data);
  } catch { /* Store navigation must still work when analytics is unavailable. */ }
  try {
    window.gtag?.("event", event, { ...data, transport_type: "beacon" });
  } catch { /* Analytics must not prevent the QR store redirect either. */ }
  if (event === "download_store_click" && details.store) {
    trackAppStoreClick(details.store === "app_store" ? "ios" : "android", {
      cta_position: details.placement ?? "unknown",
      cta_variant: details.cta_variant ?? "store_badge",
    });
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
