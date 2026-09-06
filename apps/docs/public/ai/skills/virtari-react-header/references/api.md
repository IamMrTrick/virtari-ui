# @virtari-packages/react-header API snapshot

Version: 0.4.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Header.css",
  "./tokens": "./dist/Header.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Header` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderProps` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSlot` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderRow` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderTop` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderMain` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderBottom` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderRowProps` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSlotRowProps` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderStickyMode` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderBackground` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderGutter` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderWidth` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderGap` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderHeight` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSection` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderStart` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderCenter` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderEnd` (export) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSectionProps` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSideSectionProps` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.
- `HeaderSide` (type) from `@virtari-packages/react-header`; source: `packages/react-header/src/index.ts`.

## Source type declarations

Source: `packages/react-header/src/Header.tsx`

```tsx
export type HeaderSlot = "top" | "main" | "bottom";
```

Source: `packages/react-header/src/Header.tsx`

```tsx
export function useHeaderContext(): HeaderContextValue;
```

Source: `packages/react-header/src/Header.tsx`

```tsx
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Override the root tag. Defaults to the semantic `"header"` landmark. */
  as?: ElementType;
  /**
   * External top offset applied to every sticky row — e.g. an announcement bar
   * rendered above the <Header>. Any valid CSS length (`"0px"`, `"2rem"`, `"env(safe-area-inset-top)"`).
   */
  stickyOffset?: string;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-header/src/Header.tsx`

```tsx
export function Header({
  as: Tag = "header",
  stickyOffset = "0px",
  className,
  style,
  children,
  ref,
  ...rest
}: HeaderProps);
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderStickyMode = StickyMode;
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderBackground = "none" | "subtle" | "muted" | "emphasis";
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderHeight = "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export interface HeaderRowProps extends HTMLAttributes<HTMLElement> {
  /** Override the default tag. Row renders `<div>` by default — pass `"nav"` when the row *is* the primary nav. */
  as?: ElementType;
  /** Which slot this row occupies. Drives DOM order, sticky stacking and z-index. */
  slot: HeaderSlot;
  /** Sticky behavior. `"none"` = static; `"always"` = pinned; `"smart"` = hide on scroll-down, reveal on scroll-up; `"collapse"` = stay pinned but collapse to 0 height. */
  sticky?: HeaderStickyMode;
  /** Forces a fully transparent row (overrides `background`). Useful over hero imagery. */
  transparent?: boolean;
  /** Dead-center the middle section — outer sections become equal-width tracks. */
  center?: boolean;
  /** Background preset mapped to surface tokens. */
  background?: HeaderBackground;
  /** Horizontal padding preset. */
  gutter?: HeaderGutter;
  /** Max inline size of the inner container. */
  width?: HeaderWidth;
  /** Gap between the three sections. */
  gap?: HeaderGap;
  /** Height preset. */
  height?: HeaderHeight;
  /** Arbitrary row height (wins over `height`). Any CSS length. */
  blockSize?: string;
  /** Wrap content in the max-width container (default `true`). Set `false` for edge-to-edge rows. */
  contained?: boolean;
  /** For `sticky="collapse"` — document-space scrollY trigger. Defaults to the row's own bottom edge. */
  collapseAt?: number;
  /** For `sticky="smart"` — min scroll delta (px) before flipping hide/show. Default `4`. */
  smartThreshold?: number;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export function HeaderRow({
  as: Tag = "div",
  slot,
  sticky = "none",
  transparent,
  center,
  background,
  gutter,
  width,
  gap,
  height,
  blockSize,
  contained = true,
  collapseAt,
  smartThreshold,
  className,
  style,
  children,
  ref,
  ...rest
}: HeaderRowProps);
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export type HeaderSlotRowProps = Omit<HeaderRowProps, "slot">;
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export function HeaderTop(props: HeaderSlotRowProps);
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export function HeaderMain(props: HeaderSlotRowProps);
```

Source: `packages/react-header/src/HeaderRow.tsx`

```tsx
export function HeaderBottom(props: HeaderSlotRowProps);
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export type HeaderSide = "start" | "center" | "end";
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export interface HeaderSectionProps extends HTMLAttributes<HTMLElement> {
  /** Override the default tag. Section renders `<div>` — swap for `"nav"` (with `aria-label`) on the nav section, etc. */
  as?: ElementType;
  /** Which slot of the row this section belongs to. */
  side: HeaderSide;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export function HeaderSection({
  as: Tag = "div",
  side,
  className,
  ref,
  ...rest
}: HeaderSectionProps);
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export type HeaderSideSectionProps = Omit<HeaderSectionProps, "side">;
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export function HeaderStart(props: HeaderSideSectionProps);
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export function HeaderCenter(props: HeaderSideSectionProps);
```

Source: `packages/react-header/src/HeaderSection.tsx`

```tsx
export function HeaderEnd(props: HeaderSideSectionProps);
```

Source: `packages/react-header/src/useStickyBehavior.ts`

```tsx
export type StickyMode = "none" | "always" | "smart" | "collapse";
```

Source: `packages/react-header/src/useStickyBehavior.ts`

```tsx
export function useStickyBehavior({
  mode,
  rowRef,
  smartThreshold = 4,
  collapseAt,
}: Options);
```

## Source files

- `packages/react-header/src/Header.css`
- `packages/react-header/src/Header.tokens.css`
- `packages/react-header/src/Header.tsx`
- `packages/react-header/src/HeaderRow.tsx`
- `packages/react-header/src/HeaderSection.tsx`
- `packages/react-header/src/index.ts`
- `packages/react-header/src/useStickyBehavior.ts`
- `packages/react-header/package.json`
