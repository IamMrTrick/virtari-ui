"use client";
import { createContext, useMemo, Fragment as Fragment$1, useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@virtari-packages/utils';
import { IconArrowRight, IconPointFilled, IconChevronRight, IconDots, IconHome } from '@virtari-packages/react-icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@virtari-packages/react-dropdown-menu';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/Breadcrumb.tsx
var BreadcrumbContext = createContext(null);
function useBreadcrumbContext() {
  return useContext(BreadcrumbContext) ?? {
    size: "md",
    variant: "default",
    separator: "chevron"
  };
}
var SEPARATOR_ICON = {
  chevron: IconChevronRight,
  dot: IconPointFilled,
  arrow: IconArrowRight
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
  const ctx = useMemo(
    () => ({ size, variant, separator }),
    [size, variant, separator]
  );
  const jsonLd = useMemo(() => {
    if (!seo || !items?.length) return null;
    return buildJsonLd(items, seoBaseUrl);
  }, [seo, items, seoBaseUrl]);
  return /* @__PURE__ */ jsx(BreadcrumbContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxs(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cn("vds-breadcrumb", className),
      "data-variant": variant,
      "data-size": size,
      "data-separator": separator,
      ...props,
      children: [
        items ? /* @__PURE__ */ jsx(BreadcrumbList, { children: renderItemsArray(items, {
          maxItems,
          itemsBeforeCollapse,
          itemsAfterCollapse
        }) }) : children,
        jsonLd ? /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "ol",
    {
      ref,
      className: cn("vds-breadcrumb__list", className),
      ...props
    }
  );
}
function BreadcrumbItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      className: cn("vds-breadcrumb__item", className),
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
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-breadcrumb__link", className),
      ...props
    }
  );
}
function BreadcrumbPage({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("vds-breadcrumb__page", className),
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
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      "data-preset": effective,
      className: cn("vds-breadcrumb__separator", className),
      ...props,
      children: children ?? renderSeparatorIcon(effective)
    }
  );
}
function renderSeparatorIcon(preset) {
  if (preset === "slash") {
    return null;
  }
  const SepIcon = SEPARATOR_ICON[preset] ?? IconChevronRight;
  return /* @__PURE__ */ jsx(SepIcon, { stroke: 1.75, "aria-hidden": true, focusable: false });
}
function BreadcrumbEllipsis({
  items,
  label = "Show hidden navigation",
  className
}) {
  if (!items?.length) {
    return /* @__PURE__ */ jsx(
      "li",
      {
        role: "presentation",
        "aria-hidden": "true",
        className: cn("vds-breadcrumb__ellipsis", className),
        children: /* @__PURE__ */ jsx(IconDots, { stroke: 1.75, "aria-hidden": true, focusable: false })
      }
    );
  }
  return /* @__PURE__ */ jsx("li", { className: cn("vds-breadcrumb__ellipsis", className), children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "vds-breadcrumb__ellipsis-trigger",
        "aria-label": label,
        children: [
          /* @__PURE__ */ jsx(IconDots, { stroke: 1.75, "aria-hidden": true, focusable: false }),
          /* @__PURE__ */ jsx("span", { className: "vds-breadcrumb__sr-only", children: label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", children: items.map((it, i) => {
      const key = `${i}-${typeof it.label === "string" ? it.label : ""}`;
      if (it.href) {
        return /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: it.href, children: it.label }) }, key);
      }
      return /* @__PURE__ */ jsx(DropdownMenuItem, { disabled: true, children: it.label }, key);
    }) })
  ] }) });
}
function BreadcrumbHome({
  href = "/",
  label = "Home",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(BreadcrumbLink, { href, "aria-label": children ? void 0 : label, ...props, children: [
    /* @__PURE__ */ jsx(IconHome, { stroke: 1.75, "aria-hidden": true, focusable: false }),
    children
  ] });
}
function renderItemsArray(items, cfg) {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = cfg;
  const shouldCollapse = typeof maxItems === "number" && items.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse < items.length;
  if (!shouldCollapse) {
    return /* @__PURE__ */ jsx(Fragment, { children: items.map((it, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      renderItem(it, i === items.length - 1),
      i < items.length - 1 ? /* @__PURE__ */ jsx(BreadcrumbSeparator, {}) : null
    ] }, keyFor(it, i))) });
  }
  const head = items.slice(0, itemsBeforeCollapse);
  const tail = items.slice(items.length - itemsAfterCollapse);
  const hidden = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    head.map((it, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      renderItem(it, false),
      /* @__PURE__ */ jsx(BreadcrumbSeparator, {})
    ] }, `h-${keyFor(it, i)}`)),
    /* @__PURE__ */ jsx(BreadcrumbEllipsis, { items: hidden }),
    /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
    tail.map((it, i) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
      renderItem(it, i === tail.length - 1),
      i < tail.length - 1 ? /* @__PURE__ */ jsx(BreadcrumbSeparator, {}) : null
    ] }, `t-${keyFor(it, i)}`))
  ] });
}
function renderItem(it, isLast) {
  const Icon = it.icon;
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    Icon ? /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, focusable: false }) : null,
    it.label
  ] });
  if (!it.href || isLast) {
    return /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: content }) });
  }
  return /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href: it.href, children: content }) });
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

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbHome, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
