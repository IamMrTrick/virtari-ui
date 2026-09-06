import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  YooptaEditor,
  STARTER_CONTENT,
  type YooptaContentValue,
} from "@virtari-packages/react-yoopta-editor";
import { Section } from "../components";

export function YooptaEditorPage() {
  const [value, setValue] = useState<YooptaContentValue>(STARTER_CONTENT);

  return (
    <>
      <Section
        title="Overview"
        description="Notion-style block editor — Yoopta-Editor wrapped with Virtari design tokens. Slash menu, floating toolbar with Turn-into menu, drag-and-drop blocks, block options popover, mentions, emoji, math, and 20 block plugins. All chrome reuses the Virtari Button + tokens — no Tailwind, no shadcn."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  YooptaEditor,
  STARTER_CONTENT,
} from "@virtari-packages/react-yoopta-editor";
import "@virtari-packages/react-yoopta-editor/tokens";
import "@virtari-packages/react-yoopta-editor/styles";

<YooptaEditor value={STARTER_CONTENT} onChange={setValue} />`} />
      </Section>

      <Section
        title="Live playground"
        description="Type / to open the slash menu, select text to reveal the floating toolbar, hover any block for the drag handle (⋮⋮) and add-block (+) actions. Mentions: @ for users, # for pages."
      >
        <div
          style={{
            inlineSize: "100%",
            border: "1px solid var(--vds-color-neutral-6)",
            borderRadius: "var(--vds-radius-card)",
            padding: "var(--vds-space-6)",
            minBlockSize: "40rem",
            background: "var(--vds-color-surface)",
          }}
        >
          <YooptaEditor value={value} onChange={setValue} autoFocus />
        </div>
      </Section>

      <Section
        title="Output (JSON)"
        description="The serialized YooptaContentValue you'd persist to a backend."
      >
        <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify(value, null, 2)} maxHeight={"20rem"} />
      </Section>
    </>
  );
}
