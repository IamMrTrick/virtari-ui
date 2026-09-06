import { useEffect, useState, type RefObject } from "react";

export type Direction = "ltr" | "rtl";

function readDirection(el: Element | null): Direction {
  if (typeof document === "undefined") return "ltr";
  /* Closest ancestor with a resolved `dir`. `getComputedStyle().direction`
     reads CSS resolution (covers logical-property cascades and bidi rules),
     whereas the `dir` attribute alone would miss inherited values. */
  const target = el ?? document.documentElement;
  const dir = getComputedStyle(target).direction;
  return dir === "rtl" ? "rtl" : "ltr";
}

/**
 * Read the active text direction from a DOM element (or documentElement if
 * none given) and keep it in sync when ancestor `dir` changes.
 *
 * SSR-safe: returns "ltr" on the first render, then corrects itself in the
 * client-only effect — matching the rendered-on-server HTML.
 */
export function useDirection(ref?: RefObject<Element | null>): Direction {
  const [dir, setDir] = useState<Direction>("ltr");

  useEffect(() => {
    const target = ref?.current ?? document.documentElement;
    setDir(readDirection(target));

    /* Observe `dir` attribute changes on the target and all ancestors, so a
     runtime locale toggle on <html> flips every consuming component. */
    const observers: MutationObserver[] = [];
    let node: Element | null = target;
    while (node) {
      const mo = new MutationObserver(() => {
        setDir(readDirection(ref?.current ?? document.documentElement));
      });
      mo.observe(node, { attributes: true, attributeFilter: ["dir"] });
      observers.push(mo);
      node = node.parentElement;
    }

    return () => {
      for (const mo of observers) mo.disconnect();
    };
  }, [ref]);

  return dir;
}
