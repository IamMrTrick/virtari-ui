import { useEffect, type RefObject } from "react";

interface UseTabsSwipeOptions {
  enabled: boolean;
  threshold: number;
  maxOffset: number;
}

export function useTabsSwipe(
  rootRef: RefObject<HTMLDivElement | null>,
  { enabled, threshold, maxOffset }: UseTabsSwipeOptions,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axisLocked: "x" | "y" | null = null;
    let panel: HTMLElement | null = null;

    const isRTL = () => getComputedStyle(root).direction === "rtl";
    const findActivePanel = () =>
      root.querySelector<HTMLElement>(
        '[role="tabpanel"][data-state="active"]',
      );

    const clearPanel = () => {
      if (!panel) return;
      panel.style.transform = "";
      panel.style.transition = "";
      panel.removeAttribute("data-swiping");
      panel = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[role="tablist"]')) return;
      const p = findActivePanel();
      if (!p || !target.closest('[role="tabpanel"]')) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      axisLocked = null;
      panel = p;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking || !panel) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (!axisLocked) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axisLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axisLocked === "y") {
          tracking = false;
          clearPanel();
          return;
        }
        panel.setAttribute("data-swiping", "true");
      }

      if (axisLocked === "x") {
        const clamped = Math.max(-maxOffset, Math.min(maxOffset, dx * 0.6));
        panel.style.transform = `translateX(${clamped}px)`;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking) {
        clearPanel();
        return;
      }
      const dx = e.changedTouches[0].clientX - startX;
      const absDx = Math.abs(dx);

      if (axisLocked === "x" && absDx > threshold) {
        const toNext = isRTL() ? dx > 0 : dx < 0;
        const activated = activateNeighbor(root, toNext ? "next" : "prev");
        // Radix will swap which panel has data-state="active" — clean the
        // old panel so it doesn't hold a stale inline transform.
        clearPanel();
        if (!activated) return;
        return;
      }

      // Below threshold — rubber-band back to 0.
      if (panel) {
        panel.style.transition = "transform 180ms cubic-bezier(0, 0, 0.2, 1)";
        panel.style.transform = "";
        panel.removeAttribute("data-swiping");
        const p = panel;
        panel = null;
        setTimeout(() => {
          p.style.transition = "";
        }, 200);
      }
      tracking = false;
      axisLocked = null;
    };

    const onTouchCancel = () => {
      clearPanel();
      tracking = false;
      axisLocked = null;
    };

    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", onTouchEnd);
    root.addEventListener("touchcancel", onTouchCancel);

    return () => {
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchCancel);
      clearPanel();
    };
  }, [rootRef, enabled, threshold, maxOffset]);
}

function activateNeighbor(
  root: HTMLElement,
  direction: "next" | "prev",
): boolean {
  const triggers = Array.from(
    root.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled]):not([data-disabled])',
    ),
  );
  if (triggers.length === 0) return false;
  const activeIdx = triggers.findIndex(
    (t) => t.getAttribute("data-state") === "active",
  );
  if (activeIdx === -1) return false;
  const nextIdx =
    direction === "next"
      ? Math.min(activeIdx + 1, triggers.length - 1)
      : Math.max(activeIdx - 1, 0);
  if (nextIdx === activeIdx) return false;
  triggers[nextIdx].click();
  triggers[nextIdx].focus({ preventScroll: true });
  return true;
}
