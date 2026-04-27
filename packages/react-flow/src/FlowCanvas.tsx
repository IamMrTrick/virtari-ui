import { cn } from "@virtari-packages/utils";
import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  type ColorMode,
  type DefaultEdgeOptions,
  type Edge,
  type ReactFlowProps,
  type Node,
} from "@xyflow/react";
import {
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type FlowTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";

function useDocumentColorMode(explicitColorMode?: ColorMode): ColorMode {
  const [mode, setMode] = useState<ColorMode>(explicitColorMode ?? "dark");

  useEffect(() => {
    if (explicitColorMode) {
      setMode(explicitColorMode);
      return;
    }

    const readTheme = () => {
      if (typeof document === "undefined") return "dark" as const;
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    };

    setMode(readTheme());

    if (typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(() => {
      setMode(readTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [explicitColorMode]);

  return mode;
}

function mergeEdgeOptions(
  base: DefaultEdgeOptions,
  override?: DefaultEdgeOptions,
): DefaultEdgeOptions {
  if (!override) return base;

  return {
    ...base,
    ...override,
    markerEnd: override.markerEnd ?? base.markerEnd,
    style: {
      ...(base.style ?? {}),
      ...(override.style ?? {}),
    },
  };
}

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
}: FlowCanvasProps<NodeType, EdgeType>) {
  const resolvedColorMode = useDocumentColorMode(colorMode);

  const mergedEdgeOptions = useMemo<DefaultEdgeOptions>(
    () =>
      mergeEdgeOptions(
        {
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 18,
            height: 18,
          },
          style: {
            strokeWidth: 2,
          },
        },
        defaultEdgeOptions,
      ),
    [defaultEdgeOptions],
  );

  return (
    <ReactFlow<NodeType, EdgeType>
      className={cn("vds-flow", className)}
      colorMode={resolvedColorMode}
      connectionLineType={connectionLineType}
      defaultEdgeOptions={mergedEdgeOptions}
      fitView={fitView}
      fitViewOptions={{ padding: 0.18, ...(fitViewOptions ?? {}) }}
      maxZoom={maxZoom}
      minZoom={minZoom}
      snapGrid={snapGrid}
      snapToGrid={snapToGrid}
      zoomOnDoubleClick={zoomOnDoubleClick}
      zoomOnScroll={zoomOnScroll}
      {...props}
    >
      {showBackground ? (
        <Background
          color="var(--flow-grid-color)"
          gap={backgroundGap}
          size={backgroundSize}
          variant={backgroundVariant}
        />
      ) : null}
      {showMiniMap ? (
        <MiniMap
          bgColor="color-mix(in oklab, var(--vds-color-surface) 88%, transparent)"
          maskColor="color-mix(in oklab, var(--vds-color-bg-subtle) 74%, transparent)"
          pannable
          zoomable
        />
      ) : null}
      {showControls ? <Controls showInteractive={false} /> : null}
      {children}
    </ReactFlow>
  );
}

export interface FlowNodeShellProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  tone?: FlowTone;
}

export function FlowNodeShell({
  className,
  selected,
  tone = "primary",
  ...props
}: FlowNodeShellProps) {
  return (
    <div
      className={cn("vds-flow-node", className)}
      data-selected={selected || undefined}
      data-tone={tone}
      {...props}
    />
  );
}

export function FlowNodeHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-header", className)} {...props} />;
}

export function FlowNodeBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-body", className)} {...props} />;
}

export function FlowNodeFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-footer", className)} {...props} />;
}

export function FlowNodeEyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("vds-flow-node-eyebrow", className)} {...props} />;
}

export function FlowNodeTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("vds-flow-node-title", className)} {...props} />;
}

export function FlowNodeMeta({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("vds-flow-node-meta", className)} {...props} />;
}

export function FlowNodeDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("vds-flow-node-description", className)} {...props} />;
}

export function FlowNodeStats({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-stats", className)} {...props} />;
}

export function FlowNodeStat({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-stat", className)} {...props} />;
}

export function FlowNodeStatLabel({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("vds-flow-node-stat-label", className)} {...props} />;
}

export function FlowNodeStatValue({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("vds-flow-node-stat-value", className)} {...props} />;
}

export function FlowNodeActions({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("vds-flow-node-actions", className)} {...props} />;
}
