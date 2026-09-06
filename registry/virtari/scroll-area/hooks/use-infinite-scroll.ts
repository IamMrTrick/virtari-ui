import { useEffect, type RefObject } from "react";

interface UseInfiniteScrollOptions {
  enabled: boolean;
  orientation: "vertical" | "horizontal" | "both";
  /** Distance from the end (px) at which to fire the callback. */
  threshold: number;
  onEndReached: (() => void) | undefined;
}

/**
 * IntersectionObserver-based end-of-viewport detection. Cheaper and
 * smoother than scroll-event polling because the browser batches
 * intersection computations off the main thread. The caller places a
 * sentinel element at the end of the scrollable content; this hook
 * observes that sentinel with `root = viewport` and a negative
 * root-margin that equals the threshold, so the sentinel is considered
 * intersecting *before* it physically enters the viewport.
 *
 * Re-arms only after the sentinel leaves the intersection again, so
 * `onEndReached` fires once per "reach the end" event, not continuously
 * while the user idles at the bottom.
 */
export function useInfiniteScroll(
  viewportRef: RefObject<HTMLElement | null>,
  sentinelRef: RefObject<HTMLElement | null>,
  { enabled, orientation, threshold, onEndReached }: UseInfiniteScrollOptions,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const sentinel = sentinelRef.current;
    if (!viewport || !sentinel || !enabled || !onEndReached) return;

    let armed = true;

    // Build rootMargin that pushes the intersection boundary outward
    // in the direction of scroll travel, so the callback fires `threshold`
    // px before the sentinel is actually visible.
    const m = `${threshold}px`;
    const rootMargin =
      orientation === "horizontal"
        ? `0px ${m} 0px ${m}`
        : orientation === "both"
        ? `${m} ${m} ${m} ${m}`
        : `${m} 0px ${m} 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (armed) {
              armed = false;
              onEndReached();
            }
          } else {
            // Left the intersection — ready to fire again next time we enter.
            armed = true;
          }
        }
      },
      { root: viewport, rootMargin, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [viewportRef, sentinelRef, enabled, orientation, threshold, onEndReached]);
}
