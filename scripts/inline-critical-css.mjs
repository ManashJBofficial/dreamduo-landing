import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Beasties from "beasties";

const buildDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.next");
const appDir = path.join(buildDir, "server/app");
const marker = "<!-- landing-critical-css -->";

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(filename));
    else if (entry.name.endsWith(".html")) files.push(filename);
  }
  return files;
}

const optimizer = new Beasties({
  path: buildDir,
  publicPath: "/_next/",
  preload: "media",
  noscriptFallback: true,
  inlineFonts: true,
  preloadFonts: false, // Next already preloads the two local fonts.
  pruneSource: false, // Preserve full CSS for interactive states and navigation.
  reduceInlineStyles: false,
  mergeStylesheets: true,
  allowRules: [/\[data-open=/, /\[data-qr-device=/],
  logLevel: "warn",
});

const selected = process.argv.slice(2);
const files = selected.length
  ? selected.map(filename => path.join(appDir, filename))
  : await htmlFiles(appDir);
let count = 0;
for (const filename of files) {
  const original = await fs.readFile(filename, "utf8");
  if (original.includes(marker)) continue;
  const optimized = (await optimizer.process(original))
    .replace(/\sdata-beasties-container(?:="")?/, "")
    .replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g, (_, start, css, end) => {
      // Next's CSS is under /_next/static/chunks/. Its relative font URLs must
      // remain rooted there when the declarations move into an HTML document.
      const rebased = css.replace(/url\(\s*(["']?)(\.\.?\/[^)"']+)\1\s*\)/g, (match, quote, value) => {
        const url = new URL(value, "https://next-assets.invalid/_next/static/chunks/");
        return `url(${quote}${url.pathname}${url.search}${url.hash}${quote})`;
      });
      return `${start}${rebased}${end}`;
    });
  await fs.writeFile(filename, optimized.replace("</head>", `${marker}</head>`));
  count++;
}
console.log(`Inlined critical CSS for ${count} static pages; full stylesheets retained.`);
