import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export function Testimonials() {
  return (
    <section
      id="story"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-rose-50 via-[#fff7f3] to-white py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200/40 to-orange-200/10 blur-3xl" />
      <div className="absolute right-0 top-16 h-80 w-80 translate-x-1/3 rounded-full bg-gradient-to-br from-pink-200/30 to-amber-200/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-200/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">
              Our Story
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
              Built by Couples, for Couples
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              We&apos;re not a corporation. We&apos;re a couple who wanted
              something better &mdash; so we built it with intention, together.
            </p>

            <div className="mt-6 rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-[0_18px_50px_-28px_rgba(244,63,94,0.45)] backdrop-blur sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 shadow-lg shadow-pink-500/25">
                  <Heart className="h-7 w-7 fill-white text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 sm:text-base">
                    The DreamDuo Team
                  </div>
                  <div className="text-[11px] text-slate-400 sm:text-xs">
                    Creators
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                <p>
                  We built DreamDuo because we lived the problem. Spreadsheets
                  for savings, separate apps for habits, no way to actually plan
                  a future <span className="italic">together</span>.
                </p>
                <p>
                  Every feature exists because we wished it existed for us
                  &mdash; shared goals with surprise contributions, daily
                  questions that spark real conversations, streaks that keep you
                  both accountable.
                </p>
                <p className="font-medium text-slate-700">
                  We&apos;re building this for every couple who wants to dream
                  bigger, save smarter, and grow closer. And we want you there
                  from day one.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rose-100 pt-5 sm:mt-7">
                <span className="text-xs font-semibold text-rose-500 sm:text-sm">
                  Help shape DreamDuo before launch.
                </span>
                <Link
                  href="#download"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 transition-colors hover:text-rose-500 sm:text-sm"
                >
                  Get beta invite
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative lg:self-end">
            <div className="absolute -left-6 top-6 hidden h-[70%] w-px bg-gradient-to-b from-rose-200 via-pink-200 to-transparent lg:block" />
            <div className="space-y-5">
              <div className="relative rounded-3xl border border-rose-100 bg-white/90 p-5 shadow-[0_12px_36px_-24px_rgba(244,63,94,0.45)] backdrop-blur sm:p-6">
                <span className="absolute -left-3 top-8 hidden h-3 w-3 rounded-full bg-rose-400 ring-4 ring-rose-100 lg:block" />
                <div className="flex items-start gap-4">
                  <div className="text-sm font-extrabold text-emerald-500">01</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 sm:text-base">
                      Money + goals, synced in one place
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      One shared plan for savings, trips, and milestones, with
                      clear progress both of you can trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl border border-rose-100 bg-white/90 p-5 shadow-[0_12px_36px_-24px_rgba(244,63,94,0.45)] backdrop-blur sm:p-6">
                <span className="absolute -left-3 top-8 hidden h-3 w-3 rounded-full bg-rose-400 ring-4 ring-rose-100 lg:block" />
                <div className="flex items-start gap-4">
                  <div className="text-sm font-extrabold text-sky-500">02</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 sm:text-base">
                      Accountability without the friction
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Gentle reminders, shared streaks, and check-ins keep you
                      aligned without the awkward money talks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl border border-rose-100 bg-white/90 p-5 shadow-[0_12px_36px_-24px_rgba(244,63,94,0.45)] backdrop-blur sm:p-6">
                <span className="absolute -left-3 top-8 hidden h-3 w-3 rounded-full bg-rose-400 ring-4 ring-rose-100 lg:block" />
                <div className="flex items-start gap-4">
                  <div className="text-sm font-extrabold text-amber-500">03</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 sm:text-base">
                      Moments that feel personal, not transactional
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Shared wins, surprise boosts, and thoughtful prompts turn
                      planning into something you both look forward to.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50/70 to-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-rose-500">
                      Our promise
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">
                      Designed for real couples, not dashboards.
                    </div>
                  </div>
                  <div className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600">
                    From us to you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}