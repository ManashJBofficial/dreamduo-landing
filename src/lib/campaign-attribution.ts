"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readCampaign, type Campaign } from "@/lib/download-links";

const STORAGE_KEY = "dreamduo_campaign";
const CHANGE_EVENT = "dreamduo:campaign";
let memory = "";
let referrerMemory: string | undefined;
const REFERRER_KEY = "dreamduo_acquisition_referrer";

export function acquisitionReferrer(): string {
  let hostname = "direct";
  try {
    if (document.referrer) hostname = new URL(document.referrer).hostname;
    const stored = sessionStorage.getItem(REFERRER_KEY);
    if (stored) return stored;
  } catch { /* Referrer and session storage are optional. */ }
  return referrerMemory ?? hostname;
}

// Session-scoped, last explicitly tagged campaign. Untagged internal navigation
// retains attribution; a new tagged arrival replaces the previous campaign.
function snapshot(): string {
  const incoming = readCampaign(new URLSearchParams(window.location.search));
  if (Object.keys(incoming).length) return new URLSearchParams(incoming).toString();
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? memory;
  } catch {
    return memory;
  }
}

function subscribe(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("popstate", listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("popstate", listener);
  };
}

export function currentCampaign(): Campaign {
  return typeof window === "undefined" ? {} : readCampaign(new URLSearchParams(snapshot()));
}

export function captureCampaign() {
  const incoming = readCampaign(new URLSearchParams(window.location.search));
  let referrer = acquisitionReferrer();
  try {
    const external = document.referrer && new URL(document.referrer).hostname;
    if (Object.keys(incoming).length && external && external !== window.location.hostname) referrer = external;
  } catch { /* Keep the previously captured referrer. */ }
  referrerMemory = referrer;
  try { sessionStorage.setItem(REFERRER_KEY, referrer); } catch { /* In-memory fallback. */ }
  if (Object.keys(incoming).length) {
    memory = new URLSearchParams(incoming).toString();
    try { sessionStorage.setItem(STORAGE_KEY, memory); } catch { /* In-memory fallback. */ }
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useCampaign(placement = "download"): Campaign {
  const query = useSyncExternalStore(subscribe, snapshot, () => "");
  return useMemo(() => ({
    utm_source: "dreamduo_landing",
    utm_medium: "web",
    utm_campaign: placement,
    ...readCampaign(new URLSearchParams(query)),
  }), [query, placement]);
}
