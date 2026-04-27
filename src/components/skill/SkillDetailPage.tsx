import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Sidebar } from "../layout/Sidebar";
import { TableOfContents } from "../layout/TableOfContents";
import { SkillPageHeader } from "./SkillPageHeader";
import { mdxComponents } from "../mdx/MDXComponents";
import { Pager } from "../layout/Pager";
import {
  extractToc,
  getCategoryPager,
  getSkillBySlug,
} from "@/lib/content";
import type { SkillCategory } from "@/lib/types";

interface SkillDetailPageProps {
  category: SkillCategory;
  slug: string;
}

/**
 * Server component that loads a single skill MDX file, compiles it, and
 * renders the full three-column documentation page.
 */
export async function SkillDetailPage({
  category,
  slug,
}: SkillDetailPageProps) {
  const skill = getSkillBySlug(category, slug);
  if (!skill) notFound();

  const toc = extractToc(skill.body);
  const pager = getCategoryPager(category, slug);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Suspense fallback={<div className="hidden w-60 lg:block" aria-hidden />}>
        <Sidebar />
      </Suspense>
      <main className="min-w-0 flex-1 px-0 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <SkillPageHeader skill={skill} />
          <article className="skf-prose mt-6">
            <MDXRemote source={skill.body} components={mdxComponents} />
          </article>
          <Pager prev={pager.prev} next={pager.next} />
        </div>
      </main>
      <TableOfContents entries={toc} />
    </div>
  );
}
