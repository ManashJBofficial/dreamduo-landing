/** Reader-facing labels share the existing tag URLs; no duplicate category routes. */
export const primaryBlogTopics = [
  { tag: "shared-goals", label: "Shared goals" },
  { tag: "couples-apps", label: "Couples apps" },
  { tag: "bucket-list", label: "Bucket lists" },
  { tag: "long-distance", label: "Long-distance" },
];

const topicCopy: Record<string, { label: string; description: string }> = {
  "shared-goals": { label: "Shared goals", description: "Set a goal you can both act on, agree on the next step, and keep track of progress together. Start with a practical planning guide or choose an idea from the couples bucket list." },
  "couples-apps": { label: "Couples apps", description: "Compare couples apps for shared goals, daily conversations, budgeting and private chat. Our guide explains features, pricing and who each app suits, with links to official sources." },
  "bucket-list": { label: "Bucket lists", description: "Find ideas for small dates, creative projects and bigger adventures, with budgets, first steps and a printable planner to turn your favourites into plans." },
  "long-distance": { label: "Long-distance", description: "Find care package gifts, conversations and activities for couples living apart, with personal ideas for staying connected and planning your next visit." },
  "couples-questions": { label: "Couples questions", description: "Find daily conversation starters, a 30-day question calendar and a weekly relationship check-in worksheet. Our separate adult intimacy guide is clearly marked 18+." },
  "money": { label: "Money & saving", description: "Plan a savings target together and compare ways to track money as a couple. These guides cover shared responsibilities, realistic milestones and budgeting app options." },
  "couples-habits": { label: "Habits", description: "Make a shared habit easier to keep with a clear next action, visible progress and a brief weekly check-in that works for both of you." },
  "couples-activities": { label: "Activities", description: "Choose something to do together at home, outdoors or from different places. Browse bucket list ideas with first steps, or adult conversation questions for a private call." },
  "comparisons": { label: "App comparisons", description: "Explore our couples app comparison guide, with features, pricing, source links and a disclosure that we make DreamDuo." },
};

export function getBlogTopic(tag: string) {
  return topicCopy[tag] ?? { label: tag.replace(/-/g, " "), description: `Browse our published guides about ${tag.replace(/-/g, " ")} for couples.` };
}
