import { Suspense } from "react";
import { Sidebar } from "../layout/Sidebar";
import { SkillGrid } from "./SkillGrid";
import { getSkillsByCategory } from "@/lib/content";
import { stripBody } from "@/lib/skill-index";
import type { SkillCategory } from "@/lib/types";

interface CategoryIndexProps {
  category: SkillCategory;
  title: string;
  description: string;
}

/**
 * Shared shell for the /skills, /workflows, and /tools listing pages.
 * Filters the registry to the requested category before passing data to the
 * client-side `SkillGrid`.
 */
export function CategoryIndex({
  category,
  title,
  description,
}: CategoryIndexProps) {
  const skills = getSkillsByCategory(category);
  const copyValues = Object.fromEntries(
    skills.map((s) => [`${s.category}/${s.slug}`, s.body]),
  );
  const indexEntries = skills.map(stripBody);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Suspense fallback={<div className="hidden w-60 lg:block" aria-hidden />}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 px-0 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mb-8 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Registry · {category}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              {description}
            </p>
          </header>
          <Suspense
            fallback={
              <div className="h-32 animate-pulse rounded-md border border-border bg-card" />
            }
          >
            <SkillGrid skills={indexEntries} copyValues={copyValues} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
