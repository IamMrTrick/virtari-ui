import { createContext, forwardRef, useCallback, useMemo, useContext, useId } from 'react';
import { cn } from '@virtari-packages/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@virtari-packages/react-select';
import { IconChevronLeft, IconChevronRight } from '@virtari-packages/react-icons';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/Pagination.tsx
var PaginationContext = createContext(
  null
);
function usePaginationContext() {
  const ctx = useContext(PaginationContext);
  if (!ctx) {
    throw new Error(
      "Pagination parts must be rendered inside <Pagination.Root>."
    );
  }
  return ctx;
}

// src/use-pagination.ts
function computePageRange(current, total, siblingCount) {
  const pages = [];
  if (total <= 0) return pages;
  if (total <= siblingCount + 4) {
    for (let i = 0; i < total; i++) pages.push(i);
    return pages;
  }
  const left = Math.max(current - Math.floor(siblingCount / 2), 1);
  const right = Math.min(left + siblingCount - 1, total - 2);
  pages.push(0);
  if (left > 1) pages.push("ellipsis-l");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 2) pages.push("ellipsis-r");
  pages.push(total - 1);
  return pages;
}
var PaginationRoot = forwardRef(
  function PaginationRoot2({
    page,
    pageSize,
    total,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    siblingCount = 5,
    size = "sm",
    className,
    children,
    ...props
  }, ref) {
    const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    const clampedPage = Math.max(0, Math.min(page, pageCount - 1));
    const canPrev = clampedPage > 0;
    const canNext = clampedPage < pageCount - 1;
    const setPage = useCallback(
      (next) => {
        const clamped = Math.max(0, Math.min(next, pageCount - 1));
        if (clamped !== clampedPage) onPageChange(clamped);
      },
      [clampedPage, pageCount, onPageChange]
    );
    const setPageSize = useCallback(
      (next) => {
        if (!Number.isFinite(next) || next <= 0) return;
        onPageSizeChange?.(next);
      },
      [onPageSizeChange]
    );
    const value = useMemo(
      () => ({
        page: clampedPage,
        pageSize,
        total,
        pageCount,
        pageSizeOptions,
        siblingCount,
        size,
        canPrev,
        canNext,
        setPage,
        setPageSize
      }),
      [
        clampedPage,
        pageSize,
        total,
        pageCount,
        pageSizeOptions,
        siblingCount,
        size,
        canPrev,
        canNext,
        setPage,
        setPageSize
      ]
    );
    return /* @__PURE__ */ jsx(PaginationContext.Provider, { value, children: /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "Pagination",
        "data-size": size,
        className: cn("vds-pagination", className),
        ...props,
        children
      }
    ) });
  }
);
var PaginationInfo = forwardRef(
  function PaginationInfo2({ className, renderLabel, ...props }, ref) {
    const { page, pageSize, total } = usePaginationContext();
    const start = total === 0 ? 0 : page * pageSize + 1;
    const end = Math.min(total, (page + 1) * pageSize);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("vds-pagination-info", className),
        ...props,
        children: renderLabel ? renderLabel({ start, end, total }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { dir: "ltr", children: [
            start,
            "\u2013",
            end
          ] }),
          " ",
          "of ",
          /* @__PURE__ */ jsx("span", { dir: "ltr", children: total })
        ] })
      }
    );
  }
);
var PaginationPrev = forwardRef(function PaginationPrev2({ className, children, onClick, ...props }, ref) {
  const { page, canPrev, setPage } = usePaginationContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Previous page",
      disabled: !canPrev,
      className: cn("vds-pagination-button", "vds-pagination-prev", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPage(page - 1);
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          IconChevronLeft,
          {
            size: 16,
            className: "vds-pagination-chevron",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "vds-pagination-button-label", children: "Previous" })
      ] })
    }
  );
});
var PaginationNext = forwardRef(function PaginationNext2({ className, children, onClick, ...props }, ref) {
  const { page, canNext, setPage } = usePaginationContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Next page",
      disabled: !canNext,
      className: cn("vds-pagination-button", "vds-pagination-next", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPage(page + 1);
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "vds-pagination-button-label", children: "Next" }),
        /* @__PURE__ */ jsx(
          IconChevronRight,
          {
            size: 16,
            className: "vds-pagination-chevron",
            "aria-hidden": "true"
          }
        )
      ] })
    }
  );
});
function PaginationPageSize({
  options,
  className,
  label = "Rows per page",
  size
}) {
  const {
    pageSize,
    pageSizeOptions,
    setPageSize,
    size: rootSize
  } = usePaginationContext();
  const labelId = useId();
  const effectiveOptions = options ?? pageSizeOptions;
  const effectiveSize = size ?? rootSize;
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-pagination-page-size", className), children: [
    /* @__PURE__ */ jsx("span", { id: labelId, className: "vds-pagination-page-size-label", children: label }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        value: String(pageSize),
        onValueChange: (v) => {
          const n = Number(v);
          if (Number.isFinite(n)) setPageSize(n);
        },
        children: [
          /* @__PURE__ */ jsx(
            SelectTrigger,
            {
              size: effectiveSize,
              "aria-labelledby": labelId,
              className: "vds-pagination-page-size-trigger",
              children: /* @__PURE__ */ jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsx(SelectContent, { children: effectiveOptions.map((n) => /* @__PURE__ */ jsx(SelectItem, { value: String(n), children: n }, n)) })
        ]
      }
    )
  ] });
}
function PaginationPages({
  className,
  siblingCount
}) {
  const {
    page,
    pageCount,
    siblingCount: rootSibling,
    setPage
  } = usePaginationContext();
  const items = computePageRange(page, pageCount, siblingCount ?? rootSibling);
  return /* @__PURE__ */ jsx(
    "ul",
    {
      dir: "ltr",
      className: cn("vds-pagination-pages", className),
      children: items.map(
        (it, i) => typeof it === "number" ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": `Page ${it + 1}`,
            "aria-current": it === page ? "page" : void 0,
            "data-active": it === page ? "" : void 0,
            className: "vds-pagination-page-button",
            onClick: () => setPage(it),
            children: it + 1
          }
        ) }, `p-${it}`) : /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "vds-pagination-ellipsis", children: "\u2026" }) }, `e-${i}`)
      )
    }
  );
}
function PaginationDefault({
  hidePageSize = false,
  hidePageNumbers = false,
  hideInfo = false,
  children,
  ...rootProps
}) {
  return /* @__PURE__ */ jsxs(PaginationRoot, { ...rootProps, children: [
    /* @__PURE__ */ jsxs("div", { className: "vds-pagination-meta", children: [
      !hidePageSize && /* @__PURE__ */ jsx(PaginationPageSize, {}),
      !hideInfo && /* @__PURE__ */ jsx(PaginationInfo, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-pagination-controls", children: [
      /* @__PURE__ */ jsx(PaginationPrev, {}),
      !hidePageNumbers && /* @__PURE__ */ jsx(PaginationPages, {}),
      /* @__PURE__ */ jsx(PaginationNext, {})
    ] }),
    children
  ] });
}

// src/index.ts
var Pagination = {
  Root: PaginationRoot,
  Prev: PaginationPrev,
  Next: PaginationNext,
  PageSize: PaginationPageSize,
  Info: PaginationInfo,
  Pages: PaginationPages,
  Default: PaginationDefault
};

export { Pagination, PaginationContext, PaginationDefault, PaginationInfo, PaginationNext, PaginationPageSize, PaginationPages, PaginationPrev, PaginationRoot, computePageRange, usePaginationContext };
