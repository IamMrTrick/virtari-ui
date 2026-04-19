"use client";
'use strict';

var react = require('react');
var SwitchPrimitive = require('@radix-ui/react-switch');
var utils = require('@virtari/utils');
var reactDom = require('react-dom');
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

var SwitchPrimitive__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitive);

// src/Switch.tsx
var DRAG_THRESHOLD_PX = 6;
var VELOCITY_WINDOW_MS = 80;
var VELOCITY_THRESHOLD_PX_PER_MS = 0.3;
var SAMPLE_CAPACITY = 4;
var CLICK_SUPPRESSION_TTL_MS = 500;
function measureRange(root, thumb) {
  const rootWidth = root.clientWidth;
  const thumbWidth = thumb.offsetWidth;
  const styles = getComputedStyle(root);
  const padding = parseFloat(styles.paddingInlineStart || styles.paddingLeft || "0") + parseFloat(styles.paddingInlineEnd || styles.paddingRight || "0");
  return Math.max(rootWidth - thumbWidth - padding, 0);
}
function readTranslateX(thumb) {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(thumb).transform);
  return matrix.m41;
}
function computeVelocity(samples) {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  let first = samples[0];
  for (let i = samples.length - 2; i >= 0; i--) {
    if (last.t - samples[i].t <= VELOCITY_WINDOW_MS) {
      first = samples[i];
    } else {
      break;
    }
  }
  const dt = Math.max(last.t - first.t, 1);
  return (last.x - first.x) / dt;
}
function useSwitchDrag(config) {
  const rootElRef = react.useRef(null);
  const thumbElRef = react.useRef(null);
  const sessionRef = react.useRef(null);
  const suppressClickUntilRef = react.useRef(0);
  const configRef = react.useRef(config);
  configRef.current = config;
  const onNativeClick = react.useCallback((event) => {
    if (performance.now() >= suppressClickUntilRef.current) return;
    suppressClickUntilRef.current = 0;
    event.stopPropagation();
    event.preventDefault();
  }, []);
  const rootRef = react.useCallback(
    (node) => {
      const previous = rootElRef.current;
      if (previous && previous !== node) {
        previous.removeEventListener("click", onNativeClick, true);
      }
      rootElRef.current = node;
      if (node && node !== previous) {
        node.addEventListener("click", onNativeClick, true);
      }
    },
    [onNativeClick]
  );
  const thumbRef = react.useCallback((node) => {
    thumbElRef.current = node;
  }, []);
  const cleanupVisuals = react.useCallback(() => {
    const root = rootElRef.current;
    const thumb = thumbElRef.current;
    if (root) root.removeAttribute("data-dragging");
    if (thumb) thumb.style.translate = "";
  }, []);
  react.useEffect(() => {
    return () => {
      const root = rootElRef.current;
      if (root) root.removeEventListener("click", onNativeClick, true);
      cleanupVisuals();
    };
  }, [cleanupVisuals, onNativeClick]);
  const handlers = react.useMemo(() => {
    const onPointerDown = (event) => {
      const { enabled, getChecked } = configRef.current;
      if (!enabled) return;
      if (sessionRef.current) return;
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const root = rootElRef.current;
      const thumb = thumbElRef.current;
      if (!root || !thumb) return;
      const range = measureRange(root, thumb);
      if (range <= 0) return;
      suppressClickUntilRef.current = 0;
      const isRtl = getComputedStyle(root).direction === "rtl";
      const checked = getChecked();
      const startTranslate = checked ? range : 0;
      sessionRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startTime: event.timeStamp,
        startChecked: checked,
        range,
        startTranslate,
        rtlSign: isRtl ? -1 : 1,
        dragging: false,
        samples: [{ x: event.clientX, t: event.timeStamp }]
      };
      try {
        root.setPointerCapture(event.pointerId);
      } catch {
      }
    };
    const onPointerMove = (event) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      const deltaX = (event.clientX - session.startX) * session.rtlSign;
      if (session.samples.length >= SAMPLE_CAPACITY) session.samples.shift();
      session.samples.push({ x: event.clientX, t: event.timeStamp });
      if (!session.dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
        session.dragging = true;
        rootElRef.current?.setAttribute("data-dragging", "");
      }
      const next = Math.min(Math.max(session.startTranslate + deltaX, 0), session.range);
      const thumb = thumbElRef.current;
      if (thumb) thumb.style.translate = `${next}px 0`;
    };
    const releaseCapture = (session) => {
      const root = rootElRef.current;
      if (!root) return;
      try {
        if (root.hasPointerCapture(session.pointerId)) {
          root.releasePointerCapture(session.pointerId);
        }
      } catch {
      }
    };
    const finish = (session, cancelled) => {
      releaseCapture(session);
      if (cancelled) {
        cleanupVisuals();
        return;
      }
      suppressClickUntilRef.current = performance.now() + CLICK_SUPPRESSION_TTL_MS;
      if (!session.dragging) {
        reactDom.flushSync(() => {
          configRef.current.onCommit(!session.startChecked);
        });
        cleanupVisuals();
        return;
      }
      const velocity = computeVelocity(session.samples) * session.rtlSign;
      const thumb = thumbElRef.current;
      const currentTranslate = thumb ? readTranslateX(thumb) : session.startTranslate;
      const midpoint = session.range / 2;
      const desired = Math.abs(velocity) >= VELOCITY_THRESHOLD_PX_PER_MS ? velocity > 0 : currentTranslate >= midpoint;
      if (desired !== session.startChecked) {
        reactDom.flushSync(() => {
          configRef.current.onCommit(desired);
        });
      }
      cleanupVisuals();
    };
    const onPointerUp = (event) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, false);
    };
    const onPointerCancel = (event) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, true);
    };
    const onLostPointerCapture = (event) => {
      const session = sessionRef.current;
      if (!session || session.pointerId !== event.pointerId) return;
      sessionRef.current = null;
      finish(session, true);
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture
    };
  }, [cleanupVisuals]);
  return { rootRef, thumbRef, handlers };
}
function Switch({
  size = "md",
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  dragEnabled = true,
  ref,
  ...props
}) {
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = react.useState(defaultChecked ?? false);
  const currentChecked = isControlled ? checked : internalChecked;
  const handleCheckedChange = react.useCallback(
    (next) => {
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange]
  );
  const drag = useSwitchDrag({
    enabled: dragEnabled && !disabled,
    getChecked: () => currentChecked,
    onCommit: handleCheckedChange
  });
  const setRootRef = react.useCallback(
    (node) => {
      drag.rootRef(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [drag, ref]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    SwitchPrimitive__namespace.Root,
    {
      ref: setRootRef,
      className: utils.cn("vds-switch", className),
      "data-size": size,
      checked: currentChecked,
      onCheckedChange: handleCheckedChange,
      disabled,
      ...drag.handlers,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(SwitchPrimitive__namespace.Thumb, { ref: drag.thumbRef, className: "vds-switch-thumb" })
    }
  );
}

exports.Switch = Switch;
