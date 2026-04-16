import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
  type ForwardedRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@virtari/utils";
import { DrawerProvider, useDrawerContext } from "./DrawerContext";
import { useDrawerGesture } from "./useDrawerGesture";
import {
  clamp,
  getBackgroundStyles,
  getElementSize,
  getTranslateValue,
  getViewportSize,
  resolveSnapPoints,
  type ResolvedSnapPoint,
  type Direction,
  type DrawerSizeMode,
  type DrawerSnapPoint,
} from "./utils";

const TRANSITION_MS = 280;
const EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";
const VIEWPORT_SIZE_RATIO = 0.96;

function composeEventHandlers<E>(
  userHandler: ((event: E) => void) | undefined,
  internalHandler: (event: E) => void,
) {
  return (event: E) => {
    userHandler?.(event);

    const defaultPrevented = typeof event === "object" &&
      event !== null &&
      "defaultPrevented" in event &&
      Boolean((event as { defaultPrevented?: boolean }).defaultPrevented);

    if (!defaultPrevented) {
      internalHandler(event);
    }
  };
}

function mergeRefs<T>(
  ...refs: Array<ForwardedRef<T> | undefined>
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }

      if (typeof ref === "function") {
        ref(node);
        continue;
      }

      (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

function getWrapperElement(): HTMLElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  return document.querySelector("[data-vds-drawer-wrapper]");
}

function setTransition(element: HTMLElement | null, transition: string) {
  if (element) {
    element.style.transition = transition;
  }
}

function normalizeSnapPoints(
  snapPoints: readonly DrawerSnapPoint[] | undefined,
  minimizedSize: DrawerSnapPoint | undefined,
): DrawerSnapPoint[] {
  const basePoints = snapPoints?.length ? [...snapPoints] : [1];
  const next = minimizedSize !== undefined ? [minimizedSize, ...basePoints] : basePoints;
  return [...new Set(next)];
}

export interface DrawerProps {
  children: ReactNode;
  direction?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sizeMode?: DrawerSizeMode;
  snapPoints?: readonly DrawerSnapPoint[];
  minimizedSize?: DrawerSnapPoint;
  activeSnapPoint?: DrawerSnapPoint;
  defaultSnapPoint?: DrawerSnapPoint;
  onActiveSnapPointChange?: (value: DrawerSnapPoint) => void;
  closeThreshold?: number;
  velocityThreshold?: number;
  dragHandleOnly?: boolean;
  scaleBackground?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  preventAutoFocus?: boolean;
}

export function Drawer({
  children,
  direction = "bottom",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  sizeMode = "adaptive",
  snapPoints,
  minimizedSize,
  activeSnapPoint: controlledActiveSnapPoint,
  defaultSnapPoint,
  onActiveSnapPointChange,
  closeThreshold = 0.5,
  velocityThreshold = 0.45,
  dragHandleOnly = false,
  scaleBackground = false,
  modal = true,
  dismissible = true,
  preventAutoFocus = true,
}: DrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number>(0);

  const resolvedSnapPoints = useMemo(
    () => normalizeSnapPoints(snapPoints, minimizedSize),
    [minimizedSize, snapPoints],
  );
  const resolvedDefaultSnapPoint = defaultSnapPoint ?? snapPoints?.[snapPoints.length - 1] ?? 1;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalSnapPoint, setInternalSnapPoint] = useState(resolvedDefaultSnapPoint);
  const [present, setPresent] = useState(controlledOpen ?? defaultOpen);
  const [dragging, setDragging] = useState(false);

  const isOpenControlled = controlledOpen !== undefined;
  const isSnapControlled = controlledActiveSnapPoint !== undefined;
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const activeSnapPoint = isSnapControlled
    ? controlledActiveSnapPoint ?? resolvedDefaultSnapPoint
    : internalSnapPoint;

  useEffect(() => {
    window.clearTimeout(closeTimerRef.current);

    if (open) {
      setPresent(true);
      return;
    }

    if (!present) {
      if (!isSnapControlled) {
        setInternalSnapPoint(resolvedDefaultSnapPoint);
      }
      return;
    }

    closeTimerRef.current = window.setTimeout(() => {
      setPresent(false);
      setDragging(false);

      if (!isSnapControlled) {
        setInternalSnapPoint(resolvedDefaultSnapPoint);
      }
    }, TRANSITION_MS);

    return () => {
      window.clearTimeout(closeTimerRef.current);
    };
  }, [isSnapControlled, open, present, resolvedDefaultSnapPoint]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!dismissible && !nextOpen) {
      return;
    }

    if (nextOpen) {
      setPresent(true);
    }

    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }

    controlledOnOpenChange?.(nextOpen);
  }, [controlledOnOpenChange, dismissible, isOpenControlled]);

  const handleSnapPointChange = useCallback((nextValue: DrawerSnapPoint) => {
    if (!isSnapControlled) {
      setInternalSnapPoint(nextValue);
    }

    onActiveSnapPointChange?.(nextValue);
  }, [isSnapControlled, onActiveSnapPointChange]);

  return (
    <DrawerProvider
      value={{
        direction,
        open,
        present,
        dragging,
        dismissible,
        dragHandleOnly,
        scaleBackground,
        preventAutoFocus,
        sizeMode,
        snapPoints: resolvedSnapPoints,
        activeSnapPoint,
        closeThreshold,
        velocityThreshold,
        contentRef,
        overlayRef,
        bodyRef,
        handleRef,
        onOpenChange: handleOpenChange,
        onSnapPointChange: handleSnapPointChange,
        setDragging,
      }}
    >
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange} modal={modal}>
        {children}
      </DialogPrimitive.Root>
    </DrawerProvider>
  );
}

export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export interface DrawerOverlayProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export const DrawerOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  DrawerOverlayProps
>(function DrawerOverlay({ className, ...props }, forwardedRef) {
  const { overlayRef, open } = useDrawerContext();

  return (
    <DialogPrimitive.Overlay
      ref={mergeRefs(overlayRef, forwardedRef)}
      className={cn("vds-drawer-overlay", className)}
      data-open={open || undefined}
      {...props}
    />
  );
});

interface DrawerLayout {
  availableSize: number;
  drawerSize: number;
  snapEntries: ResolvedSnapPoint[];
}

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

export const DrawerContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent(
  {
    className,
    children,
    onOpenAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture,
    ...props
  },
  forwardedRef,
) {
  const {
    direction,
    open,
    present,
    contentRef,
    overlayRef,
    bodyRef,
    handleRef,
    dragging,
    dismissible,
    dragHandleOnly,
    setDragging,
    onOpenChange,
    onSnapPointChange,
    scaleBackground,
    preventAutoFocus,
    sizeMode,
    snapPoints,
    activeSnapPoint,
    closeThreshold,
    velocityThreshold,
  } = useDrawerContext();

  const [layout, setLayout] = useState<DrawerLayout>({
    availableSize: 0,
    drawerSize: 0,
    snapEntries: [],
  });
  const currentProgressRef = useRef(0);
  const openAnimationRef = useRef<number>(0);
  const resizeFrameRef = useRef<number>(0);
  const hasOpenedRef = useRef(false);

  const activeSnapIndex = useMemo(() => {
    const index = layout.snapEntries.findIndex((entry) => entry.value === activeSnapPoint);

    return index === -1 ? Math.max(layout.snapEntries.length - 1, 0) : index;
  }, [activeSnapPoint, layout.snapEntries]);

  const setAnimated = useCallback((enabled: boolean) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperElement();
    const motion = enabled ? `transform ${TRANSITION_MS}ms ${EASE_CSS}` : "none";
    const overlayMotion = enabled ? `opacity ${TRANSITION_MS}ms ${EASE_CSS}` : "none";
    const wrapperMotion = enabled
      ? `transform ${TRANSITION_MS}ms ${EASE_CSS}, border-radius ${TRANSITION_MS}ms ${EASE_CSS}`
      : "none";

    setTransition(contentEl, motion);
    setTransition(overlayEl, overlayMotion);

    if (scaleBackground) {
      setTransition(wrapperEl, wrapperMotion);
    }
  }, [contentRef, overlayRef, scaleBackground]);

  const applyProgress = useCallback((progress: number) => {
    if (layout.drawerSize <= 0) {
      return;
    }

    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperElement();
    const clampedProgress = clamp(progress, 0, 1);

    if (contentEl) {
      contentEl.style.transform = getTranslateValue(direction, layout.drawerSize, progress);
    }

    if (overlayEl) {
      overlayEl.style.opacity = String(clampedProgress);
    }

    if (scaleBackground && wrapperEl) {
      if (clampedProgress <= 0) {
        wrapperEl.style.transform = "";
        wrapperEl.style.borderRadius = "";
      } else {
        const backgroundStyles = getBackgroundStyles(clampedProgress);
        wrapperEl.style.transform = backgroundStyles.transform;
        wrapperEl.style.borderRadius = backgroundStyles.borderRadius;
      }
    }

    currentProgressRef.current = progress;
  }, [contentRef, direction, layout.drawerSize, overlayRef, scaleBackground]);

  const syncToSnapPoint = useCallback((animated: boolean) => {
    if (layout.drawerSize <= 0) {
      return;
    }

    const targetSize = layout.snapEntries[activeSnapIndex]?.size ?? layout.drawerSize;
    const progress = targetSize / layout.drawerSize;

    setAnimated(animated);
    applyProgress(progress);
  }, [activeSnapIndex, applyProgress, layout.drawerSize, layout.snapEntries, setAnimated]);

  const updateMeasurements = useCallback(() => {
    const contentEl = contentRef.current;

    if (!contentEl) {
      return;
    }

    const availableSize = Math.max(getViewportSize(direction) * VIEWPORT_SIZE_RATIO, 1);
    contentEl.style.setProperty("--vds-drawer-available-size", `${availableSize}px`);

    const drawerSize = getElementSize(contentEl, direction);
    if (drawerSize <= 0) {
      return;
    }

    const snapEntries = resolveSnapPoints(snapPoints, drawerSize);

    setLayout((current) => {
      const next = { availableSize, drawerSize, snapEntries };
      const unchanged = current.availableSize === next.availableSize &&
        current.drawerSize === next.drawerSize &&
        current.snapEntries.length === next.snapEntries.length &&
        current.snapEntries.every((point, index) =>
          point.value === next.snapEntries[index]?.value &&
          point.size === next.snapEntries[index]?.size
        );

      return unchanged ? current : next;
    });
  }, [contentRef, direction, sizeMode, snapPoints]);

  useLayoutEffect(() => {
    if (!present) {
      hasOpenedRef.current = false;
      return;
    }

    updateMeasurements();

    const scheduleMeasurement = () => {
      cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = requestAnimationFrame(updateMeasurements);
    };

    const contentEl = contentRef.current;
    const resizeObserver = new ResizeObserver(scheduleMeasurement);

    if (contentEl) {
      resizeObserver.observe(contentEl);
    }

    if (bodyRef.current && bodyRef.current !== contentEl) {
      resizeObserver.observe(bodyRef.current);
    }

    window.addEventListener("resize", scheduleMeasurement);
    window.visualViewport?.addEventListener("resize", scheduleMeasurement);
    window.visualViewport?.addEventListener("scroll", scheduleMeasurement);

    return () => {
      cancelAnimationFrame(resizeFrameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);
      window.visualViewport?.removeEventListener("resize", scheduleMeasurement);
      window.visualViewport?.removeEventListener("scroll", scheduleMeasurement);
    };
  }, [bodyRef, contentRef, present, updateMeasurements]);

  useLayoutEffect(() => {
    if (!present || layout.drawerSize <= 0) {
      return;
    }

    cancelAnimationFrame(openAnimationRef.current);

    if (!open) {
      hasOpenedRef.current = false;
      setAnimated(true);
      applyProgress(0);
      return;
    }

    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setAnimated(false);
      applyProgress(0);

      openAnimationRef.current = requestAnimationFrame(() => {
        openAnimationRef.current = requestAnimationFrame(() => {
          syncToSnapPoint(true);
        });
      });

      return () => {
        cancelAnimationFrame(openAnimationRef.current);
      };
    }

    if (!dragging) {
      syncToSnapPoint(true);
    }
  }, [applyProgress, dragging, layout.drawerSize, open, present, setAnimated, syncToSnapPoint]);

  useEffect(() => {
    if (present) {
      return;
    }

    const wrapperEl = getWrapperElement();
    if (!wrapperEl) {
      return;
    }

    wrapperEl.style.transition = "";
    wrapperEl.style.transform = "";
    wrapperEl.style.borderRadius = "";
  }, [present]);

  const gesture = useDrawerGesture({
    direction,
    drawerSize: layout.drawerSize,
    snapSizes: layout.snapEntries.map((entry) => entry.size),
    currentSnapIndex: activeSnapIndex,
    getCurrentProgress: () => currentProgressRef.current,
    closeThreshold,
    velocityThreshold,
    dismissible,
    dragHandleOnly,
    onDragStart: () => {
      setDragging(true);
      setAnimated(false);
    },
    onDragProgress: (progress) => {
      applyProgress(progress);
    },
    onDragCancel: () => {
      syncToSnapPoint(true);
    },
    onDragEnd: () => {
      setDragging(false);
      setAnimated(true);
    },
    onSnap: (index) => {
      onSnapPointChange(layout.snapEntries[index]?.value ?? activeSnapPoint);
    },
    onDismiss: () => {
      onOpenChange(false);
    },
    getContentEl: () => contentRef.current,
    getHandleEl: () => handleRef.current,
    getScrollableEl: () => bodyRef.current ?? contentRef.current,
  });

  return (
    <DialogPrimitive.Portal forceMount={present ? true : undefined}>
      <DrawerOverlay forceMount={present ? true : undefined} />
      <DialogPrimitive.Content
        forceMount={present ? true : undefined}
        ref={mergeRefs(contentRef, forwardedRef)}
        className={cn("vds-drawer-content", className)}
        data-direction={direction}
        data-open={open || undefined}
        data-dragging={dragging || undefined}
        data-size-mode={sizeMode}
        onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) => {
          if (preventAutoFocus) {
            event.preventDefault();
          }
        })}
        onEscapeKeyDown={composeEventHandlers(onEscapeKeyDown, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        })}
        onPointerDownOutside={composeEventHandlers(onPointerDownOutside, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        })}
        onInteractOutside={composeEventHandlers(onInteractOutside, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        })}
        onPointerDown={composeEventHandlers(onPointerDown, gesture.onPointerDown)}
        onPointerMove={composeEventHandlers(onPointerMove, gesture.onPointerMove)}
        onPointerUp={composeEventHandlers(onPointerUp, gesture.onPointerUp)}
        onPointerCancel={composeEventHandlers(onPointerCancel, gesture.onPointerCancel)}
        onLostPointerCapture={composeEventHandlers(
          onLostPointerCapture,
          gesture.onLostPointerCapture,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export interface DrawerHandleProps extends ComponentPropsWithoutRef<"div"> {}

export const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(function DrawerHandle(
  { className, ...props },
  forwardedRef,
) {
  const { direction, handleRef } = useDrawerContext();

  return (
    <div
      ref={mergeRefs(handleRef, forwardedRef)}
      className={cn("vds-drawer-handle", className)}
      data-direction={direction}
      aria-hidden="true"
      {...props}
    >
      <div className="vds-drawer-handle-bar" />
    </div>
  );
});

export interface DrawerTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export const DrawerTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  DrawerTitleProps
>(function DrawerTitle({ className, ...props }, forwardedRef) {
  return (
    <DialogPrimitive.Title
      ref={forwardedRef}
      className={cn("vds-drawer-title", className)}
      {...props}
    />
  );
});

export interface DrawerDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export const DrawerDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  DrawerDescriptionProps
>(function DrawerDescription({ className, ...props }, forwardedRef) {
  return (
    <DialogPrimitive.Description
      ref={forwardedRef}
      className={cn("vds-drawer-description", className)}
      {...props}
    />
  );
});

export interface DrawerBodyProps extends ComponentPropsWithoutRef<"div"> {}

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(function DrawerBody(
  { className, ...props },
  forwardedRef,
) {
  const { bodyRef } = useDrawerContext();

  return (
    <div
      ref={mergeRefs(bodyRef, forwardedRef)}
      className={cn("vds-drawer-body", className)}
      data-vds-drawer-scroll-region=""
      {...props}
    />
  );
});

export interface DrawerFooterProps extends ComponentPropsWithoutRef<"div"> {}

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(function DrawerFooter(
  { className, ...props },
  forwardedRef,
) {
  return (
    <div
      ref={forwardedRef}
      className={cn("vds-drawer-footer", className)}
      {...props}
    />
  );
});
