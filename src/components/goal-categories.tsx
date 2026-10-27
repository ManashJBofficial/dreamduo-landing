"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronRight, PiggyBank, Plane, Dumbbell, Gem, Heart, Rocket } from "lucide-react";

const GoalCategoryDialog = dynamic(() => import("@/components/goal-category-dialog").then(module => module.GoalCategoryDialog), { ssr: false });

const categories = [
  { label: "Save money", icon: PiggyBank, iconColor: "text-emerald-500", color: "border-emerald-200/60", hoverBorder: "hover:border-emerald-400" },
  { label: "Plan a trip", icon: Plane, iconColor: "text-sky-500", color: "border-sky-200/60", hoverBorder: "hover:border-sky-400" },
  { label: "Get fit together", icon: Dumbbell, iconColor: "text-amber-500", color: "border-orange-200/60", hoverBorder: "hover:border-orange-400" },
  { label: "Plan a wedding", icon: Gem, iconColor: "text-pink-500", color: "border-pink-200/60", hoverBorder: "hover:border-pink-400" },
  { label: "Grow closer", icon: Heart, iconColor: "text-rose-500", color: "border-rose-200/60", hoverBorder: "hover:border-rose-400" },
  { label: "Build a business", icon: Rocket, iconColor: "text-violet-500", color: "border-violet-200/60", hoverBorder: "hover:border-violet-400" }
];

export function GoalCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    if (activeCategory === null) return;

    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCategory(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [activeCategory]);

  return (
    <>
      <section id="dreams" className="home-section scroll-mt-16 bg-slate-50/50 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="site-container">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="home-heading font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
              What are you dreaming of?
            </h2>
            <p className="home-body mt-3 sm:mt-4">
              Pick a dream to see how it works.
            </p>
          </div>

          {/* Category grid - outline cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {categories.map((cat, index) => {
              const CatIcon = cat.icon;
              return (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setActiveCategory(index)}
                  aria-label={`Open details for ${cat.label}`}
                  className={`group flex items-center justify-between rounded-xl border bg-white ${cat.color} px-4 py-3.5 text-left transition-all duration-200 ${cat.hoverBorder} hover:shadow-md sm:rounded-2xl sm:px-5 sm:py-4 md:px-6 md:py-5`}
                >
                  <span className="home-label text-sm font-semibold text-slate-700 sm:text-base md:text-lg">
                    {cat.label}
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CatIcon
                      className={`h-5 w-5 ${cat.iconColor} sm:h-6 sm:w-6 md:h-7 md:w-7`}
                    />
                    <ChevronRight className="h-4 w-4 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-500 sm:h-5 sm:w-5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeCategory !== null && (
        <GoalCategoryDialog
          categoryIndex={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </>
  );
}
