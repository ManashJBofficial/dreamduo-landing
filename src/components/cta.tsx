"use client";

import { useState } from "react";
import { Heart, Mail, CheckCircle } from "lucide-react";

export function CTA() {
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
    <section
      id="download"
      className="relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 sm:rounded-t-3xl"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/10 to-transparent blur-3xl sm:h-[400px] sm:w-[600px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 shadow-lg shadow-pink-500/25 animate-pulse-glow sm:mb-8 sm:h-16 sm:w-16">
            <Heart className="h-7 w-7 fill-white text-white sm:h-8 sm:w-8" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Start the Journey
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400 sm:mt-5 sm:max-w-lg sm:text-lg">
            Join the waitlist and be the first couple to experience DreamDuo.
          </p>
          <p className="mt-3 text-base font-bold text-white sm:text-lg">
            Only 100 Founders Passes available.{" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
              Lifetime Pro. Completely free. Forever.
            </span>
          </p>

          {/* Waitlist input */}
          <div className="mx-auto mt-8 w-full max-w-md sm:mt-10">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                aria-label="Join the waitlist"
                className="flex items-center rounded-full border-2 border-white/15 bg-white/10 shadow-lg backdrop-blur-sm"
              >
                <Mail className="ml-4 h-4 w-4 shrink-0 text-slate-400 sm:ml-5 sm:h-5 sm:w-5" />
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
                  className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none sm:py-3.5 sm:text-base"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="m-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            ) : (
              <div
                aria-live="polite"
                className="flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3.5"
              >
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 sm:text-base">
                  You&apos;re on the list! We&apos;ll be in touch.
                </span>
              </div>
            )}

            <p className="mt-3 text-xs text-slate-500 sm:text-sm">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* COMMENTED OUT: Original download buttons — restore when app is live
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
        <Link
          href="#"
          className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/15 bg-white/10 px-6 py-3.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/15 sm:px-7 sm:py-4"
        >
          <Image src="/app-store.png" alt="App Store" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7" />
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">
              Download for free
            </div>
            <div className="text-base font-semibold leading-tight sm:text-lg">
              App Store
            </div>
          </div>
        </Link>
        <Link
          href="#"
          className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/15 bg-white/10 px-6 py-3.5 text-white shadow-lg backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/15 sm:px-7 sm:py-4"
        >
          <Image src="/google-play.png" alt="Google Play" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7" />
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">
              Download for free
            </div>
            <div className="text-base font-semibold leading-tight sm:text-lg">
              Google Play
            </div>
          </div>
        </Link>
      </div>
      */}
    </section>
  );
}
