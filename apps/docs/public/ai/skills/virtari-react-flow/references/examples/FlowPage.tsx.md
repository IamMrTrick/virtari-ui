# Original documentation page

Source ID: `apps/docs/src/pages/FlowPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import {
  IconBrain,
  IconDeviceFloppy,
  IconGitBranch,
  IconLayoutKanban,
  IconRestore,
  IconRocket,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";
import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import {
  FlowCanvas,
  FlowHandle,
  FlowNodeActions,
  FlowNodeBody,
  FlowNodeDescription,
  FlowNodeEyebrow,
  FlowNodeFooter,
  FlowNodeHeader,
  FlowNodeMeta,
  FlowNodeShell,
  FlowNodeStat,
  FlowNodeStatLabel,
  FlowNodeStatValue,
  FlowNodeStats,
  FlowNodeTitle,
  layoutElements,
  useFlowPersistence,
  type FlowBadgeEdgeData,
  type FlowLayoutDirection,
  type FlowTone,
} from "@virtari-packages/react-flow";
import "@virtari-packages/react-flow/tokens";
import "@virtari-packages/react-flow/styles";
import { Input } from "@virtari-packages/react-input";
import { toast } from "@virtari-packages/react-toast";
import {
  Panel,
  Position,
  ReactFlowProvider,
  SmoothStepEdge,
  addEdge,
  getOutgoers,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Section } from "../components";

type WorkflowKind = "intake" | "ai" | "review" | "publish" | "archive";

type WorkflowMetric = {
  label: string;
  value: string;
};

type WorkflowNodeData = {
  badge: string;
  description: string;
  eyebrow: string;
  metrics?: WorkflowMetric[];
  preview?: string;
  title: string;
  tone: FlowTone;
  kind: WorkflowKind;
};

type WorkflowNode = Node<WorkflowNodeData, "workflow">;
type WorkflowEdge = Edge<FlowBadgeEdgeData, "badge">;

function createEdgePresentation(tone: FlowTone = "primary") {
  const stroke =
    tone === "success"
      ? "#22c55e"
      : tone === "warning"
        ? "#f59e0b"
        : tone === "info"
          ? "#38bdf8"
          : tone === "accent"
            ? "#fb7185"
            : "#818cf8";

  return {
    animated: true,
    labelBgBorderRadius: 999,
    labelBgPadding: [10, 6] as [number, number],
    labelShowBg: true,
    labelStyle: { fill: stroke, fontWeight: 700, fontSize: 12 },
    style: { stroke, strokeWidth: 4 },
  };
}

const iconProps = { size: 16, stroke: 1.8, "aria-hidden": true } as const;

const workflowIcons: Record<WorkflowKind, React.JSX.Element> = {
  intake: <IconLayoutKanban {...iconProps} />,
  ai: <IconBrain {...iconProps} />,
  review: <IconShieldCheck {...iconProps} />,
  publish: <IconRocket {...iconProps} />,
  archive: <IconSparkles {...iconProps} />,
};

function WorkflowNodeCard({
  data,
  selected,
  sourcePosition,
  targetPosition,
}: NodeProps<WorkflowNode>) {
  return (
    <FlowNodeShell selected={selected} tone={data.tone}>
      <FlowHandle position={targetPosition ?? Position.Left} size="sm" tone={data.tone} type="target" />
      <FlowNodeHeader>
        <div style={headerCopyStyle}>
          <FlowNodeEyebrow>{data.eyebrow}</FlowNodeEyebrow>
          <FlowNodeTitle>{data.title}</FlowNodeTitle>
          <FlowNodeMeta>{data.badge}</FlowNodeMeta>
        </div>
        <Badge
          color={toneToBadgeColor[data.tone]}
          leftSection={workflowIcons[data.kind]}
          size="sm"
          variant="soft"
        >
          {data.kind}
        </Badge>
      </FlowNodeHeader>

      <FlowNodeBody>
        <FlowNodeDescription>{data.description}</FlowNodeDescription>
        {data.preview ? (
          <Input className="nodrag nopan" inputSize="sm" readOnly value={data.preview} />
        ) : null}
        {data.metrics?.length ? (
          <FlowNodeStats>
            {data.metrics.map((metric) => (
              <FlowNodeStat key={metric.label}>
                <FlowNodeStatLabel>{metric.label}</FlowNodeStatLabel>
                <FlowNodeStatValue>{metric.value}</FlowNodeStatValue>
              </FlowNodeStat>
            ))}
          </FlowNodeStats>
        ) : null}
      </FlowNodeBody>

      <FlowNodeFooter>
        <FlowNodeActions>
          <Button
            className="nodrag nopan"
            size="xs"
            variant="ghost"
            onClick={() => toast.info(data.title, "Inspect action triggered from the demo node.")}
          >
            Inspect
          </Button>
          <Button
            className="nodrag nopan"
            size="xs"
            variant="outline"
            onClick={() => toast.success(data.title, "Node action is wired and interactive.")}
          >
            Open
          </Button>
        </FlowNodeActions>
      </FlowNodeFooter>
      <FlowHandle position={sourcePosition ?? Position.Right} size="sm" tone={data.tone} type="source" />
    </FlowNodeShell>
  );
}

const nodeTypes = {
  workflow: WorkflowNodeCard,
};

const edgeTypes = {
  badge: SmoothStepEdge,
};

const toneToBadgeColor: Record<FlowTone, "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent"> = {
  neutral: "neutral",
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  accent: "accent",
};

function createWorkflowNodes(): WorkflowNode[] {
  return [
    {
      id: "intake",
      type: "workflow",
      position: { x: 96, y: 92 },
      data: {
        badge: "3 input channels",
        description: "Collect ticket context, locale, and urgency before the graph fans out.",
        eyebrow: "Trigger",
        kind: "intake",
        metrics: [
          { label: "SLA", value: "< 2 min" },
          { label: "Locales", value: "12" },
        ],
        preview: "Refund request · en-US · urgent",
        title: "Request intake",
        tone: "accent",
      },
    },
    {
      id: "ai",
      type: "workflow",
      position: { x: 620, y: 92 },
      data: {
        badge: "Claude / GPT router",
        description: "Generate answer draft, confidence, and escalation hints from shared prompts.",
        eyebrow: "Compute",
        kind: "ai",
        metrics: [
          { label: "Latency", value: "4.2s" },
          { label: "Confidence", value: "92%" },
        ],
        preview: "Return policy answer with merchant summary",
        title: "Agent planner",
        tone: "primary",
      },
    },
    {
      id: "review",
      type: "workflow",
      position: { x: 1144, y: 92 },
      data: {
        badge: "Policy + risk checks",
        description: "Human gate only appears on low-confidence or high-risk decisions.",
        eyebrow: "Guardrail",
        kind: "review",
        metrics: [
          { label: "Escalations", value: "8%" },
          { label: "Risk", value: "low" },
        ],
        title: "Approval queue",
        tone: "warning",
      },
    },
    {
      id: "publish",
      type: "workflow",
      position: { x: 1668, y: 92 },
      data: {
        badge: "Slack + email + CRM",
        description: "Commit the response, analytics, and audit trail in one fan-out step.",
        eyebrow: "Delivery",
        kind: "publish",
        metrics: [
          { label: "Fan-out", value: "3 sinks" },
          { label: "Trace", value: "100%" },
        ],
        title: "Publish response",
        tone: "success",
      },
    },
    {
      id: "compliance",
      type: "workflow",
      position: { x: 1144, y: 372 },
      data: {
        badge: "Parallel check",
        description: "A visible side branch samples high-risk answers before delivery.",
        eyebrow: "Branch",
        kind: "review",
        metrics: [
          { label: "Sample", value: "12%" },
          { label: "Queue", value: "4 min" },
        ],
        title: "Compliance branch",
        tone: "warning",
      },
    },
  ];
}

function createWorkflowEdges(): WorkflowEdge[] {
  return [
    {
      id: "e-intake-ai",
      source: "intake",
      target: "ai",
      type: "badge",
      label: "enriched payload",
      ...createEdgePresentation("info"),
      data: { label: "enriched payload", tone: "info" },
    },
    {
      id: "e-ai-review",
      source: "ai",
      target: "review",
      type: "badge",
      label: "needs policy sign-off",
      ...createEdgePresentation("warning"),
      data: { label: "needs policy sign-off", tone: "warning" },
    },
    {
      id: "e-review-publish",
      source: "review",
      target: "publish",
      type: "badge",
      label: "approved",
      ...createEdgePresentation("success"),
      data: { label: "approved", tone: "success" },
    },
    {
      id: "e-review-compliance",
      source: "review",
      target: "compliance",
      type: "badge",
      label: "sample for audit",
      ...createEdgePresentation("warning"),
      data: { label: "sample for audit", tone: "warning" },
    },
    {
      id: "e-compliance-publish",
      source: "compliance",
      target: "publish",
      type: "badge",
      label: "cleared branch",
      ...createEdgePresentation("info"),
      data: { label: "cleared branch", tone: "info" },
    },
  ];
}

function createLayoutNodes(): WorkflowNode[] {
  return [
    {
      id: "capture",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        badge: "Webhook + cron",
        description: "Receive order streams and normalize fields before enrichment starts.",
        eyebrow: "Input",
        kind: "intake",
        title: "Capture events",
        tone: "accent",
      },
    },
    {
      id: "dedupe",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        badge: "Hash + merge",
        description: "Collapse duplicates and preserve latest metadata for every order.",
        eyebrow: "Ops",
        kind: "archive",
        title: "De-duplicate",
        tone: "info",
      },
    },
    {
      id: "score",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        badge: "Rules + ML",
        description: "Score fraud risk, shipping priority, and support urgency in one pass.",
        eyebrow: "Compute",
        kind: "ai",
        metrics: [{ label: "Rules", value: "24" }],
        title: "Score and route",
        tone: "primary",
      },
    },
    {
      id: "manual",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        badge: "Only edge cases",
        description: "Team review stays isolated, so the happy path remains fully automated.",
        eyebrow: "Fallback",
        kind: "review",
        title: "Manual exception queue",
        tone: "warning",
      },
    },
    {
      id: "deliver",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        badge: "Warehouse + CRM",
        description: "Trigger the downstream systems once the route and risk are final.",
        eyebrow: "Output",
        kind: "publish",
        title: "Dispatch actions",
        tone: "success",
      },
    },
  ];
}

function createLayoutEdges(): WorkflowEdge[] {
  return [
    { id: "e-capture-dedupe", source: "capture", target: "dedupe", type: "badge", label: "normalize", ...createEdgePresentation("info"), data: { label: "normalize" } },
    { id: "e-dedupe-score", source: "dedupe", target: "score", type: "badge", label: "scoring batch", ...createEdgePresentation("primary"), data: { label: "scoring batch" } },
    { id: "e-score-deliver", source: "score", target: "deliver", type: "badge", label: "safe route", ...createEdgePresentation("success"), data: { label: "safe route", tone: "success" } },
    { id: "e-score-manual", source: "score", target: "manual", type: "badge", label: "high risk", ...createEdgePresentation("warning"), data: { label: "high risk", tone: "warning" } },
    { id: "e-manual-deliver", source: "manual", target: "deliver", type: "badge", label: "cleared", ...createEdgePresentation("info"), data: { label: "cleared", tone: "info" } },
  ];
}

function createPersistenceNodes(): WorkflowNode[] {
  return [
    {
      id: "brief",
      type: "workflow",
      position: { x: 64, y: 72 },
      data: {
        badge: "PM handoff",
        description: "Keep one durable board for the exact flow product ops approved.",
        eyebrow: "Checkpoint",
        kind: "intake",
        title: "Campaign brief",
        tone: "accent",
      },
    },
    {
      id: "draft",
      type: "workflow",
      position: { x: 640, y: 192 },
      data: {
        badge: "Shared prompt",
        description: "Creative generation stays visible and movable without losing context.",
        eyebrow: "Draft",
        kind: "ai",
        preview: "Hero copy · value props · CTA pairings",
        title: "Draft content",
        tone: "primary",
      },
    },
    {
      id: "handoff",
      type: "workflow",
      position: { x: 1216, y: 72 },
      data: {
        badge: "Design + ads sync",
        description: "Restore exactly where the team left off and continue from the same state.",
        eyebrow: "Handoff",
        kind: "publish",
        title: "Ship assets",
        tone: "success",
      },
    },
  ];
}

function createPersistenceEdges(): WorkflowEdge[] {
  return [
    { id: "e-brief-draft", source: "brief", target: "draft", type: "badge", label: "context pack", ...createEdgePresentation("info"), data: { label: "context pack", tone: "info" } },
    { id: "e-draft-handoff", source: "draft", target: "handoff", type: "badge", label: "approved payload", ...createEdgePresentation("success"), data: { label: "approved payload", tone: "success" } },
  ];
}

function fitAfterFrame(reactFlow: ReturnType<typeof useReactFlow<WorkflowNode, WorkflowEdge>>) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      void reactFlow.fitView({ duration: 320, padding: 0.24 });
    });
  });
}

function WorkflowBuilderScene() {
  const reactFlow = useReactFlow<WorkflowNode, WorkflowEdge>();
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(createWorkflowNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(createWorkflowEdges());
  const [branchCount, setBranchCount] = useState(0);
  const nodesInitialized = useNodesInitialized();
  const didFit = useRef(false);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edgeId = `${connection.source}-${connection.target}-${Date.now()}`;
      setEdges((current) =>
        addEdge(
          {
            ...connection,
            id: edgeId,
            type: "badge",
            label: "new branch",
            ...createEdgePresentation("accent"),
            data: { label: "new branch", tone: "accent" },
          },
          current,
        ),
      );
    },
    [setEdges],
  );

  const isValidConnection = useCallback(
    (candidate: Connection | WorkflowEdge) => {
      if (!candidate.source || !candidate.target || candidate.source === candidate.target) {
        return false;
      }

      const currentNodes = reactFlow.getNodes();
      const currentEdges = reactFlow.getEdges();
      const targetNode = currentNodes.find((node) => node.id === candidate.target);

      if (!targetNode) return false;

      const hasCycle = (node: WorkflowNode, visited = new Set<string>()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, currentNodes, currentEdges)) {
          if (outgoer.id === candidate.source) return true;
          if (hasCycle(outgoer as WorkflowNode, new Set(visited))) return true;
        }

        return false;
      };

      return !hasCycle(targetNode as WorkflowNode);
    },
    [reactFlow],
  );

  const addReviewBranch = useCallback(() => {
    const nextIndex = branchCount + 1;
    const approvalNode = reactFlow.getNode("review");
    const id = `review-branch-${nextIndex}`;
    const position = approvalNode
      ? { x: approvalNode.position.x, y: approvalNode.position.y + 178 + branchCount * 140 }
      : { x: 700, y: 320 + branchCount * 140 };

    setNodes((current) => [
      ...current,
      {
        id,
        type: "workflow",
        position,
        data: {
          badge: "Optional fan-out",
          description: "Secondary reviewer branch created from the main guardrail node.",
          eyebrow: "Branch",
          kind: "review",
          title: `Compliance lane ${nextIndex}`,
          tone: "warning",
        },
      },
    ]);
    setEdges((current) => [
      ...current,
      {
        id: `e-review-${id}`,
        source: "review",
        target: id,
        type: "badge",
        label: "parallel audit",
        ...createEdgePresentation("warning"),
        data: { label: "parallel audit", tone: "warning" },
      },
    ]);
    setBranchCount(nextIndex);
    fitAfterFrame(reactFlow);
  }, [branchCount, reactFlow, setEdges, setNodes]);

  useEffect(() => {
    if (!nodesInitialized || didFit.current) return;
    didFit.current = true;
    fitAfterFrame(reactFlow);
  }, [nodesInitialized, reactFlow]);

  return (
    <div style={demoFrameStyle}>
      <FlowCanvas
        connectionLineStyle={{ stroke: "var(--flow-edge-active)", strokeWidth: 2.75 }}
        edges={edges}
        edgeTypes={edgeTypes}
        isValidConnection={isValidConnection}
        maxZoom={1.05}
        minZoom={0.72}
        nodeTypes={nodeTypes}
        nodes={nodes}
        defaultEdgeOptions={{ animated: true }}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        showMiniMap
      >
        <Panel position="top-right">
          <div style={panelStackStyle}>
            <Button className="nodrag nopan" leftSection={<IconGitBranch {...iconProps} />} size="sm" onClick={addReviewBranch}>
              Add review branch
            </Button>
            <Button className="nodrag nopan" size="sm" variant="outline" onClick={() => fitAfterFrame(reactFlow)}>
              Re-center
            </Button>
          </div>
        </Panel>
      </FlowCanvas>
    </div>
  );
}

function WorkflowBuilderDemo() {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderScene />
    </ReactFlowProvider>
  );
}

function AutoLayoutScene() {
  const reactFlow = useReactFlow<WorkflowNode, WorkflowEdge>();
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(createLayoutNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(createLayoutEdges());
  const nodesInitialized = useNodesInitialized();
  const didInit = useRef(false);

  const runLayout = useCallback(
    async (direction: FlowLayoutDirection) => {
      const next = await layoutElements(nodes, edges, {
        defaultHeight: 154,
        defaultWidth: 304,
        direction,
        spacing: direction === "TB" ? 96 : 180,
      });

      setNodes(next.nodes);
      setEdges(next.edges);
      fitAfterFrame(reactFlow);
    },
    [edges, nodes, reactFlow, setEdges, setNodes],
  );

  useEffect(() => {
    if (!nodesInitialized || didInit.current) return;
    didInit.current = true;
    void runLayout("LR");
  }, [nodesInitialized, runLayout]);

  return (
    <div style={demoFrameStyle}>
      <FlowCanvas
        edges={edges}
        edgeTypes={edgeTypes}
        maxZoom={1.05}
        minZoom={0.72}
        nodeTypes={nodeTypes}
        nodes={nodes}
        defaultEdgeOptions={{ animated: true }}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        showMiniMap
      >
        <Panel position="top-right">
          <div style={panelStackStyle}>
            <Button className="nodrag nopan" size="sm" onClick={() => void runLayout("LR")}>
              Horizontal layout
            </Button>
            <Button className="nodrag nopan" size="sm" variant="outline" onClick={() => void runLayout("TB")}>
              Vertical layout
            </Button>
          </div>
        </Panel>
      </FlowCanvas>
    </div>
  );
}

function AutoLayoutDemo() {
  return (
    <ReactFlowProvider>
      <AutoLayoutScene />
    </ReactFlowProvider>
  );
}

function PersistenceScene() {
  const reactFlow = useReactFlow<WorkflowNode, WorkflowEdge>();
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>(createPersistenceNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>(createPersistenceEdges());
  const nodesInitialized = useNodesInitialized();
  const didFit = useRef(false);
  const persistence = useFlowPersistence<WorkflowNode, WorkflowEdge>({
    setEdges,
    setNodes,
    storageKey: "virtari.docs.react-flow.persistence",
  });

  const reset = useCallback(() => {
    setNodes(createPersistenceNodes());
    setEdges(createPersistenceEdges());
    persistence.clear();
    fitAfterFrame(reactFlow);
  }, [persistence, reactFlow, setEdges, setNodes]);

  useEffect(() => {
    if (!nodesInitialized || didFit.current) return;
    didFit.current = true;
    fitAfterFrame(reactFlow);
  }, [nodesInitialized, reactFlow]);

  return (
    <div style={demoFrameStyle}>
      <FlowCanvas
        edges={edges}
        edgeTypes={edgeTypes}
        maxZoom={1.05}
        minZoom={0.76}
        nodeTypes={nodeTypes}
        nodes={nodes}
        defaultEdgeOptions={{ animated: true }}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <Panel position="top-right">
          <div style={panelStackStyle}>
            <Button className="nodrag nopan" leftSection={<IconDeviceFloppy {...iconProps} />} size="sm" onClick={() => persistence.save()}>
              Save board
            </Button>
            <Button className="nodrag nopan" leftSection={<IconRestore {...iconProps} />} size="sm" variant="outline" onClick={() => void persistence.restore()}>
              Restore snapshot
            </Button>
            <Button className="nodrag nopan" size="sm" variant="ghost" onClick={reset}>
              Reset
            </Button>
          </div>
        </Panel>
      </FlowCanvas>
    </div>
  );
}

function PersistenceDemo() {
  return (
    <ReactFlowProvider>
      <PersistenceScene />
    </ReactFlowProvider>
  );
}

const practices = [
  "Keep `nodeTypes` and `edgeTypes` stable. Define them outside render so React Flow does not recreate graph internals on every state change.",
  "Use `useReactFlow()` for imperative graph queries instead of subscribing hot UI paths to the full node or edge arrays.",
  "Run layout after nodes are measured. `useNodesInitialized()` plus deterministic layering keeps first paint cleaner than guessing dimensions up front.",
  "Validate connections before `addEdge()`. Blocking self-links and cycles should be baseline editor behavior, not an optional enhancement.",
  "Persist both graph state and viewport. `toObject()` plus `setViewport()` avoids handoff bugs where nodes restore but the camera does not.",
  "Mark embedded form controls with `nodrag` and `nopan` so node content remains interactive without breaking canvas drag behavior.",
];

export function FlowPage() {
  const nodeShellCode = useMemo(
    () => `import {
  FlowCanvas,
  FlowHandle,
  FlowNodeBody,
  FlowNodeHeader,
  FlowNodeShell,
  FlowNodeTitle,
  layoutElements,
  useFlowPersistence,
} from "@virtari-packages/react-flow";
import "@virtari-packages/react-flow/tokens";
import "@virtari-packages/react-flow/styles";`,
    [],
  );

  return (
    <>
      <Section
        title="Virtari React Flow"
        description="A first-party workflow surface wired into your tokens, with opinionated node shells, edge badges, layered layout helpers, and persistence utilities."
      >
        <div style={heroStyle}>
          <div style={heroCopyStyle}>
            <h3 style={heroTitleStyle}>What ships in the package</h3>
            <ul style={listStyle}>
              <li>Token-aware <VirtariInlineCode>FlowCanvas</VirtariInlineCode> wrapper with sensible defaults for grid, markers, zoom bounds, and controls.</li>
              <li>Reusable node primitives so app teams can compose real custom nodes with Virtari buttons, badges, inputs, and stats.</li>
              <li>Labeled edges, deterministic layered layout, and a persistence hook for save/restore without custom glue code.</li>
            </ul>
          </div>
          <VirtariCodeBlock renderer="static" language="tsx" code={nodeShellCode} />
        </div>
      </Section>

      <Section
        title="Workflow Builder"
        description="Custom nodes are built from Virtari primitives, the demo starts with a visible branch, connections block cycles, and the editor can fan out into additional approval lanes."
      >
        <WorkflowBuilderDemo />
      </Section>

      <Section
        title="Layered Layout"
        description="The helper produces predictable left-to-right or top-to-bottom graph placement after node measurement, without crashing the route on import-time layout code."
      >
        <AutoLayoutDemo />
      </Section>

      <Section
        title="Persistence + Handoff"
        description="Drag the graph into a useful state, save it, refresh later, and restore the exact board without rebuilding node positions or viewport manually."
      >
        <PersistenceDemo />
      </Section>

      <Section
        title="Best Practices 2026"
        description="These are the decisions the package and the demos are following right now."
      >
        <ul style={listStyle}>
          {practices.map((practice) => (
            <li key={practice}>{practice}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}

const heroStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
  gap: "var(--vds-space-5)",
  alignItems: "start",
};

const heroCopyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--vds-space-3)",
};

const heroTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "var(--vds-text-lg)",
  fontWeight: "var(--vds-font-weight-semibold)",
};

const heroCodeStyle: CSSProperties = {
  margin: 0,
};

const listStyle: CSSProperties = {
  margin: 0,
  paddingInlineStart: "1.125rem",
  display: "grid",
  gap: "var(--vds-space-2)",
};

const demoFrameStyle: CSSProperties = {
  inlineSize: "100%",
  minInlineSize: 0,
  blockSize: "34rem",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  overflow: "hidden",
  boxShadow: "var(--vds-shadow-lg)",
};

const panelStackStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: "var(--vds-space-2)",
  maxInlineSize: "20rem",
};

const headerCopyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  minInlineSize: 0,
};

```
