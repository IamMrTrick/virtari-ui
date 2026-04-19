import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * Enable pointer-drag panning on a scrollable element.
 *
 * Clicking on empty space inside `ref` and dragging horizontally (+ vertically)
 * scrolls the container — the same feel as Google Sheets / Figma canvas.
 *
 * Safety rules:
 *  - Only primary (left) button drags.
 *  - Drag is ignored when the pointer starts on an interactive element:
 *    button, a, input, select, textarea, [role="checkbox"], [role="button"],
 *    or anything with `[data-no-scroll-drag]` / `[contenteditable]`.
 *  - Ignored when the resize handle is the target (so column resize still works).
 *  - A small movement threshold (4px) must be exceeded before a click is
 *    suppressed — a simple click-through still works.
 *  - Cursor becomes `grab` / `grabbing` only while `enabled`.
 */
export function useScrollDrag(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const stateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
    pointerId: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          [
            /* The entire header area owns its own gestures: sort (click),
             * resize (drag edge), reorder (drag body). Scroll-drag would
             * steal those — so never start panning from inside <thead>. */
            "thead",
            "th",
            ".vds-data-table-header",
            ".vds-data-table-header-cell",
            /* Interactive controls inside the body. */
            "button",
            "a",
            "input",
            "select",
            "textarea",
            "[role='button']",
            "[role='checkbox']",
            "[role='switch']",
            "[role='menu']",
            "[role='menuitem']",
            "[role='combobox']",
            "[contenteditable='true']",
            "[contenteditable='']",
            "[data-no-scroll-drag]",
            ".vds-data-table-resize-handle",
            ".vds-data-table-sort-trigger",
            ".vds-data-table-drag-handle",
            ".vds-data-table-actions-cell-trigger",
            ".vds-data-table-link-cell",
          ].join(","),
        ),
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      /* Applies to all pointer types (mouse/touch/pen) — a touch on the
       * resize handle must not start panning either. */
      if (isInteractive(e.target)) return;
      /* If a column resize is already in progress anywhere on the page,
       * don't start a drag either. */
      if (el.ownerDocument.querySelector(".vds-data-table[data-resizing]")) return;
      /* Also skip when the user is text-selecting: a mousedown on a text node
       * without a modifier key still triggers — we allow drag because text
       * selection can start via shift/modified click. */
      stateRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
        pointerId: e.pointerId,
        moved: false,
      };
      el.setAttribute("data-scroll-dragging", "");
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s || !s.active) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      if (!s.moved && Math.hypot(dx, dy) > 4) {
        s.moved = true;
        /* Capture ensures we keep receiving events even if the pointer leaves
         * the element. Only grab once movement exceeds the threshold so plain
         * clicks still reach children. */
        try {
          el.setPointerCapture(s.pointerId);
        } catch {
          /* some browsers throw if already captured */
        }
      }
      if (s.moved) {
        el.scrollLeft = s.scrollLeft - dx;
        el.scrollTop = s.scrollTop - dy;
      }
    };

    const end = () => {
      const s = stateRef.current;
      if (!s) return;
      if (s.active) {
        try {
          el.releasePointerCapture(s.pointerId);
        } catch {
          /* noop */
        }
      }
      stateRef.current = null;
      el.removeAttribute("data-scroll-dragging");
    };

    const onPointerUp = () => end();
    const onPointerCancel = () => end();

    /* Suppress the subsequent click if we actually dragged. */
    const onClickCapture = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s && s.moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [ref, enabled]);
}
