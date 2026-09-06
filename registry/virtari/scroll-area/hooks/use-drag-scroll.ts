import { useEffect, type RefObject } from "react";

interface UseDragScrollOptions {
  enabled: boolean;
  axis: "x" | "y" | "both";
  /** Pixels of movement before we commit to a drag and start suppressing clicks. */
  threshold?: number;
}

/**
 * Pointer-drag-to-scroll for a scrollable element. Works with mouse, touch
 * and pen through the unified PointerEvent API. Axis-locks on first motion
 * so vertical page scroll still works inside a horizontal scroll area and
 * vice-versa. Suppresses the trailing click when the pointer moved past
 * `threshold` so children underneath don't accidentally activate.
 *
 * Skips initiation when the event originates from an interactive element
 * (button, a, input, textarea, select, role="button", or [data-no-drag])
 * so users can still click / select / copy.
 */
export function useDragScroll(
  viewportRef: RefObject<HTMLElement | null>,
  rootRef: RefObject<HTMLElement | null>,
  { enabled, axis, threshold = 6 }: UseDragScrollOptions,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root || !enabled) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let startScrollTop = 0;
    let axisLocked: "x" | "y" | null = null;
    let moved = false;
    let suppressClickUntil = 0;

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      // Only skip drag initiation on form-input surfaces where a click-drag
      // is expected to select text or manipulate a value. Buttons / anchors
      // DO allow drag — the trailing click is suppressed if movement
      // exceeds the threshold, so a plain click still works but a real
      // drag still scrolls. Opt-out explicitly via `data-no-drag`.
      return !!target.closest(
        'input, textarea, select, [contenteditable="true"], [data-no-drag]',
      );
    };

    const cleanup = () => {
      pointerId = null;
      axisLocked = null;
      moved = false;
      root.removeAttribute("data-dragging");
    };

    const onPointerDown = (e: PointerEvent) => {
      // Only primary button for mouse; touch/pen always pass.
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (isInteractive(e.target)) return;

      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startScrollLeft = viewport.scrollLeft;
      startScrollTop = viewport.scrollTop;
      axisLocked = axis === "both" ? null : axis;
      moved = false;

      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
        // Some environments can throw if capture is already released; ignore.
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (!axisLocked) {
        if (absDx < threshold && absDy < threshold) return;
        axisLocked = absDx > absDy ? "x" : "y";
      }

      if (!moved && (absDx > threshold || absDy > threshold)) {
        moved = true;
        root.setAttribute("data-dragging", "true");
      }

      if (axisLocked === "x" && (axis === "x" || axis === "both")) {
        viewport.scrollLeft = startScrollLeft - dx;
      } else if (axisLocked === "y" && (axis === "y" || axis === "both")) {
        viewport.scrollTop = startScrollTop - dy;
      }
    };

    const onPointerEnd = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const wasMoved = moved;
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      cleanup();
      if (wasMoved) {
        // Eat the synthetic click that follows a pointerup so children
        // underneath don't activate when the user was dragging. 120ms is
        // larger than the browser's click-after-pointerup delay but small
        // enough not to block a genuine follow-up tap.
        suppressClickUntil = Date.now() + 120;
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (Date.now() < suppressClickUntil) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerEnd);
    viewport.addEventListener("pointercancel", onPointerEnd);
    viewport.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
      viewport.removeEventListener("click", onClickCapture, { capture: true });
      cleanup();
    };
  }, [viewportRef, rootRef, enabled, axis, threshold]);
}
