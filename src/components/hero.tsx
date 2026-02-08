"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Mail } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || isSubmitting) return;

    // TODO: connect to your email service (Mailchimp, Resend, etc.)
    setIsSubmitting(true);
    setSubmitted(true);
    setEmail("");
    setIsSubmitting(false);
  }

  return (
    <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden pb-6 md:-mt-14 md:min-h-screen md:pb-0 lg:-mt-16">
      {/* Background image */}
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/45" />

      {/* Content centered */}
      <div className="relative flex min-h-[calc(100svh-4.5rem)] items-center px-4 sm:px-6 md:min-h-screen lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-7 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {/* Waitlist badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-sm shadow-amber-300/60 sm:h-2.5 sm:w-2.5" />
              <span className="text-xs font-semibold text-white sm:text-sm">
                First 100 couples get Lifetime Pro free
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Build Your</span>
              <span className="block bg-gradient-to-r from-rose-200 via-fuchsia-200 to-amber-200 bg-clip-text text-transparent sm:whitespace-nowrap">
                Dreams Together
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg md:text-xl lg:mx-0">
              The goal tracker for couples who want aligned money, habits, and
              milestones in one place.
            </p>

            {/* Waitlist input */}
            <div className="mx-auto mt-6 max-w-md sm:mt-8 lg:mx-0">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center rounded-full border-2 border-white/15 bg-black/30 shadow-lg backdrop-blur-sm"
                  aria-label="Join the waitlist"
                >
                  <Mail className="ml-4 h-4 w-4 shrink-0 text-white/50 sm:ml-5 sm:h-5 sm:w-5" />
                  <input
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-white/50 focus:outline-none sm:py-3.5 sm:text-base"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="m-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </button>
                </form>
              ) : (
                <div
                  aria-live="polite"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-6 py-3.5 backdrop-blur-sm lg:justify-start"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300 sm:text-base">
                    You&apos;re on the list. We&apos;ll be in touch.
                  </span>
                </div>
              )}

              <p className="mt-3 text-sm font-bold text-white sm:text-base">
                Limited launch.{" "}
                <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                  Lifetime Pro included for early members.
                </span>
              </p>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Right - Mobile mockups */}
          <div className="flex items-center justify-center pt-1 md:pt-0 lg:justify-end">
            <div className="relative mx-auto h-[360px] w-[285px] sm:h-[500px] sm:w-[380px] md:h-[560px] md:w-[420px] lg:h-[620px] lg:w-[480px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[290px] w-[225px] sm:h-[420px] sm:w-[320px] md:h-[460px] md:w-[350px] lg:h-[520px] lg:w-[400px]">
                  {/* Back phone */}
                  <div className="absolute right-0 top-6 z-0 translate-x-6 rotate-[10deg]">
                    <div className="transform-gpu">
                      <Image
                        src="/mockeup.png"
                        alt="DreamDuo app screen 2"
                        width={400}
                        height={800}
                        sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 256px"
                        className="h-auto w-[9.5rem] drop-shadow-2xl sm:w-52 md:w-56 lg:w-64"
                      />
                    </div>
                  </div>

                  {/* Front phone */}
                  <div className="absolute left-0 top-6 z-10 -translate-x-6 -rotate-[10deg]">
                    <div className="transform-gpu">
                      <Image
                        src="/mockeup.png"
                        alt="DreamDuo app screen 1"
                        width={400}
                        height={800}
                        priority
                        sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 256px"
                        className="h-auto w-[9.5rem] drop-shadow-2xl sm:w-52 md:w-56 lg:w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
