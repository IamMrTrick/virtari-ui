"use client";
import { cn } from '@virtari/utils';
import { createContext, useState, useCallback, useMemo, useRef, useEffect, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';

// src/Header.tsx
var HeaderContext = createContext(null);
function useHeaderContext() {
  const ctx = useContext(HeaderContext);
  if (!ctx) {
    throw new Error(
      "vds-header: <HeaderRow> / <HeaderTop|Main|Bottom> must be rendered inside <Header>."
    );
  }
  return ctx;
}
function Header({
  as: Tag = "header",
  stickyOffset = "0px",
  className,
  style,
  children,
  ref,
  ...rest
}) {
  const [heights, setHeights] = useState({
    top: 0,
    main: 0,
    bottom: 0
  });
  const registerRow = useCallback(
    (slot, heightPx, isSticky) => {
      setHeights((prev) => {
        const next = isSticky ? heightPx : 0;
        if (prev[slot] === next) return prev;
        return { ...prev, [slot]: next };
      });
    },
    []
  );
  const unregisterRow = useCallback(
    (slot) => {
      setHeights((prev) => {
        if (prev[slot] === 0) return prev;
        return { ...prev, [slot]: 0 };
      });
    },
    []
  );
  const ctxValue = useMemo(
    () => ({ registerRow, unregisterRow }),
    [registerRow, unregisterRow]
  );
  const mergedStyle = {
    ...style,
    ["--header-sticky-offset"]: stickyOffset,
    ["--header-top-sticky-height"]: `${heights.top}px`,
    ["--header-main-sticky-height"]: `${heights.main}px`,
    ["--header-bottom-sticky-height"]: `${heights.bottom}px`
  };
  return /* @__PURE__ */ jsx(HeaderContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("vds-header", className),
      style: mergedStyle,
      ...rest,
      children
    }
  ) });
}
function findScrollAncestor(el) {
  if (typeof window === "undefined") return window;
  let p = el?.parentElement ?? null;
  while (p) {
    const cs = window.getComputedStyle(p);
    if (cs.overflowY === "auto" || cs.overflowY === "scroll" || cs.overflowY === "overlay") {
      return p;
    }
    p = p.parentElement;
  }
  return window;
}
function scrollYOf(container) {
  return container === window ? window.scrollY : container.scrollTop;
}
function rowBottomInContainer(el, container) {
  const rect = el.getBoundingClientRect();
  if (container === window) {
    return window.scrollY + rect.bottom;
  }
  const cEl = container;
  const cRect = cEl.getBoundingClientRect();
  return cEl.scrollTop + (rect.bottom - cRect.top);
}
function useStickyBehavior({
  mode,
  rowRef,
  smartThreshold = 4,
  collapseAt
}) {
  const [hidden, setHidden] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const stateRef = useRef({ hidden: false, collapsed: false });
  useEffect(() => {
    stateRef.current = { hidden, collapsed };
  }, [hidden, collapsed]);
  useEffect(() => {
    if (mode === "none" || mode === "always") {
      setHidden(false);
      setCollapsed(false);
      return;
    }
    const el = rowRef.current;
    if (!el) return;
    const container = findScrollAncestor(el);
    let raf = 0;
    let lastY = scrollYOf(container);
    let rowBottomDoc = rowBottomInContainer(el, container);
    const measure = () => {
      if (!rowRef.current) return;
      if (stateRef.current.hidden || stateRef.current.collapsed) return;
      rowBottomDoc = rowBottomInContainer(rowRef.current, container);
    };
    const tick = () => {
      raf = 0;
      const y = scrollYOf(container);
      const delta = y - lastY;
      lastY = y;
      if (mode === "smart") {
        if (y <= rowBottomDoc) {
          setHidden(false);
        } else if (delta > smartThreshold) {
          setHidden(true);
        } else if (delta < -smartThreshold) {
          setHidden(false);
        }
      } else if (mode === "collapse") {
        const trigger = collapseAt ?? rowBottomDoc;
        setCollapsed(y > trigger);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };
    measure();
    lastY = scrollYOf(container);
    tick();
    const target = container === window ? window : container;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mode, rowRef, smartThreshold, collapseAt]);
  return { hidden, collapsed };
}
var STICKY_MODES = [
  "always",
  "smart",
  "collapse"
];
function HeaderRow({
  as: Tag = "div",
  slot,
  sticky = "none",
  transparent,
  center,
  background,
  gutter,
  width,
  gap,
  height,
  blockSize,
  contained = true,
  collapseAt,
  smartThreshold,
  className,
  style,
  children,
  ref,
  ...rest
}) {
  const ctx = useHeaderContext();
  const rowRef = useRef(null);
  const { hidden, collapsed } = useStickyBehavior({
    mode: sticky,
    rowRef,
    smartThreshold,
    collapseAt
  });
  const isSticky = STICKY_MODES.includes(sticky);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const publish = () => {
      const h = el.getBoundingClientRect().height;
      ctx.registerRow(slot, h, isSticky);
    };
    publish();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      ctx.unregisterRow(slot);
    };
  }, [ctx, slot, isSticky]);
  const setRowRef = useCallback(
    (el) => {
      rowRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref && typeof ref === "object") {
        ref.current = el;
      }
    },
    [ref]
  );
  const mergedStyle = blockSize ? { ...style, ["--row-block-size"]: blockSize } : style;
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref: setRowRef,
      className: cn("vds-header__row", className),
      "data-slot": slot,
      "data-sticky": sticky === "none" ? void 0 : sticky,
      "data-transparent": transparent ? "true" : void 0,
      "data-center": center ? "true" : void 0,
      "data-background": background,
      "data-gutter": gutter,
      "data-width": width,
      "data-gap": gap,
      "data-height": height,
      "data-contained": contained ? void 0 : "false",
      "data-hidden": hidden ? "true" : void 0,
      "data-collapsed": collapsed ? "true" : void 0,
      style: mergedStyle,
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: "vds-header__row-inner", children })
    }
  );
}
function HeaderTop(props) {
  return /* @__PURE__ */ jsx(HeaderRow, { ...props, slot: "top" });
}
function HeaderMain(props) {
  return /* @__PURE__ */ jsx(HeaderRow, { ...props, slot: "main" });
}
function HeaderBottom(props) {
  return /* @__PURE__ */ jsx(HeaderRow, { ...props, slot: "bottom" });
}
function HeaderSection({
  as: Tag = "div",
  side,
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("vds-header__section", className),
      "data-side": side,
      ...rest
    }
  );
}
function HeaderStart(props) {
  return /* @__PURE__ */ jsx(HeaderSection, { ...props, side: "start" });
}
function HeaderCenter(props) {
  return /* @__PURE__ */ jsx(HeaderSection, { ...props, side: "center" });
}
function HeaderEnd(props) {
  return /* @__PURE__ */ jsx(HeaderSection, { ...props, side: "end" });
}

export { Header, HeaderBottom, HeaderCenter, HeaderEnd, HeaderMain, HeaderRow, HeaderSection, HeaderStart, HeaderTop };
