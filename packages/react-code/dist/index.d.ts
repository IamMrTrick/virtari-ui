import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ReactNode, Ref } from 'react';
import { LanguageSupport } from '@codemirror/language';
import * as _codemirror_state from '@codemirror/state';
import { Extension, StateField } from '@codemirror/state';
import { DecorationSet } from '@codemirror/view';

/**
 * Curated set of preloaded language grammars. ~80 KB gz total. These cover
 * the languages the design system docs most commonly demonstrate.
 */
type CodeLanguage = "javascript" | "js" | "typescript" | "ts" | "jsx" | "tsx" | "css" | "html" | "json" | "markdown" | "md" | "python" | "py" | "go" | "rust" | "rs" | "sql" | "yaml" | "yml" | "xml" | "bash" | "shell" | "sh" | "plaintext" | "text" | "txt" | string;
/**
 * Resolve a language id to its CM6 LanguageSupport. Preloaded languages
 * resolve synchronously; everything else returns a Promise.
 */
declare function resolveLanguage(id: CodeLanguage | undefined): LanguageSupport | LanguageSupport[] | Promise<LanguageSupport | LanguageSupport[]> | null;
/**
 * List of language ids known to the registry — useful for building language
 * pickers in docs / settings panels.
 */
declare const KNOWN_LANGUAGES: ReadonlyArray<string>;

type CodeBlockVariant = "card" | "minimal" | "embedded";
type CodeBlockSize = "sm" | "md" | "lg";
type CodeBlockDiff = "none" | "unified";
interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
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
declare function CodeBlock({ code, language, filename, filenameIcon, showLineNumbers, highlightLines, diff, wrap, copyable, maxHeight, variant, size, caption, className, style, ref, ...props }: CodeBlockProps): react_jsx_runtime.JSX.Element;

interface CodeEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
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
declare function CodeEditor({ value, onValueChange, language, placeholder, readOnly, autoFocus, showLineNumbers, wrap, tabSize, insertSpaces, minLines, maxLines, copyable, filename, filenameIcon, variant, size, caption, extensions: userExtensions, className, style, ref, ...props }: CodeEditorProps): react_jsx_runtime.JSX.Element;

type InlineCodeColor = "neutral" | "primary" | "accent";
interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
    /** Color variant. Defaults to neutral (subtle gray). */
    color?: InlineCodeColor;
    /** Forwarded ref for the <code> element. */
    ref?: Ref<HTMLElement>;
}
declare function InlineCode({ color, className, children, ref, ...props }: InlineCodeProps): react_jsx_runtime.JSX.Element;

/**
 * Combined theme + syntax highlight extension. Apply this once in any CM6
 * editor instance to get the Virtari look.
 */
declare const vdsCodeTheme: _codemirror_state.Extension[];

declare const setHighlightedLines: _codemirror_state.StateEffectType<number[]>;
declare const highlightLinesField: StateField<DecorationSet>;
declare const diffLinesField: StateField<DecorationSet>;
declare function autoGrowTheme(minLines?: number, maxLines?: number): Extension;

export { CodeBlock, type CodeBlockDiff, type CodeBlockProps, type CodeBlockSize, type CodeBlockVariant, CodeEditor, type CodeEditorProps, type CodeLanguage, InlineCode, type InlineCodeColor, type InlineCodeProps, KNOWN_LANGUAGES, autoGrowTheme, diffLinesField, highlightLinesField, resolveLanguage, setHighlightedLines, vdsCodeTheme };
