import { useMemo, useState } from "react";
import {
  CodeBlock,
  CodeEditor,
  InlineCode,
  type CodeBlockSize,
  type CodeBlockVariant,
  type CodeLanguage,
} from "@virtari-packages/react-code";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import { Card } from "@virtari-packages/react-card";
import { Section, Row } from "../components";

/* ─────────────────────────────── Sample code snippets ─────────────────────────────── */

const TS_SNIPPET = `import { Badge } from "@virtari-packages/react-badge";

export function StatusBadge({ status }: { status: "active" | "draft" }) {
  // Pick a color that maps to the status
  const color = status === "active" ? "success" : "neutral";
  return <Badge color={color} variant="soft">{status}</Badge>;
}
`;

const CSS_SNIPPET = `@layer design-system.components {
  .vds-card {
    --card-padding: var(--vds-space-4);
    --card-radius: var(--vds-radius-card);
    background: var(--vds-color-surface);
    border-radius: var(--card-radius);
    padding: var(--card-padding);
  }
}
`;

const HTML_SNIPPET = `<button class="vds-button" data-variant="solid" data-size="md">
  <span class="vds-button-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg>
  </span>
  Save changes
</button>
`;

const JSON_SNIPPET = `{
  "name": "@virtari-packages/react-code",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./styles": "./dist/Code.css"
  }
}
`;

const MD_SNIPPET = `# Virtari Code

> One-stop component for **viewing**, **editing**, and **inline** code.

- 15 preloaded grammars
- Token-driven theming
- Lazy-loadable extras

\`\`\`ts
import { CodeBlock } from "@virtari-packages/react-code";
\`\`\`
`;

const PYTHON_SNIPPET = `from dataclasses import dataclass
from typing import Iterable

@dataclass
class Token:
    name: str
    weight: float

def average_weight(tokens: Iterable[Token]) -> float:
    return sum(t.weight for t in tokens) / max(len(list(tokens)), 1)
`;

const GO_SNIPPET = `package main

import "fmt"

type Server struct {
    Host string
    Port int
}

func (s *Server) Address() string {
    return fmt.Sprintf("%s:%d", s.Host, s.Port)
}

func main() {
    s := &Server{Host: "127.0.0.1", Port: 8080}
    fmt.Println(s.Address())
}
`;

const RUST_SNIPPET = `use std::collections::HashMap;

fn main() {
    let mut counts: HashMap<&str, i32> = HashMap::new();
    for word in "the quick brown fox the lazy dog".split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }
    println!("{:?}", counts);
}
`;

const SQL_SNIPPET = `SELECT u.id, u.name, COUNT(o.id) AS orders
FROM   users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE  u.status = 'active'
GROUP BY u.id, u.name
ORDER BY orders DESC
LIMIT  10;
`;

const YAML_SNIPPET = `name: build
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm test
`;

const DIFF_SNIPPET = `  function greet(name: string) {
-   return "Hello " + name;
+   return \`Hello, \${name}!\`;
  }

- const x = 1;
+ const x = 2;
+ const y = x * 3;
`;

const LONG_SNIPPET = `import { CodeBlock } from "@virtari-packages/react-code";

const longLine = "This is an intentionally extremely long single line of code that should demonstrate how the soft-wrap toggle changes the visual layout of the editor when wrapping is enabled vs when horizontal scrolling kicks in";

export function Demo() {
  return (
    <CodeBlock
      language="typescript"
      code={longLine}
      wrap={false}
    />
  );
}
`;

const SCROLL_SNIPPET = Array.from({ length: 60 }, (_, i) => `// line ${i + 1}: console.log(${i + 1});`).join("\n");

const EDITOR_INITIAL = `// Try typing here. Cmd/Ctrl+F opens search. Alt+Click for multi-cursor.
function add(a: number, b: number) {
  return a + b;
}

console.log(add(2, 3));
`;

const LANGUAGE_OPTIONS: { value: CodeLanguage; label: string; sample: string }[] = [
  { value: "typescript", label: "TypeScript", sample: TS_SNIPPET },
  { value: "javascript", label: "JavaScript", sample: TS_SNIPPET.replace(/: \w+/g, "") },
  { value: "css", label: "CSS", sample: CSS_SNIPPET },
  { value: "html", label: "HTML", sample: HTML_SNIPPET },
  { value: "json", label: "JSON", sample: JSON_SNIPPET },
  { value: "markdown", label: "Markdown", sample: MD_SNIPPET },
  { value: "python", label: "Python", sample: PYTHON_SNIPPET },
  { value: "go", label: "Go", sample: GO_SNIPPET },
  { value: "rust", label: "Rust", sample: RUST_SNIPPET },
  { value: "sql", label: "SQL", sample: SQL_SNIPPET },
  { value: "yaml", label: "YAML", sample: YAML_SNIPPET },
];

const VARIANTS: CodeBlockVariant[] = ["card", "minimal", "embedded"];
const SIZES: CodeBlockSize[] = ["sm", "md", "lg"];

/* ─────────────────────────────── Local helpers ─────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-sm)",
        color: "var(--vds-color-text)",
      }}
    >
      <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{label}</span>
      {children}
    </label>
  );
}

function SwitchRow({
  title,
  hint,
  checked,
  onCheckedChange,
}: {
  title: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-4)",
        fontSize: "var(--vds-text-sm)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{title}</span>
        {hint && (
          <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
            {hint}
          </span>
        )}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function CodePage() {
  /* Languages gallery picker */
  const [galleryLang, setGalleryLang] = useState<CodeLanguage>("typescript");
  const gallerySample = useMemo(
    () => LANGUAGE_OPTIONS.find((o) => o.value === galleryLang)?.sample ?? TS_SNIPPET,
    [galleryLang],
  );

  /* Live editor controls */
  const [editorValue, setEditorValue] = useState(EDITOR_INITIAL);
  const [editorLang, setEditorLang] = useState<CodeLanguage>("typescript");
  const [editorReadOnly, setEditorReadOnly] = useState(false);
  const [editorWrap, setEditorWrap] = useState(false);
  const [editorLineNumbers, setEditorLineNumbers] = useState(true);

  return (
    <div className="docs-page">
      {/* ─────────────── 1. Overview ─────────────── */}
      <Section
        title="Overview"
        description="Three components in one package — CodeBlock for read-only viewing, CodeEditor for live editing, InlineCode for prose. All powered by CodeMirror 6 (MIT) with token-driven theming so colors, radius, spacing, and typography stay in sync with the rest of the design system."
      >
        <CodeBlock
          language="typescript"
          filename="App.tsx"
          showLineNumbers
          code={`import {
  CodeBlock,
  CodeEditor,
  InlineCode,
} from "@virtari-packages/react-code";

// Read-only viewer
<CodeBlock language="typescript" code={snippet} />

// Live editor
<CodeEditor value={value} onValueChange={setValue} language="javascript" />

// Inline snippet — use the <InlineCode>asChild</InlineCode> prop
`}
        />
      </Section>

      {/* ─────────────── 2. Languages gallery ─────────────── */}
      <Section
        title="Languages"
        description="15 grammars are preloaded out of the box. Switch between them to see syntax tokens map to Virtari intent palette."
      >
        <Row>
          <Field label="Language">
            <Select value={galleryLang} onValueChange={(v) => setGalleryLang(v as CodeLanguage)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Row>
        <CodeBlock
          language={galleryLang}
          filename={`example.${galleryLang}`}
          showLineNumbers
          code={gallerySample}
        />
      </Section>

      {/* ─────────────── 3. Sizes ─────────────── */}
      <Section
        title="Sizes"
        description="Three size presets adjust font size, padding, and line height proportionally."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-4)" }}>
          {SIZES.map((size) => (
            <CodeBlock
              key={size}
              size={size}
              language="typescript"
              filename={`Size: ${size}`}
              code={TS_SNIPPET}
            />
          ))}
        </div>
      </Section>

      {/* ─────────────── 4. Variants ─────────────── */}
      <Section
        title="Variants"
        description="`card` — full chrome with border. `minimal` — chromeless, transparent background. `embedded` — no radius, drop into nested containers."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-4)" }}>
          {VARIANTS.map((variant) => (
            <CodeBlock
              key={variant}
              variant={variant}
              language="typescript"
              filename={variant === "card" ? "Card variant" : variant === "minimal" ? "Minimal variant" : "Embedded variant"}
              code={TS_SNIPPET}
              copyable={variant !== "minimal"}
            />
          ))}
        </div>
      </Section>

      {/* ─────────────── 5. Line numbers + highlighting ─────────────── */}
      <Section
        title="Line numbers & line highlighting"
        description="Toggle the gutter and pass a list of 1-indexed line numbers to highlight."
      >
        <CodeBlock
          language="typescript"
          filename="Highlight lines 3, 5, 6"
          showLineNumbers
          highlightLines={[3, 5, 6]}
          code={TS_SNIPPET}
        />
      </Section>

      {/* ─────────────── 6. Diff view ─────────────── */}
      <Section
        title="Unified diff"
        description="Lines beginning with + are tinted with success-soft and prefixed with a green marker; lines beginning with - get danger-soft and a red marker."
      >
        <CodeBlock
          language="typescript"
          filename="changes.diff"
          showLineNumbers
          diff="unified"
          code={DIFF_SNIPPET}
        />
      </Section>

      {/* ─────────────── 7. Header + copy ─────────────── */}
      <Section
        title="Filename header & copy button"
        description="The header shows a filename when given; the language slug is shown otherwise. The copy button reuses the design system's CopyButton component."
      >
        <Row>
          <CodeBlock
            language="json"
            filename="package.json"
            code={JSON_SNIPPET}
          />
        </Row>
      </Section>

      {/* ─────────────── 8. Word wrap ─────────────── */}
      <Section
        title="Word wrap"
        description="When `wrap` is on, long lines break visually instead of triggering horizontal scroll."
      >
        <Row>
          <Field label="Wrap demo (off)">
            <CodeBlock language="typescript" code={LONG_SNIPPET} wrap={false} />
          </Field>
        </Row>
        <Row>
          <Field label="Wrap demo (on)">
            <CodeBlock language="typescript" code={LONG_SNIPPET} wrap />
          </Field>
        </Row>
      </Section>

      {/* ─────────────── 9. Max height ─────────────── */}
      <Section
        title="Max height"
        description="Caps the body and adds a vertical scrollbar styled to match the design system."
      >
        <CodeBlock
          language="javascript"
          filename="long-file.js"
          showLineNumbers
          maxHeight={240}
          code={SCROLL_SNIPPET}
          caption="Body capped at 240px — scroll vertically to explore the rest."
        />
      </Section>

      {/* ─────────────── 10. Live editor ─────────────── */}
      <Section
        title="Live editor"
        description="Controlled <CodeEditor> with full CM6 features: history (Cmd/Ctrl+Z), multi-cursor (Alt+Click), search panel (Cmd/Ctrl+F), bracket matching, autocomplete."
      >
        <Row>
          <Field label="Language">
            <Select value={editorLang} onValueChange={(v) => setEditorLang(v as CodeLanguage)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <SwitchRow
            title="Read-only"
            hint="Toggle live to compare with viewer."
            checked={editorReadOnly}
            onCheckedChange={setEditorReadOnly}
          />
          <SwitchRow
            title="Line numbers"
            checked={editorLineNumbers}
            onCheckedChange={setEditorLineNumbers}
          />
          <SwitchRow
            title="Soft wrap"
            checked={editorWrap}
            onCheckedChange={setEditorWrap}
          />
        </Row>
        <CodeEditor
          value={editorValue}
          onValueChange={setEditorValue}
          language={editorLang}
          filename={`playground.${editorLang}`}
          showLineNumbers={editorLineNumbers}
          wrap={editorWrap}
          readOnly={editorReadOnly}
          minLines={8}
          maxLines={20}
        />
      </Section>

      {/* ─────────────── 11. Inline code ─────────────── */}
      <Section
        title="Inline code"
        description="Drop short snippets into prose. Three color variants: neutral (default), primary, accent."
      >
        <p style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text)", lineHeight: 1.7, maxInlineSize: "60ch" }}>
          Use the <InlineCode>asChild</InlineCode> prop to render any
          component as a polymorphic slot. To highlight an important
          identifier inline, choose <InlineCode color="primary">color=&quot;primary&quot;</InlineCode>;
          for a warmer accent, use <InlineCode color="accent">color=&quot;accent&quot;</InlineCode>.
          The component renders a semantic <InlineCode>&lt;code&gt;</InlineCode> element with no JS overhead.
        </p>
      </Section>

      {/* ─────────────── 12. In context ─────────────── */}
      <Section
        title="In context — embedded inside a Card"
        description="The `embedded` variant strips border-radius so a code block can drop cleanly inside a surface that already has rounded corners."
      >
        <Card>
          <div style={{ padding: "var(--vds-space-4)", display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
            <h3 style={{ margin: 0, fontSize: "var(--vds-text-base)", fontWeight: "var(--vds-font-weight-semibold)" }}>
              How to use it
            </h3>
            <p style={{ margin: 0, fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              Install the package and import the styles once at app root.
            </p>
          </div>
          <CodeBlock
            language="bash"
            variant="embedded"
            code={`pnpm add @virtari-packages/react-code\n# then import in your global CSS:\n# @import "@virtari-packages/react-code/styles";`}
            copyable
          />
        </Card>
      </Section>
    </div>
  );
}
