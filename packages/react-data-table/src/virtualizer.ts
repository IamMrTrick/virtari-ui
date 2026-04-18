import { useVirtualizer } from "@tanstack/react-virtual";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useCallback } from "react";
import type { MutableRefObject } from "react";

export interface UseDataTableVirtualizerOptions {
  count: number;
  scrollRef: MutableRefObject<HTMLElement | null>;
  estimateSize?: number;
  overscan?: number;
}

export function useDataTableVirtualizer({
  count,
  scrollRef,
  estimateSize = 40,
  overscan = 8,
}: UseDataTableVirtualizerOptions): Virtualizer<HTMLElement, Element> {
  const getScrollElement = useCallback(() => scrollRef.current, [scrollRef]);
  return useVirtualizer<HTMLElement, Element>({
    count,
    getScrollElement,
    estimateSize: () => estimateSize,
    overscan,
    /* The virtualizer measures dynamic row heights automatically via
     * `ref={virt.measureElement}` attached to each rendered row. The
     * default `getBoundingClientRect().height` measurement is correct
     * here — no override needed. */
  });
}
