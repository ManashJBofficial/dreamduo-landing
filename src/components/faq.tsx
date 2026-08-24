"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is DreamDuo available right now?",
    answer:
      "Yes. DreamDuo is live on Google Play and free to download today. iOS is planned for a later release.",
  },
  {
    question: "Is DreamDuo free to use?",
    answer:
      "Yes. The free plan gives you 3 active dreams, 3 collections, 100MB of storage per person, 5 hidden messages, and basic analytics and sounds. Pro unlocks unlimited dreams and collections, 2GB of storage per person, advanced analytics, and premium sounds.",
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
      "Yes. Track 4 dream types, amount or number, checklist, habit, and time, so you can match the format to what you're working toward.",
  },
  {
    question: "Can we keep some dreams private?",
    answer:
      "Yes. Any dream can be shared or private, and you can switch anytime. Private dreams are visible only to you.",
  },
  {
    question: "How do Hidden Surprises and Milestone Messages work?",
    answer:
      "Hidden Surprises let you add secret contributions that reveal on a chosen date or milestone. Milestone Messages unlock at 25%, 50%, 75%, or 100% progress, and can include notes or photos.",
  },
];

interface FAQAccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

function FAQAccordionItem({ item, index, isOpen, onToggle }: FAQAccordionItemProps) {
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-rose-500 sm:py-5"
      >
        <span className="pr-4 text-sm font-semibold text-slate-800 sm:text-base md:text-lg">
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 sm:h-5 sm:w-5 ${
            isOpen ? "rotate-180 text-rose-400" : ""
          }`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-4 sm:pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-8 text-sm leading-relaxed text-slate-500 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    []
  );

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-white py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">
            Questions?
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:mt-4 sm:text-4xl md:text-5xl">
            Frequently Asked
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:mt-5 sm:text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-10 rounded-2xl border border-slate-100 bg-white px-5 shadow-sm sm:mt-14 sm:rounded-3xl sm:px-7 md:px-8 lg:mt-16">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={faq.question}
              item={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={(nextIndex) =>
                setOpenIndex((current) => (current === nextIndex ? -1 : nextIndex))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
