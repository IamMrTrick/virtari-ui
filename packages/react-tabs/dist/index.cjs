"use client";
'use strict';

var utils = require('@virtari-packages/utils');
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
      list.style.removeProperty("--tabs-indicator-tx");
      list.style.removeProperty("--tabs-indicator-ty");
      list.style.removeProperty("--tabs-indicator-w");
      list.style.removeProperty("--tabs-indicator-h");
      return;
    }
    const measure = () => {
      const el = listRef.current;
      if (!el) return;
      const active = el.querySelector(
        '[role="tab"][data-state="active"]'
      );
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
    measure();
    update();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [listRef, enabled]);
}
function useTabsSwipe(rootRef, { enabled, threshold, maxOffset }) {
  react.useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axisLocked = null;
    let panel = null;
    const isRTL = () => getComputedStyle(root).direction === "rtl";
    const findActivePanel = () => root.querySelector(
      '[role="tabpanel"][data-state="active"]'
    );
    const clearPanel = () => {
      if (!panel) return;
      panel.style.transform = "";
      panel.style.transition = "";
      panel.removeAttribute("data-swiping");
      panel = null;
    };
    const onTouchStart = (e) => {
      const target = e.target;
      if (target.closest('[role="tablist"]')) return;
      const p = findActivePanel();
      if (!p || !target.closest('[role="tabpanel"]')) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      axisLocked = null;
      panel = p;
    };
    const onTouchMove = (e) => {
      if (!tracking || !panel) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (!axisLocked) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axisLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axisLocked === "y") {
          tracking = false;
          clearPanel();
          return;
        }
        panel.setAttribute("data-swiping", "true");
      }
      if (axisLocked === "x") {
        const clamped = Math.max(-maxOffset, Math.min(maxOffset, dx * 0.6));
        panel.style.transform = `translateX(${clamped}px)`;
      }
    };
    const onTouchEnd = (e) => {
      if (!tracking) {
        clearPanel();
        return;
      }
      const dx = e.changedTouches[0].clientX - startX;
      const absDx = Math.abs(dx);
      if (axisLocked === "x" && absDx > threshold) {
        const toNext = isRTL() ? dx > 0 : dx < 0;
        const activated = activateNeighbor(root, toNext ? "next" : "prev");
        clearPanel();
        if (!activated) return;
        return;
      }
      if (panel) {
        panel.style.transition = "transform 180ms cubic-bezier(0, 0, 0.2, 1)";
        panel.style.transform = "";
        panel.removeAttribute("data-swiping");
        const p = panel;
        panel = null;
        setTimeout(() => {
          p.style.transition = "";
        }, 200);
      }
      tracking = false;
      axisLocked = null;
    };
    const onTouchCancel = () => {
      clearPanel();
      tracking = false;
      axisLocked = null;
    };
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", onTouchEnd);
    root.addEventListener("touchcancel", onTouchCancel);
    return () => {
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchCancel);
      clearPanel();
    };
  }, [rootRef, enabled, threshold, maxOffset]);
}
function activateNeighbor(root, direction) {
  const triggers = Array.from(
    root.querySelectorAll(
      '[role="tab"]:not([disabled]):not([data-disabled])'
    )
  );
  if (triggers.length === 0) return false;
  const activeIdx = triggers.findIndex(
    (t) => t.getAttribute("data-state") === "active"
  );
  if (activeIdx === -1) return false;
  const nextIdx = direction === "next" ? Math.min(activeIdx + 1, triggers.length - 1) : Math.max(activeIdx - 1, 0);
  if (nextIdx === activeIdx) return false;
  triggers[nextIdx].click();
  triggers[nextIdx].focus({ preventScroll: true });
  return true;
}
function useResponsiveOrientation(rootRef, requested, collapseAt) {
  const [effective, setEffective] = react.useState(requested);
  react.useLayoutEffect(() => {
    if (requested !== "vertical" || !collapseAt) {
      setEffective(requested);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const compute = () => {
      const w = root.getBoundingClientRect().width;
      setEffective(w < collapseAt ? "horizontal" : "vertical");
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(root);
    return () => ro.disconnect();
  }, [rootRef, requested, collapseAt]);
  return effective;
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
function Tabs({
  className,
  orientation = "horizontal",
  collapseAt,
  swipeable = false,
  swipeThreshold = 60,
  swipeMaxOffset = 80,
  ref,
  ...props
}) {
  const rootRef = react.useRef(null);
  const effectiveOrientation = useResponsiveOrientation(
    rootRef,
    orientation,
    collapseAt
  );
  useTabsSwipe(rootRef, {
    enabled: swipeable && effectiveOrientation === "horizontal",
    threshold: swipeThreshold,
    maxOffset: swipeMaxOffset
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Root,
    {
      ref: mergeRefs(rootRef, ref),
      orientation: effectiveOrientation,
      className: utils.cn("vds-tabs", className),
      ...props
    }
  );
}
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
  useTabsIndicator(innerRef, animatedIndicator);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.List,
    {
      ref: mergeRefs(innerRef, ref),
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
function useCarouselSwipe(containerRef, trackRef, {
  enabled,
  activeIndex,
  slideCount,
  threshold,
  onCommit
}) {
  react.useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || !enabled || slideCount <= 1) return;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let axis = null;
    let pointerId = -1;
    const containerWidth = () => container.getBoundingClientRect().width;
    const clearDragInstant = () => {
      track.style.transition = "";
      track.style.transform = "";
    };
    const animateBackToBaseline = () => {
      track.style.transition = "transform 220ms cubic-bezier(0, 0, 0.2, 1)";
      track.style.transform = "";
      window.setTimeout(() => {
        track.style.transition = "";
      }, 240);
    };
    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target;
      if (target.closest(
        'button, a, input, textarea, select, [role="tab"], [role="tablist"], [contenteditable="true"]'
      )) {
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      axis = null;
      pointerId = e.pointerId;
    };
    const onPointerMove = (e) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") {
          dragging = false;
          return;
        }
        track.style.transition = "none";
        container.setPointerCapture(e.pointerId);
      }
      if (axis === "x") {
        if (e.cancelable) e.preventDefault();
        const w = containerWidth();
        const baseline = -activeIndex * w;
        let effective = dx;
        const atStart = activeIndex === 0 && dx > 0;
        const atEnd = activeIndex === slideCount - 1 && dx < 0;
        if (atStart || atEnd) effective = dx * 0.25;
        track.style.transform = `translateX(${baseline + effective}px)`;
      }
    };
    const onPointerUp = (e) => {
      if (!dragging) {
        clearDragInstant();
        return;
      }
      if (e.pointerId !== pointerId) return;
      container.releasePointerCapture?.(e.pointerId);
      const dx = e.clientX - startX;
      dragging = false;
      if (axis === "x" && Math.abs(dx) > threshold) {
        const dir = dx < 0 ? "next" : "prev";
        track.style.transition = "";
        axis = null;
        if (onCommit(dir)) return;
        animateBackToBaseline();
        return;
      }
      animateBackToBaseline();
      axis = null;
    };
    const onPointerCancel = () => {
      dragging = false;
      axis = null;
      clearDragInstant();
    };
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointermove", onPointerMove, { passive: false });
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      clearDragInstant();
    };
  }, [containerRef, trackRef, enabled, activeIndex, slideCount, threshold, onCommit]);
}
function TabsPanels({
  children,
  className,
  swipeable = true,
  swipeThreshold = 50,
  touchOnly = true,
  ref
}) {
  const containerRef = react.useRef(null);
  const trackRef = react.useRef(null);
  const [activeIndex, setActiveIndex] = react.useState(0);
  const [isTouch, setIsTouch] = react.useState(!touchOnly);
  const slides = [];
  react.Children.forEach(children, (child) => {
    if (!react.isValidElement(child)) return;
    const cloned = react.cloneElement(
      child,
      { forceMount: true }
    );
    slides.push(cloned);
  });
  const slideCount = slides.length;
  react.useLayoutEffect(() => {
    if (!touchOnly) {
      setIsTouch(true);
      return;
    }
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, [touchOnly]);
  react.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const panels = container.querySelectorAll(
        ':scope > .vds-tabs-panels-track > .vds-tabs-panels-slide > [role="tabpanel"]'
      );
      const idx = Array.from(panels).findIndex(
        (p) => p.getAttribute("data-state") === "active"
      );
      if (idx >= 0) setActiveIndex(idx);
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(container, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true
    });
    return () => mo.disconnect();
  }, [slideCount]);
  const activateByDirection = react.useCallback(
    (direction) => {
      const container = containerRef.current;
      if (!container) return false;
      const target = direction === "next" ? Math.min(activeIndex + 1, slideCount - 1) : Math.max(activeIndex - 1, 0);
      if (target === activeIndex) return false;
      const panels = container.querySelectorAll(
        ':scope > .vds-tabs-panels-track > .vds-tabs-panels-slide > [role="tabpanel"]'
      );
      const panel = panels[target];
      if (!panel) return false;
      const root = container.closest(".vds-tabs") ?? document.body;
      let trigger = null;
      const triggerId = panel.getAttribute("aria-labelledby");
      if (triggerId) {
        const labelledTrigger = document.getElementById(triggerId);
        if (labelledTrigger instanceof HTMLButtonElement) {
          trigger = labelledTrigger;
        }
      }
      if (panel.id) {
        trigger ??= root.querySelector(
          `[role="tab"][aria-controls="${panel.id}"]`
        );
      }
      if (!trigger) {
        const tablist = root.querySelector('[role="tablist"]');
        const triggers = tablist?.querySelectorAll('[role="tab"]');
        trigger = triggers?.[target] ?? null;
      }
      if (!trigger || trigger.disabled || trigger.hasAttribute("data-disabled")) {
        return false;
      }
      trigger.focus({ preventScroll: true });
      trigger.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          button: 0,
          buttons: 1,
          view: window
        })
      );
      trigger.dispatchEvent(
        new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          button: 0,
          view: window
        })
      );
      return true;
    },
    [activeIndex, slideCount]
  );
  useCarouselSwipe(containerRef, trackRef, {
    enabled: swipeable && isTouch && slideCount > 1,
    activeIndex,
    slideCount,
    threshold: swipeThreshold,
    onCommit: activateByDirection
  });
  react.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = "";
    track.style.transition = "";
  }, [activeIndex]);
  const setRef = (node) => {
    containerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: setRef,
      className: utils.cn("vds-tabs-panels", className),
      "data-swipeable": swipeable && isTouch ? "true" : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: trackRef,
          className: "vds-tabs-panels-track",
          style: {
            "--tabs-panels-tx": `${-activeIndex * 100}%`
          },
          children: slides.map((slide, idx) => /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "vds-tabs-panels-slide",
              "data-active": idx === activeIndex ? "true" : void 0,
              children: slide
            },
            slide.key ?? idx
          ))
        }
      )
    }
  );
}

exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsPanels = TabsPanels;
exports.TabsTrigger = TabsTrigger;
