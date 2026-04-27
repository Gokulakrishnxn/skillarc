import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/types";

const TYPE_STYLES: Record<
  SkillType,
  { label: string; ring: string; text: string; bar: string }
> = {
  prompt: {
    label: "prompt",
    ring: "border-success/40",
    text: "text-success",
    bar: "bg-success",
  },
  tool: {
    label: "tool",
    ring: "border-info/40",
    text: "text-info",
    bar: "bg-info",
  },
  workflow: {
    label: "workflow",
    ring: "border-warning/40",
    text: "text-warning",
    bar: "bg-warning",
  },
  memory: {
    label: "memory",
    ring: "border-accent/40",
    text: "text-accent-soft",
    bar: "bg-accent",
  },
};

/**
 * Look up the shared color treatment for a given skill type — used by both
 * the SkillCard top-border accent and the type pill.
 */
export function getTypeStyle(type: SkillType) {
  return TYPE_STYLES[type];
}

interface TypeBadgeProps {
  type: SkillType;
  className?: string;
}

/**
 * Monospace pill that labels a skill's type (prompt / tool / workflow / memory).
 */
export function TypeBadge({ type, className }: TypeBadgeProps) {
  const style = TYPE_STYLES[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
        style.ring,
        style.text,
        "bg-card",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.bar)} />
      {style.label}
    </span>
  );
}

interface LLMBadgeProps {
  llm: string;
  className?: string;
}

/**
 * Compact pill for LLM compatibility (e.g. "GPT-4o", "Claude 3.5").
 */
export function LLMBadge({ llm, className }: LLMBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border-strong bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
        className,
      )}
    >
      {llm}
    </span>
  );
}

interface TagPillProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Filterable tag chip used in the skills index header.
 */
export function TagPill({ tag, active, onClick, className }: TagPillProps) {
  const interactive = typeof onClick === "function";
  const Component: "button" | "span" = interactive ? "button" : "span";
  return (
    <Component
      type={interactive ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors",
        active
          ? "border-accent/60 bg-accent/10 text-accent-soft"
          : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground",
        interactive && "cursor-pointer",
        className,
      )}
    >
      #{tag}
    </Component>
  );
}
