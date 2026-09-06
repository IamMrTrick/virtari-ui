import { useEffect, useState } from "react";
import type { MutableRefObject } from "react";

export type HorizontalScrollState = "start" | "middle" | "end" | "none";

/**
 * Watches horizontal scroll position of an element and returns "start" |
 * "middle" | "end" | "none" (when the content fits without scrolling).
 *
 * Used to conditionally show/hide box-shadows on pinned columns:
 *   - "start"  → right-pinned shows shadow, left-pinned hides
 *   - "middle" → both show shadows
 *   - "end"    → left-pinned shows shadow, right-pinned hides
 *   - "none"   → both hide
 */
export function useHorizontalScrollShadow(
  ref: MutableRefObject<HTMLElement | null>,
): HorizontalScrollState {
  const [state, setState] = useState<HorizontalScrollState>("none");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow <= 1) {
        setState("none");
        return;
      }
      const at = el.scrollLeft;
      if (at <= 1) setState("start");
      else if (at >= overflow - 1) setState("end");
      else setState("middle");
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref]);

  return state;
}
