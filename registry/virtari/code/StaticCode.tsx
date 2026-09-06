import { useMemo, type CSSProperties, type ReactNode } from "react";
import type { LanguageSupport } from "@codemirror/language";
import { highlightTree, tagHighlighter } from "@lezer/highlight";
import { vdsHighlightStyle } from "./theme";

// Share the editor's exact syntax roles without mounting an EditorView or
// injecting generated editor styles for every read-only snippet.
const syntaxStyles = vdsHighlightStyle.specs.map(({ tag: _tag, class: _class, ...style }) => style as CSSProperties);
const highlighter = tagHighlighter(vdsHighlightStyle.specs.map((spec, index) => ({ tag: spec.tag, class: String(index) })));

export function StaticCode({ code, language, showLineNumbers, highlightLines, diff, label }: {
  code: string;
  language: LanguageSupport | LanguageSupport[] | null;
  showLineNumbers: boolean;
  highlightLines?: number[];
  diff: "none" | "unified";
  label: string;
}) {
  const lines = useMemo(() => {
    const result: ReactNode[][] = [[]];
    const append = (text: string, style?: CSSProperties) => {
      text.split("\n").forEach((part, index) => {
        if (index) result.push([]);
        if (part) result[result.length - 1].push(style ? <span key={result[result.length - 1].length} style={style}>{part}</span> : part);
      });
    };
    const grammar = Array.isArray(language) ? language[0] : language;
    if (!grammar) { append(code); return result; }
    try {
      let position = 0;
      highlightTree(grammar.language.parser.parse(code), highlighter, (from, to, classes) => {
        append(code.slice(position, from));
        append(code.slice(from, to), Object.assign({}, ...classes.split(" ").map((key) => syntaxStyles[Number(key)])));
        position = to;
      });
      append(code.slice(position));
      return result;
    } catch {
      // Optional grammars must never make the original source unavailable.
      return code.split("\n").map((line) => [line]);
    }
  }, [code, language]);
  const sourceLines = code.split("\n");
  const highlighted = new Set(highlightLines);
  return <pre className="vds-code-static" tabIndex={0} role="region" aria-label={label} dir="ltr">
    <code className="vds-code-static-content" style={{ "--vds-code-line-digits": String(lines.length).length } as CSSProperties}>
      {lines.map((line, index) => <span key={index} className="vds-code-static-line"
        data-highlighted={highlighted.has(index + 1) || undefined}
        data-diff={diff === "unified" ? sourceLines[index].startsWith("+") ? "add" : sourceLines[index].startsWith("-") ? "remove" : undefined : undefined}>
        {showLineNumbers && <span className="vds-code-static-number" aria-hidden="true">{index + 1}</span>}
        <span className="vds-code-static-text">{line}{index < lines.length - 1 ? "\n" : ""}</span>
      </span>)}
    </code>
  </pre>;
}
