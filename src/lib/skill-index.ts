import { getAllSkills } from "./content";
import type { SkillDoc } from "./types";

/**
 * Lean, body-less skill payload safe to serialize into client components.
 * Removes the MDX body so we don't ship megabytes to the browser.
 */
export type SkillIndexEntry = Omit<SkillDoc, "body">;

export function getSkillIndex(): SkillIndexEntry[] {
  return getAllSkills().map((doc) => stripBody(doc));
}

/** Drop the heavy MDX body from a SkillDoc to make it client-safe. */
export function stripBody(doc: SkillDoc): SkillIndexEntry {
  const entry: SkillIndexEntry = {
    slug: doc.slug,
    category: doc.category,
    title: doc.title,
    description: doc.description,
    type: doc.type,
    llms: doc.llms,
    tags: doc.tags,
    author: doc.author,
    copies: doc.copies,
    stars: doc.stars,
    published: doc.published,
  };
  return entry;
}
