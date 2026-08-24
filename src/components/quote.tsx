// Concrete things the app actually does, in the words a person would use.
// Anything abstract ("plan with clarity", "what matters most") reads as filler.
const marqueeItems = [
  "Give the dream a number and a date",
  "See how close you actually are",
  "Hide a note they unlock at 75%",
  "One question a day, you both answer",
  "Some dreams stay just yours",
  "Nudge them without nagging",
  "Photos, links and receipts in one place",
  "Two people, one plan",
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

      <section className="bg-slate-900 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Not a quotation, so no quote marks and no implied speaker we
              would have to invent. */}
          <p className="text-balance font-serif text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Some things are too important to leave in a chat.
          </p>

          <p className="mx-auto mt-4 max-w-lg text-balance text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
            Keep the plans you&apos;re building together in one place.
          </p>

          <div className="mx-auto mt-7 h-0.5 w-12 rounded-full bg-rose-400 sm:w-16" />
        </div>
      </section>
    </>
  );
}
