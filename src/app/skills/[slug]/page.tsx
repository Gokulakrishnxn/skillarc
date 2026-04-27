import type { Metadata } from "next";
import { SkillDetailPage } from "@/components/skill/SkillDetailPage";
import { getSkillBySlug, getSkillsByCategory } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSkillsByCategory("skills").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug("skills", slug);
  if (!skill) return { title: "Skill not found" };
  return {
    title: skill.title,
    description: skill.description,
  };
}

export default async function SkillPage({ params }: PageProps) {
  const { slug } = await params;
  return <SkillDetailPage category="skills" slug={slug} />;
}
