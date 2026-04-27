import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "./TableOfContents";
import type { TocEntry } from "@/lib/types";

interface DocShellProps {
  toc?: TocEntry[];
  showToc?: boolean;
  children: ReactNode;
}

/**
 * Three-column shell shared by every documentation-style page:
 * left rail (sidebar), centered prose column, right rail TOC.
 * The right rail is hidden when no TOC entries are passed.
 */
export function DocShell({
  toc = [],
  showToc = true,
  children,
}: DocShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-0 px-4 md:px-6">
      <Sidebar />
      <main className="min-w-0 flex-1 px-0 py-8 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </main>
      {showToc && <TableOfContents entries={toc} />}
    </div>
  );
}
