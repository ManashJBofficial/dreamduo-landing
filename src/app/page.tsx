import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { GoalCategories } from "@/components/goal-categories";
import { Quote } from "@/components/quote";
import { Showcase } from "@/components/showcase";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DreamDuo",
    url: "https://dreamduo.app",
    description:
      "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
    publisher: {
      "@type": "Organization",
      name: "DreamDuo",
      url: "https://dreamduo.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Fixed rounded frame overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <div className="absolute inset-2 rounded-2xl shadow-[0_0_0_9999px_white] sm:inset-3 sm:rounded-3xl lg:inset-4" />
      </div>

      {/* Scrollable page content — padding matches frame inset */}
      <div className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
        <Navbar />
        <Hero />
        <GoalCategories />
        <Quote />
        <Showcase />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
