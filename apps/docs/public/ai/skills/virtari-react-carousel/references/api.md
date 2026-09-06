# @virtari-packages/react-carousel API snapshot

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
  "./styles": "./dist/Carousel.css",
  "./tokens": "./dist/Carousel.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Carousel` (export) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselSlide` (export) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselProps` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselSlideProps` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselRef` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselInstance` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselColor` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselVariant` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselSize` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselShape` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselEffect` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselPaginationLook` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.
- `CarouselPaginationPosition` (type) from `@virtari-packages/react-carousel`; source: `packages/react-carousel/src/index.ts`.

## Source type declarations

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselVariant = "default" | "inside" | "outside" | "minimal" | "solid";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselSize = "xs" | "sm" | "md" | "lg";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselShape = "pill" | "square";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselPaginationLook = "bullets" | "bars";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselPaginationPosition = "bottom" | "top" | "outside";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselEffect =
  | "slide"
  | "fade"
  | "cube"
  | "coverflow"
  | "flip"
  | "creative"
  | "cards";
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export interface CarouselProps
  extends Omit<
    SwiperProps,
    | "modules"
    | "navigation"
    | "pagination"
    | "autoplay"
    | "scrollbar"
    | "keyboard"
    | "a11y"
    | "effect"
    | "thumbs"
    | "virtual"
    | "zoom"
    | "freeMode"
    | "mousewheel"
    | "parallax"
    | "grid"
    | "direction"
    | "dir"
  > {
  /** Hue/intent — drives nav & pagination chrome. */
  color?: CarouselColor;
  /** Nav button treatment. */
  variant?: CarouselVariant;
  /** Size preset. */
  size?: CarouselSize;
  /** Nav button corner shape. */
  shape?: CarouselShape;

  /** Show prev/next nav buttons. Set false to hide entirely. */
  navigation?: boolean;
  /** Custom node for the prev button icon (defaults to a chevron). */
  prevIcon?: ReactNode;
  /** Custom node for the next button icon (defaults to a chevron). */
  nextIcon?: ReactNode;
  /** Accessible label for the prev button. */
  prevLabel?: string;
  /** Accessible label for the next button. */
  nextLabel?: string;

  /** Show pagination (or pass Swiper's PaginationOptions). */
  pagination?: boolean | PaginationOptions;
  /** Visual style of bullets. */
  paginationLook?: CarouselPaginationLook;
  /** Where the pagination sits. */
  paginationPosition?: CarouselPaginationPosition;

  /** Enable autoplay (or pass Swiper's AutoplayOptions). */
  autoplay?: boolean | AutoplayOptions;
  /** Show drag scrollbar. */
  scrollbar?: boolean | SwiperProps["scrollbar"];
  /** Keyboard nav (default: true). */
  keyboard?: boolean | SwiperProps["keyboard"];
  /** Mousewheel nav (default: false). */
  mousewheel?: boolean | SwiperProps["mousewheel"];
  /** A11y options (default: true with sensible labels). */
  a11y?: boolean | SwiperProps["a11y"];
  /** Free-mode (no snap). */
  freeMode?: boolean | SwiperProps["freeMode"];
  /** Pinch-to-zoom on slides. */
  zoom?: boolean | SwiperProps["zoom"];
  /** Parallax slides. */
  parallax?: boolean;
  /** Thumbs gallery — pair with another <Carousel> instance. */
  thumbs?: SwiperProps["thumbs"];
  /** Grid (multi-row) layout. */
  grid?: SwiperProps["grid"];
  /** Virtual slides (large datasets). */
  virtual?: boolean | SwiperProps["virtual"];

  /** Transition effect (slide, fade, cube, …). */
  effect?: CarouselEffect;

  /** Orientation — `horizontal` (default) or `vertical`. */
  orientation?: "horizontal" | "vertical";
  /** Force RTL direction. Defaults to inheriting from CSS `dir`. */
  rtl?: boolean;

  /** Optional toolbar / overlay rendered above the track (inside root). */
  topSlot?: ReactNode;
  /** Optional content rendered below the track (after pagination). */
  bottomSlot?: ReactNode;

  /** Forward to the underlying SwiperRef (instance access). */
  ref?: Ref<SwiperRef>;
}
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export function Carousel({
  color = "primary",
  variant = "default",
  size = "md",
  shape = "pill",
  navigation = false,
  prevIcon,
  nextIcon,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  pagination,
  paginationLook = "bullets",
  paginationPosition = "bottom",
  autoplay,
  scrollbar,
  keyboard = true,
  mousewheel,
  a11y = true,
  freeMode,
  zoom,
  parallax,
  thumbs,
  grid,
  virtual,
  effect = "slide",
  orientation = "horizontal",
  rtl,
  topSlot,
  bottomSlot,
  className,
  children,
  ref,
  ...swiperProps
}: CarouselProps);
```

Source: `packages/react-carousel/src/Carousel.tsx`

```tsx
export type CarouselSlideProps = ComponentPropsWithoutRef<typeof SwiperSlide>;
```

## Source files

- `packages/react-carousel/src/Carousel.css`
- `packages/react-carousel/src/Carousel.tokens.css`
- `packages/react-carousel/src/Carousel.tsx`
- `packages/react-carousel/src/index.ts`
- `packages/react-carousel/package.json`
