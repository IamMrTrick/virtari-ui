import { createContext, useContext } from "react";

export type TreeSelectionMode = "none" | "single" | "multiple";

export interface TreeViewContextValue {
  expandedIds: Set<string>;
  selectedIds: Set<string>;
  selectionMode: TreeSelectionMode;
  toggleExpand: (id: string) => void;
  toggleSelect: (id: string) => void;
  level: number;
}

export const TreeViewContext = createContext<TreeViewContextValue>({
  expandedIds: new Set(),
  selectedIds: new Set(),
  selectionMode: "none",
  toggleExpand: () => {},
  toggleSelect: () => {},
  level: 0,
});

export function useTreeViewContext() {
  return useContext(TreeViewContext);
}
