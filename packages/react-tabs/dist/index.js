import { cn } from '@virtari/utils';
import { useRef, useImperativeHandle, useLayoutEffect } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { jsx } from 'react/jsx-runtime';

// src/Tabs.tsx
function useTabsIndicator(listRef, enabled) {
  useLayoutEffect(() => {
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
var Tabs = TabsPrimitive.Root;
function TabsList({
  className,
  variant = "underline",
  size = "md",
  fullWidth,
  animatedIndicator = true,
  ref,
  ...props
}) {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current, []);
  useTabsIndicator(innerRef, animatedIndicator);
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      ref: innerRef,
      className: cn("vds-tabs-list", className),
      "data-variant": variant,
      "data-size": size,
      "data-full-width": fullWidth ? "true" : void 0,
      "data-animated": animatedIndicator ? "true" : void 0,
      ...props
    }
  );
}
function TabsTrigger({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      ref,
      className: cn("vds-tabs-trigger", className),
      ...props
    }
  );
}
function TabsContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      ref,
      className: cn("vds-tabs-content", className),
      ...props
    }
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
