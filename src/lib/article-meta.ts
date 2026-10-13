import type { Metadata } from "next";
import type { Post } from "@/lib/blog";
import type { Crumb } from "@/components/article-layout";
import { getAuthor } from "@/lib/authors";
import { getLocalImageSize } from "@/lib/images";

/**
 * Metadata and structured data shared by blog posts and comparison pages, so
 * the two stay identical in shape and a fix to one is a fix to both.
 */

export const SITE_URL = "https://dreamduo.app";

/** The entry's own cover when it has one, else its generated abstract preview card. */
export function previewImage(entry: Post) {
  if (!entry.image) {
    return { url: `${entry.assetBase}/opengraph-image`, width: 1200, height: 630, alt: entry.title };
  }
  return {
    url: entry.image,
    ...getLocalImageSize(entry.image),
    alt: entry.imageAlt ?? entry.title,
  };
}

export function articleMetadata(entry: Post, path: string): Metadata {
  const image = previewImage(entry);

  return {
    title: entry.seoTitle ?? entry.title,
    description: entry.description,
    alternates: { canonical: path },
    // A draft reachable by direct URL must never enter the index, even though
    // it is already absent from the sitemap and every listing.
    ...(entry.draft ? { robots: { index: false, follow: false } } : {}),
    authors: entry.author ? [{ name: entry.author }] : undefined,
    keywords: entry.tags,
    openGraph: {
      title: entry.seoTitle ?? entry.title,
      description: entry.description,
      url: path,
      siteName: "DreamDuo",
      locale: "en_US",
      type: "article",
      publishedTime: entry.date,
      modifiedTime: entry.updated ?? entry.date,
      authors: entry.author ? [entry.author] : undefined,
      tags: entry.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.seoTitle ?? entry.title,
      description: entry.description,
      images: [image.url],
    },
  };
}

export function articleJsonLd(entry: Post, path: string, crumbs: Crumb[]) {
  const url = `${SITE_URL}${path}`;
  const author = getAuthor(entry.author);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: entry.title,
      description: entry.description,
      datePublished: entry.date,
      dateModified: entry.updated ?? entry.date,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: author
        ? {
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            ...(author.avatar ? { image: new URL(author.avatar, SITE_URL).href } : {}),
            ...(author.url ? { url: new URL(author.url, SITE_URL).href } : {}),
          }
        : { "@type": "Organization", name: "DreamDuo", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "DreamDuo",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/dreamduo_logo.webp` },
      },
      image: `${SITE_URL}${previewImage(entry).url}`,
      ...(entry.tags?.length ? { keywords: entry.tags.join(", ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...crumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href}`,
        })),
        { "@type": "ListItem", position: crumbs.length + 2, name: entry.title, item: url },
      ],
    },
  ];
}
