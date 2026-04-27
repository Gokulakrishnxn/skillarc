"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FooterSwitch() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled((v) => !v)}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground transition hover:border-border-strong hover:text-foreground"
    >
      <span className="font-medium">{enabled ? "Updates On" : "Updates Off"}</span>
      <span
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
          enabled ? "bg-accent/70" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full bg-white transition-transform",
            enabled ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
