import { cn } from "@virtari-packages/utils";
import {
  useState,
  useCallback,
  useRef,
  type Ref,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { TreeViewContext, useTreeViewContext, type TreeSelectionMode } from "./context";

export type { TreeSelectionMode };

/* ── TreeView ── */

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  selectionMode?: TreeSelectionMode;
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  defaultSelectedIds?: string[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  ref?: Ref<HTMLUListElement>;
}

export function TreeView({
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
}: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );
  const [internalSelected, setInternalSelected] = useState<Set<string>>(
    () => new Set(defaultSelectedIds)
  );

  const expandedIds = controlledExpanded
    ? new Set(controlledExpanded)
    : internalExpanded;

  const selectedIds = controlledSelected
    ? new Set(controlledSelected)
    : internalSelected;

  const toggleExpand = useCallback(
    (id: string) => {
      const next = new Set(expandedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      if (!controlledExpanded) setInternalExpanded(next);
      onExpandedChange?.([...next]);
    },
    [expandedIds, controlledExpanded, onExpandedChange]
  );

  const toggleSelect = useCallback(
    (id: string) => {
      if (selectionMode === "none") return;
      let next: Set<string>;
      if (selectionMode === "single") {
        next = selectedIds.has(id) ? new Set() : new Set([id]);
      } else {
        next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
      }
      if (!controlledSelected) setInternalSelected(next);
      onSelectionChange?.([...next]);
    },
    [selectedIds, selectionMode, controlledSelected, onSelectionChange]
  );

  return (
    <TreeViewContext
      value={{ expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level: 0 }}
    >
      <ul
        ref={ref}
        role="tree"
        className={cn("vds-tree-view", className)}
        aria-multiselectable={selectionMode === "multiple" || undefined}
        {...props}
      >
        {children}
      </ul>
    </TreeViewContext>
  );
}

/* ── TreeViewGroup ── */

export interface TreeViewGroupProps extends HTMLAttributes<HTMLUListElement> {
  ref?: Ref<HTMLUListElement>;
}

export function TreeViewGroup({ className, children, ref, ...props }: TreeViewGroupProps) {
  const { level } = useTreeViewContext();
  return (
    <TreeViewContext value={{ ...useTreeViewContext(), level: level + 1 }}>
      <ul ref={ref} role="group" className={cn("vds-tree-view-group", className)} {...props}>
        {children}
      </ul>
    </TreeViewContext>
  );
}

/* ── TreeViewItem ── */

export interface TreeViewItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  ref?: Ref<HTMLLIElement>;
}

export function TreeViewItem({
  id,
  label,
  icon,
  disabled = false,
  className,
  children,
  ref,
  ...props
}: TreeViewItemProps) {
  const { expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level } =
    useTreeViewContext();
  const isExpanded = expandedIds.has(id);
  const isSelected = selectedIds.has(id);
  const hasChildren = !!children;
  const rowRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <li
      ref={ref}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={selectionMode !== "none" ? isSelected : undefined}
      aria-disabled={disabled || undefined}
      data-level={level}
      className={cn("vds-tree-view-item", className)}
      {...props}
    >
      <div
        ref={rowRef}
        className="vds-tree-view-row"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (disabled) return;
          if (selectionMode !== "none") toggleSelect(id);
          if (hasChildren) toggleExpand(id);
        }}
        style={{ paddingInlineStart: `calc(${level} * var(--tree-indent-size))` }}
      >
        {hasChildren ? (
          <span
            className="vds-tree-view-toggle"
            aria-hidden="true"
            data-expanded={isExpanded || undefined}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        ) : (
          <span className="vds-tree-view-toggle-placeholder" aria-hidden="true" />
        )}
        {icon && (
          <span className="vds-tree-view-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="vds-tree-view-label">{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <TreeViewContext value={{ expandedIds, selectedIds, selectionMode, toggleExpand, toggleSelect, level: level + 1 }}>
          <ul role="group" className="vds-tree-view-group">
            {children}
          </ul>
        </TreeViewContext>
      )}
    </li>
  );
}
