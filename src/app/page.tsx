import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";
import { FeatureHighlights } from "@/components/feature-highlights";
import { Footer } from "@/components/footer";
import { GoalCategories } from "@/components/goal-categories";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Showcase } from "@/components/showcase";
import { StickyInstallBar } from "@/components/sticky-install-bar";
import { Testimonials } from "@/components/testimonials";
import { WaitlistStrip } from "@/components/waitlist-strip";
import { WAITLIST_ENABLED } from "@/lib/feature-flags";
import { GOOGLE_PLAY_URL, APP_STORE_URL } from "@/lib/store-links";
import { HOMEPAGE_DESCRIPTION } from "@/lib/homepage-copy";
import heroStyles from "@/components/hero.module.css";
import "./home.css";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DreamDuo",
      alternateName: "Dream Duo",
      url: "https://dreamduo.app",
      description: HOMEPAGE_DESCRIPTION,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DreamDuo",
      applicationCategory: "LifestyleApplication",
      // Both platforms since the iOS launch on 2026-09-15. Schema.org takes a
      // comma-separated list here; installUrl keeps Play as the canonical
      // install link while the App Store URL is listed alongside.
      operatingSystem: "Android, iOS",
      installUrl: [GOOGLE_PLAY_URL, APP_STORE_URL],
      downloadUrl: [GOOGLE_PLAY_URL, APP_STORE_URL],
      featureList: ["Daily questions", "Nudges", "Shared goals and plans"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        url: GOOGLE_PLAY_URL,
      },
      description: HOMEPAGE_DESCRIPTION,
      url: "https://dreamduo.app",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://dreamduo.app/#organization",
      name: "DreamDuo",
      url: "https://dreamduo.app",
      logo: "https://dreamduo.app/dreamduo-logo.webp",
      description: HOMEPAGE_DESCRIPTION,
      sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@dreamduo.app",
        contactType: "customer support",
      },
    },
  ];

  return (
    <div className="home-page">
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fixed rounded frame overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      >
        <div
          className="absolute inset-2 rounded-2xl sm:inset-3 sm:rounded-3xl lg:inset-4"
          style={{ boxShadow: "0 0 0 32px white" }}
        />
      </div>

      {/* Scrollable page content - padding matches frame inset */}
      <main id="main-content" className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
        <div className={heroStyles.surface}>
          <Navbar />
          <Hero />
        </div>
        <FeatureHighlights />
        <GoalCategories />
        {WAITLIST_ENABLED ? <WaitlistStrip /> : null}
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>

      <StickyInstallBar />
    </div>
  );
}
