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
      list.style.removeProperty("--tabs-indicator-x");
      list.style.removeProperty("--tabs-indicator-y");
      list.style.removeProperty("--tabs-indicator-w");
      list.style.removeProperty("--tabs-indicator-h");
      return;
    }

    const update = () => {
      const active = list.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]',
      );
      if (!active) {
        list.style.setProperty("--tabs-indicator-ready", "0");
        return;
      }
      list.style.setProperty("--tabs-indicator-x", `${active.offsetLeft}px`);
      list.style.setProperty("--tabs-indicator-y", `${active.offsetTop}px`);
      list.style.setProperty("--tabs-indicator-w", `${active.offsetWidth}px`);
      list.style.setProperty("--tabs-indicator-h", `${active.offsetHeight}px`);
      list.style.setProperty("--tabs-indicator-ready", "1");
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
      attributeFilter: ["data-state", "data-orientation"],
      subtree: true,
      childList: true,
    });

    window.addEventListener("resize", update);
    update();

    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef, enabled]);
}
