# @virtari-packages/react-yoopta-editor

Virtari block editor - a [Yoopta-Editor](https://yoopta.dev) wrapper that binds the editor to Virtari design tokens and reuses existing Virtari primitives (`react-button`, `react-popover`, `react-tooltip`, `react-dropdown-menu`, `react-input`) for all chrome.

## Installation

```bash
pnpm add @virtari-packages/react-yoopta-editor
```

## Usage

```tsx
"use client";

import { useMemo, useState } from "react";
import {
  YooptaEditor,
  type YooptaContentValue,
} from "@virtari-packages/react-yoopta-editor";
import "@virtari-packages/react-yoopta-editor/tokens";
import "@virtari-packages/react-yoopta-editor/styles";

export function MyPage() {
  const [value, setValue] = useState<YooptaContentValue>({});
  return <YooptaEditor value={value} onChange={setValue} />;
}
```
