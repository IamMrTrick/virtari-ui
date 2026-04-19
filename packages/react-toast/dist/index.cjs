"use client";
'use strict';

var react = require('react');
var ToastPrimitive3 = require('@radix-ui/react-toast');
var utils = require('@virtari-packages/utils');
var reactIcons = require('@virtari-packages/react-icons');
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

var ToastPrimitive3__namespace = /*#__PURE__*/_interopNamespace(ToastPrimitive3);

// src/Toaster.tsx

// src/store.ts
var DEFAULT_DURATION = 4e3;
var counter = 0;
var snapshot = Object.freeze([]);
var listeners = /* @__PURE__ */ new Set();
var defaultDuration = DEFAULT_DURATION;
var maxToasts = Infinity;
function createToastId() {
  return `vds-toast-${++counter}-${Date.now().toString(36)}`;
}
function resolveDuration(type, requested) {
  if (requested !== void 0) return Math.max(0, requested);
  if (type === "loading") return 0;
  return defaultDuration;
}
function commit(next) {
  snapshot = Object.freeze(next);
  for (const l of listeners) l(snapshot);
}
function enforceCap(list) {
  if (list.length <= maxToasts) return list;
  return list.slice(list.length - maxToasts);
}
var toastStore = {
  getSnapshot() {
    return snapshot;
  },
  subscribe(l) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  setDefaultDuration(ms) {
    defaultDuration = ms;
  },
  setMaxToasts(n) {
    maxToasts = n ?? Infinity;
    const trimmed = enforceCap(snapshot);
    if (trimmed !== snapshot) commit(trimmed);
  },
  add(opts) {
    const id = opts.id ?? createToastId();
    const type = opts.type ?? "default";
    const toast2 = {
      id,
      type,
      title: opts.title,
      description: opts.description,
      action: opts.action,
      actions: opts.actions,
      duration: resolveDuration(type, opts.duration),
      dismissible: opts.dismissible ?? true,
      icon: opts.icon,
      createdAt: Date.now()
    };
    const existingIdx = snapshot.findIndex((t) => t.id === id);
    const next = existingIdx !== -1 ? [
      ...snapshot.slice(0, existingIdx),
      toast2,
      ...snapshot.slice(existingIdx + 1)
    ] : [...snapshot, toast2];
    commit(enforceCap(next));
    return id;
  },
  update(id, patch) {
    const idx = snapshot.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const current = snapshot[idx];
    const nextType = patch.type ?? current.type;
    const typeChanged = patch.type !== void 0 && patch.type !== current.type;
    const leavingLoading = current.type === "loading" && typeChanged;
    const duration = patch.duration !== void 0 ? Math.max(0, patch.duration) : leavingLoading ? defaultDuration : current.duration;
    const updated = {
      ...current,
      ...patch,
      type: nextType,
      duration,
      dismissible: patch.dismissible ?? current.dismissible,
      createdAt: Date.now()
    };
    const next = [
      ...snapshot.slice(0, idx),
      updated,
      ...snapshot.slice(idx + 1)
    ];
    commit(next);
  },
  remove(id) {
    const next = snapshot.filter((t) => t.id !== id);
    if (next.length !== snapshot.length) commit(next);
  },
  removeAll() {
    if (snapshot.length === 0) return;
    commit([]);
  }
};
var ICON_PROPS = {
  size: 20,
  stroke: 1.75,
  "aria-hidden": true,
  focusable: false
};
var SuccessIcon = react.memo(function SuccessIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCircleCheck, { ...ICON_PROPS });
});
var ErrorIcon = react.memo(function ErrorIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCircleX, { ...ICON_PROPS });
});
var WarningIcon = react.memo(function WarningIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconAlertTriangle, { ...ICON_PROPS });
});
var InfoIcon = react.memo(function InfoIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconInfoCircle, { ...ICON_PROPS });
});
var LoadingIcon = react.memo(function LoadingIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconLoader2, { ...ICON_PROPS, className: "vds-toast__spinner" });
});
var CloseIcon = react.memo(function CloseIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactIcons.IconX,
    {
      size: 12,
      stroke: 1.75,
      "aria-hidden": true,
      focusable: false
    }
  );
});
var TOAST_ICON_MAP = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoadingIcon,
  default: null
};
var PROGRESS_RING_CIRCUMFERENCE = 62.83;
var DRAG_AXIS_LOCK_THRESHOLD = 6;
var DRAG_DISMISS_DISTANCE = 96;
var DRAG_DISMISS_VELOCITY = 0.5;
var DRAG_VELOCITY_MIN_DISTANCE = 36;
var EXIT_ANIMATION_NAMES = /* @__PURE__ */ new Set([
  "vds-toast-exit-up",
  "vds-toast-exit-down",
  "vds-toast-swipe-out-left",
  "vds-toast-swipe-out-right"
]);
function computeScale(index) {
  if (index <= 0) return 1;
  if (index === 1) return 0.96;
  if (index === 2) return 0.92;
  return Math.max(0.88, 1 - index * 0.04);
}
function computeOpacity(index) {
  if (index <= 0) return 1;
  if (index === 1) return 0.85;
  if (index === 2) return 0.7;
  return Math.max(0.55, 1 - index * 0.15);
}
function ActionBtn({
  action,
  toastId: _toastId,
  dataSlot,
  defaultVariant,
  onCloseSoft
}) {
  const variant = action.variant ?? defaultVariant ?? "ghost";
  const handleClick = react.useCallback(
    (event) => {
      event.stopPropagation();
      action.onClick();
      if (action.closeOnClick !== false) {
        onCloseSoft();
      }
    },
    [action, onCloseSoft]
  );
  const stopPointer = react.useCallback(
    (event) => {
      event.stopPropagation();
    },
    []
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      className: utils.cn(
        "vds-toast-action",
        `vds-toast-action--${variant}`,
        `vds-toast-action--slot-${dataSlot}`
      ),
      "data-variant": variant,
      "data-slot": dataSlot,
      onClick: handleClick,
      onPointerDown: stopPointer,
      children: action.label
    }
  );
}
var ToastItem = react.memo(function ToastItem2({
  toast: toast2,
  index,
  expanded,
  offset,
  reportHeight,
  closeLabel,
  swipeThreshold = DRAG_DISMISS_DISTANCE,
  timerMode,
  pauseMode
}) {
  const rootRef = react.useRef(null);
  const [open, setOpen] = react.useState(true);
  const [paused, setPaused] = react.useState(false);
  const [progress, setProgress] = react.useState(100);
  const progressRef = react.useRef(100);
  const startRef = react.useRef(Date.now());
  const pauseAtRef = react.useRef(null);
  const [dragX, setDragX] = react.useState(0);
  const [isDragging, setIsDragging] = react.useState(false);
  const [swipeExit, setSwipeExit] = react.useState(null);
  const dragStartXRef = react.useRef(0);
  const dragStartYRef = react.useRef(0);
  const dragStartTimeRef = react.useRef(0);
  const dragAxisRef = react.useRef(null);
  const hasActions = Boolean(toast2.action) || Boolean(toast2.actions?.primary) || Boolean(toast2.actions?.secondary);
  const Icon = TOAST_ICON_MAP[toast2.type];
  const showIcon = toast2.icon !== false;
  const customIconProvided = toast2.icon !== void 0 && toast2.icon !== false;
  react.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") {
      reportHeight(toast2.id, el.getBoundingClientRect().height);
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) reportHeight(toast2.id, entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [toast2.id, reportHeight]);
  react.useEffect(() => {
    progressRef.current = 100;
    startRef.current = Date.now();
    pauseAtRef.current = null;
    setProgress(100);
  }, [toast2.id, toast2.duration, toast2.createdAt]);
  const prevIndexRef = react.useRef(index);
  react.useEffect(() => {
    if (timerMode === "sequential" && prevIndexRef.current > 0 && index === 0 && toast2.duration > 0) {
      progressRef.current = 100;
      startRef.current = Date.now();
      pauseAtRef.current = null;
      setProgress(100);
    }
    prevIndexRef.current = index;
  }, [index, timerMode, toast2.duration]);
  const softCloseRef = react.useRef(null);
  react.useEffect(() => {
    if (!open) return;
    if (toast2.duration <= 0) return;
    if (timerMode === "sequential" && index > 0) return;
    if (paused || isDragging) {
      if (pauseAtRef.current === null) pauseAtRef.current = Date.now();
      return;
    }
    if (pauseAtRef.current !== null) {
      const pausedFor = Date.now() - pauseAtRef.current;
      startRef.current += pausedFor;
      pauseAtRef.current = null;
    }
    let active = true;
    let raf = 0;
    const tick = () => {
      if (!active) return;
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, toast2.duration - elapsed);
      const next = remaining / toast2.duration * 100;
      if (Math.abs(next - progressRef.current) > 0.5 || remaining <= 0) {
        progressRef.current = next;
        setProgress(next);
      }
      if (remaining <= 0) {
        softCloseRef.current?.(null);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [
    toast2.duration,
    toast2.id,
    toast2.createdAt,
    paused,
    isDragging,
    open,
    timerMode,
    index
  ]);
  const softClose = react.useCallback((exit = null) => {
    setSwipeExit(exit);
    setOpen(false);
  }, []);
  react.useEffect(() => {
    softCloseRef.current = softClose;
  }, [softClose]);
  const handleOpenChange = react.useCallback(
    (next) => {
      if (next) return;
      softClose(null);
    },
    [softClose]
  );
  const handleAnimationEnd = react.useCallback(
    (event) => {
      if (event.target !== rootRef.current) return;
      if (!EXIT_ANIMATION_NAMES.has(event.animationName)) return;
      toastStore.remove(toast2.id);
    },
    [toast2.id]
  );
  const handlePause = react.useCallback(() => {
    if (pauseMode === "hover") setPaused(true);
  }, [pauseMode]);
  const handleResume = react.useCallback(() => {
    if (pauseMode === "hover") setPaused(false);
  }, [pauseMode]);
  react.useEffect(() => {
    if (pauseMode !== "hover") setPaused(false);
  }, [pauseMode]);
  const onPointerDown = react.useCallback(
    (event) => {
      if (!toast2.dismissible || !open) return;
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const target = event.target;
      if (target.closest("button, a, [role='button'], input, textarea, select")) {
        return;
      }
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
      }
      setIsDragging(true);
      dragStartXRef.current = event.clientX;
      dragStartYRef.current = event.clientY;
      dragStartTimeRef.current = Date.now();
      dragAxisRef.current = null;
    },
    [toast2.dismissible, open]
  );
  const onPointerMove = react.useCallback(
    (event) => {
      if (!isDragging) return;
      const dx = event.clientX - dragStartXRef.current;
      const dy = event.clientY - dragStartYRef.current;
      if (dragAxisRef.current === null) {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        if (absX < DRAG_AXIS_LOCK_THRESHOLD && absY < DRAG_AXIS_LOCK_THRESHOLD) {
          return;
        }
        dragAxisRef.current = absX > absY ? "horizontal" : "vertical";
        if (dragAxisRef.current === "vertical") {
          try {
            event.currentTarget.releasePointerCapture(event.pointerId);
          } catch {
          }
          setIsDragging(false);
          setDragX(0);
          return;
        }
      }
      if (dragAxisRef.current === "horizontal") {
        setDragX(dx);
      }
    },
    [isDragging]
  );
  const endDrag = react.useCallback(
    (event, commit2) => {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
      }
      const delta = dragX;
      const elapsed = Math.max(Date.now() - dragStartTimeRef.current, 1);
      const velocity = Math.abs(delta) / elapsed;
      const absDelta = Math.abs(delta);
      const shouldDismiss = commit2 && (absDelta > swipeThreshold || absDelta > DRAG_VELOCITY_MIN_DISTANCE && velocity > DRAG_DISMISS_VELOCITY);
      setIsDragging(false);
      dragAxisRef.current = null;
      if (shouldDismiss) {
        const dir = delta > 0 ? "right" : "left";
        softClose(dir);
      } else {
        setDragX(0);
      }
    },
    [dragX, softClose, swipeThreshold]
  );
  const onPointerUp = react.useCallback(
    (event) => {
      if (!isDragging) return;
      endDrag(event, true);
    },
    [isDragging, endDrag]
  );
  const onPointerCancel = react.useCallback(
    (event) => {
      if (!isDragging) return;
      endDrag(event, false);
    },
    [isDragging, endDrag]
  );
  const stackStyle = react.useMemo(() => {
    const scale = expanded ? 1 : computeScale(index);
    const opacity = expanded ? 1 : computeOpacity(index);
    const vars = {
      "--vds-toast-y": `${offset}px`,
      "--vds-toast-scale": scale,
      "--vds-toast-opacity": opacity,
      "--vds-toast-drag-x": `${dragX}px`,
      zIndex: 1e3 - index
    };
    return vars;
  }, [offset, index, expanded, dragX]);
  const showProgressRing = open && toast2.duration > 0 && progress > 0 && progress < 100 && toast2.dismissible && !isDragging;
  const rootClassName = utils.cn(
    "vds-toast",
    `vds-toast--${toast2.type}`,
    index > 0 && "vds-toast--stacked",
    hasActions && "vds-toast--has-actions"
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Root,
    {
      ref: rootRef,
      className: rootClassName,
      style: stackStyle,
      duration: Number.POSITIVE_INFINITY,
      open,
      onOpenChange: handleOpenChange,
      onPause: handlePause,
      onResume: handleResume,
      onSwipeStart: (e) => e.preventDefault(),
      onSwipeMove: (e) => e.preventDefault(),
      onSwipeCancel: (e) => e.preventDefault(),
      onSwipeEnd: (e) => e.preventDefault(),
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onAnimationEnd: handleAnimationEnd,
      "data-type": toast2.type,
      "data-index": index,
      "data-expanded": expanded || void 0,
      "data-has-actions": hasActions || void 0,
      "data-dragging": isDragging || void 0,
      "data-swipe-exit": swipeExit ?? void 0,
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-toast__content", children: [
        showIcon && (customIconProvided || Icon) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-toast__icon", children: customIconProvided ? toast2.icon : Icon ? /* @__PURE__ */ jsxRuntime.jsx(Icon, {}) : null }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-toast__text", children: [
          toast2.title !== void 0 && toast2.title !== null && /* @__PURE__ */ jsxRuntime.jsx(ToastPrimitive3__namespace.Title, { className: "vds-toast__title", children: toast2.title }),
          toast2.description !== void 0 && toast2.description !== null && /* @__PURE__ */ jsxRuntime.jsx(ToastPrimitive3__namespace.Description, { className: "vds-toast__description", children: toast2.description }),
          hasActions && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-toast__actions", children: [
            toast2.action && /* @__PURE__ */ jsxRuntime.jsx(
              ActionBtn,
              {
                action: toast2.action,
                toastId: toast2.id,
                dataSlot: "single",
                defaultVariant: "ghost",
                onCloseSoft: () => softClose(null)
              }
            ),
            toast2.actions?.primary && /* @__PURE__ */ jsxRuntime.jsx(
              ActionBtn,
              {
                action: toast2.actions.primary,
                toastId: toast2.id,
                dataSlot: "primary",
                defaultVariant: "primary",
                onCloseSoft: () => softClose(null)
              }
            ),
            toast2.actions?.secondary && /* @__PURE__ */ jsxRuntime.jsx(
              ActionBtn,
              {
                action: toast2.actions.secondary,
                toastId: toast2.id,
                dataSlot: "secondary",
                defaultVariant: "ghost",
                onCloseSoft: () => softClose(null)
              }
            )
          ] })
        ] }),
        toast2.dismissible && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-toast__close-container", children: [
          showProgressRing && /* @__PURE__ */ jsxRuntime.jsxs(
            "svg",
            {
              className: "vds-toast__progress-ring",
              width: 24,
              height: 24,
              viewBox: "0 0 24 24",
              "aria-hidden": true,
              focusable: false,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "circle",
                  {
                    className: "vds-toast__progress-ring-bg",
                    cx: 12,
                    cy: 12,
                    r: 10,
                    fill: "none",
                    strokeWidth: 2
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "circle",
                  {
                    className: "vds-toast__progress-ring-progress",
                    cx: 12,
                    cy: 12,
                    r: 10,
                    fill: "none",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeDasharray: PROGRESS_RING_CIRCUMFERENCE,
                    strokeDashoffset: PROGRESS_RING_CIRCUMFERENCE * (100 - progress) / 100,
                    transform: "rotate(-90 12 12)"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ToastPrimitive3__namespace.Close,
            {
              className: "vds-toast__close",
              "aria-label": closeLabel,
              onPointerDown: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon, {})
            }
          )
        ] })
      ] })
    }
  );
});
var SWIPE_DIRECTION_MAP = {
  "top-left": "left",
  "top-center": "up",
  "top-right": "right",
  "bottom-left": "left",
  "bottom-center": "down",
  "bottom-right": "right"
};
var EMPTY = Object.freeze([]);
function getServerSnapshot() {
  return EMPTY;
}
var DEFAULT_HOTKEY = Object.freeze(["F8"]);
function Toaster({
  position = "top-right",
  duration = 4e3,
  visibleToasts = 3,
  expand = false,
  hotkey,
  swipeThreshold = 50,
  dir,
  className,
  closeLabel = "Close notification",
  maxToasts: maxToasts2,
  label = "Notifications",
  timerMode = "parallel",
  pauseMode = "hover"
}) {
  react.useEffect(() => {
    toastStore.setDefaultDuration(duration);
  }, [duration]);
  react.useEffect(() => {
    toastStore.setMaxToasts(maxToasts2);
  }, [maxToasts2]);
  const toasts = react.useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot
  );
  const [heights, setHeights] = react.useState(() => /* @__PURE__ */ new Map());
  const [isExpanded, setIsExpanded] = react.useState(expand);
  const hoverTimeout = react.useRef(null);
  const reportHeight = react.useCallback((id, height) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev;
      const next = new Map(prev);
      next.set(id, height);
      return next;
    });
  }, []);
  react.useEffect(() => {
    setHeights((prev) => {
      if (prev.size === 0) return prev;
      const ids = new Set(toasts.map((t) => t.id));
      let changed = false;
      const next = new Map(prev);
      for (const key of Array.from(next.keys())) {
        if (!ids.has(key)) {
          next.delete(key);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [toasts]);
  const visibleList = react.useMemo(() => {
    if (toasts.length === 0) return EMPTY;
    return toasts.slice(-visibleToasts).reverse();
  }, [toasts, visibleToasts]);
  const isBottom = position.startsWith("bottom");
  const toastsWithOffsets = react.useMemo(() => {
    const out = [];
    let cumulative = 0;
    for (let i = 0; i < visibleList.length; i++) {
      const t = visibleList[i];
      const offsetMagnitude = i === 0 ? 0 : cumulative;
      out.push({
        toast: t,
        index: i,
        offset: isBottom ? -offsetMagnitude : offsetMagnitude
      });
      const h = heights.get(t.id) ?? 64;
      cumulative += isExpanded ? h + 16 : Math.max(20, h * 0.3);
    }
    return out;
  }, [visibleList, heights, isExpanded, isBottom]);
  react.useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      const list = toastStore.getSnapshot();
      if (list.length === 0) return;
      const top = list[list.length - 1];
      if (top.dismissible) toastStore.remove(top.id);
    };
    document.addEventListener("keydown", onKey, { passive: true });
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const canHover = react.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  }, []);
  const handleMouseEnter = react.useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (!canHover()) return;
    hoverTimeout.current = window.setTimeout(() => setIsExpanded(true), 50);
  }, [canHover]);
  const handleMouseLeave = react.useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (!canHover()) return;
    hoverTimeout.current = window.setTimeout(
      () => setIsExpanded(expand),
      50
    );
  }, [canHover, expand]);
  react.useEffect(() => {
    return () => {
      if (hoverTimeout.current !== null) {
        window.clearTimeout(hoverTimeout.current);
      }
    };
  }, []);
  const swipeDirection = SWIPE_DIRECTION_MAP[position];
  const effectiveHotkey = hotkey ?? DEFAULT_HOTKEY;
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Provider,
    {
      duration,
      swipeDirection,
      swipeThreshold,
      label,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ToastPrimitive3__namespace.Viewport,
        {
          className: utils.cn("vds-toaster", `vds-toaster--${position}`, className),
          "data-position": position,
          "data-expanded": isExpanded || void 0,
          dir,
          hotkey: effectiveHotkey,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          children: toastsWithOffsets.map(({ toast: toast2, index, offset }) => /* @__PURE__ */ jsxRuntime.jsx(
            ToastItem,
            {
              toast: toast2,
              index,
              expanded: isExpanded,
              offset,
              reportHeight,
              closeLabel,
              timerMode,
              pauseMode
            },
            toast2.id
          ))
        }
      )
    }
  );
}

// src/toast.ts
function emit(opts) {
  return toastStore.add(opts);
}
function resolveMessage(value, data) {
  return typeof value === "function" ? value(data) : value;
}
var toast = Object.assign(
  (opts) => emit(opts),
  {
    success(title, description, opts) {
      return emit({ ...opts, type: "success", title, description });
    },
    error(title, description, opts) {
      return emit({ ...opts, type: "error", title, description });
    },
    warning(title, description, opts) {
      return emit({ ...opts, type: "warning", title, description });
    },
    info(title, description, opts) {
      return emit({ ...opts, type: "info", title, description });
    },
    loading(title, description, opts) {
      return emit({
        ...opts,
        type: "loading",
        title,
        description,
        duration: opts?.duration ?? 0
      });
    },
    message(title, description, opts) {
      return emit({ ...opts, type: "default", title, description });
    },
    dismiss(id) {
      if (id) toastStore.remove(id);
      else toastStore.removeAll();
    },
    promise(promise, messages, opts) {
      const id = emit({
        ...opts,
        type: "loading",
        title: messages.loading,
        description: messages.description,
        duration: 0
      });
      const p = typeof promise === "function" ? promise() : promise;
      return p.then(
        (data) => {
          toastStore.update(id, {
            type: "success",
            title: resolveMessage(messages.success, data),
            description: messages.successDescription !== void 0 ? resolveMessage(messages.successDescription, data) : void 0
          });
          return data;
        },
        (err) => {
          toastStore.update(id, {
            type: "error",
            title: resolveMessage(messages.error, err),
            description: messages.errorDescription !== void 0 ? resolveMessage(messages.errorDescription, err) : void 0
          });
          throw err;
        }
      );
    },
    withAction(title, description, action, opts) {
      return emit({ ...opts, title, description, action });
    },
    withActions(title, description, actions, opts) {
      return emit({ ...opts, title, description, actions });
    },
    undo(title, description, onUndo, opts) {
      const id = createToastId();
      const undoLabel = opts?.undoLabel ?? "Undo";
      emit({
        type: "success",
        duration: 5e3,
        ...opts,
        id,
        title,
        description,
        actions: {
          primary: {
            label: undoLabel,
            variant: "ghost",
            onClick: () => {
              onUndo();
              toastStore.remove(id);
            }
          }
        }
      });
      return id;
    },
    confirm(title, description, onConfirm, onCancel, opts) {
      const id = createToastId();
      const confirmLabel = opts?.confirmLabel ?? "Confirm";
      const cancelLabel = opts?.cancelLabel ?? "Cancel";
      emit({
        type: "warning",
        ...opts,
        id,
        title,
        description,
        duration: 0,
        actions: {
          primary: {
            label: confirmLabel,
            variant: opts?.confirmVariant ?? "primary",
            onClick: () => {
              onConfirm();
              toastStore.remove(id);
            }
          },
          secondary: {
            label: cancelLabel,
            variant: opts?.cancelVariant ?? "ghost",
            onClick: () => {
              onCancel?.();
              toastStore.remove(id);
            }
          }
        }
      });
      return id;
    }
  }
);
var EMPTY2 = Object.freeze([]);
function getServerSnapshot2() {
  return EMPTY2;
}
function useToast() {
  const toasts = react.useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot2
  );
  return {
    toasts,
    toast,
    dismiss: (id) => toast.dismiss(id),
    dismissAll: () => toast.dismiss()
  };
}
var ToastProvider = ToastPrimitive3__namespace.Provider;
function ToastViewport({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Viewport,
    {
      ref,
      className: utils.cn("vds-toaster", className),
      ...props
    }
  );
}
function ToastRoot({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Root,
    {
      ref,
      className: utils.cn("vds-toast", className),
      ...props
    }
  );
}
function ToastTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Title,
    {
      ref,
      className: utils.cn("vds-toast__title", className),
      ...props
    }
  );
}
function ToastDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Description,
    {
      ref,
      className: utils.cn("vds-toast__description", className),
      ...props
    }
  );
}
function ToastAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Action,
    {
      ref,
      className: utils.cn("vds-toast-action", className),
      ...props
    }
  );
}
function ToastClose({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitive3__namespace.Close,
    {
      ref,
      className: utils.cn("vds-toast__close", className),
      ...props
    }
  );
}

exports.ToastAction = ToastAction;
exports.ToastClose = ToastClose;
exports.ToastDescription = ToastDescription;
exports.ToastProvider = ToastProvider;
exports.ToastRoot = ToastRoot;
exports.ToastTitle = ToastTitle;
exports.ToastViewport = ToastViewport;
exports.Toaster = Toaster;
exports.createToastId = createToastId;
exports.toast = toast;
exports.toastStore = toastStore;
exports.useToast = useToast;
