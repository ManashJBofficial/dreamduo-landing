import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EditorialBanner } from "@/components/editorial-banner";

const title = "How to Read Our Guides and Comparisons";
const description = "Who publishes the DreamDuo journal, how our comparisons use sources, what our examples represent, and how to report a correction.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: { title, description, url: "/editorial-policy", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function EditorialPolicyPage() {
  return <main className="min-h-screen bg-white px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
    <Navbar />
    <EditorialBanner seed="dreamduo-journal">
      <p className="editorial-eyebrow mb-6">About the journal</p>
      <h1 className="editorial-title">How to read our guides and comparisons.</h1>
      <p className="editorial-deck">Our relationship to DreamDuo, the sources behind app comparisons, and the limits of our examples.</p>
    </EditorialBanner>
    <div className="editorial-shell py-12"><div className="editorial-prose mx-auto max-w-3xl space-y-8 text-base leading-8 text-slate-600">
      <section id="author" className="scroll-mt-28">
        <div className="relative mb-6 mt-10 flex min-h-28 items-center rounded-2xl bg-[#f2d7da] py-4 pl-28 pr-4 sm:pl-44">
          <div className="absolute bottom-0 left-1 h-32 w-24 sm:left-3 sm:h-40 sm:w-36"><Image src="/blog/authors/manash-jyoti-baruah-cutout.webp" alt="Portrait of Manash Jyoti Baruah" width={400} height={400} sizes="(max-width: 640px) 96px, 144px" className="h-full w-full object-cover object-bottom" /></div>
          <div><h2 className="font-display text-xl font-bold leading-tight text-slate-900 sm:text-2xl">Manash Jyoti Baruah</h2><p className="mt-1 text-sm text-slate-600">Founder, DreamDuo</p></div>
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900">Who publishes the blog</h3>
        <p className="mt-3">DreamDuo publishes this journal. Its articles are attributed to Manash Jyoti Baruah, founder of DreamDuo. We make the app that appears in our guides and comparisons, so these are publisher-owned resources rather than independent reviews.</p>
      </section>
      <section><h2 className="font-display text-2xl font-bold text-slate-900">Product facts and prices</h2>
        <p className="mt-3">Our current app comparisons link to official product pages, help centres and store listings, and state when the sources were checked. They describe published features; they do not claim hands-on testing of every competitor. “Not listed” means a feature was not found in the cited sources, not that it cannot exist.</p>
        <p className="mt-3">Prices can vary by region, platform, offer and billing period. The price and renewal terms shown at checkout apply to your purchase. Source dates and article update dates help you judge how current a comparison is.</p>
      </section>
      <section><h2 className="font-display text-2xl font-bold text-slate-900">Examples, photographs and intimacy content</h2>
        <p className="mt-3">Savings plans and completed planning examples are illustrative, not customer results or estimates of travel costs. Stock photographs illustrate a topic and are credited; they are not presented as DreamDuo users or testimonials. Product screenshots are labelled separately.</p>
        <p className="mt-3">Adult intimacy questions are identified as 18+ content. Both partners can skip a question, set a boundary or stop. The article explains question-bank access requirements rather than promising every question is available in a daily session.</p>
      </section>
      <section><h2 className="font-display text-2xl font-bold text-slate-900">Report a correction</h2>
        <p className="mt-3">If you find an outdated price, a broken source or an inaccurate product detail, email <a href="mailto:support@dreamduo.app" className="font-semibold text-rose-700 underline underline-offset-4">support@dreamduo.app</a> with the article URL and the detail you want us to check.</p>
      </section>
      <Link href="/blog" className="inline-flex font-semibold text-rose-700 underline underline-offset-4">Browse the journal</Link>
    </div></div>
    <Footer />
  </main>;
}
