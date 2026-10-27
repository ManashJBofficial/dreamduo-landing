"use client";

import { useState } from "react";

export function TextQuestionPicker({ questions }: { questions: string[] }) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("");
  const question = questions[index % questions.length];

  async function copy() {
    try {
      await navigator.clipboard.writeText(question);
      setStatus("Question copied.");
    } catch {
      setStatus("Copy is unavailable. Select the question text to copy it manually.");
    }
  }

  return <section aria-labelledby="text-question-picker-title" className="my-8 rounded-2xl border border-rose-100 bg-white p-5 sm:p-7">
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h3 id="text-question-picker-title" className="font-display text-xl font-bold text-slate-900 sm:text-2xl">Pick a question</h3>

    </div>
    <p aria-live="polite" aria-atomic="true" className="!mb-5 !mt-5 select-text !text-xl font-semibold !leading-snug !text-slate-900 sm:!text-2xl">{question}</p>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
        <button type="button" onClick={() => { setIndex(current => (current + 1) % questions.length); setStatus(""); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-rose-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700">Next question<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden shrink-0 sm:block"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
        <button type="button" onClick={copy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-700">Copy question</button>
      </div>
      <span className="text-xs font-medium text-slate-500">{index % questions.length + 1} of {questions.length}</span>
    </div>
    <p role="status" className={status ? "!mt-3 !text-sm !text-slate-600" : "sr-only"}>{status}</p>
    <noscript><p>The full list of all 35 questions is available below without JavaScript.</p></noscript>
  </section>;
}
