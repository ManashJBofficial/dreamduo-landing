import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/relationship-guide-photos.json"), "utf8"));
// Optional previously downloaded originals avoid another network request.
const source = process.argv[2];
for (const photo of manifest) {
  if (!/^\d+$/.test(photo.photoId) || !/^[a-z0-9-]+$/.test(photo.slug) || !/^[a-z-]+\.webp$/.test(photo.file)) throw Error("Invalid stock-photo manifest");
  let bytes;
  if (source) bytes = await fs.readFile(path.join(source, `${photo.photoId}.jpg`));
  else {
    const response = await fetch(`https://images.pexels.com/photos/${photo.photoId}/pexels-photo-${photo.photoId}.jpeg?auto=compress&cs=tinysrgb&w=1600`, { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw Error(`Photo ${photo.photoId}: HTTP ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
  }
  const directory = path.join(root, "public/blog", photo.slug);
  await fs.mkdir(directory, { recursive: true });
  const target = path.join(directory, photo.file);
  let image = sharp(bytes).rotate();
  if (photo.extract) image = image.extract(photo.extract);
  await image.resize(1600, 900, { fit: "cover", position: photo.crop ?? "centre" }).webp({ quality: 78, effort: 6 }).toFile(target);
  console.log(`${photo.file}: ${(await fs.stat(target)).size} bytes`);
}
