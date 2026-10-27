import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");

function environment({ blockedStorage = false, brokenAnalytics = false } = {}) {
  const values = new Map();
  const events = [];
  const window = Object.assign(new EventTarget(), {
    location: { search: "", hostname: "dreamduo.app" },
    gtag: (...args) => { if (brokenAnalytics) throw Error("blocked"); events.push(["ga4", ...args]); },
  });
  const sessionStorage = {
    getItem: (key) => { if (blockedStorage) throw Error("blocked"); return values.get(key) ?? null; },
    setItem: (key, value) => { if (blockedStorage) throw Error("blocked"); values.set(key, value); },
  };
  const cache = new Map();
  function load(relative) {
    const filename = path.join(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule.exports);
    const localRequire = (name) => {
      if (name === "@vercel/analytics") return { track: (...args) => {
        if (brokenAnalytics) throw Error("blocked"); events.push(["vercel", ...args]);
      } };
      if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`);
      return require(name);
    };
    const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    vm.runInNewContext(source, {
      exports: loadedModule.exports, module: loadedModule, require: localRequire, window, sessionStorage,
      document: { referrer: "https://www.instagram.com/" }, URL, URLSearchParams, Event,
      process: { env: {} },
    }, { filename });
    return loadedModule.exports;
  }
  return { window, events, load };
}

test("campaign survives untagged internal navigation; new tagged arrivals replace it", () => {
  const { window, load } = environment();
  const attribution = load("src/lib/campaign-attribution.ts");
  window.location.search = "?utm_source=instagram&utm_medium=bio&utm_campaign=reels&utm_content=one";
  attribution.captureCampaign();
  window.location.search = "";
  attribution.captureCampaign();
  assert.equal(attribution.currentCampaign().utm_source, "instagram");
  assert.equal(attribution.currentCampaign().utm_content, "one");
  assert.equal(attribution.acquisitionReferrer(), "www.instagram.com");
  window.location.search = "?utm_source=reddit&utm_campaign=couples";
  attribution.captureCampaign();
  assert.equal(attribution.currentCampaign().utm_source, "reddit");
  assert.equal(attribution.currentCampaign().utm_content, undefined);
});

test("blocked session storage retains attribution in memory", () => {
  const { window, load } = environment({ blockedStorage: true });
  const attribution = load("src/lib/campaign-attribution.ts");
  window.location.search = "?utm_source=instagram";
  attribution.captureCampaign();
  window.location.search = "";
  assert.equal(attribution.currentCampaign().utm_source, "instagram");
});

test("Play, Apple and QR preserve external campaign instead of placement", () => {
  const { load } = environment();
  const links = load("src/lib/download-links.ts");
  const campaign = links.readCampaign(new URLSearchParams("utm_source=instagram&utm_medium=bio&utm_campaign=reels&utm_content=one%26two&utm_term=couples"));
  const play = new URL(links.getDownloadStoreUrl("android", campaign));
  const referrer = new URLSearchParams(play.searchParams.get("referrer"));
  assert.equal(play.searchParams.get("id"), "com.dreamduo.app");
  for (const [key, value] of Object.entries(campaign)) assert.equal(referrer.get(key), value);
  const apple = new URL(links.getDownloadStoreUrl("ios", campaign));
  assert.ok(apple.pathname.endsWith("id6807477523"));
  assert.equal(apple.searchParams.get("ct"), "instagram_reels_one_two");
  const qr = new URL(links.getDownloadQrUrl(campaign));
  assert.equal(qr.searchParams.get("via"), "qr");
  for (const [key, value] of Object.entries(campaign)) assert.equal(qr.searchParams.get(key), value);
});

test("untagged defaults, input bounds and platform routing remain safe", () => {
  const { load } = environment();
  const links = load("src/lib/download-links.ts");
  const play = new URL(links.getDownloadStoreUrl("android", {}));
  assert.equal(new URLSearchParams(play.searchParams.get("referrer")).get("utm_source"), "dreamduo_landing");
  const campaign = links.readCampaign(new URLSearchParams({ utm_source: "x".repeat(200), redirect: "https://example.com" }));
  assert.equal(campaign.utm_source.length, 100);
  assert.equal(campaign.redirect, undefined);
  assert.ok(new URL(links.getDownloadStoreUrl("ios", campaign)).searchParams.get("ct").length <= 40);
  assert.equal(links.detectDownloadPlatform("iPhone"), "ios");
  assert.equal(links.detectDownloadPlatform("Android Mobile"), "android");
  assert.equal(links.detectDownloadPlatform("Windows"), "desktop");
});

test("store clicks reach both analytics sinks with campaign and separate placement", () => {
  const { window, events, load } = environment();
  window.location.search = "?utm_source=instagram&utm_campaign=reels";
  const analytics = load("src/lib/download-analytics.ts");
  analytics.trackDownload("download_store_click", { utm_source: "dreamduo_landing" }, { placement: "hero", store: "google_play" });
  assert.equal(events.length, 2);
  const vercel = events.find(([sink]) => sink === "vercel");
  assert.equal(vercel[1], "download_store_click");
  assert.equal(vercel[2].utm_source, "instagram");
  assert.equal(vercel[2].utm_campaign, "reels");
  assert.equal(vercel[2].placement, "hero");
  const ga = events.find(([sink]) => sink === "ga4");
  assert.equal(ga[2], "download_store_click");
  assert.equal(ga[3].transport_type, "beacon");
});

test("analytics blocking never throws into store navigation", () => {
  const { load } = environment({ brokenAnalytics: true });
  assert.doesNotThrow(() => load("src/lib/download-analytics.ts").trackDownload("download_store_click", {}));
});
