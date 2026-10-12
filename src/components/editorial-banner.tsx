import type { ReactNode } from "react";
import { AbstractPattern } from "@/components/abstract-pattern";
import { getArticleArt } from "@/lib/article-art";

export function EditorialBanner({ seed, children }: { seed: string; children: ReactNode }) {
  const art = getArticleArt(seed);
  return (
    <div className="editorial-shell">
      <header className="editorial-banner" style={{ backgroundColor: art.background }}>
        <AbstractPattern seed={seed} className="editorial-banner-art" />
        <div className="editorial-banner-content">{children}</div>
      </header>
    </div>
  );
}
