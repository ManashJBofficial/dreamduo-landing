import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { run, sitemapUrls } from "./indexnow.mjs";

const key = "b406e59e5a7946f49909c2530185b868";
const sitemap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://dreamduo.app/</loc></url><url><loc>https://dreamduo.app/blog</loc></url></urlset>';

test("only nonempty canonical DreamDuo sitemaps are accepted", () => {
  assert.deepEqual(sitemapUrls(sitemap), ["https://dreamduo.app/", "https://dreamduo.app/blog"]);
  for (const xml of ["<html>Error</html>", "<urlset></urlset>", sitemap.replace("https://dreamduo.app/", "https://other.example/"), sitemap.replace("https://dreamduo.app/blog", "https://dreamduo.app/blog?preview=1")]) {
    assert.throws(() => sitemapUrls(xml));
  }
});

test("dry run performs no POST or state write", async () => {
  const calls = [];
  await run({ fetcher: async (url, options) => {
    calls.push({ url, options });
    return new Response(sitemap);
  } });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://dreamduo.app/sitemap.xml");
  assert.equal(calls[0].options.method, undefined);
});

test("verification gates submission; successful notification includes removed URLs", async () => {
  const dir = await mkdtemp(join(tmpdir(), "dreamduo-indexnow-"));
  const stateFile = join(dir, "state.json");
  const previous = JSON.stringify({ urls: ["https://dreamduo.app/old-article"] });
  await writeFile(stateFile, previous);
  try {
    let posts = 0;
    const badKey = async (url, options) => {
      if (options.method === "POST") posts++;
      return new Response(url.endsWith("sitemap.xml") ? sitemap : "wrong-key");
    };
    await assert.rejects(run({ dryRun: false, stateFile, fetcher: badKey }), /verification file/);
    assert.equal(posts, 0);
    assert.equal(await readFile(stateFile, "utf8"), previous);
    for (const status of [403, 429, 500, 202, 200]) {
      await writeFile(stateFile, previous);
      let sent;
      const fetcher = async (url, options) => {
        if (url.endsWith("sitemap.xml")) return new Response(sitemap);
        if (url.endsWith(`${key}.txt`)) return new Response(key);
        assert.equal(url, "https://api.indexnow.org/indexnow");
        assert.equal(options.method, "POST");
        sent = JSON.parse(options.body);
        return new Response("", { status });
      };
      if (status >= 400) {
        await assert.rejects(run({ dryRun: false, stateFile, fetcher }), new RegExp(`HTTP ${status}`));
        assert.equal(await readFile(stateFile, "utf8"), previous);
      } else {
        await run({ dryRun: false, stateFile, fetcher });
        assert.equal(sent.host, "dreamduo.app");
        assert.equal(sent.keyLocation, `https://dreamduo.app/${key}.txt`);
        assert.deepEqual(sent.urlList, ["https://dreamduo.app/", "https://dreamduo.app/blog", "https://dreamduo.app/old-article"]);
        assert.deepEqual(JSON.parse(await readFile(stateFile, "utf8")).urls, sitemapUrls(sitemap));
      }
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
