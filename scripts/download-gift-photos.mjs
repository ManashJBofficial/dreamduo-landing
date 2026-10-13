import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/care-package-photos.json"), "utf8"));
const destination = path.join(root, "public/blog/long-distance-care-package-ideas");
const selected = new Set(process.argv.slice(2));
await fs.mkdir(destination, { recursive: true });
for (const [id, photo] of Object.entries(manifest)) {
  if (photo.kind !== "photo" || (selected.size > 0 && !selected.has(id))) continue;
  if (!/^gift-\d{2}-[a-z-]+\.webp$/.test(photo.file)) throw new Error("Invalid gift photo filename");
  if (!photo.downloadUrl && !/^\d+$/.test(photo.photoId)) throw new Error("Missing gift photo source");
  const downloadUrl = new URL(photo.downloadUrl ?? `https://images.pexels.com/photos/${photo.photoId}/pexels-photo-${photo.photoId}.jpeg?auto=compress&cs=tinysrgb&w=1600`);
  if (downloadUrl.protocol !== "https:" || !["images.pexels.com", "images.unsplash.com"].includes(downloadUrl.hostname)) throw new Error("Invalid gift photo source");
  const target = path.join(destination, photo.file);
  const temporary = `${target}.download.jpg`;
  const response = await fetch(downloadUrl, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Could not download ${id}: HTTP ${response.status}`);
  await fs.writeFile(temporary, Buffer.from(await response.arrayBuffer()));
  let image = sharp(temporary);
  if (photo.extract) image = image.extract(photo.extract);
  await image.rotate(photo.rotation).resize(1200, 750, { fit: "cover", position: photo.crop ?? "attention" }).webp({ quality: 82 }).toFile(target);
  await fs.unlink(temporary);
  console.log(id);
}
