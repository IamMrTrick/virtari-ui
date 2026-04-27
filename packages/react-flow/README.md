# @virtari-packages/react-flow

Token-aware React Flow primitives for Virtari workflow builders.

## Install

```bash
pnpm add @xyflow/react elkjs @virtari-packages/react-flow
```

## Usage

```tsx
import {
  FlowCanvas,
  FlowNodeShell,
  FlowNodeHeader,
  FlowNodeBody,
  FlowNodeTitle,
  FlowHandle,
} from "@virtari-packages/react-flow";
import "@virtari-packages/react-flow/tokens";
import "@virtari-packages/react-flow/styles";
```

Use custom nodes owned by your app, keep `nodeTypes` and `edgeTypes` stable, and prefer `layoutElements` for non-trivial graph layout.
