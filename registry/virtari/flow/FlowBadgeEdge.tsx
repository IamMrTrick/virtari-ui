import { EdgeLabelRenderer, getSmoothStepPath, type Edge, type EdgeProps } from "@xyflow/react";
import type { CSSProperties } from "react";
import type { FlowTone } from "./FlowCanvas";

export interface FlowBadgeEdgeData extends Record<string, unknown> {
  label?: string;
  tone?: FlowTone;
}

export type FlowBadgeEdgeDefinition = Edge<FlowBadgeEdgeData, "badge">;
export type FlowBadgeEdgeProps = EdgeProps<FlowBadgeEdgeDefinition>;

const interactionStrokeStyle: CSSProperties = {
  fill: "none",
  stroke: "transparent",
  strokeWidth: 22,
};

function resolveToneStroke(tone?: FlowTone) {
  switch (tone) {
    case "success":
      return "#22c55e";
    case "warning":
      return "#f59e0b";
    case "danger":
      return "#ef4444";
    case "info":
      return "#38bdf8";
    case "accent":
      return "#fb7185";
    case "neutral":
      return "#94a3b8";
    case "primary":
    default:
      return "#818cf8";
  }
}

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
}: FlowBadgeEdgeProps) {
  const tone = selected ? "primary" : (data?.tone ?? "primary");
  const stroke = resolveToneStroke(tone);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    borderRadius: 18,
    offset: 28,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        d={edgePath}
        className="vds-flow-edge-halo"
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{
          fill: "none",
          stroke,
          opacity: 0.18,
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      <path
        d={edgePath}
        className="react-flow__edge-path vds-flow-edge-path"
        data-active={selected || undefined}
        data-animated={animated || undefined}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{
          fill: "none",
          stroke,
          opacity: 0.98,
          strokeWidth: 4.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      <path d={edgePath} className="react-flow__edge-interaction" style={interactionStrokeStyle} />
      {data?.label ? (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY - 22}px)`,
              pointerEvents: "all",
            }}
          >
            <span className="vds-flow-edge-label" data-tone={data.tone ?? "neutral"}>
              <span className="vds-flow-edge-dot" aria-hidden="true" />
              {data.label}
            </span>
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
