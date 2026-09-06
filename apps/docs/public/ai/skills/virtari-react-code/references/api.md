# @virtari-packages/react-code API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/Code.css",
  "./tokens": "./dist/Code.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `CodeBlock` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeBlockProps` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeBlockVariant` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeBlockSize` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeBlockDiff` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeEditor` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeEditorProps` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `InlineCode` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `InlineCodeProps` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `InlineCodeColor` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `vdsCodeTheme` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `resolveLanguage` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `KNOWN_LANGUAGES` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `CodeLanguage` (type) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `highlightLinesField` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `setHighlightedLines` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `diffLinesField` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.
- `autoGrowTheme` (export) from `@virtari-packages/react-code`; source: `packages/react-code/src/index.ts`.

## Source type declarations

Source: `packages/react-code/src/CodeBlock.tsx`

```tsx
export type CodeBlockVariant = "card" | "minimal" | "embedded";
```

Source: `packages/react-code/src/CodeBlock.tsx`

```tsx
export type CodeBlockSize = "sm" | "md" | "lg";
```

Source: `packages/react-code/src/CodeBlock.tsx`

```tsx
export type CodeBlockDiff = "none" | "unified";
```

Source: `packages/react-code/src/CodeBlock.tsx`

```tsx
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
```

Source: `packages/react-code/src/CodeBlock.tsx`

```tsx
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
}: CodeBlockProps);
```

Source: `packages/react-code/src/CodeEditor.tsx`

```tsx
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
```

Source: `packages/react-code/src/CodeEditor.tsx`

```tsx
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
}: CodeEditorProps);
```

Source: `packages/react-code/src/extensions.ts`

```tsx
export function autoGrowTheme(minLines?: number, maxLines?: number): Extension;
```

Source: `packages/react-code/src/InlineCode.tsx`

```tsx
export type InlineCodeColor = "neutral" | "primary" | "accent";
```

Source: `packages/react-code/src/InlineCode.tsx`

```tsx
export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  /** Color variant. Defaults to neutral (subtle gray). */
  color?: InlineCodeColor;
  /** Forwarded ref for the <code> element. */
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-code/src/InlineCode.tsx`

```tsx
export function InlineCode({
  color = "neutral",
  className,
  children,
  ref,
  ...props
}: InlineCodeProps);
```

Source: `packages/react-code/src/languages.ts`

```tsx
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
```

Source: `packages/react-code/src/languages.ts`

```tsx
export function resolveLanguage(
  id: CodeLanguage | undefined,
): LanguageSupport | LanguageSupport[] | Promise<LanguageSupport | LanguageSupport[]> | null;
```

## Source files

- `packages/react-code/src/Code.css`
- `packages/react-code/src/Code.tokens.css`
- `packages/react-code/src/CodeBlock.tsx`
- `packages/react-code/src/CodeEditor.tsx`
- `packages/react-code/src/extensions.ts`
- `packages/react-code/src/index.ts`
- `packages/react-code/src/InlineCode.tsx`
- `packages/react-code/src/languages.ts`
- `packages/react-code/src/theme.ts`
- `packages/react-code/package.json`
