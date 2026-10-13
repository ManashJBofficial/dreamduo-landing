# Editorial pages and automatic artwork

Add an MDX file in `src/content/blog` or `src/content/compare`. Required frontmatter is `title`, `description`, and ISO `date`. Optional fields include `updated`, `tags`, `author`, `competitor` and `draft`.

The filename becomes the URL slug and seeds the artwork. A stable hash selects one of four palettes and four SVG patterns. Cards, article banners and the generated 1200 × 630 social preview use the same seed. No image upload, external generation service or frontmatter artwork field is needed. Renaming a slug changes its artwork and URL; add a permanent redirect when renaming a published article.

`draft: true` previews in development but is excluded from production pages, sitemap, RSS and listings. Existing optional cover overrides and inline screenshots remain supported. An inline screenshot illustrates the product; it is not required for a banner.

Update `updated` only after a meaningful edit. Competitor facts should link to official sources, identify the date checked, and distinguish an advertised feature from a personally tested one. State the store/currency for prices and use checkout as the final authority when offers differ.

Verification: run `npm run lint`, `npm run build`, then start the production server and run `node scripts/check-seo.mjs http://localhost:4100`.
