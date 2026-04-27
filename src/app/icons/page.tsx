import type { Metadata } from "next";
import { Download, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Icons",
  description: "Download SkillArc brand icons in SVG, PNG, and JPG formats.",
};

const FILES = [
  {
    label: "SVG",
    path: "/icons/skillarc-icon.svg",
    note: "Best for web and scalable UI use",
  },
  {
    label: "PNG",
    path: "/icons/skillarc-icon.png",
    note: "Transparent background raster export",
  },
  {
    label: "JPG",
    path: "/icons/skillarc-icon.jpg",
    note: "Compressed image for general sharing",
  },
];

export default function IconsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:px-8">
      <header className="mb-8 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          SkillArc Assets
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Icon Downloads
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Download the SkillArc icon in SVG, PNG, or JPG format for docs, social
          previews, repositories, and product UI.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-xl border border-border bg-card p-6">
          <p className="mb-4 text-sm font-medium text-foreground">Preview</p>
          <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-border-strong bg-background p-6">
            <img
              src="/icons/skillarc-icon.png"
              alt="SkillArc icon preview"
              className="h-48 w-48 rounded-2xl sm:h-56 sm:w-56"
            />
          </div>
        </article>

        <article className="rounded-xl border border-border bg-card p-6">
          <p className="mb-4 text-sm font-medium text-foreground">Download files</p>
          <div className="space-y-3">
            {FILES.map((file) => (
              <a
                key={file.label}
                href={file.path}
                download
                className="flex items-center justify-between rounded-lg border border-border-strong bg-background px-4 py-3 transition hover:border-accent/50 hover:bg-muted"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md border border-border bg-card p-1.5 text-muted-foreground">
                    <ImageIcon className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      SkillArc Icon ({file.label})
                    </p>
                    <p className="text-xs text-muted-foreground">{file.note}</p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-foreground/80" aria-hidden />
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
