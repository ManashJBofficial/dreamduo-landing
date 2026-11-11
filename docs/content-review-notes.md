# Content review — November 11, 2026

## Changes in the P1 content commit

- Corrected three comparison pages' unsupported “Sunday Summit” feature claim. No matching implementation exists in the inspected mobile/backend source. A weekly review remains a useful activity, now linked as an editorial worksheet rather than advertised as a built-in feature.
- Replaced date-locked “future letters” wording with milestone messages. The current mobile composer (`frontend/app/goal/[id]/add-message.tsx`) requires a selected unreached milestone and submits `milestoneId`, `type` and `content`. A latent date field in the backend schema is insufficient evidence of a current mobile date-locking experience.
- Updated Lasting's free-access descriptions in its comparison and the five-app article to reflect the broader free content listed by its developer. Kept ambiguous purchase amounts unassigned to billing periods.
- Clarified that Paired's labeled annual prices are offers rather than a guaranteed range for every account, and removed an unsupported claim that its answer-and-reveal experience has “much more depth.”
- Added three contextual links to the existing weekly check-in guide and one relevant DreamDuo download link in the app-choice section. No successful article URLs, questions, existing store hrefs, referrer UTMs or canonical relationships were changed.
- Updated editorial modification dates only on the four articles with actual content changes. Recheck notes specify the sources reviewed, preserving the older date for claims not newly researched.

## Sources and verification scope

| Source | Verified finding |
| --- | --- |
| [Paired developer feature guide](https://support.paired.com/en/articles/164632-what-is-paired) | Free daily conversation, Timeline and Special Dates; Premium questions, quizzes, exercises, packs, games, journeys and insights. |
| [Paired US App Store](https://apps.apple.com/us/app/paired-couples-relationship/id1469609343) | Labeled $14.99 monthly and $39.99/$74.99 annual offers; other unlabeled purchase amounts do not establish a universal pricing schedule. |
| [Lasting US App Store](https://apps.apple.com/us/app/lasting-marriage-couples/id1225049619) | Five free Foundations sessions plus prompts, reminders and standalone sessions; paid subscriptions described as monthly/yearly, but individual purchase amounts lack consistent duration labels. |
| [Lasting workshops](https://getlasting.com/lasting-workshops-individuals-couples) | Advertises live licensed-therapist group workshops and anonymous Q&A. Current schedule and plan inclusion require in-app verification; the existing conditional wording is retained. |
| [Honeydue product guide](https://www.honeydue.com/how-it-works) | Free app, account/bill tracking and transaction discussion, with 20,000+ institutions across five countries advertised. Existing qualified wording is retained; bank reliability and current tips/advertising model are not established. |
| [Between US App Store](https://apps.apple.com/us/app/between-couples-love-tracker/id458035189) | Messaging, saved media and shared dates; description and purchase-list annual prices differ. Existing price caveat is retained. |
| [DreamDuo US App Store](https://apps.apple.com/us/app/dreamduo-a-couples-app/id6807477523), [Google Play](https://play.google.com/store/apps/details?id=com.dreamduo.app) | Live responses returned 200. US App Store labels Pro at $3.99 monthly / $39.99 yearly. Play description lists 3 active dreams, 3 collections, 100MB per person, 5 hidden messages and Pro storage of 2GB per person. These support the existing price/limit text, not a promise of all regional offers. |

The spicy and texting guides have different prompt collections and use cases. The bucket-list and care-package articles already include useful contextual planning/visit links, and the daily-calendar guide already demonstrates the real daily-question feature. Their successful content did not need broad rewrites. None of the historical Search Console numbers was treated as live query data, and there was no intent evidence sufficient to merge articles.

Competitor descriptions are based on published developer materials, not hands-on comparative testing. No ratings, reviews, competitor limitations or new prices were invented. Mobile/backend source was read for product verification only; those packages were not changed.

## Validation

Run the production build, lint and `scripts/check-seo.mjs` after the MDX changes. Confirm all four edited pages render, their modification dates propagate correctly, contextual links resolve, unsupported feature phrases are absent, and P0 still contains all 30 questions and two CTAs.

Executed results: production build, lint and `npx tsc --noEmit` passed; all 9 download/conversion unit tests passed again. The production SEO checker passed all 33 sitemap pages, 59 internal destinations, 566 fragments, 128 store links and 15 social cards. Playwright loaded all four edited pages and confirmed their visible content, new contextual link destinations, absence of the removed feature claims and `dateModified=2026-11-11` in article schema. The P0 article and store URLs remain protected by the earlier baseline comparison and unchanged content paths. The only lint notice was the existing outdated Browserslist database.
