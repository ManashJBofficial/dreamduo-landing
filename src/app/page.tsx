import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { GoalCategories } from "@/components/goal-categories";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Quote } from "@/components/quote";
import { Showcase } from "@/components/showcase";
import { Testimonials } from "@/components/testimonials";

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
      operatingSystem: "iOS, Android, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "DreamDuo helps couples track shared goals, savings, habits, and milestones in one place.",
      url: "https://dreamduo.app",
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
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      >
        <div className="absolute inset-2 rounded-2xl shadow-[0_0_0_9999px_white] sm:inset-3 sm:rounded-3xl lg:inset-4" />
      </div>

      {/* Scrollable page content - padding matches frame inset */}
      <main id="main-content" className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
        <Navbar />
        <Hero />
        <GoalCategories />
        <Quote />
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
