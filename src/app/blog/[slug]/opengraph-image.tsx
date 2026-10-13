import { notFound } from "next/navigation";
import { getPost, getPublicPosts } from "@/lib/blog";
import { articleOpenGraph } from "@/lib/article-og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() { return getPublicPosts().map(({ slug }) => ({ slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const entry = getPost((await params).slug);
  if (!entry) notFound();
  return articleOpenGraph(entry);
}
