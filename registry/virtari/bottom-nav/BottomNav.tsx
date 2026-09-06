import { cn } from "../../lib/utils";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";
import {
  BottomNavContext,
  type BottomNavContextValue,
  type BottomNavMatchStrategy,
  type BottomNavSize,
  type BottomNavVariant,
} from "./context";
import { useAutoHide } from "./useAutoHide";

export type { BottomNavVariant, BottomNavSize, BottomNavMatchStrategy };

export type BottomNavPosition = "fixed" | "sticky" | "static";

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

/**
 * Mobile bottom-navigation bar. Composes `<BottomNavItem>` children and an
 * optional `<BottomNavFab>`. All styling flows from CSS custom properties
 * declared in `BottomNav.tokens.css`; override any knob at call-site.
 */
export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  function BottomNav(
    {
      as,
      variant = "material",
      size = "md",
      position = "fixed",
      currentPath,
      matchStrategy = "exact",
      safeArea = true,
      autoHide = false,
      animatedIndicator = true,
      elevated = false,
      notch = false,
      hidden: hiddenProp,
      className,
      children,
      style,
      "aria-label": ariaLabel,
      ...rest
    },
    forwardedRef,
  ) {
    const Tag = (as ?? "nav") as ElementType;

    const localRef = useRef<HTMLElement | null>(null);
    const indicatorRef = useRef<HTMLSpanElement | null>(null);
    const activeItemRef = useRef<HTMLElement | null>(null);
    const [indicatorMeasured, setIndicatorMeasured] = useState(false);
    /**
     * Increments whenever the active item changes — used as a React `key`
     * on the material sliding indicator so the pill-open @keyframes
     * restarts from `scaleX(0.15)` on every activation (React remounts
     * the element on key change).
     */
    const [pillKey, setPillKey] = useState(0);

    const setRef = useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef)
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
      },
      [forwardedRef],
    );

    const autoHiddenFromScroll = useAutoHide(autoHide && hiddenProp == null);
    const isHidden = hiddenProp ?? autoHiddenFromScroll;

    const contextValue = useMemo<BottomNavContextValue>(
      () => ({ variant, size, currentPath, matchStrategy }),
      [variant, size, currentPath, matchStrategy],
    );

    const showSlidingIndicator =
      animatedIndicator && (variant === "material" || variant === "underline");

    // Measure the active item and position the sliding indicator.
    useLayoutEffect(() => {
      if (!showSlidingIndicator) {
        setIndicatorMeasured(false);
        return;
      }
      const root = localRef.current;
      const indicator = indicatorRef.current;
      if (!root || !indicator) return;

      const measure = () => {
        const activeItem = root.querySelector<HTMLElement>(
          '.vds-bottom-nav__item[data-active="true"]',
        );
        if (!activeItem) {
          setIndicatorMeasured(false);
          activeItemRef.current = null;
          indicator.style.opacity = "0";
          return;
        }

        // Bump pillKey whenever the active item element identity changes.
        // For the material variant this is the remount trigger that restarts
        // the scaleX-open animation. Underline/floating ignore this key
        // (they keep a stable span and rely on CSS transitions).
        if (activeItem !== activeItemRef.current) {
          activeItemRef.current = activeItem;
          setPillKey((k) => k + 1);
        }

        const rootRect = root.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const iconHost = activeItem.querySelector<HTMLElement>(
          ".vds-bottom-nav__icon",
        );
        const iconRect = iconHost?.getBoundingClientRect();

        // Logical inline-start so RTL flips correctly.
        const isRtl = window.getComputedStyle(root).direction === "rtl";
        const itemStart = isRtl
          ? rootRect.right - itemRect.right
          : itemRect.left - rootRect.left;

        let inlineSize: number;
        let blockSize: number | null = null;
        let blockStart: number | null = null;
        let centeredStart: number;

        if (variant === "material") {
          // Pill hugs the icon. Block-size is bounded to the icon's
          // block extent so the pill's top/bottom never cross into the
          // item's inner padding or the label underneath.
          const iconW = iconRect?.width ?? 24;
          const iconH = iconRect?.height ?? 24;
          inlineSize = iconW + 32;
          blockSize = iconH + 8;

          // Vertically center on the icon — item center would overlap the label.
          if (iconRect) {
            const iconCenterY =
              iconRect.top - rootRect.top + iconRect.height / 2;
            blockStart = iconCenterY - blockSize / 2;
          }
          centeredStart = itemStart + (itemRect.width - inlineSize) / 2;
        } else if (variant === "underline") {
          inlineSize = itemRect.width * 0.48;
          centeredStart = itemStart + (itemRect.width - inlineSize) / 2;
        } else {
          inlineSize = itemRect.width;
          centeredStart = itemStart;
        }

        indicator.style.setProperty(
          "inset-inline-start",
          `${Math.round(centeredStart)}px`,
        );
        indicator.style.setProperty(
          "inline-size",
          `${Math.round(inlineSize)}px`,
        );
        if (blockSize != null) {
          indicator.style.setProperty("block-size", `${Math.round(blockSize)}px`);
        } else {
          indicator.style.removeProperty("block-size");
        }
        if (blockStart != null) {
          indicator.style.setProperty(
            "inset-block-start",
            `${Math.round(blockStart)}px`,
          );
        } else {
          indicator.style.removeProperty("inset-block-start");
        }
        setIndicatorMeasured(true);
      };

      // Measure on mount, on current path change, and on resize.
      measure();

      const ro = new ResizeObserver(() => measure());
      ro.observe(root);

      window.addEventListener("resize", measure);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", measure);
      };
      // `pillKey` is included so that when the material indicator remounts
      // (React replaces the span via a key change), this effect re-runs and
      // re-applies the inline position/size styles to the fresh DOM node.
      // Without it the new span would mount without measurements and nothing
      // would render.
    }, [showSlidingIndicator, currentPath, variant, size, children, pillKey]);

    const mergedStyle: CSSProperties = {
      ...style,
      ...(safeArea
        ? null
        : { ["--bottom-nav-safe-area" as string]: "0px" }),
    };

    return (
      <BottomNavContext.Provider value={contextValue}>
        <Tag
          ref={setRef}
          className={cn("vds-bottom-nav", className)}
          style={mergedStyle}
          data-radius-host=""
          data-variant={variant}
          data-size={size}
          data-position={position}
          data-elevated={elevated || variant === "floating" ? "true" : undefined}
          data-has-fab-notch={notch ? "true" : undefined}
          data-hidden={isHidden ? "true" : undefined}
          data-animated-indicator={showSlidingIndicator ? "true" : undefined}
          aria-label={ariaLabel ?? "Bottom navigation"}
          {...rest}
        >
          {children}
          {showSlidingIndicator && (
            <span
              // Re-key the material pill on each active-item change so
              // React remounts the element and the CSS `@keyframes`
              // pill-open animation fires fresh ("opens from centre").
              // Underline keeps a stable key — it slides via transitions.
              key={variant === "material" ? `pill-${pillKey}` : "slider"}
              ref={indicatorRef}
              className="vds-bottom-nav__sliding-indicator"
              data-measured={indicatorMeasured ? "true" : undefined}
              aria-hidden="true"
            />
          )}
        </Tag>
      </BottomNavContext.Provider>
    );
  },
);
