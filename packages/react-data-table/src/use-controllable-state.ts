import { useCallback, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Updater<T> = T | ((prev: T) => T);

export interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>] {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue);
  const current = isControlled ? (value as T) : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const set = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      if (!isControlled) setInternal(resolved);
      onChangeRef.current?.(resolved);
    },
    [current, isControlled],
  );

  return [current, set];
}

export function resolveUpdater<T>(updater: Updater<T>, prev: T): T {
  return typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
}
