import { createContext, useContext } from "react";
import type { Direction, DrawerSizeMode, DrawerSnapPoint } from "./utils";

export interface DrawerContextValue {
  direction: Direction;
  open: boolean;
  present: boolean;
  dragging: boolean;
  dismissible: boolean;
  dragHandleOnly: boolean;
  scaleBackground: boolean;
  preventAutoFocus: boolean;
  sizeMode: DrawerSizeMode;
  snapPoints: readonly DrawerSnapPoint[];
  activeSnapPoint: DrawerSnapPoint;
  closeThreshold: number;
  velocityThreshold: number;
  contentRef: React.RefObject<HTMLDivElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  handleRef: React.RefObject<HTMLDivElement | null>;
  onOpenChange: (open: boolean) => void;
  onSnapPointChange: (value: DrawerSnapPoint) => void;
  setDragging: (value: boolean) => void;
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
