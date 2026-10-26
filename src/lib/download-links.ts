import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/store-links";

export const DOWNLOAD_URL = "https://dreamduo.app/download";
export const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Campaign = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;
export type DownloadPlatform = "ios" | "android" | "desktop";

export function readCampaign(params: URLSearchParams): Campaign {
  const campaign: Campaign = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim().slice(0, 100);
    if (value) campaign[key] = value;
  }
  return campaign;
}

export function detectDownloadPlatform(userAgent: string, touchPoints = 0): DownloadPlatform {
  if (/android/i.test(userAgent)) return "android";
  // iPadOS can identify itself as a Mac when requesting desktop websites.
  if (/iphone|ipad|ipod/i.test(userAgent) || (/macintosh/i.test(userAgent) && (touchPoints > 1 || /mobile/i.test(userAgent)))) {
    return "ios";
  }
  return "desktop";
}

export function detectQrDevice(userAgent: string, touchPoints = 0): "phone" | "tablet" | "desktop" {
  if (/iphone|ipod|android.*mobile|windows phone|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return "phone";
  }
  if (detectDownloadPlatform(userAgent, touchPoints) !== "desktop" || /tablet|kindle|silk/i.test(userAgent)) {
    return "tablet";
  }
  return "desktop";
}

export function getDownloadQrUrl(campaign: Campaign = {}): string {
  const url = new URL(DOWNLOAD_URL);
  for (const key of CAMPAIGN_KEYS) {
    if (campaign[key]) url.searchParams.set(key, campaign[key]);
  }
  if (!campaign.utm_source) url.searchParams.set("utm_source", "dreamduo_landing");
  if (!campaign.utm_medium) url.searchParams.set("utm_medium", "web");
  url.searchParams.set("via", "qr");
  return url.toString();
}

export function getDownloadStoreUrl(platform: "ios" | "android", campaign: Campaign): string {
  const tags = {
    utm_source: "dreamduo_landing",
    utm_medium: "web",
    utm_campaign: "download",
    ...campaign,
  };
  if (platform === "android") {
    const url = new URL(GOOGLE_PLAY_URL);
    url.searchParams.set("referrer", new URLSearchParams(tags).toString());
    return url.toString();
  }

  const url = new URL(APP_STORE_URL);
  // Apple's campaign token is limited to 40 characters. A provider token from
  // App Store Connect is also needed for Apple's install attribution reports.
  const token = [tags.utm_source, tags.utm_campaign, campaign.utm_content].filter(Boolean).join("_");
  url.searchParams.set("ct", token.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 40));
  url.searchParams.set("mt", "8");
  const provider = process.env.NEXT_PUBLIC_APP_STORE_PROVIDER_TOKEN;
  if (provider && /^\d+$/.test(provider)) url.searchParams.set("pt", provider);
  return url.toString();
}
