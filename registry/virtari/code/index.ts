import "./Code.css";
export { CodeBlock } from "./CodeBlock";
export type {
  CodeBlockProps,
  CodeBlockVariant,
  CodeBlockSize,
  CodeBlockDiff,
  CodeBlockRenderer,
} from "./CodeBlock";

export { CodeEditor } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

export { InlineCode } from "./InlineCode";
export type { InlineCodeProps, InlineCodeColor } from "./InlineCode";

export { vdsCodeTheme } from "./theme";
export {
  resolveLanguage,
  KNOWN_LANGUAGES,
  type CodeLanguage,
} from "./languages";
export {
  highlightLinesField,
  setHighlightedLines,
  diffLinesField,
  autoGrowTheme,
} from "./extensions";
