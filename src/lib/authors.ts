/** Shared public bylines and author identities for editorial pages. */

export interface Author {
  name: string;
  role: string;
  avatar?: string;
  /** Profile the byline links to. Also emitted as the schema's `url`. */
  url?: string;
}

const AUTHORS: Record<string, Author> = {
  "MJ Baruah": {
    name: "MJ Baruah",
    role: "Founder, DreamDuo",
    // avatar: "/blog/authors/manash-jyoti-baruah-cutout.webp",
    url: "/editorial-policy#author",
  },
};

export function getAuthor(name?: string): Author | null {
  if (!name) return null;
  return AUTHORS[name] ?? { name, role: "DreamDuo" };
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
