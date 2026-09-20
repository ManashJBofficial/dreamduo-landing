import type { NextConfig } from "next";

const waitlistApiBaseUrl =
  process.env.WAITLIST_INTERNAL_API_BASE_URL ?? "http://127.0.0.1:5050";

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