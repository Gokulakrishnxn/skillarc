import type { Metadata } from "next";
import { CategoryIndex } from "@/components/skill/CategoryIndex";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "JSON-Schema tool definitions for function-calling agents. Search, code execution, SQL, files — and more.",
};

export default function ToolsIndexPage() {
  return (
    <CategoryIndex
      category="tools"
      title="Tools"
      description="JSON-Schema tool definitions for function-calling agents. Each tool is backend-agnostic — wire it to whichever provider (Tavily, E2B, Postgres, Bing) you already use."
    />
  );
}
