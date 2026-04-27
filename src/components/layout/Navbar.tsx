"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { GithubMark } from "./GithubMark";
import { SearchBar } from "../ui/SearchBar";
import { PRIMARY_NAV, SIDEBAR_NAV } from "@/lib/nav";
import { cn, formatCount } from "@/lib/utils";
import type { SkillIndexEntry } from "@/lib/skill-index";

interface NavbarProps {
  skillIndex: SkillIndexEntry[];
  /** GitHub stargazer count rendered in the header. */
  githubStars?: number;
}

/**
 * Top app bar — fixed, full-width, exact shadcn/ui proportions.
 * Renders the brand mark, primary nav, search, GitHub stars and the
 * "New Skill" call-to-action. Includes a mobile sheet trigger that mirrors
 * the left sidebar contents.
 */
export function Navbar({ skillIndex, githubStars = 12_400 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {/* Mobile sidebar trigger */}
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <Link
          href="/docs/introduction"
          className="flex shrink-0 items-center gap-2"
          aria-label="Skillarc home"
        >
          <Logo size={22} />
          <span className="font-semibold tracking-tight text-foreground">
            skillarc
          </span>
          <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
            beta
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" &&
                pathname?.startsWith(item.href.split("?")[0]));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-[15px] h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
          <SearchBar skills={skillIndex} compact />
          <a
            href="https://github.com/skillarc-dev/skillarc"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-md border border-border-strong bg-card px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <GithubMark className="h-3.5 w-3.5" aria-hidden />
            <span className="font-medium text-foreground">
              {formatCount(githubStars)}
            </span>
            <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
          </a>
          <Link
            href="/docs/installation"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-accent/50 bg-transparent px-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/10"
          >
            <Plus className="h-3.5 w-3.5 text-accent" aria-hidden />
            New Skill
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal>
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-72 max-w-[85vw] overflow-y-auto border-r border-border bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/docs/introduction"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <Logo size={20} />
                <span className="font-semibold">skillarc</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {SIDEBAR_NAV.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </p>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href ?? "#"}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
