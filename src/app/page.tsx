import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { GoalCategories } from "@/components/goal-categories";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Quote } from "@/components/quote";
import { Showcase } from "@/components/showcase";
import { StickyInstallBar } from "@/components/sticky-install-bar";
import { Testimonials } from "@/components/testimonials";
import { WaitlistStrip } from "@/components/waitlist-strip";
import { WAITLIST_ENABLED } from "@/lib/feature-flags";
import { GOOGLE_PLAY_URL } from "@/lib/store-links";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DreamDuo",
      url: "https://dreamduo.app",
      description:
        "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DreamDuo",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android",
      installUrl: GOOGLE_PLAY_URL,
      downloadUrl: GOOGLE_PLAY_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        url: GOOGLE_PLAY_URL,
      },
      description:
        "DreamDuo helps couples track shared goals, savings, habits, and milestones in one place.",
      url: "https://dreamduo.app",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DreamDuo",
      url: "https://dreamduo.app",
      logo: "https://dreamduo.app/opengraph-image",
      description:
        "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
      sameAs: [GOOGLE_PLAY_URL],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@dreamduo.app",
        contactType: "customer support",
      },
    },
  ];

  return (
    <>
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
        className="pointer-events-none fixed inset-0 z-40"
      >
        <div 
          className="absolute inset-2 rounded-2xl sm:inset-3 sm:rounded-3xl lg:inset-4" 
          style={{ boxShadow: '0 0 0 9999px white' }}
        />
      </div>

      {/* Scrollable page content - padding matches frame inset */}
      <main id="main-content" className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
        <Navbar />
        <Hero />
        <GoalCategories />
        <Quote />
        {WAITLIST_ENABLED ? <WaitlistStrip /> : null}
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>

      <StickyInstallBar />
    </>
  );
}
