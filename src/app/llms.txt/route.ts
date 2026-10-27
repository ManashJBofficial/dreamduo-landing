import { getComparisons, getPublicPosts } from "@/lib/blog";

export const dynamic = "force-static";

const origin = "https://dreamduo.app";

/** Optional directory for readers and tools; the HTML articles remain canonical. */
export function GET() {
  const guides = getPublicPosts();
  const comparisons = getComparisons();
  const text = [
    "# DreamDuo",
    "",
    "> DreamDuo is an iPhone and Android app for couples, with shared goals, daily questions and a Nudge Hub.",
    "",
    "Shared goals support amount, checklist, habit and time tracking. Savings progress is entered by users; DreamDuo does not connect to bank accounts or move money. A free plan is available, with optional Pro features. Check the app stores for current pricing and availability.",
    "",
    "The blog is published by DreamDuo's founder. App comparisons disclose that publisher relationship. Guides include original planning templates and curated conversation questions; they are not independent app rankings or professional counseling. Adult intimacy guides are labeled 18+.",
    "",
    "## Site and product",
    "",
    `- [DreamDuo](${origin}/): Product features and download links.`,
    `- [Download](${origin}/download): iPhone and Android store links.`,
    `- [Blog](${origin}/blog): All current guides.`,
    `- [RSS feed](${origin}/blog/rss.xml): Published article summaries and URLs.`,
    `- [Sitemap](${origin}/sitemap.xml): Canonical public URLs and meaningful modification dates.`,
    `- [Editorial policy and author](${origin}/editorial-policy): Publisher, author and sourcing practices.`,
    "",
    "## Guides",
    "",
    ...guides.map(post => `- [${post.title}](${origin}/blog/${post.slug}): ${post.description}`),
    "",
    "## App comparisons",
    "",
    ...comparisons.map(post => `- [${post.title}](${origin}/compare/${post.slug}): ${post.description}`),
    "",
    "## Policies",
    "",
    `- [Privacy](${origin}/privacy-policy)`,
    `- [Terms](${origin}/terms)`,
    "",
  ].join("\n");

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
