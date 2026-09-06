/**
 * Isolated virtualization module.
 *
 * Combobox imports this helper statically; `virtualized` opts into its rendering
 * behavior, not a lazy-loaded dependency boundary.
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
