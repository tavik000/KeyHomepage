import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface PostMeta {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Posts are stored as `src/content/blog/<slug>.<locale>.mdx`.
 * A post shown for a locale falls back to its English version when no
 * translation exists.
 */
function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const match = /^(.+)\.([a-zA-Z-]+)\.mdx$/.exec(file);
      if (!match) return null;
      const [, slug, locale] = match;
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        locale,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        content
      } satisfies Post;
    })
    .filter((p): p is Post => p !== null);
}

/** Unique slugs across all locales. */
export function getAllSlugs(): string[] {
  return [...new Set(readAll().map((p) => p.slug))];
}

/** Posts for a locale (English fallback), newest first. */
export function getPosts(locale: string): Post[] {
  const all = readAll();
  return getAllSlugs()
    .map(
      (slug) =>
        all.find((p) => p.slug === slug && p.locale === locale) ??
        all.find((p) => p.slug === slug && p.locale === "en")
    )
    .filter((p): p is Post => p !== undefined)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, locale: string): Post | undefined {
  const all = readAll();
  return (
    all.find((p) => p.slug === slug && p.locale === locale) ??
    all.find((p) => p.slug === slug && p.locale === "en")
  );
}
