import assert from "node:assert/strict";

// Run against a production Next.js server: node scripts/check-seo.mjs http://127.0.0.1:4101
const base = new URL(process.argv[2] ?? "http://localhost:4100");
const origin = "https://dreamduo.app";
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert(routes.length > 0, "Sitemap must list public pages");
const internal = new Set();
let images = 0;
for (const route of routes) {
  const response = await fetch(new URL(route, base), { redirect: "manual" });
  assert.equal(response.status, 200, `${route} must return 200 directly`);
  const html = await response.text();
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `${route} needs one main heading`);
  assert(html.includes(`rel="canonical" href="${origin}${route === "/" ? "" : route}"`) || (route === "/" && html.includes(`rel="canonical" href="${origin}/"`)), `${route} canonical must match the sitemap`);
  assert(!/name="robots" content="[^"]*noindex/.test(html), `${route} must be indexable`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  for (const match of html.matchAll(/<a[^>]+href="([^"#]+)[^"]*"/g)) {
    const target = new URL(match[1].replace(/&amp;/g, "&"), origin);
    if (target.origin === origin && !target.pathname.startsWith("/api/") && target.pathname !== "/open") internal.add(target.pathname);
  }
  if (/^\/(blog|compare)\/[^/]+$/.test(route) && !route.endsWith("rss.xml")) {
    const imageResponse = await fetch(new URL(`${route}/opengraph-image`, base));
    assert.equal(imageResponse.status, 200, `${route} generated social card must render`);
    assert.match(imageResponse.headers.get("content-type") ?? "", /^image\/png/);
    const png = Buffer.from(await imageResponse.arrayBuffer());
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    assert(html.includes(`${origin}${route}/opengraph-image`), `${route} must reference its own social card`);
    images++;
  }
}
for (const route of internal) assert.equal((await fetch(new URL(route, base))).status, 200, `Broken internal link: ${route}`);
const privacy = await fetch(new URL("/privacy", base), { redirect: "manual" });
assert.equal(privacy.status, 308, "Legacy privacy URL needs a permanent redirect");
assert.equal(new URL(privacy.headers.get("location"), base).pathname, "/privacy-policy");
for (const route of ["/blog/missing-seo-check", "/compare/missing-seo-check", "/blog/tag/missing-seo-check"]) assert.equal((await fetch(new URL(route, base))).status, 404, `${route} must remain a real 404`);
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//i);
assert.match(robots, /Sitemap: https:\/\/dreamduo.app\/sitemap.xml/i);
const feed = await fetch(new URL("/blog/rss.xml", base));
assert.equal(feed.status, 200);
assert.match(await feed.text(), /<rss version="2.0"/);
console.log(`SEO checks passed: ${routes.length} sitemap pages, ${internal.size} internal destinations, ${images} generated social cards, privacy redirect, real 404s, robots and RSS.`);
