import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { AppStoreCTA } from "@/components/app-store-cta";
import { PlayStoreCTA } from "@/components/playstore-cta";
import { getComparisons } from "@/lib/blog";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Site-wide footer. Beyond navigation, it is the one place every page links
 * to every comparison and guide, which is what lets a crawler landing anywhere
 * find the whole content cluster, and what spreads authority across it.
 *
 * Reads the comparison list from disk at build time, so it must stay a server
 * component. Adding a file to src/content/compare adds its footer link.
 */
export function Footer() {
  const columns: { title: string; links: FooterLink[]; more?: FooterLink }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Shared dreams", href: "/#dreams" },
        { label: "Our story", href: "/#story" },
        { label: "FAQ", href: "/#faq" },
        { label: "Get it on Google Play", href: getPlayStoreUrl("footer"), external: true },
        { label: "Download on the App Store", href: getAppStoreUrl("footer"), external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Best couples apps in 2026", href: "/blog/the-5-best-couples-apps-in-2026-compared-honestly" },
        { label: "Long-distance care packages", href: "/blog/25-best-items-to-put-in-a-long-distance-care-package" },
        { label: "RSS feed", href: "/blog/rss.xml" },
        { label: "How we write our guides", href: "/editorial-policy" },
        { label: "Contact support", href: "mailto:support@dreamduo.app" },
      ],
    },
    {
      title: "Compare",
      links: getComparisons().map((c) => ({
        label: `DreamDuo vs. ${c.competitor ?? c.title}`,
        href: `/compare/${c.slug}`,
      })),
      more: { label: "All comparisons", href: "/compare" },
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms" },
        { label: "Delete account", href: "/account-deletion" },
        { label: "Delete data", href: "/data-deletion" },
      ],
    },
  ];

  const linkClass = "text-sm text-slate-400 transition-colors hover:text-white";

  return (
    <footer className="rounded-b-2xl bg-slate-950 px-5 pb-10 pt-14 sm:rounded-b-3xl sm:px-8 lg:px-12 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BrandMark className="h-9 w-9" iconClassName="h-4 w-4" />
              <span className="text-lg font-bold tracking-tight text-white">DreamDuo</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Plan your future together. Shared goals, savings and daily check-ins for couples.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {/* The compact Play button is slate-950, the same as this footer,
                so it gets a lighter glass fill here or it disappears. */}
            <PlayStoreCTA
              variant="compact"
              placement="footer"
              label="Google Play"
              className="border-white/15 bg-white/10 hover:bg-white/20"
            />
            <AppStoreCTA variant="compact" placement="footer" label="App Store" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener" className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {column.more && (
                  <li>
                    <Link
                      href={column.more.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-300 transition-colors hover:text-rose-200"
                    >
                      {column.more.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>&copy; {new Date().getFullYear()} DreamDuo Inc. All rights reserved.</p>
          <a href="mailto:support@dreamduo.app" className="transition-colors hover:text-slate-300">
            support@dreamduo.app
          </a>
        </div>
      </div>
    </footer>
  );
}
