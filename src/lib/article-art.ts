/** Stable, asset-free artwork: adding an MDX entry is all the setup needed. */
const palettes = [
  { background: "#fce8ee", ink: "#252441", accent: "#ed6091", soft: "#f6bbcd" },
  { background: "#eeeafa", ink: "#30274b", accent: "#ad8cdb", soft: "#d4c5ef" },
  { background: "#fbeee3", ink: "#352839", accent: "#e99a84", soft: "#f2ceba" },
  { background: "#e9efeb", ink: "#243b38", accent: "#80aaa0", soft: "#bfd6cb" },
];

export function getArticleArt(seed: string) {
  let hash = 2166136261;
  for (const character of seed) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return { ...palettes[hash % palettes.length], variant: (hash >>> 4) % 4 };
}
