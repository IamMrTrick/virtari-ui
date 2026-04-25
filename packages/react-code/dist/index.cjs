'use strict';

var react = require('react');
var CodeMirror = require('@uiw/react-codemirror');
var view = require('@codemirror/view');
var state = require('@codemirror/state');
var utils = require('@virtari-packages/utils');
var reactCopyButton = require('@virtari-packages/react-copy-button');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');
var langJavascript = require('@codemirror/lang-javascript');
var langCss = require('@codemirror/lang-css');
var langHtml = require('@codemirror/lang-html');
var langJson = require('@codemirror/lang-json');
var langMarkdown = require('@codemirror/lang-markdown');
var langPython = require('@codemirror/lang-python');
var langGo = require('@codemirror/lang-go');
var langRust = require('@codemirror/lang-rust');
var langSql = require('@codemirror/lang-sql');
var langYaml = require('@codemirror/lang-yaml');
var langXml = require('@codemirror/lang-xml');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var CodeMirror__default = /*#__PURE__*/_interopDefault(CodeMirror);

// src/CodeBlock.tsx
var vdsHighlightStyle = language.HighlightStyle.define([
  /* Keywords & control flow */
  { tag: highlight.tags.keyword, color: "var(--vds-code-token-keyword)" },
  { tag: [highlight.tags.controlKeyword, highlight.tags.moduleKeyword], color: "var(--vds-code-token-control)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  /* Literals */
  { tag: highlight.tags.string, color: "var(--vds-code-token-string)" },
  { tag: highlight.tags.special(highlight.tags.string), color: "var(--vds-code-token-string-special)" },
  { tag: highlight.tags.number, color: "var(--vds-code-token-number)" },
  { tag: highlight.tags.bool, color: "var(--vds-code-token-bool)" },
  { tag: highlight.tags.null, color: "var(--vds-code-token-null)" },
  { tag: [highlight.tags.atom, highlight.tags.constant(highlight.tags.variableName)], color: "var(--vds-code-token-constant)" },
  /* Comments */
  { tag: highlight.tags.comment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: highlight.tags.docComment, color: "var(--vds-code-token-doc)", fontStyle: "italic" },
  { tag: highlight.tags.lineComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: highlight.tags.blockComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  /* Functions / methods */
  { tag: highlight.tags.function(highlight.tags.variableName), color: "var(--vds-code-token-function)" },
  { tag: highlight.tags.function(highlight.tags.propertyName), color: "var(--vds-code-token-method)" },
  /* Punctuation / operators */
  { tag: highlight.tags.operator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.derefOperator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.compareOperator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.logicOperator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.arithmeticOperator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.bitwiseOperator, color: "var(--vds-code-token-operator)" },
  { tag: highlight.tags.punctuation, color: "var(--vds-code-token-punctuation)" },
  { tag: [highlight.tags.bracket, highlight.tags.paren, highlight.tags.brace, highlight.tags.squareBracket, highlight.tags.angleBracket], color: "var(--vds-code-token-bracket)" },
  { tag: highlight.tags.separator, color: "var(--vds-code-token-punctuation)" },
  /* Markup (HTML/JSX/XML) */
  { tag: highlight.tags.tagName, color: "var(--vds-code-token-tag)" },
  { tag: highlight.tags.attributeName, color: "var(--vds-code-token-attribute)" },
  { tag: highlight.tags.attributeValue, color: "var(--vds-code-token-attr-value)" },
  /* Regex / escapes */
  { tag: highlight.tags.regexp, color: "var(--vds-code-token-regex)" },
  { tag: highlight.tags.escape, color: "var(--vds-code-token-escape)" },
  /* Variables / properties */
  { tag: highlight.tags.variableName, color: "var(--vds-code-token-variable)" },
  { tag: highlight.tags.propertyName, color: "var(--vds-code-token-property)" },
  { tag: highlight.tags.definition(highlight.tags.variableName), color: "var(--vds-code-token-variable)", fontWeight: "var(--vds-font-weight-medium, 500)" },
  /* Types / classes / namespaces */
  { tag: [highlight.tags.typeName, highlight.tags.className, highlight.tags.namespace], color: "var(--vds-code-token-type)" },
  { tag: highlight.tags.definition(highlight.tags.className), color: "var(--vds-code-token-class)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  /* Builtins (e.g. console, document) */
  { tag: [highlight.tags.standard(highlight.tags.variableName), highlight.tags.standard(highlight.tags.tagName)], color: "var(--vds-code-token-builtin)" },
  /* Markdown */
  { tag: highlight.tags.heading, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: highlight.tags.heading1, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: highlight.tags.heading2, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: highlight.tags.heading3, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  { tag: highlight.tags.link, color: "var(--vds-code-token-link)", textDecoration: "underline" },
  { tag: highlight.tags.url, color: "var(--vds-code-token-link)" },
  { tag: highlight.tags.emphasis, fontStyle: "var(--vds-code-token-emphasis-style, italic)" },
  { tag: highlight.tags.strong, fontWeight: "var(--vds-code-token-strong-weight, 600)" },
  { tag: highlight.tags.strikethrough, textDecoration: "line-through" },
  { tag: highlight.tags.monospace, color: "var(--vds-code-token-string)" },
  /* Diagnostic / state */
  { tag: highlight.tags.invalid, color: "var(--vds-color-danger-11, var(--vds-code-token-tag))", textDecoration: "underline wavy" }
]);
var vdsBaseTheme = view.EditorView.theme(
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
var vdsCodeTheme = [vdsBaseTheme, language.syntaxHighlighting(vdsHighlightStyle)];
var PRELOADED = {
  javascript: () => langJavascript.javascript(),
  js: () => langJavascript.javascript(),
  jsx: () => langJavascript.javascript({ jsx: true }),
  typescript: () => langJavascript.javascript({ typescript: true }),
  ts: () => langJavascript.javascript({ typescript: true }),
  tsx: () => langJavascript.javascript({ jsx: true, typescript: true }),
  css: () => langCss.css(),
  html: () => langHtml.html(),
  json: () => langJson.json(),
  markdown: () => langMarkdown.markdown(),
  md: () => langMarkdown.markdown(),
  python: () => langPython.python(),
  py: () => langPython.python(),
  go: () => langGo.go(),
  rust: () => langRust.rust(),
  rs: () => langRust.rust(),
  sql: () => langSql.sql(),
  yaml: () => langYaml.yaml(),
  yml: () => langYaml.yaml(),
  xml: () => langXml.xml()
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
var setHighlightedLines = state.StateEffect.define();
var highlightLineDeco = view.Decoration.line({ class: "cm-line-highlighted" });
var highlightLinesField = state.StateField.define({
  create: () => view.Decoration.none,
  update(prev, tr) {
    let value = prev.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setHighlightedLines)) {
        const builder = new state.RangeSetBuilder();
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
  provide: (f) => view.EditorView.decorations.from(f)
});
var diffAddDeco = view.Decoration.line({ class: "cm-line-diff-add" });
var diffRemoveDeco = view.Decoration.line({ class: "cm-line-diff-remove" });
var diffLinesField = state.StateField.define({
  create: (state) => buildDiffDecorations(state.doc.toString()),
  update(prev, tr) {
    if (!tr.docChanged) return prev;
    return buildDiffDecorations(tr.state.doc.toString());
  },
  provide: (f) => view.EditorView.decorations.from(f)
});
function buildDiffDecorations(source) {
  const builder = new state.RangeSetBuilder();
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
  return view.EditorView.theme(styles);
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
  const cmRef = react.useRef(null);
  const [resolvedLang, setResolvedLang] = react.useState(() => {
    const initial = resolveLanguage(language);
    return initial && !(initial instanceof Promise) ? initial : null;
  });
  react.useEffect(() => {
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
  const extensions = react.useMemo(() => {
    const list = [
      vdsCodeTheme,
      view.EditorView.editable.of(false),
      state.EditorState.readOnly.of(true),
      view.EditorView.contentAttributes.of({ tabIndex: "0" })
    ];
    if (wrap) list.push(view.EditorView.lineWrapping);
    if (highlightLines && highlightLines.length > 0) list.push(highlightLinesField);
    if (diff === "unified") list.push(diffLinesField);
    if (resolvedLang) list.push(...Array.isArray(resolvedLang) ? resolvedLang : [resolvedLang]);
    return list;
  }, [wrap, highlightLines, diff, resolvedLang]);
  react.useEffect(() => {
    const view = cmRef.current?.view;
    if (!view) return;
    if (!highlightLines || highlightLines.length === 0) return;
    view.dispatch({ effects: setHighlightedLines.of(highlightLines) });
  }, [highlightLines]);
  const showHeader = Boolean(filename) || copyable;
  const normalizedMaxHeight = normalizeMaxHeight(maxHeight);
  const bodyStyle = normalizedMaxHeight ? { maxHeight: normalizedMaxHeight } : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: utils.cn("vds-code", className),
      "data-variant": variant !== "card" ? variant : void 0,
      "data-size": size !== "md" ? size : void 0,
      "data-readonly": "true",
      "data-wrap": wrap || void 0,
      style,
      ...props,
      children: [
        showHeader && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-code-header", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-code-header-info", children: [
            filenameIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-icon", "aria-hidden": "true", children: filenameIcon }),
            filename && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-filename", children: filename }),
            !filename && language && language !== "plaintext" && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-language", children: language })
          ] }),
          copyable && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-code-header-actions", children: /* @__PURE__ */ jsxRuntime.jsx(reactCopyButton.CopyButton, { text: code, variant: "ghost", copyButtonSize: "2xs" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "vds-code-body",
            "data-max-height": normalizedMaxHeight ? "" : void 0,
            style: bodyStyle,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              CodeMirror__default.default,
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
        caption && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-code-caption", children: caption })
      ]
    }
  );
}
function CodeEditor({
  value,
  onValueChange,
  language: language$1 = "plaintext",
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
  const cmRef = react.useRef(null);
  const [resolvedLang, setResolvedLang] = react.useState(() => {
    const initial = resolveLanguage(language$1);
    return initial && !(initial instanceof Promise) ? initial : null;
  });
  react.useEffect(() => {
    const result = resolveLanguage(language$1);
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
  }, [language$1]);
  const extensions = react.useMemo(() => {
    const list = [
      vdsCodeTheme,
      state.EditorState.tabSize.of(tabSize),
      language.indentUnit.of(insertSpaces ? " ".repeat(tabSize) : "	")
    ];
    if (wrap) list.push(view.EditorView.lineWrapping);
    if (readOnly) {
      list.push(view.EditorView.editable.of(false), state.EditorState.readOnly.of(true));
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: utils.cn("vds-code", className),
      "data-variant": variant !== "card" ? variant : void 0,
      "data-size": size !== "md" ? size : void 0,
      "data-readonly": readOnly || void 0,
      "data-wrap": wrap || void 0,
      style: wrapperStyle,
      ...props,
      children: [
        showHeader && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-code-header", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-code-header-info", children: [
            filenameIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-icon", "aria-hidden": "true", children: filenameIcon }),
            filename && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-filename", children: filename }),
            !filename && language$1 && language$1 !== "plaintext" && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-code-header-language", children: language$1 })
          ] }),
          copyable && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-code-header-actions", children: /* @__PURE__ */ jsxRuntime.jsx(reactCopyButton.CopyButton, { text: value, variant: "ghost", copyButtonSize: "2xs" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-code-body", children: /* @__PURE__ */ jsxRuntime.jsx(
          CodeMirror__default.default,
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
        caption && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-code-caption", children: caption })
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "code",
    {
      ref,
      className: utils.cn("vds-code-inline", className),
      "data-color": color !== "neutral" ? color : void 0,
      ...props,
      children
    }
  );
}

exports.CodeBlock = CodeBlock;
exports.CodeEditor = CodeEditor;
exports.InlineCode = InlineCode;
exports.KNOWN_LANGUAGES = KNOWN_LANGUAGES;
exports.autoGrowTheme = autoGrowTheme;
exports.diffLinesField = diffLinesField;
exports.highlightLinesField = highlightLinesField;
exports.resolveLanguage = resolveLanguage;
exports.setHighlightedLines = setHighlightedLines;
exports.vdsCodeTheme = vdsCodeTheme;
