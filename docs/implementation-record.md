# Implementation record — November 11, 2026

All changes are local to `feat/blog-conversion-growth`. No push or merge to main is included in this task. The baseline worktree was clean and main pointed to `8d0e87e`.

## P0 — contextual CTAs and measurement

Commit: **`8c03165` — `feat: add blog CTAs and conversion tracking`**

New utilities/components:

- `src/components/article-app-cta.tsx` and `article-app-cta.module.css`: configurable inline/closing copy, actual screenshot and existing store badges.
- `src/components/cta-impression.tsx`: page-scoped visibility tracking with observer cleanup and shared deduplication across CTA remounts.
- `src/lib/app-conversion-analytics.ts`: safe `app_cta_view` and normalized `app_store_click` emission through the existing Google/Vercel sinks.

Other changed files:

- `src/app/layout.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/mdx-components.tsx`
- `src/components/store-cta-row.tsx`
- `src/components/app-store-cta.tsx`
- `src/components/playstore-cta.tsx`
- `src/components/store-text-link.tsx`
- `src/content/blog/30-spicy-questions-to-ask-your-long-distance-partner.mdx`
- `src/lib/download-analytics.ts`
- `scripts/download-tracking.test.mjs`
- `docs/blog-conversion-tracking.md`

Tests before the P0 commit: 9 download/analytics unit tests and 3 existing IndexNow unit tests passed; TypeScript, lint and production build passed. The production SEO checker passed 33 sitemap pages, 59 internal destinations, 15 social cards, 566 fragments, 128 store links and 10 user agents across 15 articles. Production Playwright verified question count/placement, all four contextual store taps with keyboard navigation, event counts and parameters, repeated scrolling, route return, blocked analytics, mobile/desktop overflow and error-free hydration. Before/after rendered store hrefs, titles, descriptions, canonicals and question headings were identical on the homepage, target article and download page. Existing store campaign parameters were retained. Local test popups used intercepted destinations, so this is not proof of real-device OS handoff or GA4 account receipt.

P0 visual follow-up: **`fe51e11` — `style: remove blog CTA accent border`**. Changed only `src/components/article-app-cta.module.css` after user review. Browser computed styles confirmed the same 1px outline on all four sides and no overflow at 390px; the updated mobile screenshot was inspected. The subsequent content-phase production build/lint also includes this CSS correction.

## P1 — verified technical fixes

Commit: **`eafa7bc` — `fix: correct article classification and download social metadata`**

Changed files:

- `src/content/blog/30-spicy-questions-to-ask-your-long-distance-partner.mdx`: page-level adult classification, using the existing metadata/schema helper.
- `src/app/download/page.tsx`: download-specific Twitter copy instead of inherited homepage copy.
- `scripts/check-seo.mjs`: assertions for both explicit articles and download social metadata.

Tests: lint, TypeScript and production build passed; the updated complete production SEO checker passed. Rendered HTML checks confirmed explicit metadata only on the intended articles and matching Twitter/Open Graph download titles. Live production redirect requests established the HTTPS apex host; redirects/canonicals were preserved. The detailed evidence and external follow-up list are in `technical-review.md`.

## P1 — content accuracy and contextual linking

Commit: **`08f922d` — `fix: align app comparisons with verified product features`**

Changed files:

- `src/content/compare/dreamduo-vs-paired.mdx`
- `src/content/compare/dreamduo-vs-lasting.mdx`
- `src/content/compare/dreamduo-vs-between.mdx`
- `src/content/blog/the-5-best-couples-apps-in-2026-compared-honestly.mdx`
- `docs/content-review-notes.md`

Tests: production build, lint, TypeScript and all 9 conversion unit tests passed again. The full updated SEO checker passed. Playwright loaded the four edited pages and verified modification dates, the corrected copy and all added contextual links. Sources and exact verification limits are in `content-review-notes.md`.

## P2 — publishing briefs and handoff

Documentation-only commit: growth briefs, durable technical review and this implementation record. Files: `docs/growth-roadmap.md`, `docs/technical-review.md`, `docs/implementation-record.md`.

Five opportunities were compared with existing pages. Three detailed briefs were prepared; no new route was published without validated distinct intent. The Ahrefs keyword overview was attempted but returned insufficient-plan access; current search examples inform hypotheses only. No volume, rank, live GSC/GA4 outcome or install/activation result was invented. Documentation/link references and repository state are reviewed before the final commit; no app rebuild is required for these documentation-only files.

Final production browser verification also confirmed the revised CTA has the same 1px outline on all four sides, no mobile overflow and zero console errors. A separate JavaScript-disabled browser context rendered all 30 question headings, both contextual CTAs and all four store links. The updated production screenshot is at `D:/Code/dreamduo/.scratchpad/blog-growth/mobile-inline.png`; the desktop closing screenshot is alongside it. These local QA artifacts are outside the landing site's Git repository.

## Deployment and rollback boundaries

- P0 code has no dependency on the technical or content commits. The P1 source changes use existing metadata/MDX mechanisms and do not require the new CTA utilities. A P0 rollback would include its visual follow-up plus the original P0 commit, preserving the P1 SEO/content changes; no rollback was executed.
- Keep one production GA4 tag. Register the documented custom dimensions and check for account-side derived-event duplicates. Existing `download_store_click` and new `app_store_click` represent the same action under different names and must not be added together.
- The explicit-content classification can affect SafeSearch eligibility; it reflects the article as written and is not a traffic optimization claim. No ranking outcome is guaranteed.
- Builds and local browser checks do not verify deployed CDN/WAF behavior, field Core Web Vitals, store attribution, installs or partner pairing. These remain named external checks, not silently assumed success.
- Main and the remote are left unchanged pending explicit user authorization.
