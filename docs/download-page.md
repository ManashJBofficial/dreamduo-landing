# Shared download link

Use `https://dreamduo.app/download` everywhere, varying only the campaign tags:

```text
https://dreamduo.app/download?utm_source=ig&utm_medium=social&utm_campaign=launch&utm_content=link_in_bio
```

The normal link displays both store buttons on every device. Its locally generated
QR code includes the same `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
and `utm_term`, plus `via=qr`. `src/proxy.ts` redirects recognized iOS/iPadOS and
Android QR requests directly to the DreamDuo store listing with HTTP 307, before
rendering any page. There is no analytics delay and JavaScript is not required for
this redirect. Responses are private/no-store and vary by user agent. Existing
printed QR links continue to work. Desktop and unknown devices keep both choices.
An iPad using an indistinguishable Mac UA has an immediate touch-detection fallback.
No database, additional API service, or third-party QR service is used; the proxy
runs with the existing Next.js/Vercel deployment.

`QrVisibility` hides every QR group on phones (including landscape), while tablets
and PCs retain it, even in narrow windows. CSS provides the pre-hydration fallback.
Store badges remain visible on every device. The download controls sit directly
on the page gradient on the left, with artwork on the right and no enclosing card.

## Analytics options

| Option | Best fit | Setup |
| --- | --- | --- |
| Existing Vercel Analytics | Least work if the hosting plan supports custom events | Enable Web Analytics on the production Vercel project. Custom events require Pro/Enterprise; the built-in UTM dashboard filter requires Web Analytics Plus/Enterprise. Campaign properties are also sent explicitly with our custom events. |
| GA4 | Campaign acquisition and click reporting without your own database | Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to a GA4 **web stream** ID (`G-…`) in Vercel, then rebuild. No Google script loads when the variable is absent. |
| Plausible | A simpler managed analytics alternative | A future swap if preferred; not connected by this change. |

These are visitor/event counts, not a count of every raw request. Browser blocking,
JavaScript being disabled, and leaving the page early can prevent measurement.
UTM values identify the link's campaign; referrer is a separate, best-effort hostname
and may be absent in social apps. Do not put personal information in campaign tags.
Only the five documented UTM fields are accepted, limited to 100 characters each.

Page events are sent to the existing Vercel integration and optionally GA4. Direct
QR redirects send Vercel server events in the background using `waitUntil`; they
do not render a web page or run GA4's browser script. Server events require the
production Vercel environment and enabled custom-event support. No extra secret
or database is required. Prefetches and HEAD requests do not emit scan events.

| Event | Meaning |
| --- | --- |
| `download_view` | The download page initialized; includes campaign, device platform, referrer hostname, and `via` (`link` or `qr`). |
| `download_qr_visit` | A visit with `via=qr`; server-side on a recognized mobile/tablet redirect, browser-side on the desktop fallback. This is not proof of a physical scan. |
| `download_store_click` | A visitor chose a store; includes `store`, platform, and campaign. |
| `download_redirect` | Automatic QR routing to a store, recorded server-side in Vercel; separate from a button click. |

In Vercel, open the project's **Analytics** tab, select `/download`, and inspect
Custom Events and their properties. In GA4, verify in **Realtime/DebugView**, then
use **Traffic acquisition** for campaign traffic. Register custom dimensions such
as `store`, `via`, and `platform` if needed for event breakdowns, and mark
`download_store_click` as a key event if useful. Page initialization is counted per
navigation, so repeat visits are not unique people. Do not add QR arrivals and
page views together as if they were separate visitors.

Google Play receives campaign tags in its encoded `referrer` parameter. Apple
receives a sanitized campaign token (`ct`, maximum 40 characters). Set the optional
`NEXT_PUBLIC_APP_STORE_PROVIDER_TOKEN` from App Store Connect's campaign builder to
include `pt`; follow Apple's reporting thresholds and attribution rules. Web clicks
and redirects do **not** prove app installation. Use store reports or a dedicated
mobile attribution platform if install attribution becomes necessary.

## Assets and previews

- Hero: `public/dreamduo-hand-phone.webp`, converted from the supplied hand-and-phone
  PNG, preserving transparency and its full 1080 × 1350 framing.
- Transparent mark: `public/dreamduo-mark.webp`, trimmed and compressed from
  `frontend/assets/images/dreamduo_logo.webp`.
- App icon and Apple touch icon: `public/dreamduo-logo.webp` and
  `public/apple-touch-icon.png`, exported from the supplied `dreamduo.png`.
- Browser icon and favicon: transparent PNG/ICO exports of the frontend mark.
- Feature mockups: `public/dreamduo-dreams-phone.webp`,
  `public/dreamduo-files-phone.webp`, `public/dreamduo-nudge-hub.webp` and
  `public/dreamduo-milestones-phone.webp` and `public/dreamduo-daily-conversations.webp`, compressed from the supplied PNGs with
  transparency preserved. Superseded hero, dreams, files and logo assets have
  been removed from `public` after checking references.
- The homepage feature section uses an accessible, manual five-chapter tour in
  `src/components/feature-tour.tsx`. Arrow keys, Home and End switch chapters;
  the selector stays visible on mobile. Real screenshots replace the old static
  milestone cards and other illustrated dashboards. Streaks and insights sit in
  the text column on desktop and follow the screenshot on mobile.
- Homepage typography is scoped through `.home-page` in `src/app/home.css`:
  body text is 16–18 px, labels are 14 px, and section headings share a 32–48 px
  scale. Use the shared `home-*` classes for new copy. Keep the feature section
  white and Our Story blush so the sections remain visually distinct.
  Our Story retains the original founder letter, three supporting cards, and
  promise panel with muted slate copy. Footer body, links, and column headings
  use slate-400; its copyright line uses slate-500 and the comparison link stays
  rose. These footer colors are scoped so other dark sections keep their contrast.
  Footer links/body are 14 px; column labels and copyright are 12 px. The mobile
  sticky download CTA uses the same "Try for free" label as the navbar.
- Shared layout tokens live in `src/app/globals.css`: `--site-shell-width`
  is 1280 px; shell gutters are 16/24/32 px and page frames are 8/12/16 px.
  `.site-container` and `.editorial-shell` use the same rules. Navbar edges align
  with their content edges, including on homepage sections, blog listings/tags/
  articles, comparisons, downloads, and legal pages. Keep narrower reading text
  inside these shared outer shells rather than changing their width.
- Homepage section padding is 40–64 px. The feature tour uses the shared
  container, a 440 px desktop screenshot stage, and compact internal gaps.
- The homepage hero uses two columns from 1024 px: the hook, description, both
  store buttons, and one QR on the left; only the supplied two-phone SVG is on
  the right. `public/dreamduo-hero.svg` is compressed from `Downloads/hero.svg`,
  with its embedded PNGs optimized to WebP and transparency preserved. Its
  viewBox trims empty canvas, retaining 24 px around all artwork, so the phones
  fill the right column without overflowing the shared shell. Smaller
  screens stack in reading order; the store buttons have no animated glow.
  The navbar spacer and hero share one gradient-and-dot background wrapper, so
  the background extends behind the floating navbar without a color seam.
  The desktop hero uses a 1280 px container with a 24 px column gap, a 700 px
  minimum height, and artwork up to 640 px wide.
  Its QR sits above the store badges and scales from 168 to 208 px with the viewport.
  Hero top padding is 96 px on desktop, 72 px on tablets, and 64 px on phones.
  The shared navbar places the logo left, navigation menus in the center, and the
  pink CTA right. Below 1024 px, menus collapse into a toggle with Escape and
  outside-click dismissal; following a link closes the menu.
  The navbar floats 8/12/16 px below the viewport edge. Its spacer and anchor
  offsets include that gap so content and sticky feature tabs clear the navbar.
- Download artwork: `public/download-banner.svg` is the optimized runtime copy of
  the supplied transparent `Copy of Copy of dreamduo - normal screen (1).svg`.
  Its embedded PNGs are compressed to WebP while retaining the SVG layout and
  transparency. The supplied source in Downloads is unchanged.
  `src/components/download-banner.tsx` displays the artwork without overlays.
  The runtime SVG has a transparent canvas to blend into the pink-to-white page
  gradient. The page reuses the site's navbar and full footer. Official black
  store badges share an equal height and scale with the download panel; the
  shared QR is 248–300 px wide, with a secondary 26–32 px
  heading. The download controls have no panel background, shadow, decorative
  placeholders, circles or divider lines.
  The badge row is capped at 368 px (about 56 px tall on desktop), with the QR
  centered below it and no additional QR heading or description.
  "Download it now!" and its controls are centered within the left column. The
  artwork viewBox trims only transparent margins, retaining 24 px of padding so
  the phones fill the right column. Download content has 64 px top spacing on
  desktop, 48 px on tablets, and 40 px on phones below the navbar.
- Store artwork is shared through `store-badge.tsx`, using the official
  [App Store badge](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg)
  and [Google Play badge](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png).
  Both assets are local; Google Play's transparent export padding is trimmed and
  its artwork is losslessly compressed to WebP. Badges preserve their original
  proportions, appear Apple first, and have no glow, custom icons or arrows.

## Verification

Direct QR checks passed for iPhone, Android phones, iPad (including its Mac/Mobile
UA), and Android tablets: GET/HEAD return the matching listing URL with campaign
tags, no HTML page, and no redirect caching. Normal links and desktop/unknown QR
requests retain the download page. Browser tests confirmed hidden QR groups on
portrait/landscape phones and visible groups on tablets and PCs; both store
redirects worked with page JavaScript disabled. TypeScript and ESLint pass.

Shared-width checks passed for 12 page types at 1440, 1024, 768, 390, and 320 px:
all navbar and outer content edges align within one pixel, without horizontal
overflow or runtime exceptions. The mobile menu, hero badge/QR placement, and
gradient heading were also checked. ESLint passes. The production build still
cannot fetch the configured Google Fonts in this environment.

Run `npm run lint` and `npm run build`. Check `/` and `/download` at desktop and
mobile widths. Test a tagged link, scan its QR on both platforms, check that the
QR retains its tags, and verify the store click event in the chosen production
analytics dashboard. With JavaScript disabled, confirm the store buttons work.

Latest transparent-artwork verification: ESLint and responsive browser checks
passed. Production builds currently fail in the existing Bricolage Grotesque
`next/font/google` loader with both Turbopack and webpack; the SVG renders
correctly in the running site.

Implementation checks completed: production build and ESLint; responsive browser
checks at 320, 390, 768, 1024 and 1440 px; both store click events; emulated iPhone
and Android QR redirects with campaign tags; desktop QR fallback; and store links
in the HTML with JavaScript disabled. Browser checks used a local production build
and intercepted store navigation. Real phone scanning and production dashboard
ingestion still need a deployed page and an enabled analytics account.

References: [Vercel custom events](https://vercel.com/docs/analytics/custom-events),
[Vercel filtering](https://vercel.com/docs/analytics/filtering),
[GA4 campaign tags](https://support.google.com/analytics/answer/10917952),
[GA4 events](https://developers.google.com/analytics/devguides/collection/ga4/events),
[Apple campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links).
