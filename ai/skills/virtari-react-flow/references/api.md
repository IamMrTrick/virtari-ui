# @virtari-packages/react-flow API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/ReactFlow.css",
  "./tokens": "./dist/ReactFlow.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `FlowCanvas` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeActions` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeBody` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeDescription` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeEyebrow` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeFooter` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeHeader` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeMeta` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeShell` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeStat` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeStatLabel` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeStatValue` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeStats` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeTitle` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowCanvasProps` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowNodeShellProps` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowTone` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowHandle` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowHandleProps` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowHandleSize` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowBadgeEdge` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowBadgeEdgeData` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowBadgeEdgeProps` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `layoutElements` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `FlowLayoutDirection` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `LayoutElementsOptions` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `useFlowPersistence` (export) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.
- `UseFlowPersistenceOptions` (type) from `@virtari-packages/react-flow`; source: `packages/react-flow/src/index.ts`.

## Source type declarations

Source: `packages/react-flow/src/FlowBadgeEdge.tsx`

```tsx
export interface FlowBadgeEdgeData extends Record<string, unknown> {
  label?: string;
  tone?: FlowTone;
}
```

Source: `packages/react-flow/src/FlowBadgeEdge.tsx`

```tsx
export type FlowBadgeEdgeDefinition = Edge<FlowBadgeEdgeData, "badge">;
```

Source: `packages/react-flow/src/FlowBadgeEdge.tsx`

```tsx
export type FlowBadgeEdgeProps = EdgeProps<FlowBadgeEdgeDefinition>;
```

Source: `packages/react-flow/src/FlowBadgeEdge.tsx`

```tsx
export function FlowBadgeEdge({
  animated,
  data,
  markerEnd,
  markerStart,
  selected,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: FlowBadgeEdgeProps);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export type FlowTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export interface FlowCanvasProps<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> extends ReactFlowProps<NodeType, EdgeType> {
  backgroundGap?: number;
  backgroundSize?: number;
  backgroundVariant?: BackgroundVariant;
  colorMode?: ColorMode;
  showBackground?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
}
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowCanvas<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>({
  backgroundGap = 24,
  backgroundSize = 1,
  backgroundVariant = BackgroundVariant.Dots,
  className,
  colorMode,
  connectionLineType = ConnectionLineType.SmoothStep,
  defaultEdgeOptions,
  fitView = true,
  fitViewOptions,
  maxZoom = 1.2,
  minZoom = 0.72,
  showBackground = true,
  showControls = true,
  showMiniMap = false,
  snapGrid = [24, 24],
  snapToGrid = true,
  zoomOnDoubleClick = false,
  zoomOnScroll = false,
  children,
  ...props
}: FlowCanvasProps<NodeType, EdgeType>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export interface FlowNodeShellProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  tone?: FlowTone;
}
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeShell({
  className,
  selected,
  tone = "primary",
  ...props
}: FlowNodeShellProps);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeEyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeMeta({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeStats({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeStat({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeStatLabel({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeStatValue({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>);
```

Source: `packages/react-flow/src/FlowCanvas.tsx`

```tsx
export function FlowNodeActions({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>);
```

Source: `packages/react-flow/src/FlowHandle.tsx`

```tsx
export type FlowHandleSize = "sm" | "md";
```

Source: `packages/react-flow/src/FlowHandle.tsx`

```tsx
export interface FlowHandleProps extends HandleProps {
  size?: FlowHandleSize;
  tone?: FlowTone;
}
```

Source: `packages/react-flow/src/FlowHandle.tsx`

```tsx
export function FlowHandle({
  className,
  size = "md",
  tone = "primary",
  ...props
}: FlowHandleProps);
```

Source: `packages/react-flow/src/layout.ts`

```tsx
export type FlowLayoutDirection = "TB" | "BT" | "LR" | "RL";
```

Source: `packages/react-flow/src/layout.ts`

```tsx
export interface LayoutElementsOptions {
  defaultHeight?: number;
  defaultWidth?: number;
  direction?: FlowLayoutDirection;
  spacing?: number;
}
```

Source: `packages/react-flow/src/layout.ts`

```tsx
export async function layoutElements<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>(
  nodes: NodeType[],
  edges: EdgeType[],
  {
    defaultHeight = 144,
    defaultWidth = 304,
    direction = "LR",
    spacing = 48,
  }: LayoutElementsOptions = {},
): Promise<{ edges: EdgeType[]; nodes: NodeType[] }>;
```

Source: `packages/react-flow/src/useFlowPersistence.ts`

```tsx
export interface UseFlowPersistenceOptions<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> {
  setEdges: Dispatch<SetStateAction<EdgeType[]>>;
  setNodes: Dispatch<SetStateAction<NodeType[]>>;
  storageKey: string;
}
```

Source: `packages/react-flow/src/useFlowPersistence.ts`

```tsx
export function useFlowPersistence<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>({
  setEdges,
  setNodes,
  storageKey,
}: UseFlowPersistenceOptions<NodeType, EdgeType>);
```

## Source files

- `packages/react-flow/src/FlowBadgeEdge.tsx`
- `packages/react-flow/src/FlowCanvas.tsx`
- `packages/react-flow/src/FlowHandle.tsx`
- `packages/react-flow/src/index.ts`
- `packages/react-flow/src/layout.ts`
- `packages/react-flow/src/ReactFlow.css`
- `packages/react-flow/src/ReactFlow.tokens.css`
- `packages/react-flow/src/useFlowPersistence.ts`
- `packages/react-flow/package.json`
