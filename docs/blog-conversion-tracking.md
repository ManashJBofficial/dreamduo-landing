# Blog CTA measurement

## P0 scope and product evidence

Only `/blog/30-spicy-questions-to-ask-your-long-distance-partner` receives the new inline and closing CTA designs. The inline component is written explicitly after question 10 in MDX; the closing component replaces that article's existing generic footer CTA. All 30 questions, the URL, title, canonical, metadata, downloads, and other articles' CTA designs are retained.

The answer-reveal claim is supported by `backend/src/api/v1/services/daily-questions/daily-questions.service.ts`: partner answers are returned only when both `myAnswer` and `partnerAnswer` exist. The existing public `/dreamduo-daily-conversations.webp` is a real product screenshot showing both answers. It illustrates a general daily question, not a guarantee that a particular adult pack is available. Blog conversion copy follows the repository's editorial guidance.

## Analytics path

The repository initializes one GA4 Google tag in `src/components/google-analytics.tsx`, using `NEXT_PUBLIC_GA_MEASUREMENT_ID`, and uses Vercel Analytics. No GTM container or consent-management component was found in source. New events call the existing `window.gtag` and Vercel `track` functions; they do not initialize another tag, bypass Google's configured consent state, or write a second GTM event. Review any deployment-level tags/CMP separately. If a consent layer is added, gate both analytics sinks there.

| Event | Parameters | Trigger |
| --- | --- | --- |
| `app_cta_view` | `article_slug`, `cta_position`, `cta_variant` | At least 25% of a contextual CTA intersects the viewport, once per CTA per page view. |
| `app_store_click` | `source_page` (pathname only), optional `article_slug`, `cta_position`, `cta_variant`, `store` (`ios` or `android`) | A tracked DreamDuo store link is clicked. |

The contextual variants are `daily_question_inline` / `mid_article` and `daily_question_closing` / `end_article`. Existing store badges use their existing placement and `store_badge`; footer text links use `store_text`. Direct store references in editorial citations are not conversion CTAs and are not instrumented by this change.

`trackDownload()` is the single dispatch point for `app_store_click`, including existing hero, footer, article, modal and `/download` badges. It retains the existing `download_store_click` event and its `app_store` / `google_play` store values. The two event names are different reporting contracts for the same tap: never sum them to count conversions. Other `download_*` behavior is unchanged. The new CTA context is passed independently of URL campaign placement, preserving existing Apple campaign tokens and Google Play referrer UTMs.

`CtaImpressionProvider` retains a shared impression scope while the pathname stays the same. Observer cleanup plus that scope prevents Strict Mode effect replay, repeated scrolling and CTA remounts from duplicating views. A route change creates a new scope; returning to the article or reloading can create a new impression. Query-only changes do not reset this scope. Unsupported/blocked IntersectionObserver omits impressions rather than inventing visibility. Analytics calls are synchronous queue calls inside failure boundaries; navigation never waits for a network request and no handler prevents the click's default action.

## Manual GA4 / GTM setup

1. Confirm the production GA4 web stream ID is configured as `NEXT_PUBLIC_GA_MEASUREMENT_ID` and redeploy after changing it. No additional GA4 instance or GTM tag is required by this implementation.
2. In Realtime/DebugView, confirm one `app_store_click` per tap and one `app_cta_view` per visible CTA. DebugView requires your normal debug configuration; production source does not force debug mode.
3. Register event-scoped custom dimensions for `article_slug`, `cta_position`, `cta_variant`, `store`, and optionally `source_page`. Existing `placement` and `page_path` remain available on `download_store_click`. Dimensions apply prospectively and may take time to populate reports.
4. If the live account has a GTM rule or GA4-created event deriving `app_store_click` from `download_store_click` or outbound `click`, disable that derived event after verifying the new source event; otherwise one tap could be counted twice. Do not create a second event mapping.
5. Optionally mark `app_store_click` as a key event. Label it as a store visit, never an install. GA4 Enhanced Measurement's outbound `click` is another event and should not be summed with this one.

Google references: [sending events](https://developers.google.com/analytics/devguides/collection/ga4/events), [custom dimensions](https://support.google.com/analytics/answer/14240153), [session-scoped traffic sources](https://support.google.com/analytics/answer/11080067).

## Organic store-click conversion rate

`Organic store-click conversion rate = organic sessions with a store click / organic landing-page sessions × 100`

In a GA4 Exploration, apply the same date range, hostname, landing-page filter and **Session default channel group = Organic Search** to both populations. Use **Sessions**, not event count or total users, as the denominator. Create a session segment containing `app_store_click` and use its Sessions as the numerator. A session with multiple taps or both stores counts once. Break down by Landing page (not only the source page on the click, since visitors can navigate first). Keep the Organic Search session condition in the numerator segment as well. For a particular CTA's rate, additionally filter the click condition by `cta_position` / `cta_variant`; use CTA-view sessions as the denominator only when explicitly reporting exposure-to-click rate.

Consent choices, blockers, browser storage restrictions, reporting identity, session boundaries, cross-device use, modeled data and GA4 processing can limit counts and attribution. Website data stops at store navigation; it does not prove an install, first open, onboarding, pairing, or a shared dream.

Google Play referrer UTMs and Apple's `ct`/optional provider token support the existing store acquisition reporting where those platforms make it available. Apple campaign tokens are truncated to 40 characters, so some long blog placements can collide; this P0 preserves the existing URLs. Validate campaign attribution in the actual consoles, including their reporting thresholds and privacy limits.

Repository inspection found product activity statistics and premium-campaign events, plus Firebase used for notifications; it did not establish a cross-platform install-to-pairing analytics pipeline. Backend User/Couple/Goal records may support authorized aggregate sign-up, paired-couple and shared-dream reports, but are not currently joined to these web events. Compare aggregate cohorts/time periods with store acquisition reports only when definitions and access are confirmed. Do not claim user-level attribution or add mobile/backend tracking in this change.

## Validation

Run `npm run test:download-tracking`, `npm run test:indexnow`, `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Browser verification should cover all 30 questions, the exact question-10 placement, two CTA designs, both stores' event parameters, repeated scrolling, route return, keyboard focus, analytics blocking, production console/hydration errors and mobile overflow. Store links remain native anchors and remain available without JavaScript.

### Results, November 11, 2026 (P0)

- Download/analytics tests: 9 passed; IndexNow tests: 3 passed. The IndexNow suite uses mocked submission, not real indexing requests.
- TypeScript, lint and production build passed. Lint printed the pre-existing stale Browserslist-data notice, with no code warnings/errors after the hook cleanup.
- `node scripts/check-seo.mjs http://127.0.0.1:4101` passed: 33 sitemap pages, 59 internal destinations, 15 social cards, 566 fragment links, 128 store links and 10 crawler user agents across 15 articles.
- Playwright on the production build: all 30 question headings preserved; CTA occurs between question 10's explanation and the question 11–15 section; closing CTA appears after article content. No dialogs or horizontal overflow at 320/390/768/1440px; the genuine screenshot loads. Mobile inline and desktop closing layouts were visually inspected.
- A captured before/after DOM comparison of the homepage, target article and download page matched exactly for titles, descriptions, canonicals, question headings and every final store href, including encoded campaign parameters.
- Four keyboard-activated store taps (both CTAs × both stores) yielded four `app_store_click` and four legacy `download_store_click` events. Each new event had the expected source page, article slug, position, variant and normalized store. Test popups were intercepted locally to verify native navigation destinations without sending test traffic into store sessions.
- Two impressions after repeated scroll-out/scroll-in; a client route change away and back allowed a third, new-page-view impression. The development build also produced one impression per CTA under React development behavior. Unit tests additionally replay calls against the same scope to cover remount deduplication.
- Store navigation succeeded with `gtag` throwing. Plain `/download` retained both badges under iPhone and Android request headers, without an automatic article/store redirect. Production browser checks observed no page errors, hydration errors or console errors; screenshot resizing produced image-preload warnings only.
- These checks verify browser emission and navigation, not delivery into the live GA4 property, real device OS handoff, installs, pairings or field Core Web Vitals. Verify those in the actual consoles/devices after deployment.
