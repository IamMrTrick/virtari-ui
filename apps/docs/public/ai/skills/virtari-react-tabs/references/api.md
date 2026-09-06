# @virtari-packages/react-tabs API snapshot

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
  "./styles": {
    "style": "./dist/Tabs.css",
    "default": "./dist/Tabs.css"
  },
  "./tokens": {
    "style": "./dist/Tabs.tokens.css",
    "default": "./dist/Tabs.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Tabs` (export) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsList` (export) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsTrigger` (export) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsContent` (export) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsProps` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsListProps` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsTriggerProps` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsContentProps` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsVariant` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsSize` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsPanels` (export) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsPanelsMountStrategy` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.
- `TabsPanelsProps` (type) from `@virtari-packages/react-tabs`; source: `packages/react-tabs/src/index.ts`.

## Source type declarations

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export type TabsVariant =
  | "underline"
  | "line"
  | "pills"
  | "segmented"
  | "boxed"
  | "bordered"
  | "solid"
  | "soft"
  | "ghost";
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export type TabsSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** Collapse `orientation="vertical"` back to horizontal when the Tabs
   *  container is narrower than this (in px). Pass `undefined` to disable. */
  collapseAt?: number;
  /** Enable touch swipe on the active content to switch to prev/next tab.
   *  Only active in horizontal orientation. */
  swipeable?: boolean;
  /** Minimum horizontal drag (px) to commit a swipe. Default 60. */
  swipeThreshold?: number;
  /** Max visual translation (px) while dragging. Default 80. */
  swipeMaxOffset?: number;
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Root>>;
}
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export function Tabs({
  className,
  orientation = "horizontal",
  dir,
  collapseAt,
  swipeable = false,
  swipeThreshold = 60,
  swipeMaxOffset = 80,
  ref,
  ...props
}: TabsProps);
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animatedIndicator?: boolean;
  /** When the list overflows, auto-scroll the active trigger into view
   *  (centered) so it's never clipped. Default `true`. */
  autoScroll?: boolean;
  ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export function TabsList({
  className,
  variant = "underline",
  size = "md",
  fullWidth,
  animatedIndicator = true,
  autoScroll = true,
  ref,
  ...props
}: TabsListProps);
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Trigger>>;
}
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export function TabsTrigger({
  children,
  className,
  ref,
  ...props
}: TabsTriggerProps);
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Content>>;
}
```

Source: `packages/react-tabs/src/Tabs.tsx`

```tsx
export function TabsContent({ className, ref, ...props }: TabsContentProps);
```

Source: `packages/react-tabs/src/TabsPanels.tsx`

```tsx
export interface TabsPanelsProps {
  children: ReactNode;
  className?: string;
  /** Enable swipe/drag to navigate between panels. Default true. */
  swipeable?: boolean;
  /** Minimum pointer drag (px) to commit a tab change. Default 50. */
  swipeThreshold?: number;
  /** Restrict swipe interaction to touch-only devices (pointer: coarse).
   *  Default true — desktop users still change tabs via the list. */
  touchOnly?: boolean;
  /** Controls how many tab panels stay mounted.
   *  - `all`: preserves the previous behavior by mounting every panel.
   *  - `adjacent`: mounts only the active panel and its previous/next
   *    neighbors, keeping swipe responsive without paying the cost for
   *    distant heavy panels.
   *
   *  Default `all` to avoid changing existing behavior. */
  mountStrategy?: TabsPanelsMountStrategy;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-tabs/src/TabsPanels.tsx`

```tsx
export type TabsPanelsMountStrategy = "all" | "adjacent";
```

Source: `packages/react-tabs/src/TabsPanels.tsx`

```tsx
export function TabsPanels({
  children,
  className,
  swipeable = true,
  swipeThreshold = 50,
  touchOnly = true,
  mountStrategy = "all",
  ref,
}: TabsPanelsProps);
```

Source: `packages/react-tabs/src/use-carousel-swipe.ts`

```tsx
export function useCarouselSwipe(
  containerRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  {
    enabled,
    activeIndex,
    slideCount,
    threshold,
    onCommit,
  }: UseCarouselSwipeOptions,
);
```

Source: `packages/react-tabs/src/use-responsive-orientation.ts`

```tsx
export type TabsOrientation = "horizontal" | "vertical";
```

Source: `packages/react-tabs/src/use-responsive-orientation.ts`

```tsx
export function useResponsiveOrientation(
  rootRef: RefObject<HTMLDivElement | null>,
  requested: TabsOrientation,
  collapseAt: number | undefined,
): TabsOrientation;
```

Source: `packages/react-tabs/src/use-tabs-auto-scroll.ts`

```tsx
export function useTabsAutoScroll(
  listRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
);
```

Source: `packages/react-tabs/src/use-tabs-indicator.ts`

```tsx
export function useTabsIndicator(
  listRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
);
```

Source: `packages/react-tabs/src/use-tabs-swipe.ts`

```tsx
export function useTabsSwipe(
  rootRef: RefObject<HTMLDivElement | null>,
  { enabled, threshold, maxOffset }: UseTabsSwipeOptions,
);
```

## Source files

- `packages/react-tabs/src/index.ts`
- `packages/react-tabs/src/Tabs.css`
- `packages/react-tabs/src/Tabs.tokens.css`
- `packages/react-tabs/src/Tabs.tsx`
- `packages/react-tabs/src/TabsPanels.tsx`
- `packages/react-tabs/src/use-carousel-swipe.ts`
- `packages/react-tabs/src/use-responsive-orientation.ts`
- `packages/react-tabs/src/use-tabs-auto-scroll.ts`
- `packages/react-tabs/src/use-tabs-indicator.ts`
- `packages/react-tabs/src/use-tabs-swipe.ts`
- `packages/react-tabs/package.json`
