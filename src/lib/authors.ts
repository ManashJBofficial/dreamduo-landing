/**
 * Bylines for the article sidebar and the Person schema. A real name, role and
 * photo next to an article is one of the clearest trust signals a small site
 * can give, to readers and to Google alike.
 *
 * To add a photo: put a small image at public/blog/authors/<name>.webp
 * (400px wide is plenty) and set `avatar` to its path. Until then the card shows
 * initials.
 */

export interface Author {
  name: string;
  role: string;
  avatar?: string;
  /** Profile the byline links to. Also emitted as the schema's `url`. */
  url?: string;
}

const AUTHORS: Record<string, Author> = {
  "Manash Jyoti Baruah": {
    name: "Manash Jyoti Baruah",
    role: "Founder, DreamDuo",
    avatar: "/blog/authors/manash-jyoti-baruah-cutout.webp",
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
