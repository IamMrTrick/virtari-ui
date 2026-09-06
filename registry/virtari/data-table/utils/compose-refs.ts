import type { MutableRefObject, Ref, RefCallback } from "react";

type AnyRef<T> = Ref<T> | undefined;

export function setRef<T>(ref: AnyRef<T>, value: T | null): void {
  if (typeof ref === "function") {
    (ref as RefCallback<T>)(value);
  } else if (ref != null) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}

export function composeRefs<T>(...refs: AnyRef<T>[]): RefCallback<T> {
  return (node) => {
    for (const ref of refs) setRef(ref, node);
  };
}
