import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is DreamDuo?",
    answer:
      "DreamDuo is an app for couples. Answer a daily question, send a hug or a quick “miss you,” and keep a shared bucket list or trip plan you can both update.",
  },
  {
    question: "How do daily questions work in DreamDuo?",
    answer:
      "You each answer the same question privately. Once you’ve both replied, you can see both answers.",
  },
  {
    question: "Is DreamDuo available right now?",
    answer:
      "Yes. Download it free on iPhone or Android.",
  },
  {
    question: "Is DreamDuo free to use?",
    answer:
      "Yes. You can start with the free plan. Pro adds unlimited dreams, more storage, and extra features. One Pro plan covers both partners. Check the app for current limits and plan details.",
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
      "Yes. You can create shared or private dreams. Private dreams are visible only to you.",
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
          <h2 className="home-heading font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">Frequently asked questions</h2>
        </div>
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-100 bg-white px-5 shadow-sm sm:mt-8 sm:rounded-3xl sm:px-7 md:px-8">
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
