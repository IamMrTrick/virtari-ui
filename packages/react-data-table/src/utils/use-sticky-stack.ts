import { useEffect } from "react";
import type { MutableRefObject } from "react";

/*
 * Native-sticky stacking engine.
 *
 * Writes per-band `--vds-sticky-top` / `--vds-sticky-bottom` custom properties
 * so each sticky band (toolbar / filter-bar / header / bulk-actions / pagination
 * / footer) pins at `outerOffset + sum(heights of preceding visible bands)`.
 *
 * The bands themselves use `position: sticky` — the browser composites scroll.
 * This hook only needs to publish stacked offsets when content changes.
 *
 * Smart-mode adds a passive scroll listener that flips `data-scrolling-down`
 * on the root. CSS maps that to a `translateY(-100%)` transform on smart
 * bands, without disturbing flow. A footer-safe-zone check forces un-hide
 * when the table's bottom edge approaches the viewport.
 */

const TOP_BAND_SELECTOR = [
  ".vds-data-table-toolbar[data-sticky]",
  ".vds-data-table-filter-bar[data-sticky]",
  ".vds-data-table-sticky-header-rail[data-sticky]",
  ".vds-data-table-header[data-sticky]:not([data-vds-detached-header])",
].join(",");

const BOTTOM_BAND_SELECTOR = [
  ".vds-data-table-footer[data-sticky]",
  ".vds-data-table-bulk-actions[data-sticky]",
  ".vds-data-table-pagination[data-sticky]",
].join(",");

const SMART_THRESHOLD = 4;
const FOOTER_SAFE_ZONE = 24;
type ScrollTarget = HTMLElement | Window;

function isWindow(target: ScrollTarget): target is Window {
  return target === window;
}

function findScrollAncestor(el: HTMLElement): ScrollTarget {
  let parent = el.parentElement;
  while (parent) {
    const style = window.getComputedStyle(parent);
    if (
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay"
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return window;
}

function scrollTopOf(target: ScrollTarget): number {
  return isWindow(target) ? window.scrollY : target.scrollTop;
}

function viewportBoundsOf(target: ScrollTarget): {
  top: number;
  bottom: number;
} {
  if (isWindow(target)) {
    return { top: 0, bottom: window.innerHeight };
  }
  const rect = target.getBoundingClientRect();
  return {
    top: rect.top + target.clientTop,
    bottom: rect.top + target.clientTop + target.clientHeight,
  };
}

function isSmart(el: HTMLElement): boolean {
  return el.getAttribute("data-sticky") === "smart";
}

function isVisible(el: HTMLElement): boolean {
  return el.getClientRects().length > 0;
}

function cssLengthToPx(value: string, el: HTMLElement): number {
  const raw = value.trim();
  if (!raw || raw === "0") return 0;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return 0;
  if (raw.endsWith("rem")) {
    const rootFont = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize,
    );
    return parsed * (Number.isFinite(rootFont) ? rootFont : 16);
  }
  if (raw.endsWith("em")) {
    const font = Number.parseFloat(window.getComputedStyle(el).fontSize);
    return parsed * (Number.isFinite(font) ? font : 16);
  }
  return parsed;
}

function cssVarPx(el: HTMLElement, name: string): number {
  return cssLengthToPx(window.getComputedStyle(el).getPropertyValue(name), el);
}

function effectiveTopOffsetPx(
  el: HTMLElement,
  target: ScrollTarget,
): number {
  const raw = cssVarPx(el, "--vds-sticky-offset-top");
  if (raw <= 0) return 0;
  if (isWindow(target)) return raw;
  return Math.max(0, raw - viewportBoundsOf(target).top);
}

function effectiveBottomOffsetPx(
  el: HTMLElement,
  target: ScrollTarget,
): number {
  const raw = cssVarPx(el, "--vds-sticky-offset-bottom");
  if (raw <= 0) return 0;
  if (isWindow(target)) return raw;
  const viewport = viewportBoundsOf(target);
  const distanceFromViewportBottom = Math.max(0, window.innerHeight - viewport.bottom);
  return Math.max(0, raw - distanceFromViewportBottom);
}

export function useDataTableStickyStack(
  rootRef: MutableRefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    const rootEl = root;

    const scrollTarget = findScrollAncestor(rootEl);
    const scrollNode: EventTarget = isWindow(scrollTarget)
      ? window
      : scrollTarget;

    let topBands: HTMLElement[] = [];
    let bottomBands: HTMLElement[] = [];
    let hasSmart = false;
    let observedBands = new Set<HTMLElement>();

    let publishFrame = 0;
    let scrollFrame = 0;
    let lastScrollTop = scrollTopOf(scrollTarget);
    let lastDirection: "" | "down" = "";

    function schedulePublish() {
      if (publishFrame) return;
      publishFrame = window.requestAnimationFrame(publishStack);
    }

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedulePublish);
    const mutationObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => {
            refreshBands();
            schedulePublish();
          });

    function clearBandVars(el: HTMLElement) {
      el.style.removeProperty("--vds-sticky-top");
      el.style.removeProperty("--vds-sticky-bottom");
      el.style.removeProperty("--vds-sticky-effective-offset-top");
      el.style.removeProperty("--vds-sticky-effective-offset-bottom");
    }

    function refreshBands() {
      topBands = Array.from(
        rootEl.querySelectorAll<HTMLElement>(TOP_BAND_SELECTOR),
      );
      bottomBands = Array.from(
        rootEl.querySelectorAll<HTMLElement>(BOTTOM_BAND_SELECTOR),
      );
      hasSmart = topBands.some(isSmart) || bottomBands.some(isSmart);

      if (!resizeObserver) return;
      const next = new Set<HTMLElement>([...topBands, ...bottomBands]);
      for (const el of observedBands) {
        if (!next.has(el)) {
          resizeObserver.unobserve(el);
          clearBandVars(el);
        }
      }
      for (const el of next) {
        if (!observedBands.has(el)) resizeObserver.observe(el);
      }
      observedBands = next;
    }

    function publishStack() {
      publishFrame = 0;
      if (rootEl.hasAttribute("data-resizing")) {
        return;
      }
      const scrollingDown = rootEl.hasAttribute("data-scrolling-down");
      publishSide(topBands, "top", scrollingDown);
      publishSide([...bottomBands].reverse(), "bottom", scrollingDown);
    }

    function publishSide(
      bands: HTMLElement[],
      axis: "top" | "bottom",
      scrollingDown: boolean,
    ) {
      const varName =
        axis === "top" ? "--vds-sticky-top" : "--vds-sticky-bottom";
      const offsetVarName =
        axis === "top"
          ? "--vds-sticky-effective-offset-top"
          : "--vds-sticky-effective-offset-bottom";
      let stack = 0;
      for (const el of bands) {
        if (!isVisible(el)) {
          clearBandVars(el);
          continue;
        }
        const effectiveOffset =
          axis === "top"
            ? effectiveTopOffsetPx(el, scrollTarget)
            : effectiveBottomOffsetPx(el, scrollTarget);
        if (effectiveOffset > 0) {
          el.style.setProperty(offsetVarName, `${effectiveOffset}px`);
        } else {
          el.style.removeProperty(offsetVarName);
        }
        el.style.setProperty(varName, `${stack}px`);
        const hidden = scrollingDown && isSmart(el);
        if (!hidden) {
          stack += el.getBoundingClientRect().height;
        }
      }
    }

    function onScroll() {
      if (!hasSmart) return;
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(handleScrollFrame);
    }

    function handleScrollFrame() {
      scrollFrame = 0;
      detectDirection();
    }

    function detectDirection() {
      const st = scrollTopOf(scrollTarget);
      const delta = st - lastScrollTop;
      const rootRect = rootEl.getBoundingClientRect();
      const vp = viewportBoundsOf(scrollTarget);

      if (rootRect.top >= vp.top) {
        setDirection("");
        lastScrollTop = st;
        return;
      }
      if (rootRect.bottom <= vp.bottom + FOOTER_SAFE_ZONE) {
        setDirection("");
        lastScrollTop = st;
        return;
      }
      if (Math.abs(delta) < SMART_THRESHOLD) return;
      setDirection(delta > 0 ? "down" : "");
      lastScrollTop = st;
    }

    function setDirection(next: "" | "down") {
      if (next === lastDirection) return;
      lastDirection = next;
      if (next === "down") {
        rootEl.setAttribute("data-scrolling-down", "");
      } else {
        rootEl.removeAttribute("data-scrolling-down");
      }
      schedulePublish();
    }

    resizeObserver?.observe(rootEl);
    refreshBands();
    mutationObserver?.observe(rootEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "data-sticky",
        "data-sticky-axis",
        "data-resizing",
        "class",
      ],
    });

    scrollNode.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedulePublish, { passive: true });
    schedulePublish();
    onScroll();

    return () => {
      scrollNode.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedulePublish);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      if (publishFrame) window.cancelAnimationFrame(publishFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      for (const el of observedBands) clearBandVars(el);
      rootEl.removeAttribute("data-scrolling-down");
    };
  }, [rootRef]);
}
