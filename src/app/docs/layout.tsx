import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import type { ReactNode } from "react";

/**
 * Shared docs shell. Children render inside the centered prose column;
 * each docs page provides its own optional right-rail TOC.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Suspense fallback={<div className="hidden w-60 lg:block" aria-hidden />}>
        <Sidebar />
      </Suspense>
      {children}
    </div>
  );
}
