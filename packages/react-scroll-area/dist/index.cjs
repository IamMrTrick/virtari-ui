"use client";
'use strict';

var react = require('react');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
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

var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespace(ScrollAreaPrimitive);

// src/ScrollArea.tsx
function ScrollAreaArrow({
  side,
  orientation,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      "aria-label": arrowLabel(side, orientation),
      "data-side": side,
      className: utils.cn("vds-scroll-area-arrow", className),
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(ChevronIcon, { side, orientation })
    }
  );
}
function arrowLabel(side, orientation) {
  if (orientation === "vertical") {
    return side === "start" ? "Scroll up" : "Scroll down";
  }
  return side === "start" ? "Scroll to start" : "Scroll to end";
}
function ChevronIcon({
  side,
  orientation
}) {
  const path = orientation === "vertical" ? side === "start" ? "M18 15 12 9 6 15" : "M6 9 12 15 18 9" : side === "start" ? "M15 18 9 12 15 6" : "M9 6 15 12 9 18";
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: path })
    }
  );
}
function useDragScroll(viewportRef, rootRef, { enabled, axis, threshold = 6 }) {
  react.useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root || !enabled) return;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let startScrollTop = 0;
    let axisLocked = null;
    let moved = false;
    let suppressClickUntil = 0;
    const isInteractive = (target) => {
      if (!(target instanceof Element)) return false;
      return !!target.closest(
        'input, textarea, select, [contenteditable="true"], [data-no-drag]'
      );
    };
    const cleanup = () => {
      pointerId = null;
      axisLocked = null;
      moved = false;
      root.removeAttribute("data-dragging");
    };
    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (isInteractive(e.target)) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startScrollLeft = viewport.scrollLeft;
      startScrollTop = viewport.scrollTop;
      axisLocked = axis === "both" ? null : axis;
      moved = false;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
      }
    };
    const onPointerMove = (e) => {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (!axisLocked) {
        if (absDx < threshold && absDy < threshold) return;
        axisLocked = absDx > absDy ? "x" : "y";
      }
      if (!moved && (absDx > threshold || absDy > threshold)) {
        moved = true;
        root.setAttribute("data-dragging", "true");
      }
      if (axisLocked === "x" && (axis === "x" || axis === "both")) {
        viewport.scrollLeft = startScrollLeft - dx;
      } else if (axisLocked === "y" && (axis === "y" || axis === "both")) {
        viewport.scrollTop = startScrollTop - dy;
      }
    };
    const onPointerEnd = (e) => {
      if (pointerId !== e.pointerId) return;
      const wasMoved = moved;
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch {
      }
      cleanup();
      if (wasMoved) {
        suppressClickUntil = Date.now() + 120;
      }
    };
    const onClickCapture = (e) => {
      if (Date.now() < suppressClickUntil) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerEnd);
    viewport.addEventListener("pointercancel", onPointerEnd);
    viewport.addEventListener("click", onClickCapture, { capture: true });
    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
      viewport.removeEventListener("click", onClickCapture, { capture: true });
      cleanup();
    };
  }, [viewportRef, rootRef, enabled, axis, threshold]);
}
function useEdgeState(viewportRef, rootRef, { enabled, orientation, tolerance = 1, onChange }) {
  react.useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root || !enabled) return;
    const isRTL = () => getComputedStyle(root).direction === "rtl";
    let prev = null;
    const update = () => {
      const {
        scrollLeft,
        scrollTop,
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight
      } = viewport;
      const horizontalOverflow = scrollWidth - clientWidth;
      const atInlineStart = horizontalOverflow <= tolerance ? true : isRTL() ? Math.abs(scrollLeft) <= tolerance : scrollLeft <= tolerance;
      const atInlineEnd = horizontalOverflow <= tolerance ? true : isRTL() ? Math.abs(scrollLeft) >= horizontalOverflow - tolerance : scrollLeft >= horizontalOverflow - tolerance;
      const verticalOverflow = scrollHeight - clientHeight;
      const atBlockStart = verticalOverflow <= tolerance ? true : scrollTop <= tolerance;
      const atBlockEnd = verticalOverflow <= tolerance ? true : scrollTop >= verticalOverflow - tolerance;
      root.toggleAttribute("data-at-start", atInlineStart);
      root.toggleAttribute("data-at-end", atInlineEnd);
      root.toggleAttribute("data-at-block-start", atBlockStart);
      root.toggleAttribute("data-at-block-end", atBlockEnd);
      if (orientation === "horizontal" || orientation === "both") {
        root.style.setProperty(
          "--scroll-area-mask-inline-start",
          atInlineStart ? "black" : "transparent"
        );
        root.style.setProperty(
          "--scroll-area-mask-inline-end",
          atInlineEnd ? "black" : "transparent"
        );
      }
      if (orientation === "vertical" || orientation === "both") {
        root.style.setProperty(
          "--scroll-area-mask-block-start",
          atBlockStart ? "black" : "transparent"
        );
        root.style.setProperty(
          "--scroll-area-mask-block-end",
          atBlockEnd ? "black" : "transparent"
        );
      }
      if (onChange) {
        if (!prev || prev.atInlineStart !== atInlineStart || prev.atInlineEnd !== atInlineEnd || prev.atBlockStart !== atBlockStart || prev.atBlockEnd !== atBlockEnd) {
          prev = { atInlineStart, atInlineEnd, atBlockStart, atBlockEnd };
          onChange(prev);
        }
      }
    };
    update();
    viewport.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(viewport);
    const content = viewport.firstElementChild;
    if (content) resizeObserver.observe(content);
    return () => {
      viewport.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [viewportRef, rootRef, enabled, orientation, tolerance, onChange]);
}
function useWheelHorizontal(viewportRef, { enabled }) {
  react.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enabled) return;
    const onWheel = (e) => {
      if (e.ctrlKey) return;
      if (e.shiftKey) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX > absY) return;
      if (absY === 0) return;
      const overflow = viewport.scrollWidth - viewport.clientWidth;
      if (overflow <= 0) return;
      const atStart = viewport.scrollLeft <= 0;
      const atEnd = viewport.scrollLeft >= overflow;
      if (e.deltaY < 0 && atStart || e.deltaY > 0 && atEnd) return;
      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [viewportRef, enabled]);
}
function useInfiniteScroll(viewportRef, sentinelRef, { enabled, orientation, threshold, onEndReached }) {
  react.useEffect(() => {
    const viewport = viewportRef.current;
    const sentinel = sentinelRef.current;
    if (!viewport || !sentinel || !enabled || !onEndReached) return;
    let armed = true;
    const m = `${threshold}px`;
    const rootMargin = orientation === "horizontal" ? `0px ${m} 0px ${m}` : orientation === "both" ? `${m} ${m} ${m} ${m}` : `${m} 0px ${m} 0px`;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (armed) {
              armed = false;
              onEndReached();
            }
          } else {
            armed = true;
          }
        }
      },
      { root: viewport, rootMargin, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [viewportRef, sentinelRef, enabled, orientation, threshold, onEndReached]);
}
function ScrollArea({
  children,
  className,
  style,
  orientation = "vertical",
  size = "md",
  drag = false,
  mask = false,
  arrows = false,
  arrowPlacement = "outer",
  arrowAppearance = "always",
  arrowStep = "page",
  wheelToHorizontal,
  onEndReached,
  endThreshold = 0,
  marquee = false,
  marqueeDuration,
  marqueeDirection,
  marqueePauseOnHover = true,
  hideScrollbar,
  type = "hover",
  scrollHideDelay,
  dir,
  ref,
  ...rootProps
}) {
  const rootRef = react.useRef(null);
  const viewportRef = react.useRef(null);
  const sentinelRef = react.useRef(null);
  const [edge, setEdge] = react.useState({
    atInlineStart: true,
    atInlineEnd: true,
    atBlockStart: true,
    atBlockEnd: true
  });
  const showArrows = arrows && !marquee && orientation !== "both";
  const wheelToH = marquee ? false : wheelToHorizontal ?? (orientation === "horizontal" ? true : false);
  const dragEnabled = drag && !marquee;
  const dragAxis = orientation === "both" ? "both" : orientation === "vertical" ? "y" : "x";
  const maskSizePx = typeof mask === "number" ? `${mask}px` : void 0;
  useEdgeState(viewportRef, rootRef, {
    enabled: !marquee,
    orientation,
    onChange: setEdge
  });
  useDragScroll(viewportRef, rootRef, {
    enabled: dragEnabled,
    axis: dragAxis
  });
  useWheelHorizontal(viewportRef, {
    enabled: wheelToH
  });
  useInfiniteScroll(viewportRef, sentinelRef, {
    enabled: !!onEndReached && !marquee,
    orientation,
    threshold: endThreshold,
    onEndReached
  });
  const scrollByArrow = react.useCallback(
    (side) => {
      const viewport = viewportRef.current;
      const root = rootRef.current;
      if (!viewport || !root) return;
      const rtl = getComputedStyle(root).direction === "rtl";
      const isVertical = orientation === "vertical";
      const pageSize = isVertical ? viewport.clientHeight : viewport.clientWidth;
      const step = arrowStep === "page" ? Math.max(pageSize * 0.85, 32) : Math.max(arrowStep, 0);
      if (isVertical) {
        viewport.scrollBy({
          top: side === "end" ? step : -step,
          behavior: "smooth"
        });
      } else {
        const baseSign = side === "end" ? 1 : -1;
        const sign = rtl ? -baseSign : baseSign;
        viewport.scrollBy({ left: sign * step, behavior: "smooth" });
      }
    },
    [arrowStep, orientation]
  );
  const rootStyle = react.useMemo(() => {
    const overrides = {};
    if (maskSizePx) overrides["--scroll-area-mask-size"] = maskSizePx;
    if (typeof marqueeDuration === "number") {
      overrides["--scroll-area-marquee-duration"] = `${marqueeDuration}s`;
    }
    if (marqueeDirection) {
      overrides["--scroll-area-marquee-direction"] = marqueeDirection;
    }
    if (Object.keys(overrides).length === 0) return style;
    return { ...style, ...overrides };
  }, [style, maskSizePx, marqueeDuration, marqueeDirection]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: rootRef,
      className: utils.cn("vds-scroll-area-root", className),
      style: rootStyle,
      dir,
      "data-orientation": orientation,
      "data-size": size,
      "data-drag": dragEnabled ? "true" : void 0,
      "data-mask": mask ? "true" : void 0,
      "data-arrows": showArrows ? "true" : void 0,
      "data-arrow-placement": showArrows ? arrowPlacement : void 0,
      "data-arrow-appearance": showArrows ? arrowAppearance : void 0,
      "data-marquee": marquee ? "true" : void 0,
      "data-marquee-pause-on-hover": marquee && marqueePauseOnHover ? "true" : void 0,
      "data-hide-scrollbar": hideScrollbar ? "true" : void 0,
      children: [
        showArrows && /* @__PURE__ */ jsxRuntime.jsx(
          ScrollAreaArrow,
          {
            side: "start",
            orientation,
            disabled: orientation === "vertical" ? edge.atBlockStart : edge.atInlineStart,
            onClick: () => scrollByArrow("start")
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          ScrollAreaPrimitive__namespace.Root,
          {
            ref,
            type,
            scrollHideDelay,
            dir,
            className: "vds-scroll-area",
            ...rootProps,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                ScrollAreaPrimitive__namespace.Viewport,
                {
                  ref: viewportRef,
                  className: "vds-scroll-area-viewport",
                  children: marquee ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-scroll-area-marquee", children: renderMarqueeItems(children) }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                    children,
                    onEndReached && /* @__PURE__ */ jsxRuntime.jsx(
                      "div",
                      {
                        ref: sentinelRef,
                        className: "vds-scroll-area-sentinel",
                        "aria-hidden": "true"
                      }
                    )
                  ] })
                }
              ),
              (orientation === "vertical" || orientation === "both") && /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, { orientation: "vertical" }),
              (orientation === "horizontal" || orientation === "both") && /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, { orientation: "horizontal" }),
              /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.Corner, {})
            ]
          }
        ),
        showArrows && /* @__PURE__ */ jsxRuntime.jsx(
          ScrollAreaArrow,
          {
            side: "end",
            orientation,
            disabled: orientation === "vertical" ? edge.atBlockEnd : edge.atInlineEnd,
            onClick: () => scrollByArrow("end")
          }
        )
      ]
    }
  );
}
function renderMarqueeItems(children) {
  const items = react.Children.toArray(children);
  return [0, 1].flatMap(
    (copy) => items.map((child, i) => /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "vds-scroll-area-marquee-item",
        "aria-hidden": copy === 1 ? "true" : void 0,
        children: child
      },
      `${copy}-${i}`
    ))
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ScrollAreaPrimitive__namespace.ScrollAreaScrollbar,
    {
      ref,
      orientation,
      className: utils.cn("vds-scrollbar", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.ScrollAreaThumb, { className: "vds-scrollbar-thumb" })
    }
  );
}

exports.ScrollArea = ScrollArea;
exports.ScrollAreaArrow = ScrollAreaArrow;
exports.ScrollBar = ScrollBar;
