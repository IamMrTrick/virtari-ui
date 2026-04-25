import { useRef, useState, useEffect, useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, Decoration } from '@codemirror/view';
import { StateEffect, StateField, RangeSetBuilder, EditorState } from '@codemirror/state';
import { cn } from '@virtari-packages/utils';
import { CopyButton } from '@virtari-packages/react-copy-button';
import { HighlightStyle, syntaxHighlighting, indentUnit } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { go } from '@codemirror/lang-go';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { yaml } from '@codemirror/lang-yaml';
import { xml } from '@codemirror/lang-xml';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/CodeBlock.tsx
var vdsHighlightStyle = HighlightStyle.define([
  /* Keywords & control flow */
  { tag: tags.keyword, color: "var(--vds-code-token-keyword)" },
  { tag: [tags.controlKeyword, tags.moduleKeyword], color: "var(--vds-code-token-control)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  /* Literals */
  { tag: tags.string, color: "var(--vds-code-token-string)" },
  { tag: tags.special(tags.string), color: "var(--vds-code-token-string-special)" },
  { tag: tags.number, color: "var(--vds-code-token-number)" },
  { tag: tags.bool, color: "var(--vds-code-token-bool)" },
  { tag: tags.null, color: "var(--vds-code-token-null)" },
  { tag: [tags.atom, tags.constant(tags.variableName)], color: "var(--vds-code-token-constant)" },
  /* Comments */
  { tag: tags.comment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: tags.docComment, color: "var(--vds-code-token-doc)", fontStyle: "italic" },
  { tag: tags.lineComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: tags.blockComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  /* Functions / methods */
  { tag: tags.function(tags.variableName), color: "var(--vds-code-token-function)" },
  { tag: tags.function(tags.propertyName), color: "var(--vds-code-token-method)" },
  /* Punctuation / operators */
  { tag: tags.operator, color: "var(--vds-code-token-operator)" },
  { tag: tags.derefOperator, color: "var(--vds-code-token-operator)" },
  { tag: tags.compareOperator, color: "var(--vds-code-token-operator)" },
  { tag: tags.logicOperator, color: "var(--vds-code-token-operator)" },
  { tag: tags.arithmeticOperator, color: "var(--vds-code-token-operator)" },
  { tag: tags.bitwiseOperator, color: "var(--vds-code-token-operator)" },
  { tag: tags.punctuation, color: "var(--vds-code-token-punctuation)" },
  { tag: [tags.bracket, tags.paren, tags.brace, tags.squareBracket, tags.angleBracket], color: "var(--vds-code-token-bracket)" },
  { tag: tags.separator, color: "var(--vds-code-token-punctuation)" },
  /* Markup (HTML/JSX/XML) */
  { tag: tags.tagName, color: "var(--vds-code-token-tag)" },
  { tag: tags.attributeName, color: "var(--vds-code-token-attribute)" },
  { tag: tags.attributeValue, color: "var(--vds-code-token-attr-value)" },
  /* Regex / escapes */
  { tag: tags.regexp, color: "var(--vds-code-token-regex)" },
  { tag: tags.escape, color: "var(--vds-code-token-escape)" },
  /* Variables / properties */
  { tag: tags.variableName, color: "var(--vds-code-token-variable)" },
  { tag: tags.propertyName, color: "var(--vds-code-token-property)" },
  { tag: tags.definition(tags.variableName), color: "var(--vds-code-token-variable)", fontWeight: "var(--vds-font-weight-medium, 500)" },
  /* Types / classes / namespaces */
  { tag: [tags.typeName, tags.className, tags.namespace], color: "var(--vds-code-token-type)" },
  { tag: tags.definition(tags.className), color: "var(--vds-code-token-class)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  /* Builtins (e.g. console, document) */
  { tag: [tags.standard(tags.variableName), tags.standard(tags.tagName)], color: "var(--vds-code-token-builtin)" },
  /* Markdown */
  { tag: tags.heading, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: tags.heading1, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: tags.heading2, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: tags.heading3, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  { tag: tags.link, color: "var(--vds-code-token-link)", textDecoration: "underline" },
  { tag: tags.url, color: "var(--vds-code-token-link)" },
  { tag: tags.emphasis, fontStyle: "var(--vds-code-token-emphasis-style, italic)" },
  { tag: tags.strong, fontWeight: "var(--vds-code-token-strong-weight, 600)" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.monospace, color: "var(--vds-code-token-string)" },
  /* Diagnostic / state */
  { tag: tags.invalid, color: "var(--vds-color-danger-11, var(--vds-code-token-tag))", textDecoration: "underline wavy" }
]);
var vdsBaseTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "transparent",
      color: "var(--vds-code-text)",
      height: "100%"
    },
    "&.cm-focused": {
      outline: "none"
    },
    ".cm-scroller": {
      fontFamily: "var(--vds-code-font-family)",
      lineHeight: "var(--vds-code-line-height)",
      overflow: "auto",
      overscrollBehavior: "contain"
    },
    ".cm-content": {
      padding: "var(--vds-code-padding-block) var(--vds-code-padding-inline)",
      caretColor: "var(--vds-code-caret-color)",
      color: "var(--vds-code-text)",
      fontFamily: "var(--vds-code-font-family)"
    },
    ".cm-line": {
      padding: "0 2px"
    },
    ".cm-gutters": {
      backgroundColor: "var(--vds-code-gutter-bg)",
      color: "var(--vds-code-gutter-text)",
      border: "none",
      borderInlineEnd: "0",
      userSelect: "none"
    },
    ".cm-gutterElement": {
      paddingInline: "var(--vds-code-gutter-padding-inline)"
    },
    ".cm-lineNumbers .cm-gutterElement": {
      minWidth: "2.25rem",
      textAlign: "end",
      color: "var(--vds-code-gutter-text)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "var(--vds-code-gutter-active-bg)",
      color: "var(--vds-code-gutter-active-text)"
    },
    ".cm-activeLine": {
      backgroundColor: "var(--vds-code-line-active-bg)"
    },
    ".cm-line-highlighted": {
      backgroundColor: "var(--vds-code-line-highlight-bg)"
    },
    ".cm-line-diff-add": {
      backgroundColor: "var(--vds-code-diff-add-bg)",
      color: "var(--vds-code-diff-add-text)"
    },
    ".cm-line-diff-remove": {
      backgroundColor: "var(--vds-code-diff-remove-bg)",
      color: "var(--vds-code-diff-remove-text)"
    },
    ".cm-selectionBackground": {
      backgroundColor: "var(--vds-code-selection-bg) !important"
    },
    "&.cm-focused .cm-selectionBackground": {
      backgroundColor: "var(--vds-code-selection-bg) !important"
    },
    ".cm-content ::selection": {
      backgroundColor: "var(--vds-code-selection-bg)"
    },
    ".cm-cursor, .cm-cursor-primary": {
      borderInlineStartColor: "var(--vds-code-caret-color)",
      borderInlineStartWidth: "2px"
    },
    ".cm-placeholder": {
      color: "var(--vds-color-text-placeholder, var(--vds-code-token-comment))",
      fontStyle: "italic"
    },
    /* Search panel */
    ".cm-panels": {
      backgroundColor: "var(--vds-code-header-bg)",
      color: "var(--vds-code-header-text)",
      borderTop: "1px solid var(--vds-code-header-border)",
      fontFamily: "var(--vds-font-sans, ui-sans-serif, system-ui)",
      fontSize: "var(--vds-text-xs, 0.75rem)"
    },
    ".cm-panel input, .cm-panel button": {
      font: "inherit"
    },
    /* Tooltip / autocomplete */
    ".cm-tooltip": {
      backgroundColor: "var(--vds-color-surface-overlay, var(--vds-code-bg))",
      color: "var(--vds-code-text)",
      border: "1px solid var(--vds-code-border)",
      borderRadius: "var(--vds-radius-sm, 0.25rem)",
      boxShadow: "var(--vds-shadow-md, 0 4px 12px rgba(0,0,0,0.12))"
    },
    ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
      backgroundColor: "var(--vds-code-line-highlight-bg)",
      color: "var(--vds-code-text)"
    }
  },
  { dark: false }
);
var vdsCodeTheme = [vdsBaseTheme, syntaxHighlighting(vdsHighlightStyle)];
var PRELOADED = {
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
  xml: () => xml()
};
var LAZY = {
  // Bash / shell — alias to plaintext-like for now (no first-party CM6 lang
  // shipped). Consumers can pass a custom extension if they need a real
  // shell grammar (e.g., codemirror-legacy-modes).
  bash: async () => [],
  shell: async () => [],
  sh: async () => []
};
function resolveLanguage(id) {
  if (!id) return null;
  const key = id.toLowerCase();
  if (key === "plaintext" || key === "text" || key === "txt") return null;
  const preload = PRELOADED[key];
  if (preload) return preload();
  const lazy = LAZY[key];
  if (lazy) return lazy();
  return null;
}
var KNOWN_LANGUAGES = [
  ...Object.keys(PRELOADED),
  ...Object.keys(LAZY),
  "plaintext"
];
var setHighlightedLines = StateEffect.define();
var highlightLineDeco = Decoration.line({ class: "cm-line-highlighted" });
var highlightLinesField = StateField.define({
  create: () => Decoration.none,
  update(prev, tr) {
    let value = prev.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setHighlightedLines)) {
        const builder = new RangeSetBuilder();
        const doc = tr.state.doc;
        const sorted = [...new Set(effect.value)].sort((a, b) => a - b);
        for (const lineNumber of sorted) {
          if (lineNumber < 1 || lineNumber > doc.lines) continue;
          const line = doc.line(lineNumber);
          builder.add(line.from, line.from, highlightLineDeco);
        }
        value = builder.finish();
      }
    }
    return value;
  },
  provide: (f) => EditorView.decorations.from(f)
});
var diffAddDeco = Decoration.line({ class: "cm-line-diff-add" });
var diffRemoveDeco = Decoration.line({ class: "cm-line-diff-remove" });
var diffLinesField = StateField.define({
  create: (state) => buildDiffDecorations(state.doc.toString()),
  update(prev, tr) {
    if (!tr.docChanged) return prev;
    return buildDiffDecorations(tr.state.doc.toString());
  },
  provide: (f) => EditorView.decorations.from(f)
});
function buildDiffDecorations(source) {
  const builder = new RangeSetBuilder();
  let pos = 0;
  for (const line of source.split("\n")) {
    const first = line.charAt(0);
    if (first === "+") {
      builder.add(pos, pos, diffAddDeco);
    } else if (first === "-") {
      builder.add(pos, pos, diffRemoveDeco);
    }
    pos += line.length + 1;
  }
  return builder.finish();
}
function autoGrowTheme(minLines, maxLines) {
  const styles = {};
  if (minLines != null) {
    styles["&"] = { ...styles["&"] ?? {}, minHeight: `calc(${minLines} * 1em * var(--vds-code-line-height, 1.6))` };
  }
  if (maxLines != null) {
    styles["&"] = { ...styles["&"] ?? {}, maxHeight: `calc(${maxLines} * 1em * var(--vds-code-line-height, 1.6) + var(--vds-code-padding-block) * 2)` };
    styles[".cm-scroller"] = { overflow: "auto" };
  }
  return EditorView.theme(styles);
}
function normalizeMaxHeight(input) {
  if (input == null) return void 0;
  return typeof input === "number" ? `${input}px` : input;
}
function CodeBlock({
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
}) {
  const cmRef = useRef(null);
  const [resolvedLang, setResolvedLang] = useState(() => {
    const initial = resolveLanguage(language);
    return initial && !(initial instanceof Promise) ? initial : null;
  });
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
  const extensions = useMemo(() => {
    const list = [
      vdsCodeTheme,
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.contentAttributes.of({ tabIndex: "0" })
    ];
    if (wrap) list.push(EditorView.lineWrapping);
    if (highlightLines && highlightLines.length > 0) list.push(highlightLinesField);
    if (diff === "unified") list.push(diffLinesField);
    if (resolvedLang) list.push(...Array.isArray(resolvedLang) ? resolvedLang : [resolvedLang]);
    return list;
  }, [wrap, highlightLines, diff, resolvedLang]);
  useEffect(() => {
    const view = cmRef.current?.view;
    if (!view) return;
    if (!highlightLines || highlightLines.length === 0) return;
    view.dispatch({ effects: setHighlightedLines.of(highlightLines) });
  }, [highlightLines]);
  const showHeader = Boolean(filename) || copyable;
  const normalizedMaxHeight = normalizeMaxHeight(maxHeight);
  const bodyStyle = normalizedMaxHeight ? { maxHeight: normalizedMaxHeight } : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-code", className),
      "data-variant": variant !== "card" ? variant : void 0,
      "data-size": size !== "md" ? size : void 0,
      "data-readonly": "true",
      "data-wrap": wrap || void 0,
      style,
      ...props,
      children: [
        showHeader && /* @__PURE__ */ jsxs("div", { className: "vds-code-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "vds-code-header-info", children: [
            filenameIcon && /* @__PURE__ */ jsx("span", { className: "vds-code-header-icon", "aria-hidden": "true", children: filenameIcon }),
            filename && /* @__PURE__ */ jsx("span", { className: "vds-code-header-filename", children: filename }),
            !filename && language && language !== "plaintext" && /* @__PURE__ */ jsx("span", { className: "vds-code-header-language", children: language })
          ] }),
          copyable && /* @__PURE__ */ jsx("div", { className: "vds-code-header-actions", children: /* @__PURE__ */ jsx(CopyButton, { text: code, variant: "ghost", copyButtonSize: "2xs" }) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "vds-code-body",
            "data-max-height": normalizedMaxHeight ? "" : void 0,
            style: bodyStyle,
            children: /* @__PURE__ */ jsx(
              CodeMirror,
              {
                ref: cmRef,
                value: code,
                theme: "none",
                extensions,
                basicSetup: {
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
                  searchKeymap: false
                },
                editable: false,
                readOnly: true
              }
            )
          }
        ),
        caption && /* @__PURE__ */ jsx("div", { className: "vds-code-caption", children: caption })
      ]
    }
  );
}
function CodeEditor({
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
}) {
  const cmRef = useRef(null);
  const [resolvedLang, setResolvedLang] = useState(() => {
    const initial = resolveLanguage(language);
    return initial && !(initial instanceof Promise) ? initial : null;
  });
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
  const extensions = useMemo(() => {
    const list = [
      vdsCodeTheme,
      EditorState.tabSize.of(tabSize),
      indentUnit.of(insertSpaces ? " ".repeat(tabSize) : "	")
    ];
    if (wrap) list.push(EditorView.lineWrapping);
    if (readOnly) {
      list.push(EditorView.editable.of(false), EditorState.readOnly.of(true));
    }
    if (minLines != null || maxLines != null) {
      list.push(autoGrowTheme(minLines, maxLines));
    }
    if (resolvedLang) list.push(...Array.isArray(resolvedLang) ? resolvedLang : [resolvedLang]);
    if (userExtensions && userExtensions.length > 0) list.push(...userExtensions);
    return list;
  }, [tabSize, insertSpaces, wrap, readOnly, minLines, maxLines, resolvedLang, userExtensions]);
  const showHeader = Boolean(filename) || copyable;
  const wrapperStyle = style;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-code", className),
      "data-variant": variant !== "card" ? variant : void 0,
      "data-size": size !== "md" ? size : void 0,
      "data-readonly": readOnly || void 0,
      "data-wrap": wrap || void 0,
      style: wrapperStyle,
      ...props,
      children: [
        showHeader && /* @__PURE__ */ jsxs("div", { className: "vds-code-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "vds-code-header-info", children: [
            filenameIcon && /* @__PURE__ */ jsx("span", { className: "vds-code-header-icon", "aria-hidden": "true", children: filenameIcon }),
            filename && /* @__PURE__ */ jsx("span", { className: "vds-code-header-filename", children: filename }),
            !filename && language && language !== "plaintext" && /* @__PURE__ */ jsx("span", { className: "vds-code-header-language", children: language })
          ] }),
          copyable && /* @__PURE__ */ jsx("div", { className: "vds-code-header-actions", children: /* @__PURE__ */ jsx(CopyButton, { text: value, variant: "ghost", copyButtonSize: "2xs" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "vds-code-body", children: /* @__PURE__ */ jsx(
          CodeMirror,
          {
            ref: cmRef,
            value,
            onChange: onValueChange,
            theme: "none",
            extensions,
            placeholder,
            autoFocus,
            editable: !readOnly,
            readOnly,
            basicSetup: {
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
              searchKeymap: true
            }
          }
        ) }),
        caption && /* @__PURE__ */ jsx("div", { className: "vds-code-caption", children: caption })
      ]
    }
  );
}
function InlineCode({
  color = "neutral",
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "code",
    {
      ref,
      className: cn("vds-code-inline", className),
      "data-color": color !== "neutral" ? color : void 0,
      ...props,
      children
    }
  );
}

export { CodeBlock, CodeEditor, InlineCode, KNOWN_LANGUAGES, autoGrowTheme, diffLinesField, highlightLinesField, resolveLanguage, setHighlightedLines, vdsCodeTheme };
