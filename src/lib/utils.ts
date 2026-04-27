import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`
  return String(value)
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['".,!?()[\]{}:]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
