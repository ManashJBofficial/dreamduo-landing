import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogAppCTA } from "@/components/blog-app-cta";
import { MdxBody } from "@/components/mdx-body";
import { ArticleLayout, type Crumb } from "@/components/article-layout";
import { getComparison, getComparisons, getHeadings } from "@/lib/blog";
import { articleJsonLd, articleMetadata } from "@/lib/article-meta";

const CRUMBS: Crumb[] = [{ label: "Compare", href: "/compare" }];

export function generateStaticParams() {
  return getComparisons().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComparison(slug);
  if (!entry) return { title: "Comparison not found" };
  return articleMetadata(entry, `/compare/${entry.slug}`);
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getComparison(slug);
  if (!entry) notFound();

  const others = getComparisons().filter((c) => c.slug !== slug);
  const jsonLd = articleJsonLd(entry, `/compare/${entry.slug}`, CRUMBS);

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

        <ArticleLayout
          artworkSeed={entry.slug}
          crumbs={CRUMBS}
          title={entry.title}
          description={entry.description}
          date={entry.date}
          updated={entry.updated}
          readingMinutes={entry.readingMinutes}
          author={entry.author}
          image={entry.image}
          imageAlt={entry.imageAlt}
          headings={getHeadings(entry.content)}
          draft={entry.draft}
          footer={
            <>
              <BlogAppCTA />

              {/* Every comparison links to every other one and to the full
                  roundup. That internal web is how a cluster of pages builds
                  authority on "couples app" searches as a group. */}
              <section className="mt-14 border-t border-slate-200 pt-10">
                <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-slate-900">
                  More comparisons
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {others.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/compare/${c.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 font-semibold text-slate-800 transition-colors hover:border-rose-300 hover:text-rose-600"
                      >
                        DreamDuo vs. {c.competitor}
                        <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500" />
                      </Link>
                    </li>
                  ))}
                  <li className="sm:col-span-2">
                    <Link
                      href="/blog/the-5-best-couples-apps-in-2026-compared-honestly"
                      className="group flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3.5 font-semibold text-slate-800 transition-colors hover:text-rose-600"
                    >
                      All five apps side by side: the best couples apps in 2026
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500" />
                    </Link>
                  </li>
                </ul>
              </section>
            </>
          }
        >
          <MdxBody source={entry.content} assetBase={entry.assetBase} />
        </ArticleLayout>

        <Footer />
      </main>
    </>
  );
}
