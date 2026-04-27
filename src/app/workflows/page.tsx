import type { Metadata } from "next";
import { CategoryIndex } from "@/components/skill/CategoryIndex";

export const metadata: Metadata = {
  title: "Workflows",
  description:
    "Multi-stage agent pipelines you can lift into any runtime. Plan, search, critique, write — all reusable.",
};

export default function WorkflowsIndexPage() {
  return (
    <CategoryIndex
      category="workflows"
      title="Workflows"
      description="Multi-stage agent pipelines you can lift into any runtime. Each workflow is a YAML graph that references skills and tools by name — pick one up and run it on whichever runner you've already got."
    />
  );
}
