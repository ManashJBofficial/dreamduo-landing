"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { joinWaitlist, type WaitlistStatus } from "@/lib/waitlist-api";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<WaitlistStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const nextStatus = await joinWaitlist({
        email: cleanEmail,
        source: "landing"
      });

      setStatus(nextStatus);
      setEmail("");

      if (nextStatus === "subscribed" || nextStatus === "pending") {
        window.dispatchEvent(
          new CustomEvent("waitlist:joined", { detail: { status: nextStatus } })
        );
      }
    } catch {
      setError("Unable to join right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {!status ? (
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
            className="m-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:py-3 sm:text-sm"
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
            {statusMessage(status)}
          </span>
        </div>
      )}

      {error ? (
        <p className="mt-2 text-xs font-semibold text-rose-300 sm:text-sm">
          {error}
        </p>
      ) : null}

      <p className="mt-3 text-xs text-slate-500 sm:text-sm">
        We&apos;ll email you when beta opens. No spam.
      </p>
    </>
  );
}

function statusMessage(status: WaitlistStatus | null): string {
  if (status === "already") {
    return "You are already on the waitlist. We will be in touch.";
  }

  if (status === "pending") {
    return "Check your email to confirm your spot.";
  }

  return "You are on the list. We will be in touch.";
}
