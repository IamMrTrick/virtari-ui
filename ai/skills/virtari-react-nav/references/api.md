# @virtari-packages/react-nav API snapshot

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
  "./styles": "./dist/Nav.css",
  "./tokens": "./dist/Nav.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Nav` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavList` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavGroup` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSeparator` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavListProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavGroupProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSeparatorProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavItem` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavLink` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavTrigger` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavIcon` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavLabel` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavBadge` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavKbd` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavChevron` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavItemProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavLinkProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavTriggerProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavIconProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavLabelProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavBadgeProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavKbdProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavChevronProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSubmenu` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavMega` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavMegaSection` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSubmenuProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavMegaProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavMegaSectionProps` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavOrientation` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSubmenuMode` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavVariant` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavSize` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `NavContextValue` (type) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.
- `isActivePath` (export) from `@virtari-packages/react-nav`; source: `packages/react-nav/src/index.ts`.

## Source type declarations

Source: `packages/react-nav/src/context.ts`

```tsx
export type NavOrientation = "vertical" | "horizontal";
```

Source: `packages/react-nav/src/context.ts`

```tsx
export type NavSubmenuMode = "inline" | "popover";
```

Source: `packages/react-nav/src/context.ts`

```tsx
export type NavVariant =
  | "ghost"
  | "filled"
  | "pill"
  | "underline"
  | "reveal"
  | "outline"
  | "lift"
  | "none"
  | "dot"
  | "tab";
```

Source: `packages/react-nav/src/context.ts`

```tsx
export type NavSize = "sm" | "md" | "lg";
```

Source: `packages/react-nav/src/context.ts`

```tsx
export interface NavContextValue {
  orientation: NavOrientation;
  submenuMode: NavSubmenuMode;
  variant: NavVariant;
  size: NavSize;
  /** Pathname / key used to auto-mark an item as current when its `href` matches. */
  currentPath?: string;
  /** Exact vs startsWith match against `currentPath`. */
  matchStrategy: "exact" | "startsWith";
  /**
   * Rail / icon-only mode. When `true`:
   *   • Labels, badges, kbd hints and chevrons are visually hidden (labels remain SR-readable).
   *   • Items shrink to a square icon-button shape.
   *   • Submenus force `popover` mode regardless of per-item or nav default — a
   *     collapsed rail can't meaningfully host an inline (accordion) expansion.
   */
  collapsed: boolean;
}
```

Source: `packages/react-nav/src/context.ts`

```tsx
export function useNavContext(): NavContextValue;
```

Source: `packages/react-nav/src/context.ts`

```tsx
export function useNavLevel(): number;
```

Source: `packages/react-nav/src/context.ts`

```tsx
export interface NavSubmenuContextValue {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: NavSubmenuMode;
  /** Optional heading rendered above popover content in collapsed rail mode. */
  popoverHeading?: React.ReactNode;
  /** Ref to the trigger button — used to return focus on close in popover mode. */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Floating UI refs / props (only populated in popover mode). */
  floating: FloatingBridge | null;
}
```

Source: `packages/react-nav/src/context.ts`

```tsx
export interface FloatingBridge {
  refs: {
    setReference: (el: HTMLElement | null) => void;
    setFloating: (el: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;
  context: unknown;
  getReferenceProps: (
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  isMounted: boolean;
  /**
   * `false` during the frame(s) between mount and Floating UI's first
   * position computation. Submenus should be kept `visibility: hidden`
   * while this is `false` — otherwise they paint briefly at the
   * top-left of the viewport (the initial `translate(0, 0)`) and then
   * jump to the anchor.
   */
  isPositioned: boolean;
}
```

Source: `packages/react-nav/src/context.ts`

```tsx
export function useNavSubmenuContext(): NavSubmenuContextValue | null;
```

Source: `packages/react-nav/src/context.ts`

```tsx
export type NavPopoverCloser = () => void;
```

Source: `packages/react-nav/src/context.ts`

```tsx
export function useNavPopoverCloser(): NavPopoverCloser | null;
```

Source: `packages/react-nav/src/context.ts`

```tsx
export function isActivePath(
  href: string | undefined,
  currentPath: string | undefined,
  strategy: "exact" | "startsWith",
): boolean;
```

Source: `packages/react-nav/src/Nav.tsx`

```tsx
export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** Override the root tag. Defaults to the semantic `<nav>` landmark. */
  as?: ElementType;
  /**
   * Layout direction. `vertical` stacks items top-to-bottom (sidebar style);
   * `horizontal` runs them left-to-right (menubar style). Default `vertical`.
   */
  orientation?: NavOrientation;
  /**
   * How submenus appear by default. `inline` expands in-place (accordion),
   * `popover` floats them (dropdown). Each `<NavItem>` can override per-item.
   * When omitted, defaults to `popover` for horizontal nav and `inline` for vertical.
   */
  submenu?: NavSubmenuMode;
  /** Visual style of items. */
  variant?: NavVariant;
  /** Item height ramp. */
  size?: NavSize;
  /**
   * Current route / pathname. When set, `<NavLink>`s with matching `href`
   * auto-receive `aria-current="page"` — no need to pass `active` manually.
   */
  currentPath?: string;
  /**
   * How `currentPath` is compared to each link's `href`. Default `exact`.
   * `startsWith` is convenient for docs-style nested routes.
   */
  matchStrategy?: "exact" | "startsWith";
  /**
   * Rail / icon-only mode. Labels fade to sr-only, badges / chevrons hide, items
   * become square icon buttons, and any item with a submenu forces popover
   * presentation (inline accordion would be nonsensical on a narrow rail).
   */
  collapsed?: boolean;
  /**
   * Vertical tree-guide lines. When `true`, each inline submenu draws a 1px
   * vertical guide from the parent item's icon-centre down through its
   * children — the file-tree look (VS Code, finder). Only affects vertical
   * orientation with inline submenus; no-op for popover / horizontal navs.
   */
  tree?: boolean;
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-nav/src/Nav.tsx`

```tsx
export function Nav({
  as: Tag = "nav",
  orientation = "vertical",
  submenu,
  variant = "ghost",
  size = "md",
  currentPath,
  matchStrategy = "exact",
  collapsed = false,
  tree = false,
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  ...rest
}: NavProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavIconProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavIcon({
  asChild = false,
  className,
  ref,
  ...rest
}: NavIconProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavLabelProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavLabel({ className, ref, ...rest }: NavLabelProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavBadge({ className, ref, ...rest }: NavBadgeProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavKbdProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavKbd({ className, ref, ...rest }: NavKbdProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export type NavChevronProps = HTMLAttributes<SVGElement>;
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavChevron({ className, ...rest }: NavChevronProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> {
  asChild?: boolean;
  /** Manually force active state (overrides auto-match). */
  active?: boolean;
  /** Disabled state — sets aria-disabled + removes pointer events. */
  disabled?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavLink({
  asChild = false,
  active,
  disabled,
  href,
  className,
  onClick,
  children,
  ref,
  ...rest
}: NavLinkProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  asChild?: boolean;
  /** Visual active state (e.g. one of its descendants is the current page). */
  active?: boolean;
  ref?: Ref<HTMLButtonElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavTrigger({
  asChild = false,
  active,
  disabled,
  className,
  type,
  children,
  ref,
  ...rest
}: NavTriggerProps);
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export interface NavItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "children"> {
  /* ── Declarative props ── */
  href?: string;
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  kbd?: ReactNode;
  /** When provided, item renders with a disclosure trigger and this submenu content. */
  submenu?: ReactNode;
  /** Per-item submenu mode override — defaults to Nav's `submenu` setting. */
  submenuMode?: NavSubmenuMode;
  /** Controlled open state for the submenu (advanced). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Floating placement (popover mode). */
  placement?: Parameters<typeof useSubmenu>[0]["placement"];
  /**
   * Optional heading shown at the top of popover submenus in collapsed rail
   * mode. Defaults to `label` for declarative submenu items.
   */
  popoverHeading?: ReactNode;
  active?: boolean;
  disabled?: boolean;

  /* ── Compound props ── */
  children?: ReactNode;

  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-nav/src/NavItem.tsx`

```tsx
export function NavItem({
  href,
  label,
  icon,
  badge,
  kbd,
  submenu,
  submenuMode,
  open,
  onOpenChange,
  placement,
  popoverHeading,
  active,
  disabled,
  className,
  children,
  ref,
  ...rest
}: NavItemProps);
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export interface NavListProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Override the orientation inherited from <Nav> (e.g. a horizontal sub-row in a vertical menubar). */
  orientation?: "vertical" | "horizontal";
  ref?: Ref<HTMLElement>;
}
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export function NavList({
  as: Tag = "ul",
  orientation,
  className,
  children,
  ref,
  ...rest
}: NavListProps);
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export interface NavGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group label displayed above the list. Also used as the accessible name of the `<ul>`. */
  label: React.ReactNode;
  /** Optional explicit id for the label element. */
  labelId?: string;
  /** Render as a wrapper only (omit visible label, keep aria association). */
  hideLabel?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export function NavGroup({
  label,
  labelId,
  hideLabel,
  className,
  children,
  ref,
  ...rest
}: NavGroupProps);
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export interface NavSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  ref?: Ref<HTMLHRElement>;
}
```

Source: `packages/react-nav/src/NavList.tsx`

```tsx
export function NavSeparator({
  className,
  ref,
  ...rest
}: NavSeparatorProps);
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export interface NavSubmenuProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export function NavSubmenu({
  className,
  style,
  children,
  ref,
  ...rest
}: NavSubmenuProps);
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export interface NavMegaProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the mega grid. Default 3. */
  columns?: number;
  /** Anchor to the trigger (popover, default) or pin to the viewport edges (full-bleed). */
  layout?: "popover" | "full-bleed";
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export function NavMega({
  columns = 3,
  layout = "popover",
  className,
  style,
  children,
  ref,
  ...rest
}: NavMegaProps);
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export interface NavMegaSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section heading rendered as a small uppercase label. */
  heading?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-nav/src/NavSubmenu.tsx`

```tsx
export function NavMegaSection({
  heading,
  className,
  children,
  ref,
  ...rest
}: NavMegaSectionProps);
```

Source: `packages/react-nav/src/useSubmenu.ts`

```tsx
export function useSubmenu({
  mode,
  orientation,
  open: openProp,
  onOpenChange,
  placement,
}: Options): NavSubmenuContextValue;
```

## Source files

- `packages/react-nav/src/context.ts`
- `packages/react-nav/src/index.ts`
- `packages/react-nav/src/Nav.css`
- `packages/react-nav/src/Nav.tokens.css`
- `packages/react-nav/src/Nav.tsx`
- `packages/react-nav/src/NavItem.tsx`
- `packages/react-nav/src/NavList.tsx`
- `packages/react-nav/src/NavSubmenu.tsx`
- `packages/react-nav/src/useSubmenu.ts`
- `packages/react-nav/package.json`
