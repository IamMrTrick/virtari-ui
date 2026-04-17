import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ForwardedRef,
  type MutableRefObject,
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@virtari/utils";
import { DrawerProvider, useDrawerContext } from "./DrawerContext";
import { useDrawerDrag } from "./useDrawerDrag";
import {
  clamp,
  debugDrawer,
  findSnapIndexByValue,
  getBackgroundStyles,
  getDefaultAdaptiveSize,
  getElementSize,
  getOverlayProgress,
  getVisualTransform,
  getViewportInfo,
  getViewportSize,
  resolveDeclaredPixels,
  resolveDeclaredSize,
  resolveDirectionalValue,
  resolveSnaps,
  type Direction,
  type DrawerDeclaredSize,
  type DrawerHeaderVariant,
  type DrawerIndicatorPlacement,
  type DrawerMinimizedState,
  type DrawerOffset,
  type DrawerOpenState,
  type DrawerSizeMode,
  type DrawerSnapBehavior,
  type ResolvedSnap,
  type SnapPoint,
} from "./utils";

const DEFAULT_SPRING_MS = 380;
const DEFAULT_SPRING_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const VIEWPORT_RATIO = 0.96;
const DEFAULT_MINIMIZED_STATE_ID = "minimized";

function parseDurationMs(value: string, fallback: number): number {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const n = parseFloat(trimmed);
  if (!Number.isFinite(n)) return fallback;
  if (trimmed.endsWith("ms")) return n;
  if (trimmed.endsWith("s")) return n * 1000;
  return n;
}

function readDrawerTiming(el: HTMLElement | null): { ms: number; ease: string } {
  if (!el || typeof window === "undefined") {
    return { ms: DEFAULT_SPRING_MS, ease: DEFAULT_SPRING_EASE };
  }
  const cs = getComputedStyle(el);
  const rawDuration = cs.getPropertyValue("--vds-drawer-duration");
  const rawEase = cs.getPropertyValue("--vds-drawer-ease").trim();
  return {
    ms: parseDurationMs(rawDuration, DEFAULT_SPRING_MS),
    ease: rawEase || DEFAULT_SPRING_EASE,
  };
}

function composeHandlers<E>(
  user: ((event: E) => void) | undefined,
  internal: (event: E) => void,
) {
  return (event: E) => {
    user?.(event);
    const prevented = typeof event === "object" && event !== null && "defaultPrevented" in event &&
      Boolean((event as { defaultPrevented?: boolean }).defaultPrevented);
    if (!prevented) internal(event);
  };
}

function mergeRefs<T>(...refs: Array<ForwardedRef<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

function getWrapperEl(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector("[data-vds-drawer-wrapper]");
}

function setTransition(el: HTMLElement | null, value: string) {
  if (el) el.style.transition = value;
}

function isEditableElement(node: Element | null): node is HTMLElement {
  if (!(node instanceof HTMLElement)) return false;
  if (node.isContentEditable) return true;
  const tagName = node.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

function dedupeSnaps(
  snapPoints: readonly SnapPoint[] | undefined,
): SnapPoint[] {
  if (!snapPoints?.length) return [1];
  return [...new Set(snapPoints)];
}

function resolveOpenStates(
  openStates: readonly DrawerOpenState[] | undefined,
  snapPoints: readonly SnapPoint[] | undefined,
): DrawerOpenState[] {
  if (openStates?.length) return [...openStates];
  return dedupeSnaps(snapPoints).map((size, index) => ({
    id: `state-${index + 1}`,
    size,
  }));
}

function findOpenStateById(
  openStates: readonly DrawerOpenState[],
  id: string | null | undefined,
): DrawerOpenState | undefined {
  if (!id) return undefined;
  return openStates.find((state) => state.id === id);
}

function findOpenStateByValue(
  openStates: readonly DrawerOpenState[],
  value: SnapPoint,
): DrawerOpenState | undefined {
  return openStates.find((state) => state.size === value);
}

export interface DrawerProps {
  children: ReactNode;
  direction?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sizeMode?: DrawerSizeMode;
  size?: DrawerDeclaredSize;
  offset?: DrawerOffset;
  snapPoints?: readonly SnapPoint[];
  openStates?: readonly DrawerOpenState[];
  activeOpenState?: string | null;
  defaultOpenState?: string;
  onActiveOpenStateChange?: (value: string | null) => void;
  activeSnapPoint?: SnapPoint;
  defaultSnapPoint?: SnapPoint;
  onActiveSnapPointChange?: (value: SnapPoint) => void;
  minimizedSize?: SnapPoint;
  minimizedState?: DrawerMinimizedState | SnapPoint;
  indicator?: DrawerIndicatorPlacement;
  headerVariant?: DrawerHeaderVariant;
  snapBehavior?: DrawerSnapBehavior;
  snapStepThreshold?: number;
  snapSkipThreshold?: number;
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
  size,
  offset,
  snapPoints,
  openStates,
  activeOpenState,
  defaultOpenState,
  onActiveOpenStateChange,
  activeSnapPoint: controlledSnap,
  defaultSnapPoint,
  onActiveSnapPointChange,
  minimizedSize,
  minimizedState,
  indicator = "inside",
  headerVariant = "plain",
  snapBehavior = "staged",
  snapStepThreshold = 0.28,
  snapSkipThreshold = 0.86,
  closeThreshold = 0.5,
  velocityThreshold = 0.5,
  dragHandleOnly = false,
  scaleBackground = false,
  modal = true,
  dismissible = true,
  preventAutoFocus = true,
}: DrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number>(0);

  const resolvedOpenStates = useMemo(
    () => resolveOpenStates(openStates, snapPoints),
    [openStates, snapPoints],
  );
  const resolvedMinimizedState = typeof minimizedState === "number"
    ? { id: DEFAULT_MINIMIZED_STATE_ID, size: minimizedState }
    : minimizedState;
  const resolvedMinimizedSize = resolvedMinimizedState?.size ?? minimizedSize;
  const resolvedMinimizedStateId = resolvedMinimizedState?.id ?? DEFAULT_MINIMIZED_STATE_ID;
  const resolvedSnaps = useMemo(
    () => dedupeSnaps(resolvedOpenStates.map((state) => state.size)),
    [resolvedOpenStates],
  );
  const controlledStateSnap = useMemo(
    () => activeOpenState === resolvedMinimizedStateId
      ? resolvedMinimizedSize
      : findOpenStateById(resolvedOpenStates, activeOpenState)?.size,
    [activeOpenState, resolvedMinimizedSize, resolvedMinimizedStateId, resolvedOpenStates],
  );
  const defaultStateSnap = useMemo(
    () => defaultOpenState === resolvedMinimizedStateId
      ? resolvedMinimizedSize
      : findOpenStateById(resolvedOpenStates, defaultOpenState)?.size,
    [defaultOpenState, resolvedMinimizedSize, resolvedMinimizedStateId, resolvedOpenStates],
  );
  const resolvedDefaultSnap =
    defaultStateSnap ??
    defaultSnapPoint ??
    resolvedSnaps[resolvedSnaps.length - 1];

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalSnap, setInternalSnap] = useState<SnapPoint>(resolvedDefaultSnap);
  const [present, setPresent] = useState(controlledOpen ?? defaultOpen);
  const [dragging, setDragging] = useState(false);

  const isOpenControlled = controlledOpen !== undefined;
  const isSnapControlled = controlledStateSnap !== undefined || controlledSnap !== undefined;
  const committedSnapPoint = controlledStateSnap ?? controlledSnap ?? internalSnap;
  const [visualSnapPoint, setVisualSnapPoint] = useState<SnapPoint>(committedSnapPoint);
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const activeSnapPoint = visualSnapPoint;
  const isMinimized = resolvedMinimizedSize !== undefined && activeSnapPoint === resolvedMinimizedSize;
  const isModal = modal && !isMinimized;

  useEffect(() => {
    if (dragging) return;
    setVisualSnapPoint(committedSnapPoint);
  }, [committedSnapPoint, dragging]);

  useEffect(() => {
    const snapStillExists = resolvedSnaps.includes(committedSnapPoint) ||
      (resolvedMinimizedSize !== undefined && committedSnapPoint === resolvedMinimizedSize);
    if (snapStillExists) return;

    setVisualSnapPoint(resolvedDefaultSnap);
    if (!isSnapControlled) {
      setInternalSnap(resolvedDefaultSnap);
    }
  }, [
    committedSnapPoint,
    isSnapControlled,
    resolvedDefaultSnap,
    resolvedMinimizedSize,
    resolvedSnaps,
  ]);

  useEffect(() => {
    window.clearTimeout(closeTimerRef.current);
    if (open) {
      setPresent(true);
      return;
    }
    if (!present) {
      if (!isSnapControlled) setInternalSnap(resolvedDefaultSnap);
      return;
    }
    const { ms } = readDrawerTiming(contentRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setPresent(false);
      setDragging(false);
      if (!isSnapControlled) setInternalSnap(resolvedDefaultSnap);
    }, ms);
    return () => window.clearTimeout(closeTimerRef.current);
  }, [isSnapControlled, open, present, resolvedDefaultSnap]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  const handleOpenChange = useCallback((next: boolean) => {
    if (!dismissible && !next) return;
    if (next) setPresent(true);
    if (!isOpenControlled) setInternalOpen(next);
    controlledOnOpenChange?.(next);
  }, [controlledOnOpenChange, dismissible, isOpenControlled]);

  const handleSnapChange = useCallback((next: SnapPoint) => {
    setVisualSnapPoint(next);
    if (!isSnapControlled) setInternalSnap(next);
    onActiveSnapPointChange?.(next);
    if (next === resolvedMinimizedSize) {
      onActiveOpenStateChange?.(resolvedMinimizedStateId);
      return;
    }
    onActiveOpenStateChange?.(findOpenStateByValue(resolvedOpenStates, next)?.id ?? null);
  }, [
    isSnapControlled,
    onActiveOpenStateChange,
    onActiveSnapPointChange,
    resolvedMinimizedSize,
    resolvedMinimizedStateId,
    resolvedOpenStates,
  ]);

  const ctxValue = useMemo(() => ({
    direction,
    open,
    present,
    dragging,
    dismissible,
    dragHandleOnly,
    scaleBackground,
    preventAutoFocus,
    sizeMode,
    size,
    offset,
    indicator,
    headerVariant,
    snapPoints: resolvedSnaps,
    activeSnapPoint,
    minimizedSize: resolvedMinimizedSize,
    snapBehavior,
    closeThreshold,
    velocityThreshold,
    snapStepThreshold,
    snapSkipThreshold,
    contentRef,
    overlayRef,
    headerRef,
    bodyRef,
    handleRef,
    onOpenChange: handleOpenChange,
    onSnapPointChange: handleSnapChange,
    setDragging,
  }), [
    direction,
    open,
    present,
    dragging,
    dismissible,
    dragHandleOnly,
    scaleBackground,
    preventAutoFocus,
    sizeMode,
    size,
    offset,
    indicator,
    headerVariant,
    resolvedSnaps,
    activeSnapPoint,
    resolvedMinimizedSize,
    snapBehavior,
    closeThreshold,
    velocityThreshold,
    snapStepThreshold,
    snapSkipThreshold,
    handleOpenChange,
    handleSnapChange,
  ]);

  return (
    <DrawerProvider value={ctxValue}>
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange} modal={isModal}>
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
  const { overlayRef, open, activeSnapPoint, minimizedSize } = useDrawerContext();
  const overlayVisible = open && (minimizedSize === undefined || activeSnapPoint !== minimizedSize);
  return (
    <DialogPrimitive.Overlay
      ref={mergeRefs(overlayRef, forwardedRef)}
      className={cn("vds-drawer-overlay", className)}
      data-open={overlayVisible || undefined}
      {...props}
    />
  );
});

interface DrawerLayout {
  totalSize: number;
  snaps: ResolvedSnap[];
  minimized: ResolvedSnap | null;
  overlayStartSize: number;
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
    onMouseDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture,
    onTouchStart,
    style,
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
    headerRef,
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
    minimizedSize,
    sizeMode,
    size,
    offset,
    indicator,
    headerVariant,
    snapPoints,
    activeSnapPoint,
    snapBehavior,
    closeThreshold,
    velocityThreshold,
    snapStepThreshold,
    snapSkipThreshold,
  } = useDrawerContext();

  const [layout, setLayout] = useState<DrawerLayout>({
    totalSize: 0,
    snaps: [],
    minimized: null,
    overlayStartSize: 0,
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const currentSizeRef = useRef(0);
  const pendingSizeRef = useRef(0);
  const measureFrameRef = useRef(0);
  const writeFrameRef = useRef(0);
  const openAnimRef = useRef(0);
  const hasOpenedRef = useRef(false);

  const minimizedStage = minimizedSize !== undefined && activeSnapPoint === minimizedSize;

  const activeState = useMemo<
    | { kind: "minimized" }
    | { kind: "snap"; index: number }
  >(() => {
    if (minimizedStage && layout.minimized) {
      return { kind: "minimized" };
    }
    const index = findSnapIndexByValue(layout.snaps, activeSnapPoint);
    return { kind: "snap", index: index === -1 ? Math.max(layout.snaps.length - 1, 0) : index };
  }, [activeSnapPoint, layout.minimized, layout.snaps, minimizedStage]);

  const activeStageKind: "snap" | "minimized" = activeState.kind === "minimized" ? "minimized" : "snap";

  const setAnimated = useCallback((animated: boolean) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperEl();
    if (!animated) {
      setTransition(contentEl, "none");
      setTransition(overlayEl, "none");
      if (scaleBackground) setTransition(wrapperEl, "none");
      return;
    }
    const { ms, ease } = readDrawerTiming(contentEl);
    setTransition(contentEl, `transform ${ms}ms ${ease}`);
    setTransition(overlayEl, `opacity ${ms}ms ${ease}`);
    if (scaleBackground) {
      setTransition(
        wrapperEl,
        `transform ${ms}ms ${ease}, border-radius ${ms}ms ${ease}`,
      );
    }
  }, [contentRef, overlayRef, scaleBackground]);

  const writeVisualSize = useCallback((sizePx: number) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperEl();

    currentSizeRef.current = sizePx;

    if (layout.totalSize <= 0 || !contentEl) return;

    contentEl.style.setProperty(
      "--vds-drawer-transform",
      getVisualTransform(direction, sizePx, layout.totalSize),
    );

    const overlayProgress = getOverlayProgress(sizePx, layout.totalSize, layout.overlayStartSize);
    if (overlayEl) {
      overlayEl.style.setProperty("--vds-drawer-overlay-opacity", String(overlayProgress));
      overlayEl.style.pointerEvents = overlayProgress > 0.001 ? "auto" : "none";
    }

    if (scaleBackground && wrapperEl) {
      if (overlayProgress <= 0.001) {
        wrapperEl.style.transform = "";
        wrapperEl.style.borderRadius = "";
      } else {
        const backgroundStyles = getBackgroundStyles(overlayProgress);
        wrapperEl.style.transform = backgroundStyles.transform;
        wrapperEl.style.borderRadius = backgroundStyles.borderRadius;
      }
    }
  }, [contentRef, direction, layout.overlayStartSize, layout.totalSize, overlayRef, scaleBackground]);

  const flushVisualSize = useCallback(() => {
    writeFrameRef.current = 0;
    writeVisualSize(pendingSizeRef.current);
  }, [writeVisualSize]);

  const flushPendingSize = useCallback(() => {
    if (!writeFrameRef.current) return;
    cancelAnimationFrame(writeFrameRef.current);
    writeFrameRef.current = 0;
    writeVisualSize(pendingSizeRef.current);
  }, [writeVisualSize]);

  const applySize = useCallback((sizePx: number, immediate = false) => {
    pendingSizeRef.current = sizePx;

    if (immediate || typeof window === "undefined") {
      if (writeFrameRef.current) {
        cancelAnimationFrame(writeFrameRef.current);
        writeFrameRef.current = 0;
      }
      writeVisualSize(sizePx);
      return;
    }

    if (!writeFrameRef.current) {
      writeFrameRef.current = requestAnimationFrame(flushVisualSize);
    }
  }, [flushVisualSize, writeVisualSize]);

  const settleToSnap = useCallback((animated: boolean) => {
    if (layout.totalSize <= 0) return;
    const target = activeState.kind === "minimized"
      ? layout.minimized?.size ?? layout.totalSize
      : layout.snaps[activeState.index]?.size ?? layout.totalSize;
    const current = writeFrameRef.current ? pendingSizeRef.current : currentSizeRef.current;

    debugDrawer("settle:request", {
      animated,
      activeState,
      target,
      currentSize: current,
      pendingSize: pendingSizeRef.current,
    });

    if (!animated) {
      setAnimated(false);
      applySize(target, true);
      return;
    }

    if (Math.abs(target - current) < 0.5) {
      setAnimated(false);
      applySize(target, true);
      return;
    }

    flushPendingSize();
    setAnimated(false);
    writeVisualSize(current);
    const contentEl = contentRef.current;
    if (contentEl) void contentEl.offsetHeight;

    setAnimated(true);
    if (contentEl) void contentEl.offsetHeight;
    if (openAnimRef.current) cancelAnimationFrame(openAnimRef.current);
    openAnimRef.current = requestAnimationFrame(() => {
      openAnimRef.current = requestAnimationFrame(() => {
        openAnimRef.current = 0;
        debugDrawer("settle:commit", {
          activeState,
          target,
          currentSize: currentSizeRef.current,
        });
        applySize(target, true);
      });
    });
  }, [
    activeState,
    applySize,
    contentRef,
    flushPendingSize,
    layout.minimized,
    layout.snaps,
    layout.totalSize,
    setAnimated,
    writeVisualSize,
  ]);

  const measure = useCallback(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const viewportSize = getViewportSize(direction);
    const viewportInfo = getViewportInfo(direction, viewportSize);
    const resolvedOffset = resolveDirectionalValue(offset, direction);
    const edgeOffsetPx = resolveDeclaredPixels(resolvedOffset, viewportInfo, direction);
    const availableSize = Math.max(viewportSize * VIEWPORT_RATIO - edgeOffsetPx, 1);
    const resolvedOffsetCss = resolveDeclaredSize(resolvedOffset, viewportInfo) ?? "0px";

    contentEl.style.setProperty("--vds-drawer-edge-offset", resolvedOffsetCss);
    contentEl.style.setProperty("--vds-drawer-available-size", `${availableSize}px`);
    contentEl.style.setProperty("--vds-drawer-adaptive-size", getDefaultAdaptiveSize(direction));

    if (sizeMode === "fixed") {
      const resolvedSize = resolveDeclaredSize(size, getViewportInfo(direction, availableSize));
      if (resolvedSize) contentEl.style.setProperty("--vds-drawer-fixed-size", resolvedSize);
      else contentEl.style.removeProperty("--vds-drawer-fixed-size");
    } else {
      contentEl.style.removeProperty("--vds-drawer-fixed-size");
    }

    const totalSize = getElementSize(contentEl, direction);
    if (totalSize <= 0) return;

    if (currentSizeRef.current <= 0) {
      contentEl.style.setProperty("--vds-drawer-transform", getVisualTransform(direction, 0, totalSize));
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--vds-drawer-overlay-opacity", "0");
      }
    }

    const { snaps, minimized } = resolveSnaps(snapPoints, totalSize, minimizedSize);
    const overlayStartSize = minimized?.size ?? 0;

    setLayout((previous) => {
      const snapsSame =
        previous.snaps.length === snaps.length &&
        previous.snaps.every((snap, index) => {
          const next = snaps[index];
          return snap.value === next?.value &&
            snap.kind === next?.kind &&
            Math.abs(snap.size - (next?.size ?? 0)) < 1;
        });
      const minimizedSame =
        (previous.minimized === null && minimized === null) ||
        (previous.minimized !== null && minimized !== null &&
          previous.minimized.value === minimized.value &&
          Math.abs(previous.minimized.size - minimized.size) < 1);
      const same = previous.totalSize === totalSize &&
        previous.overlayStartSize === overlayStartSize &&
        snapsSame && minimizedSame;

      return same ? previous : {
        totalSize,
        snaps,
        minimized,
        overlayStartSize,
        };
    });
  }, [contentRef, direction, minimizedSize, offset, size, sizeMode, snapPoints]);

  useEffect(() => () => {
    cancelAnimationFrame(measureFrameRef.current);
    cancelAnimationFrame(writeFrameRef.current);
    cancelAnimationFrame(openAnimRef.current);
  }, []);

  useEffect(() => {
    if (!present) {
      setKeyboardOpen(false);
      return;
    }

    const syncKeyboardOpen = () => {
      if (typeof window === "undefined") {
        setKeyboardOpen(false);
        return;
      }
      const activeElement = typeof document === "undefined" ? null : document.activeElement;
      const hasFocusedEditable = Boolean(
        contentRef.current?.contains(activeElement) && isEditableElement(activeElement),
      );
      if (!hasFocusedEditable) {
        setKeyboardOpen(false);
        return;
      }
      const vv = window.visualViewport;
      if (!vv) {
        setKeyboardOpen(false);
        return;
      }
      const keyboardDelta = window.innerHeight - vv.height;
      const keyboardThreshold = Math.max(120, window.innerHeight * 0.18);
      setKeyboardOpen(keyboardDelta > keyboardThreshold);
    };

    syncKeyboardOpen();
    const contentEl = contentRef.current;
    const onFocusIn = () => syncKeyboardOpen();
    const onFocusOut = () => requestAnimationFrame(syncKeyboardOpen);
    contentEl?.addEventListener("focusin", onFocusIn);
    contentEl?.addEventListener("focusout", onFocusOut);
    window.visualViewport?.addEventListener("resize", syncKeyboardOpen);
    window.visualViewport?.addEventListener("scroll", syncKeyboardOpen);
    window.addEventListener("resize", syncKeyboardOpen);

    return () => {
      contentEl?.removeEventListener("focusin", onFocusIn);
      contentEl?.removeEventListener("focusout", onFocusOut);
      window.visualViewport?.removeEventListener("resize", syncKeyboardOpen);
      window.visualViewport?.removeEventListener("scroll", syncKeyboardOpen);
      window.removeEventListener("resize", syncKeyboardOpen);
    };
  }, [contentRef, present]);

  useLayoutEffect(() => {
    if (!present) {
      hasOpenedRef.current = false;
      return;
    }

    measure();

    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrameRef.current);
      measureFrameRef.current = requestAnimationFrame(measure);
    };

    const scheduleViewportMeasure = () => {
      const activeElement = typeof document === "undefined" ? null : document.activeElement;
      if (contentRef.current?.contains(activeElement) && isEditableElement(activeElement)) return;
      scheduleMeasure();
    };

    const contentEl = contentRef.current;
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    if (contentEl) resizeObserver.observe(contentEl);
    if (bodyRef.current && bodyRef.current !== contentEl) resizeObserver.observe(bodyRef.current);

    scheduleMeasure();
    const settleMeasureFrame = requestAnimationFrame(() => {
      scheduleMeasure();
      requestAnimationFrame(scheduleMeasure);
    });

    window.addEventListener("resize", scheduleMeasure);
    window.visualViewport?.addEventListener("resize", scheduleViewportMeasure);

    return () => {
      cancelAnimationFrame(settleMeasureFrame);
      cancelAnimationFrame(measureFrameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.visualViewport?.removeEventListener("resize", scheduleViewportMeasure);
    };
  }, [bodyRef, contentRef, measure, present]);

  useLayoutEffect(() => {
    if (!present || layout.totalSize <= 0) return;

    cancelAnimationFrame(openAnimRef.current);

    if (!open) {
      hasOpenedRef.current = false;
      setAnimated(true);
      applySize(0, true);
      return;
    }

    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setAnimated(false);
      applySize(0, true);
      openAnimRef.current = requestAnimationFrame(() => {
        openAnimRef.current = requestAnimationFrame(() => settleToSnap(true));
      });
      return () => cancelAnimationFrame(openAnimRef.current);
    }

    if (!dragging) {
      flushPendingSize();
      settleToSnap(true);
    }
  }, [applySize, dragging, flushPendingSize, layout.totalSize, open, present, setAnimated, settleToSnap]);

  useEffect(() => {
    if (present) return;
    const wrapperEl = getWrapperEl();
    if (!wrapperEl) return;
    wrapperEl.style.transition = "";
    wrapperEl.style.transform = "";
    wrapperEl.style.borderRadius = "";
  }, [present]);

  const drag = useDrawerDrag({
    direction,
    drawerSize: layout.totalSize,
    snapSizes: layout.snaps.map((snap) => snap.size),
    currentSnapIndex: activeState.kind === "snap" ? activeState.index : 0,
    fromMinimized: activeState.kind === "minimized",
    minimizedSize: layout.minimized?.size ?? null,
    getCurrentSize: () => writeFrameRef.current ? pendingSizeRef.current : currentSizeRef.current,
    closeThreshold,
    velocityThreshold,
    snapBehavior,
    snapStepThreshold,
    snapSkipThreshold,
    dismissible,
    dragHandleOnly,
    onDragStart: () => {
      setDragging(true);
      setAnimated(false);
    },
    onDragMove: (sizePx) => applySize(sizePx),
    onDragEnd: (target) => {
      flushPendingSize();
      setDragging(false);

      debugDrawer("drag:apply-target", {
        target,
        activeSnapPoint,
        currentSize: currentSizeRef.current,
        pendingSize: pendingSizeRef.current,
        minimizedSize,
      });

      if (target.kind === "close") {
        setAnimated(true);
        applySize(0, true);
        onOpenChange(false);
        return;
      }

      if (target.kind === "minimized") {
        if (minimizedSize !== undefined) {
          onSnapPointChange(minimizedSize);
        } else {
          settleToSnap(true);
        }
        return;
      }

      const snap = layout.snaps[target.index];
      if (snap) {
        onSnapPointChange(snap.value);
      } else {
        settleToSnap(true);
      }
    },
    getContentEl: () => contentRef.current,
    getHeaderEl: () => headerRef.current,
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
        data-keyboard-open={keyboardOpen || undefined}
        data-indicator={indicator}
        data-header-variant={headerVariant}
        data-size-mode={sizeMode}
        data-stage={activeStageKind}
        data-measured={layout.totalSize > 0 || undefined}
        tabIndex={-1}
        style={style}
        onOpenAutoFocus={composeHandlers(onOpenAutoFocus, (event) => {
          if (!preventAutoFocus) return;
          event.preventDefault();
          if (!minimizedStage) {
            contentRef.current?.focus({ preventScroll: true });
          }
        })}
        onEscapeKeyDown={composeHandlers(onEscapeKeyDown, (event) => {
          if (!dismissible) event.preventDefault();
        })}
        onPointerDownOutside={composeHandlers(onPointerDownOutside, (event) => {
          if (!dismissible) event.preventDefault();
        })}
        onInteractOutside={composeHandlers(onInteractOutside, (event) => {
          if (!dismissible) event.preventDefault();
        })}
        onMouseDown={composeHandlers(onMouseDown, drag.onMouseDown)}
        onPointerDown={composeHandlers(onPointerDown, drag.onPointerDown)}
        onPointerMove={composeHandlers(onPointerMove, drag.onPointerMove)}
        onPointerUp={composeHandlers(onPointerUp, drag.onPointerUp)}
        onPointerCancel={composeHandlers(onPointerCancel, drag.onPointerCancel)}
        onLostPointerCapture={composeHandlers(onLostPointerCapture, drag.onLostPointerCapture)}
        onTouchStart={composeHandlers(onTouchStart, drag.onTouchStart)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export interface DrawerHandleProps extends ComponentPropsWithoutRef<"div"> {
  placement?: DrawerIndicatorPlacement;
}

export const DrawerHandle = forwardRef<HTMLDivElement, DrawerHandleProps>(function DrawerHandle(
  { className, placement, ...props },
  forwardedRef,
) {
  const { direction, handleRef, activeSnapPoint, minimizedSize, indicator } = useDrawerContext();
  const minimized = minimizedSize !== undefined && activeSnapPoint === minimizedSize;
  const resolvedPlacement = placement ?? indicator;

  if (resolvedPlacement === "hidden") return null;

  return (
    <div
      ref={mergeRefs(handleRef, forwardedRef)}
      className={cn("vds-drawer-handle", className)}
      data-direction={direction}
      data-placement={resolvedPlacement}
      data-stage={minimized ? "minimized" : "snap"}
      aria-hidden="true"
      {...props}
    >
      <div className="vds-drawer-handle-bar" />
    </div>
  );
});

export interface DrawerHeaderProps extends ComponentPropsWithoutRef<"div"> {
  variant?: DrawerHeaderVariant;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
  { className, variant, ...props },
  forwardedRef,
) {
  const { headerRef, headerVariant } = useDrawerContext();
  return (
    <div
      ref={mergeRefs(headerRef, forwardedRef)}
      className={cn("vds-drawer-header", className)}
      data-variant={variant ?? headerVariant}
      {...props}
    />
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
