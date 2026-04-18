/**
 * Isolated virtualization module.
 *
 * Consumers who don't turn on `virtualized` on <Combobox> will never import
 * from this file (the conditional import happens inside ComboboxOptions),
 * so tsup tree-shakes `@tanstack/react-virtual` out of their bundle.
 */

import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";
import type { RefObject } from "react";

export interface UseComboboxVirtualizerOptions {
  count: number;
  scrollRef: RefObject<HTMLElement | null>;
  estimateSize?: number;
  overscan?: number;
}

export function useComboboxVirtualizer({
  count,
  scrollRef,
  estimateSize = 36,
  overscan = 8,
}: UseComboboxVirtualizerOptions): Virtualizer<HTMLElement, Element> {
  return useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });
}
