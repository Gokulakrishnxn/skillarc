import type { Metadata } from "next";
import { CategoryIndex } from "@/components/skill/CategoryIndex";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Related tools for AI agents: JSON schemas, integrations, and function-calling interfaces.",
};

export default function ToolsIndexPage() {
  return (
    <CategoryIndex
      category="tools"
      title="Tools"
      description="Related tools for AI agents and copilots. Browse backend-agnostic function definitions for search, file operations, SQL, and code execution, then connect them to your own providers."
    />
  );
}
