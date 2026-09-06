import { useCallback, type Ref, type RefCallback } from "react";

/** Compose object/callback refs, including the cleanup contract in React 19. */
export function useComposedRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return useCallback((node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(node);
      if (ref) (ref as { current: T | null }).current = node;
    });
    if (cleanups.some((cleanup) => typeof cleanup === "function")) {
      return () => {
        cleanups.forEach((cleanup, index) => {
          const ref = refs[index];
          if (typeof cleanup === "function") cleanup();
          else if (typeof ref === "function") ref(null);
          else if (ref) (ref as { current: T | null }).current = null;
        });
      };
    }
  }, refs);
}
