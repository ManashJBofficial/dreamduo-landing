# Verification — October 13, 2026

- `npm.cmd run lint`: passed with no errors or warnings.
- `npm.cmd run build`: passed; 33 static outputs, including six article-specific social image routes.
- `node scripts/check-seo.mjs http://127.0.0.1:4101`: passed for 18 sitemap pages, 19 internal destinations, six PNG social cards, the permanent privacy alias, real unknown-route 404s, robots and RSS.
- Edge/Playwright: 15 views across 375, 768 and 1440 pixels for the blog, roundup article, comparison hub, Lasting comparison and money topic. No horizontal page overflow, missing fragment destinations or browser errors. Earlier checks also verified the shared-goals article, table scrolling, table-of-contents jumps and the keyboard skip link.
- Navigation from an article to the homepage's Dreams section passed with JavaScript disabled. Article content and artwork are server-rendered.
- Visually reviewed desktop and mobile screenshots plus the generated social preview. Evidence is in the repository root under `docs/audits/2026-10-13/final-*.png` and `final-browser-results.json`.

Content corrections cover both blog articles and all four comparisons: sourced claims, disclosure of ownership and research method, store/currency context, disputed Between annual pricing, Lasting's workshops and research basis, Paired's broader feature set, Honeydue's bank coverage and funding caveats, and explicit time periods for savings examples. Meaningful edit dates are October 13, 2026; original publication dates remain unchanged.

The website robots rule permits OAI-SearchBot and GPTBot through its wildcard rule. Their search and training purposes were assessed separately; no training preference was changed. No special AI file or unsupported schema was added.

Owner follow-up outside the landing-site implementation: reconcile the product's free storage limits and Pro capacity across the current app paywall, public subscription controller and store descriptions. The editorial figures follow the checked public listings and permission defaults, but the production account configuration was not inspected. The legal Terms page also contains an existing operator-name placeholder that needs the owner's actual legal identity.

These are local production checks and public HTTP observations. They are not Google field-performance data, authenticated Search Console validation, a Rich Results Test, a test of real crawler source IPs, or a test of every competitor app. No deployment was performed by this work.
