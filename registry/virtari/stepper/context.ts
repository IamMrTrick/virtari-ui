import { createContext, useContext } from "react";

export interface StepperContextValue {
  activeStep: number;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  totalSteps: number;
}

export const StepperContext = createContext<StepperContextValue>({
  activeStep: 0,
  orientation: "horizontal",
  size: "md",
  totalSteps: 0,
});

export function useStepperContext() {
  return useContext(StepperContext);
}
