import type { NavSection } from "./types";

/**
 * Top-of-page primary navigation. Mirrors the link set called out in the spec.
 */
export const PRIMARY_NAV: { label: string; href: string }[] = [
  { label: "Docs", href: "/docs/introduction" },
  { label: "AI Skills", href: "/skills" },
  { label: "AI Agents", href: "/workflows" },
  { label: "Tools", href: "/tools" },
  { label: "Prompts", href: "/prompts" },
  { label: "UI Components", href: "/ui-components" },
  { label: "Changelog", href: "/docs/changelog" },
];

/**
 * Left sidebar navigation, grouped exactly like shadcn/ui docs.
 * The "Filter by LLM" group routes back to the skills index with a pre-applied
 * query-param filter, so the active highlight state still works.
 */
export const SIDEBAR_NAV: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "Agent Skills", href: "/docs/agent-skills" },
      { title: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Skill Types",
    items: [
      {
        title: "Prompt Templates",
        href: "/skills?type=prompt",
        badge: { label: "", tone: "blue" },
      },
      { title: "Tool Definitions", href: "/skills?type=tool" },
      {
        title: "Agent Workflows",
        href: "/skills?type=workflow",
        badge: { label: "", tone: "green" },
      },
      { title: "Memory Skills", href: "/skills?type=memory" },
    ],
  },
  {
    title: "Filter by LLM",
    items: [
      { title: "All Models", href: "/skills" },
      { title: "GPT-4o", href: "/skills?llm=GPT-4o" },
      { title: "Claude 3.5", href: "/skills?llm=Claude" },
      { title: "Gemini 1.5", href: "/skills?llm=Gemini" },
      { title: "Llama 3", href: "/skills?llm=Llama%203" },
      { title: "Mistral", href: "/skills?llm=Mistral" },
    ],
  },
];
