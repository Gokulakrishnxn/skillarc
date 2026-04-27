import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  TerminalSquare,
  WandSparkles,
} from "lucide-react";

const FEATURE_CARDS = [
  {
    title: "Docs",
    description:
      "Clear documentation for setup, architecture, and contribution flow across the SkillArc ecosystem.",
    href: "/docs/introduction",
    icon: TerminalSquare,
  },
  {
    title: "AI Skills",
    description:
      "Production-ready prompts with frontmatter, examples, and model compatibility metadata.",
    href: "/skills",
    icon: Sparkles,
  },
  {
    title: "AI Agents",
    description:
      "Composable blueprints for customer support, deep research, and multi-step automation.",
    href: "/workflows",
    icon: Cpu,
  },
  {
    title: "Tools",
    description:
      "Standardized tool specs your agents can call across file, SQL, and code interpreter workflows.",
    href: "/tools",
    icon: Code2,
  },
  {
    title: "Prompts",
    description:
      "Reusable prompt templates designed for fast copy-paste integration into real agent systems.",
    href: "/prompts",
    icon: Sparkles,
  },
  {
    title: "SkillArc UI Components",
    description:
      "Consistent, dark-themed UI building blocks used across docs, listings, and detail pages.",
    href: "/ui-components",
    icon: TerminalSquare,
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="skf-grid-bg pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-60 w-[42rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[90px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:px-8 md:pb-24 md:pt-28">
        <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card/90 px-3 py-1 text-xs text-muted-foreground">
            <WandSparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Introducing SkillArc Library
          </span>
          <h1 className="mt-7 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The Foundation for Your AI Agent Stack
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            SkillArc is a library that provides Docs, AI Skills, AI Agents, Tools,
            Prompts, and SkillArc UI Components. Start with proven building blocks,
            then customize and ship fast.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/introduction"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
            >
              Start Building
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/skills"
              className="inline-flex h-10 items-center rounded-md border border-border-strong bg-card/90 px-4 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              View Skills
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-5xl rounded-xl border border-border bg-card/70 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Published skills
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">120+</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Supported models
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">15+</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Community contributors
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">80+</p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-xl border border-border bg-card/75 p-6 transition hover:-translate-y-0.5 hover:border-border-strong hover:bg-card"
            >
              <div className="mb-4 inline-flex rounded-md border border-border-strong bg-background/90 p-2 text-muted-foreground">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground/80 transition group-hover:text-foreground">
                Explore
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </section>

        <section className="mx-auto mt-16 flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Build faster. Keep your pages protected.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Contributors can add new skills, prompts, and agents through pull
            requests, while your core app pages stay review-locked with CODEOWNERS.
          </p>
          <Link
            href="/docs/quickstart"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-border-strong bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Read Quickstart
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </main>
  );
}
