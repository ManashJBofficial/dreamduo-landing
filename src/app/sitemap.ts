import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dreamduo.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://dreamduo.app/privacy-policy",
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://dreamduo.app/terms",
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
