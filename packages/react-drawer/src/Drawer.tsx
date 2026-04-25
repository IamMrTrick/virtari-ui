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
import { cn } from "@virtari-packages/utils";
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
const VIEWPORT_RATIO = 1;
const DEFAULT_MINIMIZED_STATE_ID = "minimized";

function getDefaultHeaderVariant(direction: Direction): DrawerHeaderVariant {
  return direction === "left" || direction === "right" ? "bordered" : "plain";
}

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

function getComputedMainTranslate(el: HTMLElement, direction: Direction): number {
  const transform = getComputedStyle(el).transform;
  if (!transform || transform === "none") return 0;

  const isHorizontal = direction === "left" || direction === "right";
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d?.[1]) {
    const values = matrix3d[1].split(",").map((part) => parseFloat(part.trim()));
    const value = values[isHorizontal ? 12 : 13];
    return Number.isFinite(value) ? value : 0;
  }

  const matrix2d = transform.match(/^matrix\((.+)\)$/);
  if (matrix2d?.[1]) {
    const values = matrix2d[1].split(",").map((part) => parseFloat(part.trim()));
    const value = values[isHorizontal ? 4 : 5];
    return Number.isFinite(value) ? value : 0;
  }

  return 0;
}

type ResizeSizeProperty = "block-size" | "inline-size";

interface PendingResizeSizeAnimation {
  property: ResizeSizeProperty;
  from: number;
  to: number;
}

function getResizeSizeProperty(direction: Direction): ResizeSizeProperty {
  return direction === "left" || direction === "right" ? "inline-size" : "block-size";
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
  headerVariant,
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
  const resolvedHeaderVariant = headerVariant ?? getDefaultHeaderVariant(direction);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number>(0);
  const [mountedIndicator, setMountedIndicator] = useState<DrawerIndicatorPlacement | null>(null);

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
    mountedIndicator,
    headerVariant: resolvedHeaderVariant,
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
    setMountedIndicator,
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
    mountedIndicator,
    resolvedHeaderVariant,
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
    mountedIndicator,
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
  const layoutRef = useRef<DrawerLayout>(layout);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboardOpenRef = useRef(false);
  const draggingRef = useRef(false);
  const currentSizeRef = useRef(0);
  const pendingSizeRef = useRef(0);
  const measureFrameRef = useRef(0);
  const writeFrameRef = useRef(0);
  const openAnimRef = useRef(0);
  const hasOpenedRef = useRef(false);
  const pendingResizeSizeRef = useRef<PendingResizeSizeAnimation | null>(null);
  const resizeSizeAnimatingRef = useRef(false);
  const resizeCleanupTimerRef = useRef(0);

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

  const writeVisualSize = useCallback((
    sizePx: number,
    options?: { disableStretch?: boolean },
  ) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperEl();

    currentSizeRef.current = sizePx;

    if (layout.totalSize <= 0 || !contentEl) return;

    const rtl = getComputedStyle(contentEl).direction === "rtl";
    contentEl.style.setProperty(
      "--vds-drawer-transform",
      getVisualTransform(direction, sizePx, layout.totalSize, { ...options, rtl }),
    );

    const overlayProgress = getOverlayProgress(sizePx, layout.totalSize, layout.overlayStartSize);
    if (overlayEl) {
      overlayEl.style.setProperty("--vds-drawer-overlay-opacity", String(overlayProgress));
      overlayEl.style.pointerEvents = overlayProgress > 0.001 ? "auto" : "none";
    }

    // Close progress — grows from 0 → 1 as the user drags below the smallest
    // resting position toward the close threshold. Used by indicator="progress".
    const smallestRest = layout.minimized?.size ?? layout.snaps[0]?.size ?? layout.totalSize;
    const closeTarget = smallestRest * closeThreshold;
    const closeSpan = Math.max(smallestRest - closeTarget, 1);
    const closeProgress =
      sizePx >= smallestRest
        ? 0
        : clamp((smallestRest - sizePx) / closeSpan, 0, 1);
    contentEl.style.setProperty("--vds-drawer-close-progress", closeProgress.toFixed(3));

    if (scaleBackground && wrapperEl) {
      if (overlayProgress <= 0.001) {
        wrapperEl.style.transform = "";
        wrapperEl.style.borderRadius = "";
        wrapperEl.style.transformOrigin = "";
      } else {
        const backgroundStyles = getBackgroundStyles(overlayProgress, direction, rtl);
        wrapperEl.style.transform = backgroundStyles.transform;
        wrapperEl.style.borderRadius = backgroundStyles.borderRadius;
        wrapperEl.style.transformOrigin = backgroundStyles.transformOrigin;
      }
    }
  }, [
    closeThreshold,
    contentRef,
    direction,
    layout.minimized,
    layout.overlayStartSize,
    layout.snaps,
    layout.totalSize,
    overlayRef,
    scaleBackground,
  ]);

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
    const resizeAnimation = pendingResizeSizeRef.current;
    const shrinkResize =
      resizeAnimation && resizeAnimation.from > resizeAnimation.to
        ? resizeAnimation
        : null;

    debugDrawer("settle:request", {
      animated,
      activeState,
      target,
      currentSize: current,
      pendingSize: pendingSizeRef.current,
      resizeAnimation,
    });

    if (!animated) {
      setAnimated(false);
      if (resizeAnimation) {
        contentRef.current?.style.removeProperty(resizeAnimation.property);
        resizeSizeAnimatingRef.current = false;
        window.clearTimeout(resizeCleanupTimerRef.current);
      }
      pendingResizeSizeRef.current = null;
      applySize(target, true);
      return;
    }

    if (Math.abs(target - current) < 0.5 && !resizeAnimation) {
      setAnimated(false);
      applySize(target, true);
      return;
    }

    flushPendingSize();
    setAnimated(false);
    const contentEl = contentRef.current;
    if (shrinkResize && contentEl) {
      contentEl.style.setProperty(shrinkResize.property, `${shrinkResize.from}px`);
      const rtl = getComputedStyle(contentEl).direction === "rtl";
      contentEl.style.setProperty(
        "--vds-drawer-transform",
        getVisualTransform(direction, current, shrinkResize.from, { disableStretch: true, rtl }),
      );
    } else {
      writeVisualSize(current, { disableStretch: Boolean(resizeAnimation) });
    }
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
        const pendingResize = pendingResizeSizeRef.current;
        if (pendingResize && contentEl && pendingResize.from > pendingResize.to) {
          resizeSizeAnimatingRef.current = true;
          const rtl = getComputedStyle(contentEl).direction === "rtl";
          contentEl.style.setProperty(
            "--vds-drawer-transform",
            getVisualTransform(direction, target, pendingResize.from, { disableStretch: true, rtl }),
          );
          window.clearTimeout(resizeCleanupTimerRef.current);
          const { ms } = readDrawerTiming(contentEl);
          resizeCleanupTimerRef.current = window.setTimeout(() => {
            setTransition(contentRef.current, "none");
            contentRef.current?.style.removeProperty(pendingResize.property);
            currentSizeRef.current = target;
            pendingSizeRef.current = target;
            writeVisualSize(target, { disableStretch: true });
            if (contentRef.current) void contentRef.current.offsetHeight;
            setAnimated(true);
            resizeSizeAnimatingRef.current = false;
          }, ms + 80);
          pendingResizeSizeRef.current = null;
          return;
        }
        applySize(target, true);
      });
    });
  }, [
    activeState,
    applySize,
    contentRef,
    direction,
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
    // Don't re-measure during drag — the rubber-band stretch writes a scale
    // transform that inflates getBoundingClientRect(). Re-reading it and
    // updating layout.totalSize would feed back into writeVisualSize's
    // divisor, shrinking the scale on the next frame — visible as jitter.
    if (draggingRef.current) return;
    // Keep snap/layout sizing on the pre-keyboard viewport. Android fires a
    // visualViewport resize for the keyboard; remeasuring there would shrink
    // available-size and then CSS would subtract keyboard-inset a second time.
    if (keyboardOpenRef.current) return;

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

    const resizeSizeProperty = getResizeSizeProperty(direction);
    const lockedResizeSize = contentEl.style.getPropertyValue(resizeSizeProperty);
    if (lockedResizeSize) contentEl.style.removeProperty(resizeSizeProperty);
    const totalSize = getElementSize(contentEl, direction);
    if (lockedResizeSize) contentEl.style.setProperty(resizeSizeProperty, lockedResizeSize);
    if (totalSize <= 0) return;

    if (currentSizeRef.current <= 0) {
      const rtl = getComputedStyle(contentEl).direction === "rtl";
      contentEl.style.setProperty(
        "--vds-drawer-transform",
        getVisualTransform(direction, 0, totalSize, { rtl }),
      );
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--vds-drawer-overlay-opacity", "0");
      }
    }

    const { snaps, minimized } = resolveSnaps(snapPoints, totalSize, minimizedSize);
    const overlayStartSize = minimized?.size ?? 0;
    const previousLayout = layoutRef.current;
    const sizeChanged =
      previousLayout.totalSize > 0 && Math.abs(previousLayout.totalSize - totalSize) >= 1;
    const visualSize = writeFrameRef.current ? pendingSizeRef.current : currentSizeRef.current;

    if (open && present && !dragging && sizeChanged && visualSize > 0) {
      window.clearTimeout(resizeCleanupTimerRef.current);
      resizeSizeAnimatingRef.current = false;
      if (totalSize < previousLayout.totalSize) {
        pendingResizeSizeRef.current = {
          property: resizeSizeProperty,
          from: previousLayout.totalSize,
          to: totalSize,
        };
        setTransition(contentEl, "none");
        contentEl.style.setProperty(resizeSizeProperty, `${previousLayout.totalSize}px`);
        const rtl = getComputedStyle(contentEl).direction === "rtl";
        contentEl.style.setProperty(
          "--vds-drawer-transform",
          getVisualTransform(direction, visualSize, previousLayout.totalSize, {
            disableStretch: true,
            rtl,
          }),
        );
      } else {
        pendingResizeSizeRef.current = null;
        contentEl.style.removeProperty(resizeSizeProperty);
      }
    }

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

      const next = same ? previous : {
        totalSize,
        snaps,
        minimized,
        overlayStartSize,
      };
      layoutRef.current = next;
      return next;
    });
  }, [
    contentRef,
    direction,
    dragging,
    minimizedSize,
    offset,
    open,
    present,
    size,
    sizeMode,
    snapPoints,
  ]);

  useEffect(() => () => {
    cancelAnimationFrame(measureFrameRef.current);
    cancelAnimationFrame(writeFrameRef.current);
    cancelAnimationFrame(openAnimRef.current);
    window.clearTimeout(resizeCleanupTimerRef.current);
  }, []);

  useEffect(() => {
    if (!present) {
      keyboardOpenRef.current = false;
      setKeyboardOpen(false);
      contentRef.current?.style.removeProperty("--vds-drawer-keyboard-inset");
      return;
    }

    const writeKeyboardInset = (px: number) => {
      const el = contentRef.current;
      if (!el) return;
      if (px > 0) el.style.setProperty("--vds-drawer-keyboard-inset", `${Math.round(px)}px`);
      else el.style.removeProperty("--vds-drawer-keyboard-inset");
    };

    const readCurrentInset = (): number => {
      const raw = contentRef.current?.style.getPropertyValue(
        "--vds-drawer-keyboard-inset",
      );
      if (!raw) return 0;
      const n = parseFloat(raw);
      return Number.isFinite(n) ? n : 0;
    };

    const syncKeyboardOpen = () => {
      if (typeof window === "undefined") {
        keyboardOpenRef.current = false;
        setKeyboardOpen(false);
        writeKeyboardInset(0);
        return;
      }
      const activeElement = typeof document === "undefined" ? null : document.activeElement;
      const hasFocusedEditable = Boolean(
        contentRef.current?.contains(activeElement) && isEditableElement(activeElement),
      );
      if (!hasFocusedEditable) {
        keyboardOpenRef.current = false;
        setKeyboardOpen(false);
        writeKeyboardInset(0);
        return;
      }
      const vv = window.visualViewport;
      if (!vv) {
        keyboardOpenRef.current = false;
        setKeyboardOpen(false);
        writeKeyboardInset(0);
        return;
      }
      const keyboardDelta = window.innerHeight - vv.height;
      const keyboardThreshold = Math.max(120, window.innerHeight * 0.18);
      const isOpen = keyboardDelta > keyboardThreshold;
      keyboardOpenRef.current = isOpen;
      setKeyboardOpen(isOpen);

      if (!isOpen) {
        writeKeyboardInset(0);
        return;
      }

      // Measurement-based compensation — the ONLY reliable way to handle both
      // iOS (position:fixed may anchor to visual viewport; documented behavior
      // varies across versions) and Android (fixed anchors to layout viewport).
      // Instead of assuming a formula, we read where the drawer actually ends
      // up and shift it so its bottom sits at the visible-viewport bottom.
      //
      // Remove the drawer's current translate before comparing to the visual
      // viewport. Otherwise a partially-open snap can look like extra keyboard
      // overshoot and collapse the drawer. The hidden-viewport cap keeps the
      // result within the actual keyboard-covered area.
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const currentInset = readCurrentInset();
      const mainTranslate = getComputedMainTranslate(el, direction);
      const naturalBottom = rect.bottom - mainTranslate + currentInset;
      const visibleBottom = vv.offsetTop + vv.height;
      const hiddenViewport = Math.max(0, window.innerHeight - visibleBottom);
      const measuredOvershoot = Math.max(0, naturalBottom - visibleBottom);
      const overshoot = Math.min(measuredOvershoot, hiddenViewport);

      // Avoid thrashing on sub-pixel changes mid-animation.
      if (Math.abs(overshoot - currentInset) < 1) return;
      writeKeyboardInset(overshoot);
    };

    // Scroll the focused field into view using a visualViewport-aware manual
    // calculation. Why not scrollIntoView? Browsers differ in how they pick the
    // scroll container inside a position:fixed + nested scroll area (iOS Safari
    // has quirks, Android Chrome is fine) and in timing relative to their own
    // native focus-scroll. Computing the delta ourselves against the visible
    // rect of the visualViewport gives us predictable behavior on every
    // platform, and debouncing to 150ms lets the keyboard open animation and
    // any native scroll settle before we decide.
    let scrollSettleTimer: number | null = null;
    const scrollFocusedIntoView = () => {
      const active =
        typeof document === "undefined"
          ? null
          : (document.activeElement as HTMLElement | null);
      if (!active || !isEditableElement(active)) return;
      if (!contentRef.current?.contains(active)) return;

      const scrollContainer = keyboardOpenRef.current
        ? contentRef.current
        : bodyRef.current;
      if (!scrollContainer) return;

      const targetRect = active.getBoundingClientRect();
      const vv = window.visualViewport;
      const vvTop = vv?.offsetTop ?? 0;
      const vvHeight = vv?.height ?? window.innerHeight;
      const vvBottom = vvTop + vvHeight;

      // Breathing-room margin from the visible edges — scaled with the
      // keyboard-shrunk viewport so it's proportional on small screens.
      const margin = Math.min(48, Math.max(16, vvHeight * 0.1));

      let delta = 0;
      if (targetRect.height > vvHeight - 2 * margin) {
        // Field is taller than the visible area — align its top with margin.
        delta = targetRect.top - (vvTop + margin);
      } else if (targetRect.bottom > vvBottom - margin) {
        delta = targetRect.bottom - (vvBottom - margin);
      } else if (targetRect.top < vvTop + margin) {
        delta = targetRect.top - (vvTop + margin);
      }

      if (Math.abs(delta) < 2) return;

      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const nextTop = Math.max(
        0,
        Math.min(scrollContainer.scrollTop + delta, maxScroll),
      );
      if (Math.abs(scrollContainer.scrollTop - nextTop) >= 1) {
        scrollContainer.scrollTop = nextTop;
      }
    };
    const scheduleScrollToFocused = () => {
      if (scrollSettleTimer !== null) window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = window.setTimeout(() => {
        scrollSettleTimer = null;
        scrollFocusedIntoView();
      }, 150);
    };

    syncKeyboardOpen();
    const contentEl = contentRef.current;
    const onFocusIn = (event: FocusEvent) => {
      syncKeyboardOpen();
      const target = event.target as HTMLElement | null;
      if (!target || !isEditableElement(target)) return;
      scheduleScrollToFocused();
    };
    const onFocusOut = () => requestAnimationFrame(syncKeyboardOpen);
    const onViewportChange = () => {
      syncKeyboardOpen();
      // Keyboard animation is still in flight — re-debounce the scroll.
      const active =
        typeof document === "undefined"
          ? null
          : (document.activeElement as HTMLElement | null);
      if (active && isEditableElement(active) && contentEl?.contains(active)) {
        scheduleScrollToFocused();
      }
    };
    contentEl?.addEventListener("focusin", onFocusIn);
    contentEl?.addEventListener("focusout", onFocusOut);
    window.visualViewport?.addEventListener("resize", onViewportChange);
    window.visualViewport?.addEventListener("scroll", onViewportChange);
    window.addEventListener("resize", onViewportChange);

    return () => {
      if (scrollSettleTimer !== null) window.clearTimeout(scrollSettleTimer);
      contentEl?.removeEventListener("focusin", onFocusIn);
      contentEl?.removeEventListener("focusout", onFocusOut);
      window.visualViewport?.removeEventListener("resize", onViewportChange);
      window.visualViewport?.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      contentEl?.style.removeProperty("--vds-drawer-keyboard-inset");
    };
  }, [bodyRef, contentRef, direction, present]);

  // When the virtual keyboard opens, snap the drawer to its largest snap so
  // the form has the entire visible area to work with (no half-peek while
  // the user is typing). We latch the "handled" flag only once snaps are
  // available — this covers the race where the keyboard opens before the
  // first measure completes (autofocus on drawer open, etc.).
  const keyboardSnapHandledRef = useRef(false);
  useEffect(() => {
    if (!keyboardOpen) {
      keyboardSnapHandledRef.current = false;
      return;
    }
    if (keyboardSnapHandledRef.current) return;
    if (layout.snaps.length === 0) return;
    const largest = layout.snaps[layout.snaps.length - 1];
    if (!largest) return;
    keyboardSnapHandledRef.current = true;
    if (largest.value !== activeSnapPoint) {
      onSnapPointChange(largest.value);
    }
  }, [keyboardOpen, layout.snaps, activeSnapPoint, onSnapPointChange]);

  useLayoutEffect(() => {
    if (!present) {
      hasOpenedRef.current = false;
      pendingResizeSizeRef.current = null;
      resizeSizeAnimatingRef.current = false;
      window.clearTimeout(resizeCleanupTimerRef.current);
      contentRef.current?.style.removeProperty("block-size");
      contentRef.current?.style.removeProperty("inline-size");
      return;
    }

    measure();

    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrameRef.current);
      measureFrameRef.current = requestAnimationFrame(measure);
    };

    const contentEl = contentRef.current;
    const measureObservedResize = () => {
      if (resizeSizeAnimatingRef.current) return;
      if (draggingRef.current) return;
      cancelAnimationFrame(measureFrameRef.current);
      measureFrameRef.current = 0;
      measure();
    };

    const resizeObserver = new ResizeObserver(measureObservedResize);
    if (contentEl) resizeObserver.observe(contentEl);
    if (bodyRef.current && bodyRef.current !== contentEl) resizeObserver.observe(bodyRef.current);

    const scheduleViewportMeasure = () => {
      const activeElement = typeof document === "undefined" ? null : document.activeElement;
      if (contentRef.current?.contains(activeElement) && isEditableElement(activeElement)) return;
      scheduleMeasure();
    };

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
  }, [bodyRef, contentRef, keyboardOpen, measure, present]);

  useLayoutEffect(() => {
    if (!present || resizeSizeAnimatingRef.current) return;
    if (draggingRef.current) return;
    measure();
  });

  useEffect(() => {
    keyboardOpenRef.current = keyboardOpen;
  }, [keyboardOpen]);

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

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
    wrapperEl.style.transformOrigin = "";
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
    // When the virtual keyboard is open on a bottom/top drawer, the CSS
    // swaps the scroll container from body → content (unsticks header/footer
    // so the whole drawer scrolls as one unit). Mirror that here so the
    // drag hook queries the element that actually scrolls.
    getScrollableEl: () =>
      keyboardOpenRef.current
        ? contentRef.current
        : bodyRef.current ?? contentRef.current,
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
        data-indicator={mountedIndicator ?? "hidden"}
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
  const {
    direction,
    handleRef,
    activeSnapPoint,
    minimizedSize,
    indicator,
    setMountedIndicator,
  } = useDrawerContext();
  const minimized = minimizedSize !== undefined && activeSnapPoint === minimizedSize;
  const resolvedPlacement = placement ?? indicator;

  useLayoutEffect(() => {
    setMountedIndicator(resolvedPlacement);
    return () => {
      setMountedIndicator((current) => current === resolvedPlacement ? null : current);
    };
  }, [resolvedPlacement, setMountedIndicator]);

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
