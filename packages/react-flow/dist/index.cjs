'use strict';

var utils = require('@virtari-packages/utils');
var react$1 = require('@xyflow/react');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/FlowCanvas.tsx
function useDocumentColorMode(explicitColorMode) {
  const [mode, setMode] = react.useState(explicitColorMode ?? "dark");
  react.useEffect(() => {
    if (explicitColorMode) {
      setMode(explicitColorMode);
      return;
    }
    const readTheme = () => {
      if (typeof document === "undefined") return "dark";
      return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    };
    setMode(readTheme());
    if (typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(() => {
      setMode(readTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    return () => observer.disconnect();
  }, [explicitColorMode]);
  return mode;
}
function mergeEdgeOptions(base, override) {
  if (!override) return base;
  return {
    ...base,
    ...override,
    markerEnd: override.markerEnd ?? base.markerEnd,
    style: {
      ...base.style ?? {},
      ...override.style ?? {}
    }
  };
}
function FlowCanvas({
  backgroundGap = 24,
  backgroundSize = 1,
  backgroundVariant = react$1.BackgroundVariant.Dots,
  className,
  colorMode,
  connectionLineType = react$1.ConnectionLineType.SmoothStep,
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
}) {
  const resolvedColorMode = useDocumentColorMode(colorMode);
  const mergedEdgeOptions = react.useMemo(
    () => mergeEdgeOptions(
      {
        type: "smoothstep",
        markerEnd: {
          type: react$1.MarkerType.ArrowClosed,
          width: 18,
          height: 18
        },
        style: {
          strokeWidth: 2
        }
      },
      defaultEdgeOptions
    ),
    [defaultEdgeOptions]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.ReactFlow,
    {
      className: utils.cn("vds-flow", className),
      colorMode: resolvedColorMode,
      connectionLineType,
      defaultEdgeOptions: mergedEdgeOptions,
      fitView,
      fitViewOptions: { padding: 0.18, ...fitViewOptions ?? {} },
      maxZoom,
      minZoom,
      snapGrid,
      snapToGrid,
      zoomOnDoubleClick,
      zoomOnScroll,
      ...props,
      children: [
        showBackground ? /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Background,
          {
            color: "var(--flow-grid-color)",
            gap: backgroundGap,
            size: backgroundSize,
            variant: backgroundVariant
          }
        ) : null,
        showMiniMap ? /* @__PURE__ */ jsxRuntime.jsx(
          react$1.MiniMap,
          {
            bgColor: "color-mix(in oklab, var(--vds-color-surface) 88%, transparent)",
            maskColor: "color-mix(in oklab, var(--vds-color-bg-subtle) 74%, transparent)",
            pannable: true,
            zoomable: true
          }
        ) : null,
        showControls ? /* @__PURE__ */ jsxRuntime.jsx(react$1.Controls, { showInteractive: false }) : null,
        children
      ]
    }
  );
}
function FlowNodeShell({
  className,
  selected,
  tone = "primary",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: utils.cn("vds-flow-node", className),
      "data-selected": selected || void 0,
      "data-tone": tone,
      ...props
    }
  );
}
function FlowNodeHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-header", className), ...props });
}
function FlowNodeBody({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-body", className), ...props });
}
function FlowNodeFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-footer", className), ...props });
}
function FlowNodeEyebrow({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { className: utils.cn("vds-flow-node-eyebrow", className), ...props });
}
function FlowNodeTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("h3", { className: utils.cn("vds-flow-node-title", className), ...props });
}
function FlowNodeMeta({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { className: utils.cn("vds-flow-node-meta", className), ...props });
}
function FlowNodeDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { className: utils.cn("vds-flow-node-description", className), ...props });
}
function FlowNodeStats({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-stats", className), ...props });
}
function FlowNodeStat({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-stat", className), ...props });
}
function FlowNodeStatLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: utils.cn("vds-flow-node-stat-label", className), ...props });
}
function FlowNodeStatValue({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: utils.cn("vds-flow-node-stat-value", className), ...props });
}
function FlowNodeActions({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-flow-node-actions", className), ...props });
}
function FlowHandle({
  className,
  size = "md",
  tone = "primary",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    react$1.Handle,
    {
      className: utils.cn("vds-flow-handle", className),
      "data-size": size,
      "data-tone": tone,
      ...props
    }
  );
}
var interactionStrokeStyle = {
  fill: "none",
  stroke: "transparent",
  strokeWidth: 22
};
function resolveToneStroke(tone) {
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
function FlowBadgeEdge({
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
  targetPosition
}) {
  const tone = selected ? "primary" : data?.tone ?? "primary";
  const stroke = resolveToneStroke(tone);
  const [edgePath, labelX, labelY] = react$1.getSmoothStepPath({
    borderRadius: 18,
    offset: 28,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "path",
      {
        d: edgePath,
        className: "vds-flow-edge-halo",
        markerEnd,
        markerStart,
        style: {
          fill: "none",
          stroke,
          opacity: 0.18,
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "path",
      {
        d: edgePath,
        className: "react-flow__edge-path vds-flow-edge-path",
        "data-active": selected || void 0,
        "data-animated": animated || void 0,
        markerEnd,
        markerStart,
        style: {
          fill: "none",
          stroke,
          opacity: 0.98,
          strokeWidth: 4.5,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: edgePath, className: "react-flow__edge-interaction", style: interactionStrokeStyle }),
    data?.label ? /* @__PURE__ */ jsxRuntime.jsx(react$1.EdgeLabelRenderer, { children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "nodrag nopan",
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY - 22}px)`,
          pointerEvents: "all"
        },
        children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-flow-edge-label", "data-tone": data.tone ?? "neutral", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-flow-edge-dot", "aria-hidden": "true" }),
          data.label
        ] })
      }
    ) }) : null
  ] });
}
function getHandlePositions(direction) {
  if (direction === "LR") {
    return { sourcePosition: react$1.Position.Right, targetPosition: react$1.Position.Left };
  }
  if (direction === "RL") {
    return { sourcePosition: react$1.Position.Left, targetPosition: react$1.Position.Right };
  }
  if (direction === "BT") {
    return { sourcePosition: react$1.Position.Top, targetPosition: react$1.Position.Bottom };
  }
  return { sourcePosition: react$1.Position.Bottom, targetPosition: react$1.Position.Top };
}
function getMeasuredDimension(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function groupByLevel(nodes, edges) {
  const incoming = /* @__PURE__ */ new Map();
  const outgoing = /* @__PURE__ */ new Map();
  const levels = /* @__PURE__ */ new Map();
  const nodeIds = new Set(nodes.map((node) => node.id));
  for (const node of nodes) {
    incoming.set(node.id, 0);
    outgoing.set(node.id, []);
  }
  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue;
    incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1);
    outgoing.get(edge.source)?.push(edge.target);
  }
  const queue = nodes.filter((node) => (incoming.get(node.id) ?? 0) === 0);
  for (const root of queue) {
    levels.set(root.id, 0);
  }
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) break;
    const nextLevel = (levels.get(node.id) ?? 0) + 1;
    for (const target of outgoing.get(node.id) ?? []) {
      levels.set(target, Math.max(levels.get(target) ?? 0, nextLevel));
      incoming.set(target, (incoming.get(target) ?? 1) - 1);
      if ((incoming.get(target) ?? 0) === 0) {
        const targetNode = nodes.find((candidate) => candidate.id === target);
        if (targetNode) queue.push(targetNode);
      }
    }
  }
  let fallbackLevel = Math.max(0, ...levels.values());
  for (const node of nodes) {
    if (!levels.has(node.id)) {
      fallbackLevel += 1;
      levels.set(node.id, fallbackLevel);
    }
  }
  const grouped = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    const level = levels.get(node.id) ?? 0;
    const bucket = grouped.get(level);
    if (bucket) bucket.push(node);
    else grouped.set(level, [node]);
  }
  return Array.from(grouped.entries()).sort((a, b) => a[0] - b[0]).map(([, bucket]) => bucket);
}
async function layoutElements(nodes, edges, {
  defaultHeight = 144,
  defaultWidth = 304,
  direction = "LR",
  spacing = 48
} = {}) {
  const layers = groupByLevel(nodes, edges);
  const positions = /* @__PURE__ */ new Map();
  const handlePositions = getHandlePositions(direction);
  const nodeGap = Math.max(28, Math.round(spacing * 0.6));
  if (direction === "LR" || direction === "RL") {
    let laneOffset = 0;
    for (const layer of layers) {
      let stackOffset = 0;
      const maxWidth = Math.max(
        ...layer.map((node) => getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth))
      );
      for (const node of layer) {
        const width = getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth);
        const height = getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight);
        const x = direction === "RL" ? -laneOffset - width : laneOffset;
        positions.set(node.id, { x, y: stackOffset });
        stackOffset += height + nodeGap;
      }
      laneOffset += maxWidth + spacing;
    }
  } else {
    let laneOffset = 0;
    for (const layer of layers) {
      let stackOffset = 0;
      const maxHeight = Math.max(
        ...layer.map((node) => getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight))
      );
      for (const node of layer) {
        const width = getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth);
        const height = getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight);
        const y = direction === "BT" ? -laneOffset - height : laneOffset;
        positions.set(node.id, { x: stackOffset, y });
        stackOffset += width + nodeGap;
      }
      laneOffset += maxHeight + spacing;
    }
  }
  return {
    edges,
    nodes: nodes.map((node) => ({
      ...node,
      ...handlePositions,
      position: positions.get(node.id) ?? node.position
    }))
  };
}
function useFlowPersistence({
  setEdges,
  setNodes,
  storageKey
}) {
  const reactFlow = react$1.useReactFlow();
  const save = react.useCallback(() => {
    if (typeof window === "undefined") return false;
    const snapshot = reactFlow.toObject();
    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
    return true;
  }, [reactFlow, storageKey]);
  const restore = react.useCallback(async () => {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return false;
    const snapshot = JSON.parse(raw);
    setNodes(snapshot.nodes ?? []);
    setEdges(snapshot.edges ?? []);
    await reactFlow.setViewport({
      x: snapshot.viewport?.x ?? 0,
      y: snapshot.viewport?.y ?? 0,
      zoom: snapshot.viewport?.zoom ?? 1
    });
    return true;
  }, [reactFlow, setEdges, setNodes, storageKey]);
  const clear = react.useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(storageKey);
  }, [storageKey]);
  return { clear, restore, save };
}

exports.FlowBadgeEdge = FlowBadgeEdge;
exports.FlowCanvas = FlowCanvas;
exports.FlowHandle = FlowHandle;
exports.FlowNodeActions = FlowNodeActions;
exports.FlowNodeBody = FlowNodeBody;
exports.FlowNodeDescription = FlowNodeDescription;
exports.FlowNodeEyebrow = FlowNodeEyebrow;
exports.FlowNodeFooter = FlowNodeFooter;
exports.FlowNodeHeader = FlowNodeHeader;
exports.FlowNodeMeta = FlowNodeMeta;
exports.FlowNodeShell = FlowNodeShell;
exports.FlowNodeStat = FlowNodeStat;
exports.FlowNodeStatLabel = FlowNodeStatLabel;
exports.FlowNodeStatValue = FlowNodeStatValue;
exports.FlowNodeStats = FlowNodeStats;
exports.FlowNodeTitle = FlowNodeTitle;
exports.layoutElements = layoutElements;
exports.useFlowPersistence = useFlowPersistence;
