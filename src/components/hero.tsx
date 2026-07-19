import { Gift, MessageCircleHeart } from "lucide-react";
import { FloatingCard } from "@/components/floating-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff9f9] via-white to-rose-50/40 md:-mt-14 lg:-mt-16">
      {/* Aura gradient blooms */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-300 opacity-50 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-[-6rem] top-1/4 h-80 w-80 rounded-full bg-fuchsia-300 opacity-40 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-200 opacity-50 blur-3xl sm:h-96 sm:w-96" />
      </div>

      {/* Subtle dotted pattern */}
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0" />

      {/* Centered content */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-32 lg:pt-36 lg:px-8">
        {/* One-line heading */}
        <h1 className="font-display text-[clamp(1.9rem,6.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-5xl md:text-6xl">
          Build your{" "}
          <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
            dreams together.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg md:text-xl">
          A shared space for couples to track dreams, build habits, and stay in
          sync.
        </p>

        {/* Hero illustration + floating cards.
            The full image (phone + hand) is shown UNCROPPED. The SVG has a tall
            transparent band at the top of its canvas, which we tuck under the
            subtitle with a negative margin so the phone sits in the initial
            viewport while the hand extends below the fold and is revealed on
            scroll. Tune the -mt-* values to raise/lower the phone. */}
        <div className="relative -mt-6 flex w-full max-w-6xl items-start justify-center sm:-mt-14 md:-mt-24 lg:-mt-36">
          {/* Glow behind the phone */}
          <div
            aria-hidden="true"
            className="absolute top-[24%] h-[42%] w-[80%] rounded-full bg-gradient-to-br from-rose-300/60 via-fuchsia-300/50 to-amber-200/50 blur-3xl"
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-img.svg"
            alt="Hand holding a phone showing the DreamDuo app"
            width={810}
            height={1012}
            className="relative z-10 w-[300px] drop-shadow-2xl sm:w-[440px] md:w-[580px] lg:w-[700px]"
          />

          {/* Floating notification cards (decorative), clustered around the phone
              so they stay in the initial viewport. */}
          <FloatingCard
            emoji="🎉"
            iconClassName="bg-emerald-50 text-emerald-500"
            title="Alex hit 50%!"
            subtitle="House Deposit dream"
            className="left-0 top-[26%] hidden md:block animate-float"
          />
          <FloatingCard
            icon={Gift}
            iconClassName="bg-violet-50 text-violet-500"
            title="+$500 hidden"
            subtitle="Reveals at 75%"
            className="right-0 top-[30%] hidden md:block animate-float-delayed"
          />
          <FloatingCard
            emoji="📅"
            iconClassName="bg-sky-50 text-sky-500"
            title="Sunday Summit"
            subtitle="in 1h"
            className="left-2 top-[46%] hidden opacity-80 lg:block animate-float-slow"
          />
          <FloatingCard
            emoji="🏆"
            iconClassName="bg-amber-50 text-amber-500"
            title="Dream completed"
            subtitle="House Deposit"
            className="right-1 top-[50%] hidden opacity-80 lg:block animate-float"
          />
          <FloatingCard
            emoji="🔥"
            iconClassName="bg-orange-50 text-orange-500"
            title="12-day streak"
            subtitle="Keep it going"
            className="left-2 top-[64%] hidden md:block animate-float-slow"
          />
          <FloatingCard
            icon={MessageCircleHeart}
            iconClassName="bg-rose-50 text-rose-500"
            title="New daily question"
            subtitle="Both answered"
            className="right-2 top-[68%] hidden md:block animate-float"
          />

          {/* Faded background cards for depth (sit behind the phone, low opacity,
              kept to the outer edges at mid/lower heights so they never touch the
              heading or subtitle). */}
          <FloatingCard
            emoji="📸"
            iconClassName="bg-pink-50 text-pink-500"
            title="New photo added"
            subtitle="Bali Trip"
            className="left-[-2rem] top-[36%] z-0 hidden scale-90 opacity-45 lg:block animate-float-slow"
          />
          <FloatingCard
            emoji="💬"
            iconClassName="bg-indigo-50 text-indigo-500"
            title="Nudge sent"
            subtitle="Thinking of you 💭"
            className="right-[-2rem] top-[38%] z-0 hidden scale-90 opacity-45 lg:block animate-float"
          />
          <FloatingCard
            emoji="🔒"
            iconClassName="bg-amber-50 text-amber-500"
            title="Letter unlocked"
            subtitle="Anniversary"
            className="left-[-1.5rem] top-[80%] z-0 hidden scale-90 opacity-40 lg:block animate-float"
          />
          <FloatingCard
            emoji="✅"
            iconClassName="bg-teal-50 text-teal-500"
            title="Habit done"
            subtitle="Morning walk"
            className="right-[-1.5rem] top-[82%] z-0 hidden scale-90 opacity-40 lg:block animate-float-delayed"
          />
          <FloatingCard
            emoji="🎯"
            iconClassName="bg-emerald-50 text-emerald-500"
            title="Dream on track"
            subtitle="3 days ahead"
            className="left-[-1rem] top-[94%] z-0 hidden scale-90 opacity-35 lg:block animate-float-delayed"
          />
          <FloatingCard
            emoji="💜"
            iconClassName="bg-violet-50 text-violet-500"
            title="Mood logged"
            subtitle="Feeling great"
            className="right-[-1rem] top-[96%] z-0 hidden scale-90 opacity-35 lg:block animate-float-slow"
          />
        </div>
      </div>
    </section>
  );
}
