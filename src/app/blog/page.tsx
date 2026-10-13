import type { Metadata } from "next";
import Link from "next/link";
import { EditorialBanner } from "@/components/editorial-banner";
import { Rss } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { getPosts, getTags } from "@/lib/blog";

const title = "Shared Goals, Habits & Couples App Guides";
const description =
  "Guides, comparisons, and honest advice for couples building a life together: shared goals, money, habits, and staying close at any distance.";

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
  const tags = getTags();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: title,
      description,
      url: "https://dreamduo.app/blog",
      publisher: {
        "@type": "Organization",
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

        <EditorialBanner seed="dreamduo-journal">
          <p className="editorial-eyebrow mb-6">The DreamDuo journal</p>
          <h1 className="editorial-title">A little closer.<br />A little more together.</h1>
          <p className="editorial-deck">Practical guides and thoughtful comparisons for the life you&apos;re building together. From your next small habit to your biggest shared dream.</p>
          <Link href="/compare" className="mt-7 inline-flex text-sm font-bold text-rose-800 underline decoration-rose-300 underline-offset-4">Explore the app comparisons &rarr;</Link>
        </EditorialBanner>
        <div className="editorial-shell mt-10">
          <div className="flex flex-wrap gap-2" aria-label="Browse topics">
            <Link href="/blog" className="editorial-filter" aria-current="page">All stories</Link>
            {tags.map(({ tag }) => <Link key={tag} href={`/blog/tag/${tag}`} className="editorial-filter">{tag.replace(/-/g, " ")}</Link>)}
          </div>
        </div>

        <section className="bg-white py-12 sm:py-16">
          <div className="editorial-shell">
            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5"><h2 className="font-display text-2xl font-bold text-slate-900">The latest stories</h2><span className="text-xs text-slate-600">Ideas for two</span></div>
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
