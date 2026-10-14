This is a [Next.js](https://nextjs.org) landing app for DreamDuo.

## Automatic IndexNow notifications

The root verification file uses the key from Bing's setup screen. Once deployed,
`https://dreamduo.app/b406e59e5a7946f49909c2530185b868.txt` must return the key as plain text.
No Bing access token or repository secret is needed for this public verification key.

Commit and push the workflow, script and verification file together, then allow the
production deployment to finish. Enable GitHub Actions in this site's repository.
The workflow uses Vercel's `repository_dispatch` event `vercel.deployment.success`,
and runs only when the payload environment is `production` and its aliases include
`dreamduo.app`. Vercel must be connected to this GitHub repository under Project
Settings > Git. It skips preview, failed and unrelated project deployments.
If the hosting integration does not emit these events,
call `node scripts/indexnow.mjs --submit --state-file .indexnow/state.json` from the
deployment pipeline **after** publishing to `https://dreamduo.app`, never as a build step.

For the first submission, open GitHub **Actions > Notify IndexNow after production
deployment > Run workflow** after the verification file is live. The default branch
must contain the workflow. Each run reads the live sitemap, covering the homepage,
blog, articles, topic pages, comparisons and other indexable pages. Previously submitted
URLs removed from the sitemap are included too, while the GitHub cache is available.
The sitemap must continue to list every page intended for indexing.

Preview without submitting: `npm run indexnow` (reads the live sitemap).
Preview a local sitemap: `npm run indexnow -- --sitemap-file path/to/sitemap.xml`.
Submit manually after publishing: `npm run indexnow -- --submit`.
Check results in GitHub Actions logs and Bing Webmaster Tools' IndexNow report.
HTTP 200 means received; HTTP 202 means key verification is pending. Notifications
do not guarantee indexing, ranking, or AI recommendations. Keep the sitemap and
Google Search Console setup; IndexNow is for participating search engines.

Protocol reference: [IndexNow documentation](https://www.indexnow.org/documentation).

## Waitlist API integration

This frontend expects the waitlist wrapper API (`/v1/waitlist`, `/v1/waitlist/count`).

1. Copy env template:

```bash
cp .env.example .env.local
```

2. Use one of:

- `NEXT_PUBLIC_WAITLIST_API_BASE_URL=/api` when your reverse proxy forwards `/api/*` to the waitlist backend.
- `NEXT_PUBLIC_WAITLIST_API_BASE_URL=http://127.0.0.1:9012` for local frontend dev against local backend.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4100](http://localhost:4100) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
