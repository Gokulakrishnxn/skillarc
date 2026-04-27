"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SIDEBAR_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";
import { GithubMark } from "./GithubMark";

const BADGE_TONE: Record<NonNullable<NavItem["badge"]>["tone"], string> = {
  blue: "bg-info",
  green: "bg-success",
  amber: "bg-warning",
  orange: "bg-accent",
};

interface SidebarProps {
  className?: string;
}

/**
 * Left rail navigation. Tracks the active route via Next's `usePathname` and
 * applies a green left-border accent + white text on the active item — exactly
 * how shadcn/ui marks the current docs page.
 */
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const search = useSearchParams();

  const isActive = (href?: string) => {
    if (!href) return false;
    const [path, qs] = href.split("?");
    if (pathname !== path) return false;
    if (!qs) return !search?.toString();
    const params = new URLSearchParams(qs);
    for (const [k, v] of params.entries()) {
      if (search?.get(k) !== v) return false;
    }
    return true;
  };

  return (
    <aside
      className={cn(
        "sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-6 pr-2 pl-4 lg:block",
        className,
      )}
    >
      <nav
        aria-label="Documentation navigation"
        className="flex min-h-full flex-col gap-6"
      >
        {SIDEBAR_NAV.map((section) => (
          <div
            key={section.title}
            className={cn(
              section.title.toLowerCase() === "community" && "mt-auto",
            )}
          >
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href ?? "#"}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center justify-between rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors",
                        active
                          ? "bg-muted/40 font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                      )}
                    >
                      {/* Active green left-border accent */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full transition-colors",
                          active ? "bg-success" : "bg-transparent",
                        )}
                      />
                      <span className="truncate">{item.title}</span>
                      {item.title === "Contribute on GitHub" && (
                        <GithubMark className="ml-2 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                      )}
                      {item.badge && (
                        <span
                          aria-hidden
                          className={cn(
                            "ml-2 h-1.5 w-1.5 shrink-0 rounded-full",
                            BADGE_TONE[item.badge.tone],
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
