import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import {
  applyRubberband,
  clamp,
  debugDrawer,
  getCrossCoord,
  getMainCoord,
  getOpenSign,
  isAtScrollEdge,
  pickSettleTarget,
  type Direction,
  type DrawerSnapBehavior,
  type SettleTarget,
} from "./utils";

const AXIS_LOCK_THRESHOLD = 6;
const VELOCITY_WINDOW_MS = 80;
const MAX_SAMPLES = 6;
const INPUT_HARD_BLOCK_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

const HARD_BLOCK_SELECTOR = [
  "select",
  "textarea",
  "[contenteditable='true']",
  "[data-vds-drawer-no-drag]",
].join(",");

const SOFT_BLOCK_SELECTOR = [
  "button",
  "a[href]",
  "[role='button']",
  "[role='link']",
].join(",");

type DragSource = "handle" | "header" | "scroll" | "content";
type InputType = "mouse" | "pen" | "touch";

export interface DragConfig {
  direction: Direction;
  drawerSize: number;
  snapSizes: readonly number[];
  currentSnapIndex: number;
  fromMinimized: boolean;
  minimizedSize: number | null;
  getCurrentSize: () => number;
  closeThreshold: number;
  velocityThreshold: number;
  snapBehavior: DrawerSnapBehavior;
  snapStepThreshold: number;
  snapSkipThreshold: number;
  dismissible: boolean;
  dragHandleOnly: boolean;
  onDragStart: () => void;
  onDragMove: (sizePx: number) => void;
  onDragEnd: (target: SettleTarget) => void;
  getContentEl: () => HTMLElement | null;
  getHeaderEl?: () => HTMLElement | null;
  getHandleEl: () => HTMLElement | null;
  getScrollableEl: () => HTMLElement | null;
}

interface VelocitySample {
  size: number;
  time: number;
}

interface DragState {
  inputType: InputType;
  source: DragSource;
  pointerId?: number;
  touchId?: number;
  captureEl: HTMLElement | null;
  startMain: number;
  startCross: number;
  startSize: number;
  startSnapIndex: number;
  fromMinimized: boolean;
  axisLocked: boolean;
  dragging: boolean;
  samples: VelocitySample[];
}

function isInside(target: HTMLElement | null, parent: HTMLElement | null): boolean {
  if (!target || !parent) return false;
  return parent.contains(target);
}

function isInteractiveTarget(target: HTMLElement | null): boolean {
  if (!target) return false;
  return Boolean(target.closest(`${HARD_BLOCK_SELECTOR},${SOFT_BLOCK_SELECTOR}`));
}

function isHardBlockedTarget(target: HTMLElement | null): boolean {
  if (!target) return false;
  if (target.closest(HARD_BLOCK_SELECTOR)) return true;
  return Boolean(target.closest("input"));
}

function isTouchDraggableInputTarget(target: HTMLElement | null): boolean {
  if (!target) return false;
  const input = target.closest("input");
  if (!(input instanceof HTMLInputElement)) return false;
  const type = input.type.toLowerCase();
  return !INPUT_HARD_BLOCK_TYPES.has(type);
}

function blocksSurfaceDrag(target: HTMLElement | null, inputType: InputType): boolean {
  if (!target) return false;
  if (target.closest("[data-vds-drawer-no-drag]")) return true;
  if (inputType !== "mouse" && isTouchDraggableInputTarget(target)) return false;
  if (isHardBlockedTarget(target)) return true;
  if (inputType === "mouse") {
    return Boolean(target.closest(SOFT_BLOCK_SELECTOR));
  }
  return false;
}

function getTouchById(list: TouchList, touchId: number): Touch | null {
  for (let index = 0; index < list.length; index++) {
    const touch = list.item(index);
    if (touch?.identifier === touchId) return touch;
  }
  return null;
}

function getDragSurface(
  target: HTMLElement | null,
  contentEl: HTMLElement | null,
  handleEl: HTMLElement | null,
  headerEl: HTMLElement | null,
  scrollableEl: HTMLElement | null,
  dragHandleOnly: boolean,
  direction: Direction,
  inputType: InputType,
): { el: HTMLElement; source: DragSource } | null {
  if (isInside(target, handleEl) && handleEl) {
    return { el: handleEl, source: "handle" };
  }

  if (!dragHandleOnly && isInside(target, headerEl) && headerEl && !isInteractiveTarget(target)) {
    return { el: headerEl, source: "header" };
  }

  const horizontal = direction === "left" || direction === "right";

  if (
    !dragHandleOnly &&
    horizontal &&
    isInside(target, contentEl) &&
    contentEl &&
    !blocksSurfaceDrag(target, inputType)
  ) {
    return { el: contentEl, source: "content" };
  }

  if (
    inputType !== "mouse" &&
    !dragHandleOnly &&
    isInside(target, scrollableEl) &&
    scrollableEl &&
    !blocksSurfaceDrag(target, inputType)
  ) {
    return { el: scrollableEl, source: "scroll" };
  }

  return null;
}

export function useDrawerDrag(config: DragConfig) {
  const stateRef = useRef<DragState | null>(null);
  const configRef = useRef(config);
  const removeWindowListenersRef = useRef<(() => void) | null>(null);
  configRef.current = config;

  const recordSample = useCallback((size: number) => {
    const state = stateRef.current;
    if (!state) return;
    const now = performance.now();
    state.samples.push({ size, time: now });
    while (state.samples.length > MAX_SAMPLES) state.samples.shift();
  }, []);

  const computeVelocity = useCallback((): number => {
    const state = stateRef.current;
    if (!state || state.samples.length < 2) return 0;
    const now = performance.now();
    const recent = state.samples.filter((sample) => now - sample.time <= VELOCITY_WINDOW_MS);
    if (recent.length < 2) {
      const a = state.samples[state.samples.length - 2];
      const b = state.samples[state.samples.length - 1];
      const dt = Math.max(b.time - a.time, 1);
      return (b.size - a.size) / dt;
    }
    const a = recent[0];
    const b = recent[recent.length - 1];
    const dt = Math.max(b.time - a.time, 1);
    return (b.size - a.size) / dt;
  }, []);

  const releasePointerCapture = useCallback((el: HTMLElement | null, pointerId?: number) => {
    if (!el || pointerId === undefined || !el.hasPointerCapture(pointerId)) return;
    try {
      el.releasePointerCapture(pointerId);
    } catch {
      /* noop */
    }
  }, []);

  const clearWindowListeners = useCallback(() => {
    removeWindowListenersRef.current?.();
    removeWindowListenersRef.current = null;
  }, []);

  const reset = useCallback((pointerId?: number) => {
    const state = stateRef.current;
    if (!state) return;
    clearWindowListeners();
    releasePointerCapture(state.captureEl, pointerId ?? state.pointerId);
    stateRef.current = null;
  }, [clearWindowListeners, releasePointerCapture]);

  const beginSession = useCallback((state: DragState) => {
    stateRef.current = state;
    debugDrawer("drag:start", {
      source: state.source,
      inputType: state.inputType,
      startSize: state.startSize,
      startSnapIndex: state.startSnapIndex,
      fromMinimized: state.fromMinimized,
    });
    if (state.inputType === "pen" && state.captureEl && state.pointerId !== undefined) {
      try {
        state.captureEl.setPointerCapture(state.pointerId);
      } catch {
        /* noop */
      }
    }
  }, []);

  const moveSession = useCallback((main: number, cross: number, prevent?: () => void) => {
    const state = stateRef.current;
    const resolvedConfig = configRef.current;
    if (!state) return;

    const mainDelta = main - state.startMain;
    const crossDelta = cross - state.startCross;
    const openSign = getOpenSign(resolvedConfig.direction);
    const sizeDelta = mainDelta * openSign;

    if (!state.axisLocked) {
      if (Math.abs(mainDelta) < AXIS_LOCK_THRESHOLD) return;
      if (Math.abs(crossDelta) > Math.abs(mainDelta)) {
        reset(state.pointerId);
        return;
      }
      state.axisLocked = true;
    }

    if (
      state.source === "scroll" &&
      !state.dragging &&
      !isAtScrollEdge(resolvedConfig.getScrollableEl(), resolvedConfig.direction, -sizeDelta)
    ) {
      reset(state.pointerId);
      return;
    }

    prevent?.();

    if (!state.dragging) {
      state.dragging = true;
      resolvedConfig.onDragStart();
    }

    const rawSize = state.startSize + sizeDelta;
    const cappedSize = applyRubberband(rawSize, resolvedConfig.drawerSize);
    const finalSize = clamp(
      cappedSize,
      -resolvedConfig.drawerSize * 0.15,
      resolvedConfig.drawerSize * 1.15,
    );

    recordSample(finalSize);
    resolvedConfig.onDragMove(finalSize);
  }, [recordSample, reset]);

  const endSession = useCallback((cancelled: boolean) => {
    const state = stateRef.current;
    const resolvedConfig = configRef.current;
    if (!state) return;

    const wasDragging = state.dragging;
    const startSnapIndex = state.startSnapIndex;

    if (wasDragging) {
      recordSample(resolvedConfig.getCurrentSize());
    }

    const velocity = wasDragging ? computeVelocity() : 0;
    const currentSize = resolvedConfig.getCurrentSize();
    const fromMinimized = state.fromMinimized;

    reset(state.pointerId);

    if (!wasDragging) return;
    if (cancelled) {
      debugDrawer("drag:end", {
        cancelled: true,
        startSize: state.startSize,
        currentSize,
        velocity,
        startSnapIndex,
        fromMinimized,
      });
      resolvedConfig.onDragEnd(
        fromMinimized
          ? { kind: "minimized" }
          : { kind: "snap", index: startSnapIndex },
      );
      return;
    }

    const target = pickSettleTarget({
      currentSize,
      startSize: state.startSize,
      startSnapIndex,
      fromMinimized,
      velocity,
      snaps: resolvedConfig.snapSizes,
      minimizedSize: resolvedConfig.minimizedSize,
      velocityThreshold: resolvedConfig.velocityThreshold,
      closeThreshold: resolvedConfig.closeThreshold,
      dismissible: resolvedConfig.dismissible,
      snapBehavior: resolvedConfig.snapBehavior,
      snapStepThreshold: resolvedConfig.snapStepThreshold,
      snapSkipThreshold: resolvedConfig.snapSkipThreshold,
    });

    debugDrawer("drag:end", {
      cancelled: false,
      startSize: state.startSize,
      currentSize,
      velocity,
      startSnapIndex,
      fromMinimized,
      target,
    });
    resolvedConfig.onDragEnd(target);
  }, [computeVelocity, recordSample, reset]);

  const bindMouseListeners = useCallback(() => {
    const onMouseMove = (event: MouseEvent) => {
      moveSession(
        getMainCoord(configRef.current.direction, event.clientX, event.clientY),
        getCrossCoord(configRef.current.direction, event.clientX, event.clientY),
        () => event.preventDefault(),
      );
    };

    const onMouseUp = () => endSession(false);
    const onWindowBlur = () => {
      if (!stateRef.current) return;
      endSession(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("blur", onWindowBlur);

    removeWindowListenersRef.current = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [endSession, moveSession]);

  const bindPointerListeners = useCallback(() => {
    const onPointerMove = (event: PointerEvent) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      moveSession(
        getMainCoord(configRef.current.direction, event.clientX, event.clientY),
        getCrossCoord(configRef.current.direction, event.clientX, event.clientY),
        () => {
          if (event.cancelable) event.preventDefault();
        },
      );
    };

    const onPointerUp = (event: PointerEvent) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      endSession(false);
    };

    const onPointerCancel = (event: PointerEvent) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      endSession(true);
    };

    const onWindowBlur = () => {
      if (!stateRef.current) return;
      endSession(true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("blur", onWindowBlur);

    removeWindowListenersRef.current = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [endSession, moveSession]);

  const bindTouchListeners = useCallback(() => {
    const onTouchMove = (event: TouchEvent) => {
      const state = stateRef.current;
      if (!state || state.touchId === undefined) return;
      const touch = getTouchById(event.touches, state.touchId) ?? getTouchById(event.changedTouches, state.touchId);
      if (!touch) return;
      moveSession(
        getMainCoord(configRef.current.direction, touch.clientX, touch.clientY),
        getCrossCoord(configRef.current.direction, touch.clientX, touch.clientY),
        () => {
          if (event.cancelable) event.preventDefault();
        },
      );
    };

    const onTouchEnd = (event: TouchEvent) => {
      const state = stateRef.current;
      if (!state || state.touchId === undefined) return;
      if (!getTouchById(event.changedTouches, state.touchId)) return;
      endSession(false);
    };

    const onTouchCancel = (event: TouchEvent) => {
      const state = stateRef.current;
      if (!state || state.touchId === undefined) return;
      if (!getTouchById(event.changedTouches, state.touchId)) return;
      endSession(true);
    };

    const onWindowBlur = () => {
      if (!stateRef.current) return;
      endSession(true);
    };

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);
    window.addEventListener("blur", onWindowBlur);

    removeWindowListenersRef.current = () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [endSession, moveSession]);

  useEffect(() => () => {
    clearWindowListeners();
    stateRef.current = null;
  }, [clearWindowListeners]);

  const onMouseDown = useCallback((event: ReactMouseEvent) => {
    if (stateRef.current) return;
    if (event.button !== 0) return;
    if (configRef.current.drawerSize <= 0) return;

    const target = event.target instanceof HTMLElement ? event.target : null;
    const resolvedConfig = configRef.current;
    const surface = getDragSurface(
      target,
      resolvedConfig.getContentEl(),
      resolvedConfig.getHandleEl(),
      resolvedConfig.getHeaderEl?.() ?? null,
      resolvedConfig.getScrollableEl(),
      resolvedConfig.dragHandleOnly,
      resolvedConfig.direction,
      "mouse",
    );

    if (!surface) return;
    event.preventDefault();

    beginSession({
      inputType: "mouse",
      source: surface.source,
      captureEl: null,
      startMain: getMainCoord(resolvedConfig.direction, event.clientX, event.clientY),
      startCross: getCrossCoord(resolvedConfig.direction, event.clientX, event.clientY),
      startSize: resolvedConfig.getCurrentSize(),
      startSnapIndex: resolvedConfig.currentSnapIndex,
      fromMinimized: resolvedConfig.fromMinimized,
      axisLocked: false,
      dragging: false,
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }],
    });

    bindMouseListeners();
  }, [beginSession, bindMouseListeners]);

  const onPointerDown = useCallback((event: ReactPointerEvent) => {
    if (stateRef.current) return;
    if (event.pointerType === "mouse" || event.pointerType === "touch") return;
    if (configRef.current.drawerSize <= 0) return;

    const target = event.target instanceof HTMLElement ? event.target : null;
    const resolvedConfig = configRef.current;
    const surface = getDragSurface(
      target,
      resolvedConfig.getContentEl(),
      resolvedConfig.getHandleEl(),
      resolvedConfig.getHeaderEl?.() ?? null,
      resolvedConfig.getScrollableEl(),
      resolvedConfig.dragHandleOnly,
      resolvedConfig.direction,
      "pen",
    );

    if (!surface) return;
    if (event.cancelable) event.preventDefault();

    beginSession({
      inputType: "pen",
      source: surface.source,
      pointerId: event.pointerId,
      captureEl: surface.el,
      startMain: getMainCoord(resolvedConfig.direction, event.clientX, event.clientY),
      startCross: getCrossCoord(resolvedConfig.direction, event.clientX, event.clientY),
      startSize: resolvedConfig.getCurrentSize(),
      startSnapIndex: resolvedConfig.currentSnapIndex,
      fromMinimized: resolvedConfig.fromMinimized,
      axisLocked: false,
      dragging: false,
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }],
    });

    bindPointerListeners();
  }, [beginSession, bindPointerListeners]);

  const onTouchStart = useCallback((event: ReactTouchEvent) => {
    if (stateRef.current) return;
    if (event.touches.length !== 1) return;
    if (configRef.current.drawerSize <= 0) return;

    const touch = event.touches[0];
    const target = event.target instanceof HTMLElement ? event.target : null;
    const resolvedConfig = configRef.current;
    const surface = getDragSurface(
      target,
      resolvedConfig.getContentEl(),
      resolvedConfig.getHandleEl(),
      resolvedConfig.getHeaderEl?.() ?? null,
      resolvedConfig.getScrollableEl(),
      resolvedConfig.dragHandleOnly,
      resolvedConfig.direction,
      "touch",
    );

    if (!surface) return;

    beginSession({
      inputType: "touch",
      source: surface.source,
      touchId: touch.identifier,
      captureEl: null,
      startMain: getMainCoord(resolvedConfig.direction, touch.clientX, touch.clientY),
      startCross: getCrossCoord(resolvedConfig.direction, touch.clientX, touch.clientY),
      startSize: resolvedConfig.getCurrentSize(),
      startSnapIndex: resolvedConfig.currentSnapIndex,
      fromMinimized: resolvedConfig.fromMinimized,
      axisLocked: false,
      dragging: false,
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }],
    });

    bindTouchListeners();
  }, [beginSession, bindTouchListeners]);

  const noop = useCallback(() => {}, []);

  return {
    onMouseDown,
    onPointerDown,
    onTouchStart,
    onPointerMove: noop,
    onPointerUp: noop,
    onPointerCancel: noop,
    onLostPointerCapture: noop,
  };
}
