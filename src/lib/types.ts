/**
 * Shared domain types for Skillarc content.
 */

export type SkillType = "prompt" | "tool" | "workflow" | "memory";

export type SkillCategory = "skills" | "workflows" | "tools";

export type LLM =
  | "GPT-4o"
  | "Claude 3.5"
  | "Claude"
  | "Gemini 1.5"
  | "Gemini"
  | "Llama 3"
  | "Mistral";

export interface SkillFrontmatter {
  title: string;
  description: string;
  type: SkillType;
  llms: string[];
  tags: string[];
  author: string;
  copies: number;
  stars: number;
  published: boolean;
}

export interface SkillDoc extends SkillFrontmatter {
  slug: string;
  category: SkillCategory;
  body: string;
}

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface NavItem {
  title: string;
  href?: string;
  badge?: { label: string; tone: "blue" | "green" | "amber" | "orange" };
  disabled?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
