import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { CodeBlock } from "../ui/CodeBlock";
import { Callout } from "../ui/Callout";
import { slugify } from "@/lib/utils";

/**
 * Pull a flat string out of an MDX heading's children — covers the case where
 * authors embed `<code>` or `<em>` tags inside an `## H2`.
 */
function flatten(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return flatten(props?.children ?? "");
  }
  return "";
}

function HeadingAnchor({
  level,
  children,
  ...rest
}: { level: 2 | 3; children: ReactNode } & ComponentPropsWithoutRef<"h2">) {
  const id = slugify(flatten(children));
  if (level === 2) {
    return (
      <h2 id={id} {...rest} className="group">
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h2>
    );
  }
  return (
    <h3 id={id} {...(rest as ComponentPropsWithoutRef<"h3">)} className="group">
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </h3>
  );
}

interface PreProps extends ComponentPropsWithoutRef<"pre"> {
  /** MDX-injected metadata; we read filename + language from these. */
  filename?: string;
}

interface CodeChildProps {
  className?: string;
  children?: ReactNode;
  filename?: string;
}

/**
 * MDX component map. Headings get auto-anchors, inline code stays plain, and
 * fenced code blocks route through our Shiki-powered `CodeBlock`.
 */
export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <HeadingAnchor level={2} {...props}>
      {children}
    </HeadingAnchor>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <HeadingAnchor level={3} {...props}>
      {children}
    </HeadingAnchor>
  ),
  a: ({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} {...rest}>
        {children}
      </Link>
    );
  },
  pre: ({ children, ...rest }: PreProps) => {
    // MDX wraps fenced ``` blocks as <pre><code className="language-xxx">...</code></pre>.
    // We unwrap and forward to our highlighter.
    if (
      children &&
      typeof children === "object" &&
      "props" in children
    ) {
      const codeProps = (children as { props: CodeChildProps }).props;
      const className = codeProps.className ?? "";
      const langMatch = /language-([\w-]+)/.exec(className);
      const language = langMatch?.[1];
      const raw =
        typeof codeProps.children === "string"
          ? codeProps.children
          : Array.isArray(codeProps.children)
            ? codeProps.children.join("")
            : "";
      return (
        <CodeBlock
          code={raw}
          language={language}
          filename={codeProps.filename ?? rest.filename}
        />
      );
    }
    return <pre {...rest}>{children}</pre>;
  },
  code: ({ className, children, ...rest }: ComponentPropsWithoutRef<"code">) => (
    <code className={className} {...rest}>
      {children}
    </code>
  ),
  Callout,
  CodeBlock,
};
