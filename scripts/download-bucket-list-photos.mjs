import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "src/content/assets/couples-bucket-list-photos.json"), "utf8"));
const destination = path.join(root, "public/blog/couples-bucket-list");
await fs.mkdir(destination, { recursive: true });
const selected = process.argv.slice(2);
const pending = Object.entries(manifest).filter(([id]) => selected.length === 0 || selected.includes(id)).map(([, photo]) => photo);
const count = pending.length;
let bytes = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (pending.length) {
    const photo = pending.shift();
    if (!/^\d{2}-[a-z-]+\.webp$/.test(photo.file) || !/^\d+$/.test(photo.photoId)) throw new Error("Invalid photo manifest entry");
    const target = path.join(destination, photo.file);
    const temporary = `${target}.download.jpg`;
    await run(process.platform === "win32" ? "curl.exe" : "curl", ["--fail", "--location", "--silent", "--show-error", "--retry", "2", "--max-time", "45", `https://images.pexels.com/photos/${photo.photoId}/pexels-photo-${photo.photoId}.jpeg?auto=compress&cs=tinysrgb&w=1400`, "--output", temporary]);
    await sharp(temporary).rotate().resize(1200, 750, { fit: "cover", position: photo.crop ?? "attention" }).webp({ quality: 78 }).toFile(target);
    await fs.unlink(temporary);
    bytes += (await fs.stat(target)).size;
    console.log(photo.file);
  }
}));
console.log(`Saved ${count} local WebP photos (${(bytes / 1024 / 1024).toFixed(2)} MB total).`);
