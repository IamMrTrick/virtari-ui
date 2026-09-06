import { useCallback, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>] {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? (value as T) : internalValue;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(currentValue) : next;
      if (!isControlled) setInternalValue(resolved);
      onChangeRef.current?.(resolved);
    },
    [currentValue, isControlled],
  );

  return [currentValue, setValue];
}
