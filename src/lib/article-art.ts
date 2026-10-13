/** Stable, asset-free artwork: adding an MDX entry is all the setup needed. */
import BLOG_SLUG_REDIRECTS from "@/content/blog-slug-redirects.json";
const palettes = [
  { background: "#fff0f1", ink: "#941e35", accent: "#e94755", soft: "#f4a4ad" },
  { background: "#fbe9ec", ink: "#7d2038", accent: "#d93c53", soft: "#eda0af" },
  { background: "#fff1eb", ink: "#a52c38", accent: "#ed635e", soft: "#f7b9ac" },
  { background: "#f8e7e9", ink: "#751e32", accent: "#bd3549", soft: "#df8d9c" },
];

export function getArticleArt(seed: string) {
  seed = Object.entries(BLOG_SLUG_REDIRECTS).find(([, current]) => current === seed)?.[0] ?? seed;
  let hash = 2166136261;
  for (const character of seed) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  const topic = seed === "spicy-questions-long-distance-couples" ? "questions"
    : seed === "long-distance-care-package-ideas" ? "gifting"
    : seed === "couples-bucket-list" ? "journey"
    : seed === "best-couples-apps" || seed.startsWith("dreamduo-vs-") ? "comparison"
    : seed === "how-to-track-shared-goals-as-a-couple" ? "progress" : "general";
  const palette = topic === "journey" ? { background: "#fff1e5", ink: "#294d43", accent: "#d9764f", soft: "#edbf9c" }
    : topic === "comparison" ? { background: "#f0ecfa", ink: "#46315c", accent: "#9273c5", soft: "#cfc0e6" }
    : topic === "progress" ? { background: "#eaf2ed", ink: "#254c3e", accent: "#5d927b", soft: "#bad4c4" }
    : topic === "gifting" ? { background: "#fff2e4", ink: "#88402d", accent: "#bf674a", soft: "#f2c1a4" }
    : seed === "dreamduo-journal" ? { background: "#fff1eb", ink: "#b44c65", accent: "#f2a89f", soft: "#f9d5c9" }
    : palettes[(hash >>> 8) % palettes.length];
  return { ...palette, topic, variant: (hash >>> 12) % 8 };
}
