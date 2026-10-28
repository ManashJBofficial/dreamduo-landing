# Bing scan fixes — October 28, 2026

The supplied CSV contains 36 URLs flagged for image alt attributes. The screenshots additionally identify the bucket-list printable for its description and two printables with repeated H1 headings.

## Changes

- The shared BrandMark image now has `alt="DreamDuo logo"`. It remains `aria-hidden` because adjacent text or the enclosing link already supplies its accessible name. Its image, dimensions, visual layout and loading behavior are unchanged. The former decorative empty alt was serialized as a bare `alt` attribute and flagged by the scanner.
- The bucket-list planner already had a description locally. Its HTML now has explicit head/body boundaries, so the description is unambiguously in the head. Existing noindex/follow behavior is retained for printables.
- The second-sheet titles in the daily calendar and visit planner are H2 elements with the existing large-title appearance. Each document now has one H1. The generator was updated and both tagged PDFs regenerated; each remains two pages with selectable text.
- The SEO audit now checks description placement, nonempty descriptive image alts and exactly one H1 across all HTML documents, including downloads. An optional CSV argument also replays affected URLs with their original query parameters.

## Verification

```powershell
npm run lint
npm run build
node scripts/check-seo.mjs http://localhost:4101 "path/to/PagesByIssueCategory.csv"
npm run test:download-tracking
npm run test:indexnow
```

Passed: 46 HTML documents, 296 images, all 36 CSV URLs, 33 sitemap pages, 59 internal destinations, 566 section links, 128 app-store links and 10 crawler user agents across 15 articles/comparisons. The three reported issue types have zero failures in the production-build replay. Canonicals, robots policies, structured data, RSS, attribution and redirects retain their previous checks. IndexNow tests use mocked submissions and do not publish URLs.

Local Lighthouse uses an isolated Edge browser and an HTTP/2 + Brotli proxy. SEO, accessibility and best practices score 100 on mobile and desktop before and after. Desktop performance is 100. An initial cold-server baseline scored 100 on mobile; warmed unchanged and fixed builds both scored 99 in the paired comparison (FCP 1.0 s, LCP 2.0 s, TBT 90 ms, CLS 0). Other fixed-build mobile samples ranged from 98–99. The initial observed-render LCP was 248 ms versus 84–86 ms after; simulated scores vary with timing, so a single 100 is not a permanent performance guarantee. No new page resources or client dependencies were added.

Bing's existing report is historical. Deploy these changes and run a fresh Bing scan to update its issue counts. These fixes are prepared on `fix/seo-scan-issues`; deployment is separate.
