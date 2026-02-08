import { TrendingUp } from "lucide-react";

const marqueeItems = [
  "Build goals side by side",
  "Plan your future with clarity",
  "Track progress as a team",
  "Save for what matters most",
  "Stay connected with daily check-ins",
  "Celebrate each milestone together",
  "Keep personal goals private",
  "Made for real couples",
];

export function Quote() {
  return (
    <>
      <div className="marquee-bar" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {marqueeItems.map((item, index) => (
                <div className="marquee-item" key={`${group}-${item}-${index}`}>
                  <span className="marquee-text">{item}</span>
                  <span className="marquee-dot" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-slate-900 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <TrendingUp className="mx-auto h-6 w-6 text-rose-400 sm:h-7 sm:w-7" />
          <blockquote className="mt-6 font-serif text-xl font-bold leading-snug text-white sm:mt-8 sm:text-2xl md:text-3xl lg:text-4xl">
            &ldquo;Spreadsheets don&apos;t understand your relationship.
            <br />
            <span className="text-slate-400">
              Generic apps don&apos;t know you&apos;re a team.&rdquo;
            </span>
          </blockquote>
          <div className="mx-auto mt-6 h-0.5 w-12 rounded-full bg-rose-400 sm:mt-8 sm:w-16" />
        </div>
      </section>
    </>
  );
}
