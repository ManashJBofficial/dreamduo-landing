import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Clock3 } from "lucide-react";
import { formatDate, type Heading } from "@/lib/blog";
import { getAuthor, initials } from "@/lib/authors";
import { getLocalImageSize } from "@/lib/images";
import { EditorialBanner } from "@/components/editorial-banner";
import { MobileTableOfContents, TableOfContents } from "@/components/table-of-contents";

export interface Crumb { label: string; href: string }
interface ArticleLayoutProps {
  crumbs: Crumb[];
  artworkSeed: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  readingMinutes: number;
  author?: string;
  image?: string;
  imageAlt?: string;
  headings: Heading[];
  draft?: boolean;
  archived?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

export function ArticleLayout({ crumbs, artworkSeed, title, description, date, updated, readingMinutes, author, image, imageAlt, headings, draft, archived, children, footer }: ArticleLayoutProps) {
  const byline = getAuthor(author);
  const showUpdated = updated && updated !== date;
  return (
    <article className="editorial-article bg-white">
      <EditorialBanner seed={artworkSeed} containedArt>
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <li><Link href="/" className="hover:text-rose-700">DreamDuo</Link></li>
            {crumbs.map((crumb) => <li key={crumb.href} className="flex items-center gap-2"><ChevronRight aria-hidden="true" size={12} /><Link href={crumb.href} className="hover:text-rose-700">{crumb.label}</Link></li>)}
            <li className="flex items-center gap-2"><ChevronRight aria-hidden="true" size={12} /><span aria-current="page">Article</span></li>
          </ol>
        </nav>
        {draft && <p className="mb-4 text-sm font-bold text-amber-800">Draft · Preview only</p>}
        <h1 className="editorial-title">{title}</h1>
        <p className="editorial-deck">{description}</p>
        <div className="editorial-byline">
          {byline && <div className="editorial-author-card">
            <div className="editorial-author-portrait">
              {byline.avatar ? <Image src={byline.avatar} alt={`Portrait of ${byline.name}`} {...getLocalImageSize(byline.avatar)} sizes="112px" className="h-full w-full object-contain object-bottom" /> : <span aria-hidden="true" className="text-xl font-bold text-rose-900">{initials(byline.name)}</span>}
            </div>
            <div className="min-w-0 py-3 pr-5"><p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{byline.url ? <a href={byline.url} className="decoration-rose-300 underline-offset-4 hover:text-rose-700 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700">{byline.name}</a> : byline.name}</p><p className="mt-1 text-xs text-slate-600">{byline.role}</p></div>
          </div>}
          <div className="editorial-dateline">
            <div><p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">{showUpdated ? "Last updated" : "Published"}</p><time className="block text-xs font-semibold text-slate-700" dateTime={showUpdated ? updated : date}>{formatDate(showUpdated ? updated : date)}</time></div>
            <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600"><Clock3 size={14} aria-hidden="true" />{readingMinutes} min read</p>
          </div>
        </div>
      </EditorialBanner>
      <div className="editorial-shell editorial-reading-grid">
        <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
          <TableOfContents key={artworkSeed} headings={headings} />
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="font-display text-xl font-bold leading-snug text-slate-900">Put your plans<br />in one place.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Shared goals. Little milestones. More things to look forward to.</p>
            <a href="#try-dreamduo" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-700">Try DreamDuo <ArrowUpRight size={16} /></a>
          </div>
        </aside>
        <div className="min-w-0">
          {archived && <p className="mb-6 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">From our archive. <Link href="/blog" className="font-semibold text-rose-700 underline underline-offset-4">Browse the latest articles</Link>.</p>}
          <div className="mb-8 lg:hidden"><MobileTableOfContents key={artworkSeed} headings={headings} /></div>
          {image && <Image src={image} alt={imageAlt ?? title} {...getLocalImageSize(image)} sizes="(max-width: 1024px) 100vw, 48rem" className="mb-8 h-auto w-full rounded-2xl" />}
          <div className="editorial-prose">{children}</div>
          {footer}
        </div>
      </div>
    </article>
  );
}
