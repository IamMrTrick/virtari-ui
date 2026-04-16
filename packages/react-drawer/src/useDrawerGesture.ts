import { useCallback, useRef } from "react";
import {
  applyRubberband,
  findNearestSnapIndex,
  getAxis,
  getCoordinate,
  getCrossCoordinate,
  getDirectionSign,
  isScrolledToDragEdge,
} from "./utils";
import type { Direction } from "./utils";

const AXIS_LOCK_THRESHOLD = 8;
const PROJECTION_MS = 180;

export interface GestureConfig {
  direction: Direction;
  drawerSize: number;
  snapSizes: readonly number[];
  currentSnapIndex: number;
  getCurrentProgress: () => number;
  closeThreshold: number;
  velocityThreshold: number;
  dismissible: boolean;
  dragHandleOnly: boolean;
  onDragStart: () => void;
  onDragProgress: (progress: number) => void;
  onDragCancel: () => void;
  onDragEnd: () => void;
  onSnap: (snapIndex: number) => void;
  onDismiss: () => void;
  getContentEl: () => HTMLElement | null;
  getHandleEl: () => HTMLElement | null;
  getScrollableEl: () => HTMLElement | null;
}

interface PointerState {
  pointerId: number;
  startX: number;
  startY: number;
  startCoord: number;
  startProgress: number;
  startSnapIndex: number;
  dragging: boolean;
  axisLocked: boolean;
  target: HTMLElement | null;
  lastSampleCoord: number;
  lastSampleTime: number;
}

function isTargetWithinElement(target: HTMLElement | null, element: HTMLElement | null): boolean {
  if (!target || !element) {
    return false;
  }

  return element.contains(target);
}

export function useDrawerGesture(config: GestureConfig) {
  const stateRef = useRef<PointerState | null>(null);

  const resetState = useCallback((pointerId?: number) => {
    const state = stateRef.current;

    if (!state) {
      return;
    }

    const contentEl = config.getContentEl();
    if (contentEl && (pointerId === undefined || contentEl.hasPointerCapture(pointerId))) {
      try {
        contentEl.releasePointerCapture(pointerId ?? state.pointerId);
      } catch {
        // Pointer capture might already be released.
      }
    }

    stateRef.current = null;
  }, [config]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (stateRef.current || e.button !== 0 || config.drawerSize <= 0) {
      return;
    }

    const target = e.target instanceof HTMLElement ? e.target : null;
    const handleEl = config.getHandleEl();

    if (config.dragHandleOnly && !isTargetWithinElement(target, handleEl)) {
      return;
    }

    const contentEl = config.getContentEl();
    if (!contentEl) {
      return;
    }

    contentEl.setPointerCapture(e.pointerId);

    stateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startCoord: getCoordinate(config.direction, e.clientX, e.clientY),
      startProgress: config.getCurrentProgress(),
      startSnapIndex: config.currentSnapIndex,
      dragging: false,
      axisLocked: false,
      target,
      lastSampleCoord: getCoordinate(config.direction, e.clientX, e.clientY),
      lastSampleTime: performance.now(),
    };
  }, [config]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const state = stateRef.current;

    if (!state || state.pointerId !== e.pointerId) {
      return;
    }

    const axis = getAxis(config.direction);
    const mainDelta = axis === "x" ? e.clientX - state.startX : e.clientY - state.startY;
    const crossDelta = getCrossCoordinate(config.direction, e.clientX, e.clientY) -
      getCrossCoordinate(config.direction, state.startX, state.startY);

    if (!state.axisLocked) {
      if (Math.abs(mainDelta) < AXIS_LOCK_THRESHOLD) {
        return;
      }

      if (Math.abs(crossDelta) > Math.abs(mainDelta)) {
        resetState(e.pointerId);
        return;
      }

      const handleEl = config.getHandleEl();
      const scrollableEl = config.getScrollableEl();
      const shouldBypassScrollGuard = isTargetWithinElement(state.target, handleEl);

      if (!shouldBypassScrollGuard && !isScrolledToDragEdge(scrollableEl, config.direction)) {
        resetState(e.pointerId);
        return;
      }

      state.axisLocked = true;
    }

    e.preventDefault();

    if (!state.dragging) {
      state.dragging = true;
      config.onDragStart();
    }

    const coord = getCoordinate(config.direction, e.clientX, e.clientY);
    const progress = state.startProgress +
      ((coord - state.startCoord) * getDirectionSign(config.direction)) / config.drawerSize;

    state.lastSampleCoord = coord;
    state.lastSampleTime = performance.now();

    config.onDragProgress(applyRubberband(progress, config.drawerSize));
  }, [config, resetState]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const state = stateRef.current;

    if (!state || state.pointerId !== e.pointerId) {
      return;
    }

    const now = performance.now();
    const coord = getCoordinate(config.direction, e.clientX, e.clientY);
    const velocity = (coord - state.lastSampleCoord) / Math.max(now - state.lastSampleTime, 1);
    const openVelocity = velocity * getDirectionSign(config.direction);
    const rawProgress = state.startProgress +
      ((coord - state.startCoord) * getDirectionSign(config.direction)) / config.drawerSize;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
    const currentSize = clampedProgress * config.drawerSize;
    const projectedSize = currentSize + openVelocity * PROJECTION_MS;
    const smallestSnap = config.snapSizes[0] ?? config.drawerSize;

    resetState(e.pointerId);

    if (!state.dragging) {
      return;
    }

    config.onDragEnd();

    const canDismiss = config.dismissible &&
      (config.snapSizes.length <= 1 || state.startSnapIndex === 0);
    const dismissThreshold = smallestSnap * config.closeThreshold;
    const isFastDismiss = openVelocity < -config.velocityThreshold &&
      currentSize < smallestSnap * 0.9;

    if (canDismiss && (projectedSize <= dismissThreshold || isFastDismiss)) {
      config.onDismiss();
      return;
    }

    const candidateIndexes = [state.startSnapIndex];
    if (projectedSize > (config.snapSizes[state.startSnapIndex] ?? config.drawerSize) &&
      state.startSnapIndex < config.snapSizes.length - 1) {
      candidateIndexes.push(state.startSnapIndex + 1);
    }
    if (projectedSize < (config.snapSizes[state.startSnapIndex] ?? config.drawerSize) &&
      state.startSnapIndex > 0) {
      candidateIndexes.push(state.startSnapIndex - 1);
    }

    const targetIndex = findNearestSnapIndex(projectedSize, config.snapSizes, candidateIndexes);
    config.onSnap(targetIndex);
  }, [config, resetState]);

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    const state = stateRef.current;

    if (!state || state.pointerId !== e.pointerId) {
      return;
    }

    const wasDragging = state.dragging;
    resetState(e.pointerId);

    if (wasDragging) {
      config.onDragEnd();
      config.onDragCancel();
    }
  }, [config, resetState]);

  const onLostPointerCapture = useCallback((e: React.PointerEvent) => {
    const state = stateRef.current;

    if (!state || state.pointerId !== e.pointerId) {
      return;
    }

    const wasDragging = state.dragging;
    resetState(e.pointerId);

    if (wasDragging) {
      config.onDragEnd();
      config.onDragCancel();
    }
  }, [config, resetState]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture,
  };
}
