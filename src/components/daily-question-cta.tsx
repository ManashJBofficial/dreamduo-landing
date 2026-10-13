import { StoreCTARow } from "@/components/store-cta-row";

export function DailyQuestionCTA() {
  return (
    <aside aria-label="Try daily questions in DreamDuo" className="my-10 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-7 sm:p-8">
      <p className="editorial-eyebrow">Intimacy, Desire &amp; Closeness</p>
      <h3 className="font-display mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900">Go beyond the questions you already know.</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-700">DreamDuo&apos;s adult question bank explores feeling wanted, flirting, fantasies and saying what you want. You both answer privately, then see each other&apos;s answers.</p>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">Adult questions require both partners to be age verified. Some packs unlock through streaks or Pro. The app is free to start on iOS and Android.</p>
      <div className="mt-6"><StoreCTARow placement="long_distance_questions" /></div>
    </aside>
  );
}
