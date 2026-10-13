import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EditorialBanner } from "@/components/editorial-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { getPostsByTag, getTags } from "@/lib/blog";

const SITE_URL = "https://dreamduo.app";

/**
 * Topic hubs. Their real job is internal linking: they give every post on a
 * subject a shared parent page, which is how a small site builds topical
 * authority instead of a pile of unrelated articles.
 */
export function generateStaticParams() {
  return getTags().map(({ tag }) => ({ tag }));
}

function label(tag: string): string {
  return tag.replace(/-/g, " ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) return { title: "Topic not found" };

  const title = `${label(tag)} articles`;
  const description = `${posts.length} ${
    posts.length === 1 ? "article" : "articles"
  } on ${label(tag)} for couples building something together.`;

  return {
    title,
    description,
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: {
      title,
      description,
      url: `/blog/tag/${tag}`,
      siteName: "DreamDuo",
      locale: "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: label(tag),
        item: `${SITE_URL}/blog/tag/${tag}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <a
        href="#main-content"
        className="sr-only z-[70] rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen bg-white px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4"
      >
        <Navbar />

        <EditorialBanner seed={tag}>
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16} /> All stories</Link>
          <p className="editorial-eyebrow mb-4">Explore the journal</p>
          <h1 className="editorial-title capitalize">{label(tag)}</h1>
          <p className="editorial-deck">{posts.length} {posts.length === 1 ? "story" : "stories"} for the life you&apos;re building together.</p>
        </EditorialBanner>
        <section className="bg-white pb-16">
          <div className="editorial-shell">
            <div className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
