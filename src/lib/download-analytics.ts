import { track } from "@vercel/analytics";
import type { Campaign, DownloadPlatform } from "@/lib/download-links";
import { acquisitionReferrer, currentCampaign } from "@/lib/campaign-attribution";

type DownloadEvent = "download_view" | "download_qr_visit" | "download_store_click" | "download_redirect" | "download_page_click";

export function trackDownload(
  event: DownloadEvent,
  campaign: Campaign,
  details: { platform?: DownloadPlatform; store?: "app_store" | "google_play"; via?: string; placement?: string } = {},
) {
  const referrer = acquisitionReferrer();
  const articleSlug = typeof window !== "undefined"
    ? /^\/blog\/([^/]+)\/?$/.exec(window.location.pathname)?.[1]
    : undefined;
  const data = { ...campaign, ...currentCampaign(), ...details, referrer, ...(articleSlug ? { article_slug: articleSlug } : {}) };
  try {
    track(event, data);
  } catch { /* Store navigation must still work when analytics is unavailable. */ }
  try {
    window.gtag?.("event", event, { ...data, transport_type: "beacon" });
  } catch { /* Analytics must not prevent the QR store redirect either. */ }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
