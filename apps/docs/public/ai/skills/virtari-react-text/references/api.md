# @virtari-packages/react-text API snapshot

Version: 1.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Text.css",
  "./tokens": "./dist/Text.tokens.css",
  "./heading/styles": "./dist/Heading.css",
  "./heading/tokens": "./dist/Heading.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Text` (export) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextProps` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextSize` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextWeight` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextTone` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextAlign` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextLeading` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextWrap` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `TextElement` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `Heading` (export) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingProps` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingLevel` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingSize` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingWeight` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingTone` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingAlign` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingLeading` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingTracking` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.
- `HeadingWrap` (type) from `@virtari-packages/react-text`; source: `packages/react-text/src/index.ts`.

## Source type declarations

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inherit";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingAlign = "start" | "center" | "end" | "justify";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingLeading = "none" | "tight" | "snug" | "normal" | "relaxed";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingTracking = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export type HeadingWrap = "balance" | "pretty" | "nowrap";
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level — controls the rendered tag (h1–h6). */
  level?: HeadingLevel;
  /** Visual size step — defaults to a sensible match for `level`. */
  size?: HeadingSize;
  weight?: HeadingWeight;
  tone?: HeadingTone;
  align?: HeadingAlign;
  leading?: HeadingLeading;
  tracking?: HeadingTracking;
  truncate?: boolean;
  wrap?: HeadingWrap;
  asChild?: boolean;
  ref?: Ref<HTMLHeadingElement>;
}
```

Source: `packages/react-text/src/Heading.tsx`

```tsx
export function Heading({
  level = 2,
  size,
  weight,
  tone,
  align,
  leading,
  tracking,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}: HeadingProps);
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inherit";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextAlign = "start" | "center" | "end" | "justify";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextLeading = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextWrap = "balance" | "pretty" | "nowrap";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em";
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  leading?: TextLeading;
  truncate?: boolean;
  wrap?: TextWrap;
  asChild?: boolean;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-text/src/Text.tsx`

```tsx
export function Text({
  as = "p",
  size = "3",
  weight,
  tone,
  align,
  leading,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}: TextProps);
```

## Source files

- `packages/react-text/src/Heading.css`
- `packages/react-text/src/Heading.tokens.css`
- `packages/react-text/src/Heading.tsx`
- `packages/react-text/src/index.ts`
- `packages/react-text/src/Text.css`
- `packages/react-text/src/Text.tokens.css`
- `packages/react-text/src/Text.tsx`
- `packages/react-text/package.json`
