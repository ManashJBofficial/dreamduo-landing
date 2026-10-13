import type { ReactNode } from "react";
import { AbstractPattern } from "@/components/abstract-pattern";
import { getArticleArt } from "@/lib/article-art";

export function EditorialBanner({ seed, children, className = "", containedArt = false }: { seed: string; children: ReactNode; className?: string; containedArt?: boolean }) {
  const art = getArticleArt(seed);
  return (
    <div className="editorial-shell">
      <header className={`editorial-banner ${containedArt ? "editorial-banner-contained" : ""} ${className}`} style={{ backgroundColor: art.background }}>
        <AbstractPattern seed={seed} contained={containedArt} className="editorial-banner-art" />
        <div className="editorial-banner-content">{children}</div>
      </header>
    </div>
  );
}
