import type { MetadataRoute } from "next";
import { getComparisons, getPosts, getTags } from "@/lib/blog";

const SITE_URL = "https://dreamduo.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  const comparisons = getComparisons();

  // Latest meaningful edit drives the /blog index's lastModified, so the hub looks fresh
  // to a crawler whenever anything under it changes.
  const latest = posts.map((post) => post.updated ?? post.date).sort().at(-1);

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latest ? new Date(latest) : undefined,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getTags().map(({ tag }) => ({
      url: `${SITE_URL}/blog/tag/${tag}`,
      lastModified: posts.filter((post) => post.tags?.includes(tag)).map((post) => post.updated ?? post.date).sort().at(-1),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/compare`,
      lastModified: comparisons.map((entry) => entry.updated ?? entry.date).sort().at(-1),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // Comparisons carry the most buying intent on the site ("X vs Y" searches
    // come from people choosing an app right now), so they rank just under
    // the homepage and the blog index.
    ...comparisons.map((c) => ({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: new Date(c.updated ?? c.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/account-deletion`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/data-deletion`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
