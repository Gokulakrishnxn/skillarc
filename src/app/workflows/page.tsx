import type { Metadata } from "next";
import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SkillGrid } from "@/components/skill/SkillGrid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { getSkillsByCategory } from "@/lib/content";
import { stripBody } from "@/lib/skill-index";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "AI agent templates with Python examples, runnable snippets, and npm install steps.",
};

const NPM_INSTALL = `npm install @skillarc/sdk openai zod`;

const PYTHON_AGENT = `from skillarc import Agent, Skill

research_agent = Agent(
    model="gpt-4o",
    skills=[
        Skill.load("rag-retrieval-prompt"),
        Skill.load("memory-summarizer"),
    ],
)

result = research_agent.run("Summarize this repo and suggest improvements")
print(result.text)`;

export default function WorkflowsIndexPage() {
  const agents = getSkillsByCategory("workflows");
  const copyValues = Object.fromEntries(
    agents.map((agent) => [`${agent.category}/${agent.slug}`, agent.body]),
  );
  const indexEntries = agents.map(stripBody);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Suspense fallback={<div className="hidden w-60 lg:block" aria-hidden />}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 px-0 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mb-8 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              SkillArc Library · ai agents
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              AI Agents
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Production-ready AI agent workflows with implementation guidance.
              Start with npm packages, adapt the Python sample, then customize
              each workflow for your stack.
            </p>
          </header>

          <section className="mb-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="mb-2 text-sm font-medium text-foreground">
                Install from npm
              </p>
              <CodeBlock code={NPM_INSTALL} language="bash" filename="terminal" />
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="mb-2 text-sm font-medium text-foreground">
                Python agent starter
              </p>
              <CodeBlock code={PYTHON_AGENT} language="python" filename="agent.py" />
            </div>
          </section>

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
