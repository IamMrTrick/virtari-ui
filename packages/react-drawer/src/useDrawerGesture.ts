import { useCallback, useRef } from "react";
import {
  type Direction,
  getAxis,
  deltaToProgress,
  isScrolledToEdge,
  findSnapTarget,
  resolveSnapPoints,
  getTranslateValue,
  getBackgroundStyles,
  clamp,
} from "./utils";

export interface GestureConfig {
  direction: Direction;
  drawerSize: number;
  snapPoints: number[];
  currentSnapIndex: number;
  threshold: number;
  velocityThreshold: number;
  dismissible: boolean;
  scaleBackground: boolean;
  onProgressChange: (progress: number) => void;
  onSnap: (snapIndex: number) => void;
  onDismiss: () => void;
  getContentEl: () => HTMLElement | null;
  getOverlayEl: () => HTMLElement | null;
  getScrollableEl: () => HTMLElement | null;
  getWrapperEl: () => HTMLElement | null;
}

interface PointerState {
  pointerId: number;
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  isAxisLocked: boolean;
  lockedAxis: "x" | "y" | null;
  startProgress: number;
  lastMoveTime: number;
  lastDelta: number;
}

export function useDrawerGesture(config: GestureConfig) {
  const stateRef = useRef<PointerState | null>(null);
  const scrollGraceRef = useRef(false);
  const rafRef = useRef<number>(0);

  const applyTransform = useCallback(
    (progress: number) => {
      const contentEl = config.getContentEl();
      const overlayEl = config.getOverlayEl();
      const wrapperEl = config.getWrapperEl();

      if (contentEl) {
        contentEl.style.transform = getTranslateValue(
          config.direction,
          config.drawerSize,
          progress,
        );
      }

      if (overlayEl) {
        overlayEl.style.opacity = String(clamp(progress, 0, 1));
      }

      if (config.scaleBackground && wrapperEl) {
        const bg = getBackgroundStyles(clamp(progress, 0, 1));
        wrapperEl.style.transform = bg.transform;
        wrapperEl.style.borderRadius = bg.borderRadius;
      }
    },
    [config],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only track primary pointer (ignore multi-touch after first)
      if (stateRef.current) return;
      if (e.button !== 0) return;

      const contentEl = config.getContentEl();
      if (contentEl) {
        contentEl.style.willChange = "transform";
        contentEl.setAttribute("data-dragging", "");
      }

      stateRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startTime: Date.now(),
        currentX: e.clientX,
        currentY: e.clientY,
        isDragging: false,
        isAxisLocked: false,
        lockedAxis: null,
        startProgress: 1, // fully open
        lastMoveTime: Date.now(),
        lastDelta: 0,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [config],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== e.pointerId) return;

      state.currentX = e.clientX;
      state.currentY = e.clientY;

      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Axis lock after 10px of movement
      if (!state.isAxisLocked) {
        const totalDist = Math.sqrt(dx * dx + dy * dy);
        if (totalDist < 10) return;

        const drawerAxis = getAxis(config.direction);
        const dominantAxis = absDx > absDy ? "x" : "y";

        // If dominant axis doesn't match drawer axis, don't drag
        if (dominantAxis !== drawerAxis) {
          stateRef.current = null;
          const contentEl = config.getContentEl();
          if (contentEl) {
            contentEl.style.willChange = "";
            contentEl.removeAttribute("data-dragging");
          }
          return;
        }

        // Check if scrollable content is at edge
        const scrollableEl = config.getScrollableEl();
        if (!isScrolledToEdge(scrollableEl, config.direction)) {
          if (!scrollGraceRef.current) {
            stateRef.current = null;
            const contentEl = config.getContentEl();
            if (contentEl) {
              contentEl.style.willChange = "";
              contentEl.removeAttribute("data-dragging");
            }
            return;
          }
        }

        state.isAxisLocked = true;
        state.lockedAxis = drawerAxis;
        state.startX = e.clientX;
        state.startY = e.clientY;
        state.startTime = Date.now();
      }

      if (!state.isAxisLocked) return;

      e.preventDefault();
      state.isDragging = true;

      const delta = state.lockedAxis === "x"
        ? e.clientX - state.startX
        : e.clientY - state.startY;

      state.lastDelta = delta;
      state.lastMoveTime = Date.now();

      // Calculate progress from snap point
      const snapsPx = resolveSnapPoints(config.snapPoints, config.drawerSize);
      const currentSnapPx = snapsPx[config.currentSnapIndex] ?? config.drawerSize;
      const currentProgress = currentSnapPx / config.drawerSize;
      const progress = deltaToProgress(config.direction, delta, config.drawerSize);
      const adjustedProgress = clamp(
        currentProgress - (currentProgress - progress),
        0,
        1.08,
      );

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyTransform(adjustedProgress);
        config.onProgressChange(adjustedProgress);
      });
    },
    [config, applyTransform],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== e.pointerId) return;

      cancelAnimationFrame(rafRef.current);

      const contentEl = config.getContentEl();
      if (contentEl) {
        contentEl.style.willChange = "";
        contentEl.removeAttribute("data-dragging");
      }

      if (!state.isDragging) {
        stateRef.current = null;
        return;
      }

      // Calculate velocity (px/ms)
      const elapsed = Math.max(Date.now() - state.lastMoveTime, 1);
      const velocity = state.lastDelta / elapsed;
      const absVelocity = Math.abs(velocity);

      // Current position as pixels
      const delta = state.lockedAxis === "x"
        ? e.clientX - state.startX
        : e.clientY - state.startY;

      const snapsPx = resolveSnapPoints(config.snapPoints, config.drawerSize);
      const currentSnapPx = snapsPx[config.currentSnapIndex] ?? config.drawerSize;
      const currentPosPx = currentSnapPx + delta * (config.direction === "bottom" || config.direction === "right" ? -1 : 1);

      // Check velocity-based dismiss
      const isClosingDirection =
        (config.direction === "bottom" && velocity > 0) ||
        (config.direction === "top" && velocity < 0) ||
        (config.direction === "right" && velocity > 0) ||
        (config.direction === "left" && velocity < 0);

      if (
        config.dismissible &&
        isClosingDirection &&
        absVelocity > config.velocityThreshold
      ) {
        stateRef.current = null;
        config.onDismiss();
        return;
      }

      // Check threshold-based dismiss
      if (
        config.dismissible &&
        currentPosPx < config.drawerSize * config.threshold
      ) {
        stateRef.current = null;
        config.onDismiss();
        return;
      }

      // Find snap target
      const targetPx = findSnapTarget(
        currentPosPx,
        velocity * (config.direction === "bottom" || config.direction === "right" ? -1 : 1),
        snapsPx,
      );
      const targetIndex = snapsPx.indexOf(targetPx);

      stateRef.current = null;

      if (targetIndex !== -1) {
        config.onSnap(targetIndex);
      }
    },
    [config],
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      if (stateRef.current?.pointerId === e.pointerId) {
        const contentEl = config.getContentEl();
        if (contentEl) {
          contentEl.style.willChange = "";
          contentEl.removeAttribute("data-dragging");
        }
        stateRef.current = null;
      }
    },
    [config],
  );

  /** Call when scroll velocity is high (prevent accidental close for 100ms) */
  const setScrollGrace = useCallback(() => {
    scrollGraceRef.current = true;
    setTimeout(() => {
      scrollGraceRef.current = false;
    }, 100);
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    applyTransform,
    setScrollGrace,
  };
}
