"use client";
'use strict';

var react = require('react');
var DialogPrimitive = require('@radix-ui/react-dialog');
var utils = require('@virtari/utils');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);

// src/Drawer.tsx
var DrawerCtx = react.createContext(null);
var DrawerProvider = DrawerCtx.Provider;
function useDrawerContext() {
  const ctx = react.useContext(DrawerCtx);
  if (!ctx) {
    throw new Error("Drawer compound components must be used within <Drawer>");
  }
  return ctx;
}

// src/utils.ts
var RUBBERBAND_K = 0.55;
var DEFAULT_SIDE_ADAPTIVE_SIZE = "clamp(18rem, 32vw, 28rem)";
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function isDrawerDebugEnabled() {
  return typeof window !== "undefined" && window.__VDS_DRAWER_DEBUG__ === true;
}
function debugDrawer(event, payload) {
  if (!isDrawerDebugEnabled()) return;
  console.info(`[vds-drawer] ${event}`, payload);
}
function getAxis(direction) {
  return direction === "left" || direction === "right" ? "x" : "y";
}
function getMainCoord(direction, x, y) {
  return getAxis(direction) === "x" ? x : y;
}
function getCrossCoord(direction, x, y) {
  return getAxis(direction) === "x" ? y : x;
}
function getOpenSign(direction) {
  return direction === "top" || direction === "left" ? 1 : -1;
}
function getViewportRect() {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  const vv = window.visualViewport;
  return {
    width: vv?.width ?? window.innerWidth,
    height: vv?.height ?? window.innerHeight
  };
}
function getViewportSize(direction) {
  const viewport = getViewportRect();
  return getAxis(direction) === "x" ? viewport.width : viewport.height;
}
function getViewportInfo(direction, availableSize) {
  const viewport = getViewportRect();
  return {
    direction,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
    availableSize,
    orientation: viewport.width >= viewport.height ? "landscape" : "portrait"
  };
}
function getElementSize(el, direction) {
  if (!el) return 0;
  const axis = getAxis(direction);
  const rect = el.getBoundingClientRect();
  const computed = getComputedStyle(el);
  const rectSize = axis === "x" ? rect.width : rect.height;
  const offsetSize = axis === "x" ? el.offsetWidth : el.offsetHeight;
  const clientSize = axis === "x" ? el.clientWidth : el.clientHeight;
  const scrollSize = axis === "x" ? el.scrollWidth : el.scrollHeight;
  const computedSize = parseFloat(axis === "x" ? computed.width : computed.height);
  return Math.max(
    rectSize || 0,
    offsetSize || 0,
    clientSize || 0,
    scrollSize || 0,
    Number.isFinite(computedSize) ? computedSize : 0
  );
}
function getTranslate(direction, openPx, totalPx) {
  const offset = Math.max(totalPx - openPx, 0);
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
function getStretchScale(openPx, totalPx) {
  if (totalPx <= 0 || openPx <= totalPx) return 1;
  const extraOpen = openPx - totalPx;
  const maxStretchPx = clamp(totalPx * 0.035, 8, 16);
  const stretchPx = Math.min(extraOpen, maxStretchPx);
  return (totalPx + stretchPx) / totalPx;
}
function getVisualTransform(direction, openPx, totalPx, options) {
  const translate = getTranslate(direction, openPx, totalPx);
  const stretchScale = options?.disableStretch ? 1 : getStretchScale(openPx, totalPx);
  if (getAxis(direction) === "x") {
    return `${translate} scale3d(${stretchScale}, 1, 1)`;
  }
  return `${translate} scale3d(1, ${stretchScale}, 1)`;
}
function resolveSnapSize(value, drawerSize) {
  const size = value <= 1 && value >= 0 ? value * drawerSize : value;
  return clamp(size, 1, drawerSize);
}
function resolveSnaps(snapPoints, drawerSize, minimizedSize) {
  if (drawerSize <= 0) return { snaps: [], minimized: null };
  const points = snapPoints?.length ? [...snapPoints] : [1];
  const resolvedSnaps = points.map((value) => {
    const size = resolveSnapSize(value, drawerSize);
    return { value, size, kind: "snap" };
  }).sort((a, b) => a.size - b.size);
  const uniqueSnaps = [];
  for (const point of resolvedSnaps) {
    const last = uniqueSnaps[uniqueSnaps.length - 1];
    if (!last || Math.abs(point.size - last.size) > 1) {
      uniqueSnaps.push(point);
    }
  }
  const snaps = uniqueSnaps.length ? uniqueSnaps : [{ value: 1, size: drawerSize, kind: "snap" }];
  let minimized = null;
  if (minimizedSize !== void 0) {
    const size = resolveSnapSize(minimizedSize, drawerSize);
    const collidesWithSnap = snaps.some((snap) => Math.abs(snap.size - size) <= 1);
    if (!collidesWithSnap) {
      minimized = { value: minimizedSize, size, kind: "minimized" };
    }
  }
  return { snaps, minimized };
}
function findSnapIndexByValue(snaps, value) {
  return snaps.findIndex((snap) => snap.value === value);
}
function findNearestSnapIndex(snaps, size) {
  if (!snaps.length) return 0;
  let bestIndex = 0;
  let bestDistance = Math.abs(snaps[0] - size);
  for (let index = 1; index < snaps.length; index++) {
    const distance = Math.abs(snaps[index] - size);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}
function getOverlayProgress(size, totalSize, startSize = 0) {
  if (totalSize <= 0) return 0;
  if (totalSize <= startSize + 1) return size > startSize ? 1 : 0;
  return clamp((size - startSize) / (totalSize - startSize), 0, 1);
}
function resolveDeclaredSize(value, info) {
  if (value === void 0) return void 0;
  const resolved = typeof value === "function" ? value(info) : value;
  return typeof resolved === "number" ? `${resolved}px` : resolved;
}
function resolveDirectionalValue(value, direction) {
  if (value === void 0) return void 0;
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value[direction];
  }
  return value;
}
function resolveDeclaredPixels(value, info, direction) {
  const resolved = resolveDeclaredSize(value, info);
  if (!resolved) return 0;
  const trimmed = resolved.trim();
  if (!trimmed) return 0;
  if (/^-?\d+(\.\d+)?px$/i.test(trimmed)) return parseFloat(trimmed);
  if (/^-?\d+(\.\d+)?$/i.test(trimmed)) return parseFloat(trimmed);
  if (typeof document === "undefined") {
    const parsed = parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const probe = document.createElement("div");
  probe.style.position = "fixed";
  probe.style.inset = "0 auto auto 0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.padding = "0";
  probe.style.margin = "0";
  probe.style.border = "0";
  if (getAxis(direction) === "x") {
    probe.style.width = trimmed;
    probe.style.height = "0";
  } else {
    probe.style.height = trimmed;
    probe.style.width = "0";
  }
  document.body.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();
  return getAxis(direction) === "x" ? rect.width : rect.height;
}
function getDefaultAdaptiveSize(direction) {
  return getAxis(direction) === "x" ? DEFAULT_SIDE_ADAPTIVE_SIZE : "auto";
}
function rubberband(distance, dimension) {
  if (dimension <= 0 || distance <= 0) return 0;
  return distance * dimension * RUBBERBAND_K / (dimension + RUBBERBAND_K * distance);
}
function applyRubberband(openPx, drawerSize) {
  if (openPx > drawerSize) {
    return drawerSize + rubberband(openPx - drawerSize, drawerSize);
  }
  if (openPx < 0) {
    return -rubberband(-openPx, drawerSize);
  }
  return openPx;
}
function getBackgroundStyles(progress) {
  const p = clamp(progress, 0, 1);
  return {
    transform: `scale(${1 - p * 0.06})`,
    borderRadius: `${p * 24}px`
  };
}
function isAtScrollEdge(el, direction, closingDelta) {
  if (!el) return true;
  const tolerance = 1;
  if (getAxis(direction) === "y") {
    if (el.scrollHeight <= el.clientHeight + tolerance) return true;
    if (direction === "bottom") {
      return closingDelta >= 0 ? el.scrollTop <= tolerance : el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance;
    }
    return closingDelta >= 0 ? el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance : el.scrollTop <= tolerance;
  }
  if (el.scrollWidth <= el.clientWidth + tolerance) return true;
  if (direction === "right") {
    return closingDelta >= 0 ? el.scrollLeft <= tolerance : el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance;
  }
  return closingDelta >= 0 ? el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance : el.scrollLeft <= tolerance;
}
function pickSettleTarget(args) {
  const {
    currentSize,
    startSize,
    startSnapIndex,
    fromMinimized,
    velocity,
    snaps,
    minimizedSize,
    velocityThreshold,
    closeThreshold,
    dismissible,
    snapBehavior,
    snapStepThreshold,
    snapSkipThreshold
  } = args;
  const projectionMs = 220;
  const projected = currentSize + velocity * projectionMs;
  const fastSwipe = Math.abs(velocity) >= velocityThreshold;
  const decide = (target, reason) => {
    debugDrawer("pickSettleTarget", {
      reason,
      target,
      startSize,
      currentSize,
      projected,
      velocity,
      fastSwipe,
      startSnapIndex,
      fromMinimized,
      minimizedSize,
      snaps,
      snapBehavior
    });
    return target;
  };
  if (fromMinimized) {
    if (minimizedSize === null) {
      if (!snaps.length) return decide({ kind: "close" }, "minimized-origin-without-stages");
      return decide({ kind: "snap", index: 0 }, "minimized-origin-fallback-first-snap");
    }
    const UP_DEADZONE = 12;
    const delta2 = projected - minimizedSize;
    if (delta2 > UP_DEADZONE || fastSwipe && velocity > 0) {
      if (!snaps.length) return decide({ kind: "minimized" }, "minimized-origin-no-snaps");
      if (snapBehavior === "closest") {
        return decide(
          { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
          "minimized-expand-closest"
        );
      }
      const gap = Math.abs(snaps[0] - minimizedSize);
      const skipThreshold2 = Math.max(56, gap * snapSkipThreshold);
      if (fastSwipe || delta2 >= skipThreshold2) {
        return decide(
          { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
          "minimized-expand-skip"
        );
      }
      return decide({ kind: "snap", index: 0 }, "minimized-expand-step");
    }
    if (dismissible) {
      const closeCutoff = minimizedSize * closeThreshold;
      if (projected <= closeCutoff) return decide({ kind: "close" }, "minimized-close-cutoff");
      if (fastSwipe && velocity < 0) return decide({ kind: "close" }, "minimized-close-fast-swipe");
    }
    return decide({ kind: "minimized" }, "minimized-rest");
  }
  if (!snaps.length) {
    return minimizedSize !== null ? decide({ kind: "minimized" }, "no-snaps-rest-minimized") : decide({ kind: "close" }, "no-snaps-close");
  }
  const smallest = snaps[0];
  const delta = projected - startSize;
  const direction = delta > 0 ? 1 : -1;
  const movingDown = delta < 0;
  const belowSmallest = projected < smallest;
  if (movingDown && belowSmallest) {
    const closeCutoff = (minimizedSize ?? smallest) * closeThreshold;
    if (dismissible) {
      if (projected <= closeCutoff) return decide({ kind: "close" }, "below-smallest-close-cutoff");
      if (fastSwipe && velocity < 0 && minimizedSize === null) {
        return decide({ kind: "close" }, "below-smallest-fast-close");
      }
    }
    if (minimizedSize !== null) {
      return decide({ kind: "minimized" }, "below-smallest-minimized");
    }
    if (!dismissible) return decide({ kind: "snap", index: 0 }, "below-smallest-clamp-first-snap");
    return decide({ kind: "close" }, "below-smallest-close");
  }
  if (snapBehavior === "closest") {
    return decide(
      { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
      "closest-snap"
    );
  }
  const deadZone = 14;
  if (Math.abs(delta) <= deadZone) {
    return decide({ kind: "snap", index: startSnapIndex }, "dead-zone");
  }
  const adjacentIndex = clamp(startSnapIndex + direction, 0, snaps.length - 1);
  if (adjacentIndex === startSnapIndex) {
    return decide({ kind: "snap", index: startSnapIndex }, "clamped-adjacent");
  }
  const adjacentGap = Math.abs(snaps[adjacentIndex] - startSize);
  const stepThreshold = Math.max(24, adjacentGap * snapStepThreshold);
  if (!fastSwipe && Math.abs(delta) < stepThreshold) {
    return decide({ kind: "snap", index: startSnapIndex }, "below-step-threshold");
  }
  const skipThreshold = Math.max(56, adjacentGap * snapSkipThreshold);
  if (fastSwipe || Math.abs(delta) >= skipThreshold) {
    return decide(
      { kind: "snap", index: findNearestSnapIndex(snaps, projected) },
      "skip-to-nearest"
    );
  }
  return decide({ kind: "snap", index: adjacentIndex }, "step-to-adjacent");
}

// src/useDrawerDrag.ts
var AXIS_LOCK_THRESHOLD = 6;
var VELOCITY_WINDOW_MS = 80;
var MAX_SAMPLES = 6;
var INPUT_HARD_BLOCK_TYPES = /* @__PURE__ */ new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit"
]);
var HARD_BLOCK_SELECTOR = [
  "select",
  "textarea",
  "[contenteditable='true']",
  "[data-vds-drawer-no-drag]"
].join(",");
var SOFT_BLOCK_SELECTOR = [
  "button",
  "a[href]",
  "[role='button']",
  "[role='link']"
].join(",");
function isInside(target, parent) {
  if (!target || !parent) return false;
  return parent.contains(target);
}
function isInteractiveTarget(target) {
  if (!target) return false;
  return Boolean(target.closest(`${HARD_BLOCK_SELECTOR},${SOFT_BLOCK_SELECTOR}`));
}
function isHardBlockedTarget(target) {
  if (!target) return false;
  if (target.closest(HARD_BLOCK_SELECTOR)) return true;
  return Boolean(target.closest("input"));
}
function isTouchDraggableInputTarget(target) {
  if (!target) return false;
  const input = target.closest("input");
  if (!(input instanceof HTMLInputElement)) return false;
  const type = input.type.toLowerCase();
  return !INPUT_HARD_BLOCK_TYPES.has(type);
}
function blocksSurfaceDrag(target, inputType) {
  if (!target) return false;
  if (target.closest("[data-vds-drawer-no-drag]")) return true;
  if (inputType !== "mouse" && isTouchDraggableInputTarget(target)) return false;
  if (isHardBlockedTarget(target)) return true;
  if (inputType === "mouse") {
    return Boolean(target.closest(SOFT_BLOCK_SELECTOR));
  }
  return false;
}
function getTouchById(list, touchId) {
  for (let index = 0; index < list.length; index++) {
    const touch = list.item(index);
    if (touch?.identifier === touchId) return touch;
  }
  return null;
}
function getDragSurface(target, contentEl, handleEl, headerEl, scrollableEl, dragHandleOnly, direction, inputType) {
  if (isInside(target, handleEl) && handleEl) {
    return { el: handleEl, source: "handle" };
  }
  if (!dragHandleOnly && isInside(target, headerEl) && headerEl && !isInteractiveTarget(target)) {
    return { el: headerEl, source: "header" };
  }
  const horizontal = direction === "left" || direction === "right";
  if (!dragHandleOnly && horizontal && isInside(target, contentEl) && contentEl && !blocksSurfaceDrag(target, inputType)) {
    return { el: contentEl, source: "content" };
  }
  if (inputType !== "mouse" && !dragHandleOnly && isInside(target, scrollableEl) && scrollableEl && !blocksSurfaceDrag(target, inputType)) {
    return { el: scrollableEl, source: "scroll" };
  }
  return null;
}
function useDrawerDrag(config) {
  const stateRef = react.useRef(null);
  const configRef = react.useRef(config);
  const removeWindowListenersRef = react.useRef(null);
  configRef.current = config;
  const recordSample = react.useCallback((size) => {
    const state = stateRef.current;
    if (!state) return;
    const now = performance.now();
    state.samples.push({ size, time: now });
    while (state.samples.length > MAX_SAMPLES) state.samples.shift();
  }, []);
  const computeVelocity = react.useCallback(() => {
    const state = stateRef.current;
    if (!state || state.samples.length < 2) return 0;
    const now = performance.now();
    const recent = state.samples.filter((sample) => now - sample.time <= VELOCITY_WINDOW_MS);
    if (recent.length < 2) {
      const a2 = state.samples[state.samples.length - 2];
      const b2 = state.samples[state.samples.length - 1];
      const dt2 = Math.max(b2.time - a2.time, 1);
      return (b2.size - a2.size) / dt2;
    }
    const a = recent[0];
    const b = recent[recent.length - 1];
    const dt = Math.max(b.time - a.time, 1);
    return (b.size - a.size) / dt;
  }, []);
  const releasePointerCapture = react.useCallback((el, pointerId) => {
    if (!el || pointerId === void 0 || !el.hasPointerCapture(pointerId)) return;
    try {
      el.releasePointerCapture(pointerId);
    } catch {
    }
  }, []);
  const clearWindowListeners = react.useCallback(() => {
    removeWindowListenersRef.current?.();
    removeWindowListenersRef.current = null;
  }, []);
  const reset = react.useCallback((pointerId) => {
    const state = stateRef.current;
    if (!state) return;
    clearWindowListeners();
    releasePointerCapture(state.captureEl, pointerId ?? state.pointerId);
    stateRef.current = null;
  }, [clearWindowListeners, releasePointerCapture]);
  const beginSession = react.useCallback((state) => {
    stateRef.current = state;
    debugDrawer("drag:start", {
      source: state.source,
      inputType: state.inputType,
      startSize: state.startSize,
      startSnapIndex: state.startSnapIndex,
      fromMinimized: state.fromMinimized
    });
    if (state.inputType === "pen" && state.captureEl && state.pointerId !== void 0) {
      try {
        state.captureEl.setPointerCapture(state.pointerId);
      } catch {
      }
    }
  }, []);
  const moveSession = react.useCallback((main, cross, prevent) => {
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
    if (state.source === "scroll" && !state.dragging && !isAtScrollEdge(resolvedConfig.getScrollableEl(), resolvedConfig.direction, -sizeDelta)) {
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
      resolvedConfig.drawerSize * 1.15
    );
    recordSample(finalSize);
    resolvedConfig.onDragMove(finalSize);
  }, [recordSample, reset]);
  const endSession = react.useCallback((cancelled) => {
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
        fromMinimized
      });
      resolvedConfig.onDragEnd(
        fromMinimized ? { kind: "minimized" } : { kind: "snap", index: startSnapIndex }
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
      snapSkipThreshold: resolvedConfig.snapSkipThreshold
    });
    debugDrawer("drag:end", {
      cancelled: false,
      startSize: state.startSize,
      currentSize,
      velocity,
      startSnapIndex,
      fromMinimized,
      target
    });
    resolvedConfig.onDragEnd(target);
  }, [computeVelocity, recordSample, reset]);
  const bindMouseListeners = react.useCallback(() => {
    const onMouseMove = (event) => {
      moveSession(
        getMainCoord(configRef.current.direction, event.clientX, event.clientY),
        getCrossCoord(configRef.current.direction, event.clientX, event.clientY),
        () => event.preventDefault()
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
  const bindPointerListeners = react.useCallback(() => {
    const onPointerMove = (event) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      moveSession(
        getMainCoord(configRef.current.direction, event.clientX, event.clientY),
        getCrossCoord(configRef.current.direction, event.clientX, event.clientY),
        () => {
          if (event.cancelable) event.preventDefault();
        }
      );
    };
    const onPointerUp = (event) => {
      const state = stateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      endSession(false);
    };
    const onPointerCancel = (event) => {
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
  const bindTouchListeners = react.useCallback(() => {
    const onTouchMove = (event) => {
      const state = stateRef.current;
      if (!state || state.touchId === void 0) return;
      const touch = getTouchById(event.touches, state.touchId) ?? getTouchById(event.changedTouches, state.touchId);
      if (!touch) return;
      moveSession(
        getMainCoord(configRef.current.direction, touch.clientX, touch.clientY),
        getCrossCoord(configRef.current.direction, touch.clientX, touch.clientY),
        () => {
          if (event.cancelable) event.preventDefault();
        }
      );
    };
    const onTouchEnd = (event) => {
      const state = stateRef.current;
      if (!state || state.touchId === void 0) return;
      if (!getTouchById(event.changedTouches, state.touchId)) return;
      endSession(false);
    };
    const onTouchCancel = (event) => {
      const state = stateRef.current;
      if (!state || state.touchId === void 0) return;
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
  react.useEffect(() => () => {
    clearWindowListeners();
    stateRef.current = null;
  }, [clearWindowListeners]);
  const onMouseDown = react.useCallback((event) => {
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
      "mouse"
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
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }]
    });
    bindMouseListeners();
  }, [beginSession, bindMouseListeners]);
  const onPointerDown = react.useCallback((event) => {
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
      "pen"
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
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }]
    });
    bindPointerListeners();
  }, [beginSession, bindPointerListeners]);
  const onTouchStart = react.useCallback((event) => {
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
      "touch"
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
      samples: [{ size: resolvedConfig.getCurrentSize(), time: performance.now() }]
    });
    bindTouchListeners();
  }, [beginSession, bindTouchListeners]);
  const noop = react.useCallback(() => {
  }, []);
  return {
    onMouseDown,
    onPointerDown,
    onTouchStart,
    onPointerMove: noop,
    onPointerUp: noop,
    onPointerCancel: noop,
    onLostPointerCapture: noop
  };
}
var DEFAULT_SPRING_MS = 380;
var DEFAULT_SPRING_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
var VIEWPORT_RATIO = 1;
var DEFAULT_MINIMIZED_STATE_ID = "minimized";
function parseDurationMs(value, fallback) {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const n = parseFloat(trimmed);
  if (!Number.isFinite(n)) return fallback;
  if (trimmed.endsWith("ms")) return n;
  if (trimmed.endsWith("s")) return n * 1e3;
  return n;
}
function readDrawerTiming(el) {
  if (!el || typeof window === "undefined") {
    return { ms: DEFAULT_SPRING_MS, ease: DEFAULT_SPRING_EASE };
  }
  const cs = getComputedStyle(el);
  const rawDuration = cs.getPropertyValue("--vds-drawer-duration");
  const rawEase = cs.getPropertyValue("--vds-drawer-ease").trim();
  return {
    ms: parseDurationMs(rawDuration, DEFAULT_SPRING_MS),
    ease: rawEase || DEFAULT_SPRING_EASE
  };
}
function composeHandlers(user, internal) {
  return (event) => {
    user?.(event);
    const prevented = typeof event === "object" && event !== null && "defaultPrevented" in event && Boolean(event.defaultPrevented);
    if (!prevented) internal(event);
  };
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    }
  };
}
function getWrapperEl() {
  if (typeof document === "undefined") return null;
  return document.querySelector("[data-vds-drawer-wrapper]");
}
function setTransition(el, value) {
  if (el) el.style.transition = value;
}
function isEditableElement(node) {
  if (!(node instanceof HTMLElement)) return false;
  if (node.isContentEditable) return true;
  const tagName = node.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}
function getComputedMainTranslate(el, direction) {
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
function getResizeSizeProperty(direction) {
  return direction === "left" || direction === "right" ? "inline-size" : "block-size";
}
function dedupeSnaps(snapPoints) {
  if (!snapPoints?.length) return [1];
  return [...new Set(snapPoints)];
}
function resolveOpenStates(openStates, snapPoints) {
  if (openStates?.length) return [...openStates];
  return dedupeSnaps(snapPoints).map((size, index) => ({
    id: `state-${index + 1}`,
    size
  }));
}
function findOpenStateById(openStates, id) {
  if (!id) return void 0;
  return openStates.find((state) => state.id === id);
}
function findOpenStateByValue(openStates, value) {
  return openStates.find((state) => state.size === value);
}
function Drawer({
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
  preventAutoFocus = true
}) {
  const contentRef = react.useRef(null);
  const overlayRef = react.useRef(null);
  const headerRef = react.useRef(null);
  const bodyRef = react.useRef(null);
  const handleRef = react.useRef(null);
  const closeTimerRef = react.useRef(0);
  const resolvedOpenStates = react.useMemo(
    () => resolveOpenStates(openStates, snapPoints),
    [openStates, snapPoints]
  );
  const resolvedMinimizedState = typeof minimizedState === "number" ? { id: DEFAULT_MINIMIZED_STATE_ID, size: minimizedState } : minimizedState;
  const resolvedMinimizedSize = resolvedMinimizedState?.size ?? minimizedSize;
  const resolvedMinimizedStateId = resolvedMinimizedState?.id ?? DEFAULT_MINIMIZED_STATE_ID;
  const resolvedSnaps = react.useMemo(
    () => dedupeSnaps(resolvedOpenStates.map((state) => state.size)),
    [resolvedOpenStates]
  );
  const controlledStateSnap = react.useMemo(
    () => activeOpenState === resolvedMinimizedStateId ? resolvedMinimizedSize : findOpenStateById(resolvedOpenStates, activeOpenState)?.size,
    [activeOpenState, resolvedMinimizedSize, resolvedMinimizedStateId, resolvedOpenStates]
  );
  const defaultStateSnap = react.useMemo(
    () => defaultOpenState === resolvedMinimizedStateId ? resolvedMinimizedSize : findOpenStateById(resolvedOpenStates, defaultOpenState)?.size,
    [defaultOpenState, resolvedMinimizedSize, resolvedMinimizedStateId, resolvedOpenStates]
  );
  const resolvedDefaultSnap = defaultStateSnap ?? defaultSnapPoint ?? resolvedSnaps[resolvedSnaps.length - 1];
  const [internalOpen, setInternalOpen] = react.useState(defaultOpen);
  const [internalSnap, setInternalSnap] = react.useState(resolvedDefaultSnap);
  const [present, setPresent] = react.useState(controlledOpen ?? defaultOpen);
  const [dragging, setDragging] = react.useState(false);
  const isOpenControlled = controlledOpen !== void 0;
  const isSnapControlled = controlledStateSnap !== void 0 || controlledSnap !== void 0;
  const committedSnapPoint = controlledStateSnap ?? controlledSnap ?? internalSnap;
  const [visualSnapPoint, setVisualSnapPoint] = react.useState(committedSnapPoint);
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const activeSnapPoint = visualSnapPoint;
  const isMinimized = resolvedMinimizedSize !== void 0 && activeSnapPoint === resolvedMinimizedSize;
  const isModal = modal && !isMinimized;
  react.useEffect(() => {
    if (dragging) return;
    setVisualSnapPoint(committedSnapPoint);
  }, [committedSnapPoint, dragging]);
  react.useEffect(() => {
    const snapStillExists = resolvedSnaps.includes(committedSnapPoint) || resolvedMinimizedSize !== void 0 && committedSnapPoint === resolvedMinimizedSize;
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
    resolvedSnaps
  ]);
  react.useEffect(() => {
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
  react.useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);
  const handleOpenChange = react.useCallback((next) => {
    if (!dismissible && !next) return;
    if (next) setPresent(true);
    if (!isOpenControlled) setInternalOpen(next);
    controlledOnOpenChange?.(next);
  }, [controlledOnOpenChange, dismissible, isOpenControlled]);
  const handleSnapChange = react.useCallback((next) => {
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
    resolvedOpenStates
  ]);
  const ctxValue = react.useMemo(() => ({
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
    setDragging
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
    handleSnapChange
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(DrawerProvider, { value: ctxValue, children: /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Root, { open, onOpenChange: handleOpenChange, modal: isModal, children }) });
}
var DrawerTrigger = DialogPrimitive__namespace.Trigger;
var DrawerClose = DialogPrimitive__namespace.Close;
var DrawerOverlay = react.forwardRef(function DrawerOverlay2({ className, ...props }, forwardedRef) {
  const { overlayRef, open, activeSnapPoint, minimizedSize } = useDrawerContext();
  const overlayVisible = open && (minimizedSize === void 0 || activeSnapPoint !== minimizedSize);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      ref: mergeRefs(overlayRef, forwardedRef),
      className: utils.cn("vds-drawer-overlay", className),
      "data-open": overlayVisible || void 0,
      ...props
    }
  );
});
var DrawerContent = react.forwardRef(function DrawerContent2({
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
}, forwardedRef) {
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
    snapSkipThreshold
  } = useDrawerContext();
  const [layout, setLayout] = react.useState({
    totalSize: 0,
    snaps: [],
    minimized: null,
    overlayStartSize: 0
  });
  const layoutRef = react.useRef(layout);
  const [keyboardOpen, setKeyboardOpen] = react.useState(false);
  const keyboardOpenRef = react.useRef(false);
  const currentSizeRef = react.useRef(0);
  const pendingSizeRef = react.useRef(0);
  const measureFrameRef = react.useRef(0);
  const writeFrameRef = react.useRef(0);
  const openAnimRef = react.useRef(0);
  const hasOpenedRef = react.useRef(false);
  const pendingResizeSizeRef = react.useRef(null);
  const resizeSizeAnimatingRef = react.useRef(false);
  const resizeCleanupTimerRef = react.useRef(0);
  const minimizedStage = minimizedSize !== void 0 && activeSnapPoint === minimizedSize;
  const activeState = react.useMemo(() => {
    if (minimizedStage && layout.minimized) {
      return { kind: "minimized" };
    }
    const index = findSnapIndexByValue(layout.snaps, activeSnapPoint);
    return { kind: "snap", index: index === -1 ? Math.max(layout.snaps.length - 1, 0) : index };
  }, [activeSnapPoint, layout.minimized, layout.snaps, minimizedStage]);
  const activeStageKind = activeState.kind === "minimized" ? "minimized" : "snap";
  const setAnimated = react.useCallback((animated) => {
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
        `transform ${ms}ms ${ease}, border-radius ${ms}ms ${ease}`
      );
    }
  }, [contentRef, overlayRef, scaleBackground]);
  const writeVisualSize = react.useCallback((sizePx, options) => {
    const contentEl = contentRef.current;
    const overlayEl = overlayRef.current;
    const wrapperEl = getWrapperEl();
    currentSizeRef.current = sizePx;
    if (layout.totalSize <= 0 || !contentEl) return;
    contentEl.style.setProperty(
      "--vds-drawer-transform",
      getVisualTransform(direction, sizePx, layout.totalSize, options)
    );
    const overlayProgress = getOverlayProgress(sizePx, layout.totalSize, layout.overlayStartSize);
    if (overlayEl) {
      overlayEl.style.setProperty("--vds-drawer-overlay-opacity", String(overlayProgress));
      overlayEl.style.pointerEvents = overlayProgress > 1e-3 ? "auto" : "none";
    }
    const smallestRest = layout.minimized?.size ?? layout.snaps[0]?.size ?? layout.totalSize;
    const closeTarget = smallestRest * closeThreshold;
    const closeSpan = Math.max(smallestRest - closeTarget, 1);
    const closeProgress = sizePx >= smallestRest ? 0 : clamp((smallestRest - sizePx) / closeSpan, 0, 1);
    contentEl.style.setProperty("--vds-drawer-close-progress", closeProgress.toFixed(3));
    if (scaleBackground && wrapperEl) {
      if (overlayProgress <= 1e-3) {
        wrapperEl.style.transform = "";
        wrapperEl.style.borderRadius = "";
      } else {
        const backgroundStyles = getBackgroundStyles(overlayProgress);
        wrapperEl.style.transform = backgroundStyles.transform;
        wrapperEl.style.borderRadius = backgroundStyles.borderRadius;
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
    scaleBackground
  ]);
  const flushVisualSize = react.useCallback(() => {
    writeFrameRef.current = 0;
    writeVisualSize(pendingSizeRef.current);
  }, [writeVisualSize]);
  const flushPendingSize = react.useCallback(() => {
    if (!writeFrameRef.current) return;
    cancelAnimationFrame(writeFrameRef.current);
    writeFrameRef.current = 0;
    writeVisualSize(pendingSizeRef.current);
  }, [writeVisualSize]);
  const applySize = react.useCallback((sizePx, immediate = false) => {
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
  const settleToSnap = react.useCallback((animated) => {
    if (layout.totalSize <= 0) return;
    const target = activeState.kind === "minimized" ? layout.minimized?.size ?? layout.totalSize : layout.snaps[activeState.index]?.size ?? layout.totalSize;
    const current = writeFrameRef.current ? pendingSizeRef.current : currentSizeRef.current;
    const resizeAnimation = pendingResizeSizeRef.current;
    const shrinkResize = resizeAnimation && resizeAnimation.from > resizeAnimation.to ? resizeAnimation : null;
    debugDrawer("settle:request", {
      animated,
      activeState,
      target,
      currentSize: current,
      pendingSize: pendingSizeRef.current,
      resizeAnimation
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
      contentEl.style.setProperty(
        "--vds-drawer-transform",
        getVisualTransform(direction, current, shrinkResize.from, { disableStretch: true })
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
          currentSize: currentSizeRef.current
        });
        const pendingResize = pendingResizeSizeRef.current;
        if (pendingResize && contentEl && pendingResize.from > pendingResize.to) {
          resizeSizeAnimatingRef.current = true;
          contentEl.style.setProperty(
            "--vds-drawer-transform",
            getVisualTransform(direction, target, pendingResize.from, { disableStretch: true })
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
    writeVisualSize
  ]);
  const measure = react.useCallback(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;
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
      contentEl.style.setProperty("--vds-drawer-transform", getVisualTransform(direction, 0, totalSize));
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--vds-drawer-overlay-opacity", "0");
      }
    }
    const { snaps, minimized } = resolveSnaps(snapPoints, totalSize, minimizedSize);
    const overlayStartSize = minimized?.size ?? 0;
    const previousLayout = layoutRef.current;
    const sizeChanged = previousLayout.totalSize > 0 && Math.abs(previousLayout.totalSize - totalSize) >= 1;
    const visualSize = writeFrameRef.current ? pendingSizeRef.current : currentSizeRef.current;
    if (open && present && !dragging && sizeChanged && visualSize > 0) {
      window.clearTimeout(resizeCleanupTimerRef.current);
      resizeSizeAnimatingRef.current = false;
      if (totalSize < previousLayout.totalSize) {
        pendingResizeSizeRef.current = {
          property: resizeSizeProperty,
          from: previousLayout.totalSize,
          to: totalSize
        };
        setTransition(contentEl, "none");
        contentEl.style.setProperty(resizeSizeProperty, `${previousLayout.totalSize}px`);
        contentEl.style.setProperty(
          "--vds-drawer-transform",
          getVisualTransform(direction, visualSize, previousLayout.totalSize, {
            disableStretch: true
          })
        );
      } else {
        pendingResizeSizeRef.current = null;
        contentEl.style.removeProperty(resizeSizeProperty);
      }
    }
    setLayout((previous) => {
      const snapsSame = previous.snaps.length === snaps.length && previous.snaps.every((snap, index) => {
        const next2 = snaps[index];
        return snap.value === next2?.value && snap.kind === next2?.kind && Math.abs(snap.size - (next2?.size ?? 0)) < 1;
      });
      const minimizedSame = previous.minimized === null && minimized === null || previous.minimized !== null && minimized !== null && previous.minimized.value === minimized.value && Math.abs(previous.minimized.size - minimized.size) < 1;
      const same = previous.totalSize === totalSize && previous.overlayStartSize === overlayStartSize && snapsSame && minimizedSame;
      const next = same ? previous : {
        totalSize,
        snaps,
        minimized,
        overlayStartSize
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
    snapPoints
  ]);
  react.useEffect(() => () => {
    cancelAnimationFrame(measureFrameRef.current);
    cancelAnimationFrame(writeFrameRef.current);
    cancelAnimationFrame(openAnimRef.current);
    window.clearTimeout(resizeCleanupTimerRef.current);
  }, []);
  react.useEffect(() => {
    if (!present) {
      keyboardOpenRef.current = false;
      setKeyboardOpen(false);
      contentRef.current?.style.removeProperty("--vds-drawer-keyboard-inset");
      return;
    }
    const writeKeyboardInset = (px) => {
      const el = contentRef.current;
      if (!el) return;
      if (px > 0) el.style.setProperty("--vds-drawer-keyboard-inset", `${Math.round(px)}px`);
      else el.style.removeProperty("--vds-drawer-keyboard-inset");
    };
    const readCurrentInset = () => {
      const raw = contentRef.current?.style.getPropertyValue(
        "--vds-drawer-keyboard-inset"
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
        contentRef.current?.contains(activeElement) && isEditableElement(activeElement)
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
      if (Math.abs(overshoot - currentInset) < 1) return;
      writeKeyboardInset(overshoot);
    };
    let scrollSettleTimer = null;
    const scrollFocusedIntoView = () => {
      const active = typeof document === "undefined" ? null : document.activeElement;
      if (!active || !isEditableElement(active)) return;
      if (!contentRef.current?.contains(active)) return;
      const scrollContainer = keyboardOpenRef.current ? contentRef.current : bodyRef.current;
      if (!scrollContainer) return;
      const targetRect = active.getBoundingClientRect();
      const vv = window.visualViewport;
      const vvTop = vv?.offsetTop ?? 0;
      const vvHeight = vv?.height ?? window.innerHeight;
      const vvBottom = vvTop + vvHeight;
      const margin = Math.min(48, Math.max(16, vvHeight * 0.1));
      let delta = 0;
      if (targetRect.height > vvHeight - 2 * margin) {
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
        Math.min(scrollContainer.scrollTop + delta, maxScroll)
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
    const onFocusIn = (event) => {
      syncKeyboardOpen();
      const target = event.target;
      if (!target || !isEditableElement(target)) return;
      scheduleScrollToFocused();
    };
    const onFocusOut = () => requestAnimationFrame(syncKeyboardOpen);
    const onViewportChange = () => {
      syncKeyboardOpen();
      const active = typeof document === "undefined" ? null : document.activeElement;
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
  const keyboardSnapHandledRef = react.useRef(false);
  react.useEffect(() => {
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
  react.useLayoutEffect(() => {
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
  react.useLayoutEffect(() => {
    if (!present || resizeSizeAnimatingRef.current) return;
    measure();
  });
  react.useEffect(() => {
    keyboardOpenRef.current = keyboardOpen;
  }, [keyboardOpen]);
  react.useLayoutEffect(() => {
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
  react.useEffect(() => {
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
        minimizedSize
      });
      if (target.kind === "close") {
        setAnimated(true);
        applySize(0, true);
        onOpenChange(false);
        return;
      }
      if (target.kind === "minimized") {
        if (minimizedSize !== void 0) {
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
    getScrollableEl: () => keyboardOpenRef.current ? contentRef.current : bodyRef.current ?? contentRef.current
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Portal, { forceMount: present ? true : void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DrawerOverlay, { forceMount: present ? true : void 0 }),
    /* @__PURE__ */ jsxRuntime.jsx(
      DialogPrimitive__namespace.Content,
      {
        forceMount: present ? true : void 0,
        ref: mergeRefs(contentRef, forwardedRef),
        className: utils.cn("vds-drawer-content", className),
        "data-direction": direction,
        "data-open": open || void 0,
        "data-dragging": dragging || void 0,
        "data-keyboard-open": keyboardOpen || void 0,
        "data-indicator": indicator,
        "data-header-variant": headerVariant,
        "data-size-mode": sizeMode,
        "data-stage": activeStageKind,
        "data-measured": layout.totalSize > 0 || void 0,
        tabIndex: -1,
        style,
        onOpenAutoFocus: composeHandlers(onOpenAutoFocus, (event) => {
          if (!preventAutoFocus) return;
          event.preventDefault();
          if (!minimizedStage) {
            contentRef.current?.focus({ preventScroll: true });
          }
        }),
        onEscapeKeyDown: composeHandlers(onEscapeKeyDown, (event) => {
          if (!dismissible) event.preventDefault();
        }),
        onPointerDownOutside: composeHandlers(onPointerDownOutside, (event) => {
          if (!dismissible) event.preventDefault();
        }),
        onInteractOutside: composeHandlers(onInteractOutside, (event) => {
          if (!dismissible) event.preventDefault();
        }),
        onMouseDown: composeHandlers(onMouseDown, drag.onMouseDown),
        onPointerDown: composeHandlers(onPointerDown, drag.onPointerDown),
        onPointerMove: composeHandlers(onPointerMove, drag.onPointerMove),
        onPointerUp: composeHandlers(onPointerUp, drag.onPointerUp),
        onPointerCancel: composeHandlers(onPointerCancel, drag.onPointerCancel),
        onLostPointerCapture: composeHandlers(onLostPointerCapture, drag.onLostPointerCapture),
        onTouchStart: composeHandlers(onTouchStart, drag.onTouchStart),
        ...props,
        children
      }
    )
  ] });
});
var DrawerHandle = react.forwardRef(function DrawerHandle2({ className, placement, ...props }, forwardedRef) {
  const { direction, handleRef, activeSnapPoint, minimizedSize, indicator } = useDrawerContext();
  const minimized = minimizedSize !== void 0 && activeSnapPoint === minimizedSize;
  const resolvedPlacement = placement ?? indicator;
  if (resolvedPlacement === "hidden") return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: mergeRefs(handleRef, forwardedRef),
      className: utils.cn("vds-drawer-handle", className),
      "data-direction": direction,
      "data-placement": resolvedPlacement,
      "data-stage": minimized ? "minimized" : "snap",
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-drawer-handle-bar" })
    }
  );
});
var DrawerHeader = react.forwardRef(function DrawerHeader2({ className, variant, ...props }, forwardedRef) {
  const { headerRef, headerVariant } = useDrawerContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: mergeRefs(headerRef, forwardedRef),
      className: utils.cn("vds-drawer-header", className),
      "data-variant": variant ?? headerVariant,
      ...props
    }
  );
});
var DrawerTitle = react.forwardRef(function DrawerTitle2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    {
      ref: forwardedRef,
      className: utils.cn("vds-drawer-title", className),
      ...props
    }
  );
});
var DrawerDescription = react.forwardRef(function DrawerDescription2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    {
      ref: forwardedRef,
      className: utils.cn("vds-drawer-description", className),
      ...props
    }
  );
});
var DrawerBody = react.forwardRef(function DrawerBody2({ className, ...props }, forwardedRef) {
  const { bodyRef } = useDrawerContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: mergeRefs(bodyRef, forwardedRef),
      className: utils.cn("vds-drawer-body", className),
      "data-vds-drawer-scroll-region": "",
      ...props
    }
  );
});
var DrawerFooter = react.forwardRef(function DrawerFooter2({ className, ...props }, forwardedRef) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: forwardedRef,
      className: utils.cn("vds-drawer-footer", className),
      ...props
    }
  );
});

exports.Drawer = Drawer;
exports.DrawerBody = DrawerBody;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerFooter = DrawerFooter;
exports.DrawerHandle = DrawerHandle;
exports.DrawerHeader = DrawerHeader;
exports.DrawerOverlay = DrawerOverlay;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
