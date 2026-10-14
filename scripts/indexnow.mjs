import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://dreamduo.app";
const KEY = "b406e59e5a7946f49909c2530185b868";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

export function sitemapUrls(xml) {
  if (!/<urlset\b/.test(xml) || !/<\/urlset>/.test(xml)) {
    throw new Error("Expected a sitemap urlset; refusing an empty or invalid sitemap.");
  }
  const urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) => {
    const value = match[1].trim().replace(/&amp;/g, "&");
    const url = new URL(value);
    if (url.origin !== SITE || url.username || url.password || url.hash || url.search) {
      throw new Error(`Refusing noncanonical sitemap URL: ${value}`);
    }
    return url.href;
  });
  if (!urls.length) throw new Error("The sitemap contains no URLs.");
  return [...new Set(urls)];
}

async function getText(url, fetcher) {
  const response = await fetcher(url, {
    redirect: "error",
    signal: AbortSignal.timeout(30000),
    headers: { "User-Agent": "DreamDuo-IndexNow/1.0" },
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

export async function run({ dryRun = true, sitemapFile, stateFile, fetcher = fetch } = {}) {
  const xml = sitemapFile ? await readFile(sitemapFile, "utf8") : await getText(`${SITE}/sitemap.xml`, fetcher);
  const current = sitemapUrls(xml);
  let previous = [];
  if (stateFile) {
    try {
      const state = JSON.parse(await readFile(stateFile, "utf8"));
      if (!Array.isArray(state.urls)) throw new Error("Invalid IndexNow state.");
      previous = state.urls.map((value) => {
        const url = new URL(value);
        if (url.origin !== SITE || url.username || url.password || url.search || url.hash) {
          throw new Error("Invalid URL in IndexNow state.");
        }
        return url.href;
      });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  const removed = previous.filter((url) => !current.includes(url));
  const urlList = [...new Set([...current, ...removed])];
  const payload = { host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList };
  if (dryRun) {
    console.log(`Dry run: ${current.length} current pages, ${removed.length} removed pages. No URLs submitted.`);
    console.log(JSON.stringify(payload, null, 2));
    return payload;
  }
  if (sitemapFile) throw new Error("Submission must read the live production sitemap, not a local file.");
  if ((await getText(KEY_LOCATION, fetcher)).trim() !== KEY) {
    throw new Error("The production verification file does not contain the expected IndexNow key.");
  }
  for (let offset = 0; offset < urlList.length; offset += 10000) {
    const response = await fetcher(ENDPOINT, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(30000),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ ...payload, urlList: urlList.slice(offset, offset + 10000) }),
    });
    if (response.status !== 200 && response.status !== 202) {
      const hint = { 403: "Check the public verification file.", 422: "Check the submitted host and URLs.", 429: "Rate limited: wait before retrying." }[response.status] ?? "Check the IndexNow response.";
      throw new Error(`IndexNow returned HTTP ${response.status}. ${hint} ${(await response.text()).slice(0, 300)}`);
    }
    console.log(`IndexNow HTTP ${response.status}: ${response.status === 202 ? "received; key validation pending" : "received"}. This does not guarantee indexing.`);
  }
  if (stateFile) {
    await mkdir(dirname(stateFile), { recursive: true });
    await writeFile(stateFile, JSON.stringify({ urls: current }, null, 2) + "\n");
  }
  console.log(`Notified IndexNow about ${current.length} current pages and ${removed.length} removed pages.`);
  return payload;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const options = { dryRun: !args.includes("--submit") };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--submit" || args[i] === "--dry-run") continue;
    const name = { "--sitemap-file": "sitemapFile", "--state-file": "stateFile" }[args[i]];
    if (!name || !args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`Invalid argument: ${args[i]}`);
    options[name] = args[++i];
  }
  if (args.includes("--submit") && args.includes("--dry-run")) throw new Error("Choose either --submit or --dry-run.");
  run(options).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
