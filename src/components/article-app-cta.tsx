"use client";

import Image from "next/image";
import { StoreCTARow } from "@/components/store-cta-row";
import { useCtaImpression } from "@/components/cta-impression";
import styles from "@/components/article-app-cta.module.css";

interface ArticleAppCTAProps {
  articleSlug: string;
  position: "mid_article" | "end_article";
  variant?: "text" | "image";
  campaignPlacement: string;
  headline?: string;
  body?: string;
  supportingLine?: string;
}

/** Explicit MDX placement keeps this CTA in the article, independent of DOM or scroll position. */
export function ArticleAppCTA({ articleSlug, position, variant = "text", campaignPlacement, headline, body, supportingLine }: ArticleAppCTAProps) {
  const withImage = variant === "image";
  const ctaVariant = withImage ? "daily_question_image" : "daily_question_text";
  const ref = useCtaImpression(articleSlug, { cta_position: position, cta_variant: ctaVariant });
  return (
    <aside
      ref={ref}
      id={position === "end_article" ? "try-dreamduo" : undefined}
      aria-label={withImage ? "Keep the conversation going in DreamDuo" : "Try daily questions in DreamDuo"}
      data-app-cta={position}
      className={`${styles.cta} ${position === "mid_article" ? styles.midArticle : styles.endArticle} ${withImage ? styles.withImage : ""}`}
    >
      <div className={styles.copy}>
        <h2 className={styles.headline}>{headline ?? (withImage ? "Keep the conversation going together." : "Want to see how your partner would answer?")}</h2>
        <p className={styles.body}>{body ?? (withImage
          ? "Answer daily questions, share your plans, and build your future together in DreamDuo. You each reply privately, then see both answers once you have both replied."
          : "DreamDuo lets you both answer a daily question privately. You see each other's answers only after you've both replied.")}</p>
        <p className={styles.supporting}>{supportingLine ?? "One question. Two answers."}</p>
        <p className={styles.action}>Try DreamDuo. Free to start on iPhone and Android.</p>
        <StoreCTARow placement={position} campaignPlacement={campaignPlacement} ctaVariant={ctaVariant} className={styles.stores} />
      </div>
      {withImage && <figure className={styles.screenshot}>
        <Image src="/dreamduo-daily-conversations.webp" alt="DreamDuo daily question screen showing a question and both partners' revealed answers" width={635} height={1280} sizes="180px" loading="lazy" />
        <figcaption>A daily question in DreamDuo. Example shown.</figcaption>
      </figure>}
    </aside>
  );
}
