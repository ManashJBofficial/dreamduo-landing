"use client";

import { useState } from "react";

const categories = ["Travel", "Accommodation", "Local transport", "Food", "Activities", "Buffer"];

export function VisitBudget() {
  const [amounts, setAmounts] = useState<string[]>(categories.map(() => ""));
  const [saved, setSaved] = useState("");
  const total = amounts.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const remaining = Math.max(0, total - Math.max(0, Number(saved) || 0));
  const format = (value: number) => value.toLocaleString("en", { maximumFractionDigits: 2 });
  return <fieldset className="my-8 rounded-2xl border border-rose-200 p-5 sm:p-6">
    <legend className="px-2 text-lg font-bold text-slate-900">Build your visit budget</legend>
    <p className="!mt-0 !text-sm">Use one currency for every amount. Entries stay in this page only and clear on reload. Nothing is sent or saved.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">{categories.map((category, index) => <label key={category} className="block text-sm font-semibold text-slate-800">{category}<input aria-label={`${category} budget`} type="number" min="0" step="0.01" inputMode="decimal" placeholder="0" value={amounts[index]} onChange={event => setAmounts(current => current.map((value, i) => i === index ? event.target.value : value))} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 focus:outline-2 focus:outline-rose-700" /></label>)}</div>
    <label className="mt-5 block text-sm font-semibold text-slate-800">Already set aside<input type="number" min="0" step="0.01" inputMode="decimal" placeholder="0" value={saved} onChange={event => setSaved(event.target.value)} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 focus:outline-2 focus:outline-rose-700" /></label>
    <p role="status" aria-live="polite" className="!mt-5 !text-base font-bold !text-slate-900">Total: {format(total)} · Still to set aside: {format(remaining)}</p>
  </fieldset>;
}
