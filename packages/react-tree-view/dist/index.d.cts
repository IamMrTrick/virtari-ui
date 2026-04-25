import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, Ref, ReactNode } from 'react';

type TreeSelectionMode = "none" | "single" | "multiple";

interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
    selectionMode?: TreeSelectionMode;
    defaultExpandedIds?: string[];
    expandedIds?: string[];
    onExpandedChange?: (ids: string[]) => void;
    defaultSelectedIds?: string[];
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    ref?: Ref<HTMLUListElement>;
}
declare function TreeView({ selectionMode, defaultExpandedIds, expandedIds: controlledExpanded, onExpandedChange, defaultSelectedIds, selectedIds: controlledSelected, onSelectionChange, className, children, ref, ...props }: TreeViewProps): react_jsx_runtime.JSX.Element;
interface TreeViewGroupProps extends HTMLAttributes<HTMLUListElement> {
    ref?: Ref<HTMLUListElement>;
}
declare function TreeViewGroup({ className, children, ref, ...props }: TreeViewGroupProps): react_jsx_runtime.JSX.Element;
interface TreeViewItemProps extends HTMLAttributes<HTMLLIElement> {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    ref?: Ref<HTMLLIElement>;
}
declare function TreeViewItem({ id, label, icon, disabled, className, children, ref, ...props }: TreeViewItemProps): react_jsx_runtime.JSX.Element;

export { type TreeSelectionMode, TreeView, TreeViewGroup, type TreeViewGroupProps, TreeViewItem, type TreeViewItemProps, type TreeViewProps };
