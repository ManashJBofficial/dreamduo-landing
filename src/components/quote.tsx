// Concrete things the app actually does, in the words a person would use.
// Anything abstract ("plan with clarity", "what matters most") reads as filler.
const marqueeItems = [
  "Two people, one plan",
  "Some dreams stay just yours",
  "A little thinking of you",
  "Photos and links, saved together",
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

      <section className="home-section home-dark bg-slate-900 py-14 sm:py-16 md:py-20">
        <div className="site-container text-center">
          {/* Not a quotation, so no quote marks and no implied speaker we
              would have to invent. */}
          <p className="home-quote mx-auto max-w-3xl text-balance font-serif">
            Some things are too important to leave in a chat.
          </p>


          <div className="mx-auto mt-7 h-0.5 w-12 rounded-full bg-rose-400 sm:w-16" />
        </div>
      </section>
    </>
  );
}
