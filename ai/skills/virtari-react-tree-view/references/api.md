# @virtari-packages/react-tree-view API snapshot

Version: 0.4.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/TreeView.css",
  "./tokens": "./dist/TreeView.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `TreeView` (export) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeViewItem` (export) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeViewGroup` (export) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeViewProps` (type) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeViewItemProps` (type) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeViewGroupProps` (type) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.
- `TreeSelectionMode` (type) from `@virtari-packages/react-tree-view`; source: `packages/react-tree-view/src/index.ts`.

## Source type declarations

Source: `packages/react-tree-view/src/context.ts`

```tsx
export type TreeSelectionMode = "none" | "single" | "multiple";
```

Source: `packages/react-tree-view/src/context.ts`

```tsx
export interface TreeViewContextValue {
  expandedIds: Set<string>;
  selectedIds: Set<string>;
  selectionMode: TreeSelectionMode;
  toggleExpand: (id: string) => void;
  toggleSelect: (id: string) => void;
  level: number;
}
```

Source: `packages/react-tree-view/src/context.ts`

```tsx
export function useTreeViewContext();
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
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
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
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
}: TreeViewProps);
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
export interface TreeViewGroupProps extends HTMLAttributes<HTMLUListElement> {
  ref?: Ref<HTMLUListElement>;
}
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
export function TreeViewGroup({ className, children, ref, ...props }: TreeViewGroupProps);
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
export interface TreeViewItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-tree-view/src/TreeView.tsx`

```tsx
export function TreeViewItem({
  id,
  label,
  icon,
  disabled = false,
  className,
  children,
  ref,
  ...props
}: TreeViewItemProps);
```

## Source files

- `packages/react-tree-view/src/context.ts`
- `packages/react-tree-view/src/index.ts`
- `packages/react-tree-view/src/TreeView.css`
- `packages/react-tree-view/src/TreeView.tokens.css`
- `packages/react-tree-view/src/TreeView.tsx`
- `packages/react-tree-view/package.json`
