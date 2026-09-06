import { useEffect, useRef, useState, type RefObject } from "react";

export type StickyMode = "none" | "always" | "smart" | "collapse";

interface Options {
  mode: StickyMode;
  rowRef: RefObject<HTMLElement | null>;
  /** Min scroll delta (px) before `smart` mode flips state. Debounces tiny wobbles. */
  smartThreshold?: number;
  /**
   * For `collapse`: scroll position (in the container's scroll space) past
   * which the row collapses. When omitted, the row's own natural bottom edge
   * is used so the row collapses as it would scroll out of view.
   */
  collapseAt?: number;
}

/** Nearest scrollable ancestor, or `window` when none is found. */
function findScrollAncestor(el: HTMLElement | null): HTMLElement | Window {
  if (typeof window === "undefined") return window as Window;
  let p: HTMLElement | null = el?.parentElement ?? null;
  while (p) {
    const cs = window.getComputedStyle(p);
    if (
      cs.overflowY === "auto" ||
      cs.overflowY === "scroll" ||
      cs.overflowY === "overlay"
    ) {
      return p;
    }
    p = p.parentElement;
  }
  return window;
}

function scrollYOf(container: HTMLElement | Window): number {
  return container === window
    ? window.scrollY
    : (container as HTMLElement).scrollTop;
}

/** Row's bottom edge expressed in the container's own scroll-space (0 = top of container). */
function rowBottomInContainer(
  el: HTMLElement,
  container: HTMLElement | Window
): number {
  const rect = el.getBoundingClientRect();
  if (container === window) {
    return window.scrollY + rect.bottom;
  }
  const cEl = container as HTMLElement;
  const cRect = cEl.getBoundingClientRect();
  return cEl.scrollTop + (rect.bottom - cRect.top);
}

/**
 * Tracks scroll on the row's nearest scrollable ancestor and derives the
 * `hidden` / `collapsed` states for `smart` / `collapse` sticky modes.
 * Modes `"none"` and `"always"` short-circuit — no listeners attached.
 */
export function useStickyBehavior({
  mode,
  rowRef,
  smartThreshold = 4,
  collapseAt,
}: Options) {
  const [smartHidden, setSmartHidden] = useState(false);
  const [collapseState, setCollapseState] = useState(false);
  const hidden = mode === "smart" && smartHidden;
  const collapsed = mode === "collapse" && collapseState;

  // Mirror the state into a ref so the scroll closure can early-out when the
  // row is in a transformed / zero-height state — otherwise re-measuring
  // would capture the *current* (wrong) position, not the natural one.
  const stateRef = useRef({ hidden: false, collapsed: false });
  useEffect(() => {
    stateRef.current = { hidden, collapsed };
  }, [hidden, collapsed]);

  useEffect(() => {
    if (mode === "none" || mode === "always") {
      return;
    }

    const el = rowRef.current;
    if (!el) return;

    const container = findScrollAncestor(el);

    let raf = 0;
    let lastY = scrollYOf(container);
    let rowBottomDoc = rowBottomInContainer(el, container);

    const measure = () => {
      if (!rowRef.current) return;
      if (stateRef.current.hidden || stateRef.current.collapsed) return;
      rowBottomDoc = rowBottomInContainer(rowRef.current, container);
    };

    const tick = () => {
      raf = 0;
      const y = scrollYOf(container);
      const delta = y - lastY;
      lastY = y;

      if (mode === "smart") {
        if (y <= rowBottomDoc) {
          setSmartHidden(false);
        } else if (delta > smartThreshold) {
          setSmartHidden(true);
        } else if (delta < -smartThreshold) {
          setSmartHidden(false);
        }
      } else if (mode === "collapse") {
        const trigger = collapseAt ?? rowBottomDoc;
        setCollapseState(y > trigger);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    measure();
    lastY = scrollYOf(container);
    tick();

    const target: EventTarget =
      container === window ? window : (container as HTMLElement);
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mode, rowRef, smartThreshold, collapseAt]);

  return { hidden, collapsed };
}
