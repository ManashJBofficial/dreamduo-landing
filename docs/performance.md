# Landing performance

## Delivery changes

- The supplied SVGs remain editable sources. Browsers receive transparent AVIF
  derivatives with WebP fallbacks through `ResponsiveArtwork`. Phone previews use
  480 px assets: hero 16,950 bytes instead of the 523,494-byte SVG; download
  artwork 20,657 bytes instead of the 610,654-byte SVG. Larger screens retain
  responsive 400/640/960/1280 px choices. Media-specific preloads select the same
  asset as the picture, avoiding duplicate downloads.
- `npm run optimize:artwork` regenerates artwork, the 112 px brand mark, and
  height-limited feature screenshots from the existing sources. It requires the
  Sharp installation supplied with Next.js. Review generated images before
  committing a source replacement. No runtime image transformation is needed for
  the hero or download banner.
- Self-hosted Latin WOFF2 fonts total 47,220 bytes. The heading font is bold-only;
  Manrope remains variable for weights 400-700. Both compact files are preloaded
  and swap from fallbacks while loading. Builds no longer
  contact Google Fonts. Font licenses and sources are in `src/app/fonts`.
- The hero remains a server component, with campaign-aware QR behavior isolated
  in a small client component. QR encoding loads only after tablet/desktop
  detection, and its reserved square prevents layout shifts during loading.
- Feature images load when within 200 px of the viewport, rather than several
  screens early through native lazy-loading heuristics. A no-JavaScript image
  fallback remains available. All five tabs retain their screenshots.
- Dream dialog content and its extra icons load on demand. The FAQ uses native
  exclusive `details` controls, so it works without client JavaScript.
- Store badges use static images and ordinary class concatenation, without the
  Next Image or Tailwind merge runtime. Navigation/footer/blog-card prefetches
  are disabled so unvisited routes do not compete with initial assets.
- Google Analytics initializes its event queue immediately and loads its
  external library with `lazyOnload`. GA4 and the UTM/store/QR tracking remain
  enabled. Vercel's analytics component only renders on Vercel, preventing its
  unavailable local endpoint from producing a 404.
- The hero's dot grid was removed with user approval; the continuous gradients
  remain. Footer/date-label contrast and Instagram's accessible label were fixed.

## Measurement

### Remaining PageSpeed warnings

The follow-up build removes both the legacy-JavaScript finding and all
render-blocking stylesheet requests in Lighthouse. Global CSS no longer carries
editorial/blog styles or utilities extracted from retired components; the main
stylesheet shrank from 100,625 to 75,822 bytes before compression.

`npm run build` now runs `postbuild` automatically. The build-only Beasties
optimizer inlines the CSS used by each of the 29 static HTML pages, defers full
stylesheets, and retains a no-JavaScript fallback. The original CSS files and RSC
payloads remain intact for interactive states and client navigation. Font URLs
are rebased from stylesheet-relative to `/_next/static/media/` URLs. The script
assumes the existing `.next` build directory and default `/_next/` asset prefix.
Keep the Vercel build command as `npm run build` so this step executes.

The Turbopack alias replaces Next 16.1.6's legacy shims with the remaining
`URL.canParse` fallback. The browser floor matches Next's own targets: Chrome,
Edge and Firefox 111, and Safari 16.4. Those versions already implement the other
Array/Object/String/Promise methods. Review the alias when upgrading Next.js.
This removes the audit finding; its 14 KiB heuristic was not the actual size of
the 1.4 KiB uncompressed shim module.

Follow-up cold mobile audits measured 99 for home/download/article and 100 for
home desktop, with the other three categories at 100. Home FCP/LCP measured
approximately 1.0/2.0 s; download 0.8/1.7 s; CLS remained 0. Tests also held all
external CSS requests open and verified that custom fonts and initial layouts
were already correct, then unchanged after those requests completed. Menus,
feature tabs, dialogs, QR routing, click tracking, and no-JavaScript styles passed.

### Earlier optimization baseline

Use a production build, not `next dev`, for Lighthouse. The user's deployed
PageSpeed screenshot showed 71 mobile performance, 5.7 s LCP, and 97 accessibility.
A separate Lighthouse 13 run against that unchanged deployment scored 88 mobile;
these different runs are not a controlled before/after comparison.

The optimized local production build has measured 98-99 mobile performance and
100 desktop performance. Home and download mobile LCP are approximately 2.1 s,
CLS is 0, and accessibility/best practices/SEO score 100. The tested article also
measured 99 mobile performance and 100 in the other three categories after its
small date-label contrast issue was corrected.

| Page/device | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home/mobile | 98-99 | 100 | 100 | 100 |
| Home/desktop | 100 | 100 | 100 | 100 |
| Download/mobile | 99 | 100 | 100 | 100 |
| Questions article/mobile | 99 | 100 | 100 | 100 |

Local audits use default mobile throttling, real GA4 library loading, and an
HTTP/2 + Brotli proxy matching production's verified content encoding. A separate
diagnostic audit temporarily blocked Google Analytics to isolate its cost; that
diagnostic is not used as a final score. Raw HTTP/1.1 localhost tests score lower
and are retained in `.qa` alongside the HTTP/2 reports. No browser cache warming,
audit-agent detection, or removal of analytics is used to obtain final scores.
GA4-enabled audits can create local test traffic; filter reports to hostname
`dreamduo.app` when reviewing production visitors.

These are local measurements, not a guarantee of 100 on the deployed origin.
Hosting latency, CPU, third-party scripts, compression, and run variance affect
PageSpeed results. Push and deploy all source/asset/font changes, then rerun both
PageSpeed devices against `https://dreamduo.app/` and `/download`.

## Functional verification

- Production build, ESLint, and attribution regression tests.
- Home/download layouts at 320, 390, 768, and 1440 px; no horizontal overflow.
- Original artwork, gradients, store badges, and shared container widths.
- Deferred screenshot loading and all five feature tabs.
- First dream category dialog (index 0), Escape dismissal, and native FAQ toggles.
- Visible/scannable tablet/desktop QR and hidden phone QR; campaign URL retention.
- GA4 store-click event queue, with external collection intercepted during UI QA.
- Direct iOS/Android QR redirects remain independent of page JavaScript.
