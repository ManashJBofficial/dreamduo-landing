import type { NextConfig } from "next";

const waitlistApiBaseUrl =
  process.env.WAITLIST_INTERNAL_API_BASE_URL ?? "http://127.0.0.1:5050";

const nextConfig: NextConfig = {
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