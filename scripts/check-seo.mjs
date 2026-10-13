import assert from "node:assert/strict";

// Run against a production Next.js server: node scripts/check-seo.mjs http://127.0.0.1:4101
const base = new URL(process.argv[2] ?? "http://localhost:4100");
const origin = "https://dreamduo.app";
// Date-only editorial fields use the publisher\'s calendar day, not UTC midnight.
const today = new Intl.DateTimeFormat("en-CA", { timeZone: process.env.SEO_AUDIT_TIMEZONE ?? "Asia/Kolkata" }).format(new Date());
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert(routes.length > 0, "Sitemap must list public pages");
const internal = new Set();
const articlePages = [];
const titles = new Map();
const descriptions = new Map();
const pageHtml = new Map();
const fragments = [];
let storeLinks = 0;
let images = 0;
for (const route of routes) {
  const response = await fetch(new URL(route, base), { redirect: "manual" });
  assert.equal(response.status, 200, `${route} must return 200 directly`);
  const html = await response.text();
  pageHtml.set(route, html);
  const meta = [...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)"/g)];
  for (const name of ["description", "robots", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    const matches = meta.filter(match => match[1] === name);
    assert(matches.length >= 1 && matches.every(match => match[2].trim()), `${route} needs complete ${name} metadata`);
    if (name !== "og:image" && name !== "twitter:image") assert.equal(matches.length, 1, `${route} must not duplicate ${name}`);
  }
  const ogUrl = meta.find(match => match[1] === "og:url")?.[2];
  assert.equal(new URL(ogUrl).pathname, route, `${route} social URL must match the page`);
  assert.equal(new URL(ogUrl).origin, origin, `${route} social URL must use the production host`);
  assert.match(html, /<html[^>]*lang="en"/, `${route} must declare its content language`);
  assert.match(html, /name="viewport" content="[^"]*width=device-width/, `${route} needs a mobile viewport`);
  for (const [label, value, seen] of [
    ["title", html.match(/<title>([^<]+)<\/title>/)?.[1], titles],
    ["description", html.match(/name="description" content="([^"]+)"/)?.[1], descriptions],
  ]) {
    assert(value?.trim(), `${route} needs a non-empty ${label}`);
    assert(!seen.has(value), `${route} duplicates the ${label} on ${seen.get(value)}`);
    seen.set(value, route);
  }
  assert(!/noindex|nosnippet/i.test(response.headers.get("x-robots-tag") ?? ""), `${route} must not receive restrictive indexing headers`);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `${route} needs one main heading`);
  assert(html.includes(`rel="canonical" href="${origin}${route === "/" ? "" : route}"`) || (route === "/" && html.includes(`rel="canonical" href="${origin}/"`)), `${route} canonical must match the sitemap`);
  assert(!/name="robots" content="[^"]*noindex/.test(html), `${route} must be indexable`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const target = new URL(match[1].replace(/&amp;/g, "&"), origin);
    if (target.hostname === "play.google.com" && (target.searchParams.get("id") === "com.dreamduo.app" || target.searchParams.get("referrer")?.includes("dreamduo_landing"))) {
      assert.equal(target.searchParams.get("id"), "com.dreamduo.app", `${route} must link to the correct Android app`);
      storeLinks++;
    }
    if (target.hostname === "apps.apple.com" && (target.pathname.endsWith("/id6807477523") || target.searchParams.has("ct"))) {
      assert(target.pathname.endsWith("/id6807477523"), `${route} must link to the correct iOS app`);
      storeLinks++;
    }
    if (target.hash && target.origin === origin) fragments.push({ path: match[1].startsWith("#") ? route : target.pathname, hash: decodeURIComponent(target.hash.slice(1)), from: route });
    if (target.origin === origin && !target.pathname.startsWith("/api/") && target.pathname !== "/open") internal.add(target.pathname);
  }
  if (/^\/(blog|compare)\/[^/]+$/.test(route) && !route.endsWith("rss.xml")) {
    articlePages.push(route);
    const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
    const article = schema.find(item => item["@type"] === "BlogPosting");
    assert(article?.headline && article.datePublished && article.author, `${route} needs factual article schema`);
    for (const name of ["datePublished", "dateModified"]) {
      const date = Date.parse(article[name]);
      const notFuture = /^\d{4}-\d{2}-\d{2}$/.test(article[name]) ? article[name] <= today : date <= Date.now();
      assert(Number.isFinite(date) && notFuture, `${route} ${name} must be a valid, non-future date`);
    }
    assert(Date.parse(article.dateModified) >= Date.parse(article.datePublished), `${route} cannot be modified before publication`);
    assert.equal(article.mainEntityOfPage?.["@id"], `${origin}${route}`, `${route} schema must use its canonical URL`);
    assert(article.author.name && article.author.url, `${route} needs an identifiable author`);
    assert.equal(article.publisher?.["@id"], `${origin}/#organization`, `${route} needs consistent publisher identity`);
    assert(html.includes(article.headline.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;")), `${route} schema headline must be visible in server HTML`);
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
for (const route of internal) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `Broken internal link: ${route}`);
  if (!pageHtml.has(route)) pageHtml.set(route, await response.text());
}
for (const { path, hash, from } of fragments) assert(pageHtml.get(path)?.includes(`id="${hash}"`), `Broken section link from ${from} to ${path}#${hash}`);
assert(storeLinks > 0, "Public pages must expose app download links");
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
// These are application-level UA checks, not proof that a deployed WAF permits
// the providers' real IPs. OAI-SearchBot is deliberately distinct from GPTBot.
const agents = ["Googlebot", "bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "GPTBot", "ClaudeBot"];
for (const agent of agents) {
  for (const route of articlePages) {
    const response = await fetch(new URL(route, base), { headers: { "User-Agent": agent } });
    assert.equal(response.status, 200, `${agent} must access ${route}`);
    assert(!/noindex|nosnippet/i.test(response.headers.get("x-robots-tag") ?? ""), `${agent} must not receive restrictive HTTP indexing headers`);
    const html = await response.text();
    assert.match(html, /<h1[ >]/, `${agent} needs server-rendered article headings`);
    assert.match(html, /application\/ld\+json/, `${agent} needs server-rendered schema`);
    assert.match(html, /editorial-prose/, `${agent} needs the article body in server HTML`);
    assert(!/name="robots" content="[^"]*(noindex|nosnippet)/.test(html), `${agent} must not receive search restrictions`);
  }
}
console.log(`Crawler checks passed: ${agents.length} user agents across ${articlePages.length} articles, without executing JavaScript.`);
console.log(`Metadata and conversion checks passed: unique titles/descriptions, ${fragments.length} section links and ${storeLinks} correctly targeted app-store links.`);
console.log(`SEO checks passed: ${routes.length} sitemap pages, ${internal.size} internal destinations, ${images} generated social cards, privacy redirect, real 404s, robots and RSS.`);
