"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";
import { CopyButton } from "../ui/CopyButton";
import { LLMBadge, TypeBadge, getTypeStyle } from "./SkillBadge";
import type { SkillIndexEntry } from "@/lib/skill-index";
import { cn, formatCount } from "@/lib/utils";

interface SkillCardProps {
  skill: SkillIndexEntry;
  /**
   * Verbatim snippet the user gets on clipboard when they hit "Copy" — the
   * page-level copy expands to the full body, but the card preview is enough
   * to drop into a system prompt.
   */
  copyValue: string;
}

const STAR_KEY = "skf:starred";
const STAR_EVENT = "skf:starred:change";

/**
 * Stable empty list returned during SSR and from the cache on first read so
 * `useSyncExternalStore` always sees a consistent reference.
 */
const EMPTY: readonly string[] = Object.freeze([]);

/**
 * Module-level snapshot cache. `useSyncExternalStore` requires that
 * `getSnapshot` return the same reference across calls when the underlying
 * value hasn't changed — otherwise React detects a "changed" snapshot every
 * render and loops forever.
 */
let cachedRaw: string | null | undefined = undefined;
let cachedList: readonly string[] = EMPTY;

function getStarredSnapshot(): readonly string[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STAR_KEY);
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  try {
    cachedList = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cachedList = EMPTY;
  }
  return cachedList;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

function subscribeStarred(notify: () => void): () => void {
  window.addEventListener(STAR_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(STAR_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

function useStarred(key: string): [boolean, () => void] {
  const list = useSyncExternalStore<readonly string[]>(
    subscribeStarred,
    getStarredSnapshot,
    getServerSnapshot,
  );
  const starred = list.includes(key);

  const toggle = useCallback(() => {
    try {
      const current = getStarredSnapshot();
      const next = current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key];
      window.localStorage.setItem(STAR_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(STAR_EVENT));
    } catch {
      /* swallow — quota / privacy errors shouldn't break the UI */
    }
  }, [key]);

  return [starred, toggle];
}

/**
 * Grid card used on listing pages. Contains a colored top border keyed by
 * skill type, the type/LLM badges, copy-to-clipboard, and a star toggle
 * persisted in localStorage.
 */
export function SkillCard({ skill, copyValue }: SkillCardProps) {
  const key = `${skill.category}/${skill.slug}`;
  const [starred, toggleStar] = useStarred(key);
  const [copies, setCopies] = useState(skill.copies);
  const stars = starred ? skill.stars + 1 : skill.stars;
  const style = getTypeStyle(skill.type);

  const visibleLLMs = skill.llms.slice(0, 2);
  const remainingLLMs = Math.max(0, skill.llms.length - visibleLLMs.length);
  const href = `/${skill.category}/${skill.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-strong hover:bg-card/80",
      )}
    >
      <div className={cn("h-[3px] w-full", style.bar)} aria-hidden />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <TypeBadge type={skill.type} />
            <span className="font-mono text-[10px] text-muted-foreground">
              @{skill.author}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleStar}
            aria-label={starred ? "Unstar skill" : "Star skill"}
            aria-pressed={starred}
            className={cn(
              "rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground",
              starred && "text-accent",
            )}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5",
                starred && "fill-accent text-accent",
              )}
            />
          </button>
        </div>

        <Link
          href={href}
          className="block focus:outline-none"
          aria-label={`Open ${skill.title}`}
        >
          <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-soft">
            {skill.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {skill.description}
          </p>
        </Link>

        <div className="flex flex-wrap items-center gap-1.5">
          {visibleLLMs.map((llm) => (
            <LLMBadge key={llm} llm={llm} />
          ))}
          {remainingLLMs > 0 && (
            <span className="font-mono text-[10px] text-muted-foreground">
              +{remainingLLMs} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3 font-mono">
            <span title="Copies">↳ {formatCount(copies)}</span>
            <span title="Stars" className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" /> {formatCount(stars)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton
              value={copyValue}
              label="Copy"
              onCopied={() => setCopies((c) => c + 1)}
              className="h-7 px-2"
            />
            <Link
              href={href}
              className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-foreground/70 hover:text-foreground"
              aria-label={`Read more about ${skill.title}`}
            >
              Read
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
