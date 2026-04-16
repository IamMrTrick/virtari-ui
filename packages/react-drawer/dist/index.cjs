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
var DURATION = 0.5;
var EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";
var CLOSE_THRESHOLD = 0.25;
var VELOCITY_THRESHOLD = 0.4;
var BORDER_RADIUS = 8;
function setStyle(el, styles) {
  if (!el) return;
  for (const [key, value] of Object.entries(styles)) {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
    } else {
      el.style[key] = value;
    }
  }
}
function dampen(v) {
  return 8 * (Math.log(v + 1) - 2);
}
function Drawer({
  children,
  direction = "bottom",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  scaleBackground = false,
  modal = true,
  dismissible = true,
  preventAutoFocus = true
}) {
  const [internalOpen, setInternalOpen] = react.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const [visible, setVisible] = react.useState(open);
  const [mounted, setMounted] = react.useState(false);
  const [dragging, setDragging] = react.useState(false);
  const contentRef = react.useRef(null);
  const overlayRef = react.useRef(null);
  const onOpenChange = react.useCallback(
    (value) => {
      if (!dismissible && !value) return;
      if (value) {
        setVisible(true);
        if (!isControlled) setInternalOpen(true);
        controlledOnOpenChange?.(true);
      } else {
        setMounted(false);
        if (scaleBackground) {
          const wrapper = document.querySelector("[data-vds-drawer-wrapper]");
          if (wrapper) {
            setStyle(wrapper, {
              transition: `transform ${DURATION}s ${EASE_CSS}, border-radius ${DURATION}s ${EASE_CSS}`,
              transform: "",
              borderRadius: ""
            });
          }
        }
        setTimeout(() => {
          setVisible(false);
          if (!isControlled) setInternalOpen(false);
          controlledOnOpenChange?.(false);
        }, DURATION * 1e3);
      }
    },
    [isControlled, controlledOnOpenChange, dismissible, scaleBackground]
  );
  react.useLayoutEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMounted(true);
        });
      });
    }
  }, [visible]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DrawerProvider,
    {
      value: {
        direction,
        open: visible,
        dragging,
        snapIndex: 0,
        contentRef,
        overlayRef,
        onOpenChange,
        mounted,
        setDragging,
        scaleBackground,
        preventAutoFocus
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Root, { open: visible, onOpenChange, modal, children })
    }
  );
}
var DrawerTrigger = DialogPrimitive__namespace.Trigger;
var DrawerClose = DialogPrimitive__namespace.Close;
function DrawerOverlay({ className, ref, ...props }) {
  const { overlayRef, mounted } = useDrawerContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      ref: (node) => {
        overlayRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      className: utils.cn("vds-drawer-overlay", className),
      "data-mounted": mounted || void 0,
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ref,
  ...props
}) {
  const {
    direction,
    contentRef,
    overlayRef,
    mounted,
    dragging,
    setDragging,
    onOpenChange,
    scaleBackground,
    preventAutoFocus
  } = useDrawerContext();
  const pointerStart = react.useRef({ x: 0, y: 0, time: 0 });
  const dragDelta = react.useRef(0);
  const isDraggingRef = react.useRef(false);
  const drawerSizeRef = react.useRef(0);
  react.useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el || !mounted) return;
    drawerSizeRef.current = direction === "left" || direction === "right" ? el.offsetWidth : el.offsetHeight;
  }, [mounted, direction, contentRef]);
  const getDragDelta = (clientX, clientY) => {
    switch (direction) {
      case "bottom":
        return clientY - pointerStart.current.y;
      case "top":
        return pointerStart.current.y - clientY;
      case "right":
        return clientX - pointerStart.current.x;
      case "left":
        return pointerStart.current.x - clientX;
    }
  };
  const getTranslate = (offset) => {
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
  };
  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDraggingRef.current = false;
    dragDelta.current = 0;
    const el = contentRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.willChange = "transform";
      el.setPointerCapture(e.pointerId);
    }
  };
  const handlePointerMove = (e) => {
    if (!pointerStart.current.time) return;
    const delta = getDragDelta(e.clientX, e.clientY);
    if (!isDraggingRef.current) {
      if (delta < 8) return;
      isDraggingRef.current = true;
      setDragging(true);
      pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      return;
    }
    e.preventDefault();
    const rawDelta = getDragDelta(e.clientX, e.clientY);
    const clampedDelta = rawDelta > 0 ? rawDelta : dampen(-rawDelta) * -1;
    dragDelta.current = rawDelta;
    const el = contentRef.current;
    if (el) {
      el.style.transform = getTranslate(Math.max(0, clampedDelta));
    }
    const overlayEl = overlayRef.current;
    if (overlayEl && drawerSizeRef.current > 0) {
      const progress = 1 - Math.max(0, clampedDelta) / drawerSizeRef.current;
      overlayEl.style.opacity = String(Math.max(0, Math.min(1, progress)));
    }
    if (scaleBackground && drawerSizeRef.current > 0) {
      const progress = Math.max(0, clampedDelta) / drawerSizeRef.current;
      const scale = 1 - (1 - progress) * 0.06;
      const radius = (1 - progress) * BORDER_RADIUS;
      const wrapper = document.querySelector("[data-vds-drawer-wrapper]");
      if (wrapper) {
        wrapper.style.transition = "none";
        wrapper.style.transform = `scale(${Math.min(1, Math.max(0.94, scale))})`;
        wrapper.style.borderRadius = `${radius}px`;
      }
    }
  };
  const handlePointerUp = (_e) => {
    if (!pointerStart.current.time) return;
    const el = contentRef.current;
    const elapsed = Math.max(Date.now() - pointerStart.current.time, 1);
    const velocity = dragDelta.current / elapsed;
    const shouldClose = velocity > VELOCITY_THRESHOLD || dragDelta.current > 0 && dragDelta.current > drawerSizeRef.current * CLOSE_THRESHOLD;
    pointerStart.current = { x: 0, y: 0, time: 0 };
    isDraggingRef.current = false;
    setDragging(false);
    if (el) {
      el.style.willChange = "";
      el.style.transition = `transform ${DURATION}s ${EASE_CSS}`;
    }
    if (shouldClose) {
      if (el) {
        el.style.transform = getTranslate(drawerSizeRef.current);
      }
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.style.transition = `opacity ${DURATION}s ${EASE_CSS}`;
        overlayEl.style.opacity = "0";
      }
      onOpenChange(false);
    } else {
      if (el) {
        el.style.transform = getTranslate(0);
      }
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.style.transition = `opacity ${DURATION}s ${EASE_CSS}`;
        overlayEl.style.opacity = "1";
      }
      if (scaleBackground) {
        const wrapper = document.querySelector("[data-vds-drawer-wrapper]");
        if (wrapper) {
          wrapper.style.transition = `transform ${DURATION}s ${EASE_CSS}, border-radius ${DURATION}s ${EASE_CSS}`;
          wrapper.style.transform = "scale(0.94)";
          wrapper.style.borderRadius = `${BORDER_RADIUS}px`;
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Portal, { forceMount: void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      DialogPrimitive__namespace.Content,
      {
        ref: (node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        className: utils.cn("vds-drawer-content", className),
        "data-direction": direction,
        "data-dragging": dragging || void 0,
        "data-mounted": mounted || void 0,
        onOpenAutoFocus: (e) => {
          if (preventAutoFocus) e.preventDefault();
        },
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        ...props,
        children
      }
    )
  ] });
}
function DrawerHandle({ className, ref, ...props }) {
  const { direction } = useDrawerContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-drawer-handle", className),
      "data-direction": direction,
      "aria-hidden": "true",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-drawer-handle-bar" })
    }
  );
}
function DrawerTitle({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Title, { ref, className: utils.cn("vds-drawer-title", className), ...props });
}
function DrawerDescription({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Description, { ref, className: utils.cn("vds-drawer-description", className), ...props });
}
function DrawerBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-drawer-body", className), ...props });
}
function DrawerFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-drawer-footer", className), ...props });
}

exports.Drawer = Drawer;
exports.DrawerBody = DrawerBody;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerFooter = DrawerFooter;
exports.DrawerHandle = DrawerHandle;
exports.DrawerOverlay = DrawerOverlay;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
