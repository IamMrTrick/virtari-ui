import { createContext, useContext } from "react";

export type DatePickerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type DatePickerAppearance = "soft" | "outline" | "ghost" | "filled";

export interface DatePickerVisualCtx {
  size: DatePickerSize;
  appearance: DatePickerAppearance;
  invalid?: boolean;
}

const Ctx = createContext<DatePickerVisualCtx | null>(null);

export const DatePickerVisualProvider = Ctx.Provider;

export function useVisual(fallback: DatePickerVisualCtx): DatePickerVisualCtx {
  return useContext(Ctx) ?? fallback;
}
