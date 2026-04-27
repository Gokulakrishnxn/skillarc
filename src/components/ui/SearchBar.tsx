"use client";

import Fuse from "fuse.js";
import {
  ArrowRight,
  FileCode2,
  Search,
  SquareTerminal,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/types";
import type { SkillIndexEntry } from "@/lib/skill-index";

interface SearchBarProps {
  skills: SkillIndexEntry[];
  /** Compact (icon-only) trigger used in the navbar. */
  compact?: boolean;
  className?: string;
}

const TYPE_ICON: Record<SkillType, typeof Search> = {
  prompt: SquareTerminal,
  tool: FileCode2,
  workflow: Workflow,
  memory: Search,
};

/**
 * Command-K style search popover. Fuse.js indexes title, description, tags and
 * type so a user can fuzzy-find any skill. Keyboard navigation: ArrowUp/Down
 * to move, Enter to open, Escape to close, Cmd/Ctrl+K to summon from anywhere.
 */
export function SearchBar({ skills, compact = false, className }: SearchBarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.25 },
          { name: "tags", weight: 0.15 },
          { name: "type", weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [skills],
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return skills.slice(0, 8);
    }
    return fuse
      .search(query)
      .slice(0, 10)
      .map((r) => r.item);
  }, [query, fuse, skills]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  useEffect(() => {
    function onGlobalKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onGlobalKey);
    return () => window.removeEventListener("keydown", onGlobalKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[active];
      if (target) {
        router.push(`/${target.category}/${target.slug}`);
        close();
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search skills"
        className={cn(
          compact
            ? "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground transition hover:border-accent/50 hover:bg-muted hover:text-foreground"
            : "inline-flex h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-border-strong bg-card/90 px-3 text-sm text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.03)] transition hover:border-accent/45 hover:bg-card",
          className,
        )}
      >
        <Search className="h-4 w-4" aria-hidden />
        {!compact && (
          <>
            <span className="flex-1 text-left">Search docs, skills, tools...</span>
            <kbd className="hidden items-center gap-1 rounded-md border border-border-strong bg-background px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground sm:inline-flex">
              <span className="text-xs">⌘</span>
              <span>K</span>
            </kbd>
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Skill search"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh]"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-popover shadow-[0_20px_80px_rgba(0,0,0,0.6)] skf-fade-in">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search skills, tools, workflows…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search query"
              />
              <kbd className="hidden items-center gap-1 rounded-md border border-border-strong bg-background px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground sm:inline-flex">
                esc
              </kbd>
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2.5">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No skills match{" "}
                  <span className="font-mono text-foreground">{query}</span>
                </div>
              ) : (
                <ul role="listbox" className="space-y-0.5">
                  {results.map((skill, index) => {
                    const Icon = TYPE_ICON[skill.type];
                    const href = `/${skill.category}/${skill.slug}`;
                    const isActive = index === active;
                    return (
                      <li key={`${skill.category}-${skill.slug}`}>
                        <Link
                          href={href}
                          onClick={close}
                          onMouseEnter={() => setActive(index)}
                          className={cn(
                            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted/60",
                          )}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-foreground">
                              {skill.title}
                            </span>
                            <span className="block truncate text-xs">
                              {skill.description}
                            </span>
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>
                <kbd className="font-mono">↑↓</kbd> navigate ·{" "}
                <kbd className="font-mono">↵</kbd> open ·{" "}
                <kbd className="font-mono">esc</kbd> close
              </span>
              <span className="font-mono">{results.length} result(s)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
