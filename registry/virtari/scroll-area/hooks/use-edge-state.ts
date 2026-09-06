import { useEffect, type RefObject } from "react";

export interface EdgeState {
  atInlineStart: boolean;
  atInlineEnd: boolean;
  atBlockStart: boolean;
  atBlockEnd: boolean;
}

interface UseEdgeStateOptions {
  enabled: boolean;
  orientation: "vertical" | "horizontal" | "both";
  /** Threshold (px) within which an edge is considered "reached". */
  tolerance?: number;
  /** Fires whenever the edge state changes. Lets React components reflect
   *  disabled state on arrow buttons without re-reading DOM attrs. */
  onChange?: (state: EdgeState) => void;
}

/**
 * Observes a scroll viewport and reflects its edge state on the given root
 * element as logical data attributes:
 *
 *   data-at-start            → scrollLeft at inline-start edge (RTL-aware)
 *   data-at-end              → scrollLeft at inline-end   edge (RTL-aware)
 *   data-at-block-start      → scrollTop  at block-start  edge
 *   data-at-block-end        → scrollTop  at block-end    edge
 *
 * Also drives the mask CSS variables (`--scroll-area-mask-inline-start`,
 * etc.) so the gradient fades only where content continues. A `black` value
 * means "no fade" (we're at that edge); `transparent` means "fade" (more
 * content past this edge).
 *
 * Uses `scroll` + `ResizeObserver` — no rAF polling needed because the
 * browser coalesces scroll events and both properties we need
 * (scrollLeft/Top + clientSize/scrollSize) are read synchronously in the
 * handler on the same frame.
 */
export function useEdgeState(
  viewportRef: RefObject<HTMLElement | null>,
  rootRef: RefObject<HTMLElement | null>,
  { enabled, orientation, tolerance = 1, onChange }: UseEdgeStateOptions,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root || !enabled) return;

    const isRTL = () => getComputedStyle(root).direction === "rtl";
    let prev: EdgeState | null = null;

    const update = () => {
      const {
        scrollLeft,
        scrollTop,
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
      } = viewport;

      // Horizontal (inline) — browsers differ on scrollLeft sign in RTL.
      // Chrome/Safari/FF modern all use negative-or-zero in RTL.
      // Math.abs handles both. A single overflow value smaller than
      // `tolerance` (< 1px) is treated as "no overflow".
      const horizontalOverflow = scrollWidth - clientWidth;
      const atInlineStart =
        horizontalOverflow <= tolerance
          ? true
          : isRTL()
          ? Math.abs(scrollLeft) <= tolerance
          : scrollLeft <= tolerance;
      const atInlineEnd =
        horizontalOverflow <= tolerance
          ? true
          : isRTL()
          ? Math.abs(scrollLeft) >= horizontalOverflow - tolerance
          : scrollLeft >= horizontalOverflow - tolerance;

      const verticalOverflow = scrollHeight - clientHeight;
      const atBlockStart =
        verticalOverflow <= tolerance ? true : scrollTop <= tolerance;
      const atBlockEnd =
        verticalOverflow <= tolerance
          ? true
          : scrollTop >= verticalOverflow - tolerance;

      root.toggleAttribute("data-at-start", atInlineStart);
      root.toggleAttribute("data-at-end", atInlineEnd);
      root.toggleAttribute("data-at-block-start", atBlockStart);
      root.toggleAttribute("data-at-block-end", atBlockEnd);

      // Drive mask CSS variables. `black` = opaque (no fade); `transparent` = fade.
      if (orientation === "horizontal" || orientation === "both") {
        root.style.setProperty(
          "--scroll-area-mask-inline-start",
          atInlineStart ? "black" : "transparent",
        );
        root.style.setProperty(
          "--scroll-area-mask-inline-end",
          atInlineEnd ? "black" : "transparent",
        );
      }
      if (orientation === "vertical" || orientation === "both") {
        root.style.setProperty(
          "--scroll-area-mask-block-start",
          atBlockStart ? "black" : "transparent",
        );
        root.style.setProperty(
          "--scroll-area-mask-block-end",
          atBlockEnd ? "black" : "transparent",
        );
      }

      if (onChange) {
        if (
          !prev ||
          prev.atInlineStart !== atInlineStart ||
          prev.atInlineEnd !== atInlineEnd ||
          prev.atBlockStart !== atBlockStart ||
          prev.atBlockEnd !== atBlockEnd
        ) {
          prev = { atInlineStart, atInlineEnd, atBlockStart, atBlockEnd };
          onChange(prev);
        }
      }
    };

    update();

    viewport.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(viewport);
    // Also observe the content to catch cases where children resize/load.
    const content = viewport.firstElementChild;
    if (content) resizeObserver.observe(content);

    return () => {
      viewport.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [viewportRef, rootRef, enabled, orientation, tolerance, onChange]);
}
