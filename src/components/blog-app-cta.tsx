import { BrandMark } from "@/components/brand-mark";
import { StoreCTARow } from "@/components/store-cta-row";

/**
 * End-of-article conversion block — the part that turns the blog into a
 * distribution channel rather than just content. Placed after the body and the
 * tags, so it never interrupts the read, and it reuses the same store buttons
 * as the rest of the site so install tracking stays in one place.
 */
export function BlogAppCTA() {
  return (
    <aside id="try-dreamduo" className="relative mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-6 py-10 text-center sm:rounded-3xl sm:px-10 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-500/30 via-fuchsia-500/20 to-amber-400/20 blur-3xl"
      />

      <div className="relative">
        <BrandMark
          glow
          className="mx-auto mb-5 h-12 w-12"
          iconClassName="h-6 w-6"
        />

        <h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
          Try it with your partner
        </h2>

        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-400">
          DreamDuo keeps your shared goals, savings, habits, and daily check-ins
          in one place you both actually open. Free to start.
        </p>

        <div className="mt-7 flex justify-center">
          <StoreCTARow variant="light" placement="blog_article" />
        </div>
      </div>
    </aside>
  );
}
