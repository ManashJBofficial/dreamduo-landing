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

export const APP_STORE_ID = "6807477523";

export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/**
 * App Store install URL tagged with a campaign token, so App Store Connect
 * Analytics can attribute installs to the CTA that drove them, the same way the
 * Play referrer does for Google. `pt` is the provider token and `ct` the
 * campaign; both are Apple's own attribution params.
 */
export function getAppStoreUrl(placement?: string): string {
  if (!placement) return APP_STORE_URL;
  const params = new URLSearchParams({ ct: placement, mt: "8" }).toString();
  return `${APP_STORE_URL}?${params}`;
}

/**
 * Kept for the retired "coming soon" modal. iOS shipped 2026-09-15, so every
 * App Store CTA now links to the store directly; nothing renders this today.
 */
export const IOS_WAITLIST_URL = "https://tally.so/r/obLJQ1";
