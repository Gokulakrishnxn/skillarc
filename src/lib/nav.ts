import type { NavSection } from "./types";

/**
 * Top-of-page primary navigation. Mirrors the link set called out in the spec.
 */
export const PRIMARY_NAV: { label: string; href: string }[] = [
  { label: "Docs", href: "/docs/installation" },
  { label: "Compoents", href: "/docs/installation" },
  { label: "Blocks", href: "/blocks" },
  { label: "library", href: "/prompts" },
  { label: "Resources", href: "/tools" },
  { label: "Changelog", href: "/docs/changelog" },
  { label: "Community", href: "/community" },
];

/**
 * Left sidebar navigation, grouped exactly like shadcn/ui docs.
 * The "Filter by LLM" group routes back to the skills index with a pre-applied
 * query-param filter, so the active highlight state still works.
 */
export const SIDEBAR_NAV: NavSection[] = [
  {
    title: "Sections",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Library",
    items: [
      { title: "Prompt Templates", href: "/prompts" },
      {
        title: "AI Agents",
        href: "/workflows",
        badge: { label: "", tone: "green" },
      },
      {
        title: "Skills",
        href: "/skills",
        badge: { label: "", tone: "blue" },
      },
    ],
  },
  {
    title: "community",
    items: [
      { title: "community", href: "/community" },
      {
        title: "contribute on github",
        href: "https://github.com/Gokulakrishnxn/skillarc",
      },
    ],
  },
];
