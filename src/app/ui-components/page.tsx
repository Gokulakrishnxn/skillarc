import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutTemplate, Search, Sidebar as SidebarIcon } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "UI compoents",
  description:
    "SkillArc UI components for docs shells, navigation, search, and content presentation.",
};

const INSTALL = `npm install lucide-react sonner shiki`;

const COMPONENTS = [
  {
    name: "DocShell",
    description: "App shell layout for docs pages with navbar + side rails.",
    source: "src/components/layout/DocShell.tsx",
    icon: LayoutTemplate,
  },
  {
    name: "Sidebar",
    description: "Section navigation with active highlighting and grouped links.",
    source: "src/components/layout/Sidebar.tsx",
    icon: SidebarIcon,
  },
  {
    name: "SearchBar",
    description: "Global search entry with skill index lookup and quick actions.",
    source: "src/components/ui/SearchBar.tsx",
    icon: Search,
  },
];

export default function UiComponentsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8">
      <header className="mb-10 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          SkillArc Library · ui compoents
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          UI compoents
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground">
          Reusable UI components used across SkillArc docs and listings. Compose
          these blocks to build consistent AI product interfaces quickly.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-border bg-card p-5">
        <p className="mb-2 text-sm font-medium text-foreground">
          Install base dependencies
        </p>
        <CodeBlock code={INSTALL} language="bash" filename="terminal" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {COMPONENTS.map(({ name, description, source, icon: Icon }) => (
          <article
            key={name}
            className="rounded-xl border border-border bg-card p-5 transition hover:border-border-strong"
          >
            <div className="mb-3 inline-flex rounded-md border border-border-strong bg-background p-2 text-muted-foreground">
              <Icon className="h-4 w-4" aria-hidden />
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <p className="mt-3 rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-muted-foreground">
              {source}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Build your own pages
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start from docs structure and customize with your own cards, grids, and
          content modules.
        </p>
        <Link
          href="/docs/installation"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-soft"
        >
          Open docs installation
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </main>
  );
}
