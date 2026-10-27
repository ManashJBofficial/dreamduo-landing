# Blog discovery review — October 28, 2026

All 11 blog articles were revised on `feat/seo-aeo-relationship-guides`. Final local checks passed on October 28, 2026. The user authorized committing and pushing after verification; deployment and live indexing submissions are separate steps.

## Article changes

| Guide | Revision |
| --- | --- |
| Weekly relationship check-in | Shortened the introductory setup; linked to scheduling guidance for partners in different time zones. |
| Long-distance care package | Replaced the promised recipient reaction in the description with concrete contents; added short answers about cost, food restrictions and personal notes. |
| FaceTime activities | Named specific activities in the opening answer rather than only describing how to choose one. |
| Daily long-distance questions | Added two actual example prompts near the top and identified the five kinds of conversation. |
| Long-distance spicy questions | Shortened the repeated introduction, simplified section headings and distinguished the reunion-focused guide from general texting questions. |
| Couples bucket list | Replaced introductory filler with a three-idea starting plan; linked to video-date ideas and the visit checklist. |
| Dirty questions over text | Added the relevant long-distance guide, updated meaningful modification date, and kept all 35 prompts in server HTML. The question set was subsequently replaced verbatim with the user-supplied explicit list. The article description, picker introduction and FAQ now match that list. A page-specific adult rating identifies this article without rating the whole site. The latest user revision removes categories and mood tabs; all 35 supplied prompts now appear in one numbered list. |
| Long-distance visit planner | Added a relevant activity guide for the period before the reunion. |
| Shared-goal tracking | Restored the useful guide to the main listing and RSS; moved the direct answer above the narrative; removed its repeated version; added practical FAQs. |
| Different time zones | Clarified that examples must be checked against the reader's own cities and dates; linked to activities for the agreed call window. |
| Couples app comparison | Added an answer by use case; corrected a Lasting paragraph incorrectly placed in the Paired section; replaced unsupported fixed Lasting billing periods with the current listing's actual limitation; added concise app-choice FAQs and a free question-guide link. |

Existing published URLs and redirects remain stable. Original publication dates are retained. The visible last-updated dates, article metadata and sitemap dates agree with these edits. User-selected photos and SVG title banners are preserved.

## Technical discovery

- Existing wildcard robots permission remains open. No search or AI crawler was newly blocked.
- BlogPosting now has a stable article ID, language, free-access status, author identity and a link to the matching Blog entity. Breadcrumb and canonical URLs remain consistent.
- Article metadata exposes the RSS alternate. The sitemap includes available representative cover images.
- `/llms.txt` is a static, generated directory of real product facts, canonical guides, comparison pages and policies. It is accessible as plain text and marked noindex/follow to avoid a competing search page. It is optional, not a Google ranking requirement or a recommendation guarantee.
- The texting guide has a continuous numbered list and a simple next/copy picker. Both interactive question collections retain their complete text without JavaScript.
- No new client scripts, fabricated reviews, FAQ rich-result promises or hidden recommendation instructions were added.

## Sources checked

- [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): normal search requirements, useful text content, internal discovery and structured data matching visible content.
- [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): no special schema is required for generative search visibility.
- [Google documentation updates](https://developers.google.com/search/updates): June 2026 clarification that llms.txt does not affect Google visibility or rankings; FAQ rich-result feature documentation was removed after deprecation. Visible reader FAQs still serve a purpose.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): search crawlers and training crawlers are separate controls.
- [Paired US App Store listing](https://apps.apple.com/us/app/paired-couples-relationship/id1469609343): $14.99 monthly listed alongside multiple annual offers, checked October 28.
- [Lasting US App Store listing](https://apps.apple.com/us/app/lasting-marriage-couples/id1225049619): free Foundations sessions, monthly/annual paid subscriptions and purchase entries that do not consistently identify billing periods, checked October 28.

## Verification and rollout

Required local checks: lint, production build and `node scripts/check-seo.mjs http://localhost:4101`. The SEO audit checks 33 sitemap pages, 15 article/comparison pages, 10 crawler user agents, unique metadata, canonical URLs, social images, internal/section links, redirects, real 404 responses, RSS and the optional text directory. It verifies all 65 prompts in the two question collections are in HTML without running JavaScript. Download tracking and IndexNow unit tests were also run; their mocked submission checks do not submit live URLs.

The currently deployed robots file and blog index returned HTTP 200 to ordinary and OAI-SearchBot user-agent GET requests. This does not prove access from a provider's actual IP ranges or change the deployed version. CDN/WAF rules and future indexing remain external conditions.

After user review and deployment, inspect representative URLs in Google Search Console, confirm the sitemap is fetched, and use the existing IndexNow workflow for Bing discovery. Compare impressions, clicks, source/medium, article store-click events and store-side acquisition separately. None of these local changes guarantees indexing, citations, recommendations or installs. No new environment variables are needed.

Explicit-content metadata follows [Google's page-specific adult-content guidance](https://developers.google.com/search/docs/specialty/explicit/guidelines). Explicit material may be filtered by SafeSearch; the rating is not an indexing block.

The author display name and content metadata are now MJ Baruah across all editorial pages. Portrait rendering is disabled and bylines are compact text-only blocks; the underlying portrait file remains available for restoration.
