# Skillarc

The open registry of prompt templates, tool definitions, workflows, and Agent Skills for modern AI agents.

Skillarc is a documentation-style library inspired by [shadcn/ui](https://ui.shadcn.com). Skills are stored as source files, reviewed in GitHub, and published through a standard pull-request workflow so any developer can contribute safely.

## What You Can Contribute

- **MDX registry skills** under `content/`:
  - `content/skills/*.mdx`
  - `content/workflows/*.mdx`
  - `content/tools/*.mdx`
- **AgentSkills-compatible folders** under `agent-skills/`:
  - `agent-skills/bundled/<slug>/SKILL.md`
  - `agent-skills/local/<slug>/SKILL.md` (local override pattern)

## Tech Stack

- **Next.js 16** (App Router, TypeScript strict)
- **Tailwind CSS v4**
- **Shiki** syntax highlighting (`github-dark-dimmed`)
- **Fuse.js** fuzzy search
- **next-mdx-remote** for MDX rendering
- **Lucide React**, **Sonner**, **Framer Motion**

## Repository Structure

```text
content/
  skills/                        Prompt and memory skill docs
  workflows/                     Multi-step workflow docs
  tools/                         Tool definition docs

agent-skills/
  bundled/                       Bundled AgentSkills folders
  local/                         Optional local override folders

src/
  app/
    docs/                        Documentation pages
    skills/                      Skills index + slug pages
    workflows/                   Workflows index + slug pages
    tools/                       Tools index + slug pages
    api/agent-skills/route.ts    Runtime inspection endpoint
  components/
  lib/
```

## Local Development

```bash
npm install
npm run dev
```

App URL: [http://localhost:3000](http://localhost:3000)

## Add a New MDX Skill

1. Create a new file:
   - `content/skills/<slug>.mdx`
   - or `content/workflows/<slug>.mdx`
   - or `content/tools/<slug>.mdx`
2. Add frontmatter:

```yaml
---
title: "My New Skill"
description: "One-line summary."
type: "prompt" # prompt | tool | workflow | memory
llms: ["GPT-4o", "Claude 3.5"]
tags: ["rag", "memory"]
author: "your-name"
copies: 0
stars: 0
published: true
---
```

3. Add sections such as `## Overview`, `## Usage`, `## Parameters`, `## Examples`.
4. Use fenced code blocks with optional filename metadata (example: ```` ```json:tool.json ````).
5. Run validation:

```bash
npm run lint
npm run build
```

## Add a New Agent Skill Folder

1. Create folder: `agent-skills/bundled/<slug>/`
2. Add `SKILL.md` with YAML frontmatter + instructions.

Example:

```md
---
name: "Web Search Assistant"
description: "Teach the agent to search and cite web sources."
version: "1.0.0"
tags: ["research", "web"]
tools: ["web_search", "web_fetch"]
required_env: ["OPENAI_API_KEY"]
required_binaries: ["curl"]
required_config_flags: ["allowWebSearch"]
enabled: true
---

When freshness matters, call web_search, fetch top sources, and cite output.
```

3. (Optional) Override a bundled skill locally with the same slug in `agent-skills/local/<slug>/SKILL.md`.
4. Inspect runtime loading result:

```bash
curl http://localhost:3000/api/agent-skills
```

## GitHub Contribution Workflow (Upload Skill)

Any developer can submit skills via GitHub PR:

1. **Fork** the repository (or create a feature branch if you have write access).
2. **Create branch**:
   ```bash
   git checkout -b feat/add-<skill-slug>
   ```
3. **Add your files** under `content/` or `agent-skills/`.
4. **Run checks locally**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit** with a clear message:
   ```bash
   git add .
   git commit -m "Add <skill name> skill definition"
   ```
6. **Push** branch and open a **Pull Request**.
7. In PR description include:
   - skill slug
   - category (`skills`, `workflows`, `tools`, or `agent-skills`)
   - supported models/tools
   - example usage snippet
   - screenshots (if UI pages changed)

## Contribution Standards

- Keep examples runnable and copy-paste safe.
- Do not commit secrets or API keys.
- Prefer concise instructions and explicit parameter definitions.
- Use kebab-case file/folder slugs.
- Ensure content is original or properly attributed.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create production build |
| `npm run start` | Run production server |

## Release Quality Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] New skill appears in listing/search
- [ ] Copy buttons and code blocks work
- [ ] Docs links and sidebar navigation are correct
