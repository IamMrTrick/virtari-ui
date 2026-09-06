import { createContext, useContext, type ReactNode } from "react";
import type { IconColor, IconSize } from "./Icon";

export interface IconDefaults {
  size?: IconSize;
  color?: IconColor;
  stroke?: number | string;
}

export const IconContext = createContext<IconDefaults>({
  size: "md",
  stroke: 1.5,
});

export function useIconDefaults(): IconDefaults {
  return useContext(IconContext);
}

export interface IconProviderProps extends IconDefaults {
  children: ReactNode;
}

export function IconProvider({ children, size, color, stroke }: IconProviderProps) {
  return (
    <IconContext.Provider value={{ size, color, stroke }}>
      {children}
    </IconContext.Provider>
  );
}
