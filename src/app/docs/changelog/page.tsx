import type { Metadata } from "next";
import { DocPage } from "@/components/layout/DocPage";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Notable releases and skill updates.",
};

const ENTRIES = [
  {
    version: "0.4.0",
    date: "2026-04-15",
    notes: [
      "Added Memory Skills as a first-class skill type.",
      "Skill cards now persist starred items in localStorage.",
      "New tool: file-reader with workspace-scoped path safety.",
    ],
  },
  {
    version: "0.3.2",
    date: "2026-03-08",
    notes: [
      "Fix: TOC scroll spy mis-fired on long pages with sticky elements.",
      "Bumped Shiki to 1.x — code blocks now use github-dark-dimmed.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-02-19",
    notes: [
      "Workflow registry launched with three reference pipelines.",
      "Search redesigned around fuzzy matching across tags and descriptions.",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-01-04",
    notes: [
      "First public beta. 11 community-contributed skills shipped.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <DocPage
      eyebrow="Docs"
      title="Changelog"
      description="A running log of registry releases, schema changes, and noteworthy skill additions."
    >
      <div className="not-prose space-y-8">
        {ENTRIES.map((entry) => (
          <section
            key={entry.version}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="m-0 font-mono text-sm font-semibold text-foreground">
                v{entry.version}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {entry.date}
              </span>
            </div>
            <ul className="m-0 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {entry.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DocPage>
  );
}
