// Replace these with your actual store URLs when available
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

export function getStoreUrl(): string | null {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/i.test(ua)) return APP_STORE_URL;
  if (/Android/i.test(ua)) return GOOGLE_PLAY_URL;

  return null;
}
