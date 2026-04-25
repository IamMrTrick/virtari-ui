import { createContext } from "react";
import type { ButtonColor, ButtonVariant, ButtonSize } from "./Button";

export interface ButtonGroupContextValue {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);
