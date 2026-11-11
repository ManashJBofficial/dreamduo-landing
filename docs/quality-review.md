# Image, SEO and Lighthouse verification — November 12, 2026

## Result

The production-build crawl found **zero missing or empty image alts across 281 image instances in 43 HTML documents**, including downloadable HTML resources. Existing MDX rendering also fails the build when an editorial image has no descriptive alt. No replacement or keyword-stuffed alt text was needed.

Current Lighthouse scores are **100 for SEO, accessibility and best practices** on the homepage, target spicy-questions article and download page, on both mobile and desktop. Desktop performance is also 100 on all three. Mobile performance remains below 100; the paired runs below show no category-score regression from the pre-change build.

| Page | Mobile performance before → after | Desktop performance before → after | Accessibility / best practices / SEO, both devices |
| --- | --- | --- | --- |
| Home | 97 → 98 | 100 → 100 | 100 / 100 / 100 |
| Spicy-questions article | 99 → 99 | 100 → 100 | 100 / 100 / 100 |
| Download | 99 → 99 | 100 → 100 | 100 / 100 / 100 |

These are one paired set of local lab runs, not a statistical performance experiment or a permanent score guarantee. Home mobile LCP was 2.4s before and 2.0s after; article LCP stayed 1.8s; download LCP varied from 1.7s to 2.0s while its performance category stayed 99. All mobile CLS results after the changes were 0. The small score/timing differences cannot all be attributed to the code changes.

## Verified improvements

1. Lighthouse identified homepage QR links whose accessible names omitted their visible captions. `CampaignQrLink` now includes the actual caption in its accessible name. The desktop `label-content-name-mismatch` finding was removed without changing visible copy, QR destinations or campaign parameters.
2. The CTA impression provider was initialized in the root layout, including pages with no article impressions. It now wraps blog-post pages, where those impressions are used. Homepage and download store-click tracking still use the existing analytics dispatch. Article impression deduplication, route-return behavior and event parameters were verified after the move.

Source files changed:

- `src/app/layout.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/campaign-qr-link.tsx`

No page titles, canonical URLs, indexing rules, successful article URLs, store URLs, image assets or visual CTA layouts were changed in this follow-up.

## Audit method and saved evidence

- Production Next.js build, with the normal configured Google Analytics library enabled. No analytics blocking, storage/cache warming, excluded audits, delayed tracking or audit-agent detection was used to raise scores.
- Lighthouse 13.0.0; headless Edge/Chromium 157; Node 24.16.0. Isolated browser runs, sequentially, on the same machine.
- Default simulated mobile throttling: 150ms RTT, 1638.4 Kbps throughput and 4× CPU slowdown. Desktop used Lighthouse's desktop preset.
- The existing `.qa/perf-http2.mjs` proxy supplied local HTTPS, HTTP/2 and Brotli, matching the delivery setup used by the repository's earlier local reports. Its local certificate was accepted for this test; this does not validate deployment TLS or CDN configuration.
- Six before and six after reports are saved as HTML and JSON under `.qa/quality-review-20261112/`, named `before-<home|article|download>-<mobile|desktop>.report.*` and `after-...`. The local runner is `.qa/quality-review-20261112.mjs`. These QA artifacts are ignored by Git and remain on this workstation.
- The first sandboxed Lighthouse attempt could not reach the browser debugging port. The successful runs used an approved isolated browser process with access to its local debugging connection.

The older scores in `performance.md` are historical measurements from other runs. They should not be treated as a controlled before/after comparison with today's browser, environment or build.

## Checks actually executed

- `npm run build`: passed, including TypeScript and the existing critical-CSS postbuild step.
- `npm run lint`: passed; the existing old Browserslist-data notice remains.
- `npx tsc --noEmit`: passed.
- `npm run test:download-tracking`: 9 passed.
- `npm run test:indexnow`: 3 passed with mocked submissions; no indexing request was published.
- `node scripts/check-seo.mjs http://127.0.0.1:4101`: passed 33 sitemap pages, 59 internal destinations, 566 fragment links, 128 store links, 15 generated social cards and 10 crawler user agents across 15 articles. The broader HTML check covered the 43 documents and 281 image instances above.
- Playwright checked the alt text of all five interactive homepage feature images and every image rendered in the article. The opened goal dialog contained no raster images. QR accessible names include their visible captions.
- The article still has all 30 numbered questions. Repeated scrolling produced exactly two CTA-view events; client navigation away and back allowed a third, fresh page-view impression. Correct `mid_article` / `end_article` positions and image/text variant parameters were retained.
- No horizontal overflow or missing image alts at 320, 390, 768 or 1440px in the article. Browser console checks reported zero errors.

## Remaining limits

Lighthouse still identifies unused portions of the normal Google Analytics library and required framework JavaScript. Those libraries were retained for real analytics and application behavior. A manifest dependency-chain diagnostic also remains. One mobile article report recorded a browser-internal back/forward-cache error marked “Not actionable”; the functional navigation-back/impression check passed and best practices remained 100. The raw reports retain these diagnostics.

An automated SEO score of 100 does not establish perfect SEO, unchanged rankings or field Core Web Vitals. Current Search Console queries/indexing, real-user performance, consent/blocker effects and deployed CDN behavior still need their own evidence. This work was tested locally on the feature branch; no production deployment or push to main was performed.
