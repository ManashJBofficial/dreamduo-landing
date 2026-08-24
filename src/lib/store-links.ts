export const GOOGLE_PLAY_PACKAGE = "com.dreamduo.app";

export const GOOGLE_PLAY_URL = `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_PACKAGE}`;

/**
 * Play Store install URL tagged with a referrer so we can see which CTA on the
 * page drove the install inside Play Console acquisition reports.
 */
export function getPlayStoreUrl(placement?: string): string {
  if (!placement) return GOOGLE_PLAY_URL;

  const referrer = new URLSearchParams({
    utm_source: "dreamduo_landing",
    utm_medium: "web",
    utm_campaign: placement,
  }).toString();

  return `${GOOGLE_PLAY_URL}&referrer=${encodeURIComponent(referrer)}`;
}
