import assert from "node:assert/strict";
import fs from "node:fs/promises";

// Run against a production Next.js server: node scripts/check-seo.mjs http://127.0.0.1:4101
const base = new URL(process.argv[2] ?? "http://localhost:4100");
const origin = "https://dreamduo.app";
const blogRedirects = JSON.parse(await fs.readFile(new URL("../src/content/blog-slug-redirects.json", import.meta.url), "utf8"));
// Date-only editorial fields use the publisher\'s calendar day, not UTC midnight.
const today = new Intl.DateTimeFormat("en-CA", { timeZone: process.env.SEO_AUDIT_TIMEZONE ?? "Asia/Kolkata" }).format(new Date());
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const sitemapDates = new Map();
const sitemapUrls = new Set();
for (const [, entry] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const location = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const url = new URL(location);
  assert.equal(url.origin, origin, "Sitemap must use the canonical HTTPS host");
  assert.equal(url.search + url.hash, "", "Sitemap must omit query and fragment variants");
  assert(!sitemapUrls.has(url.href), `Duplicate sitemap URL: ${url.href}`);
  sitemapUrls.add(url.href);
  const modified = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  if (modified) {
    assert(Number.isFinite(Date.parse(modified)) && modified.slice(0, 10) <= today, `${url.pathname} needs a valid, non-future lastModified`);
    sitemapDates.set(url.pathname, modified);
  }
}
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
let homepageCopy;

function htmlText(markup) {
  return (markup ?? "").replace(/<[^>]*>/g, "").replace(/&apos;|&#x27;|&#39;/gi, "'").trim();
}

for (const route of routes) {
  const response = await fetch(new URL(route, base), { redirect: "manual" });
  assert.equal(response.status, 200, `${route} must return 200 directly`);
  const html = await response.text();
  pageHtml.set(route, html);
  if (["/privacy-policy", "/terms"].includes(route)) {
    const text = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const updated = text.match(/Last updated:\s*([A-Za-z]+ \d{1,2}, \d{4})/)?.[1];
    assert(updated, `${route} must expose its meaningful update date`);
    assert.equal(sitemapDates.get(route)?.slice(0, 10), new Date(`${updated} UTC`).toISOString().slice(0, 10), `${route} sitemap date must match the published update date`);
  }
  const meta = [...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)"/g)];
  for (const name of ["description", "robots", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    const matches = meta.filter(match => match[1] === name);
    assert(matches.length >= 1 && matches.every(match => match[2].trim()), `${route} needs complete ${name} metadata`);
    if (name !== "og:image" && name !== "twitter:image") assert.equal(matches.length, 1, `${route} must not duplicate ${name}`);
  }
  const ogUrl = meta.find(match => match[1] === "og:url")?.[2];
  assert.equal(new URL(ogUrl).pathname, route, `${route} social URL must match the page`);
  assert.equal(new URL(ogUrl).origin, origin, `${route} social URL must use the production host`);
  if (route === "/download") {
    for (const field of ["title", "description"]) {
      assert.equal(meta.find(match => match[1] === `twitter:${field}`)?.[2], meta.find(match => match[1] === `og:${field}`)?.[2], `Download Twitter ${field} must describe the download page`);
    }
  }
  assert.match(html, /<html[^>]*lang="en"/, `${route} must declare its content language`);
  assert.match(html, /name="viewport" content="[^"]*width=device-width/, `${route} needs a mobile viewport`);
  for (const [label, value, seen] of [
    ["title", html.match(/<title>([^<]+)<\/title>/)?.[1], titles],
    ["description", html.match(/name="description" content="([^"]+)"/)?.[1], descriptions],
  ]) {
    assert(value?.trim(), `${route} needs a non-empty ${label}`);
    if (label === "title") {
      const decoded = value.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:\d+|x[0-9a-f]+);/gi, "_");
      assert(decoded.length < 70, `${route} search title must stay below 70 characters including the brand`);
    }
    assert(!seen.has(value), `${route} duplicates the ${label} on ${seen.get(value)}`);
    seen.set(value, route);
  }
  assert(!/noindex|nosnippet/i.test(response.headers.get("x-robots-tag") ?? ""), `${route} must not receive restrictive indexing headers`);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `${route} needs one main heading`);
  assert(html.includes(`rel="canonical" href="${origin}${route === "/" ? "" : route}"`) || (route === "/" && html.includes(`rel="canonical" href="${origin}/"`)), `${route} canonical must match the sitemap`);
  assert(!/name="robots" content="[^"]*noindex/.test(html), `${route} must be indexable`);
  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
  if (route === "/") {
    const website = schema.find(item => item["@type"] === "WebSite");
    const app = schema.find(item => item["@type"] === "SoftwareApplication");
    const hero = html.match(/<h1\b[^>]*\bid="hero-heading"[^>]*>([\s\S]*?)<\/h1>\s*<p\b[^>]*>([\s\S]*?)<\/p>/);
    assert(hero, "Homepage must render the hero heading and subtitle");
    const headline = htmlText(hero[1]);
    const subtitle = htmlText(hero[2]);
    homepageCopy = { headline, subtitle };
    assert.equal(htmlText(html.match(/<title>([^<]+)<\/title>/)?.[1]), headline, "Homepage title must match the hero");
    for (const name of ["og:title", "twitter:title"]) {
      assert.equal(htmlText(meta.find(match => match[1] === name)?.[2]), headline, `Homepage ${name} must match the hero`);
    }
    for (const name of ["description", "og:description", "twitter:description"]) {
      assert.equal(htmlText(meta.find(match => match[1] === name)?.[2]), subtitle, `Homepage ${name} must match the hero`);
    }
    assert.equal(website?.name, "DreamDuo");
    assert.equal(website.alternateName, "Dream Duo");
    assert.equal(website.description, subtitle, "Site schema must match the hero");
    assert.equal(app?.description, subtitle, "App schema must match the hero");
    assert.match(app.featureList.join(" "), /daily questions.*nudges.*shared goals/i);
    const faq = html.match(/<section\b[^>]*\bid="faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.match(faq ?? "", />What is DreamDuo\?</, "The homepage must answer what the app is in rendered HTML");
    assert.match(faq ?? "", /Once you’ve both replied, you can see both answers/, "Daily-question reveal behavior must be in the visible FAQ");
  }
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
    assert.equal(article.author.name, "MJ Baruah", `${route} must use the requested public author name`);
    assert(!article.author.image, `${route} must not publish the disabled author portrait in its schema`);
    assert(!html.includes('class="editorial-author-portrait"'), `${route} must not retain an empty author-photo slot`);
    assert.equal(article.publisher?.["@id"], `${origin}/#organization`, `${route} needs consistent publisher identity`);
    assert.equal(article["@id"], `${origin}${route}#article`, `${route} needs a stable article identity`);
    assert.equal(article.inLanguage, "en-US", `${route} schema must identify the article language`);
    assert.equal(article.isAccessibleForFree, true, `${route} must describe its freely readable article accurately`);
    if (["/blog/dirty-questions-to-ask-your-partner-over-text", "/blog/30-spicy-questions-to-ask-your-long-distance-partner"].includes(route)) {
      assert.match(html, /name="rating" content="adult"/, "The explicit article needs page-specific adult metadata");
      assert.equal(article.isFamilyFriendly, false, "The explicit article must be classified accurately in its schema");
    } else {
      assert(!meta.some(([ , name, value]) => name === "rating" && value === "adult"), `${route} must not inherit another article's adult rating`);
    }
    if (route.startsWith("/blog/")) assert.equal(article.isPartOf?.["@id"], `${origin}/blog#blog`, `${route} must belong to the canonical blog`);
    // A descriptive slug may be shorter than the headline and should remain
    // stable when the title changes. Canonical, schema and sitemap agree above.
    assert(html.includes(article.headline.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;")), `${route} schema headline must be visible in server HTML`);
    const imageResponse = await fetch(new URL(`${route}/opengraph-image`, base));
    assert.equal(imageResponse.status, 200, `${route} generated social card must render`);
    assert.match(imageResponse.headers.get("content-type") ?? "", /^image\/png/);
    const png = Buffer.from(await imageResponse.arrayBuffer());
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    const socialImage = meta.find(match => match[1] === "og:image")?.[2];
    assert.equal(socialImage, article.image, `${route} schema and social preview must identify the same representative image`);
    const socialAlt = meta.find(match => match[1] === "og:image:alt")?.[2];
    assert(socialAlt?.trim(), `${route} needs descriptive social image alt text`);
    assert.equal(meta.find(match => match[1] === "twitter:image:alt")?.[2], socialAlt, `${route} social image descriptions must agree`);
    if (socialImage !== `${origin}${route}/opengraph-image`) {
      const coverPath = new URL(socialImage).pathname;
      assert(coverPath.startsWith("/blog/") || coverPath.startsWith("/compare/"), `${route} cover must be a local editorial asset`);
      const cover = await fetch(new URL(coverPath, base));
      assert.equal(cover.status, 200, `${route} representative cover must load`);
      assert.match(cover.headers.get("content-type") ?? "", /^image\//);
      assert(html.includes(encodeURIComponent(coverPath)), `${route} representative cover must also appear in the article`);
    }
    images++;
  }
}
const flirtyArticle = pageHtml.get("/blog/flirty-questions-to-ask-your-partner-over-text");
if (flirtyArticle) {
  // Verify the actual HTML lists so the inline CTA cannot hide or reset the prompts.
  const lists = [...flirtyArticle.matchAll(/<ol\b([^>]*)>([\s\S]*?)<\/ol>/g)];
  const questions = lists.filter(([ , , list]) => [...list.matchAll(/<li\b/g)].length === 25);
  assert.equal(questions.length, 2, "The flirty guide must render all 50 questions in HTML");
  assert.match(questions[1][1], /\bstart="26"/, "The question list must resume at 26 after the CTA");
}
for (const route of internal) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `Broken internal link: ${route}`);
  if (!pageHtml.has(route)) pageHtml.set(route, await response.text());
}
for (const { path, hash, from } of fragments) assert(pageHtml.get(path)?.includes(`id="${hash}"`), `Broken section link from ${from} to ${path}#${hash}`);
assert(storeLinks > 0, "Public pages must expose app download links");
const privacy = await fetch(new URL("/privacy", base), { redirect: "manual" });
for (const [previous, current] of Object.entries(blogRedirects)) {
  for (const suffix of ["", "/opengraph-image"]) {
    const response = await fetch(new URL(`/blog/${previous}${suffix}?utm_source=seo-check`, base), { redirect: "manual" });
    assert.equal(response.status, 308, `${previous}${suffix} needs a permanent redirect`);
    const destination = new URL(response.headers.get("location"), base);
    assert.equal(destination.pathname, `/blog/${current}${suffix}`, `${previous} must redirect directly to its matching article`);
    assert.equal(destination.searchParams.get("utm_source"), "seo-check", `${previous} must preserve query parameters`);
  }
  assert(!routes.includes(`/blog/${previous}`), `${previous} must not remain in the sitemap`);
  assert(routes.includes(`/blog/${current}`), `${current} must be discoverable in the sitemap`);
}
assert.equal(privacy.status, 308, "Legacy privacy URL needs a permanent redirect");
assert.equal(new URL(privacy.headers.get("location"), base).pathname, "/privacy-policy");
for (const route of ["/blog/missing-seo-check", "/compare/missing-seo-check", "/blog/tag/missing-seo-check"]) assert.equal((await fetch(new URL(route, base))).status, 404, `${route} must remain a real 404`);
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//i);
assert.match(robots, /Sitemap: https:\/\/dreamduo.app\/sitemap.xml/i);
const feed = await fetch(new URL("/blog/rss.xml", base));
assert.equal(feed.status, 200);
const feedText = await feed.text();
assert.match(feedText, /<rss version="2.0"/);
const directory = await fetch(new URL("/llms.txt", base));
assert.equal(directory.status, 200, "Optional text directory must load without JavaScript");
assert.match(directory.headers.get("content-type") ?? "", /text\/plain/);
const directoryText = await directory.text();
assert(homepageCopy, "Homepage copy must be present in the audit");
assert(directoryText.includes(homepageCopy.headline) && directoryText.includes(homepageCopy.subtitle), "Optional text directory must match the hero");
const manifest = await (await fetch(new URL("/manifest.webmanifest", base))).json();
assert.equal(manifest.description, homepageCopy.subtitle, "Manifest must match the hero");
const homepagePreview = await fetch(new URL("/opengraph-image", base));
assert.equal(homepagePreview.status, 200, "Homepage social preview must load");
assert.match(homepagePreview.headers.get("content-type") ?? "", /^image\/png/, "Homepage needs a PNG social preview");
const homepagePreviewBytes = Buffer.from(await homepagePreview.arrayBuffer());
assert.equal(homepagePreviewBytes.readUInt32BE(16), 1200, "Homepage social preview width");
assert.equal(homepagePreviewBytes.readUInt32BE(20), 630, "Homepage social preview height");
for (const route of articlePages.filter(route => route.startsWith("/blog/"))) {
  assert(directoryText.includes(`${origin}${route}`), `${route} must be discoverable in the text directory`);
  assert(feedText.includes(`${origin}${route}`), `${route} must be discoverable in RSS`);
  assert(pageHtml.get("/blog").includes(`href="${route}"`), `${route} must have a crawlable link from the blog index`);
}
// Interactive tools must also expose their complete useful content to readers
// and crawlers that do not execute JavaScript, rather than only a picker shell.
for (const [file, route, field] of [
  ["texting-questions.json", "/blog/dirty-questions-to-ask-your-partner-over-text", "questions"],
  ["daily-question-calendar.json", "/blog/30-daily-questions-for-long-distance-couples-when-you-run-out-of-things-to-say", "prompts"],
]) {
  const groups = JSON.parse(await fs.readFile(new URL(`../src/content/assets/${file}`, import.meta.url), "utf8"));
  for (const text of (file === "texting-questions.json" ? groups : groups.flatMap(group => group[field]))) {
    const escaped = text.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    assert(pageHtml.get(route).includes(escaped), `${route} must server-render question: ${text}`);
  }
}
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
const downloads = (await fs.readdir(new URL("../public/downloads/", import.meta.url))).filter(name => name.endsWith(".html"));
for (const name of downloads) {
  const response = await fetch(new URL(`/downloads/${name}`, base));
  assert.equal(response.status, 200, `${name} printable download must work`);
  const html = await response.text();
  pageHtml.set(`/downloads/${name}`, html);
  assert.match(html, /name="description" content="[^"]+"/, `${name} needs a description`);
  assert.match(html, /name="robots" content="noindex,follow"/, `${name} must retain its printable-only indexing policy`);
}
// Optionally replay the exact URLs (including tracking parameters) from a
// Bing issue export against this build. CSV contents are data, not commands.
let reportedUrls = 0;
if (process.argv[3]) {
  const csv = await fs.readFile(process.argv[3], "utf8");
  const urls = [...csv.matchAll(/^"(https?:\/\/[^"\r\n]+)"/gm)].map(match => new URL(match[1]));
  assert(urls.length > 0, "Issue CSV must contain affected page URLs");
  for (const url of urls) {
    assert.equal(url.origin, origin, "Issue URLs must belong to the canonical website");
    const route = url.pathname + url.search;
    const response = await fetch(new URL(route, base), { redirect: "manual" });
    assert.equal(response.status, 200, `Reported page must load: ${route}`);
    pageHtml.set(route, await response.text());
    reportedUrls++;
  }
}
let auditedHtml = 0;
let auditedImages = 0;
for (const [route, html] of pageHtml) {
  if (!/<html(?:\s|>)/i.test(html)) continue;
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, `${route} needs an explicit document head`);
  assert.match(head, /<meta\b[^>]*name="description"[^>]*content="[^"]+"/i, `${route} needs its description inside the head`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/gi)].length, 1, `${route} needs exactly one H1, including multi-page printables`);
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    assert.match(tag, /\balt="[^"]+"/i, `${route} image needs a descriptive alt: ${tag.slice(0, 150)}`);
    auditedImages++;
  }
  auditedHtml++;
}
console.log(`Bing issue checks passed: ${auditedHtml} HTML documents, ${auditedImages} images, ${reportedUrls} reported URLs; no missing descriptions, missing/empty image alts or repeated H1s.`);
console.log(`Crawler checks passed: ${agents.length} user agents across ${articlePages.length} articles, without executing JavaScript.`);
console.log(`Metadata and conversion checks passed: unique titles/descriptions, ${fragments.length} section links and ${storeLinks} correctly targeted app-store links.`);
console.log(`SEO checks passed: ${routes.length} sitemap pages, ${internal.size} internal destinations, ${images} generated social cards, privacy redirect, real 404s, robots and RSS.`);
