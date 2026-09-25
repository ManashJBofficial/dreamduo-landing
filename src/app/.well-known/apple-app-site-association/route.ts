import { NextResponse } from "next/server";

// iOS Universal Links verification file. Apple's crawler fetches this exact
// path directly (no redirects allowed) and caches it, so it has to be a real
// 200 response with real JSON — a static /public file works too, but Vercel
// serves extensionless public files as application/octet-stream, and some
// AASA fetchers are picky about that. A route handler lets us pin the header.
//
// appIDs needs your Apple Developer Team ID: developer.apple.com -> Account
// -> Membership Details -> Team ID. iOS isn't shipped yet, so this is wired
// but inert until that placeholder is replaced with a real build submitted.
const APPLE_TEAM_ID = "6C67X8ZUTM";
const BUNDLE_ID = "com.dreamduo.app";

// Scoped to the paths the app actually has screens for (matches the
// deepLink values the backend emits), so tapping a shared /privacy-policy or
// /terms link never tries to hand off to the app.
const APP_PATHS = ["/goal/*", "/daily-question/*", "/notifications", "/deck"];

export function GET() {
  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [`${APPLE_TEAM_ID}.${BUNDLE_ID}`],
          appID: `${APPLE_TEAM_ID}.${BUNDLE_ID}`, // pre-iOS 13 fetchers only read the singular key
          paths: APP_PATHS,
        },
      ],
    },
  };

  return NextResponse.json(body, {
    headers: {
      // No cache-control override: Apple's own CDN dictates its own re-fetch
      // cadence and ignores ours, but a short max-age keeps browsers from
      // pinning a stale copy while the Team ID placeholder above is filled in.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
