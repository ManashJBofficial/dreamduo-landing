import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createMdxComponents } from "@/components/mdx-components";

/**
 * Renders an article body. GFM is what turns markdown pipe tables into real
 * tables, and comparison pages are mostly tables, so it is not optional here
 * despite base MDX leaving it out.
 *
 * `assetBase` is the article's image folder, so images in the body can be
 * written by filename alone.
 */
export function MdxBody({ source, assetBase }: { source: string; assetBase: string }) {
  return (
    <MDXRemote
      source={source}
      components={createMdxComponents(assetBase)}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
