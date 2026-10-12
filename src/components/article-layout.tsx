import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
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
  children: ReactNode;
  footer?: ReactNode;
}

export function ArticleLayout({ crumbs, artworkSeed, title, description, date, updated, readingMinutes, author, image, imageAlt, headings, draft, children, footer }: ArticleLayoutProps) {
  const byline = getAuthor(author);
  const showUpdated = updated && updated !== date;
  return (
    <article className="editorial-article bg-white">
      <EditorialBanner seed={artworkSeed}>
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
          {byline && <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-bold text-slate-800">{initials(byline.name)}</span>
            <div><p className="text-sm font-bold text-slate-900">{byline.name}</p><p className="mt-1 text-xs text-slate-600">{byline.role}</p></div>
          </div>}
          <div className="editorial-dateline text-xs leading-relaxed text-slate-600">
            <p>{showUpdated ? "Updated" : "Published"} <time dateTime={showUpdated ? updated : date}>{formatDate(showUpdated ? updated : date)}</time></p>
            <p className="mt-1">{readingMinutes} min read</p>
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
          <div className="mb-8 lg:hidden"><MobileTableOfContents key={artworkSeed} headings={headings} /></div>
          {image && <Image src={image} alt={imageAlt ?? title} {...getLocalImageSize(image)} sizes="(max-width: 1024px) 100vw, 48rem" className="mb-8 h-auto w-full rounded-2xl" />}
          <div className="editorial-prose">{children}</div>
          {footer}
        </div>
      </div>
    </article>
  );
}
