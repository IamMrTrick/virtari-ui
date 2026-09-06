# @virtari-packages/react-bottom-nav API snapshot

Version: 1.1.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/BottomNav.css",
  "./tokens": "./dist/BottomNav.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `BottomNav` (export) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavProps` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavVariant` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavSize` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavMatchStrategy` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavPosition` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavItem` (export) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavItemProps` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavFab` (export) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavFabProps` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavFabColor` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavBadge` (export) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `BottomNavBadgeProps` (type) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.
- `useAutoHide` (export) from `@virtari-packages/react-bottom-nav`; source: `packages/react-bottom-nav/src/index.ts`.

## Source type declarations

Source: `packages/react-bottom-nav/src/BottomNav.tsx`

```tsx
export type BottomNavPosition = "fixed" | "sticky" | "static";
```

Source: `packages/react-bottom-nav/src/BottomNav.tsx`

```tsx
export interface BottomNavProps extends HTMLAttributes<HTMLElement> {
  /** Custom root tag. Defaults to the semantic `<nav>` landmark. */
  as?: ElementType;
  /** Visual style. */
  variant?: BottomNavVariant;
  /** Height ramp. All sizes meet the 44px touch minimum. */
  size?: BottomNavSize;
  /** CSS positioning. Default `"fixed"` — pins to the viewport bottom. */
  position?: BottomNavPosition;
  /**
   * Current app route / pathname. When matched against an item's `href`,
   * that item auto-receives `aria-current="page"` and `data-active="true"`.
   */
  currentPath?: string;
  /** How `currentPath` is compared to each item's `href`. Default `"exact"`. */
  matchStrategy?: BottomNavMatchStrategy;
  /**
   * Respect iOS home-bar safe-area inset. When `true` (default), the bar
   * adds `env(safe-area-inset-bottom)` to its block-end padding.
   */
  safeArea?: boolean;
  /**
   * When `true`, the bar translates out on scroll-down and returns on
   * scroll-up. Respects `prefers-reduced-motion`. Default `false`.
   */
  autoHide?: boolean;
  /**
   * Slide a shared-element indicator between items on active change.
   * Applies to `"material"` and `"underline"` variants. Default `true`.
   */
  animatedIndicator?: boolean;
  /**
   * Adds a drop shadow. Ignored for `"floating"` which is always elevated.
   */
  elevated?: boolean;
  /**
   * Carve a rounded arc out of the bar behind a centre FAB.
   * Set to `true` when you render `<BottomNavFab>` between items.
   */
  notch?: boolean;
  /** Controlled hidden state — overrides `autoHide`. */
  hidden?: boolean;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-bottom-nav/src/BottomNavBadge.tsx`

```tsx
export interface BottomNavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Render as a dot (no number) when `true`. */
  dot?: boolean;
  /** Numeric count. Values above `max` are shown as `${max}+`. */
  count?: number;
  /** Upper bound before the "+" overflow marker. Default 99. */
  max?: number;
  /** Custom content (overrides count/dot rendering). */
  children?: ReactNode;
}
```

Source: `packages/react-bottom-nav/src/BottomNavFab.tsx`

```tsx
export type BottomNavFabColor = "primary" | "accent" | "success";
```

Source: `packages/react-bottom-nav/src/BottomNavFab.tsx`

```tsx
export interface BottomNavFabProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The FAB glyph (required). */
  icon: ReactNode;
  /** Accessible name. Falls back to `aria-label`. */
  label?: string;
  /** Color intent. Default `"primary"`. */
  color?: BottomNavFabColor;
  /** Render as child element (polymorphic via Slot). */
  asChild?: boolean;
}
```

Source: `packages/react-bottom-nav/src/BottomNavItem.tsx`

```tsx
export interface BottomNavItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Renders the item as an <a> when set; otherwise a <button>. */
  href?: string;
  /** Render as child element (polymorphic via Slot). */
  asChild?: boolean;
  /** The tab's glyph — required. */
  icon: ReactNode;
  /** The tab's text label. */
  label?: ReactNode;
  /** Notification badge. `true` → dot, `number` → count pill, node → custom. */
  badge?: ReactNode | number | boolean;
  /** Override `currentPath` matching — force active state. */
  active?: boolean;
  /** Visually mutes and blocks clicks. */
  disabled?: boolean;
  /** Anchor-only: window target. */
  target?: string;
  /** Anchor-only: rel attribute. */
  rel?: string;
  /** Anchor-only: filename for download links. */
  download?: string | boolean;
  children?: ReactNode;
}
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export type BottomNavVariant = "material" | "ios" | "floating" | "underline";
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export type BottomNavSize = "sm" | "md" | "lg";
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export type BottomNavMatchStrategy = "exact" | "startsWith";
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export interface BottomNavContextValue {
  variant: BottomNavVariant;
  size: BottomNavSize;
  currentPath?: string;
  matchStrategy: BottomNavMatchStrategy;
}
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export function useBottomNav(): BottomNavContextValue;
```

Source: `packages/react-bottom-nav/src/context.ts`

```tsx
export function matchesCurrent(
  href: string | undefined,
  currentPath: string | undefined,
  strategy: BottomNavMatchStrategy,
): boolean;
```

Source: `packages/react-bottom-nav/src/useAutoHide.ts`

```tsx
export function useAutoHide(enabled: boolean): boolean;
```

## Source files

- `packages/react-bottom-nav/src/BottomNav.css`
- `packages/react-bottom-nav/src/BottomNav.tokens.css`
- `packages/react-bottom-nav/src/BottomNav.tsx`
- `packages/react-bottom-nav/src/BottomNavBadge.tsx`
- `packages/react-bottom-nav/src/BottomNavFab.tsx`
- `packages/react-bottom-nav/src/BottomNavItem.tsx`
- `packages/react-bottom-nav/src/context.ts`
- `packages/react-bottom-nav/src/index.ts`
- `packages/react-bottom-nav/src/useAutoHide.ts`
- `packages/react-bottom-nav/package.json`
