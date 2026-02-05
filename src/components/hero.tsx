"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to your email service (Mailchimp, Resend, etc.)
    setSubmitted(true);
  }

  return (
    <section className="-mt-14 relative min-h-screen overflow-hidden sm:-mt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content â€” vertically and horizontally centered */}
      <div className="relative flex min-h-screen items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {/* Waitlist badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-sm shadow-amber-300/60 sm:h-2.5 sm:w-2.5" />
              <span className="text-xs font-semibold text-white sm:text-sm">
                Founders Passes Limited &mdash; Claim Your Spot
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Build Your{" "}
              <span className="bg-gradient-to-r from-rose-200 via-fuchsia-200 to-amber-200 bg-clip-text text-transparent">
                Dreams Together
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg md:text-xl lg:mx-0">
              The goal tracker designed for couples who want more from life.
              Sync your savings, habits, and future in one beautiful space.
            </p>

            {/* Waitlist input */}
            <div className="mx-auto mt-6 max-w-md sm:mt-8 lg:mx-0">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center rounded-full border-2 border-white/15 bg-black/30 shadow-lg backdrop-blur-sm"
                >
                  <Mail className="ml-4 h-4 w-4 shrink-0 text-white/50 sm:ml-5 sm:h-5 sm:w-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-white/50 focus:outline-none sm:py-3.5 sm:text-base"
                  />
                  <button
                    type="submit"
                    className="m-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-6 py-3.5 backdrop-blur-sm lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300 sm:text-base">
                    You&apos;re on the list! We&apos;ll be in touch.
                  </span>
                </div>
              )}

              <p className="mt-3 text-sm font-bold text-white sm:text-base">
                Only 100 Founders Passes available.{" "}
                <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                  Lifetime Pro. Completely free. Forever.
                </span>
              </p>
            </div>
          </div>

          {/* Right - Mobile mockups */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative mx-auto h-[420px] w-[320px] sm:h-[500px] sm:w-[380px] md:h-[560px] md:w-[420px] lg:h-[620px] lg:w-[480px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[340px] w-[260px] sm:h-[420px] sm:w-[320px] md:h-[460px] md:w-[350px] lg:h-[520px] lg:w-[400px]">
                  {/* Back phone */}
                  <div className="absolute right-0 top-6 z-0 translate-x-6 rotate-[10deg]">
                    {/* 1. Wrapper Div handles the Shape & Shadow */}
                    <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-[1px] border-transparent transform-gpu">
                      <Image
                      src="/mockeup.png"
                        alt="DreamDuo app screen 2"
                        width={400}
                        height={800}
                        // 2. Image just fits inside
                        className="h-auto w-44 sm:w-52 md:w-56 lg:w-64"
                      />
                    </div>
                  </div>

                  {/* Front phone */}
                  <div className="absolute left-0 top-6 z-10 -translate-x-6 -rotate-[10deg]">
                    {/* 1. Wrapper Div handles the Shape & Shadow */}
                    <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-[1px] border-transparent transform-gpu">
                      <Image
                      src="/mockeup.png"
                        alt="DreamDuo app screen 1"
                        width={400}
                        height={800}
                        priority
                        // 2. Image just fits inside
                        className="h-auto w-44 sm:w-52 md:w-56 lg:w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTED OUT: Original app store buttons â€” restore when app is live
      <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 sm:gap-4 lg:justify-start">
        <Link
          href="#download"
          className="inline-flex items-center gap-2.5 rounded-xl border-2 border-slate-200/80 bg-white px-5 py-3 text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3.5"
        >
          <Image src="/app-store.png" alt="App Store" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">
              Download for free
            </div>
            <div className="text-sm font-semibold leading-tight sm:text-base">
              App Store
            </div>
          </div>
        </Link>
        <Link
          href="#download"
          className="inline-flex items-center gap-2.5 rounded-xl border-2 border-slate-200/80 bg-white px-5 py-3 text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md sm:gap-3 sm:px-6 sm:py-3.5"
        >
          <Image src="/google-play.png" alt="Google Play" width={24} height={24} className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">
              Download for free
            </div>
            <div className="text-sm font-semibold leading-tight sm:text-base">
              Google Play
            </div>
          </div>
        </Link>
      </div>
      */}
    </section>
  );
}
