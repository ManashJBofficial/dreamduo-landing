import type { NextConfig } from "next";

const waitlistApiBaseUrl =
  process.env.WAITLIST_INTERNAL_API_BASE_URL ?? "http://127.0.0.1:5050";

// The backend's existing smart-link route: detects Android/iOS by user agent
// and either opens the installed app or falls back to the right store. Once
// Universal Links / App Links are verified (see the two .well-known files),
// the OS intercepts a tap on these paths before any request is ever made and
// opens the app directly — this redirect only ever fires for the fallback
// cases: app not installed, verification not yet propagated, or desktop.
const smartLinkBaseUrl = "https://api.dreamduo.app/api/v1/email/open";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. Both beat the raw asset by a wide margin.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        // The project's own *.vercel.app alias serves a full copy of the site.
        // Send it to the canonical host so search engines never index a
        // duplicate. Production only: preview deployments must keep working
        // on their vercel.app URLs.
        source: "/:path*",
        has: [{ type: "host", value: "dreamduo-landing.vercel.app" }],
        destination: "https://dreamduo.app/:path*",
        permanent: true,
      },
      // Deep-link fallback paths, kept in sync with every `deepLink` value the
      // backend emits (grep `deepLink` in backend/src). Temporary (307), not
      // permanent: the target is a device-specific action, not a fixed page,
      // and a 308 risks browsers pinning it past the point a real Universal
      // Link should have intercepted the tap instead.
      {
        source: "/goal/:id",
        destination: `${smartLinkBaseUrl}?to=%2Fgoal%2F:id`,
        permanent: false,
      },
      {
        source: "/daily-question/:id",
        destination: `${smartLinkBaseUrl}?to=%2Fdaily-question%2F:id`,
        permanent: false,
      },
      {
        source: "/notifications",
        destination: `${smartLinkBaseUrl}?to=%2Fnotifications`,
        permanent: false,
      },
      {
        source: "/deck",
        destination: `${smartLinkBaseUrl}?to=%2Fdeck%3Fmode%3Dtoday`,
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${waitlistApiBaseUrl}/:path*`
      }
    ];
  }
};

export default nextConfig;