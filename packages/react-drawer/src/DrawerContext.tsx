import { createContext, useContext } from "react";
import type { Direction } from "./utils";

export interface DrawerContextValue {
  direction: Direction;
  open: boolean;
  dragging: boolean;
  snapIndex: number;
  mounted: boolean;
  scaleBackground: boolean;
  preventAutoFocus: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  onOpenChange: (open: boolean) => void;
  setDragging: (v: boolean) => void;
}

const DrawerCtx = createContext<DrawerContextValue | null>(null);

export const DrawerProvider = DrawerCtx.Provider;

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerCtx);
  if (!ctx) {
    throw new Error("Drawer compound components must be used within <Drawer>");
  }
  return ctx;
}
