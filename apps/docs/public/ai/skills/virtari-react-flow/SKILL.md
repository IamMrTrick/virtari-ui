---
name: virtari-react-flow
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-flow. React Flow canvas wrapper, node shells, badge edges, simple layered layout and browser persistence helpers."
---

# @virtari-packages/react-flow

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-flow`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Install the @xyflow/react peer and import its ReactFlowProvider, node/edge state helpers and engine APIs directly when needed; Virtari does not re-export the complete engine. Load the Virtari /styles entry, which imports the engine CSS and Flow tokens.
- FlowCanvas extends ReactFlowProps and forwards engine state/callbacks. Place it in a container with definite dimensions. Compose custom nodes from FlowNodeShell, Header, Body, Footer and text/stat/action parts, plus FlowHandle.
- Defaults include fitView, a 24-by-24 snap grid, zoom range 0.72 to 1.2, and disabled wheel and double-click zoom. Override these explicitly when a workflow needs other navigation behavior; showControls, showMiniMap and showBackground only govern built-in visual helpers.
- Register FlowBadgeEdge in edgeTypes under the chosen edge type and pass data.label/data.tone. Keep nodeTypes and edgeTypes references stable between renders. Custom node controls must use the engine's nodrag/nopan conventions when they should not move the canvas.
- layoutElements returns a promise of nodes and edges, with direction='TB|BT|LR|RL' and measured dimensions or defaultWidth/defaultHeight. Apply returned node positions to state after measurement and then fit the viewport; the helper does not update React state itself.
- Call useFlowPersistence under ReactFlowProvider, supplying setNodes, setEdges and storageKey. save/restore/clear operate on the engine snapshot and viewport in localStorage. Use a distinct key for each graph and catch storage/parse failures at the application boundary.

## Known limits and mistakes to avoid

- Automatic colorMode watches only document.documentElement's data-theme and treats everything except light as dark. For a scoped light/dark preview, pass colorMode explicitly; it does not discover the nearest theme scope.
- FlowBadgeEdge currently uses fixed hexadecimal strokes and fixed path geometry in JavaScript. Its colors are not fully governed by semantic tokens, even though the node shells and label styles use token roles.
- layoutElements is a simple layered placement helper, not a graph optimization or edge-routing engine. Cyclic or unresolved nodes are assigned fallback levels; it does not promise minimal crossings or polished layout for arbitrary graphs.
- useFlowPersistence does not validate the parsed snapshot, catch JSON/storage errors, migrate schemas, or synchronize to a server. Browser storage being present does not guarantee writes are permitted.
- No dedicated SSR adapter is supplied. Test actual canvas measurement and provider initialization at the consuming framework's client boundary.

Related package IDs: `react-card`, `react-button`, `react-icons`, `react-layout`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
