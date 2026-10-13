import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/blog";
import { getLocalImageSize } from "@/lib/images";
import { BucketListPhoto } from "@/components/bucket-list-photo";
import { BucketListStarter } from "@/components/bucket-list-starter";
import { DailyQuestionCTA } from "@/components/daily-question-cta";
import { EditorialPhoto } from "@/components/editorial-photo";
import { ArticleDownload } from "@/components/article-download";

/**
 * Element styling for rendered MDX. Posts are plain markdown, so everything a
 * writer types maps to these — no classes in the .mdx files themselves.
 */

/**
 * Plain text of a heading, walking into nested elements, so "## The **best**
 * pick" yields "The best pick" here exactly as getHeadings() does from the raw
 * markdown. If the two disagreed, table of contents links would miss.
 */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function toId(children: ReactNode): string {
  return slugify(textOf(children));
}

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="font-semibold text-rose-600 underline decoration-rose-200 underline-offset-2 transition-colors hover:text-rose-700 hover:decoration-rose-400"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      // noopener for the security win; leaving referrer intact means sites we
      // cite can see the traffic came from us, which is how outreach starts.
      rel="noopener"
      className="font-semibold text-rose-600 underline decoration-rose-200 underline-offset-2 transition-colors hover:text-rose-700 hover:decoration-rose-400"
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * Components for one article's body. `assetBase` is that article's image
 * folder (e.g. /blog/best-couples-apps), so a post can write just
 * ![alt](photo.webp) and it resolves to /blog/best-couples-apps/photo.webp.
 * Full /paths still work, for sharing an image between posts.
 */
export function createMdxComponents(assetBase: string) {
  return { ...baseComponents, BucketListPhoto, EditorialPhoto, ArticleDownload, BucketListStarter, DailyQuestionCTA, img: (props: ComponentPropsWithoutRef<"img">) => <MdxImage {...props} assetBase={assetBase} /> };
}

const baseComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={toId(children)}
      className="font-display mt-12 scroll-mt-6 text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={toId(children)}
      className="font-display mt-9 scroll-mt-6 text-xl font-bold leading-snug tracking-[-0.01em] text-slate-900 sm:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-7 text-lg font-bold text-slate-900" {...props}>
      {children}
    </h4>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-[17px] leading-[1.75] lg:text-[18px] text-slate-700" {...props} />
  ),
  a: Anchor,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] lg:text-[18px] text-slate-700 marker:text-rose-400" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] lg:text-[18px] text-slate-700 marker:font-semibold marker:text-rose-500" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1.5" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-slate-900" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 rounded-r-xl border-l-4 border-rose-300 bg-rose-50/60 py-4 pl-5 pr-4 text-[17px] italic leading-relaxed text-slate-700 [&>p]:mt-0"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-slate-200" />,
  // Tables are how comparison posts earn their keep, so they get real styling
  // rather than browser defaults. The wrapper scrolls instead of the page.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div role="region" aria-label="Article table (scroll horizontally if needed)" tabIndex={0} className="mt-7 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-slate-50" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      scope="col"
      className="border-b border-slate-200 px-4 py-3 font-bold text-slate-900"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-slate-100 px-4 py-3 align-top text-slate-700"
      {...props}
    />
  ),
};

/**
 * `![alt text](/blog/slug/file.webp "Optional caption")` in a post.
 *
 * Dimensions come from the file itself, so a tall phone screenshot keeps its
 * shape instead of being boxed into 16:9. Portrait images are assumed to be
 * screenshots or mockups: centred at phone-ish width with no border, since a
 * frame around a transparent mockup looks broken. Wrappers are spans because
 * markdown puts images inside a <p>, where a <figure> is not allowed.
 */
function MdxImage({
  src,
  alt,
  title,
  assetBase,
}: ComponentPropsWithoutRef<"img"> & { assetBase: string }) {
  const raw = typeof src === "string" ? src.trim() : "";
  // A bare name like photo.webp or ./photo.webp belongs to this post's folder.
  // Anything with a scheme (https:) is left alone so getLocalImageSize can
  // reject it with a clear message instead of it resolving to nonsense.
  const path =
    raw.startsWith("/") || /^[a-z]+:/i.test(raw) ? raw : `${assetBase}/${raw.replace(/^\.\//, "")}`;

  if (!alt?.trim()) {
    throw new Error(
      `Image ${path} has no alt text. Write it as ![what the image shows](${path}). ` +
        `Alt text is what screen readers read out and what Google uses to understand the image.`
    );
  }

  const { width, height } = getLocalImageSize(path);
  const portrait = height > width;

  return (
    <span className="mt-8 block">
      <Image
        src={path}
        alt={alt}
        width={width}
        height={height}
        sizes={portrait ? "(max-width: 640px) 75vw, 20rem" : "(max-width: 768px) 100vw, 44rem"}
        className={
          portrait
            ? "mx-auto h-auto w-full max-w-[20rem]"
            : "h-auto w-full rounded-xl border border-slate-200"
        }
      />
      {title && (
        <span className="mt-3 block text-center text-sm leading-relaxed text-slate-500">
          {title}
        </span>
      )}
    </span>
  );
}
