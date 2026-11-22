import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GoalCategoryGrid } from "@/components/goal-category-grid";
import { dreamCategories } from "@/lib/goal-categories";
import styles from "@/components/goal-categories.module.css";

export function GoalCategories() {
  return (
    <section id="dreams" aria-labelledby="dreams-heading" className={`home-section ${styles.section}`}>
      <div className="site-container">
        <header className={styles.header}>
          <h2 id="dreams-heading" className="home-heading">What are you dreaming of?</h2>
          <p className={`home-body ${styles.description}`}>
            From date-night plans to big life goals, turn the things you want to do together into shared dreams.
          </p>
        </header>

        <GoalCategoryGrid cards={dreamCategories.map(({ id, icon: Icon, accent, label }) => ({
          id,
          content: (
            <>
              <Icon size={20} strokeWidth={1.75} color={accent} aria-hidden="true" />
              <span>{label}</span>
              <ChevronRight size={16} strokeWidth={1.75} className={styles.chevron} aria-hidden="true" />
            </>
          ),
        }))} />

        <nav className={styles.guides} aria-label="Dream planning guides">
          <Link prefetch={false} href="/blog/couples-bucket-list-40-ideas-you-can-turn-into-real-plans">Bucket list ideas for two</Link>
          <Link prefetch={false} href="/blog/how-to-track-shared-goals-as-a-couple-without-nagging-each-other">Plan a shared goal</Link>
          <Link prefetch={false} href="/blog/how-to-plan-your-next-long-distance-visit-free-checklist-budget">Long-distance visit checklist</Link>
        </nav>
      </div>
    </section>
  );
}
