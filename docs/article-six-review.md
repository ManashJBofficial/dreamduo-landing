# Article #6 — review before publication

Preview: `http://localhost:4101/blog/dirty-questions-to-ask-your-partner-over-text`

Title: **35 Dirty Questions to Ask Your Partner Over Text (18+)**.

This article uses two downloaded Pexels photographs. No GPT image generation was used for this article. The earlier five drafts now also use real stock photographs; their former AI covers have been removed.

## Stock photographs

| Asset | Photographer and source | Final file |
| --- | --- | --- |
| Adult couple cuddling in bed | [Yan Krukau / Pexels](https://www.pexels.com/photo/5217159/) | `public/blog/dirty-questions-to-ask-your-partner-over-text/couple-cuddling-in-bed.webp` |
| Young adult couple with laptop and phone | [Anete Lusina / Pexels](https://www.pexels.com/photo/woman-browsing-internet-on-laptop-near-boyfriend-with-smartphone-indoors-6334221/) | `public/blog/dirty-questions-to-ask-your-partner-over-text/young-couple-with-laptop-and-phone.webp` |

The photo pages and [Pexels license](https://www.pexels.com/license/) were checked on October 27, 2026. Both assets are locally hosted, compressed WebP with Next Image responsive delivery. Photo sources and licenses are retained in the asset manifest; the article shows descriptive alt text without optional credit captions. Images illustrate communication and affection; they are not presented as users, endorsements or evidence of anyone's private life. The cover is 1600 × 900; the in-article photo is 1200 × 900.

The manifest is `src/content/assets/texting-questions-photos.json`; regenerate with `node scripts/download-texting-photos.mjs`. It downloads only the two recorded Pexels IDs, without search-result scraping or API credentials.

## Content and picker

- The current 35 questions are the user's latest supplied text, verbatim and in order, with no category headings or mood tabs.
- The simple next/copy picker and continuous numbered list use the same flat question array. Copy success and clipboard-denial handling remain available; no answers are stored or sent.
- All questions remain readable in server HTML without JavaScript. The metadata describes the current explicit article and category-free picker. Page-specific adult classification remains limited to this article.
- The user-selected cover and existing real product screenshot are preserved. The screenshot illustrates the Questions screen, not a promise that these prompts are in the app.
- The public author is MJ Baruah. The portrait is disabled in the author registry and absent from bylines and author schema; the source asset is retained for possible future restoration. Compact text-only bylines replace the portrait layout.

The user authorized committing and pushing after final SEO/AEO verification on October 28, 2026. No environment changes are needed.

## Verification

Lint, production build, SEO/crawler checks and download-tracking tests passed. The audit verifies all 35 supplied prompts in server HTML, metadata and canonical consistency, source links, crawler access and image delivery. Browser checks passed at 320, 390, 768 and 1440 pixels, including the next/copy picker, its full 35-question cycle and the text-only byline.
