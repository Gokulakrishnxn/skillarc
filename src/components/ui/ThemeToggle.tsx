"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const THEME_EVENT = "skillarc-theme-change";

function getTheme(): Theme {
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerTheme(): Theme {
  return "dark";
}

function subscribeToTheme(onChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorage = (event: StorageEvent): void => {
    if (event.key === "theme" || event.key === null) onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_EVENT, onChange);
  media.addEventListener("change", onChange);

  return (): void => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getTheme,
    getServerTheme,
  );
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = (): void => {
    const next: Theme = isDark ? "light" : "dark";
    applyTheme(next);
    window.localStorage.setItem("theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
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
          "inline-flex size-6 items-center justify-center rounded-full transition",
          !isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
      >
        <Sun className="size-3.5" aria-hidden />
      </span>
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full transition",
          isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
      >
        <Moon className="size-3.5" aria-hidden />
      </span>
    </button>
  );
}
