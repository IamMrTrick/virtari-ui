import * as react from 'react';
import { ReactNode, Ref, ComponentPropsWithoutRef } from 'react';
import * as swiper_react from 'swiper/react';
import { SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
export { SwiperRef as CarouselRef } from 'swiper/react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { PaginationOptions, AutoplayOptions } from 'swiper/types';
export { Swiper as CarouselInstance } from 'swiper/types';

/** Intent palette — drives nav/pagination chrome only. */
type CarouselColor = "primary" | "success" | "warning" | "danger" | "info" | "accent" | "neutral";
/** Visual treatment for navigation buttons. */
type CarouselVariant = "default" | "inside" | "outside" | "minimal" | "solid";
/** Size preset — scales nav buttons, bullets, gaps. */
type CarouselSize = "xs" | "sm" | "md" | "lg";
/** Nav button corner shape. `pill` (default) for round, `square` for tag-like. */
type CarouselShape = "pill" | "square";
/** Pagination cosmetic style — bars makes bullets longer. */
type CarouselPaginationLook = "bullets" | "bars";
/** Where the pagination sits relative to the track. */
type CarouselPaginationPosition = "bottom" | "top" | "outside";
/** Built-in transition effects (3D effects also require their CSS). */
type CarouselEffect = "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
interface CarouselProps extends Omit<SwiperProps, "modules" | "navigation" | "pagination" | "autoplay" | "scrollbar" | "keyboard" | "a11y" | "effect" | "thumbs" | "virtual" | "zoom" | "freeMode" | "mousewheel" | "parallax" | "grid" | "direction" | "dir"> {
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
declare function Carousel({ color, variant, size, shape, navigation, prevIcon, nextIcon, prevLabel, nextLabel, pagination, paginationLook, paginationPosition, autoplay, scrollbar, keyboard, mousewheel, a11y, freeMode, zoom, parallax, thumbs, grid, virtual, effect, orientation, rtl, topSlot, bottomSlot, className, children, ref, ...swiperProps }: CarouselProps): react_jsx_runtime.JSX.Element;
/**
 * Slide — re-export of Swiper's slide. Use exactly like `<SwiperSlide>`.
 */
declare const CarouselSlide: react.FunctionComponent<swiper_react.SwiperSlideProps>;
type CarouselSlideProps = ComponentPropsWithoutRef<typeof SwiperSlide>;

export { Carousel, type CarouselColor, type CarouselEffect, type CarouselPaginationLook, type CarouselPaginationPosition, type CarouselProps, type CarouselShape, type CarouselSize, CarouselSlide, type CarouselSlideProps, type CarouselVariant };
