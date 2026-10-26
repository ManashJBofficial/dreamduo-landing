import { track } from "@vercel/analytics/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { detectDownloadPlatform, getDownloadStoreUrl, readCampaign } from "@/lib/download-links";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.searchParams.get("via") !== "qr") return NextResponse.next();

  const platform = detectDownloadPlatform(request.headers.get("user-agent") ?? "");
  if (platform === "desktop") return NextResponse.next();

  const campaign = readCampaign(request.nextUrl.searchParams);
  const response = NextResponse.redirect(getDownloadStoreUrl(platform, campaign), 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "User-Agent");

  // Keep scan measurement off the redirect's critical path.
  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1" && request.method === "GET" && !request.headers.has("next-router-prefetch")) {
    let referrer = "direct";
    try {
      const source = request.headers.get("referer");
      if (source) referrer = new URL(source).hostname;
    } catch { /* A missing referrer must not affect a store redirect. */ }

    const data = { ...campaign, platform, via: "qr", referrer };
    event.waitUntil(Promise.all([
      track("download_qr_visit", data, { headers: request.headers }),
      track("download_redirect", data, { headers: request.headers }),
    ]).catch(() => { /* Analytics must never block installation. */ }));
  }

  return response;
}

export const config = { matcher: "/download" };
