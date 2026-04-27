import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Workflow, Wrench } from "lucide-react";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Skillarc is the open registry of prompt templates, tool definitions, and agent workflows. Browse, copy, ship.",
};

const TOC = [
  { id: "what-is-skillarc", text: "What is Skillarc?", depth: 2 as const },
  { id: "skill-types", text: "Skill types", depth: 2 as const },
  { id: "philosophy", text: "Philosophy", depth: 2 as const },
  { id: "next-steps", text: "Next steps", depth: 2 as const },
];

const SAMPLE = `import { loadSkill } from "@skillarc/sdk";

const prompt = await loadSkill("rag-retrieval-prompt");
const message = prompt.render({
  retrieved_chunks: chunks,
  question: userQuestion,
});`;

export default function IntroductionPage() {
  return (
    <DocPage
      eyebrow="Docs · Getting Started"
      title="Introduction"
      description="Skillarc is an open registry of prompt templates, tool definitions, and agent workflows for the agentic era. Browse the library, copy the code you need, and ship faster."
      toc={TOC}
      next={{ title: "Installation", href: "/docs/installation" }}
    >
      <Callout variant="tip" title="Beta release">
        Skills are versioned and tagged but the registry API is still
        stabilizing. Pin <code>@skillarc/sdk</code> to a major version in
        production.
      </Callout>

      <h2>What is Skillarc?</h2>
      <p>
        Skillarc is to AI agents what shadcn/ui is to React components — a
        copy-paste-friendly catalog of artifacts that solve concrete problems.
        Every skill is a self-contained MDX file with YAML frontmatter, a prose
        explanation, and at least one runnable example.
      </p>
      <p>
        The library is organized into four skill types, every entry is
        compatible with at least one frontier model, and the ergonomics are
        built around &quot;view the source, copy the source, paste the
        source.&quot;
      </p>

      <h2>Skill types</h2>
      <div className="not-prose my-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Link
          href="/skills?type=prompt"
          className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-success/50 hover:bg-card/80"
        >
          <div className="mb-2 flex items-center gap-2 text-success">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-xs uppercase">prompts</span>
          </div>
          <p className="text-sm font-medium text-foreground">
            Prompt Templates
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            System prompts, few-shot patterns, persona scaffolds.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70 group-hover:text-accent-soft">
            Browse <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link
          href="/tools"
          className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-info/50 hover:bg-card/80"
        >
          <div className="mb-2 flex items-center gap-2 text-info">
            <Wrench className="h-4 w-4" />
            <span className="font-mono text-xs uppercase">tools</span>
          </div>
          <p className="text-sm font-medium text-foreground">
            Tool Definitions
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            JSON Schemas for function-calling — search, code, SQL, files.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70 group-hover:text-accent-soft">
            Browse <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link
          href="/workflows"
          className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-warning/50 hover:bg-card/80"
        >
          <div className="mb-2 flex items-center gap-2 text-warning">
            <Workflow className="h-4 w-4" />
            <span className="font-mono text-xs uppercase">workflows</span>
          </div>
          <p className="text-sm font-medium text-foreground">
            Agent Workflows
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Multi-step YAML pipelines for research, support, and analysis.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70 group-hover:text-accent-soft">
            Browse <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      <h2>Philosophy</h2>
      <ul>
        <li>
          <strong>Open by default.</strong> Every skill is MIT-licensed and
          attributed back to its author.
        </li>
        <li>
          <strong>Copy, don&apos;t install.</strong> The fastest path to
          production is owning the code in your repo.
        </li>
        <li>
          <strong>Model-agnostic.</strong> Skills declare LLM compatibility
          metadata so you can filter the registry to what works.
        </li>
        <li>
          <strong>Composable.</strong> Workflows reference skills and tools by
          name; nothing is locked behind a runtime.
        </li>
      </ul>

      <h2>Next steps</h2>
      <p>
        The fastest way to get a feel for the library is to install the SDK and
        load a skill.
      </p>

      <CodeBlock code={SAMPLE} language="ts" filename="example.ts" />
    </DocPage>
  );
}
