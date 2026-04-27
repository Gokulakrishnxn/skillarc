import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TableOfContents } from "./TableOfContents";
import { CopyButton } from "../ui/CopyButton";
import type { TocEntry } from "@/lib/types";
import type { PagerLink } from "@/lib/content";

interface DocPageProps {
  /** Title displayed at the top of the page. */
  title: string;
  /** Description displayed beneath the title. */
  description?: string;
  /** Optional plain-text source the "Copy Page" button writes to clipboard. */
  copyValue?: string;
  toc?: TocEntry[];
  prev?: PagerLink | null;
  next?: PagerLink | null;
  /** Crumb shown above the title, e.g. "Docs · Getting Started". */
  eyebrow?: string;
  children: ReactNode;
}

/**
 * Centered prose column + right-rail TOC + bottom pager. Used by every
 * docs/skill/workflow/tool detail page so the layout stays consistent.
 */
export function DocPage({
  title,
  description,
  copyValue,
  toc = [],
  prev,
  next,
  eyebrow,
  children,
}: DocPageProps) {
  return (
    <>
      <main className="min-w-0 flex-1 px-0 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <article className="skf-prose">
            <header className="mb-8 space-y-3 border-b border-border pb-6">
              {eyebrow && (
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {eyebrow}
                </p>
              )}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h1 className="m-0 text-3xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
                {copyValue && (
                  <CopyButton
                    value={copyValue}
                    label="Copy Page"
                    message="Page source copied"
                    className="shrink-0"
                  />
                )}
              </div>
              {description && (
                <p className="m-0 text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}
            </header>
            {children}
            {(prev || next) && (
              <nav
                aria-label="Pagination"
                className="not-prose mt-12 flex items-center justify-between gap-4 border-t border-border pt-6"
              >
                {prev ? (
                  <Link
                    href={prev.href}
                    className="group flex flex-col items-start gap-1 rounded-md border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:bg-muted"
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </span>
                    <span className="font-medium text-foreground transition-colors group-hover:text-accent-soft">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}
                {next ? (
                  <Link
                    href={next.href}
                    className="group flex flex-col items-end gap-1 rounded-md border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:bg-muted"
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      Next <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="font-medium text-foreground transition-colors group-hover:text-accent-soft">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}
              </nav>
            )}
          </article>
        </div>
      </main>
      <TableOfContents entries={toc} />
    </>
  );
}
