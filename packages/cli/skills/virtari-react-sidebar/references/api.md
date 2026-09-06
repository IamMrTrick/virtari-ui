# @virtari-packages/react-sidebar API snapshot

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
  "./styles": "./dist/Sidebar.css",
  "./tokens": "./dist/Sidebar.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Sidebar` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `useSidebar` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `useSidebarOptional` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarMode` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarSide` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarSize` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarBackground` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarHeader` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarBody` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarFooter` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarSeparator` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarHeaderProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarBodyProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarFooterProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarSeparatorProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarTrigger` (export) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.
- `SidebarTriggerProps` (type) from `@virtari-packages/react-sidebar`; source: `packages/react-sidebar/src/index.ts`.

## Source type declarations

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export type SidebarMode = "full-height" | "below-header";
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export type SidebarSide = "start" | "end";
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export type SidebarSize = "sm" | "md" | "lg" | "xl";
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export type SidebarBackground = "none" | "surface" | "subtle" | "muted";
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export function useSidebar(): SidebarContextValue;
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export function useSidebarOptional(): SidebarContextValue | null;
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Override root tag. Default `"aside"` (complementary landmark). Set to `"nav"` when this IS the primary navigation — remember to also pass `aria-label`. */
  as?: ElementType;
  /**
   * Layout mode:
   * - `"full-height"` (default): sidebar spans the whole viewport height and sits *beside* the header.
   * - `"below-header"`: sidebar starts below a sticky header — pair with `stickyOffset` equal to the header's height.
   */
  mode?: SidebarMode;
  /** Which edge the sidebar is anchored to. Logical: `"start"` = inline-start (LTR left, RTL right). */
  side?: SidebarSide;
  /** Width preset (expanded). */
  size?: SidebarSize;
  /** Arbitrary expanded width (wins over `size`). Any CSS length. */
  inlineSize?: string;
  /** Arbitrary rail width (collapsed state). Any CSS length. */
  railSize?: string;
  /**
   * Override the block-size (height). Defaults to `100svh` in `full-height`
   * mode, or `calc(100svh - stickyOffset)` in `below-header` mode. Useful for
   * embedding the sidebar inside a panel / demo frame with a fixed height.
   */
  blockSize?: string;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Initial collapsed state for uncontrolled use. */
  defaultCollapsed?: boolean;
  /** Fires on collapse/expand transitions. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** When `false`, the `<SidebarTrigger>` renders disabled and `toggle()` is a no-op. Default `true`. */
  collapsible?: boolean;
  /** Top sticky offset (for `mode="below-header"`). Any CSS length — usually the header's total height. Default `"0px"`. */
  stickyOffset?: string;
  /** Surface background preset. */
  background?: SidebarBackground;
  /** Show the inline-end border (or inline-start in `side="end"`). Default `true`. */
  bordered?: boolean;
  /**
   * Enable the global `Ctrl+B` / `Cmd+B` keyboard shortcut that toggles the
   * sidebar. Default `true`. The mapping uses `KeyboardEvent.code` so it's
   * layout-independent — works on Farsi, Arabic, Cyrillic, etc. keyboards
   * without producing a different symbol from the physical key. Disabled
   * automatically when `collapsible` is `false`.
   */
  shortcut?: boolean;
  /**
   * Physical key that combines with `Ctrl`/`Cmd` for the shortcut. Uses the
   * lowercase letter name that `event.code` exposes — e.g. `"b"` becomes
   * `"KeyB"`. Default `"b"`.
   */
  shortcutKey?: string;
  /** Fired when the shortcut successfully toggles the sidebar. */
  onShortcut?: (e: KeyboardEvent) => void;
  /**
   * Fired when the shortcut is pressed but focus is on an editable element
   * (input / textarea / contenteditable). The toggle is suppressed — wire
   * this callback to surface a toast / inline message telling the user why
   * nothing happened.
   */
  onShortcutBlocked?: (e: KeyboardEvent) => void;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-sidebar/src/Sidebar.tsx`

```tsx
export function Sidebar({
  as: Tag = "aside",
  mode = "full-height",
  side = "start",
  size,
  inlineSize,
  railSize,
  blockSize,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  stickyOffset = "0px",
  background = "surface",
  bordered = true,
  shortcut = true,
  shortcutKey = "b",
  onShortcut,
  onShortcutBlocked,
  className,
  style,
  children,
  ref,
  ...rest
}: SidebarProps);
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export interface SidebarHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"header"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export function SidebarHeader({
  as: Tag = "header",
  className,
  ref,
  ...rest
}: SidebarHeaderProps);
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export interface SidebarBodyProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag. `"div"` by default; pass `"nav"` + `aria-label` when body IS the nav. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export function SidebarBody({
  as: Tag = "div",
  className,
  ref,
  ...rest
}: SidebarBodyProps);
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export interface SidebarFooterProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"footer"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export function SidebarFooter({
  as: Tag = "footer",
  className,
  ref,
  ...rest
}: SidebarFooterProps);
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export interface SidebarSeparatorProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"hr"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-sidebar/src/SidebarParts.tsx`

```tsx
export function SidebarSeparator({
  as: Tag = "hr",
  className,
  ref,
  ...rest
}: SidebarSeparatorProps);
```

Source: `packages/react-sidebar/src/SidebarTrigger.tsx`

```tsx
export interface SidebarTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom icon. When omitted a built-in chevron is used; the chevron rotates
   * based on `side` and the collapsed state so it always points toward the
   * direction the sidebar will collapse into.
   */
  children?: ReactNode;
  /**
   * Accessible label. Default: "Collapse sidebar" / "Expand sidebar" depending on state.
   * Override for localization.
   */
  expandLabel?: string;
  collapseLabel?: string;
  ref?: Ref<HTMLButtonElement>;
}
```

Source: `packages/react-sidebar/src/SidebarTrigger.tsx`

```tsx
export function SidebarTrigger({
  className,
  onClick,
  children,
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
  "aria-label": ariaLabelProp,
  type,
  disabled: disabledProp,
  ref,
  ...rest
}: SidebarTriggerProps);
```

## Source files

- `packages/react-sidebar/src/index.ts`
- `packages/react-sidebar/src/Sidebar.css`
- `packages/react-sidebar/src/Sidebar.tokens.css`
- `packages/react-sidebar/src/Sidebar.tsx`
- `packages/react-sidebar/src/SidebarParts.tsx`
- `packages/react-sidebar/src/SidebarTrigger.tsx`
- `packages/react-sidebar/package.json`
