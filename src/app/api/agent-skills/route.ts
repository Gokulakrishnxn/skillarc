import { NextResponse } from "next/server";
import { loadAgentSkills } from "@/lib/agent-skills";

export const dynamic = "force-static";

/**
 * Runtime introspection endpoint for AgentSkills loading.
 * Useful while authoring skills to verify override/filter behavior.
 */
export async function GET() {
  const result = loadAgentSkills({
    config: {
      flags: {
        allowWebSearch: true,
      },
    },
  });

  return NextResponse.json({
    active_count: result.active.length,
    skipped_count: result.skipped.length,
    active: result.active.map((skill) => ({
      slug: skill.slug,
      source: skill.source,
      name: skill.frontmatter.name,
      description: skill.frontmatter.description,
      tools: skill.frontmatter.tools ?? [],
      tags: skill.frontmatter.tags ?? [],
      resources: skill.resources,
    })),
    skipped: result.skipped,
  });
}
