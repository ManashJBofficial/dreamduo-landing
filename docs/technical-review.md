# Technical SEO audit — November 11, 2026

## Confirmed fixes (P1 technical commit)

1. The explicitly adult spicy-questions article omitted `adult: true`, unlike the explicitly adult texting article. Its existing metadata/schema helper already supports page-specific `rating=adult` and `isFamilyFriendly=false`. Enabled that flag only on the spicy article and extended the crawler regression check to both explicit articles. The homepage and other guides do not inherit it. This describes the existing content accurately; SafeSearch visibility may change and should not be presented as a traffic gain. [Google's guidance](https://developers.google.com/search/docs/specialty/explicit/guidelines#mark-specific-pages-as-explicit-with-metadata) recommends labeling explicit pages.
2. `/download` inherited the homepage's Twitter title and description even though its HTML/Open Graph metadata described downloads. Reproduced in rendered production HTML. Added a page-specific Twitter card matching its current Open Graph copy and a crawler assertion. Page URLs, canonical, search title, badge URLs and redirects were retained.

These changes do not depend on the P0 CTA component or event implementation. P0 remains a separate commit.

## Baseline and retained behavior

| Area | Evidence / decision |
| --- | --- |
| Architecture | Next.js 16.1.6 App Router; static MDX blog/comparison collections via next-mdx-remote; Tailwind plus CSS modules; local fonts. Preserved. |
| Preferred host | Live requests: `http://dreamduo.app/` → 308 `https://dreamduo.app/`; `http://www.dreamduo.app/` → 308 `https://www.dreamduo.app/` → 308 `https://dreamduo.app/`; final HTTPS apex returns 200. The existing apex canonicals, sitemap and robots agree. No redirect/domain changes justified. |
| Analytics | Live article HTML contains the existing GA4 Google tag; no `GTM-...` container found in that response or repository. Account-side tags/created events still need review. |
| Homepage search snippet | Kept existing title and description. Overall historical CTR is insufficient to justify rewriting them. Export query × page × country × device data, distinguish branded/non-branded and irrelevant queries, and compare impressions, rank and CTR before considering a title change. |
| Blog metadata | Existing helper emits per-article canonical, search/social titles/descriptions, BlogPosting and breadcrumbs. Titles/descriptions were unique in the production crawl; one H1 per page and complete image alts. No extra schema types added. |
| Discovery | Production checker validates 33 sitemap pages, RSS, robots, real 404s, legacy slug/privacy redirects, generated social cards and internal links. Drafts are excluded in production and preview drafts are noindex. Printables/download files retain noindex behavior and remain useful resources. |
| Intent overlap | Spicy article focuses on long-distance desire/reunion questions; texting guide contains a different 35-prompt collection and picker; daily calendar is a lighter 30-day routine. Shared-goal how-to, bucket-list ideas and visit checklist solve different tasks. No consolidation, slug changes or canonical overrides justified without query evidence. |
| Images / mobile | Existing image-size helper reserves image space, Next Image is used, and the new product screenshot has explicit dimensions and lazy loading. The P0 browser checks found no overflow at 320/390/768/1440px. Existing homepage mobile install bar remains homepage-only; no article overlay was added. |
| Performance | Builds prerender the article; local fonts avoid runtime font requests; image dimensions and lazy loading are retained. No field CWV measurements or representative mobile performance lab run were available. Local navigation speed is not a CWV result. |
| Broken links | All internal destinations and fragment links in the checker passed. Targeted official competitor references were reviewed for content accuracy separately. This is not a complete live external-link crawl. |

## External verification work

- Search Console: compare query/page/device/country cohorts, submitted vs selected canonicals, indexing exclusions, crawl anomalies and SafeSearch effects for the two explicit articles. Treat the supplied historical snapshots as context, not a current API export.
- GA4: verify event receipt and custom dimensions, Organic Search session segments, consent behavior and absence of account-side derived-event duplicates. See `blog-conversion-tracking.md`.
- Field CWV: use Search Console/CrUX or PageSpeed Insights for the homepage, target article and download page. Inspect mobile LCP, INP and CLS at the 75th percentile and by template. Repeat lab measurements under a recorded device/network profile before selecting a performance fix. Do not infer field gains from the production build or a local browser.
- CDN/WAF and deployments: confirm real crawler IP access, deployed redirect chains beyond the homepage, preview-domain indexing policy and asset caching. A locally spoofed user agent is not proof of production bot access.
- App consoles / devices: verify both OS store handoffs and regional availability on actual devices, Apple campaign reporting/provider token, Google Play campaign attribution and any later onboarding/pairing cohorts. Store clicks cannot establish installs.
- Content maintenance: recheck dated competitor sources periodically and validate any untested features before publishing claims. Keep all supported prices tied to storefront, date and billing period.

## Validation

Run lint, TypeScript, production build and `node scripts/check-seo.mjs http://127.0.0.1:4101` after this commit's source changes. The updated checker verifies both explicit pages' rating/schema and the download page's Twitter copy while also guarding existing indexing, discovery, links, image alts and canonical behavior.

Executed results: lint, `npx tsc --noEmit` and production build passed. The updated production checker passed all 33 sitemap routes, 59 internal destinations, 15 social cards, 566 fragments and 128 store links, plus 10 crawler user agents across 15 articles. Rendered HTML inspection confirmed the spicy article has `rating=adult` and `isFamilyFriendly=false`, the homepage has no adult rating, and download Twitter/Open Graph titles match. The stale Browserslist-data notice persists; no code lint errors or warnings were introduced.
