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
  return (
    <>
      {/* Fixed rounded frame overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <div className="absolute inset-3 rounded-2xl shadow-[0_0_0_9999px_white] sm:inset-4 sm:rounded-3xl lg:inset-5" />
      </div>

      {/* Scrollable page content — padding matches frame inset */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
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
