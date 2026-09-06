import { useRef, type Ref } from "react";
import { useComposedRefs, useDirection } from "@virtari-packages/utils";
import { useDirection as usePrimitiveDirection } from "@virtari-packages/primitives/direction";

/** Read the parent because the headless root writes its own resolved dir. */
export function useRadioDirection(dir: "ltr" | "rtl" | undefined, ref: Ref<HTMLDivElement> | undefined) {
  const parentRef = useRef<Element | null>(null);
  const inheritedDirection = useDirection(parentRef);
  const direction = usePrimitiveDirection(dir, inheritedDirection);
  const composedRef = useComposedRefs(ref, node => { parentRef.current = node?.parentElement ?? null; });
  return { direction, composedRef };
}
