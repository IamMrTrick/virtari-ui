'use strict';

var utils = require('@virtari/utils');
var react = require('react');
var TabsPrimitive = require('@radix-ui/react-tabs');
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

var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);

// src/Tabs.tsx
function useTabsIndicator(listRef, enabled) {
  react.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (!enabled) {
      list.style.removeProperty("--tabs-indicator-ready");
      list.style.removeProperty("--tabs-indicator-x");
      list.style.removeProperty("--tabs-indicator-y");
      list.style.removeProperty("--tabs-indicator-w");
      list.style.removeProperty("--tabs-indicator-h");
      return;
    }
    const update = () => {
      const active = list.querySelector(
        '[role="tab"][data-state="active"]'
      );
      if (!active) {
        list.style.setProperty("--tabs-indicator-ready", "0");
        return;
      }
      list.style.setProperty("--tabs-indicator-x", `${active.offsetLeft}px`);
      list.style.setProperty("--tabs-indicator-y", `${active.offsetTop}px`);
      list.style.setProperty("--tabs-indicator-w", `${active.offsetWidth}px`);
      list.style.setProperty("--tabs-indicator-h", `${active.offsetHeight}px`);
      list.style.setProperty("--tabs-indicator-ready", "1");
    };
    const ro = new ResizeObserver(update);
    ro.observe(list);
    const observeTriggers = () => {
      list.querySelectorAll('[role="tab"]').forEach((t) => ro.observe(t));
    };
    observeTriggers();
    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === "childList")) observeTriggers();
      update();
    });
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state", "data-orientation"],
      subtree: true,
      childList: true
    });
    window.addEventListener("resize", update);
    update();
    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef, enabled]);
}
var Tabs = TabsPrimitive__namespace.Root;
function TabsList({
  className,
  variant = "underline",
  size = "md",
  fullWidth,
  animatedIndicator = true,
  ref,
  ...props
}) {
  const innerRef = react.useRef(null);
  react.useImperativeHandle(ref, () => innerRef.current, []);
  useTabsIndicator(innerRef, animatedIndicator);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.List,
    {
      ref: innerRef,
      className: utils.cn("vds-tabs-list", className),
      "data-variant": variant,
      "data-size": size,
      "data-full-width": fullWidth ? "true" : void 0,
      "data-animated": animatedIndicator ? "true" : void 0,
      ...props
    }
  );
}
function TabsTrigger({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-tabs-trigger", className),
      ...props
    }
  );
}
function TabsContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-tabs-content", className),
      ...props
    }
  );
}

exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
