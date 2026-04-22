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
        const start = active.offsetLeft;
        const end = start + active.offsetWidth;
        const viewStart = el.scrollLeft;
        const viewEnd = viewStart + el.clientWidth;
        if (start >= viewStart && end <= viewEnd) {
          isFirst = false;
          return;
        }
        const center = start + active.offsetWidth / 2 - el.clientWidth / 2;
        const max = el.scrollWidth - el.clientWidth;
        el.scrollTo({ left: Math.max(0, Math.min(center, max)), behavior });
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
      attributeFilter: ["data-state", "data-orientation"],
      subtree: true,
    });

    schedule();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, [listRef, enabled]);
}
