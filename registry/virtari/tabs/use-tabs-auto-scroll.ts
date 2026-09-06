import { useEffect, type RefObject } from "react";

/** Keeps the active trigger fully visible inside the scrollable list.
 *  On overflow, centers the active trigger via `scrollTo`. Uses instant
 *  scroll on mount (so the list doesn't animate from 0 on first paint) and
 *  smooth scroll afterward, unless the user prefers reduced motion. */
export function useTabsAutoScroll(
  listRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const list = listRef.current;
    if (!list || !enabled) return;

    let isFirst = true;

    const scrollToActive = () => {
      const el = listRef.current;
      if (!el) return;
      const active = el.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]',
      );
      if (!active) return;

      const vertical = el.getAttribute("data-orientation") === "vertical";
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior: ScrollBehavior =
        isFirst || reduceMotion ? "auto" : "smooth";

      if (vertical) {
        if (el.scrollHeight <= el.clientHeight) return;
        const start = active.offsetTop;
        const end = start + active.offsetHeight;
        const viewStart = el.scrollTop;
        const viewEnd = viewStart + el.clientHeight;
        if (start >= viewStart && end <= viewEnd) {
          isFirst = false;
          return;
        }
        const center = start + active.offsetHeight / 2 - el.clientHeight / 2;
        const max = el.scrollHeight - el.clientHeight;
        el.scrollTo({ top: Math.max(0, Math.min(center, max)), behavior });
      } else {
        if (el.scrollWidth <= el.clientWidth) return;
        const itemRect = active.getBoundingClientRect();
        const listRect = el.getBoundingClientRect();
        if (itemRect.left >= listRect.left && itemRect.right <= listRect.right) {
          isFirst = false;
          return;
        }
        // scrollLeft is negative in RTL. Physical viewport deltas work in
        // either direction, unlike clamping every position to positive LTR.
        const center = el.scrollLeft + (itemRect.left + itemRect.right - listRect.left - listRect.right) / 2;
        const max = el.scrollWidth - el.clientWidth;
        const rtl = getComputedStyle(el).direction === "rtl";
        el.scrollTo({ left: rtl ? Math.max(-max, Math.min(center, 0)) : Math.max(0, Math.min(center, max)), behavior });
      }

      isFirst = false;
    };

    let rafId = 0;
    const schedule = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scrollToActive);
    };

    const mo = new MutationObserver(schedule);
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state", "data-orientation", "dir"],
      subtree: true,
    });

    const ro = new ResizeObserver(schedule);
    ro.observe(list);

    schedule();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      ro.disconnect();
    };
  }, [listRef, enabled]);
}
