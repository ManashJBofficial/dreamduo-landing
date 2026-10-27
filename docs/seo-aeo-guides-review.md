# Five relationship guides — review before publication

Branch: `feat/seo-aeo-relationship-guides`. These changes have not been committed, pushed or deployed. The author must review the copy and images before approving a commit. All five articles use October 27, 2026 as their proposed publication date; change that date if publication happens later.

## Preview

Run `npm run dev` and open `http://localhost:4100/blog`. The local production review server uses port 4101 instead.

1. `/blog/30-daily-questions-for-long-distance-couples-when-you-run-out-of-things-to-say`
2. `/blog/how-to-plan-your-next-long-distance-visit-free-checklist-budget`
3. `/blog/25-things-to-do-on-facetime-with-your-partner-when-you-re-bored`
4. `/blog/long-distance-relationships-in-different-time-zones-3-weekly-routines`
5. `/blog/15-minute-weekly-relationship-check-in-12-questions-template`

The five covers and original SVG planning graphics are in the corresponding `public/blog/<slug>/` folders. On phones, the graphics use stacked HTML with 16px text rather than tiny scaled SVG labels. The PDFs, printable HTML and editable text files are under `public/downloads/`:

- `daily-question-calendar`
- `long-distance-visit-planner`
- `facetime-date-menu`
- `time-zone-weekly-planner`
- `weekly-relationship-check-in`

The daily-question PDF has two pages; the visit checklist/budget has two pages; the remaining worksheets have one page each. The browser worksheets do not send or persist personal entries. Reloading clears the budget and notes. Downloading a blank template does not export the entered values.

## What changed

- Five distinct guides with direct opening answers, internal links, contextual store CTAs and useful planning tools. Existing metadata, canonical, BlogPosting, sitemap, tag hubs and RSS systems discover the MDX files automatically.
- 30 general-audience prompts checked verbatim against `backend/prisma/seeds/question-bank.template.ts`. The list is an editorial selection, not an in-app scheduling claim. Some in-app packs have access requirements.
- Real existing DreamDuo screenshots accompany the product CTAs. They are examples of the actual UI, not generated app screens, customer results or custom visit goals.
- Interactive visit checklist and budget; editable weekly check-in fields; accessible HTML alongside every planning graphic.
- The existing care-package URL is retained, with a shorter SEO title, occasion table and packing checklist. Existing question and goal articles link into the new cluster.
- Download responses send `X-Robots-Tag: noindex`; printable HTML also uses `noindex,follow`, so worksheets support the articles rather than creating duplicate search pages.
- The SEO checker now verifies a real local cover when one is provided, while continuing to validate every generated social-card endpoint. New articles use their representative 1600 × 900 photograph for Open Graph, Twitter and schema.

## Stock photos and regeneration

All five AI-generated covers have been replaced with real Pexels stock photographs. The old WebP files and the AI-cover preparation script have been removed from the project. Current assets have distinct filenames, so previews and social metadata do not reuse cached AI covers. Photographs are illustrative, not customer testimonials or evidence of the pictured people using DreamDuo.

Photographer, source and license records are kept in the asset manifest; articles use descriptive alt text without optional credit captions. The files are 1600 x 900 compressed WebP (about 42-153 KB), delivered responsively through Next Image.

- [Ketut Subiyanto / Pexels](https://www.pexels.com/photo/woman-working-at-home-and-making-video-call-on-laptop-4474047/): `public/blog/30-daily-questions-for-long-distance-couples-when-you-run-out-of-things-to-say/daily-questions-video-call.webp`
- [Rukiye Ağaçayak / Pexels](https://www.pexels.com/photo/a-couple-looking-at-the-map-20259891/): `public/blog/how-to-plan-your-next-long-distance-visit-free-checklist-budget/long-distance-visit-travel-plan.webp`
- [RDNE Stock project / Pexels](https://www.pexels.com/photo/woman-cooking-while-holding-a-notebook-and-looking-at-her-laptop-6517191/): `public/blog/25-things-to-do-on-facetime-with-your-partner-when-you-re-bored/facetime-cooking-activity.webp`
- [Andres Ayrton / Pexels](https://www.pexels.com/photo/focused-black-man-using-laptop-in-evening-at-home-6578426/): `public/blog/long-distance-relationships-in-different-time-zones-3-weekly-routines/long-distance-time-zone-evening.webp`
- [Alex Green / Pexels](https://www.pexels.com/photo/happy-young-ethnic-couple-chatting-while-sitting-on-couch-at-home-5699824/): `public/blog/15-minute-weekly-relationship-check-in-12-questions-template/weekly-couple-conversation.webp`

The source manifest is `src/content/assets/relationship-guide-photos.json`. Run `node scripts/download-relationship-covers.mjs` to download the recorded originals and reproduce their final crops. An optional local originals folder avoids repeated downloads. The [Pexels license](https://www.pexels.com/license/) and source pages were checked on October 27, 2026.

`node scripts/generate-relationship-guide-assets.mjs` regenerates the code-authored planning diagrams, HTML and text companions from shared data. These useful diagrams are kept; they are not AI photographs. `node scripts/render-guide-pdfs.mjs 9225` renders the printables through a separately launched isolated Chromium instance. PDFs are tagged and contain selectable text.

## Facts and sources

Checked October 27, 2026:

- [Apple SharePlay guidance](https://support.apple.com/en-ie/guide/iphone/iphb657eb791/ios): supported apps, subscriptions and regional access; the article does not promise arbitrary video screen sharing.
- [UK clock changes](https://www.gov.uk/when-do-the-clocks-change): London is on GMT in the reference week of November 9, 2026.
- [Tourism Australia time zones](https://www.australia.com/en-us/facts-and-planning/about-australia/time-zones.html): Queensland's time zone and daylight-saving treatment.
- [IANA time-zone database](https://www.iana.org/time-zones): city-based zone reference. The diagrams calculate local hours with `Intl.DateTimeFormat` for the labelled date.
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), [Discover images](https://developers.google.com/search/docs/appearance/google-discover) and [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): readable original content, representative high-resolution images and factual schema. These changes do not guarantee 10,000 impressions, rankings, AI citations or installs.

Budget figures are fictional USD examples, not travel quotes or financial advice. Time-zone schedules explicitly assume local work 09:00–17:00 and sleep 23:00–07:00. The six-hour example has no shared free weekday window under those assumptions; its lunch call is optional. The ten-hour example labels the next-day date correctly.

## Conversion measurement

Existing `download_store_click` events now also carry `article_slug` on article pages. `placement` distinguishes body/footer/navigation and `platform` distinguishes Android/iOS. Incoming UTMs remain separate from CTA placement and continue into store URLs. GA4 is installed directly with `gtag.js`; no GTM container was added.

To use these fields in GA4 Explorations, register event-scoped custom dimensions for `article_slug` and `placement` if they are not already registered. Web store clicks measure outbound visits, not verified installs or partner pairing. Functional browser tests intercepted the external Google tag locally to avoid sending test clicks to production GA4. Lighthouse loaded the site's normal analytics configuration.

## Verification

- `npm run lint`
- `npm run build` (including critical CSS postbuild)
- `npm run test:download-tracking`
- `node scripts/check-seo.mjs http://localhost:4101`
- Production-browser checks at 320, 390, 768 and 1440 pixels, including all five guides, editable tools, downloads, campaign URLs and queued GA4 click properties.
- PDF text/page-count checks and rendered-page inspection.

Results: lint and production build passed; all six download-tracking tests passed; the SEO scan passed for 32 sitemap pages, 58 internal destinations and 14 article/comparison pages. All five guides passed at 320, 390, 768 and 1440 pixels without horizontal overflow. Browser checks confirmed all 20 visit checkboxes, budget total 500 / remaining 300, worksheet editing, and article/placement/platform/UTM properties in queued GA4 clicks. All five planning graphics use visible 16px text on phones. All seven PDF pages were rendered and inspected, with no clipped text or extra blank pages.

Earlier draft Lighthouse audit before the stock-photo replacement, mobile, HTTP/2 with Brotli and normal analytics: homepage 99 performance / 100 accessibility / 100 best practices / 100 SEO; new daily-question article 99 / 100 / 100 / 100. Homepage LCP 2.0s; new article LCP 1.8s; both CLS 0. These are local lab results, not a prediction or guarantee of deployed PageSpeed scores.

No environment changes are required. Nothing has been committed, pushed or deployed.
