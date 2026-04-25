import { useLayoutEffect, type RefObject } from "react";

export function useSegmentedIndicator(
  listRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const el = listRef.current;
      if (!el) return;
      const active = el.querySelector<HTMLElement>('[data-state="checked"]');
      if (!active) {
        el.style.setProperty("--tabs-indicator-ready", "0");
        return;
      }

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
    const observeItems = () => {
      list
        .querySelectorAll<HTMLElement>('[role="radio"]')
        .forEach((t) => ro.observe(t));
    };
    observeItems();

    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === "childList")) observeItems();
      update();
    });
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state", "data-orientation"],
      subtree: true,
      childList: true,
    });

    window.addEventListener("resize", update);
    measure();
    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef]);
}
