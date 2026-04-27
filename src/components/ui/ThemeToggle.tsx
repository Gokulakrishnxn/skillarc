"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
      return;
    }

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = preferredDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = isDark ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-2 py-1 text-xs text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
    >
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full transition",
          !isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full transition",
          isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
      >
        <Moon className="h-3.5 w-3.5" aria-hidden />
      </span>
    </button>
  );
}
