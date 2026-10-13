import { ImageResponse } from "next/og";
import { AbstractPattern } from "@/components/abstract-pattern";
import { getArticleArt } from "@/lib/article-art";
import type { Post } from "@/lib/blog";

export function articleOpenGraph(entry: Post) {
  const art = getArticleArt(entry.slug);
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", overflow: "hidden", width: "100%", height: "100%", background: art.background, color: art.ink, padding: "64px", fontFamily: "sans-serif" }}>
      {AbstractPattern({ seed: entry.slug, contained: true, style: { position: "absolute", width: 300, height: 360, right: 40, top: 140 } })}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 730 }}>
        <div style={{ fontSize: 25, fontWeight: 700 }}>dreamduo / journal</div>
        <div style={{ fontSize: entry.title.length > 75 ? 52 : 60, lineHeight: 1.08, letterSpacing: -2, fontWeight: 700 }}>{entry.title}</div>
        <div style={{ fontSize: 22 }}>{`${entry.author ?? "DreamDuo"} · ${entry.readingMinutes} min read`}</div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
