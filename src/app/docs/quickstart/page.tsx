import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Quickstart",
  description:
    "Wire up your first Skillarc prompt in five minutes. We'll load a skill, render it, and call an LLM.",
};

const TOC = [
  { id: "scaffold", text: "Scaffold a project", depth: 2 as const },
  { id: "load", text: "Load a skill", depth: 2 as const },
  { id: "call", text: "Call an LLM", depth: 2 as const },
  { id: "compose", text: "Compose with tools", depth: 2 as const },
];

const SCAFFOLD = `mkdir my-agent && cd my-agent
pnpm init
pnpm add @skillarc/sdk openai dotenv`;

const LOAD = `import "dotenv/config";
import { loadSkill } from "@skillarc/sdk";
import OpenAI from "openai";

const client = new OpenAI();
const prompt = await loadSkill("rag-retrieval-prompt");`;

const CALL = `const message = prompt.render({
  retrieved_chunks: [
    "[1] Transformers replaced RNNs in 2017.",
    "[2] Self-attention scales to long sequences.",
  ],
  question: "What replaced RNNs?",
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "system", content: message }],
});

console.log(response.choices[0].message.content);`;

const COMPOSE = `import { loadTool } from "@skillarc/sdk";

const search = await loadTool("web-search-tool");

const response = await client.responses.create({
  model: "gpt-4o",
  input: "What's the latest stable Python release?",
  tools: [search.toOpenAI()],
});`;

export default function QuickstartPage() {
  return (
    <DocPage
      eyebrow="Docs · Getting Started"
      title="Quickstart"
      description="Get to a working agent in five minutes. We'll scaffold a project, load a skill, and call an LLM."
      toc={TOC}
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "Agent Skills", href: "/docs/agent-skills" }}
    >
      <Callout variant="tip" title="Following along?">
        You&apos;ll need an <code>OPENAI_API_KEY</code> in your environment.
        Skillarc itself doesn&apos;t require any keys — it&apos;s just a
        skill registry.
      </Callout>

      <h2>Scaffold a project</h2>
      <CodeBlock code={SCAFFOLD} language="bash" filename="terminal" />

      <h2>Load a skill</h2>
      <p>
        Skills are referenced by slug. The SDK fetches the MDX file, parses the
        frontmatter, and gives you a typed handle:
      </p>
      <CodeBlock code={LOAD} language="ts" filename="agent.ts" />

      <h2>Call an LLM</h2>
      <p>
        The skill exposes a <code>render()</code> method that fills frontmatter
        variables in a type-safe way:
      </p>
      <CodeBlock code={CALL} language="ts" filename="agent.ts" />

      <h2>Compose with tools</h2>
      <p>
        Tools follow the same pattern. Convert to the format your runtime
        expects with <code>toOpenAI()</code>, <code>toAnthropic()</code> or{" "}
        <code>toGemini()</code>:
      </p>
      <CodeBlock code={COMPOSE} language="ts" filename="agent.ts" />
    </DocPage>
  );
}
