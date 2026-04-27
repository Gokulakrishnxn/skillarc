import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

/**
 * Languages we expect to encounter across skill / workflow / tool MDX content.
 * Loading them up front keeps the highlighter call sites synchronous-friendly.
 */
const LANGUAGES: BundledLanguage[] = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "yaml",
  "bash",
  "shell",
  "python",
  "md",
  "mdx",
  "html",
  "css",
  "sql",
];

let _highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!_highlighterPromise) {
    _highlighterPromise = createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: LANGUAGES,
    });
  }
  return _highlighterPromise;
}

/**
 * Render a code string to a Shiki HTML fragment with line numbers enabled.
 * Falls back to a plain `<pre>` if the language isn't bundled.
 */
export async function highlight(
  code: string,
  lang: string | undefined,
): Promise<string> {
  const highlighter = await getHighlighter();
  const supported = highlighter
    .getLoadedLanguages()
    .includes((lang ?? "") as BundledLanguage);

  return highlighter.codeToHtml(code, {
    lang: supported ? (lang as BundledLanguage) : "text",
    theme: "github-dark-dimmed",
  });
}
