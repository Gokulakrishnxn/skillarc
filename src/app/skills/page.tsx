import type { Metadata } from "next";
import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SkillGrid } from "@/components/skill/SkillGrid";
import { getAllSkills } from "@/lib/content";
import { stripBody } from "@/lib/skill-index";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Every skill in the registry — prompts, tools, workflows, and memory templates.",
};

/**
 * The flagship listing page. Pulls the entire registry, strips MDX bodies for
 * the client, and renders the filterable grid.
 */
export default function SkillsIndexPage() {
  const skills = getAllSkills();
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
              Registry
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Skills
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Every skill in the registry — prompts, tools, workflows, and
              memory templates. Filter by type, LLM compatibility, or tag.
              Copy what you need; own the code.
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
