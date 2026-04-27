import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists with conflict resolution.
 * Mirrors the helper used throughout shadcn/ui.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Compact a number (e.g. 1234 → "1.2k") for stats badges.
 */
export function formatCount(value: number): string {
  if (value < 1000) return value.toString();
  if (value < 1_000_000) {
    const v = value / 1000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}k`;
  }
  return `${(value / 1_000_000).toFixed(1)}m`;
}

/**
 * Convert an arbitrary heading text to a stable kebab-case slug.
 * Used by the MDX renderer to wire anchor ids on H2/H3 headings.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
