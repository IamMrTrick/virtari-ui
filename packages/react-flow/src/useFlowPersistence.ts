import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useReactFlow, type Edge, type Node } from "@xyflow/react";

export interface UseFlowPersistenceOptions<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> {
  setEdges: Dispatch<SetStateAction<EdgeType[]>>;
  setNodes: Dispatch<SetStateAction<NodeType[]>>;
  storageKey: string;
}

export function useFlowPersistence<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
>({
  setEdges,
  setNodes,
  storageKey,
}: UseFlowPersistenceOptions<NodeType, EdgeType>) {
  const reactFlow = useReactFlow<NodeType, EdgeType>();

  const save = useCallback(() => {
    if (typeof window === "undefined") return false;
    const snapshot = reactFlow.toObject();
    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
    return true;
  }, [reactFlow, storageKey]);

  const restore = useCallback(async () => {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return false;

    const snapshot = JSON.parse(raw) as {
      edges?: EdgeType[];
      nodes?: NodeType[];
      viewport?: { x?: number; y?: number; zoom?: number };
    };

    setNodes(snapshot.nodes ?? []);
    setEdges(snapshot.edges ?? []);
    await reactFlow.setViewport({
      x: snapshot.viewport?.x ?? 0,
      y: snapshot.viewport?.y ?? 0,
      zoom: snapshot.viewport?.zoom ?? 1,
    });
    return true;
  }, [reactFlow, setEdges, setNodes, storageKey]);

  const clear = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(storageKey);
  }, [storageKey]);

  return { clear, restore, save };
}
