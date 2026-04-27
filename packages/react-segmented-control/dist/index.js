import { useRef, useLayoutEffect } from 'react';
import { cn } from '@virtari-packages/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/SegmentedControl.tsx
function useSegmentedIndicator(listRef) {
  useLayoutEffect(() => {
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
  const listRef = useRef(null);
  useSegmentedIndicator(listRef);
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      orientation,
      disabled,
      "data-full-width": fullWidth ? "true" : void 0,
      "data-disabled": disabled || void 0,
      className: cn("vds-segmented-control", className),
      ...props,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-tabs-trigger", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "vds-segmented-control-icon", "aria-hidden": "true", children: icon }),
        children
      ]
    }
  );
}

export { SegmentedControl, SegmentedControlItem };
