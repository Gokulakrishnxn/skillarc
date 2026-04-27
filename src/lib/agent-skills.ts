import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface AgentSkillFrontmatter {
  name: string;
  description: string;
  version?: string;
  tags?: string[];
  tools?: string[];
  /** If false, the skill is excluded regardless of runtime environment. */
  enabled?: boolean;
  /**
   * Required environment variables; all must be present at load time.
   * Example: ["OPENAI_API_KEY", "SUPABASE_URL"]
   */
  required_env?: string[];
  /**
   * Required binaries discoverable on PATH.
   * Example: ["git", "python3", "ffmpeg"]
   */
  required_binaries?: string[];
  /**
   * Runtime config flags that must be true.
   * Example: ["allowWebSearch", "enableToolUse"]
   */
  required_config_flags?: string[];
}

export interface AgentSkillDoc {
  slug: string;
  source: "bundled" | "local";
  dirPath: string;
  markdownPath: string;
  frontmatter: AgentSkillFrontmatter;
  instructions: string;
  resources: string[];
}

export interface AgentSkillRuntimeConfig {
  enabledSkills?: string[];
  disabledSkills?: string[];
  flags?: Record<string, boolean>;
}

export interface AgentSkillLoadOptions {
  bundledRoot?: string;
  localRoot?: string;
  env?: NodeJS.ProcessEnv;
  config?: AgentSkillRuntimeConfig;
}

export interface AgentSkillLoadResult {
  active: AgentSkillDoc[];
  skipped: Array<{
    slug: string;
    source: "bundled" | "local";
    reason:
      | "disabled_in_frontmatter"
      | "missing_required_env"
      | "missing_required_binary"
      | "missing_required_config_flag"
      | "disabled_by_runtime_config"
      | "not_in_enabled_allowlist";
    details?: string[];
  }>;
}

const DEFAULT_BUNDLED_ROOT = path.join(
  process.cwd(),
  "agent-skills",
  "bundled",
);
const DEFAULT_LOCAL_ROOT = path.join(process.cwd(), "agent-skills", "local");

/**
 * Return true when a binary can be resolved from PATH.
 */
function hasBinary(binary: string, env: NodeJS.ProcessEnv): boolean {
  const pathEnv = env.PATH ?? "";
  if (!pathEnv) return false;
  const delimiter = process.platform === "win32" ? ";" : ":";
  const dirs = pathEnv.split(delimiter).filter(Boolean);

  return dirs.some((dir) => {
    const full = path.join(dir, binary);
    try {
      fs.accessSync(full, fs.constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
}

function readSkillDir(
  root: string,
  source: "bundled" | "local",
): AgentSkillDoc[] {
  if (!fs.existsSync(root)) return [];
  const docs: AgentSkillDoc[] = [];

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const slug = entry.name;
    const dirPath = path.join(root, slug);
    const markdownPath = path.join(dirPath, "SKILL.md");
    if (!fs.existsSync(markdownPath)) continue;

    const raw = fs.readFileSync(markdownPath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as Partial<AgentSkillFrontmatter>;

    const resources = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((item) => item.name !== "SKILL.md")
      .map((item) => item.name);

    docs.push({
      slug,
      source,
      dirPath,
      markdownPath,
      frontmatter: {
        name: frontmatter.name ?? slug,
        description: frontmatter.description ?? "",
        version: frontmatter.version,
        tags: frontmatter.tags ?? [],
        tools: frontmatter.tools ?? [],
        enabled: frontmatter.enabled ?? true,
        required_env: frontmatter.required_env ?? [],
        required_binaries: frontmatter.required_binaries ?? [],
        required_config_flags: frontmatter.required_config_flags ?? [],
      },
      instructions: content.trim(),
      resources,
    });
  }

  return docs;
}

/**
 * Load AgentSkills-compatible folders:
 * - Bundled skills from `agent-skills/bundled/*`
 * - Optional local overrides from `agent-skills/local/*` (same slug wins)
 * - Runtime filtering based on env/config/binary presence
 */
export function loadAgentSkills(
  options: AgentSkillLoadOptions = {},
): AgentSkillLoadResult {
  const bundledRoot = options.bundledRoot ?? DEFAULT_BUNDLED_ROOT;
  const localRoot = options.localRoot ?? DEFAULT_LOCAL_ROOT;
  const env = options.env ?? process.env;
  const config = options.config ?? {};

  const bundled = readSkillDir(bundledRoot, "bundled");
  const local = readSkillDir(localRoot, "local");

  // local overrides bundled when the slug matches
  const merged = new Map<string, AgentSkillDoc>();
  for (const skill of bundled) merged.set(skill.slug, skill);
  for (const skill of local) merged.set(skill.slug, skill);

  const active: AgentSkillDoc[] = [];
  const skipped: AgentSkillLoadResult["skipped"] = [];

  for (const skill of merged.values()) {
    const fm = skill.frontmatter;

    if (fm.enabled === false) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "disabled_in_frontmatter",
      });
      continue;
    }

    if (config.enabledSkills && !config.enabledSkills.includes(skill.slug)) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "not_in_enabled_allowlist",
      });
      continue;
    }

    if (config.disabledSkills?.includes(skill.slug)) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "disabled_by_runtime_config",
      });
      continue;
    }

    const missingEnv = (fm.required_env ?? []).filter((name) => !env[name]);
    if (missingEnv.length > 0) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "missing_required_env",
        details: missingEnv,
      });
      continue;
    }

    const missingBinaries = (fm.required_binaries ?? []).filter(
      (binary) => !hasBinary(binary, env),
    );
    if (missingBinaries.length > 0) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "missing_required_binary",
        details: missingBinaries,
      });
      continue;
    }

    const missingFlags = (fm.required_config_flags ?? []).filter(
      (flag) => !config.flags?.[flag],
    );
    if (missingFlags.length > 0) {
      skipped.push({
        slug: skill.slug,
        source: skill.source,
        reason: "missing_required_config_flag",
        details: missingFlags,
      });
      continue;
    }

    active.push(skill);
  }

  active.sort((a, b) => a.slug.localeCompare(b.slug));
  skipped.sort((a, b) => a.slug.localeCompare(b.slug));
  return { active, skipped };
}
