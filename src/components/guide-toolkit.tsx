import Image from "next/image";
import type { ReactNode } from "react";
import calendar from "@/content/assets/daily-question-calendar.json";
import checklist from "@/content/assets/visit-checklist.json";
import { StoreCTARow } from "@/components/store-cta-row";
import { getLocalImageSize } from "@/lib/images";

export function QuestionCalendar() {
  return <div className="my-8 space-y-8">{calendar.map((group, index) => <section key={group.category} aria-label={group.category}>
    <p className="!mt-0 !text-sm font-bold uppercase tracking-wide !text-rose-700">Days {index * 6 + 1}–{index * 6 + 6} · {group.category}</p>
    <ol start={index * 6 + 1} className="mt-4 list-decimal space-y-4 pl-7 text-[17px] leading-relaxed text-slate-800 marker:font-bold marker:text-rose-700">
      {group.prompts.map(prompt => <li key={prompt} className="pl-2">{prompt}</li>)}
    </ol>
  </section>)}</div>;
}

export function VisitChecklist() {
  return <div className="my-8 space-y-6">
    <p className="!text-sm">Tick items as you plan. These checks stay in this page only and clear on reload; use the editable download to keep a copy.</p>
    {checklist.map(group => <fieldset key={group.when} className="rounded-xl border border-slate-200 p-5">
      <legend className="px-2 text-lg font-bold text-slate-900">{group.when}: {group.title}</legend>
      <div className="space-y-4">{group.tasks.map(task => <label key={task} className="flex cursor-pointer items-start gap-3 text-[17px] leading-relaxed text-slate-700">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-rose-700" /><span>{task}</span>
      </label>)}</div>
    </fieldset>)}
  </div>;
}

const visuals = {
  calendar: { title: "One question. A new conversation.", description: "30 days, five conversation categories. All 30 prompts are listed below.", slug: "30-daily-questions-for-long-distance-couples-when-you-run-out-of-things-to-say", file: "conversation-calendar.svg", rows: calendar.map((group, i) => [`Days ${i * 6 + 1}–${i * 6 + 6}`, group.category]) },
  visit: { title: "Your next visit, one step at a time.", description: "A sample four-week sequence. Start earlier when your trip needs it.", slug: "how-to-plan-your-next-long-distance-visit-free-checklist-budget", file: "visit-timeline.svg", rows: checklist.map(group => [group.when, group.title]) },
  facetime: { title: "What are you up for tonight?", description: "Pick one setup that fits your energy. Instructions and supplies are listed below.", slug: "25-things-to-do-on-facetime-with-your-partner-when-you-re-bored", file: "facetime-activity-menu.svg", rows: [["Draw", "Paper and a pen. One minute, no looking at the page."], ["Cook", "An easy recipe. Different kitchens, same first step."], ["Ask", "One question. Both answer, then ask a follow-up."], ["Watch", "A title you can both access. Check it before date night."], ["Plan", "One future adventure. Choose a small first step."]] },
  timezones: { title: "Find the overlap before booking a call.", description: "Reference: November 9, 2026. Assume work 09:00–17:00 and sleep 23:00–07:00 in each place.", slug: "long-distance-relationships-in-different-time-zones-3-weekly-routines", file: "time-zone-overlap.svg", rows: [["3 hours · Accra / Nairobi", "Free weekday overlap: 17:00–20:00 in Accra, 20:00–23:00 in Nairobi."], ["6 hours · London / Dhaka", "No free weekday overlap. A lunch call is optional if both schedules allow it."], ["10 hours · London / Brisbane", "Try 08:00 London / 18:00 Brisbane, or 21:00 London / 07:00 Brisbane the next day."]] },
  checkin: { title: "A little time to hear each other.", description: "A suggested 15-minute plan. Use the questions as a menu.", slug: "15-minute-weekly-relationship-check-in-12-questions-template", file: "weekly-check-in-outline.svg", rows: [["2 minutes · Appreciation", "Name a specific moment you valued."], ["3 minutes · Feelings", "Listen before trying to fix anything."], ["3 minutes · Practical needs", "Ask for help or space for the week ahead."], ["4 minutes · One challenge", "Choose one issue, not the whole history."], ["3 minutes · Next step", "One action, one owner, one time to return."]] },
};

export function GuideVisual({ kind }: { kind: keyof typeof visuals }) {
  const visual = visuals[kind];
  const src = `/blog/${visual.slug}/${visual.file}`;
  return <figure className="my-8">
    <div className="hidden sm:block"><Image src={src} alt={`${visual.title} ${visual.description}`} {...getLocalImageSize(src)} sizes="(max-width: 1024px) 100vw, 54rem" loading="lazy" className="h-auto w-full rounded-xl" /></div>
    <div className="rounded-xl bg-[#fff9f6] p-4 sm:hidden">
      <p className="!mt-0 !text-lg font-bold !leading-snug !text-slate-900">{visual.title}</p>
      <p className="!mt-2 !text-sm !leading-relaxed">{visual.description}</p>
      <dl className="mt-4 space-y-3">{visual.rows.map(([label, detail], i) => <div key={label} className="rounded-lg px-4 py-3" style={{ backgroundColor: ["#fbe3eb", "#f6e8d6", "#e3eee8", "#eae5f2", "#f6e0d8"][i] }}>
        <dt className="text-base font-bold leading-snug text-slate-900">{label}</dt>
        <dd className="mt-1 text-base leading-relaxed text-slate-700">{detail}</dd>
      </div>)}</dl>
    </div>
    <figcaption className="mt-3 hidden text-sm leading-relaxed text-slate-600 sm:block">{visual.description}</figcaption>
  </figure>;
}

export function GuideDownloads({ name, title }: { name: string; title: string }) {
  return <aside aria-label={title} className="my-8 rounded-2xl border border-rose-200 bg-rose-50/50 p-5 sm:p-6">
    <p className="!mt-0 !text-lg font-bold !text-slate-900">{title}</p>
    <p className="!mt-2 !text-sm">No signup. Save the editable text or print the PDF.</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <a href={`/downloads/${name}.pdf`} download className="rounded-lg bg-rose-700 px-4 py-3 text-sm font-bold text-white hover:bg-rose-800">Download PDF</a>
      <a href={`/downloads/${name}.txt`} download className="rounded-lg border border-rose-200 bg-white px-4 py-3 text-sm font-bold text-rose-800 hover:bg-rose-50">Editable text</a>
      <a href={`/downloads/${name}.html`} target="_blank" rel="noopener" className="px-1 py-3 text-sm font-bold text-rose-800 underline underline-offset-4">Print in browser</a>
    </div>
  </aside>;
}

const screens = {
  questions: { file: "/dreamduo-daily-conversations.webp", alt: "DreamDuo Questions screen with one prompt and both partners' answers", caption: "DreamDuo’s Questions screen. This example shows a different prompt from the 30-day collection." },
  dreams: { file: "/blog/best-couples-apps/dreamduo-dreams-screen.webp", alt: "DreamDuo Dreams screen showing shared plans", caption: "An existing DreamDuo Dreams screen, shown as a product example. Your goals and amounts will differ." },
  milestones: { file: "/dreamduo-milestones-phone.webp", alt: "DreamDuo shared dream with progress, tasks and milestone steps", caption: "An existing DreamDuo shared-dream screen. The example is not a travel budget or a promise of savings." },
};

export function GuideProduct({ screen, title, children, placement }: { screen: keyof typeof screens; title: string; children: ReactNode; placement: string }) {
  const image = screens[screen];
  return <aside aria-label="How this works in DreamDuo" className="my-10 grid items-center gap-6 rounded-2xl bg-[#fff4f6] p-5 sm:grid-cols-[1fr_160px] sm:p-7">
    <div><p className="!mt-0 !text-xs font-bold uppercase tracking-widest !text-rose-700">In DreamDuo</p>
      <h3 className="font-display mt-3 text-2xl font-bold leading-tight text-slate-900">{title}</h3>
      <div className="text-slate-700">{children}</div>
      <div className="mt-5"><StoreCTARow placement={placement} /></div>
    </div>
    <figure className="mx-auto w-full max-w-[160px]">
      <Image src={image.file} alt={image.alt} {...getLocalImageSize(image.file)} sizes="160px" loading="lazy" className="h-auto w-full" />
      <figcaption className="mt-3 text-xs leading-relaxed text-slate-600">{image.caption}</figcaption>
    </figure>
  </aside>;
}

export function CheckInWorksheet() {
  return <fieldset className="my-8 space-y-5 rounded-2xl border border-rose-200 p-5 sm:p-6">
    <legend className="px-2 text-lg font-bold text-slate-900">Your next check-in</legend>
    <p className="!mt-0 !text-sm">Type here during your conversation. Entries stay in this page only and clear on reload; save your own copy with the downloads below.</p>
    {[
      ["Appreciation", "One thing we each appreciated this week"],
      ["Feelings", "How each of us is arriving today"],
      ["Practical needs", "What would help each person next week"],
      ["One challenge", "One specific issue to revisit, without blame"],
      ["Our next step", "One action, who owns it, and when we will check back"],
    ].map(([title, hint], index) => <label key={title} htmlFor={`check-in-${index}`} className="block text-base font-semibold text-slate-900">{title}<textarea id={`check-in-${index}`} rows={3} placeholder={hint} className="mt-2 block w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-base font-normal text-slate-800 placeholder:text-slate-500 focus:outline-2 focus:outline-rose-700" /></label>)}
  </fieldset>;
}
