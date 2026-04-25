import { cn } from "@virtari-packages/utils";
import { useRef, type Ref, type ReactNode, type ComponentPropsWithoutRef } from "react";
import {
  Button,
  type ButtonColor,
  type ButtonVariant,
  type ButtonSize,
} from "@virtari-packages/react-button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronDown,
} from "@virtari-packages/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps, SwiperRef } from "swiper/react";
import type {
  Swiper as SwiperInstance,
  SwiperOptions,
  AutoplayOptions,
  PaginationOptions,
} from "swiper/types";
import {
  A11y,
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  FreeMode,
  Grid,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from "swiper/modules";

/** Intent palette — drives nav/pagination chrome only. */
export type CarouselColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral";

/** Visual treatment for navigation buttons. */
export type CarouselVariant = "default" | "inside" | "outside" | "minimal" | "solid";

/** Size preset — scales nav buttons, bullets, gaps. */
export type CarouselSize = "xs" | "sm" | "md" | "lg";

/** Nav button corner shape. `pill` (default) for round, `square` for tag-like. */
export type CarouselShape = "pill" | "square";

/** Pagination cosmetic style — bars makes bullets longer. */
export type CarouselPaginationLook = "bullets" | "bars";

/** Where the pagination sits relative to the track. */
export type CarouselPaginationPosition = "bottom" | "top" | "outside";

/** Built-in transition effects (3D effects also require their CSS). */
export type CarouselEffect =
  | "slide"
  | "fade"
  | "cube"
  | "coverflow"
  | "flip"
  | "creative"
  | "cards";

const EFFECT_MODULES: Record<CarouselEffect, unknown> = {
  slide: null,
  fade: EffectFade,
  cube: EffectCube,
  coverflow: EffectCoverflow,
  flip: EffectFlip,
  creative: EffectCreative,
  cards: EffectCards,
};

/* -------------------------------------------------------------------------- */
/*  CarouselColor → ButtonColor (Button uses `contrast` instead of `neutral`).*/
/* -------------------------------------------------------------------------- */
const COLOR_TO_BUTTON: Record<CarouselColor, ButtonColor> = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  accent: "accent",
  neutral: "contrast",
};

/* CarouselVariant → ButtonVariant. */
const VARIANT_TO_BUTTON: Record<CarouselVariant, ButtonVariant> = {
  default: "outline",
  inside: "solid",
  outside: "outline",
  minimal: "ghost",
  solid: "solid",
};

/* CarouselSize → ButtonSize. */
const SIZE_TO_BUTTON: Record<CarouselSize, ButtonSize> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

/* -------------------------------------------------------------------------- */
/*  Props                                                                     */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function resolveModules(
  props: Pick<
    CarouselProps,
    | "navigation"
    | "pagination"
    | "autoplay"
    | "scrollbar"
    | "keyboard"
    | "mousewheel"
    | "freeMode"
    | "zoom"
    | "parallax"
    | "thumbs"
    | "grid"
    | "virtual"
    | "effect"
  >,
): SwiperOptions["modules"] {
  const list: unknown[] = [A11y];
  if (props.navigation) list.push(Navigation);
  if (props.pagination) list.push(Pagination);
  if (props.autoplay) list.push(Autoplay);
  if (props.scrollbar) list.push(Scrollbar);
  if (props.keyboard !== false) list.push(Keyboard);
  if (props.mousewheel) list.push(Mousewheel);
  if (props.freeMode) list.push(FreeMode);
  if (props.zoom) list.push(Zoom);
  if (props.parallax) list.push(Parallax);
  if (props.thumbs) list.push(Thumbs);
  if (props.grid) list.push(Grid);
  if (props.virtual) list.push(Virtual);

  if (props.effect && props.effect !== "slide") {
    const mod = EFFECT_MODULES[props.effect];
    if (mod) list.push(mod);
  }
  return list as SwiperOptions["modules"];
}

function resolvePagination(
  pagination: CarouselProps["pagination"],
): SwiperProps["pagination"] | undefined {
  if (!pagination) return undefined;
  const base: PaginationOptions = {
    clickable: true,
    type: "bullets",
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
  };
  return typeof pagination === "object" ? { ...base, ...pagination } : base;
}

function resolveA11y(a11y: CarouselProps["a11y"], prevLabel: string, nextLabel: string) {
  if (a11y === false) return false;
  const defaults = {
    prevSlideMessage: prevLabel,
    nextSlideMessage: nextLabel,
    paginationBulletMessage: "Go to slide {{index}}",
    firstSlideMessage: "This is the first slide",
    lastSlideMessage: "This is the last slide",
  };
  return typeof a11y === "object" ? { ...defaults, ...a11y } : defaults;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

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
}: CarouselProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const modules = resolveModules({
    navigation,
    pagination,
    autoplay,
    scrollbar,
    keyboard,
    mousewheel,
    freeMode,
    zoom,
    parallax,
    thumbs,
    grid,
    virtual,
    effect,
  });

  const buttonColor = COLOR_TO_BUTTON[color];
  const buttonVariant = VARIANT_TO_BUTTON[variant];
  const buttonSize = SIZE_TO_BUTTON[size];

  const isVertical = orientation === "vertical";
  const PrevIcon = isVertical ? IconChevronUp : IconChevronLeft;
  const NextIcon = isVertical ? IconChevronDown : IconChevronRight;
  const iconStrokeProps = { stroke: 1.75, "aria-hidden": true } as const;

  return (
    <div
      className={cn("vds-carousel", className)}
      data-color={color}
      data-variant={variant}
      data-size={size}
      data-shape={shape !== "pill" ? shape : undefined}
      data-pagination={paginationLook !== "bullets" ? paginationLook : undefined}
      data-pagination-position={paginationPosition !== "bottom" ? paginationPosition : undefined}
      data-orientation={isVertical ? "vertical" : undefined}
      dir={rtl ? "rtl" : undefined}
    >
      {topSlot}

      <div className="vds-carousel-track">
        <Swiper
          ref={ref}
          modules={modules}
          direction={isVertical ? "vertical" : "horizontal"}
          dir={rtl ? "rtl" : undefined}
          navigation={
            navigation
              ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                  disabledClass: "vds-carousel-nav--disabled",
                  hiddenClass: "vds-carousel-nav--hidden",
                  lockClass: "vds-carousel-nav--locked",
                }
              : undefined
          }
          onBeforeInit={(swiper) => {
            if (navigation && typeof swiper.params.navigation === "object" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          pagination={resolvePagination(pagination)}
          autoplay={autoplay as SwiperProps["autoplay"]}
          scrollbar={scrollbar as SwiperProps["scrollbar"]}
          keyboard={keyboard as SwiperProps["keyboard"]}
          mousewheel={mousewheel as SwiperProps["mousewheel"]}
          a11y={resolveA11y(a11y, prevLabel, nextLabel) as SwiperProps["a11y"]}
          freeMode={freeMode as SwiperProps["freeMode"]}
          zoom={zoom as SwiperProps["zoom"]}
          parallax={parallax}
          thumbs={thumbs}
          grid={grid}
          virtual={virtual as SwiperProps["virtual"]}
          effect={effect === "slide" ? undefined : effect}
          {...swiperProps}
        >
          {children}
        </Swiper>

        {navigation && (
          <>
            <Button
              ref={prevRef}
              type="button"
              color={buttonColor}
              variant={buttonVariant}
              size={buttonSize}
              aria-label={prevLabel}
              className="vds-carousel-nav vds-carousel-nav--prev"
              data-position="prev"
            >
              {prevIcon ?? <PrevIcon size={iconSizeFor(size)} {...iconStrokeProps} />}
            </Button>
            <Button
              ref={nextRef}
              type="button"
              color={buttonColor}
              variant={buttonVariant}
              size={buttonSize}
              aria-label={nextLabel}
              className="vds-carousel-nav vds-carousel-nav--next"
              data-position="next"
            >
              {nextIcon ?? <NextIcon size={iconSizeFor(size)} {...iconStrokeProps} />}
            </Button>
          </>
        )}
      </div>

      {bottomSlot}
    </div>
  );
}

/** Map carousel size → numeric pixel size for the Tabler icon. */
function iconSizeFor(size: CarouselSize): number {
  switch (size) {
    case "xs": return 14;
    case "sm": return 16;
    case "lg": return 22;
    case "md":
    default: return 18;
  }
}

/* -------------------------------------------------------------------------- */
/*  Sub-components & re-exports                                               */
/* -------------------------------------------------------------------------- */

/**
 * Slide — re-export of Swiper's slide. Use exactly like `<SwiperSlide>`.
 */
export const CarouselSlide = SwiperSlide;
export type CarouselSlideProps = ComponentPropsWithoutRef<typeof SwiperSlide>;

/**
 * Re-export the Swiper instance ref type so consumers can type
 * imperative refs without depending on `swiper` directly.
 */
export type { SwiperRef as CarouselRef };

/**
 * Re-export the Swiper *instance* type — the class you get from
 * `onSwiper={swiper => ...}` or via `ref.current.swiper`. Useful for
 * coordinating two carousels (e.g. thumbs galleries).
 */
export type { SwiperInstance as CarouselInstance };
