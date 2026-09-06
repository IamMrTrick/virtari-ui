# @virtari-packages/react-scroll-area API snapshot

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
    "style": "./dist/ScrollArea.css",
    "default": "./dist/ScrollArea.css"
  },
  "./tokens": {
    "style": "./dist/ScrollArea.tokens.css",
    "default": "./dist/ScrollArea.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `ScrollArea` (export) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.
- `ScrollBar` (export) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.
- `ScrollAreaProps` (type) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.
- `ScrollBarProps` (type) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.
- `ScrollAreaArrow` (export) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.
- `ScrollAreaArrowProps` (type) from `@virtari-packages/react-scroll-area`; source: `packages/react-scroll-area/src/index.ts`.

## Source type declarations

Source: `packages/react-scroll-area/src/hooks/use-drag-scroll.ts`

```tsx
export function useDragScroll(
  viewportRef: RefObject<HTMLElement | null>,
  rootRef: RefObject<HTMLElement | null>,
  { enabled, axis, threshold = 6 }: UseDragScrollOptions,
);
```

Source: `packages/react-scroll-area/src/hooks/use-edge-state.ts`

```tsx
export interface EdgeState {
  atInlineStart: boolean;
  atInlineEnd: boolean;
  atBlockStart: boolean;
  atBlockEnd: boolean;
}
```

Source: `packages/react-scroll-area/src/hooks/use-edge-state.ts`

```tsx
export function useEdgeState(
  viewportRef: RefObject<HTMLElement | null>,
  rootRef: RefObject<HTMLElement | null>,
  { enabled, orientation, tolerance = 1, onChange }: UseEdgeStateOptions,
);
```

Source: `packages/react-scroll-area/src/hooks/use-infinite-scroll.ts`

```tsx
export function useInfiniteScroll(
  viewportRef: RefObject<HTMLElement | null>,
  sentinelRef: RefObject<HTMLElement | null>,
  { enabled, orientation, threshold, onEndReached }: UseInfiniteScrollOptions,
);
```

Source: `packages/react-scroll-area/src/hooks/use-wheel-horizontal.ts`

```tsx
export function useWheelHorizontal(
  viewportRef: RefObject<HTMLElement | null>,
  { enabled }: UseWheelHorizontalOptions,
);
```

Source: `packages/react-scroll-area/src/ScrollArea.tsx`

```tsx
export interface ScrollAreaProps
  extends Omit<
    ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
    "children" | "dir" | "type"
  > {
  children?: ReactNode;

  /** Which axis overflows. "both" enables both scrollbars and 2-axis drag. */
  orientation?: Orientation;
  /** Scrollbar thickness ramp — matches Button/Input size vocabulary. */
  size?: Size;
  /** Smart shows overflowing scrollbars on scroll, hover, or keyboard focus. */
  type?: "smart" | "auto" | "always" | "scroll" | "hover";
  /** Access the native scrolling element for scroll restoration and measurement. */
  viewportRef?: Ref<HTMLDivElement>;
  /** Native viewport attributes/events; keyboard scrolling remains available. */
  viewportProps?: Omit<ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>, "children" | "asChild">;

  /** Enable pointer-drag-to-scroll (mouse, touch, pen). */
  drag?: boolean;

  /** Edge-gradient fade. `true` uses the default width; number = px. */
  mask?: boolean | number;

  /** Arrow buttons on either end of the scrollable axis. Ignored for "both". */
  arrows?: boolean;
  /** Where to put the arrows — outside the scroll area or overlayed inside. Default "outer". */
  arrowPlacement?: ArrowPlacement;
  /** Whether arrows are always visible or only on hover/focus. Default "always". */
  arrowAppearance?: ArrowAppearance;
  /** How far each arrow click scrolls. "page" = 85% of viewport. Default "page". */
  arrowStep?: number | "page";

  /** Convert vertical wheel to horizontal scroll. Auto-enabled for horizontal orientation. */
  wheelToHorizontal?: boolean;

  /** Called when the user scrolls near the end of content. */
  onEndReached?: () => void;
  /** How far from the end (px) to fire `onEndReached`. Default 0. */
  endThreshold?: number;

  /** Infinite auto-play animation (marquee / ticker). Disables drag/arrows/wheel. */
  marquee?: boolean;
  /** Marquee loop duration in seconds. Default 30. */
  marqueeDuration?: number;
  /** Marquee direction. "normal" = inline-start → inline-end. */
  marqueeDirection?: MarqueeDirection;
  /** Pause marquee on hover / focus-within. Default true. */
  marqueePauseOnHover?: boolean;

  /** Force-hide the styled scrollbar even when drag/arrows/marquee aren't on. */
  hideScrollbar?: boolean;

  /** Direction. Falls back to inherited document direction. */
  dir?: "ltr" | "rtl";

  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}
```

Source: `packages/react-scroll-area/src/ScrollArea.tsx`

```tsx
export function ScrollArea({
  children,
  className,
  style,
  orientation = "vertical",
  size = "md",
  drag = false,
  mask = false,
  arrows = false,
  arrowPlacement = "outer",
  arrowAppearance = "always",
  arrowStep = "page",
  wheelToHorizontal,
  onEndReached,
  endThreshold = 0,
  marquee = false,
  marqueeDuration,
  marqueeDirection,
  marqueePauseOnHover = true,
  hideScrollbar,
  type = "smart",
  scrollHideDelay = 900,
  viewportRef: externalViewportRef,
  viewportProps,
  dir,
  ref,
  ...rootProps
}: ScrollAreaProps);
```

Source: `packages/react-scroll-area/src/ScrollArea.tsx`

```tsx
export interface ScrollBarProps
  extends ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}
```

Source: `packages/react-scroll-area/src/ScrollArea.tsx`

```tsx
export function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}: ScrollBarProps);
```

Source: `packages/react-scroll-area/src/ScrollAreaArrow.tsx`

```tsx
export interface ScrollAreaArrowProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Logical side the arrow scrolls toward. "start" = inline-start / block-start,
   * "end" = inline-end / block-end. RTL is handled via CSS (chevron flips).
   */
  side: "start" | "end";
  orientation: "vertical" | "horizontal";
}
```

Source: `packages/react-scroll-area/src/ScrollAreaArrow.tsx`

```tsx
export function ScrollAreaArrow({
  side,
  orientation,
  className,
  ...rest
}: ScrollAreaArrowProps);
```

## Source files

- `packages/react-scroll-area/src/hooks/use-drag-scroll.ts`
- `packages/react-scroll-area/src/hooks/use-edge-state.ts`
- `packages/react-scroll-area/src/hooks/use-infinite-scroll.ts`
- `packages/react-scroll-area/src/hooks/use-wheel-horizontal.ts`
- `packages/react-scroll-area/src/index.ts`
- `packages/react-scroll-area/src/ScrollArea.css`
- `packages/react-scroll-area/src/ScrollArea.tokens.css`
- `packages/react-scroll-area/src/ScrollArea.tsx`
- `packages/react-scroll-area/src/ScrollAreaArrow.tsx`
- `packages/react-scroll-area/package.json`
