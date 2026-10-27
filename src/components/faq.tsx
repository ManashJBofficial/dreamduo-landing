import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is DreamDuo available right now?",
    answer:
      "Yes. Download it free on iPhone or Android.",
  },
  {
    question: "Is DreamDuo free to use?",
    answer:
      "Yes. Start free with 3 active dreams and 100MB of storage per person. Pro adds unlimited dreams, more storage, and extra features.",
  },
  {
    question: "What if my partner doesn't have the app yet?",
    answer:
      "Start solo and invite them anytime with a simple link. Once they join, your shared dreams sync automatically.",
  },
  {
    question: "Is our data private and secure?",
    answer:
      "Yes. Sensitive data is encrypted at rest on our servers, and we never sell your data.",
  },
  {
    question: "Can we track different types of dreams?",
    answer:
      "Yes: amount, checklist, habit, and time.",
  },
  {
    question: "Can we keep some dreams private?",
    answer:
      "Yes. Any dream can be shared or private, and you can switch anytime. Private dreams are visible only to you.",
  },
  {
    question: "How do Hidden Surprises and Milestone Messages work?",
    answer:
      "Secret contributions reveal on your chosen date or milestone. Notes and photos can unlock at 25%, 50%, 75%, or 100% progress.",
  },
];


const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question", name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="home-section scroll-mt-16 bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="site-container">
        <div className="text-center">
          <span className="home-eyebrow text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">Questions?</span>
          <h2 className="home-heading mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:mt-4 sm:text-4xl md:text-5xl">Frequently Asked</h2>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white px-5 shadow-sm sm:mt-8 sm:rounded-3xl sm:px-7 md:px-8">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="dreamduo-faq" open={index === 0} className="group border-b border-slate-100 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-left sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="home-label pr-4 text-sm font-semibold text-slate-800 sm:text-base md:text-lg">{faq.question}</span>
                <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 sm:h-5 sm:w-5" />
              </summary>
              <p className="home-body pb-4 pr-8 text-sm leading-relaxed text-slate-500 sm:pb-5 sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
