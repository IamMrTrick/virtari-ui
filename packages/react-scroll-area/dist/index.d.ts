import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentPropsWithoutRef, ReactNode, Ref, ComponentRef, ButtonHTMLAttributes } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

type Orientation = "vertical" | "horizontal" | "both";
type Size = "sm" | "md" | "lg";
type ArrowPlacement = "outer" | "inner";
type ArrowAppearance = "always" | "hover";
type MarqueeDirection = "normal" | "reverse";
interface ScrollAreaProps extends Omit<ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>, "children" | "dir"> {
    children?: ReactNode;
    /** Which axis overflows. "both" enables both scrollbars and 2-axis drag. */
    orientation?: Orientation;
    /** Scrollbar thickness ramp — matches Button/Input size vocabulary. */
    size?: Size;
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
/**
 * Virtari ScrollArea — customised scrollbars (via @radix-ui/react-scroll-area)
 * plus a set of ergonomic behaviors that cover modern scroll UX patterns:
 *
 *   drag                 click-and-drag-to-scroll (desktop + touch)
 *   mask                 edge gradient fade that follows scroll position
 *   arrows               prev/next buttons, with inner/outer placement and
 *                        optional hover-only appearance
 *   wheelToHorizontal    vertical wheel becomes horizontal scroll
 *   onEndReached         IntersectionObserver-driven infinite-scroll hook
 *   marquee              CSS-animated auto-play loop for tickers/logos
 *
 * Everything is opt-in. The scrollbar auto-hides when drag, arrows, or
 * marquee are on, because those modes replace the scrollbar affordance.
 * All features are RTL-aware.
 */
declare function ScrollArea({ children, className, style, orientation, size, drag, mask, arrows, arrowPlacement, arrowAppearance, arrowStep, wheelToHorizontal, onEndReached, endThreshold, marquee, marqueeDuration, marqueeDirection, marqueePauseOnHover, hideScrollbar, type, scrollHideDelay, dir, ref, ...rootProps }: ScrollAreaProps): react_jsx_runtime.JSX.Element;
interface ScrollBarProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
    ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}
/**
 * Retained export for back-compat / advanced composition. Most consumers
 * should use <ScrollArea /> and let it render the right scrollbars.
 */
declare function ScrollBar({ className, orientation, ref, ...props }: ScrollBarProps): react_jsx_runtime.JSX.Element;

interface ScrollAreaArrowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    /**
     * Logical side the arrow scrolls toward. "start" = inline-start / block-start,
     * "end" = inline-end / block-end. RTL is handled via CSS (chevron flips).
     */
    side: "start" | "end";
    orientation: "vertical" | "horizontal";
}
declare function ScrollAreaArrow({ side, orientation, className, ...rest }: ScrollAreaArrowProps): react_jsx_runtime.JSX.Element;

export { ScrollArea, ScrollAreaArrow, type ScrollAreaArrowProps, type ScrollAreaProps, ScrollBar, type ScrollBarProps };
