import { ImageResponse } from "next/og";
import { AbstractPattern } from "@/components/abstract-pattern";
import { getArticleArt } from "@/lib/article-art";
import type { Post } from "@/lib/blog";

export function articleOpenGraph(entry: Post) {
  const art = getArticleArt(entry.slug);
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", overflow: "hidden", width: "100%", height: "100%", background: art.background, color: art.ink, padding: "64px", fontFamily: "sans-serif" }}>
      <AbstractPattern seed={entry.slug} style={{ position: "absolute", width: 720, height: 630, right: -310, top: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 800 }}>
        <div style={{ fontSize: 25, fontWeight: 700 }}>dreamduo / journal</div>
        <div style={{ fontSize: entry.title.length > 75 ? 57 : 64, lineHeight: 1.08, letterSpacing: -2, fontWeight: 700 }}>{entry.title}</div>
        <div style={{ fontSize: 22 }}>{`${entry.author ?? "DreamDuo"} · ${entry.readingMinutes} min read`}</div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
