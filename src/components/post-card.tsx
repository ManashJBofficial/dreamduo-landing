import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { AbstractPattern } from "@/components/abstract-pattern";
import { getArticleArt } from "@/lib/article-art";
import { formatDate, type PostSummary } from "@/lib/blog";
import { getLocalImageSize } from "@/lib/images";

export function PostCard({ post, collection = "blog" }: { post: PostSummary; collection?: "blog" | "compare" }) {
  const art = getArticleArt(post.slug);
  return (
    <article className="group">
      <Link href={`/${collection}/${post.slug}`} className="block rounded-2xl">
        <div className="editorial-card-art" style={{ backgroundColor: art.background }}>
          {post.image ? <Image src={post.image} alt={post.imageAlt ?? post.title} {...getLocalImageSize(post.image)} sizes="(max-width: 768px) 100vw, 34rem" className="h-full w-full object-cover" /> : <>
            <AbstractPattern seed={post.slug} className="editorial-card-pattern" />
            <span className="absolute left-6 top-6 text-xs font-bold tracking-wide" style={{ color: art.ink }}>dreamduo<span className="ml-2 font-normal">/ journal</span></span>
            <span className="absolute bottom-6 left-6 max-w-[45%] font-display text-xl font-bold leading-tight" style={{ color: art.ink }}>{collection === "compare" ? <>Two apps.<br />Your choice.</> : post.tags?.includes("comparisons") ? <>Find your<br />kind of together.</> : <>Small steps.<br />Shared dreams.</>}</span>
          </>}
          <span className="editorial-card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
          <time dateTime={post.date}>{formatDate(post.date)}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span>
          {post.draft && <span className="font-bold text-amber-800">Draft</span>}
        </div>
        <h2 className="font-display mt-3 text-2xl font-bold leading-[1.2] tracking-[-0.025em] text-slate-900 transition-colors group-hover:text-rose-700">{post.title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{post.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rose-700">{collection === "compare" ? "Read the comparison" : "Read the story"}<ArrowRight size={16} aria-hidden="true" /></span>
      </Link>
    </article>
  );
}
