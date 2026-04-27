import type { Metadata } from "next";
import { SkillDetailPage } from "@/components/skill/SkillDetailPage";
import { getSkillBySlug, getSkillsByCategory } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSkillsByCategory("workflows").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug("workflows", slug);
  if (!skill) return { title: "Workflow not found" };
  return {
    title: skill.title,
    description: skill.description,
  };
}

export default async function WorkflowPage({ params }: PageProps) {
  const { slug } = await params;
  return <SkillDetailPage category="workflows" slug={slug} />;
}
