import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Workflow, Wrench } from "lucide-react";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "SkillArc is an open library for docs, AI skills, AI agents, tools, prompts, and UI components.",
};

const TOC = [
  { id: "what-is-skillarc", text: "What is Skillarc?", depth: 2 as const },
  { id: "who-is-this-for", text: "Who is this for?", depth: 2 as const },
  { id: "how-to-get-started", text: "How to get started", depth: 2 as const },
  { id: "what-you-can-browse", text: "What you can browse", depth: 2 as const },
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
      description="SkillArc is an open library for Docs, AI Skills, AI Agents, Tools, and Prompts. Browse, copy, customize, and ship faster."
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
        SkillArc is an open library of ready-to-use building blocks for AI apps.
        Instead of starting from a blank page, you can pick proven prompts, tools,
        and agent workflows, then adapt them to your product.
      </p>
      <p>
        Every item is designed to be practical: readable source, clear metadata,
        and examples you can copy and run quickly.
      </p>

      <h2>Who is this for?</h2>
      <ul>
        <li>
          <strong>Developers</strong> building copilots, assistants, or
          automation workflows.
        </li>
        <li>
          <strong>Teams</strong> that want reusable standards for prompts, tools,
          and agent behaviors.
        </li>
        <li>
          <strong>Learners</strong> who want concrete examples to understand how
          modern AI systems are structured.
        </li>
      </ul>

      <h2>How to get started</h2>
      <ol>
        <li>
          Open the <strong>Skills</strong> or <strong>Prompts</strong> page and
          pick one item related to your use case.
        </li>
        <li>
          Copy the example and run it locally with your preferred model/provider.
        </li>
        <li>
          Add one <strong>Tool</strong> definition (for files, SQL, or code
          execution) to make your agent useful in real tasks.
        </li>
        <li>
          Move to <strong>AI Agents</strong> and combine multiple blocks into a
          full workflow.
        </li>
      </ol>

      <h2>What you can browse</h2>
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

      <h2>Next steps</h2>
      <p>
        Start with one simple flow: choose a prompt, connect one tool, and test
        an end-to-end output. Once that works, scale to multi-step agents with
        the AI Agents section.
      </p>

      <CodeBlock code={SAMPLE} language="ts" filename="example.ts" />
    </DocPage>
  );
}
