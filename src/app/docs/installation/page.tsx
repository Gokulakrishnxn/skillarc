import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ArrowRight, Download, TerminalSquare, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Add the Skillarc SDK to your Node.js or Python project and start loading skills.",
};

const TOC = [
  { id: "quick-setup", text: "Quick setup", depth: 2 as const },
  { id: "node", text: "Node.js", depth: 2 as const },
  { id: "python", text: "Python", depth: 2 as const },
  { id: "no-sdk", text: "Without the SDK", depth: 2 as const },
  { id: "verify", text: "Verify the install", depth: 2 as const },
];

const PNPM = `pnpm add @skillarc/sdk`;
const NPM = `npm install @skillarc/sdk`;
const PIP = `pip install skillarc`;
const VERIFY = `import { loadSkill } from "@skillarc/sdk";

const prompt = await loadSkill("rag-retrieval-prompt");
console.log(prompt.metadata.title);
//=> RAG Retrieval Prompt`;

export default function InstallationPage() {
  return (
    <DocPage
      eyebrow="Docs · Getting Started"
      title="Installation"
      description="Pick the SDK that matches your runtime — or skip the SDK entirely and copy the raw skill files into your repo."
      toc={TOC}
      next={{ title: "Quickstart", href: "/docs/quickstart" }}
    >
      <h2>Quick setup</h2>
      <div className="not-prose my-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 inline-flex rounded-md border border-border-strong bg-background p-2 text-muted-foreground">
            <Download className="h-4 w-4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-foreground">1. Install SDK</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Add the package in Node.js or Python.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 inline-flex rounded-md border border-border-strong bg-background p-2 text-muted-foreground">
            <Wrench className="h-4 w-4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-foreground">2. Load a skill</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Fetch a template and adapt variables.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 inline-flex rounded-md border border-border-strong bg-background p-2 text-muted-foreground">
            <TerminalSquare className="h-4 w-4" aria-hidden />
          </div>
          <p className="text-sm font-medium text-foreground">3. Verify output</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Run a quick script and validate result.
          </p>
        </div>
      </div>

      <h2>Node.js</h2>
      <p>
        The SDK is published as ESM with bundled TypeScript types. Use whichever
        package manager you already have configured.
      </p>
      <CodeBlock code={PNPM} language="bash" filename="pnpm" />
      <CodeBlock code={NPM} language="bash" filename="npm" />

      <h2>Python</h2>
      <p>The Python SDK targets Python 3.10+ and ships type stubs.</p>
      <CodeBlock code={PIP} language="bash" filename="pip" />

      <h2>Without the SDK</h2>
      <Callout variant="info" title="Copy-paste is supported">
        Every skill page on the site has a <strong>Copy Page</strong> button.
        Drop the resulting MDX into your repo and parse the frontmatter however
        you like — the SDK is convenience, not lock-in.
      </Callout>
      <div className="not-prose mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Prefer manual integration? Browse the raw templates and copy exactly the
          parts you need into your project.
        </p>
        <Link
          href="/skills"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent-soft"
        >
          Browse skills
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <h2>Verify the install</h2>
      <p>Load a skill and print its title to make sure the registry is reachable:</p>
      <CodeBlock code={VERIFY} language="ts" filename="verify.ts" />
    </DocPage>
  );
}
