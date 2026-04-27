"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { GithubMark } from "./GithubMark";
import { SearchBar } from "../ui/SearchBar";
import { RainbowButton } from "../ui/rainbow-button";
import { PRIMARY_NAV } from "@/lib/nav";
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
 * "Contribute now" call-to-action. Includes a mobile sheet trigger that mirrors
 * the left sidebar contents.
 */
export function Navbar({ skillIndex, githubStars = 12_400 }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [liveStars, setLiveStars] = useState(githubStars);

  useEffect(() => {
    let cancelled = false;

    async function loadStars() {
      try {
        const res = await fetch("https://api.github.com/repos/Gokulakrishnxn/skillarc", {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { stargazers_count?: number };
        if (!cancelled && typeof data.stargazers_count === "number") {
          setLiveStars(data.stargazers_count);
        }
      } catch {
        // Keep fallback value when GitHub API is unavailable/rate-limited.
      }
    }

    void loadStars();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 min-w-0 items-center gap-2 px-2.5 sm:px-4 md:px-6">
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
          href="/"
          className="flex min-w-0 shrink items-center gap-2 pr-1"
          aria-label="Skillarc home"
        >
          <Logo size={22} />
          <span className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
            skillarc
          </span>
          <span className="hidden rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft sm:inline-flex">
            beta
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <nav className="flex w-full items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    "relative shrink-0 rounded-md px-2 py-1.5 text-xs transition-colors xl:px-3 xl:text-sm",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-1.5 -bottom-[15px] h-px bg-accent xl:inset-x-2" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 md:flex-none">
          <SearchBar skills={skillIndex} className="hidden 2xl:inline-flex" />
          <div className="relative 2xl:hidden">
            <SearchBar skills={skillIndex} compact />
            <span className="pointer-events-none absolute -right-1 -top-1 hidden items-center gap-0.5 rounded border border-border-strong bg-background px-1 py-0.5 font-mono text-[9px] text-muted-foreground md:inline-flex">
              <Command className="h-2.5 w-2.5" aria-hidden />
              K
            </span>
          </div>
          <a
            href="https://github.com/Gokulakrishnxn/skillarc"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-md border border-border-strong bg-card px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:inline-flex"
          >
            <GithubMark className="h-3.5 w-3.5" aria-hidden />
            <span className="font-medium text-foreground">
              {formatCount(liveStars)}
            </span>
            <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
          </a>
          <RainbowButton
            asChild
            size="sm"
            className="hidden h-9 rounded-md px-2 sm:px-3 md:inline-flex"
          >
            <a
              href="https://github.com/Gokulakrishnxn/skillarc"
              target="_blank"
              rel="noreferrer"
            >
              <GithubMark className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Contribute on GitHub</span>
              <span className="sm:hidden">Contribute</span>
            </a>
          </RainbowButton>
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
                href="/"
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
            <a
              href="https://github.com/Gokulakrishnxn/skillarc"
              target="_blank"
              rel="noreferrer"
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-strong bg-card px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <GithubMark className="h-4 w-4" aria-hidden />
              Contribute on GitHub
            </a>
            <nav className="space-y-1">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
