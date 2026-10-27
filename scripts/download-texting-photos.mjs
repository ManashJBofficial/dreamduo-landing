import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/texting-questions-photos.json"), "utf8"));
const directory = path.join(root, "public/blog/dirty-questions-to-ask-your-partner-over-text");
await fs.mkdir(directory, { recursive: true });
for (const photo of Object.values(manifest)) {
  if (!/^\d+$/.test(photo.photoId) || !/^[a-z-]+\.webp$/.test(photo.file)) throw Error("Invalid photo manifest");
  const response = await fetch(`https://images.pexels.com/photos/${photo.photoId}/pexels-photo-${photo.photoId}.jpeg?auto=compress&cs=tinysrgb&w=2000`, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw Error(`Photo ${photo.photoId}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const output = path.join(directory, photo.file);
  let image = sharp(bytes).rotate();
  if (photo.extract) image = image.extract(photo.extract);
  await image.resize(photo.width, photo.height, { fit: "cover", position: photo.crop ?? "attention" }).webp({ quality: 78, effort: 6 }).toFile(output);
  console.log(`${photo.file}: ${(await fs.stat(output)).size} bytes`);
}
