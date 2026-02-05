"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is DreamDuo free?",
    answer:
      "Yes. The free plan includes 3 active goals, 3 collections, 50MB storage per user, 5 hidden messages (lifetime), basic analytics, and basic notification sounds. Pro unlocks unlimited goals and collections, more storage, advanced analytics, and premium sounds.",
  },
  {
    question: "What if my partner doesn't have the app yet?",
    answer:
      "No problem! You can start using DreamDuo solo and invite your partner anytime with a simple link. Once they join, all your goals sync automatically and you can start building together.",
  },
  {
    question: "Is our data private and secure?",
    answer:
      "Yes. Sensitive data is encrypted at rest on our servers, and we never sell your data.",
  },
  {
    question: "Can we track different types of goals?",
    answer:
      "Yes. You can track 4 goal types: amount/number, checklist, habit, and time.",
  },
  {
    question: "Can we keep some goals private?",
    answer:
      "Yes. Goals can be shared or private, and you can toggle privacy anytime. Private goals are visible only to you.",
  },
  {
    question: "How do Hidden Surprises and Milestone Messages work?",
    answer:
      "Hidden Surprises let you add secret contributions that reveal on a date or milestone. Milestone Messages unlock at 25%, 50%, 75%, or 100% and can include notes or photos.",
  },
];

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-white py-16 sm:py-20 md:py-24 lg:py-32"
    >
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
          {faqs.map((faq) => (
            <FAQAccordionItem key={faq.question} item={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
