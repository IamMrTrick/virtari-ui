import type { LanguageSupport } from "@codemirror/language";

import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { yaml } from "@codemirror/lang-yaml";
import { xml } from "@codemirror/lang-xml";

/**
 * Curated set of preloaded language grammars. ~80 KB gz total. These cover
 * the languages the design system docs most commonly demonstrate.
 */
export type CodeLanguage =
  | "javascript" | "js"
  | "typescript" | "ts"
  | "jsx"
  | "tsx"
  | "css"
  | "html"
  | "json"
  | "markdown" | "md"
  | "python" | "py"
  | "go"
  | "rust" | "rs"
  | "sql"
  | "yaml" | "yml"
  | "xml"
  | "bash" | "shell" | "sh"
  | "plaintext" | "text" | "txt"
  | string;

const PRELOADED: Record<string, () => LanguageSupport | LanguageSupport[]> = {
  javascript: () => javascript(),
  js: () => javascript(),
  jsx: () => javascript({ jsx: true }),
  typescript: () => javascript({ typescript: true }),
  ts: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  css: () => css(),
  html: () => html(),
  json: () => json(),
  markdown: () => markdown(),
  md: () => markdown(),
  python: () => python(),
  py: () => python(),
  go: () => go(),
  rust: () => rust(),
  rs: () => rust(),
  sql: () => sql(),
  yaml: () => yaml(),
  yml: () => yaml(),
  xml: () => xml(),
};

/**
 * Lazy-loadable grammars. Add more entries as needed; the import is only
 * evaluated when the language is actually requested.
 */
const LAZY: Record<string, () => Promise<LanguageSupport | LanguageSupport[]>> = {
  // Bash / shell — alias to plaintext-like for now (no first-party CM6 lang
  // shipped). Consumers can pass a custom extension if they need a real
  // shell grammar (e.g., codemirror-legacy-modes).
  bash: async () => [],
  shell: async () => [],
  sh: async () => [],
};

/**
 * Resolve a language id to its CM6 LanguageSupport. Preloaded languages
 * resolve synchronously; everything else returns a Promise.
 */
export function resolveLanguage(
  id: CodeLanguage | undefined,
): LanguageSupport | LanguageSupport[] | Promise<LanguageSupport | LanguageSupport[]> | null {
  if (!id) return null;
  const key = id.toLowerCase();
  if (key === "plaintext" || key === "text" || key === "txt") return null;

  const preload = PRELOADED[key];
  if (preload) return preload();

  const lazy = LAZY[key];
  if (lazy) return lazy();

  return null;
}

/**
 * List of language ids known to the registry — useful for building language
 * pickers in docs / settings panels.
 */
export const KNOWN_LANGUAGES: ReadonlyArray<string> = [
  ...Object.keys(PRELOADED),
  ...Object.keys(LAZY),
  "plaintext",
];
