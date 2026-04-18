import { memo, useRef, useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import * as ToastPrimitive3 from '@radix-ui/react-toast';
import { cn } from '@virtari/utils';
import { jsx, jsxs } from 'react/jsx-runtime';

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
var SVG_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  "aria-hidden": true,
  focusable: false
};
var SuccessIcon = memo(function SuccessIcon2() {
  return /* @__PURE__ */ jsx("svg", { ...SVG_PROPS, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M16.25 5.625 7.5 14.375 3.75 10.625",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
});
var ErrorIcon = memo(function ErrorIcon2() {
  return /* @__PURE__ */ jsx("svg", { ...SVG_PROPS, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M15 5 5 15M5 5l10 10",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
});
var WarningIcon = memo(function WarningIcon2() {
  return /* @__PURE__ */ jsx("svg", { ...SVG_PROPS, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M10 6.25v4.375M10 14.375h.008M18.125 10a8.125 8.125 0 1 1-16.25 0 8.125 8.125 0 0 1 16.25 0Z",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
});
var InfoIcon = memo(function InfoIcon2() {
  return /* @__PURE__ */ jsx("svg", { ...SVG_PROPS, children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M10 9.375v5M10 6.25h.008M18.125 10a8.125 8.125 0 1 1-16.25 0 8.125 8.125 0 0 1 16.25 0Z",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
});
var LoadingIcon = memo(function LoadingIcon2() {
  return /* @__PURE__ */ jsx("svg", { ...SVG_PROPS, className: "vds-toast__spinner", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M10 1.875A8.125 8.125 0 1 1 1.875 10",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round"
    }
  ) });
});
var CloseIcon = memo(function CloseIcon2() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      fill: "none",
      "aria-hidden": true,
      focusable: false,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9 3 3 9M3 3l6 6",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
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
function ActionBtn({ action, toastId, dataSlot, defaultVariant }) {
  const variant = action.variant ?? defaultVariant ?? "ghost";
  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      action.onClick();
      if (action.closeOnClick !== false) {
        toastStore.remove(toastId);
      }
    },
    [action, toastId]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: cn(
        "vds-toast-action",
        `vds-toast-action--${variant}`,
        `vds-toast-action--slot-${dataSlot}`
      ),
      "data-variant": variant,
      "data-slot": dataSlot,
      onClick: handleClick,
      children: action.label
    }
  );
}
var ToastItem = memo(function ToastItem2({
  toast: toast2,
  index,
  expanded,
  offset,
  reportHeight,
  closeLabel
}) {
  const rootRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(100);
  const startRef = useRef(Date.now());
  const pauseAtRef = useRef(null);
  const hasActions = Boolean(toast2.action) || Boolean(toast2.actions?.primary) || Boolean(toast2.actions?.secondary);
  const Icon = TOAST_ICON_MAP[toast2.type];
  const showIcon = toast2.icon !== false;
  const customIconProvided = toast2.icon !== void 0 && toast2.icon !== false;
  useEffect(() => {
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
  useEffect(() => {
    progressRef.current = 100;
    startRef.current = Date.now();
    pauseAtRef.current = null;
    setProgress(100);
  }, [toast2.id, toast2.duration, toast2.createdAt]);
  useEffect(() => {
    if (toast2.duration <= 0) return;
    if (paused) {
      pauseAtRef.current = Date.now();
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
      if (remaining <= 0) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [toast2.duration, toast2.id, toast2.createdAt, paused]);
  const handleOpenChange = useCallback(
    (open) => {
      if (!open) toastStore.remove(toast2.id);
    },
    [toast2.id]
  );
  const handlePause = useCallback(() => setPaused(true), []);
  const handleResume = useCallback(() => setPaused(false), []);
  const stackStyle = useMemo(() => {
    const scale = expanded ? 1 : computeScale(index);
    const opacity = expanded ? 1 : computeOpacity(index);
    const vars = {
      "--vds-toast-y": `${offset}px`,
      "--vds-toast-scale": scale,
      "--vds-toast-opacity": opacity,
      zIndex: 1e3 - index
    };
    return vars;
  }, [offset, index, expanded]);
  const showProgressRing = toast2.duration > 0 && progress > 0 && progress < 100 && toast2.dismissible;
  const rootClassName = cn(
    "vds-toast",
    `vds-toast--${toast2.type}`,
    index > 0 && "vds-toast--stacked",
    hasActions && "vds-toast--has-actions"
  );
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Root,
    {
      ref: rootRef,
      className: rootClassName,
      style: stackStyle,
      duration: toast2.duration > 0 ? toast2.duration : Number.POSITIVE_INFINITY,
      open: true,
      onOpenChange: handleOpenChange,
      onPause: handlePause,
      onResume: handleResume,
      "data-type": toast2.type,
      "data-index": index,
      "data-expanded": expanded || void 0,
      "data-has-actions": hasActions || void 0,
      children: /* @__PURE__ */ jsxs("div", { className: "vds-toast__content", children: [
        showIcon && (customIconProvided || Icon) && /* @__PURE__ */ jsx("div", { className: "vds-toast__icon", children: customIconProvided ? toast2.icon : Icon ? /* @__PURE__ */ jsx(Icon, {}) : null }),
        /* @__PURE__ */ jsxs("div", { className: "vds-toast__text", children: [
          toast2.title !== void 0 && toast2.title !== null && /* @__PURE__ */ jsx(ToastPrimitive3.Title, { className: "vds-toast__title", children: toast2.title }),
          toast2.description !== void 0 && toast2.description !== null && /* @__PURE__ */ jsx(ToastPrimitive3.Description, { className: "vds-toast__description", children: toast2.description }),
          hasActions && /* @__PURE__ */ jsxs("div", { className: "vds-toast__actions", children: [
            toast2.action && /* @__PURE__ */ jsx(
              ActionBtn,
              {
                action: toast2.action,
                toastId: toast2.id,
                dataSlot: "single",
                defaultVariant: "ghost"
              }
            ),
            toast2.actions?.primary && /* @__PURE__ */ jsx(
              ActionBtn,
              {
                action: toast2.actions.primary,
                toastId: toast2.id,
                dataSlot: "primary",
                defaultVariant: "primary"
              }
            ),
            toast2.actions?.secondary && /* @__PURE__ */ jsx(
              ActionBtn,
              {
                action: toast2.actions.secondary,
                toastId: toast2.id,
                dataSlot: "secondary",
                defaultVariant: "ghost"
              }
            )
          ] })
        ] }),
        toast2.dismissible && /* @__PURE__ */ jsxs("div", { className: "vds-toast__close-container", children: [
          showProgressRing && /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "vds-toast__progress-ring",
              width: 24,
              height: 24,
              viewBox: "0 0 24 24",
              "aria-hidden": true,
              focusable: false,
              children: [
                /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
            ToastPrimitive3.Close,
            {
              className: "vds-toast__close",
              "aria-label": closeLabel,
              children: /* @__PURE__ */ jsx(CloseIcon, {})
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
  label = "Notifications"
}) {
  useEffect(() => {
    toastStore.setDefaultDuration(duration);
  }, [duration]);
  useEffect(() => {
    toastStore.setMaxToasts(maxToasts2);
  }, [maxToasts2]);
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerSnapshot
  );
  const [heights, setHeights] = useState(() => /* @__PURE__ */ new Map());
  const [isExpanded, setIsExpanded] = useState(expand);
  const hoverTimeout = useRef(null);
  const reportHeight = useCallback((id, height) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev;
      const next = new Map(prev);
      next.set(id, height);
      return next;
    });
  }, []);
  useEffect(() => {
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
  const visibleList = useMemo(() => {
    if (toasts.length === 0) return EMPTY;
    return toasts.slice(-visibleToasts).reverse();
  }, [toasts, visibleToasts]);
  const isBottom = position.startsWith("bottom");
  const toastsWithOffsets = useMemo(() => {
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
  useEffect(() => {
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
  const canHover = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  }, []);
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    if (!canHover()) return;
    hoverTimeout.current = window.setTimeout(() => setIsExpanded(true), 50);
  }, [canHover]);
  const handleMouseLeave = useCallback(() => {
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
  useEffect(() => {
    return () => {
      if (hoverTimeout.current !== null) {
        window.clearTimeout(hoverTimeout.current);
      }
    };
  }, []);
  const swipeDirection = SWIPE_DIRECTION_MAP[position];
  const effectiveHotkey = hotkey ?? DEFAULT_HOTKEY;
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Provider,
    {
      duration,
      swipeDirection,
      swipeThreshold,
      label,
      children: /* @__PURE__ */ jsx(
        ToastPrimitive3.Viewport,
        {
          className: cn("vds-toaster", `vds-toaster--${position}`, className),
          "data-position": position,
          "data-expanded": isExpanded || void 0,
          dir,
          hotkey: effectiveHotkey,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          children: toastsWithOffsets.map(({ toast: toast2, index, offset }) => /* @__PURE__ */ jsx(
            ToastItem,
            {
              toast: toast2,
              index,
              expanded: isExpanded,
              offset,
              reportHeight,
              closeLabel
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
  const toasts = useSyncExternalStore(
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
var ToastProvider = ToastPrimitive3.Provider;
function ToastViewport({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Viewport,
    {
      ref,
      className: cn("vds-toaster", className),
      ...props
    }
  );
}
function ToastRoot({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Root,
    {
      ref,
      className: cn("vds-toast", className),
      ...props
    }
  );
}
function ToastTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Title,
    {
      ref,
      className: cn("vds-toast__title", className),
      ...props
    }
  );
}
function ToastDescription({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Description,
    {
      ref,
      className: cn("vds-toast__description", className),
      ...props
    }
  );
}
function ToastAction({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Action,
    {
      ref,
      className: cn("vds-toast-action", className),
      ...props
    }
  );
}
function ToastClose({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ToastPrimitive3.Close,
    {
      ref,
      className: cn("vds-toast__close", className),
      ...props
    }
  );
}

export { ToastAction, ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport, Toaster, createToastId, toast, toastStore, useToast };
