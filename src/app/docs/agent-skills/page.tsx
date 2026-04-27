import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { loadAgentSkills } from "@/lib/agent-skills";

export const metadata: Metadata = {
  title: "Agent Skills",
  description:
    "AgentSkills-compatible folders for tool teaching, local overrides, and runtime filtering.",
};

const TOC = [
  { id: "what-are-agent-skills", text: "What are Agent Skills?", depth: 2 as const },
  { id: "folder-layout", text: "Folder layout", depth: 2 as const },
  { id: "frontmatter-schema", text: "Frontmatter schema", depth: 2 as const },
  { id: "runtime-loading", text: "Runtime loading", depth: 2 as const },
  { id: "override-and-filter-flow", text: "Override and filter flow", depth: 2 as const },
];

const LAYOUT = `agent-skills/
  bundled/
    web-search-assistant/
      SKILL.md
    tool-use-safety/
      SKILL.md
  local/
    web-search-assistant/
      SKILL.md    # overrides bundled skill with same slug`;

const SKILL_MD = `---
name: "Web Search Assistant"
description: "Teach the agent to use web search tools for fresh, verifiable answers."
version: "1.0.0"
tags: ["research", "tool-use", "web"]
tools: ["web_search", "web_fetch"]
required_env: ["OPENAI_API_KEY"]
required_binaries: ["curl"]
required_config_flags: ["allowWebSearch"]
enabled: true
---

When freshness matters, search the web, fetch pages, and cite every source.`;

const LOADER = `import { loadAgentSkills } from "@/lib/agent-skills";

const result = loadAgentSkills({
  config: {
    flags: { allowWebSearch: true },
    disabledSkills: ["experimental-skill"],
  },
});

console.log(result.active.map((s) => [s.slug, s.source]));
// [["tool-use-safety", "bundled"], ["web-search-assistant", "local"]]`;

export default function AgentSkillsPage() {
  const result = loadAgentSkills({
    config: { flags: { allowWebSearch: true } },
  });

  return (
    <DocPage
      eyebrow="Docs · Agent Runtime"
      title="Agent Skills"
      description="Agent Skills are modular capabilities that extend Claude-style agents with tool instructions, metadata, and optional resources."
      toc={TOC}
      prev={{ title: "Quickstart", href: "/docs/quickstart" }}
      next={{ title: "CLI", href: "/docs/cli" }}
      copyValue={SKILL_MD}
    >
      <Callout variant="info" title="OpenClaw-compatible model">
        Skillarc supports AgentSkills-compatible folders where each skill is a
        directory containing a <code>SKILL.md</code> with YAML frontmatter and
        instructions. Bundled skills are loaded first, then local skills can
        override them by slug.
      </Callout>

      <h2>What are Agent Skills?</h2>
      <p>
        Agent Skills package focused behaviors that teach the assistant how to
        use tools safely and effectively. Each skill carries metadata
        (requirements, tags, tools) plus reusable instructions that are injected
        only when relevant.
      </p>

      <h2>Folder layout</h2>
      <p>
        Skillarc reads two roots: <code>agent-skills/bundled</code> and
        optional <code>agent-skills/local</code>.
      </p>
      <CodeBlock code={LAYOUT} language="text" filename="tree.txt" />

      <h2>Frontmatter schema</h2>
      <p>
        The <code>SKILL.md</code> frontmatter declares runtime requirements used
        by the loader.
      </p>
      <CodeBlock code={SKILL_MD} language="md" filename="SKILL.md" />

      <h2>Runtime loading</h2>
      <p>
        Use <code>loadAgentSkills()</code> to merge bundled and local skills,
        then filter by environment variables, config flags, and binary presence.
      </p>
      <CodeBlock code={LOADER} language="ts" filename="agent-skills.ts" />

      <h2>Override and filter flow</h2>
      <ul>
        <li>
          <strong>Merge:</strong> bundled skills load first, then local skills
          replace matching slugs.
        </li>
        <li>
          <strong>Filter:</strong> disabled or unmet requirements are skipped
          with structured reasons.
        </li>
        <li>
          <strong>Inspect:</strong> query <code>/api/agent-skills</code> to see
          active vs skipped skills in your current runtime.
        </li>
      </ul>

      <div className="not-prose mt-6 rounded-lg border border-border bg-card p-4">
        <p className="font-mono text-xs text-muted-foreground">Live Snapshot</p>
        <p className="mt-2 text-sm text-foreground">
          Active: <span className="font-mono">{result.active.length}</span> ·
          Skipped: <span className="font-mono">{result.skipped.length}</span>
        </p>
      </div>
    </DocPage>
  );
}
