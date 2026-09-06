# @virtari-packages/react-tag-input API snapshot

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
  "./styles": "./dist/TagInput.css",
  "./tokens": "./dist/TagInput.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `TagInput` (export) from `@virtari-packages/react-tag-input`; source: `packages/react-tag-input/src/index.ts`.
- `TagInputProps` (type) from `@virtari-packages/react-tag-input`; source: `packages/react-tag-input/src/index.ts`.
- `TagInputSize` (type) from `@virtari-packages/react-tag-input`; source: `packages/react-tag-input/src/index.ts`.

## Source type declarations

Source: `packages/react-tag-input/src/TagInput.tsx`

```tsx
export type TagInputSize = "sm" | "md" | "lg";
```

Source: `packages/react-tag-input/src/TagInput.tsx`

```tsx
export interface TagInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
  /** Current array of tag strings. */
  value: string[];
  /** Called whenever the tag list changes. */
  onChange: (tags: string[]) => void;
  /** Maximum number of tags. No limit by default. */
  maxTags?: number;
  /** Allow duplicate tag strings. Default: false. */
  allowDuplicates?: boolean;
  /** Custom validation — return true to allow, string for an error message. */
  validate?: (tag: string) => boolean | string;
  /** Characters that trigger tag creation (in addition to Enter). Default: [","]. */
  delimiters?: string[];
  size?: TagInputSize;
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}
```

## Source files

- `packages/react-tag-input/src/index.ts`
- `packages/react-tag-input/src/TagInput.css`
- `packages/react-tag-input/src/TagInput.tokens.css`
- `packages/react-tag-input/src/TagInput.tsx`
- `packages/react-tag-input/package.json`
