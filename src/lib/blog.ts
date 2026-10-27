import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { findCover, getLocalImageSize } from "@/lib/images";
import BLOG_SLUG_REDIRECTS from "@/content/blog-slug-redirects.json";

/**
 * File-backed content. Blog posts live in src/content/blog and comparison
 * pages in src/content/compare, both as .mdx, read at build time only. Every
 * page that uses this is statically generated, so none of it touches a
 * request. No database, no CMS API, nothing to keep running.
 */

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

type Collection = "blog" | "compare";

export interface PostFrontmatter {
  title: string;
  /** Optional search/social title; the visible H1 and schema headline remain the article title. */
  seoTitle?: string;
  /** Short, factual cover copy. Omitted headlines fall back to the actual article title. */
  coverHeadline?: string;
  coverSubtitle?: string;
  /** Meta description and the excerpt shown on the index. Keep under ~155 chars. */
  description: string;
  /** ISO date (YYYY-MM-DD). Drives ordering and the article schema. */
  date: string;
  /** ISO date of the last meaningful edit, shared by metadata and discovery feeds. */
  updated?: string;
  /** Lowercase, hyphenated. Each one becomes a /blog/tag/<tag> hub page. */
  tags?: string[];
  author?: string;
  /** Limit long articles' navigation to section headings while retaining detailed body headings. */
  tocDepth?: 2 | 3;
  /**
   * Optional cover override. Without an image, abstract artwork is automatic.
   * For an override, save the file as
   * public/<collection>/<slug>/cover.webp and it is found automatically. Set
   * this only to point at a different file. 1200x630 suits both the hero and
   * the preview shown when the link is shared.
   */
  image?: string;
  /** Describes the cover for screen readers and Google. Defaults to the title. */
  imageAlt?: string;
  /** Page-specific explicit-content classification; never applied site-wide. */
  adult?: boolean;
  /**
   * Comparison pages only: the other app's name, e.g. "Paired". Drives the
   * "DreamDuo vs. Paired" link text in the footer and on /compare.
   */
  competitor?: string;
  /** Previewable in development; returns 404 and is excluded from production discovery. */
  draft?: boolean;
  /** Retained at its original URL and in tag hubs, but retired from the main listing and RSS. */
  archived?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
  /** This entry's image folder under /public, e.g. /blog/<slug>. */
  assetBase: string;
}

export type PostSummary = Omit<Post, "content">;

/** ~220wpm is the usual reading-speed assumption for this kind of prose. */
function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function parseFile(collection: Collection, fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  // Existing image URLs remain stable when an article receives a longer URL.
  const assetSlug = collection === "blog" ? Object.entries(BLOG_SLUG_REDIRECTS).find(([, current]) => current === slug)?.[0] ?? slug : slug;
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, collection, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
    throw new Error(
      `${collection}/${fileName}: frontmatter needs title, description and date. ` +
        `Missing fields break the page metadata and the sitemap, so this fails the build rather than shipping silently.`
    );
  }

  // A cover set in frontmatter wins; otherwise drop cover.webp into
  // public/<collection>/<slug>/ and it is found with no frontmatter at all.
  // Checked here rather than at render so a typo fails the build immediately,
  // with the filename that caused it.
  const image = frontmatter.image ?? findCover(collection, assetSlug);
  if (image) getLocalImageSize(image);

  return {
    ...frontmatter,
    image,
    slug,
    assetBase: `/${collection}/${assetSlug}`,
    content,
    readingMinutes: readingMinutes(content),
  };
}

function readCollection(collection: Collection): Post[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => parseFile(collection, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Drafts are visible in `next dev` for previewing, and dropped from production builds. */
function published(entries: Post[]): PostSummary[] {
  const includeDrafts = process.env.NODE_ENV === "development";

  return entries
    .filter((entry) => includeDrafts || !entry.draft)
    .map((entry) => {
      const summary = { ...entry } as Partial<Post>;
      delete summary.content;
      return summary as PostSummary;
    });
}

/** Published posts, newest first. */
export function getPosts(): PostSummary[] {
  return getPublicPosts().filter((post) => !post.archived);
}

/** All accessible published posts, including older guides kept for existing links. */
export function getPublicPosts(): PostSummary[] {
  return published(readCollection("blog"));
}

export function getPost(slug: string): Post | null {
  return readCollection("blog").find((post) => post.slug === slug && (process.env.NODE_ENV === "development" || !post.draft)) ?? null;
}

/** Published comparison pages, alphabetical by competitor for a stable footer. */
export function getComparisons(): PostSummary[] {
  return published(readCollection("compare")).sort((a, b) =>
    (a.competitor ?? a.title).localeCompare(b.competitor ?? b.title)
  );
}

export function getComparison(slug: string): Post | null {
  return readCollection("compare").find((entry) => entry.slug === slug && (process.env.NODE_ENV === "development" || !entry.draft)) ?? null;
}

/**
 * Heading ids. Shared by the MDX heading components and the table of contents,
 * so a TOC link always lands on the heading it names. Any change here changes
 * both at once, which is the point.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * H2/H3 headings from raw markdown, for the table of contents. Skips fenced
 * code blocks, where a line starting with "#" is a comment, not a heading, and
 * strips inline markdown so the text matches what the reader sees.
 */
export function getHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [label](url) -> label
      .replace(/[*_`]/g, "");

    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }

  return headings;
}

/** Every tag in use, with counts, for the index and the tag hub pages. */
export function getTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of getPublicPosts()) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostSummary[] {
  return getPublicPosts().filter((post) => post.tags?.includes(tag));
}

/**
 * Posts to surface at the foot of an article. Prefers shared tags, then falls
 * back to recency, so a new post with an unused tag still links somewhere —
 * every article should pass link equity on rather than dead-ending.
 */
export function getRelatedPosts(slug: string, limit = 3): PostSummary[] {
  const current = getPost(slug);
  if (!current) return [];

  const others = getPosts().filter((post) => post.slug !== slug);
  const sharedTagCount = (post: PostSummary) =>
    post.tags?.filter((t) => current.tags?.includes(t)).length ?? 0;

  return others
    .sort((a, b) => sharedTagCount(b) - sharedTagCount(a) || (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
