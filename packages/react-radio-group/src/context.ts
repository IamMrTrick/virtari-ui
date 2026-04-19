import { createContext, useContext } from "react";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioGroupContextValue {
  disabled?: boolean;
  error?: boolean;
  size?: RadioSize;
  name?: string;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
