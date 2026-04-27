import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "CLI",
  description:
    "Use the Skillarc CLI to scaffold projects, copy skills into your repo, and validate frontmatter.",
};

const TOC = [
  { id: "install", text: "Install", depth: 2 as const },
  { id: "commands", text: "Commands", depth: 2 as const },
  { id: "examples", text: "Examples", depth: 2 as const },
];

const INSTALL = `pnpm dlx skillarc init
# or
npx skillarc init`;

const ADD = `skillarc add rag-retrieval-prompt
skillarc add deep-research-agent --dest ./skills`;

const VALIDATE = `skillarc validate ./skills/*.mdx
# ✔ rag-retrieval-prompt.mdx
# ✔ deep-research-agent.mdx
# ✘ broken-skill.mdx — missing required field "type"`;

export default function CLIPage() {
  return (
    <DocPage
      eyebrow="Docs · Getting Started"
      title="CLI"
      description="A small command-line companion for adding skills, validating MDX, and pinning skill versions."
      toc={TOC}
      prev={{ title: "Agent Skills", href: "/docs/agent-skills" }}
    >
      <Callout variant="info">
        The CLI is optional — anything it does can be done by editing your
        files directly. It just makes the common cases ergonomic.
      </Callout>

      <h2>Install</h2>
      <p>
        The CLI ships as a single binary you can run with <code>npx</code>{" "}
        without installing it globally:
      </p>
      <CodeBlock code={INSTALL} language="bash" filename="terminal" />

      <h2>Commands</h2>

      <h3>add</h3>
      <p>
        Copies a skill&apos;s MDX file into your local <code>./skills</code>{" "}
        folder so you own the source.
      </p>
      <CodeBlock code={ADD} language="bash" filename="terminal" />

      <h3>validate</h3>
      <p>
        Lints frontmatter against the Skillarc schema. Useful in CI to catch
        drift before it reaches the registry.
      </p>
      <CodeBlock code={VALIDATE} language="bash" filename="terminal" />

      <h2>Examples</h2>
      <p>
        Wire <code>validate</code> into a pre-commit hook or a GitHub Action:
      </p>
      <CodeBlock
        code={`name: validate

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npx skillarc validate ./skills/*.mdx`}
        language="yaml"
        filename=".github/workflows/validate.yml"
      />
    </DocPage>
  );
}
