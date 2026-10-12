import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBanner } from "@/components/editorial-banner";
import { PostCard } from "@/components/post-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getComparisons } from "@/lib/blog";
import { SITE_URL } from "@/lib/article-meta";

const title = "DreamDuo Compared to Other Couples Apps";
const description =
  "Honest side-by-side comparisons of DreamDuo with Paired, Honeydue, Lasting and Between: features, prices, and which one suits which couple.";

export const metadata: Metadata = {
  title,
  description,
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  alternates: { canonical: "/compare" },
  openGraph: {
    title,
    description,
    url: "/compare",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
};

export default function CompareIndexPage() {
  const comparisons = getComparisons();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `${SITE_URL}/compare`,
      hasPart: comparisons.map((c) => ({
        "@type": "Article",
        headline: c.title,
        url: `${SITE_URL}/compare/${c.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
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

        <EditorialBanner seed="compare-couples-apps">
          <p className="editorial-eyebrow mb-6">Find what fits you two</p>
          <h1 className="editorial-title">Different apps.<br />Different ways to connect.</h1>
          <p className="editorial-deck">Shared goals, daily conversations, or a space just for you. See where DreamDuo and other couples apps fit into your life.</p>
          <p className="mt-6 max-w-lg text-xs leading-relaxed text-slate-600">We make DreamDuo. These comparisons explain where each app may be the better fit, using its public product information.</p>
        </EditorialBanner>
        <section className="bg-white py-12 lg:py-16">
          <div className="editorial-shell">
            <div className="mb-8 border-b border-slate-200 pb-5"><h2 className="font-display text-2xl font-bold text-slate-900">Side by side</h2></div>
            <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
              {comparisons.map((entry) => <PostCard key={entry.slug} post={entry} collection="compare" />)}
            </div>

            <Link
              href="/blog/best-couples-apps"
              className="group mt-12 flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-5 font-semibold text-slate-800 transition-colors hover:text-rose-600"
            >
              Want all five in one place? Read the full roundup of the best couples apps
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
