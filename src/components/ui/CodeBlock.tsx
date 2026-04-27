import { highlight } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  /** Raw code source — also handed to the clipboard verbatim. */
  code: string;
  /** Shiki language id (e.g. "json", "yaml", "ts"). Defaults to plain text. */
  language?: string;
  /** Filename pill rendered at the top-left, e.g. "system-prompt.txt". */
  filename?: string;
  /** Hide the line-number gutter (defaults to shown). */
  noLineNumbers?: boolean;
  className?: string;
}

/**
 * Server-rendered code block with syntax highlighting, a filename tab, and
 * a clipboard-copy affordance — the visual blueprint matches shadcn/ui docs.
 */
export async function CodeBlock({
  code,
  language,
  filename,
  noLineNumbers,
  className,
}: CodeBlockProps) {
  const trimmed = code.replace(/\n$/, "");
  const html = await highlight(trimmed, language);

  return (
    <div
      className={cn(
        "group relative my-6 overflow-hidden rounded-lg border border-code-border bg-code-bg shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-code-border bg-code-tab px-3 py-1.5">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent/70" />
          <span className="font-mono text-xs normal-case tracking-normal text-foreground/80">
            {filename ?? language ?? "code"}
          </span>
        </div>
        <CopyButton
          value={trimmed}
          iconOnly
          className="h-7 w-7 border-transparent bg-transparent hover:bg-white/5"
          label={`Copy ${filename ?? "code"} to clipboard`}
        />
      </div>
      <div
        className="overflow-x-auto py-3 text-[13px] leading-relaxed"
        data-line-numbers={noLineNumbers ? undefined : ""}
        // The HTML originates from Shiki, which we control; safe to dangerously set.
        dangerouslySetInnerHTML={{
          __html: noLineNumbers
            ? html
            : html.replace(/<pre /, '<pre data-line-numbers="" '),
        }}
      />
    </div>
  );
}
