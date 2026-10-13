# Search Console findings — October 13, 2026

Live checks of the exact examples supplied by the owner:

| URL | Observed response | Action |
| --- | --- | --- |
| `https://www.dreamduo.app/privacy` | 308 to apex `/privacy`, then 308 to `/privacy-policy`, final 200 | Keep the permanent `/privacy` alias in `next.config.ts`. Request a live test of the old URL and indexing of the final policy URL. |
| `https://cdn.dreamduo.app/` | 404 | This media host has no website homepage. Keep the real 404 rather than creating an empty 200 page. |
| `https://cdn.dreamduo.app/static-assets/` | 404 | Asset directories are not published pages. Do not add a directory index or put them in the sitemap. |
| `https://links.dreamduo.app/` | 400; DNS CNAME `links1.resend-dns.com` | This is Resend's tracking service. Test a real tracking URL from a sent email; the bare root has no tracking identifier and is not a marketing page. Preserve tracking DNS. |
| `http://dreamduo.app/` | Existing HTTPS canonical redirect | Expected exclusion: Google should index the HTTPS destination, not the redirect source. |

A real CDN image, `/static-assets/goal-templates/emergency-fund.webp`, returned 200 with `image/webp`. This confirms that a directory 404 does not mean all assets are broken. No blanket CDN crawl block or redirect is appropriate, because real assets may be needed to render public content.

The checks are public HTTP/DNS observations, not authenticated URL Inspection results. The privacy alias was already working in the live deployment when checked; this work also retains it in the local source. No deployment or Search Console submission was performed by this change.

## Search Console follow-up

1. Inspect `https://dreamduo.app/privacy-policy`, run **Test live URL**, and request indexing if the test succeeds.
2. Inspect the old `https://www.dreamduo.app/privacy` URL to confirm Google sees the redirect. It may move from “Not found” to “Page with redirect” after a recrawl; that is the correct result.
3. Submit the canonical `https://dreamduo.app/sitemap.xml` after publishing the new editorial pages. It lists working pages, not service roots or redirected aliases.
4. Use a URL-prefix Search Console property for `https://dreamduo.app/` when reviewing marketing-page coverage. A domain property also includes CDN and email service subdomains, so its excluded-URL totals are not all website defects.
5. Do not repeatedly validate the entire 404 group expecting intentional CDN directories to become indexable. Leave them excluded. Investigate any actual asset or article URL returning an unexpected error individually.

The new editorial build also has route-specific canonical, Open Graph and Twitter metadata, generated article previews, escaped JSON-LD, draft filtering, and meaningful sitemap/RSS modification dates. Unknown articles and tags continue to return 404 instead of redirecting unrelated URLs to the homepage.

## Crawler controls

The website's wildcard robots rule allows crawling, including Googlebot, OAI-SearchBot and GPTBot. OpenAI search crawling and model-training crawling are independent controls. No training preference has been changed. Real CDN/firewall accessibility still needs verification with actual crawler requests; a browser user-agent string is not proof of verified crawler access.

Google's AI search experiences use ordinary search eligibility and do not require a special AI file or special schema. Valid metadata and schema improve clarity but do not guarantee indexing, rich results or AI citations.

Sources: [Google crawling error guidance](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors), [Google HTTP status guidance](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes), [Resend custom tracking domains](https://resend.com/blog/introducing-custom-tracking-domain), [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), and [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).
