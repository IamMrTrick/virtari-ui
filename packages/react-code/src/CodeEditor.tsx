import { useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type Ref } from "react";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { EditorState, type Extension } from "@codemirror/state";
import type { LanguageSupport } from "@codemirror/language";
import { indentUnit } from "@codemirror/language";
import { cn } from "@virtari-packages/utils";
import { CopyButton } from "@virtari-packages/react-copy-button";

import { vdsCodeTheme } from "./theme";
import { resolveLanguage, type CodeLanguage } from "./languages";
import { autoGrowTheme } from "./extensions";
import type { CodeBlockSize, CodeBlockVariant } from "./CodeBlock";

export interface CodeEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  /** Controlled code value. */
  value: string;
  /** Called on every keystroke with the new value. */
  onValueChange: (next: string) => void;
  /** Language id. Lazy-loaded if not preloaded. */
  language?: CodeLanguage;
  /** Placeholder text shown when value is empty. */
  placeholder?: string;
  /** When true, disables editing while keeping the editor look. */
  readOnly?: boolean;
  /** Focus the editor on mount. */
  autoFocus?: boolean;
  /** Show line-number gutter. */
  showLineNumbers?: boolean;
  /** Soft-wrap long lines. */
  wrap?: boolean;
  /** Tab indent width. */
  tabSize?: number;
  /** Insert spaces instead of tab characters. */
  insertSpaces?: boolean;
  /** Min/max visible lines (auto-grows between these bounds). */
  minLines?: number;
  maxLines?: number;
  /** Show a copy button in the header. */
  copyable?: boolean;
  /** Filename label rendered in the header. */
  filename?: string;
  /** Custom icon to render in the header next to the filename. */
  filenameIcon?: ReactNode;
  /** Visual variant. */
  variant?: CodeBlockVariant;
  /** Size preset. */
  size?: CodeBlockSize;
  /** Description rendered below the body. */
  caption?: ReactNode;
  /** Escape hatch — extra CM6 extensions appended after defaults. */
  extensions?: Extension[];
  /** Forwarded ref for the wrapper. */
  ref?: Ref<HTMLDivElement>;
}

export function CodeEditor({
  value,
  onValueChange,
  language = "plaintext",
  placeholder,
  readOnly = false,
  autoFocus = false,
  showLineNumbers = true,
  wrap = false,
  tabSize = 2,
  insertSpaces = true,
  minLines,
  maxLines,
  copyable = true,
  filename,
  filenameIcon,
  variant = "card",
  size = "md",
  caption,
  extensions: userExtensions,
  className,
  style,
  ref,
  ...props
}: CodeEditorProps) {
  const cmRef = useRef<ReactCodeMirrorRef>(null);
  const [resolvedLang, setResolvedLang] = useState<LanguageSupport | LanguageSupport[] | null>(() => {
    const initial = resolveLanguage(language);
    return initial && !(initial instanceof Promise) ? initial : null;
  });

  /* Resolve lazy language grammars. */
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

  /* Build extension list. */
  const extensions = useMemo<Extension[]>(() => {
    const list: Extension[] = [
      vdsCodeTheme,
      EditorState.tabSize.of(tabSize),
      indentUnit.of(insertSpaces ? " ".repeat(tabSize) : "\t"),
    ];
    if (wrap) list.push(EditorView.lineWrapping);
    if (readOnly) {
      list.push(EditorView.editable.of(false), EditorState.readOnly.of(true));
    }
    if (minLines != null || maxLines != null) {
      list.push(autoGrowTheme(minLines, maxLines));
    }
    if (resolvedLang) list.push(...(Array.isArray(resolvedLang) ? resolvedLang : [resolvedLang]));
    if (userExtensions && userExtensions.length > 0) list.push(...userExtensions);
    return list;
  }, [tabSize, insertSpaces, wrap, readOnly, minLines, maxLines, resolvedLang, userExtensions]);

  const showHeader = Boolean(filename) || copyable;
  const wrapperStyle: CSSProperties | undefined = style;

  return (
    <div
      ref={ref}
      className={cn("vds-code", className)}
      data-variant={variant !== "card" ? variant : undefined}
      data-size={size !== "md" ? size : undefined}
      data-readonly={readOnly || undefined}
      data-wrap={wrap || undefined}
      style={wrapperStyle}
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
              <CopyButton text={value} variant="ghost" copyButtonSize="2xs" />
            </div>
          )}
        </div>
      )}

      <div className="vds-code-body">
        <CodeMirror
          ref={cmRef}
          value={value}
          onChange={onValueChange}
          theme="none"
          extensions={extensions}
          placeholder={placeholder}
          autoFocus={autoFocus}
          editable={!readOnly}
          readOnly={readOnly}
          basicSetup={{
            lineNumbers: showLineNumbers,
            foldGutter: false,
            highlightActiveLine: !readOnly,
            highlightActiveLineGutter: !readOnly,
            highlightSelectionMatches: false,
            indentOnInput: !readOnly,
            bracketMatching: true,
            closeBrackets: !readOnly,
            autocompletion: !readOnly,
            allowMultipleSelections: !readOnly,
            rectangularSelection: !readOnly,
            crosshairCursor: !readOnly,
            searchKeymap: true,
          }}
        />
      </div>

      {caption && <div className="vds-code-caption">{caption}</div>}
    </div>
  );
}
