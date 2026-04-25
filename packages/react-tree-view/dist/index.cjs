'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/TreeView.tsx
var TreeViewContext = react.createContext({
  expandedIds: /* @__PURE__ */ new Set(),
  selectedIds: /* @__PURE__ */ new Set(),
  selectionMode: "none",
  toggleExpand: () => {
  },
  toggleSelect: () => {
  },
  level: 0
});
function useTreeViewContext() {
  return react.useContext(TreeViewContext);
}
function TreeView({
  selectionMode = "none",
  defaultExpandedIds = [],
  expandedIds: controlledExpanded,
  onExpandedChange,
  defaultSelectedIds = [],
  selectedIds: controlledSelected,
  onSelectionChange,
  className,
  children,
  ref,
  ...props
}) {
  const [internalExpanded, setInternalExpanded] = react.useState(
    () => new Set(defaultExpandedIds)
  );
  const [internalSelected, setInternalSelected] = react.useState(
    () => new Set(defaultSelectedIds)
  );
  const expandedIds = controlledExpanded ? new Set(controlledExpanded) : internalExpanded;
  const selectedIds = controlledSelected ? new Set(controlledSelected) : internalSelected;
  const toggleExpand = react.useCallback(
    (id) => {
      const next = new Set(expandedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      if (!controlledExpanded) setInternalExpanded(next);
      onExpandedChange?.([...next]);
    },
    [expandedIds, controlledExpanded, onExpandedChange]
  );
  const toggleSelect = react.useCallback(
    (id) => {
      if (selectionMode === "none") return;
      let next;
      if (selectionMode === "single") {
        next = selectedIds.has(id) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([id]);
      } else {
        next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
      }
      if (!controlledSelected) setInternalSelected(next);
      onSelectionChange?.([...next]);
    },
    [selectedIds, selectionMode, controlledSelected, onSelectionChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    TreeViewContext,
    {
      value: { expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level: 0 },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "ul",
        {
          ref,
          role: "tree",
          className: utils.cn("vds-tree-view", className),
          "aria-multiselectable": selectionMode === "multiple" || void 0,
          ...props,
          children
        }
      )
    }
  );
}
function TreeViewGroup({ className, children, ref, ...props }) {
  const { level } = useTreeViewContext();
  return /* @__PURE__ */ jsxRuntime.jsx(TreeViewContext, { value: { ...useTreeViewContext(), level: level + 1 }, children: /* @__PURE__ */ jsxRuntime.jsx("ul", { ref, role: "group", className: utils.cn("vds-tree-view-group", className), ...props, children }) });
}
function TreeViewItem({
  id,
  label,
  icon,
  disabled = false,
  className,
  children,
  ref,
  ...props
}) {
  const { expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level } = useTreeViewContext();
  const isExpanded = expandedIds.has(id);
  const isSelected = selectedIds.has(id);
  const hasChildren = !!children;
  const rowRef = react.useRef(null);
  const handleKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (selectionMode !== "none") toggleSelect(id);
        else if (hasChildren) toggleExpand(id);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (hasChildren && !isExpanded) toggleExpand(id);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (hasChildren && isExpanded) toggleExpand(id);
        break;
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "li",
    {
      ref,
      role: "treeitem",
      "aria-expanded": hasChildren ? isExpanded : void 0,
      "aria-selected": selectionMode !== "none" ? isSelected : void 0,
      "aria-disabled": disabled || void 0,
      "data-selected": isSelected || void 0,
      "data-expanded": isExpanded || void 0,
      "data-disabled": disabled || void 0,
      "data-level": level,
      className: utils.cn("vds-tree-view-item", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ref: rowRef,
            className: "vds-tree-view-row",
            tabIndex: disabled ? -1 : 0,
            onKeyDown: handleKeyDown,
            onClick: () => {
              if (disabled) return;
              if (selectionMode !== "none") toggleSelect(id);
              if (hasChildren) toggleExpand(id);
            },
            style: { paddingInlineStart: `calc(${level} * var(--tree-indent-size))` },
            children: [
              hasChildren ? /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "vds-tree-view-toggle",
                  "aria-hidden": "true",
                  "data-expanded": isExpanded || void 0,
                  children: /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" }) })
                }
              ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-tree-view-toggle-placeholder", "aria-hidden": "true" }),
              icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-tree-view-icon", "aria-hidden": "true", children: icon }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-tree-view-label", children: label })
            ]
          }
        ),
        hasChildren && isExpanded && /* @__PURE__ */ jsxRuntime.jsx(TreeViewContext, { value: { expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level: level + 1 }, children: /* @__PURE__ */ jsxRuntime.jsx("ul", { role: "group", className: "vds-tree-view-group", children }) })
      ]
    }
  );
}

exports.TreeView = TreeView;
exports.TreeViewGroup = TreeViewGroup;
exports.TreeViewItem = TreeViewItem;
