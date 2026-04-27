import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Add the Skillarc SDK to your Node.js or Python project and start loading skills.",
};

const TOC = [
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
      prev={{ title: "Introduction", href: "/docs/introduction" }}
      next={{ title: "Quickstart", href: "/docs/quickstart" }}
    >
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

      <h2>Verify the install</h2>
      <p>Load a skill and print its title to make sure the registry is reachable:</p>
      <CodeBlock code={VERIFY} language="ts" filename="verify.ts" />
    </DocPage>
  );
}
