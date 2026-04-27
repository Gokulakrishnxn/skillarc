"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/types";

interface TableOfContentsProps {
  entries: TocEntry[];
}

/**
 * Right-rail "On this page" navigation. Uses an IntersectionObserver to mark
 * the heading currently in view as active.
 */
export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;

    const observed = entries
      .map((e) => document.getElementById(e.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] },
    );

    observed.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto py-10 pl-4 pr-6 xl:block">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-foreground">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id} className="relative -ml-px">
              <a
                href={`#${entry.id}`}
                className={cn(
                  "block py-1 pl-3 text-xs leading-snug transition-colors",
                  entry.depth === 3 && "pl-6",
                  active
                    ? "border-l-2 border-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                style={active ? { marginLeft: -1 } : undefined}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
