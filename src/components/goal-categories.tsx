"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  X,
  PiggyBank,
  Plane,
  Dumbbell,
  Gem,
  Heart,
  Rocket,
  BarChart3,
  Gift,
  Trophy,
  CalendarClock,
  Map,
  Timer,
  Wallet,
  Camera,
  Flame,
  Handshake,
  TrendingUp,
  Target,
  Church,
  CheckCircle,
  Mail,
  PartyPopper,
  MessageCircle,
  ClipboardList,
  Zap,
  Send,
  Lightbulb,
  Landmark,
  Milestone,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CategoryFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Category {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  color: string;
  hoverBorder: string;
  modalBg: string;
  modalBgDarker: string;
  modalText: string;
  modalTextMuted: string;
  modalFeatureBg: string;
  modalBtnBg: string;
  modalBtnText: string;
  headline: string;
  description: string;
  features: CategoryFeature[];
}

const categories: Category[] = [
  {
    label: "Save money",
    icon: PiggyBank,
    iconColor: "text-emerald-500",
    color: "border-emerald-200/60",
    hoverBorder: "hover:border-emerald-400",
    modalBg: "modal-emerald",
    modalBgDarker: "modal-emerald-d",
    modalText: "text-white",
    modalTextMuted: "text-emerald-200/70",
    modalFeatureBg: "bg-emerald-400/10",
    modalBtnBg: "bg-emerald-400",
    modalBtnText: "text-emerald-950",
    headline: "Reach Your Savings Goals",
    description:
      "Whether it's a house deposit, wedding fund, or emergency savings - track every dollar together and watch your future take shape.",
    features: [
      {
        icon: BarChart3,
        title: "Live progress tracking",
        description: "See exactly where you stand, updated in real time",
      },
      {
        icon: Gift,
        title: "Hidden contributions",
        description: "Secretly add to goals and surprise your partner",
      },
      {
        icon: Trophy,
        title: "Milestone celebrations",
        description: "Celebrate hitting 25%, 50%, 75% and beyond",
      },
      {
        icon: CalendarClock,
        title: "Target date planning",
        description: "Set deadlines and get on-track reminders",
      },
    ],
  },
  {
    label: "Plan a trip",
    icon: Plane,
    iconColor: "text-sky-500",
    color: "border-sky-200/60",
    hoverBorder: "hover:border-sky-400",
    modalBg: "modal-sky",
    modalBgDarker: "modal-sky-d",
    modalText: "text-white",
    modalTextMuted: "text-sky-200/70",
    modalFeatureBg: "bg-sky-400/10",
    modalBtnBg: "bg-sky-400",
    modalBtnText: "text-sky-950",
    headline: "Dream Vacations, Planned Together",
    description:
      "From Bali to Barcelona - plan your trips as a team with shared budgets, wishlists, and countdown timers.",
    features: [
      {
        icon: Map,
        title: "Trip goal templates",
        description: "Pre-built templates for travel budgets and planning",
      },
      {
        icon: Timer,
        title: "Countdown timer",
        description: "Watch the days tick down to your adventure",
      },
      {
        icon: Wallet,
        title: "Shared travel fund",
        description: "Both partners contribute to one pool",
      },
      {
        icon: Camera,
        title: "Memory milestones",
        description: "Mark booking flights, hotels, and must-do activities",
      },
    ],
  },
  {
    label: "Get fit together",
    icon: Dumbbell,
    iconColor: "text-amber-500",
    color: "border-orange-200/60",
    hoverBorder: "hover:border-orange-400",
    modalBg: "modal-amber",
    modalBgDarker: "modal-amber-d",
    modalText: "text-white",
    modalTextMuted: "text-amber-200/70",
    modalFeatureBg: "bg-amber-400/10",
    modalBtnBg: "bg-amber-400",
    modalBtnText: "text-amber-950",
    headline: "Build Healthy Habits as a Team",
    description:
      "Lose weight, run a marathon, or just move more - accountability is easier when your partner is right beside you.",
    features: [
      {
        icon: Flame,
        title: "Streak tracking",
        description: "Build daily habits and never break the chain",
      },
      {
        icon: Handshake,
        title: "Partner accountability",
        description: "See each other's check-ins and stay motivated",
      },
      {
        icon: TrendingUp,
        title: "Progress charts",
        description: "Visualise your fitness journey together",
      },
      {
        icon: Target,
        title: "Custom milestones",
        description: "Set weight, distance, or workout targets",
      },
    ],
  },
  {
    label: "Plan a wedding",
    icon: Gem,
    iconColor: "text-pink-500",
    color: "border-pink-200/60",
    hoverBorder: "hover:border-pink-400",
    modalBg: "modal-pink",
    modalBgDarker: "modal-pink-d",
    modalText: "text-white",
    modalTextMuted: "text-pink-200/70",
    modalFeatureBg: "bg-pink-400/10",
    modalBtnBg: "bg-pink-400",
    modalBtnText: "text-pink-950",
    headline: "Plan Your Perfect Day",
    description:
      "Budget tracking, vendor milestones, and countdown to \"I do\" - all shared between both partners.",
    features: [
      {
        icon: Church,
        title: "Wedding budget tracker",
        description: "Track deposits, payments, and remaining costs",
      },
      {
        icon: CheckCircle,
        title: "Vendor milestones",
        description: "Mark off caterer, photographer, venue, and more",
      },
      {
        icon: Mail,
        title: "Future letters",
        description: "Write love letters to open on your wedding day",
      },
      {
        icon: PartyPopper,
        title: "Celebration moments",
        description: "Celebrate every booking and decision together",
      },
    ],
  },
  {
    label: "Grow closer",
    icon: Heart,
    iconColor: "text-rose-500",
    color: "border-rose-200/60",
    hoverBorder: "hover:border-rose-400",
    modalBg: "modal-rose",
    modalBgDarker: "modal-rose-d",
    modalText: "text-white",
    modalTextMuted: "text-rose-200/70",
    modalFeatureBg: "bg-rose-400/10",
    modalBtnBg: "bg-rose-400",
    modalBtnText: "text-rose-950",
    headline: "Deepen Your Connection",
    description:
      "Daily questions, weekly check-ins, and shared reflections - build emotional intimacy with simple daily rituals.",
    features: [
      {
        icon: MessageCircle,
        title: "Daily questions",
        description:
          "One deep question a day, answered privately then revealed",
      },
      {
        icon: ClipboardList,
        title: "Sunday Summit",
        description: "Weekly 5-minute relationship check-in",
      },
      {
        icon: Zap,
        title: "Connection streaks",
        description: "Build a daily habit of showing up for each other",
      },
      {
        icon: Send,
        title: "Love letters",
        description: "Write time-locked messages for future milestones",
      },
    ],
  },
  {
    label: "Build a business",
    icon: Rocket,
    iconColor: "text-violet-500",
    color: "border-violet-200/60",
    hoverBorder: "hover:border-violet-400",
    modalBg: "modal-violet",
    modalBgDarker: "modal-violet-d",
    modalText: "text-white",
    modalTextMuted: "text-violet-200/70",
    modalFeatureBg: "bg-violet-400/10",
    modalBtnBg: "bg-violet-400",
    modalBtnText: "text-violet-950",
    headline: "Launch Your Side Hustle Together",
    description:
      "Track startup savings, business milestones, and shared ambitions. Build your empire as a team.",
    features: [
      {
        icon: Lightbulb,
        title: "Idea commitment",
        description: "Both partners commit before a goal goes live",
      },
      {
        icon: Landmark,
        title: "Startup fund tracking",
        description: "Save toward your business launch together",
      },
      {
        icon: Milestone,
        title: "Milestone roadmap",
        description: "Track progress from idea to launch and beyond",
      },
      {
        icon: Users,
        title: "Partner alignment",
        description: "Weekly summits to stay on the same page",
      },
    ],
  },
];

function CategoryModal({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const CategoryIcon = category.icon;
  const modalTitleId = `goal-category-${category.label
    .toLowerCase()
    .replace(/\s+/g, "-")}-title`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal - fully colored */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className={`relative flex h-[min(86vh,38rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl ${category.modalBg} shadow-2xl sm:max-w-3xl sm:rounded-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close goal details"
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${category.modalFeatureBg} ${category.modalText} transition-opacity hover:opacity-80 sm:right-4 sm:top-4 sm:h-9 sm:w-9`}
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Header */}
        <div className="shrink-0 px-5 pb-4 pt-10 text-center sm:px-8 sm:pb-5 sm:pt-12">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${category.modalFeatureBg} sm:h-16 sm:w-16`}
          >
            <CategoryIcon
              className={`h-7 w-7 ${category.modalText} sm:h-8 sm:w-8`}
            />
          </div>
          <h3
            id={modalTitleId}
            className={`mt-4 font-serif text-2xl font-bold ${category.modalText} sm:mt-5 sm:text-3xl`}
          >
            {category.headline}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${category.modalTextMuted} sm:mt-3 sm:text-base`}
          >
            {category.description}
          </p>
        </div>

        {/* Features grid - slightly darker tinted area */}
        <div
          className={`mx-4 min-h-0 flex-1 overflow-y-auto rounded-2xl ${category.modalBgDarker}/30 px-4 py-5 sm:mx-6 sm:rounded-3xl sm:px-6 sm:py-6`}
        >
          <div className="flex h-full items-start sm:items-center">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {category.features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${category.modalFeatureBg} sm:h-11 sm:w-11`}
                    >
                      <FeatureIcon
                        className={`h-5 w-5 ${category.modalText} sm:h-5.5 sm:w-5.5`}
                      />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${category.modalText}`}>
                        {feature.title}
                      </div>
                      <div
                        className={`mt-0.5 text-xs leading-relaxed ${category.modalTextMuted} sm:text-[13px]`}
                      >
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="shrink-0 border-t border-white/10 px-5 pb-7 pt-4 text-center sm:px-8 sm:pb-8 sm:pt-5">
          <Link
            href="#download"
            onClick={onClose}
            className={`inline-flex items-center gap-2 rounded-full ${category.modalBtnBg} px-7 py-3 text-sm font-bold ${category.modalBtnText} shadow-lg transition-all hover:opacity-90 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base`}
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            Join the Waitlist
          </Link>
          <p
            className={`mt-2.5 text-[11px] ${category.modalTextMuted} sm:mt-3 sm:text-xs`}
          >
            Launching soon. Free forever &mdash; no credit card required.
          </p>
        </div>

        {/* COMMENTED OUT: Original download button - restore when app is live
        <div className="px-5 pb-8 pt-5 text-center sm:px-8 sm:pb-10 sm:pt-6">
          <Link
            href="#download"
            onClick={onClose}
            className={`inline-flex items-center gap-2 rounded-full ${category.modalBtnBg} px-7 py-3 text-sm font-bold ${category.modalBtnText} shadow-lg transition-all hover:opacity-90 hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base`}
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            Download for Free
          </Link>
          <p
            className={`mt-2.5 text-[11px] ${category.modalTextMuted} sm:mt-3 sm:text-xs`}
          >
            No credit card required. Free forever for core features.
          </p>
        </div>
        */}
      </div>
    </div>
  );
}

export function GoalCategories() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!activeCategory) return;

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
      <section id="goals" className="scroll-mt-16 bg-slate-50/50 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
              What are you dreaming of?
            </h2>
            <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
              Tap a goal to preview the experience. Track progress with 4 goal
              types: amount, checklist, habit, and time.
            </p>
          </div>

          {/* Category grid - outline cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setActiveCategory(cat)}
                  aria-label={`Open details for ${cat.label}`}
                  className={`group flex items-center justify-between rounded-xl border bg-white ${cat.color} px-4 py-3.5 text-left transition-all duration-200 ${cat.hoverBorder} hover:shadow-md sm:rounded-2xl sm:px-5 sm:py-4 md:px-6 md:py-5`}
                >
                  <span className="text-sm font-semibold text-slate-700 sm:text-base md:text-lg">
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
      {activeCategory && (
        <CategoryModal
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </>
  );
}
