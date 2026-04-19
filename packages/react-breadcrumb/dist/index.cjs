"use client";
'use strict';

var react = require('react');
var reactSlot = require('@radix-ui/react-slot');
var utils = require('@virtari-packages/utils');
var reactIcons = require('@virtari-packages/react-icons');
var reactDropdownMenu = require('@virtari-packages/react-dropdown-menu');
var jsxRuntime = require('react/jsx-runtime');

// src/Breadcrumb.tsx
var BreadcrumbContext = react.createContext(null);
function useBreadcrumbContext() {
  return react.useContext(BreadcrumbContext) ?? {
    size: "md",
    variant: "default",
    separator: "chevron"
  };
}
var SEPARATOR_ICON = {
  chevron: reactIcons.IconChevronRight,
  dot: reactIcons.IconPointFilled,
  arrow: reactIcons.IconArrowRight
};
function Breadcrumb({
  variant = "default",
  size = "md",
  separator = "chevron",
  items,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  seo = false,
  seoBaseUrl,
  className,
  children,
  ref,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}) {
  const ctx = react.useMemo(
    () => ({ size, variant, separator }),
    [size, variant, separator]
  );
  const jsonLd = react.useMemo(() => {
    if (!seo || !items?.length) return null;
    return buildJsonLd(items, seoBaseUrl);
  }, [seo, items, seoBaseUrl]);
  return /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: utils.cn("vds-breadcrumb", className),
      "data-variant": variant,
      "data-size": size,
      "data-separator": separator,
      ...props,
      children: [
        items ? /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbList, { children: renderItemsArray(items, {
          maxItems,
          itemsBeforeCollapse,
          itemsAfterCollapse
        }) }) : children,
        jsonLd ? /* @__PURE__ */ jsxRuntime.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
          }
        ) : null
      ]
    }
  ) });
}
function BreadcrumbList({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ol",
    {
      ref,
      className: utils.cn("vds-breadcrumb__list", className),
      ...props
    }
  );
}
function BreadcrumbItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      className: utils.cn("vds-breadcrumb__item", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "a";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      className: utils.cn("vds-breadcrumb__link", className),
      ...props
    }
  );
}
function BreadcrumbPage({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: utils.cn("vds-breadcrumb__page", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  preset,
  className,
  children,
  ref,
  ...props
}) {
  const ctx = useBreadcrumbContext();
  const effective = preset ?? ctx.separator;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      "data-preset": effective,
      className: utils.cn("vds-breadcrumb__separator", className),
      ...props,
      children: children ?? renderSeparatorIcon(effective)
    }
  );
}
function renderSeparatorIcon(preset) {
  if (preset === "slash") {
    return null;
  }
  const SepIcon = SEPARATOR_ICON[preset] ?? reactIcons.IconChevronRight;
  return /* @__PURE__ */ jsxRuntime.jsx(SepIcon, { stroke: 1.75, "aria-hidden": true, focusable: false });
}
function BreadcrumbEllipsis({
  items,
  label = "Show hidden navigation",
  className
}) {
  if (!items?.length) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "li",
      {
        role: "presentation",
        "aria-hidden": "true",
        className: utils.cn("vds-breadcrumb__ellipsis", className),
        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDots, { stroke: 1.75, "aria-hidden": true, focusable: false })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("li", { className: utils.cn("vds-breadcrumb__ellipsis", className), children: /* @__PURE__ */ jsxRuntime.jsxs(reactDropdownMenu.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: "vds-breadcrumb__ellipsis-trigger",
        "aria-label": label,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDots, { stroke: 1.75, "aria-hidden": true, focusable: false }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-breadcrumb__sr-only", children: label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuContent, { align: "start", children: items.map((it, i) => {
      const key = `${i}-${typeof it.label === "string" ? it.label : ""}`;
      if (it.href) {
        return /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("a", { href: it.href, children: it.label }) }, key);
      }
      return /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuItem, { disabled: true, children: it.label }, key);
    }) })
  ] }) });
}
function BreadcrumbHome({
  href = "/",
  label = "Home",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(BreadcrumbLink, { href, "aria-label": children ? void 0 : label, ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconHome, { stroke: 1.75, "aria-hidden": true, focusable: false }),
    children
  ] });
}
function renderItemsArray(items, cfg) {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = cfg;
  const shouldCollapse = typeof maxItems === "number" && items.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse < items.length;
  if (!shouldCollapse) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: items.map((it, i) => /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, { children: [
      renderItem(it, i === items.length - 1),
      i < items.length - 1 ? /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, {}) : null
    ] }, keyFor(it, i))) });
  }
  const head = items.slice(0, itemsBeforeCollapse);
  const tail = items.slice(items.length - itemsAfterCollapse);
  const hidden = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    head.map((it, i) => /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, { children: [
      renderItem(it, false),
      /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, {})
    ] }, `h-${keyFor(it, i)}`)),
    /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbEllipsis, { items: hidden }),
    /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, {}),
    tail.map((it, i) => /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, { children: [
      renderItem(it, i === tail.length - 1),
      i < tail.length - 1 ? /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, {}) : null
    ] }, `t-${keyFor(it, i)}`))
  ] });
}
function renderItem(it, isLast) {
  const Icon = it.icon;
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    Icon ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true, focusable: false }) : null,
    it.label
  ] });
  if (!it.href || isLast) {
    return /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbPage, { children: content }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbLink, { href: it.href, children: content }) });
}
function keyFor(it, i) {
  if (typeof it.label === "string") return `${i}-${it.label}`;
  if (it.href) return `${i}-${it.href}`;
  return String(i);
}
function buildJsonLd(items, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => {
      const name = it.name ?? (typeof it.label === "string" ? it.label : void 0);
      const item = it.href ? resolveUrl(it.href, baseUrl) : void 0;
      return {
        "@type": "ListItem",
        position: i + 1,
        ...name ? { name } : {},
        ...item ? { item } : {}
      };
    })
  };
}
function resolveUrl(href, baseUrl) {
  if (!baseUrl) return href;
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}

exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbHome = BreadcrumbHome;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
