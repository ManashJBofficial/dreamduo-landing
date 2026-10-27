import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getTags } from "@/lib/blog";
import { getBlogTopic, primaryBlogTopics } from "@/lib/blog-topics";

export function BlogTopicNav({ activeHref = "/blog" }: { activeHref?: string }) {
  const tags = getTags();
  const available = new Set(tags.map(({ tag }) => tag));
  const main = primaryBlogTopics.filter(({ tag }) => available.has(tag));
  // Comparisons is an existing legacy tag; readers find app guides under Couples apps.
  const more = tags.filter(({ tag }) => !primaryBlogTopics.some(topic => topic.tag === tag) && tag !== "comparisons");
  const moreActive = more.some(({ tag }) => activeHref === `/blog/tag/${tag}`);
  return (
    <nav className="journal-topic-nav" aria-label="Journal topics">
      <Link prefetch={false} href="/blog" className="journal-topic-link" aria-current={activeHref === "/blog" ? "page" : undefined}>All stories</Link>
      {main.map(({ tag, label }) => <Link prefetch={false} key={tag} href={`/blog/tag/${tag}`} className="journal-topic-link" aria-current={activeHref === `/blog/tag/${tag}` ? "page" : undefined}>{label}</Link>)}
      {more.length > 0 && <details className="journal-topic-more" open={moreActive || undefined}>
        <summary>More topics <ChevronDown size={14} aria-hidden="true" /></summary>
        <div className="journal-topic-dropdown">
          {more.map(({ tag }) => <Link prefetch={false} key={tag} href={`/blog/tag/${tag}`} aria-current={activeHref === `/blog/tag/${tag}` ? "page" : undefined}>{getBlogTopic(tag).label}</Link>)}
        </div>
      </details>}
    </nav>
  );
}
