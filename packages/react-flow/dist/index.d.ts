import * as react_jsx_runtime from 'react/jsx-runtime';
import { Node, Edge, ReactFlowProps, BackgroundVariant, ColorMode, HandleProps, EdgeProps } from '@xyflow/react';
import { HTMLAttributes, Dispatch, SetStateAction } from 'react';

type FlowTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
interface FlowCanvasProps<NodeType extends Node = Node, EdgeType extends Edge = Edge> extends ReactFlowProps<NodeType, EdgeType> {
    backgroundGap?: number;
    backgroundSize?: number;
    backgroundVariant?: BackgroundVariant;
    colorMode?: ColorMode;
    showBackground?: boolean;
    showControls?: boolean;
    showMiniMap?: boolean;
}
declare function FlowCanvas<NodeType extends Node = Node, EdgeType extends Edge = Edge>({ backgroundGap, backgroundSize, backgroundVariant, className, colorMode, connectionLineType, defaultEdgeOptions, fitView, fitViewOptions, maxZoom, minZoom, showBackground, showControls, showMiniMap, snapGrid, snapToGrid, zoomOnDoubleClick, zoomOnScroll, children, ...props }: FlowCanvasProps<NodeType, EdgeType>): react_jsx_runtime.JSX.Element;
interface FlowNodeShellProps extends HTMLAttributes<HTMLDivElement> {
    selected?: boolean;
    tone?: FlowTone;
}
declare function FlowNodeShell({ className, selected, tone, ...props }: FlowNodeShellProps): react_jsx_runtime.JSX.Element;
declare function FlowNodeHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeBody({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeEyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeMeta({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeStats({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeStat({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeStatLabel({ className, ...props }: HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeStatValue({ className, ...props }: HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
declare function FlowNodeActions({ className, ...props }: HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

type FlowHandleSize = "sm" | "md";
interface FlowHandleProps extends HandleProps {
    size?: FlowHandleSize;
    tone?: FlowTone;
}
declare function FlowHandle({ className, size, tone, ...props }: FlowHandleProps): react_jsx_runtime.JSX.Element;

interface FlowBadgeEdgeData extends Record<string, unknown> {
    label?: string;
    tone?: FlowTone;
}
type FlowBadgeEdgeDefinition = Edge<FlowBadgeEdgeData, "badge">;
type FlowBadgeEdgeProps = EdgeProps<FlowBadgeEdgeDefinition>;
declare function FlowBadgeEdge({ animated, data, markerEnd, markerStart, selected, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, }: FlowBadgeEdgeProps): react_jsx_runtime.JSX.Element;

type FlowLayoutDirection = "TB" | "BT" | "LR" | "RL";
interface LayoutElementsOptions {
    defaultHeight?: number;
    defaultWidth?: number;
    direction?: FlowLayoutDirection;
    spacing?: number;
}
declare function layoutElements<NodeType extends Node = Node, EdgeType extends Edge = Edge>(nodes: NodeType[], edges: EdgeType[], { defaultHeight, defaultWidth, direction, spacing, }?: LayoutElementsOptions): Promise<{
    edges: EdgeType[];
    nodes: NodeType[];
}>;

interface UseFlowPersistenceOptions<NodeType extends Node = Node, EdgeType extends Edge = Edge> {
    setEdges: Dispatch<SetStateAction<EdgeType[]>>;
    setNodes: Dispatch<SetStateAction<NodeType[]>>;
    storageKey: string;
}
declare function useFlowPersistence<NodeType extends Node = Node, EdgeType extends Edge = Edge>({ setEdges, setNodes, storageKey, }: UseFlowPersistenceOptions<NodeType, EdgeType>): {
    clear: () => void;
    restore: () => Promise<boolean>;
    save: () => boolean;
};

export { FlowBadgeEdge, type FlowBadgeEdgeData, type FlowBadgeEdgeProps, FlowCanvas, type FlowCanvasProps, FlowHandle, type FlowHandleProps, type FlowHandleSize, type FlowLayoutDirection, FlowNodeActions, FlowNodeBody, FlowNodeDescription, FlowNodeEyebrow, FlowNodeFooter, FlowNodeHeader, FlowNodeMeta, FlowNodeShell, type FlowNodeShellProps, FlowNodeStat, FlowNodeStatLabel, FlowNodeStatValue, FlowNodeStats, FlowNodeTitle, type FlowTone, type LayoutElementsOptions, type UseFlowPersistenceOptions, layoutElements, useFlowPersistence };
