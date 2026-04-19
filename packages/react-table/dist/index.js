import { cn } from '@virtari-packages/utils';
import { createContext, useId, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Table.tsx
var TableContext = createContext({});
function Table({
  variant = "surface",
  rows = "divided",
  size = "md",
  density = "normal",
  color = "primary",
  layout = "auto",
  headerCase = "uppercase",
  stickyHeader = false,
  hoverable = false,
  loading = false,
  tableProps,
  tableRef,
  ref,
  className,
  children,
  ...props
}) {
  const captionId = useId();
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: { captionId }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-table", className),
      "data-variant": variant,
      "data-rows": rows,
      "data-size": size,
      "data-density": density !== "normal" ? density : void 0,
      "data-color": color !== "primary" ? color : void 0,
      "data-layout": layout !== "auto" ? layout : void 0,
      "data-header-case": headerCase !== "uppercase" ? headerCase : void 0,
      "data-sticky-header": stickyHeader || void 0,
      "data-hoverable": hoverable || void 0,
      "data-loading": loading || void 0,
      role: "region",
      ...props,
      children: /* @__PURE__ */ jsx(
        "table",
        {
          ref: tableRef,
          className: "vds-table__element",
          ...tableProps,
          children
        }
      )
    }
  ) });
}
function TableHeader({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      ref,
      className: cn("vds-table__thead", className),
      ...props
    }
  );
}
function TableBody({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      ref,
      className: cn("vds-table__tbody", className),
      ...props
    }
  );
}
function TableFooter({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      className: cn("vds-table__tfoot", className),
      ...props
    }
  );
}
function TableRow({
  className,
  selected,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("vds-table__tr", className),
      "data-selected": selected || void 0,
      "aria-selected": selected || void 0,
      ...props
    }
  );
}
var defaultSortIndicator = /* @__PURE__ */ jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.25",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    children: [
      /* @__PURE__ */ jsx("path", { d: "m7 15 5 5 5-5" }),
      /* @__PURE__ */ jsx("path", { d: "m7 9 5-5 5 5" })
    ]
  }
);
function TableHead({
  className,
  align,
  numeric,
  wrap,
  sticky,
  sortable,
  sortDirection,
  sortIndicator,
  children,
  ref,
  onKeyDown,
  ...props
}) {
  const handleKeyDown = sortable ? (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  } : onKeyDown;
  return /* @__PURE__ */ jsxs(
    "th",
    {
      ref,
      scope: props.scope ?? "col",
      className: cn("vds-table__th", className),
      "data-align": align,
      "data-numeric": numeric || void 0,
      "data-wrap": wrap || void 0,
      "data-sticky": sticky,
      "data-sortable": sortable || void 0,
      "aria-sort": sortable ? sortDirection ?? "none" : void 0,
      tabIndex: sortable ? 0 : void 0,
      role: sortable ? "columnheader" : void 0,
      onKeyDown: handleKeyDown,
      ...props,
      children: [
        children,
        sortable && /* @__PURE__ */ jsx("span", { className: "vds-table__sort-indicator", "aria-hidden": "true", children: sortIndicator ?? defaultSortIndicator })
      ]
    }
  );
}
function TableCell({
  className,
  align,
  numeric,
  wrap,
  sticky,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("vds-table__td", className),
      "data-align": align,
      "data-numeric": numeric || void 0,
      "data-wrap": wrap || void 0,
      "data-sticky": sticky,
      ...props
    }
  );
}
function TableCaption({ className, ref, ...props }) {
  const { captionId } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      id: captionId,
      className: cn("vds-table__caption", className),
      ...props
    }
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
