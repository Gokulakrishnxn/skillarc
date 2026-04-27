import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Notable releases and skill updates.",
};

const ENTRIES = [
  {
    title: "Memory skills launch and favorites upgrade",
    version: "0.4.0",
    date: "2026-04-15",
    tags: ["Skills", "UX", "Tools"],
    notes: [
      "Added Memory Skills as a first-class skill type.",
      "Skill cards now persist starred items in localStorage.",
      "New tool: file-reader with workspace-scoped path safety.",
    ],
  },
  {
    title: "Stability patch for docs reading experience",
    version: "0.3.2",
    date: "2026-03-08",
    tags: ["Fixes", "Docs", "Infra"],
    notes: [
      "Fix: TOC scroll spy mis-fired on long pages with sticky elements.",
      "Bumped Shiki to 1.x — code blocks now use github-dark-dimmed.",
    ],
  },
  {
    title: "Workflow registry and improved search",
    version: "0.3.0",
    date: "2026-02-19",
    tags: ["Workflows", "Search"],
    notes: [
      "Workflow registry launched with three reference pipelines.",
      "Search redesigned around fuzzy matching across tags and descriptions.",
    ],
  },
  {
    title: "Public beta launch",
    version: "0.2.0",
    date: "2026-01-04",
    tags: ["Beta", "Community"],
    notes: [
      "First public beta. 11 community-contributed skills shipped.",
    ],
  },
];

function formatDate(input: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(input));
}

export default function ChangelogPage() {
  const sortedEntries = [...ENTRIES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <DocPage
      eyebrow="Docs"
      title="Changelog"
      description="A running log of SkillArc library releases, schema changes, and notable additions."
    >
      <div className="not-prose relative">
        {sortedEntries.map((entry) => (
          <article key={entry.version} className="relative pb-10">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-44 md:flex-shrink-0">
                <div className="md:sticky md:top-20">
                  <time className="mb-3 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {formatDate(entry.date)}
                  </time>
                  <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-card px-3 font-mono text-sm font-semibold text-foreground">
                    v{entry.version}
                  </div>
                </div>
              </div>

              <div className="relative flex-1 md:pl-8">
                <div className="absolute bottom-0 left-0 top-2 hidden w-px bg-border md:block">
                  <div className="absolute -left-1 top-0 h-2.5 w-2.5 rounded-full bg-accent" />
                </div>

                <div className="rounded-xl border border-border bg-card/85 p-5 md:p-6">
                  <h2 className="m-0 text-2xl font-semibold tracking-tight text-foreground">
                    {entry.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex h-6 items-center rounded-full border border-border bg-muted px-2.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {entry.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </DocPage>
  );
}
