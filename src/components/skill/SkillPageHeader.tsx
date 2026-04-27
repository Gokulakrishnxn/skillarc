import { LLMBadge, TypeBadge } from "./SkillBadge";
import { CopyButton } from "../ui/CopyButton";
import { Star } from "lucide-react";
import { formatCount } from "@/lib/utils";
import type { SkillDoc } from "@/lib/types";

interface SkillPageHeaderProps {
  skill: SkillDoc;
}

/**
 * Hero block that sits above the MDX prose on an individual skill / workflow /
 * tool page. Includes title, description, type + LLM badges, copy/star metadata
 * and a "Copy Page" affordance.
 */
export function SkillPageHeader({ skill }: SkillPageHeaderProps) {
  return (
    <header className="space-y-4 border-b border-border pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <TypeBadge type={skill.type} />
        <span className="font-mono text-[11px] text-muted-foreground">
          @{skill.author}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          · {skill.category}
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {skill.title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            {skill.description}
          </p>
        </div>
        <CopyButton
          value={skill.body}
          label="Copy Page"
          message="Skill source copied to clipboard"
          className="shrink-0"
        />
      </div>

      {skill.llms.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Compatible
          </span>
          {skill.llms.map((llm) => (
            <LLMBadge key={llm} llm={llm} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-muted-foreground">
        <span>↳ {formatCount(skill.copies)} copies</span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3" /> {formatCount(skill.stars)} stars
        </span>
        {skill.tags.map((tag) => (
          <span key={tag} className="text-muted-foreground/80">
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
}
