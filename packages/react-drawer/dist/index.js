import { createContext, forwardRef, useState, useRef, useMemo, useCallback, useLayoutEffect, useEffect, useContext } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@virtari/utils';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Drawer.tsx
var DrawerCtx = createContext(null);
var DrawerProvider = DrawerCtx.Provider;
function useDrawerContext() {
  const ctx = useContext(DrawerCtx);
  if (!ctx) {
    throw new Error("Drawer compound components must be used within <Drawer>");
  }
  return ctx;
}

// src/utils.ts
var RUBBERBAND_CONSTANT = 0.2;
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function getAxis(direction) {
  return direction === "left" || direction === "right" ? "x" : "y";
}
function getDirectionSign(direction) {
  return direction === "bottom" || direction === "right" ? -1 : 1;
}
function getCoordinate(direction, clientX, clientY) {
  return getAxis(direction) === "x" ? clientX : clientY;
}
function getCrossCoordinate(direction, clientX, clientY) {
  return getAxis(direction) === "x" ? clientY : clientX;
}
function getViewportSize(direction) {
  if (typeof window === "undefined") {
    return 0;
  }
  const viewport = window.visualViewport;
  const size = getAxis(direction) === "x" ? viewport?.width ?? window.innerWidth : viewport?.height ?? window.innerHeight;
  return Math.max(size, 0);
}
function getElementSize(element, direction) {
  if (!element) {
    return 0;
  }
  return getAxis(direction) === "x" ? element.offsetWidth : element.offsetHeight;
}
function getTranslateValue(direction, drawerSize, progress) {
  const clampedProgress = clamp(progress, -0.15, 1.15);
  const offset = drawerSize * (1 - clampedProgress);
  switch (direction) {
    case "bottom":
      return `translate3d(0, ${offset}px, 0)`;
    case "top":
      return `translate3d(0, ${-offset}px, 0)`;
    case "right":
      return `translate3d(${offset}px, 0, 0)`;
    case "left":
      return `translate3d(${-offset}px, 0, 0)`;
  }
}
function resolveSnapPoints(snapPoints, drawerSize) {
  if (drawerSize <= 0) {
    return [];
  }
  const resolved = (snapPoints?.length ? snapPoints : [1]).map((point) => {
    const size = point <= 1 ? point * drawerSize : point;
    return {
      value: point,
      size: clamp(size, 1, drawerSize)
    };
  }).sort((a, b) => a.size - b.size);
  const unique = [];
  for (const point of resolved) {
    if (unique.length === 0 || Math.abs(point.size - unique[unique.length - 1].size) > 0.5) {
      unique.push(point);
    }
  }
  return unique.length ? unique : [{ value: 1, size: drawerSize }];
}
function getBackgroundStyles(progress) {
  const clampedProgress = clamp(progress, 0, 1);
  const scale = 1 - clampedProgress * 0.06;
  const radius = clampedProgress * 18;
  return {
    transform: `scale(${scale})`,
    borderRadius: `${radius}px`
  };
}
function rubberband(distance, dimension) {
  if (dimension <= 0 || distance <= 0) {
    return 0;
  }
  return distance * dimension * RUBBERBAND_CONSTANT / (dimension + RUBBERBAND_CONSTANT * distance);
}
function applyRubberband(progress, drawerSize) {
  if (progress < 0) {
    return -rubberband(Math.abs(progress) * drawerSize, drawerSize) / drawerSize;
  }
  if (progress > 1) {
    return 1 + rubberband((progress - 1) * drawerSize, drawerSize) / drawerSize;
  }
  return progress;
}
function findNearestSnapIndex(targetSize, snapSizes, candidates) {
  const pool = candidates?.length ? candidates : snapSizes.map((_, index) => index);
  let closestIndex = pool[0] ?? 0;
  let closestDistance = Math.abs(targetSize - (snapSizes[closestIndex] ?? 0));
  for (const index of pool.slice(1)) {
    const distance = Math.abs(targetSize - (snapSizes[index] ?? 0));
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }
  return closestIndex;
}
function isScrolledToDragEdge(element, direction) {
  if (!element) {
    return true;
  }
  switch (direction) {
    case "bottom":
      return element.scrollTop <= 1;
    case "top":
      return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    case "left":
      return element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
    case "right":
      return element.scrollLeft <= 1;
  }
}

// src/useDrawerGesture.ts
var AXIS_LOCK_THRESHOLD = 8;
var PROJECTION_MS = 180;
function isTargetWithinElement(target, element) {
  if (!target || !element) {
    return false;
  }
  return element.contains(target);
}
function useDrawerGesture(config) {
  const stateRef = useRef(null);
  const resetState = useCallback((pointerId) => {
    const state = stateRef.current;
    if (!state) {
      return;
    }
    const contentEl = config.getContentEl();
    if (contentEl && (pointerId === void 0 || contentEl.hasPointerCapture(pointerId))) {
      try {
        contentEl.releasePointerCapture(pointerId ?? state.pointerId);
      } catch {
      }
    }
    stateRef.current = null;
  }, [config]);
  const onPointerDown = useCallback((e) => {
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
      lastSampleTime: performance.now()
    };
  }, [config]);
  const onPointerMove = useCallback((e) => {
    const state = stateRef.current;
    if (!state || state.pointerId !== e.pointerId) {
      return;
    }
    const axis = getAxis(config.direction);
    const mainDelta = axis === "x" ? e.clientX - state.startX : e.clientY - state.startY;
    const crossDelta = getCrossCoordinate(config.direction, e.clientX, e.clientY) - getCrossCoordinate(config.direction, state.startX, state.startY);
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
    const progress = state.startProgress + (coord - state.startCoord) * getDirectionSign(config.direction) / config.drawerSize;
    state.lastSampleCoord = coord;
    state.lastSampleTime = performance.now();
    config.onDragProgress(applyRubberband(progress, config.drawerSize));
  }, [config, resetState]);
  const onPointerUp = useCallback((e) => {
    const state = stateRef.current;
    if (!state || state.pointerId !== e.pointerId) {
      return;
    }
    const now = performance.now();
    const coord = getCoordinate(config.direction, e.clientX, e.clientY);
    const velocity = (coord - state.lastSampleCoord) / Math.max(now - state.lastSampleTime, 1);
    const openVelocity = velocity * getDirectionSign(config.direction);
    const rawProgress = state.startProgress + (coord - state.startCoord) * getDirectionSign(config.direction) / config.drawerSize;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
    const currentSize = clampedProgress * config.drawerSize;
    const projectedSize = currentSize + openVelocity * PROJECTION_MS;
    const smallestSnap = config.snapSizes[0] ?? config.drawerSize;
    resetState(e.pointerId);
    if (!state.dragging) {
      return;
    }
    config.onDragEnd();
    const canDismiss = config.dismissible && (config.snapSizes.length <= 1 || state.startSnapIndex === 0);
    const dismissThreshold = smallestSnap * config.closeThreshold;
    const isFastDismiss = openVelocity < -config.velocityThreshold && currentSize < smallestSnap * 0.9;
    if (canDismiss && (projectedSize <= dismissThreshold || isFastDismiss)) {
      config.onDismiss();
      return;
    }
    const candidateIndexes = [state.startSnapIndex];
    if (projectedSize > (config.snapSizes[state.startSnapIndex] ?? config.drawerSize) && state.startSnapIndex < config.snapSizes.length - 1) {
      candidateIndexes.push(state.startSnapIndex + 1);
    }
    if (projectedSize < (config.snapSizes[state.startSnapIndex] ?? config.drawerSize) && state.startSnapIndex > 0) {
      candidateIndexes.push(state.startSnapIndex - 1);
    }
    const targetIndex = findNearestSnapIndex(projectedSize, config.snapSizes, candidateIndexes);
    config.onSnap(targetIndex);
  }, [config, resetState]);
  const onPointerCancel = useCallback((e) => {
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
  const onLostPointerCapture = useCallback((e) => {
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
    onLostPointerCapture
  };
}
var TRANSITION_MS = 280;
var EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";
var VIEWPORT_SIZE_RATIO = 0.96;
function composeEventHandlers(userHandler, internalHandler) {
  return (event) => {
    userHandler?.(event);
    const defaultPrevented = typeof event === "object" && event !== null && "defaultPrevented" in event && Boolean(event.defaultPrevented);
    if (!defaultPrevented) {
      internalHandler(event);
    }
  };
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }
      if (typeof ref === "function") {
        ref(node);
        continue;
      }
      ref.current = node;
    }
  };
}
function getWrapperElement() {
  if (typeof document === "undefined") {
    return null;
  }
  return document.querySelector("[data-vds-drawer-wrapper]");
}
function setTransition(element, transition) {
  if (element) {
    element.style.transition = transition;
  }
}
function normalizeSnapPoints(snapPoints, minimizedSize) {
  const basePoints = snapPoints?.length ? [...snapPoints] : [1];
  const next = minimizedSize !== void 0 ? [minimizedSize, ...basePoints] : basePoints;
  return [...new Set(next)];
}
function Drawer({
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
  preventAutoFocus = true
}) {
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const bodyRef = useRef(null);
  const handleRef = useRef(null);
  const closeTimerRef = useRef(0);
  const resolvedSnapPoints = useMemo(
    () => normalizeSnapPoints(snapPoints, minimizedSize),
    [minimizedSize, snapPoints]
  );
  const resolvedDefaultSnapPoint = defaultSnapPoint ?? snapPoints?.[snapPoints.length - 1] ?? 1;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalSnapPoint, setInternalSnapPoint] = useState(resolvedDefaultSnapPoint);
  const [present, setPresent] = useState(controlledOpen ?? defaultOpen);
  const [dragging, setDragging] = useState(false);
  const isOpenControlled = controlledOpen !== void 0;
  const isSnapControlled = controlledActiveSnapPoint !== void 0;
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const activeSnapPoint = isSnapControlled ? controlledActiveSnapPoint ?? resolvedDefaultSnapPoint : internalSnapPoint;
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
  const handleOpenChange = useCallback((nextOpen) => {
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
  const handleSnapPointChange = useCallback((nextValue) => {
    if (!isSnapControlled) {
      setInternalSnapPoint(nextValue);
    }
    onActiveSnapPointChange?.(nextValue);
  }, [isSnapControlled, onActiveSnapPointChange]);
  return /* @__PURE__ */ jsx(
    DrawerProvider,
    {
      value: {
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
        setDragging
      },
      children: /* @__PURE__ */ jsx(DialogPrimitive.Root, { open, onOpenChange: handleOpenChange, modal, children })
    }
  );
}
var DrawerTrigger = DialogPrimitive.Trigger;
var DrawerClose = DialogPrimitive.Close;
var DrawerOverlay = forwardRef(function DrawerOverlay2({ className, ...props }, forwardedRef) {
  const { overlayRef, open } = useDrawerContext();
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      ref: mergeRefs(overlayRef, forwardedRef),
      className: cn("vds-drawer-overlay", className),
      "data-open": open || void 0,
      ...props
    }
  );
});
var DrawerContent = forwardRef(function DrawerContent2({
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
}, forwardedRef) {
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
    velocityThreshold
  } = useDrawerContext();
  const [layout, setLayout] = useState({
    availableSize: 0,
    drawerSize: 0,
    snapEntries: []
  });
  const currentProgressRef = useRef(0);
  const openAnimationRef = useRef(0);
  const resizeFrameRef = useRef(0);
  const hasOpenedRef = useRef(false);
  const activeSnapIndex = useMemo(() => {
    const index = layout.snapEntries.findIndex((entry) => entry.value === activeSnapPoint);
    return index === -1 ? Math.max(layout.snapEntries.length - 1, 0) : index;
  }, [activeSnapPoint, layout.snapEntries]);
  const setAnimated = useCallback((enabled) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperElement();
    const motion = enabled ? `transform ${TRANSITION_MS}ms ${EASE_CSS}` : "none";
    const overlayMotion = enabled ? `opacity ${TRANSITION_MS}ms ${EASE_CSS}` : "none";
    const wrapperMotion = enabled ? `transform ${TRANSITION_MS}ms ${EASE_CSS}, border-radius ${TRANSITION_MS}ms ${EASE_CSS}` : "none";
    setTransition(contentEl, motion);
    setTransition(overlayEl, overlayMotion);
    if (scaleBackground) {
      setTransition(wrapperEl, wrapperMotion);
    }
  }, [contentRef, overlayRef, scaleBackground]);
  const applyProgress = useCallback((progress) => {
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
  const syncToSnapPoint = useCallback((animated) => {
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
      const unchanged = current.availableSize === next.availableSize && current.drawerSize === next.drawerSize && current.snapEntries.length === next.snapEntries.length && current.snapEntries.every(
        (point, index) => point.value === next.snapEntries[index]?.value && point.size === next.snapEntries[index]?.size
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
    getScrollableEl: () => bodyRef.current ?? contentRef.current
  });
  return /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { forceMount: present ? true : void 0, children: [
    /* @__PURE__ */ jsx(DrawerOverlay, { forceMount: present ? true : void 0 }),
    /* @__PURE__ */ jsx(
      DialogPrimitive.Content,
      {
        forceMount: present ? true : void 0,
        ref: mergeRefs(contentRef, forwardedRef),
        className: cn("vds-drawer-content", className),
        "data-direction": direction,
        "data-open": open || void 0,
        "data-dragging": dragging || void 0,
        "data-size-mode": sizeMode,
        onOpenAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
          if (preventAutoFocus) {
            event.preventDefault();
          }
        }),
        onEscapeKeyDown: composeEventHandlers(onEscapeKeyDown, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        }),
        onPointerDownOutside: composeEventHandlers(onPointerDownOutside, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        }),
        onInteractOutside: composeEventHandlers(onInteractOutside, (event) => {
          if (!dismissible) {
            event.preventDefault();
          }
        }),
        onPointerDown: composeEventHandlers(onPointerDown, gesture.onPointerDown),
        onPointerMove: composeEventHandlers(onPointerMove, gesture.onPointerMove),
        onPointerUp: composeEventHandlers(onPointerUp, gesture.onPointerUp),
        onPointerCancel: composeEventHandlers(onPointerCancel, gesture.onPointerCancel),
        onLostPointerCapture: composeEventHandlers(
          onLostPointerCapture,
          gesture.onLostPointerCapture
        ),
        ...props,
        children
      }
    )
  ] });
});
var DrawerHandle = forwardRef(function DrawerHandle2({ className, ...props }, forwardedRef) {
  const { direction, handleRef } = useDrawerContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: mergeRefs(handleRef, forwardedRef),
      className: cn("vds-drawer-handle", className),
      "data-direction": direction,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "vds-drawer-handle-bar" })
    }
  );
});
var DrawerTitle = forwardRef(function DrawerTitle2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      ref: forwardedRef,
      className: cn("vds-drawer-title", className),
      ...props
    }
  );
});
var DrawerDescription = forwardRef(function DrawerDescription2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      ref: forwardedRef,
      className: cn("vds-drawer-description", className),
      ...props
    }
  );
});
var DrawerBody = forwardRef(function DrawerBody2({ className, ...props }, forwardedRef) {
  const { bodyRef } = useDrawerContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: mergeRefs(bodyRef, forwardedRef),
      className: cn("vds-drawer-body", className),
      "data-vds-drawer-scroll-region": "",
      ...props
    }
  );
});
var DrawerFooter = forwardRef(function DrawerFooter2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: forwardedRef,
      className: cn("vds-drawer-footer", className),
      ...props
    }
  );
});

export { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHandle, DrawerOverlay, DrawerTitle, DrawerTrigger };
