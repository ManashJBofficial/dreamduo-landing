import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { BlogAppCTA } from "@/components/blog-app-cta";
import { MdxBody } from "@/components/mdx-body";
import { ArticleLayout, type Crumb } from "@/components/article-layout";
import { getHeadings, getPost, getPosts, getRelatedPosts } from "@/lib/blog";
import { articleJsonLd, articleMetadata } from "@/lib/article-meta";

const CRUMBS: Crumb[] = [{ label: "Blog", href: "/blog" }];

/** Every post is prerendered at build time, so there is no per-request work. */
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return articleMetadata(post, `/blog/${post.slug}`);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const jsonLd = articleJsonLd(post, `/blog/${post.slug}`, CRUMBS);

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
          artworkSeed={post.slug}
          crumbs={CRUMBS}
          title={post.title}
          description={post.description}
          date={post.date}
          updated={post.updated}
          readingMinutes={post.readingMinutes}
          author={post.author}
          image={post.image}
          imageAlt={post.imageAlt}
          headings={getHeadings(post.content)}
          draft={post.draft}
          footer={
            <>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
                    >
                      {tag.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              )}

              <BlogAppCTA />

              {related.length > 0 && (
                <section className="mt-14 border-t border-slate-200 pt-10">
                  <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-slate-900">
                    Keep reading
                  </h2>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    {related.map((item) => (
                      <PostCard key={item.slug} post={item} />
                    ))}
                  </div>
                </section>
              )}
            </>
          }
        >
          <MdxBody source={post.content} assetBase={post.assetBase} />
        </ArticleLayout>

        <Footer />
      </main>
    </>
  );
}
