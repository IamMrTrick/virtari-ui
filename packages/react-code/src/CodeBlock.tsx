import { useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type Ref } from "react";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState, type Extension } from "@codemirror/state";
import type { LanguageSupport } from "@codemirror/language";
import { cn } from "@virtari-packages/utils";
import { CopyButton } from "@virtari-packages/react-copy-button";

import { vdsCodeTheme } from "./theme";
import { resolveLanguage, type CodeLanguage } from "./languages";
import { highlightLinesField, setHighlightedLines, diffLinesField } from "./extensions";

export type CodeBlockVariant = "card" | "minimal" | "embedded";
export type CodeBlockSize = "sm" | "md" | "lg";
export type CodeBlockDiff = "none" | "unified";

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Source code to render. Required. */
  code: string;
  /** Language id (e.g. "typescript", "css", "json"). Lazy-loaded if not preloaded. */
  language?: CodeLanguage;
  /** Optional filename label rendered in the header. */
  filename?: string;
  /** Custom icon to render in the header next to the filename. */
  filenameIcon?: ReactNode;
  /** Show line-number gutter. */
  showLineNumbers?: boolean;
  /** 1-indexed line numbers to highlight with a soft tint. */
  highlightLines?: number[];
  /** When `unified`, lines starting with `+` / `-` get colored backgrounds. */
  diff?: CodeBlockDiff;
  /** Soft-wrap long lines. */
  wrap?: boolean;
  /** Show a copy-to-clipboard button in the header (defaults to true). */
  copyable?: boolean;
  /** Max body height before scrolling. Number = px, string passed through. */
  maxHeight?: string | number;
  /** Visual variant: card (chrome + border), minimal (chromeless), embedded (no radius). */
  variant?: CodeBlockVariant;
  /** Size preset — controls font, padding, line-height. */
  size?: CodeBlockSize;
  /** Description rendered below the code body. */
  caption?: ReactNode;
  /** Forwarded ref for the wrapper. */
  ref?: Ref<HTMLDivElement>;
}

function normalizeMaxHeight(input: string | number | undefined): string | undefined {
  if (input == null) return undefined;
  return typeof input === "number" ? `${input}px` : input;
}

export function CodeBlock({
  code,
  language = "plaintext",
  filename,
  filenameIcon,
  showLineNumbers = false,
  highlightLines,
  diff = "none",
  wrap = false,
  copyable = true,
  maxHeight,
  variant = "card",
  size = "md",
  caption,
  className,
  style,
  ref,
  ...props
}: CodeBlockProps) {
  const cmRef = useRef<ReactCodeMirrorRef>(null);
  const [resolvedLang, setResolvedLang] = useState<LanguageSupport | LanguageSupport[] | null>(() => {
    const initial = resolveLanguage(language);
    return initial && !(initial instanceof Promise) ? initial : null;
  });

  /* Resolve lazy language grammars. Plaintext flashes briefly until ready. */
  useEffect(() => {
    const result = resolveLanguage(language);
    if (!result) {
      setResolvedLang(null);
      return;
    }
    if (result instanceof Promise) {
      let cancelled = false;
      result.then((lang) => {
        if (!cancelled) setResolvedLang(lang ?? null);
      });
      return () => {
        cancelled = true;
      };
    }
    setResolvedLang(result);
  }, [language]);

  /* Build the CM6 extension set. Memoized on the inputs that matter. */
  const extensions = useMemo<Extension[]>(() => {
    const list: Extension[] = [
      vdsCodeTheme,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.contentAttributes.of({ tabIndex: "0" }),
    ];
    if (wrap) list.push(EditorView.lineWrapping);
    if (highlightLines && highlightLines.length > 0) list.push(highlightLinesField);
    if (diff === "unified") list.push(diffLinesField);
    if (resolvedLang) list.push(...(Array.isArray(resolvedLang) ? resolvedLang : [resolvedLang]));
    return list;
  }, [wrap, highlightLines, diff, resolvedLang]);

  /* Push the highlightLines effect whenever the array changes. */
  useEffect(() => {
    const view = cmRef.current?.view;
    if (!view) return;
    if (!highlightLines || highlightLines.length === 0) return;
    view.dispatch({ effects: setHighlightedLines.of(highlightLines) });
  }, [highlightLines]);

  const showHeader = Boolean(filename) || copyable;
  const normalizedMaxHeight = normalizeMaxHeight(maxHeight);
  const bodyStyle: CSSProperties | undefined = normalizedMaxHeight ? { maxHeight: normalizedMaxHeight } : undefined;

  return (
    <div
      ref={ref}
      className={cn("vds-code", className)}
      data-radius-host=""
      data-variant={variant !== "card" ? variant : undefined}
      data-size={size !== "md" ? size : undefined}
      data-readonly="true"
      data-wrap={wrap || undefined}
      style={style}
      {...props}
    >
      {showHeader && (
        <div className="vds-code-header">
          <div className="vds-code-header-info">
            {filenameIcon && <span className="vds-code-header-icon" aria-hidden="true">{filenameIcon}</span>}
            {filename && <span className="vds-code-header-filename">{filename}</span>}
            {!filename && language && language !== "plaintext" && (
              <span className="vds-code-header-language">{language}</span>
            )}
          </div>
          {copyable && (
            <div className="vds-code-header-actions">
              <CopyButton text={code} variant="ghost" copyButtonSize="2xs" />
            </div>
          )}
        </div>
      )}

      <div
        className="vds-code-body"
        data-max-height={normalizedMaxHeight ? "" : undefined}
        style={bodyStyle}
      >
        <CodeMirror
          ref={cmRef}
          value={code}
          theme="none"
          extensions={extensions}
          basicSetup={{
            lineNumbers: showLineNumbers,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
            bracketMatching: false,
            closeBrackets: false,
            autocompletion: false,
            rectangularSelection: false,
            crosshairCursor: false,
            highlightSelectionMatches: false,
            searchKeymap: false,
          }}
          editable={false}
          readOnly
        />
      </div>

      {caption && <div className="vds-code-caption">{caption}</div>}
    </div>
  );
}
