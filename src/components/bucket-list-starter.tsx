import { StoreCTARow } from "@/components/store-cta-row";

export function BucketListStarter() {
  return (
    <aside aria-label="Plan your bucket list with DreamDuo" className="my-10 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-7 sm:p-8">
      <p className="editorial-eyebrow">From “someday” to your next plan</p>
      <h3 className="font-display mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-900">Pick three ideas. Give them a place to live.</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-700">In DreamDuo, make a shared checklist for your bucket list, an amount goal for the trip fund, or a habit for something you want to keep doing together. Both of you can add progress. Free to start on iOS and Android.</p>
      <div className="mt-6"><StoreCTARow placement="bucket_list_starter" /></div>
    </aside>
  );
}
