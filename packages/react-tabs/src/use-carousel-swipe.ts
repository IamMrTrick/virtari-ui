import { useEffect, type RefObject } from "react";

interface UseCarouselSwipeOptions {
  enabled: boolean;
  activeIndex: number;
  slideCount: number;
  threshold: number;
  onCommit: (direction: "next" | "prev") => boolean;
}

/**
 * Drag/swipe a carousel track with pointer (touch + mouse for trackpads /
 * drag-capable desktops). Rubber-bands at the ends, commits past threshold.
 *
 * The track is translated by `translateX(-activeIndex * 100%)` via React
 * state; this hook only applies an *inline* transform during a drag to
 * temporarily override that, then clears it on release so React's transform
 * (with CSS transition) animates to the final position.
 */
export function useCarouselSwipe(
  containerRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  {
    enabled,
    activeIndex,
    slideCount,
    threshold,
    onCommit,
  }: UseCarouselSwipeOptions,
) {
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || !enabled || slideCount <= 1) return;

    let startX = 0;
    let startY = 0;
    let dragging = false;
    let axis: null | "x" | "y" = null;
    let pointerId = -1;

    const containerWidth = () => container.getBoundingClientRect().width;

    const clearDragInstant = () => {
      track.style.transition = "";
      track.style.transform = "";
    };

    const animateBackToBaseline = () => {
      track.style.transition = "transform 220ms cubic-bezier(0, 0, 0.2, 1)";
      track.style.transform = "";
      window.setTimeout(() => {
        track.style.transition = "";
      }, 240);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'button, a, input, textarea, select, [role="tab"], [role="tablist"], [contenteditable="true"]',
        )
      ) {
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      axis = null;
      pointerId = e.pointerId;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") {
          dragging = false;
          return;
        }
        track.style.transition = "none";
        container.setPointerCapture(e.pointerId);
      }

      if (axis === "x") {
        if (e.cancelable) e.preventDefault();
        const w = containerWidth();
        const baseline = -activeIndex * w;

        /* Rubber-band at the edges: drag past the first/last panel meets
           resistance so users feel they've hit a boundary. */
        let effective = dx;
        const atStart = activeIndex === 0 && dx > 0;
        const atEnd = activeIndex === slideCount - 1 && dx < 0;
        if (atStart || atEnd) effective = dx * 0.25;

        track.style.transform = `translateX(${baseline + effective}px)`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) {
        clearDragInstant();
        return;
      }
      if (e.pointerId !== pointerId) return;
      container.releasePointerCapture?.(e.pointerId);
      const dx = e.clientX - startX;
      dragging = false;

      if (axis === "x" && Math.abs(dx) > threshold) {
        const dir = dx < 0 ? "next" : "prev";
        /* Commit path: leave the inline `transform` in place (at the drag
           position) and only restore the default transition. Once React
           re-renders with the new activeIndex, a useEffect in TabsPanels
           clears the inline transform — CSS transform (driven by the
           updated --tabs-panels-tx variable) takes over and the CSS
           transition animates from the drag position to the new baseline
           in one continuous movement. */
        track.style.transition = "";
        axis = null;
        if (onCommit(dir)) return;
        animateBackToBaseline();
        return;
      }

      /* Below threshold → rubber-band back to baseline. Clearing the inline
         transform lets the CSS `translateX(var(--tabs-panels-tx))` reassert
         the current baseline, and a short inline transition animates us
         there before the CSS default transition resumes. */
      animateBackToBaseline();
      axis = null;
    };

    const onPointerCancel = () => {
      dragging = false;
      axis = null;
      clearDragInstant();
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointermove", onPointerMove, { passive: false });
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      clearDragInstant();
    };
  }, [containerRef, trackRef, enabled, activeIndex, slideCount, threshold, onCommit]);
}
