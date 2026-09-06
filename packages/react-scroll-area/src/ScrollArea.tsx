import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import * as ScrollAreaPrimitive from "@virtari-packages/primitives/scroll-area";
import { cn, useComposedRefs, useDirection } from "@virtari-packages/utils";
import { ScrollAreaArrow } from "./ScrollAreaArrow";
import { useDragScroll } from "./hooks/use-drag-scroll";
import { useEdgeState, type EdgeState } from "./hooks/use-edge-state";
import { useWheelHorizontal } from "./hooks/use-wheel-horizontal";
import { useInfiniteScroll } from "./hooks/use-infinite-scroll";

type Orientation = "vertical" | "horizontal" | "both";
type Size = "sm" | "md" | "lg";
type ArrowPlacement = "outer" | "inner";
type ArrowAppearance = "always" | "hover";
type MarqueeDirection = "normal" | "reverse";

/* ── ScrollArea ───────────────────────────────────────── */
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

/**
 * Virtari ScrollArea — customised scrollbars (via @virtari-packages/primitives/scroll-area)
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
}: ScrollAreaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inheritedDirection = useDirection(rootRef);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mergedViewportRef = useComposedRefs(viewportRef, externalViewportRef);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root || type !== "smart") return;
    let timer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      root.setAttribute("data-scrolling", "true");
      clearTimeout(timer);
      timer = setTimeout(() => root.removeAttribute("data-scrolling"), scrollHideDelay);
    };
    viewport.addEventListener("scroll", reveal, { passive: true });
    return () => {
      clearTimeout(timer);
      root.removeAttribute("data-scrolling");
      viewport.removeEventListener("scroll", reveal);
    };
  }, [type, scrollHideDelay]);

  const [edge, setEdge] = useState<EdgeState>({
    atInlineStart: true,
    atInlineEnd: true,
    atBlockStart: true,
    atBlockEnd: true,
  });

  // Arrows only apply to single-axis orientations — showing arrows with
  // two-axis scrolling is ambiguous. Marquee also overrides arrows.
  const showArrows = arrows && !marquee && orientation !== "both";

  // Auto-enable wheel → horizontal when the user explicitly chose horizontal
  // orientation, unless they've opted out or marquee took over.
  const wheelToH =
    marquee
      ? false
      : (wheelToHorizontal ?? (orientation === "horizontal" ? true : false));

  const dragEnabled = drag && !marquee;
  const dragAxis =
    orientation === "both" ? "both" : orientation === "vertical" ? "y" : "x";

  const maskSizePx = typeof mask === "number" ? `${mask}px` : undefined;

  // Edge state → React state (for arrow disabled) + DOM attrs / CSS vars.
  useEdgeState(viewportRef, rootRef, {
    enabled: !marquee,
    orientation,
    onChange: setEdge,
  });

  useDragScroll(viewportRef, rootRef, {
    enabled: dragEnabled,
    axis: dragAxis,
  });

  useWheelHorizontal(viewportRef, {
    enabled: wheelToH,
  });

  useInfiniteScroll(viewportRef, sentinelRef, {
    enabled: !!onEndReached && !marquee,
    orientation,
    threshold: endThreshold,
    onEndReached,
  });

  const scrollByArrow = useCallback(
    (side: "start" | "end") => {
      const viewport = viewportRef.current;
      const root = rootRef.current;
      if (!viewport || !root) return;
      const rtl = getComputedStyle(root).direction === "rtl";
      const isVertical = orientation === "vertical";
      const pageSize = isVertical
        ? viewport.clientHeight
        : viewport.clientWidth;
      const step =
        arrowStep === "page"
          ? Math.max(pageSize * 0.85, 32)
          : Math.max(arrowStep, 0);
      if (isVertical) {
        viewport.scrollBy({
          top: side === "end" ? step : -step,
          behavior: "smooth",
        });
      } else {
        // Horizontal: in LTR, "end" = +scrollLeft. In RTL (negative-scroll
        // model used by modern browsers), "end" = -scrollLeft.
        const baseSign = side === "end" ? 1 : -1;
        const sign = rtl ? -baseSign : baseSign;
        viewport.scrollBy({ left: sign * step, behavior: "smooth" });
      }
    },
    [arrowStep, orientation],
  );

  // Per-instance overrides — only set when the user passed a value so we
  // don't stomp on external stylesheet customisation.
  const rootStyle = useMemo<CSSProperties | undefined>(() => {
    const overrides: Record<string, string> = {};
    if (maskSizePx) overrides["--scroll-area-mask-size"] = maskSizePx;
    if (typeof marqueeDuration === "number") {
      overrides["--scroll-area-marquee-duration"] = `${marqueeDuration}s`;
    }
    if (marqueeDirection) {
      overrides["--scroll-area-marquee-direction"] = marqueeDirection;
    }
    if (Object.keys(overrides).length === 0) return style;
    return { ...style, ...(overrides as CSSProperties) };
  }, [style, maskSizePx, marqueeDuration, marqueeDirection]);

  return (
    <div
      ref={rootRef}
      className={cn("vds-scroll-area-root", className)}
      style={rootStyle}
      dir={dir}
      data-orientation={orientation}
      data-size={size}
      data-scrollbar-type={type}
      data-drag={dragEnabled ? "true" : undefined}
      data-mask={mask ? "true" : undefined}
      data-arrows={showArrows ? "true" : undefined}
      data-arrow-placement={showArrows ? arrowPlacement : undefined}
      data-arrow-appearance={showArrows ? arrowAppearance : undefined}
      data-marquee={marquee ? "true" : undefined}
      data-marquee-pause-on-hover={
        marquee && marqueePauseOnHover ? "true" : undefined
      }
      data-hide-scrollbar={hideScrollbar ? "true" : undefined}
    >
      {showArrows && (
        <ScrollAreaArrow
          side="start"
          orientation={orientation as "vertical" | "horizontal"}
          disabled={
            orientation === "vertical" ? edge.atBlockStart : edge.atInlineStart
          }
          onClick={() => scrollByArrow("start")}
        />
      )}

      <ScrollAreaPrimitive.Root
        ref={ref}
        type={type === "smart" ? "auto" : type}
        scrollHideDelay={scrollHideDelay}
        dir={dir ?? inheritedDirection}
        className="vds-scroll-area"
        {...rootProps}
      >
        <ScrollAreaPrimitive.Viewport
          {...viewportProps}
          ref={mergedViewportRef}
          tabIndex={viewportProps?.tabIndex ?? (marquee ? -1 : 0)}
          className={cn("vds-scroll-area-viewport", viewportProps?.className)}
        >
          {marquee ? (
            <div className="vds-scroll-area-marquee">
              {renderMarqueeItems(children)}
            </div>
          ) : (
            <>
              {children}
              {onEndReached && (
                <div
                  ref={sentinelRef}
                  className="vds-scroll-area-sentinel"
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </ScrollAreaPrimitive.Viewport>

        {(orientation === "vertical" || orientation === "both") && (
          <ScrollBar orientation="vertical" />
        )}
        {(orientation === "horizontal" || orientation === "both") && (
          <ScrollBar orientation="horizontal" />
        )}
        <ScrollAreaPrimitive.Corner className="vds-scroll-area-corner" />
      </ScrollAreaPrimitive.Root>

      {showArrows && (
        <ScrollAreaArrow
          side="end"
          orientation={orientation as "vertical" | "horizontal"}
          disabled={
            orientation === "vertical" ? edge.atBlockEnd : edge.atInlineEnd
          }
          onClick={() => scrollByArrow("end")}
        />
      )}
    </div>
  );
}

/**
 * Flatten children via React.Children, wrap each in a flex item, render the
 * sequence twice (second copy aria-hidden so assistive tech only sees one).
 * The marquee's own flex gap then sits between items uniformly — including
 * between the last item of copy 1 and the first of copy 2 — which avoids the
 * "double-padding" seam you'd see if the whole children tree were duplicated
 * with its own padding/margin.
 */
function renderMarqueeItems(children: ReactNode) {
  const items = Children.toArray(children);
  return [0, 1].flatMap((copy) =>
    items.map((child, i) => (
      <div
        key={`${copy}-${i}`}
        className="vds-scroll-area-marquee-item"
        aria-hidden={copy === 1 ? "true" : undefined}
      >
        {child}
      </div>
    )),
  );
}

/* ── ScrollBar ───────────────────────────────────────── */
export interface ScrollBarProps
  extends ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}

/**
 * Retained export for back-compat / advanced composition. Most consumers
 * should use <ScrollArea /> and let it render the right scrollbars.
 */
export function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn("vds-scrollbar", className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="vds-scrollbar-thumb" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}
