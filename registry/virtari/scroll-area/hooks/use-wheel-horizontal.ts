import { useEffect, type RefObject } from "react";

interface UseWheelHorizontalOptions {
  enabled: boolean;
}

/**
 * Converts vertical mouse-wheel deltas into horizontal scroll on the
 * viewport. Honours trackpad two-finger horizontal gestures by checking
 * which delta dominates, and respects Shift (native "scroll sideways")
 * and Ctrl (zoom) so user intent is preserved.
 *
 * Must use `{ passive: false }` so we can call `preventDefault()` and
 * stop the wheel event from scrolling the page vertically.
 */
export function useWheelHorizontal(
  viewportRef: RefObject<HTMLElement | null>,
  { enabled }: UseWheelHorizontalOptions,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enabled) return;

    const onWheel = (e: WheelEvent) => {
      // Ctrl = pinch zoom on trackpads — never intercept.
      if (e.ctrlKey) return;
      // Shift = user's explicit request for horizontal; browsers already
      // translate it. Let native behaviour handle it.
      if (e.shiftKey) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Trackpad horizontal gesture — pass through untouched.
      if (absX > absY) return;
      if (absY === 0) return;

      // Only intercept if there's actually horizontal room to scroll.
      const overflow = viewport.scrollWidth - viewport.clientWidth;
      if (overflow <= 0) return;
      const atStart = viewport.scrollLeft <= 0;
      const atEnd = viewport.scrollLeft >= overflow;
      // If we'd just eat the event without scrolling further in that
      // direction, release it to the page so the outer scroll can take over.
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [viewportRef, enabled]);
}
