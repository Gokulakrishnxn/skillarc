import type { Metadata } from "next";
import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SkillGrid } from "@/components/skill/SkillGrid";
import { getSkillsByCategory } from "@/lib/content";
import { stripBody } from "@/lib/skill-index";

export const metadata: Metadata = {
  title: "Prompts",
  description:
    "Prompt templates for agentic systems, LLM assistants, and customized task pipelines.",
};

export default function PromptsPage() {
  const prompts = getSkillsByCategory("skills").filter(
    (skill) => skill.type === "prompt",
  );
  const copyValues = Object.fromEntries(
    prompts.map((prompt) => [`${prompt.category}/${prompt.slug}`, prompt.body]),
  );
  const indexEntries = prompts.map(stripBody);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Suspense fallback={<div className="hidden w-60 lg:block" aria-hidden />}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 px-0 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mb-8 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              SkillArc Library · prompts
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Prompt Templates
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Reusable prompt templates for LLM tasks. Pick a template, tweak the
              variables, and paste into your agent runtime.
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
