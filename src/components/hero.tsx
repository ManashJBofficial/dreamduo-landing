import Image from "next/image";
import { Gift, MessageCircleHeart } from "lucide-react";
import { FloatingCard } from "@/components/floating-card";
import { PlayStoreCTA } from "@/components/playstore-cta";
import { getPlayStoreUrl } from "@/lib/store-links";

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

        {/* Primary conversion point: install on Google Play. Sits above the
            artwork's z-index because the illustration is pulled up over it. */}
        <div className="relative z-20 mt-7 flex w-full flex-col items-center sm:mt-9">
          <PlayStoreCTA variant="hero" glow placement="hero" />

          {/* Desktop hand-off. Absolutely positioned off the centre axis so the
              button stays centred with the h1 and the artwork below it. Tune
              translate-x to change the gap from the button. */}
          <a
            href={getPlayStoreUrl("hero_qr")}
            target="_blank"
            rel="noopener"
            aria-label="QR code to install DreamDuo on your phone"
            className="absolute left-1/2 top-1 hidden translate-x-[10.5rem] items-center gap-3 rounded-2xl border border-slate-900/5 bg-white/70 p-2.5 pr-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.7)] backdrop-blur-sm transition hover:bg-white lg:flex"
          >
            <Image
              src="/install-qr-hero.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <span className="max-w-[6.5rem] text-left text-[11px] font-semibold leading-snug text-slate-600">
              Scan to install on your phone
            </span>
          </a>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 sm:text-sm">
            <span
              aria-hidden="true"
              className="relative flex h-2 w-2 items-center justify-center"
            >
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live on Google Play
          </p>

          <p className="mt-1.5 text-[13px] text-slate-500 sm:text-sm">
            Free to start. No card needed.
          </p>
        </div>

        {/* Hero illustration + floating cards.
            The full image (phone + hand) is shown UNCROPPED. The SVG has a tall
            transparent band at the top of its canvas, which we tuck under the
            subtitle with a negative margin so the phone sits in the initial
            viewport while the hand extends below the fold and is revealed on
            scroll. Tune the -mt-* values to raise/lower the phone. */}
        <div className="relative -mt-14 flex w-full max-w-6xl items-start justify-center sm:-mt-24 md:-mt-32 lg:-mt-44">
          {/* Glow behind the phone */}
          <div
            aria-hidden="true"
            className="absolute top-[24%] h-[42%] w-[80%] rounded-full bg-gradient-to-br from-rose-300/60 via-fuchsia-300/50 to-amber-200/50 blur-3xl"
          />

          {/* LCP image. The WebP is a raster export of the original 2MB SVG,
              which mobile could not download fast enough to be worth it. */}
          <Image
            src="/hero-img.webp"
            alt="Hand holding a phone showing the DreamDuo app"
            width={1400}
            height={1750}
            priority
            fetchPriority="high"
            sizes="(max-width: 639px) 280px, (max-width: 767px) 440px, (max-width: 1023px) 580px, 700px"
            className="pointer-events-none relative z-10 h-auto w-[280px] drop-shadow-2xl sm:w-[440px] md:w-[580px] lg:w-[700px]"
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
