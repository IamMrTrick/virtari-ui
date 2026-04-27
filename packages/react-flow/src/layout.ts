import { Position, type Edge, type Node } from "@xyflow/react";

export type FlowLayoutDirection = "TB" | "BT" | "LR" | "RL";

export interface LayoutElementsOptions {
  defaultHeight?: number;
  defaultWidth?: number;
  direction?: FlowLayoutDirection;
  spacing?: number;
}

function getHandlePositions(direction: FlowLayoutDirection) {
  if (direction === "LR") {
    return { sourcePosition: Position.Right, targetPosition: Position.Left };
  }

  if (direction === "RL") {
    return { sourcePosition: Position.Left, targetPosition: Position.Right };
  }

  if (direction === "BT") {
    return { sourcePosition: Position.Top, targetPosition: Position.Bottom };
  }

  return { sourcePosition: Position.Bottom, targetPosition: Position.Top };
}

function getMeasuredDimension(
  value: unknown,
  fallback: number,
) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function groupByLevel<NodeType extends Node>(
  nodes: NodeType[],
  edges: Edge[],
) {
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, string[]>();
  const levels = new Map<string, number>();
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

  const grouped = new Map<number, NodeType[]>();
  for (const node of nodes) {
    const level = levels.get(node.id) ?? 0;
    const bucket = grouped.get(level);
    if (bucket) bucket.push(node);
    else grouped.set(level, [node]);
  }

  return Array.from(grouped.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, bucket]) => bucket);
}

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
): Promise<{ edges: EdgeType[]; nodes: NodeType[] }> {
  const layers = groupByLevel(nodes, edges);
  const positions = new Map<string, { x: number; y: number }>();
  const handlePositions = getHandlePositions(direction);
  const nodeGap = Math.max(28, Math.round(spacing * 0.6));

  if (direction === "LR" || direction === "RL") {
    let laneOffset = 0;

    for (const layer of layers) {
      let stackOffset = 0;
      const maxWidth = Math.max(
        ...layer.map((node) => getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth)),
      );

      for (const node of layer) {
        const width = getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth);
        const height = getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight);
        const x =
          direction === "RL"
            ? -laneOffset - width
            : laneOffset;

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
        ...layer.map((node) => getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight)),
      );

      for (const node of layer) {
        const width = getMeasuredDimension(node.measured?.width ?? node.width, defaultWidth);
        const height = getMeasuredDimension(node.measured?.height ?? node.height, defaultHeight);
        const y =
          direction === "BT"
            ? -laneOffset - height
            : laneOffset;

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
      position: positions.get(node.id) ?? node.position,
    })),
  };
}
