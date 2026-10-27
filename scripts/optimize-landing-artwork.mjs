import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(import.meta.dirname, "../public");
const output = path.join(publicDir, "optimized");
await fs.mkdir(output, { recursive: true });

// Keep the supplied SVGs as editable sources. Render their embedded WebP layers
// as PNG in memory because librsvg cannot decode WebP inside an SVG reliably.
for (const [input, name] of [["dreamduo-hero.svg", "hero"], ["download-banner.svg", "download"]]) {
  let svg = await fs.readFile(path.join(publicDir, input), "utf8");
  const embedded = [...new Set(svg.match(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g))];
  for (const uri of embedded) {
    const png = await sharp(Buffer.from(uri.split(",")[1], "base64")).png().toBuffer();
    svg = svg.replaceAll(uri, `data:image/png;base64,${png.toString("base64")}`);
  }
  const source = Buffer.from(svg);
  for (const width of [400, 480, 640, 960, 1280]) {
    for (const format of ["avif", "webp"]) {
      const pipeline = sharp(source).resize({ width });
      const buffer = await (format === "avif"
        ? pipeline.avif({ quality: width <= 640 ? 45 : 50, effort: 7, chromaSubsampling: "4:4:4" })
        : pipeline.webp({ quality: 82, effort: 6 })).toBuffer();
      const file = `${name}-${width}.${format}`;
      await fs.writeFile(path.join(output, file), buffer);
      console.log(file, buffer.length);
    }
  }
}

// The navbar displays this mark at 28-56 CSS px, not its original 256 px.
await sharp(path.join(publicDir, "dreamduo-mark.webp"))
  .resize({ width: 112 }).webp({ quality: 85, effort: 6 })
  .toFile(path.join(output, "brand-mark.webp"));

for (const [id, file] of [
  ["dreams", "dreamduo-dreams-phone.webp"],
  ["milestones", "dreamduo-milestones-phone.webp"],
  ["nudges", "dreamduo-nudge-hub.webp"],
  ["conversations", "dreamduo-daily-conversations.webp"],
  ["files", "dreamduo-files-phone.webp"],
]) {
  await sharp(path.join(publicDir, file))
    .resize({ height: 800, withoutEnlargement: true })
    .avif({ quality: 48, effort: 7, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, `feature-${id}.avif`));
}
