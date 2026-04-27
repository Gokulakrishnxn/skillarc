import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  SkillCategory,
  SkillDoc,
  SkillFrontmatter,
  TocEntry,
} from "./types";
import { slugify } from "./utils";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const CATEGORY_DIRS: Record<SkillCategory, string> = {
  skills: "skills",
  workflows: "workflows",
  tools: "tools",
};

function readMdxDir(category: SkillCategory): SkillDoc[] {
  const dir = path.join(CONTENT_ROOT, CATEGORY_DIRS[category]);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const fm = data as Partial<SkillFrontmatter>;

      return {
        slug,
        category,
        title: fm.title ?? slug,
        description: fm.description ?? "",
        type: fm.type ?? "prompt",
        llms: fm.llms ?? [],
        tags: fm.tags ?? [],
        author: fm.author ?? "community",
        copies: fm.copies ?? 0,
        stars: fm.stars ?? 0,
        published: fm.published ?? true,
        body: content,
      } satisfies SkillDoc;
    })
    .filter((doc) => doc.published);
}

let _cached: SkillDoc[] | null = null;

/**
 * Load every published MDX skill from disk. Memoized for the lifetime of the
 * Node process so we don't re-parse frontmatter on every page render.
 */
export function getAllSkills(): SkillDoc[] {
  if (_cached) return _cached;
  _cached = [
    ...readMdxDir("skills"),
    ...readMdxDir("workflows"),
    ...readMdxDir("tools"),
  ];
  return _cached;
}

export function getSkillsByCategory(category: SkillCategory): SkillDoc[] {
  return getAllSkills().filter((doc) => doc.category === category);
}

export function getSkillBySlug(
  category: SkillCategory,
  slug: string,
): SkillDoc | undefined {
  return getAllSkills().find(
    (doc) => doc.category === category && doc.slug === slug,
  );
}

/**
 * Parse H2 / H3 headings from raw MDX so the right-rail TOC can render them
 * with stable anchor ids before the MDX is compiled to React.
 */
export function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[`*_]/g, "");
    entries.push({ id: slugify(text), text, depth });
  }
  return entries;
}

/**
 * Sibling navigation order — used to render the prev/next pager at the bottom
 * of every doc page. Order mirrors the left sidebar.
 */
export interface PagerLink {
  title: string;
  href: string;
}

export function getCategoryPager(
  category: SkillCategory,
  slug: string,
): { prev: PagerLink | null; next: PagerLink | null } {
  const docs = getSkillsByCategory(category);
  const index = docs.findIndex((d) => d.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const base = `/${category}`;
  const prev = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;

  return {
    prev: prev ? { title: prev.title, href: `${base}/${prev.slug}` } : null,
    next: next ? { title: next.title, href: `${base}/${next.slug}` } : null,
  };
}
