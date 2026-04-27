"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import {
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SkillCard } from "./SkillCard";
import { TagPill } from "./SkillBadge";
import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/types";
import type { SkillIndexEntry } from "@/lib/skill-index";

interface SkillGridProps {
  skills: SkillIndexEntry[];
  /** Body of each skill keyed by `category/slug` — used for the card copy action. */
  copyValues: Record<string, string>;
}

const TYPE_TABS: { id: "all" | SkillType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "prompt", label: "Prompts" },
  { id: "tool", label: "Tools" },
  { id: "workflow", label: "Workflows" },
  { id: "memory", label: "Memory" },
];

const LLM_FILTERS = ["All", "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral"];

interface FilterState {
  query: string;
  type: "all" | SkillType;
  llm: string;
  tags: string[];
}

type FilterAction =
  | { type: "set-query"; value: string }
  | { type: "set-type"; value: "all" | SkillType }
  | { type: "set-llm"; value: string }
  | { type: "toggle-tag"; value: string }
  | { type: "reset" }
  | { type: "hydrate"; partial: Partial<FilterState> };

const INITIAL: FilterState = {
  query: "",
  type: "all",
  llm: "All",
  tags: [],
};

function reducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "set-query":
      return { ...state, query: action.value };
    case "set-type":
      return { ...state, type: action.value };
    case "set-llm":
      return { ...state, llm: action.value };
    case "toggle-tag":
      return state.tags.includes(action.value)
        ? { ...state, tags: state.tags.filter((t) => t !== action.value) }
        : { ...state, tags: [...state.tags, action.value] };
    case "reset":
      return INITIAL;
    case "hydrate":
      return { ...state, ...action.partial };
  }
}

/**
 * Filtered + searchable grid of skill cards. Filter state lives in a reducer
 * (per the spec) and hydrates from the URL query params (`?type=`, `?llm=`)
 * so the left-sidebar links can deep-link into a pre-filtered view.
 */
export function SkillGrid({ skills, copyValues }: SkillGridProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INITIAL);

  // Hydrate from URL once on mount (and whenever the params object changes).
  useEffect(() => {
    const partial: Partial<FilterState> = {};
    const t = params?.get("type");
    if (
      t === "prompt" ||
      t === "tool" ||
      t === "workflow" ||
      t === "memory"
    ) {
      partial.type = t;
    }
    const llm = params?.get("llm");
    if (llm) partial.llm = llm;
    const tags = params?.get("tags");
    if (tags) partial.tags = tags.split(",").filter(Boolean);
    if (Object.keys(partial).length > 0) {
      dispatch({ type: "hydrate", partial });
    }
  }, [params]);

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: ["title", "description", "tags", "type"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [skills],
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [skills]);

  const filtered = useMemo(() => {
    let list = skills;
    if (state.query.trim()) {
      list = fuse.search(state.query).map((r) => r.item);
    }
    if (state.type !== "all") {
      list = list.filter((s) => s.type === state.type);
    }
    if (state.llm !== "All") {
      list = list.filter((s) =>
        s.llms.some((l) => l.toLowerCase().includes(state.llm.toLowerCase())),
      );
    }
    if (state.tags.length > 0) {
      list = list.filter((s) =>
        state.tags.every((t) => s.tags.includes(t)),
      );
    }
    return list;
  }, [skills, fuse, state]);

  const updateUrl = (next: Partial<FilterState>) => {
    const merged = { ...state, ...next };
    const usp = new URLSearchParams();
    if (merged.type !== "all") usp.set("type", merged.type);
    if (merged.llm !== "All") usp.set("llm", merged.llm);
    if (merged.tags.length > 0) usp.set("tags", merged.tags.join(","));
    const qs = usp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={state.query}
          onChange={(e) => dispatch({ type: "set-query", value: e.target.value })}
          placeholder="Search skills, tools, workflows…"
          className="h-10 w-full rounded-md border border-border-strong bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none"
          aria-label="Search skills"
        />
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border">
        {TYPE_TABS.map((tab) => {
          const active = state.type === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                dispatch({ type: "set-type", value: tab.id });
                updateUrl({ type: tab.id });
              }}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={active}
            >
              {tab.label}
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-px bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* LLM filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          LLM
        </span>
        {LLM_FILTERS.map((llm) => {
          const active = state.llm === llm;
          return (
            <button
              key={llm}
              type="button"
              onClick={() => {
                dispatch({ type: "set-llm", value: llm });
                updateUrl({ llm });
              }}
              className={cn(
                "rounded-full border px-3 py-0.5 font-mono text-[11px] transition-colors",
                active
                  ? "border-accent/60 bg-accent/10 text-accent-soft"
                  : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              {llm}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          <span className="font-mono text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "skill" : "skills"}
        </p>
        {(state.type !== "all" ||
          state.llm !== "All" ||
          state.tags.length > 0 ||
          state.query) && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "reset" });
              router.replace(pathname, { scroll: false });
            }}
            className="text-foreground hover:text-accent-soft"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <p className="text-sm text-foreground">No skills match these filters.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try clearing tags or switching the LLM filter back to All.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard
              key={`${skill.category}-${skill.slug}`}
              skill={skill}
              copyValue={
                copyValues[`${skill.category}/${skill.slug}`] ?? skill.title
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
