import type { Metadata } from "next";
import { CategoryIndex } from "@/components/skill/CategoryIndex";

export const metadata: Metadata = {
  title: "AI Skills",
  description:
    "AI Skills designed for LLM-based applications and customized skill workflows.",
};

export default function SkillsIndexPage() {
  return (
    <CategoryIndex
      category="skills"
      title="AI Skills"
      description="Skills used with LLM apps and customized agent stacks. Discover prompt, memory, and reusable capability packs that you can copy directly into your own workflows."
    />
  );
}
