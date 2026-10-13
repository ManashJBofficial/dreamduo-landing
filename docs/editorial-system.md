# Editorial pages and automatic artwork

Add an MDX file in `src/content/blog` or `src/content/compare`. Required frontmatter is `title`, `description`, and ISO `date`. Optional fields include `updated`, `tags`, `author`, `competitor` and `draft`.

The filename becomes the URL slug and seeds the artwork. Current articles use topic-specific vector compositions: rose conversation bubbles for intimacy questions, an apricot route for the bucket list, lavender app tiles for comparisons, and sage progress bars for shared goals. Other slugs get stable generated love-inspired artwork. Cards, article banners and the generated 1200 × 630 social preview use the same seed. No image upload or external generation service is needed. Renaming a slug changes its artwork and URL; add a permanent redirect when renaming a published article.

Use optional `coverHeadline` and `coverSubtitle` for concise, factual cover copy. Without `coverHeadline`, the actual article title is used; the system never invents a slogan. Cover text and patterns are decorative and hidden from assistive technology because the visible card H2 supplies the accessible article title. `seoTitle` optionally shortens the search and social metadata title while the H1 and BlogPosting headline remain the full visible article title. Example:

```yaml
title: "Couples Bucket List: 40 Ideas You Can Turn Into Real Plans"
seoTitle: "40 Couples Bucket List Ideas You Can Actually Plan"
coverHeadline: "40 Bucket List Ideas"
coverSubtitle: "For couples"
```

Use different copy lengths for different contexts, but keep the subject, numbers and promises consistent. Do not fill image alt text with keywords; decorative SVG needs no alt text. Real photographs and product screenshots need accurate descriptions of what is actually shown.

`draft: true` previews in development but is excluded from production pages, sitemap, RSS and listings. Existing optional cover overrides and inline screenshots remain supported. An inline screenshot illustrates the product; it is not required for a banner.

Update `updated` only after a meaningful edit. Competitor facts should link to official sources, identify the date checked, and distinguish an advertised feature from a personally tested one. State the store/currency for prices and use checkout as the final authority when offers differ.

Verification: run `npm run lint`, `npm run build`, then start the production server and run `node scripts/check-seo.mjs http://localhost:4100`.

## Journal header and topic navigation

The hub uses a brand headline with an explicit subject description and two actions: an HTML anchor to `#journal-stories`, and the comparison index. Its search title stays descriptive and inherits the site's single DreamDuo suffix. The hero's lighter palette and sizing are scoped to the journal; article patterns retain their topic colors.

`blog-topics.ts` defines four main navigation topics and readable labels/descriptions for existing tag pages. `BlogTopicNav` only links to tags with published articles. Remaining tags appear in a native HTML details menu that works without JavaScript, supports keyboard interaction and opens to show the selected secondary topic. The legacy comparisons tag URL remains valid; app guides use Couples apps in the main navigation. No duplicate category URLs were created. Additional tags appear under More topics automatically.

On small screens the expanded menu sits in the document flow, avoiding offscreen popovers. Topic pages reuse this navigation and display a specific introductory paragraph rather than only a story count. Existing archive URLs and sitemap eligibility are preserved; topic chips support navigation and do not promise keyword rankings.

## Article artwork containment

Article and comparison banners use `containedArt`: a dedicated artwork column on desktop and a compact illustration below the text on smaller screens. The SVG uses a viewBox around the actual composition rather than the empty left half reserved for card copy. This avoids negative positioning, clipped shapes and text overlap. Social preview images use the same contained composition with separate text and artwork areas. The journal hub's decorative edge treatment remains separate.

Verification covered all eight article/comparison banners at 375, 768, 1024, 1280 and 1440 pixels: SVG geometry fits its viewBox, artwork stays inside the banner, text and artwork do not overlap, and no document overflow occurs. All eight social previews still render at 1200 × 630. Evidence: repository-root `docs/audits/2026-10-13/uncropped-artwork-results.json`.
