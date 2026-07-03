import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

/**
 * Highlight style — every entry references a CSS variable defined in
 * Code.tokens.css. No color literals live here. This means light/dark/variant
 * switching is fully driven by CSS, not by re-instantiating the editor.
 */
const vdsHighlightStyle = HighlightStyle.define([
  /* Keywords & control flow */
  { tag: t.keyword, color: "var(--vds-code-token-keyword)" },
  { tag: [t.controlKeyword, t.moduleKeyword], color: "var(--vds-code-token-control)", fontWeight: "var(--vds-font-weight-semibold, 600)" },

  /* Literals */
  { tag: t.string, color: "var(--vds-code-token-string)" },
  { tag: t.special(t.string), color: "var(--vds-code-token-string-special)" },
  { tag: t.number, color: "var(--vds-code-token-number)" },
  { tag: t.bool, color: "var(--vds-code-token-bool)" },
  { tag: t.null, color: "var(--vds-code-token-null)" },
  { tag: [t.atom, t.constant(t.variableName)], color: "var(--vds-code-token-constant)" },

  /* Comments */
  { tag: t.comment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: t.docComment, color: "var(--vds-code-token-doc)", fontStyle: "italic" },
  { tag: t.lineComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },
  { tag: t.blockComment, color: "var(--vds-code-token-comment)", fontStyle: "italic" },

  /* Functions / methods */
  { tag: t.function(t.variableName), color: "var(--vds-code-token-function)" },
  { tag: t.function(t.propertyName), color: "var(--vds-code-token-method)" },

  /* Punctuation / operators */
  { tag: t.operator, color: "var(--vds-code-token-operator)" },
  { tag: t.derefOperator, color: "var(--vds-code-token-operator)" },
  { tag: t.compareOperator, color: "var(--vds-code-token-operator)" },
  { tag: t.logicOperator, color: "var(--vds-code-token-operator)" },
  { tag: t.arithmeticOperator, color: "var(--vds-code-token-operator)" },
  { tag: t.bitwiseOperator, color: "var(--vds-code-token-operator)" },
  { tag: t.punctuation, color: "var(--vds-code-token-punctuation)" },
  { tag: [t.bracket, t.paren, t.brace, t.squareBracket, t.angleBracket], color: "var(--vds-code-token-bracket)" },
  { tag: t.separator, color: "var(--vds-code-token-punctuation)" },

  /* Markup (HTML/JSX/XML) */
  { tag: t.tagName, color: "var(--vds-code-token-tag)" },
  { tag: t.attributeName, color: "var(--vds-code-token-attribute)" },
  { tag: t.attributeValue, color: "var(--vds-code-token-attr-value)" },

  /* Regex / escapes */
  { tag: t.regexp, color: "var(--vds-code-token-regex)" },
  { tag: t.escape, color: "var(--vds-code-token-escape)" },

  /* Variables / properties */
  { tag: t.variableName, color: "var(--vds-code-token-variable)" },
  { tag: t.propertyName, color: "var(--vds-code-token-property)" },
  { tag: t.definition(t.variableName), color: "var(--vds-code-token-variable)", fontWeight: "var(--vds-font-weight-medium, 500)" },

  /* Types / classes / namespaces */
  { tag: [t.typeName, t.className, t.namespace], color: "var(--vds-code-token-type)" },
  { tag: t.definition(t.className), color: "var(--vds-code-token-class)", fontWeight: "var(--vds-font-weight-semibold, 600)" },

  /* Builtins (e.g. console, document) */
  { tag: [t.standard(t.variableName), t.standard(t.tagName)], color: "var(--vds-code-token-builtin)" },

  /* Markdown */
  { tag: t.heading, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: t.heading1, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: t.heading2, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-bold, 700)" },
  { tag: t.heading3, color: "var(--vds-code-token-heading)", fontWeight: "var(--vds-font-weight-semibold, 600)" },
  { tag: t.link, color: "var(--vds-code-token-link)", textDecoration: "underline" },
  { tag: t.url, color: "var(--vds-code-token-link)" },
  { tag: t.emphasis, fontStyle: "var(--vds-code-token-emphasis-style, italic)" },
  { tag: t.strong, fontWeight: "var(--vds-code-token-strong-weight, 600)" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.monospace, color: "var(--vds-code-token-string)" },

  /* Diagnostic / state */
  { tag: t.invalid, color: "var(--vds-color-danger-11, var(--vds-code-token-tag))", textDecoration: "underline wavy" },
]);

/**
 * Base CM theme — exhaustively sets every visible surface so CM6 defaults
 * (background, gutter, selection, cursor) cannot bleed through. All values
 * are CSS variables resolved against the .vds-code wrapper at runtime.
 *
 * The `dark: false` flag is irrelevant for our use — we drive light/dark via
 * the global semantic tokens, not by swapping themes.
 */
const vdsBaseTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "transparent",
      color: "var(--vds-code-text)",
      height: "100%",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-scroller": {
      fontFamily: "var(--vds-code-font-family)",
      lineHeight: "var(--vds-code-line-height)",
      overflow: "auto",
      overscrollBehavior: "contain",
    },
    ".cm-content": {
      padding: "var(--vds-code-padding-block) var(--vds-code-padding-inline)",
      caretColor: "var(--vds-code-caret-color)",
      color: "var(--vds-code-text)",
      fontFamily: "var(--vds-code-font-family)",
    },
    ".cm-line": {
      padding: "0 2px",
    },
    ".cm-gutters": {
      backgroundColor: "var(--vds-code-gutter-bg)",
      color: "var(--vds-code-gutter-text)",
      border: "none",
      borderInlineEnd: "0",
      userSelect: "none",
    },
    ".cm-gutterElement": {
      paddingInline: "var(--vds-code-gutter-padding-inline)",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      minWidth: "2.25rem",
      textAlign: "end",
      color: "var(--vds-code-gutter-text)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "var(--vds-code-gutter-active-bg)",
      color: "var(--vds-code-gutter-active-text)",
    },
    ".cm-activeLine": {
      backgroundColor: "var(--vds-code-line-active-bg)",
    },
    ".cm-line-highlighted": {
      backgroundColor: "var(--vds-code-line-highlight-bg)",
    },
    ".cm-line-diff-add": {
      backgroundColor: "var(--vds-code-diff-add-bg)",
      color: "var(--vds-code-diff-add-text)",
    },
    ".cm-line-diff-remove": {
      backgroundColor: "var(--vds-code-diff-remove-bg)",
      color: "var(--vds-code-diff-remove-text)",
    },
    ".cm-selectionBackground": {
      backgroundColor: "var(--vds-code-selection-bg) !important",
    },
    "&.cm-focused .cm-selectionBackground": {
      backgroundColor: "var(--vds-code-selection-bg) !important",
    },
    ".cm-content ::selection": {
      backgroundColor: "var(--vds-code-selection-bg)",
    },
    ".cm-cursor, .cm-cursor-primary": {
      borderInlineStartColor: "var(--vds-code-caret-color)",
      borderInlineStartWidth: "2px",
    },
    ".cm-placeholder": {
      color: "var(--vds-color-text-placeholder, var(--vds-code-token-comment))",
      fontStyle: "italic",
    },
    /* Search panel */
    ".cm-panels": {
      backgroundColor: "var(--vds-code-header-bg)",
      color: "var(--vds-code-header-text)",
      borderTop: "1px solid var(--vds-code-header-border)",
      fontFamily: "var(--vds-font-sans, ui-sans-serif, system-ui)",
      fontSize: "var(--vds-text-xs, 0.75rem)",
    },
    ".cm-panel input, .cm-panel button": {
      font: "inherit",
    },
    /* Tooltip / autocomplete */
    ".cm-tooltip": {
      backgroundColor: "var(--vds-color-surface-overlay, var(--vds-code-bg))",
      color: "var(--vds-code-text)",
      border: "1px solid var(--vds-code-border)",
      borderRadius: "var(--vds-radius-code-inline, 0.25rem)",
      boxShadow: "var(--vds-shadow-md, 0 4px 12px rgba(0,0,0,0.12))",
    },
    ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
      backgroundColor: "var(--vds-code-line-highlight-bg)",
      color: "var(--vds-code-text)",
    },
  },
  { dark: false },
);

/**
 * Combined theme + syntax highlight extension. Apply this once in any CM6
 * editor instance to get the Virtari look.
 */
export const vdsCodeTheme = [vdsBaseTheme, syntaxHighlighting(vdsHighlightStyle)];
