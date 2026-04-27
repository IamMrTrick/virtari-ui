'use strict';

var react = require('react');
var utils = require('@virtari-packages/utils');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
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

var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);

// src/SegmentedControl.tsx
function useSegmentedIndicator(listRef) {
  react.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const el = listRef.current;
      if (!el) return;
      const active = el.querySelector('[data-state="checked"]');
      if (!active) {
        el.style.setProperty("--tabs-indicator-ready", "0");
        return;
      }
      const rtl = getComputedStyle(el).direction === "rtl";
      const tx = rtl ? active.offsetLeft + active.offsetWidth - el.clientWidth : active.offsetLeft;
      el.style.setProperty("--tabs-indicator-tx", `${tx}px`);
      el.style.setProperty("--tabs-indicator-ty", `${active.offsetTop}px`);
      el.style.setProperty("--tabs-indicator-w", `${active.offsetWidth}px`);
      el.style.setProperty("--tabs-indicator-h", `${active.offsetHeight}px`);
      el.style.setProperty("--tabs-indicator-ready", "1");
    };
    let rafId = 0;
    const update = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(update);
    ro.observe(list);
    const observeItems = () => {
      list.querySelectorAll('[role="radio"]').forEach((t) => ro.observe(t));
    };
    observeItems();
    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === "childList")) observeItems();
      update();
    });
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state", "data-orientation"],
      subtree: true,
      childList: true
    });
    window.addEventListener("resize", update);
    measure();
    update();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef]);
}
function SegmentedControl({
  size = "md",
  fullWidth = false,
  orientation = "horizontal",
  disabled,
  className,
  children,
  ref,
  ...props
}) {
  const listRef = react.useRef(null);
  useSegmentedIndicator(listRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      ref,
      orientation,
      disabled,
      "data-full-width": fullWidth ? "true" : void 0,
      "data-disabled": disabled || void 0,
      className: utils.cn("vds-segmented-control", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: listRef,
          className: "vds-tabs-list",
          "data-variant": "segmented",
          "data-animated": "true",
          "data-size": size,
          "data-full-width": fullWidth ? "true" : void 0,
          "data-orientation": orientation,
          children
        }
      )
    }
  );
}
function SegmentedControlItem({
  icon,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    RadioGroupPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-tabs-trigger", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-segmented-control-icon", "aria-hidden": "true", children: icon }),
        children
      ]
    }
  );
}

exports.SegmentedControl = SegmentedControl;
exports.SegmentedControlItem = SegmentedControlItem;
