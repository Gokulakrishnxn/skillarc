import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PagerLink } from "@/lib/content";

interface PagerProps {
  prev: PagerLink | null;
  next: PagerLink | null;
}

/**
 * Bottom-of-page prev / next navigation, mirroring the shadcn/ui docs pager.
 */
export function Pager({ prev, next }: PagerProps) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6"
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
  );
}
