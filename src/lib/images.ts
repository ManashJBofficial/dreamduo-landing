import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Local image helpers for posts and comparison pages. Every image for an
 * article lives in one folder named after its .mdx file:
 *
 *   public/blog/<slug>/cover.webp     hero image, picked up automatically
 *   public/blog/<slug>/anything.webp  used inline as ![alt](anything.webp)
 *
 * (Comparison pages use public/compare/<slug>/ the same way.)
 *
 * Every mistake here throws, which fails the build. A broken image in a
 * published post is worse than a build that tells you why it stopped.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Formats a cover may be saved in, checked in this order. */
export const COVER_EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png"] as const;

/**
 * Whether a /public path exists with exactly this capitalisation.
 *
 * fs.existsSync is not enough on Windows, which treats Cover.PNG and cover.png
 * as the same file. Vercel builds on Linux, where they are different files, so
 * an image that works locally would 404 in production. Checking each path
 * segment against the real directory listing makes Windows as strict as prod.
 */
function existsExactCase(publicPath: string): boolean {
  let dir = PUBLIC_DIR;
  for (const part of publicPath.split("/").filter(Boolean)) {
    if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(part)) return false;
    dir = path.join(dir, part);
  }
  return true;
}

/** Real dimensions of an image in /public, read at build time for next/image. */
export function getLocalImageSize(src: string): { width: number; height: number } {
  if (!src.startsWith("/")) {
    throw new Error(
      `Image "${src}" must be saved in this site's public folder. ` +
        `Download it into the post's folder (public/blog/<post-slug>/) instead of linking to another site: ` +
        `hotlinked images break when the other site moves them, and next/image refuses unknown hosts anyway.`
    );
  }

  const file = path.join(PUBLIC_DIR, src);
  if (!fs.existsSync(file)) {
    throw new Error(`Image not found: ${src}. Expected the file at public${src}.`);
  }
  if (!existsExactCase(src)) {
    throw new Error(
      `Image ${src} exists, but with different capital letters in its name or folder. ` +
        `Rename it to match exactly (all lowercase is safest). It would load on Windows ` +
        `but 404 once deployed, because Vercel treats different capitalisation as a different file.`
    );
  }

  const { width, height } = imageSize(fs.readFileSync(file));
  if (!width || !height) {
    throw new Error(`Could not read the dimensions of ${src}. Is it a valid image file?`);
  }

  return { width, height };
}

/**
 * The cover for an article, found by convention: public/<collection>/<slug>/cover.<ext>.
 * Returns undefined when there is none, and throws on a near miss like
 * Cover.PNG, which would otherwise be silently ignored.
 */
export function findCover(collection: string, slug: string): string | undefined {
  const folder = path.join(PUBLIC_DIR, collection, slug);
  if (!fs.existsSync(folder)) return undefined;

  if (!existsExactCase(`/${collection}/${slug}`)) {
    throw new Error(
      `The image folder for "${slug}" has different capital letters from the post's filename. ` +
        `Rename the folder to exactly public/${collection}/${slug}/ so it matches ${slug}.mdx.`
    );
  }

  const files = fs.readdirSync(folder);
  const cover = COVER_EXTENSIONS.map((ext) => `cover.${ext}`).find((name) => files.includes(name));
  if (cover) return `/${collection}/${slug}/${cover}`;

  const nearMiss = files.find((f) => /^cover\.[a-z0-9]+$/i.test(f));
  if (nearMiss) {
    throw new Error(
      `public/${collection}/${slug}/${nearMiss} looks like a cover image, but it needs to be named ` +
        `exactly cover.webp (or .avif, .jpg, .jpeg, .png), all lowercase.`
    );
  }

  return undefined;
}
