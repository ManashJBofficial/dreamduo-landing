import { track } from "@vercel/analytics";
import type { Campaign, DownloadPlatform } from "@/lib/download-links";

type DownloadEvent = "download_view" | "download_qr_visit" | "download_store_click" | "download_redirect";

export function trackDownload(
  event: DownloadEvent,
  campaign: Campaign,
  details: { platform?: DownloadPlatform; store?: "app_store" | "google_play"; via?: string } = {},
) {
  let referrer = "direct";
  try {
    if (document.referrer) referrer = new URL(document.referrer).hostname;
  } catch { /* Referrer is optional; malformed values must never block a download. */ }
  const data = { ...campaign, ...details, referrer };
  try {
    track(event, data);
  } catch { /* Store navigation must still work when analytics is unavailable. */ }
  try {
    window.gtag?.("event", event, data);
  } catch { /* Analytics must not prevent the QR store redirect either. */ }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
