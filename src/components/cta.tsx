import Image from "next/image";
import { WAITLIST_ENABLED } from "@/lib/feature-flags";
import { PlayStoreCTA } from "@/components/playstore-cta";
import { WaitlistForm } from "@/components/waitlist-form";
import { BrandMark } from "@/components/brand-mark";

export function CTA() {
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
          <BrandMark
            glow
            className="mb-6 h-14 w-14 sm:mb-8 sm:h-16 sm:w-16"
            iconClassName="h-7 w-7 sm:h-8 sm:w-8"
          />

          {/* Heading */}
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {WAITLIST_ENABLED ? "Start the Journey" : "Plan your future together."}
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400 sm:mt-5 sm:max-w-lg sm:text-lg">
            {WAITLIST_ENABLED
              ? "Join the waitlist for early access to DreamDuo."
              : "DreamDuo is live on Google Play. Install it free and start your first shared dream tonight."}
          </p>

          <div className="mx-auto mt-8 w-full max-w-md sm:mt-10">
            {WAITLIST_ENABLED ? (
              <WaitlistForm />
            ) : (
              <div className="flex flex-col items-center">
                <PlayStoreCTA variant="light" glow placement="footer_cta" />

                <p className="mt-6 text-xs text-slate-400 sm:text-sm">
                  Free to start on Android. iOS is on the way.
                </p>

                {/* Desktop visitors cannot install from a Play link, so hand
                    them the phone instead. Lazy so mobile never fetches it. */}
                <div className="mt-10 hidden flex-col items-center md:flex">
                  <div className="rounded-2xl bg-white p-3 shadow-lg">
                    <Image
                      src="/install-qr.svg"
                      alt="QR code linking to DreamDuo on Google Play"
                      width={132}
                      height={132}
                      unoptimized
                      loading="lazy"
                      className="h-[132px] w-[132px]"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-slate-400">
                    On a computer? Scan to install on your phone.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
