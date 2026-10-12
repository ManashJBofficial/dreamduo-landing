import { getPosts } from "@/lib/blog";

/**
 * RSS 2.0 feed. Worth having beyond human subscribers: syndication sites and
 * the crawlers behind AI answers both consume feeds, and it is the cheapest
 * way to get a new post discovered somewhere other than your own sitemap.
 */

const SITE_URL = "https://dreamduo.app";
const TITLE = "The DreamDuo Blog";
const DESCRIPTION =
  "Guides, comparisons, and honest advice for couples building a life together.";

/** Generated at build time with everything else — no per-request work. */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPosts();
  const updated = posts.map((post) => post.updated ?? post.date).sort().at(-1);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${(post.tags ?? [])
  .map((tag) => `      <category>${escapeXml(tag)}</category>`)
  .join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${updated ? `    <lastBuildDate>${new Date(`${updated}T00:00:00Z`).toUTCString()}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
