import { createContext, useContext } from "react";

export interface CheckboxGroupContextValue {
  disabled?: boolean;
  error?: boolean;
  name?: string;
  describedBy?: string;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
  return useContext(CheckboxGroupContext);
}
