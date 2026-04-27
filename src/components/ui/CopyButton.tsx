"use client";

import { Check, Copy } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  /** The string that should land on the user's clipboard. */
  value: string;
  /** Optional toast message. Defaults to "Copied to clipboard". */
  message?: string;
  className?: string;
  /** Whether to render only the icon (no text). */
  iconOnly?: boolean;
  label?: string;
  /** Optional callback fired after a successful copy (used for analytics). */
  onCopied?: () => void;
}

/**
 * Clipboard-copy button with a transient checkmark and a toast notification.
 * Used by `CodeBlock`, the page header "Copy Page" affordance, and skill cards.
 */
export function CopyButton({
  value,
  message = "Copied to clipboard",
  className,
  iconOnly = false,
  label = "Copy",
  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(message);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy — clipboard permission denied");
    }
  }, [value, message, onCopied]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={iconOnly ? label : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-card/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:bg-muted hover:text-foreground active:scale-[0.98]",
        iconOnly && "h-8 w-8 justify-center px-0",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {!iconOnly && <span>{copied ? "Copied" : label}</span>}
    </button>
  );
}
