"use client";

import { useCampaign } from "@/lib/campaign-attribution";
import { WAITLIST_ENABLED } from "@/lib/feature-flags";
import { StoreCTARow } from "@/components/store-cta-row";
import { WaitlistForm } from "@/components/waitlist-form";
import { BrandMark } from "@/components/brand-mark";
import { DownloadQrCode } from "@/components/download-qr-code";
import { QrVisibility } from "@/components/qr-visibility";
import { getDownloadQrUrl } from "@/lib/download-links";

export function CTA() {
  const qrUrl = getDownloadQrUrl(useCampaign("footer_cta"));

  return (
    <section
      id="download"
      className="home-dark relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 sm:rounded-t-3xl"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-500/10 to-transparent blur-3xl sm:h-[400px] sm:w-[600px]" />

      <div className="site-container home-section relative py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <BrandMark
            glow
            className="mb-4 h-14 w-14 sm:mb-5 sm:h-16 sm:w-16"
            iconClassName="h-7 w-7 sm:h-8 sm:w-8"
          />

          {/* Heading */}
          <h2 className="home-heading font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {WAITLIST_ENABLED ? "Start the Journey" : "Plan your future together."}
          </h2>

          {/* Subtext */}
          <p className="home-body mt-4 max-w-md sm:mt-5 sm:max-w-lg">
            {WAITLIST_ENABLED
              ? "Join the waitlist for early access to DreamDuo."
              : "Start your first shared dream. Free on iPhone and Android."}
          </p>

          <div className="mx-auto mt-6 w-full max-w-md sm:max-w-2xl">
            {WAITLIST_ENABLED ? (
              <WaitlistForm />
            ) : (
              <div className="flex flex-col items-center">
                <StoreCTARow variant="light" placement="footer_cta" />


                {/* One code routes each scanned device directly to its store. */}
                <QrVisibility>
                  <div className="mt-6 flex flex-col items-center">
                    <a href={qrUrl} aria-label="Download DreamDuo for iPhone or Android" className="rounded-2xl bg-white p-2 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-300">
                      <DownloadQrCode value={qrUrl} size={152} />
                    </a>
                    <p className="home-small mt-4">
                      Scan to get the app.
                    </p>
                  </div>
                </QrVisibility>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
