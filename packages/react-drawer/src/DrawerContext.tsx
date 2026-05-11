import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import type {
  Direction,
  DrawerDeclaredSize,
  DrawerHeaderVariant,
  DrawerIndicatorPlacement,
  DrawerOffset,
  DrawerSizeMode,
  DrawerSnapBehavior,
  SnapPoint,
} from "./utils";

export interface DrawerContextValue {
  direction: Direction;
  open: boolean;
  present: boolean;
  dragging: boolean;
  dismissible: boolean;
  dragHandleOnly: boolean;
  scaleBackground: boolean;
  stretch: boolean;
  preventAutoFocus: boolean;
  sizeMode: DrawerSizeMode;
  size?: DrawerDeclaredSize;
  offset?: DrawerOffset;
  indicator: DrawerIndicatorPlacement;
  mountedIndicator: DrawerIndicatorPlacement | null;
  headerVariant: DrawerHeaderVariant;
  snapPoints: readonly SnapPoint[];
  activeSnapPoint: SnapPoint;
  minimizedSize?: SnapPoint;
  snapBehavior: DrawerSnapBehavior;
  closeThreshold: number;
  velocityThreshold: number;
  snapStepThreshold: number;
  snapSkipThreshold: number;
  contentRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  handleRef: RefObject<HTMLDivElement | null>;
  setMountedIndicator: Dispatch<SetStateAction<DrawerIndicatorPlacement | null>>;
  onOpenChange: (open: boolean) => void;
  onSnapPointChange: (value: SnapPoint) => void;
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
