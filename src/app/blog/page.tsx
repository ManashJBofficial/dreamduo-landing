import type { Metadata } from "next";
import Link from "next/link";
import { EditorialBanner } from "@/components/editorial-banner";
import { Rss } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { BlogTopicNav } from "@/components/blog-topic-nav";
import { getPosts } from "@/lib/blog";

const title = "Couples Blog: Gift Ideas, Shared Goals & Relationship Guides";
const description =
  "Practical guides for couples: shared goals, bucket list ideas, long-distance conversations and app comparisons with features, pricing and source links.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title,
    description,
    url: "/blog",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function BlogIndexPage() {
  const posts = getPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: title,
      description,
      url: "https://dreamduo.app/blog",
      publisher: {
        "@type": "Organization",
        "@id": "https://dreamduo.app/#organization",
        name: "DreamDuo",
        url: "https://dreamduo.app",
        logo: "https://dreamduo.app/dreamduo_logo.webp",
      },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url: `https://dreamduo.app/blog/${post.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dreamduo.app" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://dreamduo.app/blog" },
      ],
    },
  ];

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

        <EditorialBanner seed="dreamduo-journal" className="journal-hero">
          <p className="editorial-eyebrow mb-6">The DreamDuo journal</p>
          <h1 className="editorial-title">A little closer.<br />A little more together.</h1>
          <p className="editorial-deck">Practical guides for couples, from shared goals and bucket lists to long-distance conversations and clear app comparisons.</p>
          <div className="journal-hero-actions">
            <a href="#journal-stories" className="journal-primary-link">Explore the journal <span aria-hidden="true">&darr;</span></a>
            <Link href="/compare" className="journal-secondary-link">Compare couples apps <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </EditorialBanner>
        <div className="editorial-shell">
          <BlogTopicNav />
        </div>

        <section id="journal-stories" aria-labelledby="journal-stories-title" className="journal-stories bg-white pb-12 sm:pb-16">
          <div className="editorial-shell">
            <div className="mb-8 border-b border-slate-200 pb-5"><h2 id="journal-stories-title" className="font-display text-2xl font-bold text-slate-900">Latest articles</h2></div>
            {posts.length === 0 ? (
              <p className="text-base text-slate-500">
                Our first stories are on their way. Come back soon.
              </p>
            ) : (
              <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            <div className="mt-14 border-t border-slate-200 pt-6">
              <Link
                href="/blog/rss.xml"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-rose-600"
              >
                <Rss className="h-4 w-4" />
                Subscribe via RSS
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
