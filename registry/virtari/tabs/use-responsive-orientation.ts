import { useLayoutEffect, useState, type RefObject } from "react";

export type TabsOrientation = "horizontal" | "vertical";

export function useResponsiveOrientation(
  rootRef: RefObject<HTMLDivElement | null>,
  requested: TabsOrientation,
  collapseAt: number | undefined,
): TabsOrientation {
  const [effective, setEffective] = useState<TabsOrientation>(requested);

  useLayoutEffect(() => {
    if (requested !== "vertical" || !collapseAt) {
      setEffective(requested);
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    const compute = () => {
      const w = root.getBoundingClientRect().width;
      setEffective(w < collapseAt ? "horizontal" : "vertical");
    };
    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(root);
    return () => ro.disconnect();
  }, [rootRef, requested, collapseAt]);

  return effective;
}
