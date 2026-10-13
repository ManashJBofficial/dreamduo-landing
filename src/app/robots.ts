import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // This wildcard permits search crawlers (OAI-SearchBot, PerplexityBot,
      // Claude-SearchBot, Googlebot and Bingbot) and user-requested fetchers.
      // Training controls such as GPTBot are independent; do not confuse them
      // with search visibility. CDN/WAF rules must also permit legitimate bots.
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dreamduo.app/sitemap.xml",
    host: "https://dreamduo.app",
  };
}
