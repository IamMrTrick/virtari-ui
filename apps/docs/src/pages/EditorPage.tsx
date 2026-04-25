import { useState } from "react";
import {
  Editor,
  EditorField,
  type EditorChangePayload,
} from "@virtari-packages/react-editor";
import {
  EditorComposer,
  EditorSurface,
} from "@virtari-packages/react-editor/core";
import { Section } from "../components";

const INITIAL_MARKDOWN = `# Launch Brief

The editor chrome now follows the Lexical playground interaction model while keeping Virtari tokens for color, radius, spacing, and controls.

## Scope

- Drag these blocks from the left gutter
- Insert headings, lists, code, tables, and dividers from the plus button
- Select any phrase to use the floating toolbar
- Switch rich text, markdown, and HTML without losing state

> Keep the base composer lean. The playground-style layer should stay opt-in through the pro preset.

## Release checklist

- [ ] Polish block drag handles
- [ ] Check insert menu sizing
- [ ] Verify source-mode serialization

\`\`\`ts
const editorPreset = "pro";
const dragBehavior = "lexical-playground";
\`\`\`

---

Add a table from the insert menu, then drag this paragraph above the checklist to verify the drop indicator.
`;

const CORE_HTML =
  "<h2>Core preset</h2><p>This surface keeps Lexical lean. No toolbar, no slash menu, no tables. You decide what to bolt on.</p>";

const BLOCK_TOOLS_MARKDOWN = `## Drag tools

Hover these rows to compare the plus and drag-handle placement.

- The drop line should stay strong and easy to read.
- The block controls should not push the text column around.`;

function OutputPanel({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--vds-space-2)",
      }}
    >
      <strong>{title}</strong>
      <pre
        className="docs-code"
        style={{
          margin: 0,
          maxBlockSize: "18rem",
          overflow: "auto",
        }}
      >
        {value || "-"}
      </pre>
    </div>
  );
}

export function EditorPage() {
  const [payload, setPayload] = useState<EditorChangePayload | null>(null);

  return (
    <>
      <Section
        title="Overview"
        description={
          '`preset="core"` gives you the lean Lexical shell. `preset="pro"` layers the Virtari toolbar, insert menu, floating selection bar, draggable block handles, slash menu, markdown/html source switching, tables, auto-links, markdown shortcuts, and serialization hooks on top.'
        }
      >
        <pre className="docs-code">{`import {
  Editor
} from "@virtari-packages/react-editor";
import {
  EditorComposer,
  EditorSurface,
} from "@virtari-packages/react-editor/core";

// Full editor
<Editor
  preset="pro"
  features={{ draggableBlocks: true, horizontalRule: true }}
/>

// Lean editor shell
<EditorComposer preset="core">
  <div className="vds-editor">
    <EditorSurface aria-label="Core editor" />
  </div>
</EditorComposer>`}</pre>
      </Section>

      <Section
        title="Pro preset"
        description="This is the opinionated design-system version: insert menu, floating text toolbar, drag handles, markdown/html source switching, slash menu, tables, checklist support, markdown shortcuts, character limit, and a live status bar."
      >
        <div
          style={{
            display: "grid",
            gap: "var(--vds-space-4)",
            maxInlineSize: "70rem",
          }}
        >
          <Editor
            preset="pro"
            initialValue={INITIAL_MARKDOWN}
            initialValueFormat="markdown"
            onChange={setPayload}
            minHeight="18rem"
            features={{
              tables: true,
              horizontalRule: true,
              draggableBlocks: true,
              tabIndentation: true,
              characterLimit: {
                maxLength: 1800,
                charset: "UTF-16",
              },
            }}
            blockTools={{ placement: "edge" }}
            aria-label="Pro rich text editor"
          />

          <div
            style={{
              display: "grid",
              gap: "var(--vds-space-4)",
              gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            }}
          >
            <OutputPanel title="Markdown" value={payload?.markdown ?? ""} />
            <OutputPanel title="HTML" value={payload?.html ?? ""} />
            <OutputPanel
              title="JSON"
              value={payload?.json ? JSON.stringify(payload.json, null, 2) : ""}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Block tools placement"
        description="The same draggable block layer supports an edge gutter mode and a fully inside mode."
      >
        <div
          style={{
            display: "grid",
            gap: "var(--vds-space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
            maxInlineSize: "70rem",
          }}
        >
          <Editor
            preset="pro"
            toolbar={false}
            insertMenu={false}
            statusBar={false}
            floatingToolbar={false}
            modeSwitcher={false}
            slashMenu={false}
            initialValue={BLOCK_TOOLS_MARKDOWN}
            initialValueFormat="markdown"
            minHeight="12rem"
            features={{
              draggableBlocks: true,
              horizontalRule: true,
            }}
            blockTools={{ placement: "edge" }}
            aria-label="Edge block tools editor"
          />

          <Editor
            preset="pro"
            toolbar={false}
            insertMenu={false}
            statusBar={false}
            floatingToolbar={false}
            modeSwitcher={false}
            slashMenu={false}
            initialValue={BLOCK_TOOLS_MARKDOWN}
            initialValueFormat="markdown"
            minHeight="12rem"
            features={{
              draggableBlocks: true,
              horizontalRule: true,
            }}
            blockTools={{ placement: "inside" }}
            aria-label="Inside block tools editor"
          />
        </div>
      </Section>

      <Section
        title="Core preset"
        description="Projects that do not need the full playground-style layer can stay closer to bare Lexical. Here the shell is yours; only the composer and surface come from the package, and source switching / floating UI / draggable blocks stay out."
      >
        <div className="vds-editor">
          <EditorComposer
            preset="core"
            initialValue={CORE_HTML}
            initialValueFormat="html"
            features={{
              autoLinks: false,
              checklists: false,
              markdownShortcuts: false,
              tables: false,
              tabIndentation: false,
            }}
          >
            <EditorSurface
              aria-label="Core editor example"
              minHeight="12rem"
              placeholder="Lean composition surface..."
            />
          </EditorComposer>
        </div>
      </Section>

      <Section
        title="Field integration"
        description="Use `EditorField` when the editor needs the same label / description / error / counter ergonomics as the rest of the form controls."
      >
        <div style={{ maxInlineSize: "44rem" }}>
          <EditorField
            preset="pro"
            label="Release notes"
            description="Write the customer-facing summary for this version."
            counter="Markdown + HTML + JSON all stay available in onChange."
            initialValue={`## Highlights\n\n- New editor package\n- Core and pro presets\n- Token-driven chrome`}
            initialValueFormat="markdown"
            minHeight="14rem"
            aria-label="Release notes editor"
          />
        </div>
      </Section>
    </>
  );
}
