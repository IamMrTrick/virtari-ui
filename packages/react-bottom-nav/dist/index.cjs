"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var reactSlot = require('@radix-ui/react-slot');

// src/BottomNav.tsx
var BottomNavContext = react.createContext(null);
function useBottomNav() {
  const ctx = react.useContext(BottomNavContext);
  if (!ctx) {
    throw new Error(
      "BottomNav sub-components must be rendered inside <BottomNav>."
    );
  }
  return ctx;
}
function matchesCurrent(href, currentPath, strategy) {
  if (!href || !currentPath) return false;
  if (strategy === "startsWith") return currentPath.startsWith(href);
  return currentPath === href;
}
function useAutoHide(enabled) {
  const [hidden, setHidden] = react.useState(false);
  react.useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setHidden(false);
      return;
    }
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 8;
    const topEpsilon = 16;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= topEpsilon) {
        setHidden(false);
      } else if (delta > threshold) {
        setHidden(true);
      } else if (delta < -threshold) {
        setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);
  return hidden;
}
var BottomNav = react.forwardRef(
  function BottomNav2({
    as,
    variant = "material",
    size = "md",
    position = "fixed",
    currentPath,
    matchStrategy = "exact",
    safeArea = true,
    autoHide = false,
    animatedIndicator = true,
    elevated = false,
    notch = false,
    hidden: hiddenProp,
    className,
    children,
    style,
    "aria-label": ariaLabel,
    ...rest
  }, forwardedRef) {
    const Tag = as ?? "nav";
    const localRef = react.useRef(null);
    const indicatorRef = react.useRef(null);
    const activeItemRef = react.useRef(null);
    const [indicatorMeasured, setIndicatorMeasured] = react.useState(false);
    const [pillKey, setPillKey] = react.useState(0);
    const setRef = react.useCallback(
      (node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef)
          forwardedRef.current = node;
      },
      [forwardedRef]
    );
    const autoHiddenFromScroll = useAutoHide(autoHide && hiddenProp == null);
    const isHidden = hiddenProp ?? autoHiddenFromScroll;
    const contextValue = react.useMemo(
      () => ({ variant, size, currentPath, matchStrategy }),
      [variant, size, currentPath, matchStrategy]
    );
    const showSlidingIndicator = animatedIndicator && (variant === "material" || variant === "underline");
    react.useLayoutEffect(() => {
      if (!showSlidingIndicator) {
        setIndicatorMeasured(false);
        return;
      }
      const root = localRef.current;
      const indicator = indicatorRef.current;
      if (!root || !indicator) return;
      const measure = () => {
        const activeItem = root.querySelector(
          '.vds-bottom-nav__item[data-active="true"]'
        );
        if (!activeItem) {
          setIndicatorMeasured(false);
          activeItemRef.current = null;
          indicator.style.opacity = "0";
          return;
        }
        if (activeItem !== activeItemRef.current) {
          activeItemRef.current = activeItem;
          setPillKey((k) => k + 1);
        }
        const rootRect = root.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const iconHost = activeItem.querySelector(
          ".vds-bottom-nav__icon"
        );
        const iconRect = iconHost?.getBoundingClientRect();
        const isRtl = window.getComputedStyle(root).direction === "rtl";
        const itemStart = isRtl ? rootRect.right - itemRect.right : itemRect.left - rootRect.left;
        let inlineSize;
        let blockSize = null;
        let blockStart = null;
        let centeredStart;
        if (variant === "material") {
          const iconW = iconRect?.width ?? 24;
          const iconH = iconRect?.height ?? 24;
          inlineSize = iconW + 32;
          blockSize = iconH + 8;
          if (iconRect) {
            const iconCenterY = iconRect.top - rootRect.top + iconRect.height / 2;
            blockStart = iconCenterY - blockSize / 2;
          }
          centeredStart = itemStart + (itemRect.width - inlineSize) / 2;
        } else if (variant === "underline") {
          inlineSize = itemRect.width * 0.48;
          centeredStart = itemStart + (itemRect.width - inlineSize) / 2;
        } else {
          inlineSize = itemRect.width;
          centeredStart = itemStart;
        }
        indicator.style.setProperty(
          "inset-inline-start",
          `${Math.round(centeredStart)}px`
        );
        indicator.style.setProperty(
          "inline-size",
          `${Math.round(inlineSize)}px`
        );
        if (blockSize != null) {
          indicator.style.setProperty("block-size", `${Math.round(blockSize)}px`);
        } else {
          indicator.style.removeProperty("block-size");
        }
        if (blockStart != null) {
          indicator.style.setProperty(
            "inset-block-start",
            `${Math.round(blockStart)}px`
          );
        } else {
          indicator.style.removeProperty("inset-block-start");
        }
        setIndicatorMeasured(true);
      };
      measure();
      const ro = new ResizeObserver(() => measure());
      ro.observe(root);
      window.addEventListener("resize", measure);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", measure);
      };
    }, [showSlidingIndicator, currentPath, variant, size, children, pillKey]);
    const mergedStyle = {
      ...style,
      ...safeArea ? null : { ["--bottom-nav-safe-area"]: "0px" }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(BottomNavContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsxs(
      Tag,
      {
        ref: setRef,
        className: utils.cn("vds-bottom-nav", className),
        style: mergedStyle,
        "data-variant": variant,
        "data-size": size,
        "data-position": position,
        "data-elevated": elevated || variant === "floating" ? "true" : void 0,
        "data-has-fab-notch": notch ? "true" : void 0,
        "data-hidden": isHidden ? "true" : void 0,
        "data-animated-indicator": showSlidingIndicator ? "true" : void 0,
        "aria-label": ariaLabel ?? "Bottom navigation",
        ...rest,
        children: [
          children,
          showSlidingIndicator && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              ref: indicatorRef,
              className: "vds-bottom-nav__sliding-indicator",
              "data-measured": indicatorMeasured ? "true" : void 0,
              "aria-hidden": "true"
            },
            variant === "material" ? `pill-${pillKey}` : "slider"
          )
        ]
      }
    ) });
  }
);
var BottomNavBadge = react.forwardRef(
  function BottomNavBadge2({ dot = false, count, max = 99, className, children, ...rest }, ref) {
    const isDot = dot || children == null && count == null;
    let content = children;
    let srText;
    if (children == null && !isDot && typeof count === "number") {
      content = count > max ? `${max}+` : String(count);
      srText = `${count} unread`;
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          ref,
          className: utils.cn("vds-bottom-nav__badge", className),
          "data-dot": isDot ? "true" : void 0,
          "aria-hidden": isDot ? "true" : void 0,
          ...rest,
          children: isDot ? null : content
        }
      ),
      srText && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-sr-only", children: srText })
    ] });
  }
);
var BottomNavItem = react.forwardRef(
  function BottomNavItem2({
    href,
    asChild = false,
    icon,
    label,
    badge,
    active: activeProp,
    disabled = false,
    target,
    rel,
    download,
    className,
    children,
    onClick,
    ...rest
  }, ref) {
    const { currentPath, matchStrategy } = useBottomNav();
    const isAnchor = href != null;
    const autoActive = matchesCurrent(href, currentPath, matchStrategy);
    const isActive = activeProp ?? autoActive;
    const handleClick = disabled ? (event) => {
      event.preventDefault();
      event.stopPropagation();
    } : onClick;
    const sharedProps = {
      className: utils.cn("vds-bottom-nav__item", className),
      "data-active": isActive ? "true" : void 0,
      "aria-current": isActive && isAnchor ? "page" : void 0,
      "aria-disabled": disabled || void 0,
      onClick: handleClick,
      ...rest
    };
    const renderedBadge = (() => {
      if (badge == null || badge === false) return null;
      if (badge === true) return /* @__PURE__ */ jsxRuntime.jsx(BottomNavBadge, { dot: true });
      if (typeof badge === "number") return /* @__PURE__ */ jsxRuntime.jsx(BottomNavBadge, { count: badge });
      return badge;
    })();
    const body = /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-bottom-nav__item-inner", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "span",
        {
          className: "vds-bottom-nav__icon",
          "aria-hidden": label ? "true" : void 0,
          children: [
            icon,
            renderedBadge
          ]
        }
      ),
      label != null && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-bottom-nav__label", children: label }),
      children
    ] });
    if (asChild) {
      return /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { ref, ...sharedProps, children: body });
    }
    if (isAnchor) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          ref,
          href,
          target,
          rel,
          download,
          ...sharedProps,
          children: body
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        disabled,
        ...sharedProps,
        children: body
      }
    );
  }
);
var BottomNavFab = react.forwardRef(
  function BottomNavFab2({
    icon,
    label,
    color = "primary",
    asChild = false,
    className,
    type,
    "aria-label": ariaLabel,
    ...rest
  }, ref) {
    const Comp = asChild ? reactSlot.Slot : "button";
    return /* @__PURE__ */ jsxRuntime.jsx(
      Comp,
      {
        ref,
        className: utils.cn("vds-bottom-nav__fab", className),
        "data-color": color,
        type: asChild ? void 0 : type ?? "button",
        "aria-label": ariaLabel ?? label,
        ...rest,
        children: icon
      }
    );
  }
);

exports.BottomNav = BottomNav;
exports.BottomNavBadge = BottomNavBadge;
exports.BottomNavFab = BottomNavFab;
exports.BottomNavItem = BottomNavItem;
exports.useAutoHide = useAutoHide;
