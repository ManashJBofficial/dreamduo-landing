"use client";

import { useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import styles from "@/components/goal-categories.module.css";

const GoalCategoryDialog = dynamic(
  () => import("@/components/goal-category-dialog").then(module => module.GoalCategoryDialog),
  { ssr: false },
);

export function GoalCategoryGrid({ cards }: { cards: { id: string; content: ReactNode }[] }) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {cards.map(({ id, content }, index) => (
          <button
            type="button"
            key={id}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setActiveCategory(index);
              setOpen(true);
            }}
            aria-haspopup="dialog"
            aria-expanded={open && activeCategory === index}
            className={styles.card}
          >
            {content}
          </button>
        ))}
      </div>

      {activeCategory !== null && (
        <GoalCategoryDialog
          categoryIndex={activeCategory}
          open={open}
          onClose={() => setOpen(false)}
          onReturnFocus={() => opener.current?.focus({ preventScroll: true })}
        />
      )}
    </>
  );
}
