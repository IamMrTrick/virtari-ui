import { useLayoutEffect, type RefObject } from "react";

export function useTabsIndicator(
  listRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (!enabled) {
      list.style.removeProperty("--tabs-indicator-ready");
      list.style.removeProperty("--tabs-indicator-tx");
      list.style.removeProperty("--tabs-indicator-ty");
      list.style.removeProperty("--tabs-indicator-w");
      list.style.removeProperty("--tabs-indicator-h");
      return;
    }

    const measure = () => {
      const el = listRef.current;
      if (!el) return;
      const active = el.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]',
      );
      if (!active) {
        el.style.setProperty("--tabs-indicator-ready", "0");
        return;
      }

      /* offsetLeft/offsetTop are scroll-independent content-coordinate values
         (measured from the offsetParent's inside-border). The list has
         `position: relative`, so it IS the offsetParent. Since ::after is
         anchored at `inset-inline-start: 0` on the padding box, `translate`
         lands it at the trigger's position — whether the list is scrolled or
         not.

         In RTL, `inset-inline-start` resolves to the physical right edge
         while `offsetLeft`/`translateX` are physical-left. To make the
         physical translate land on the active trigger's physical-left edge,
         negate the delta from the right anchor: offsetLeft + offsetWidth -
         clientWidth. */
      const rtl = getComputedStyle(el).direction === "rtl";
      const tx = rtl
        ? active.offsetLeft + active.offsetWidth - el.clientWidth
        : active.offsetLeft;
      el.style.setProperty("--tabs-indicator-tx", `${tx}px`);
      el.style.setProperty("--tabs-indicator-ty", `${active.offsetTop}px`);
      el.style.setProperty("--tabs-indicator-w", `${active.offsetWidth}px`);
      el.style.setProperty("--tabs-indicator-h", `${active.offsetHeight}px`);
      el.style.setProperty("--tabs-indicator-ready", "1");
    };

    let rafId = 0;
    const update = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    const ro = new ResizeObserver(update);
    ro.observe(list);
    const observeTriggers = () => {
      list
        .querySelectorAll<HTMLElement>('[role="tab"]')
        .forEach((t) => ro.observe(t));
    };
    observeTriggers();

    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === "childList")) observeTriggers();
      update();
    });
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state", "data-orientation", "dir"],
      subtree: true,
      childList: true,
    });
    // Direction can change without any dimensions changing. Observe the
    // owning roots too, so a live locale switch repositions the indicator.
    for (let ancestor = list.parentElement; ancestor; ancestor = ancestor.parentElement) {
      mo.observe(ancestor, { attributes: true, attributeFilter: ["dir"] });
    }

    window.addEventListener("resize", update);
    measure();
    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef, enabled]);
}
