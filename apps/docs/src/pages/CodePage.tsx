import { useId, useMemo, useState } from "react";
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
import { Card, CardHeader, CardTitle, CardDescription } from "@virtari-packages/react-card";
import { Field } from "@virtari-packages/react-fieldset";
import { Stack } from "@virtari-packages/react-layout";
import { Text } from "@virtari-packages/react-text";
import { Section, Row } from "../components";

/* ─────────────────────────────── Sample code snippets ─────────────────────────────── */

const TS_SNIPPET = `import { Badge } from "@virtari-packages/react-badge";

export function StatusBadge({ status }: { status: "active" | "draft" }) {
  // Pick a color that maps to the status
  const color = status === "active" ? "success" : "neutral";
  return <Badge color={color} variant="soft">{status}</Badge>;
}
`;

const CSS_SNIPPET = `@import "@virtari-packages/core";
@import "@virtari-packages/tokens";
@import "@virtari-packages/react-code/styles";

/* Optional application scope; package defaults already supply the surface. */
.source-preview {
  --vds-code-font-size: var(--vds-text-sm);
  --vds-code-padding-inline: var(--vds-space-4);
}
`;

const HTML_SNIPPET = `<!-- Semantic application content. Use Virtari React packages for controls. -->
<main aria-labelledby="page-title">
  <h1 id="page-title">Project source</h1>
  <p>Review the example, then copy the complete source.</p>
</main>
`;

const JSON_SNIPPET = `{
  "name": "@virtari-packages/react-code",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./styles": "./dist/Code.css"
  }
}
`;

const MD_SNIPPET = `# Virtari Code

> One-stop component for **viewing**, **editing**, and **inline** code.

- Preloaded language grammars
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
    values = list(tokens)
    return sum(t.weight for t in values) / max(len(values), 1)
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
          renderer="static"
      language="tsx"
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
  { value: "tsx", label: "TypeScript + JSX", sample: TS_SNIPPET },
  { value: "jsx", label: "JavaScript + JSX", sample: `import { Button } from "@virtari-packages/react-button";

export function SaveAction() {
  return <Button type="button">Save changes</Button>;
}` },
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
  const id = useId();
  return <Field label={title} description={hint} controlId={id}>
    <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
  </Field>;
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function CodePage() {
  /* Languages gallery picker */
  const [galleryLang, setGalleryLang] = useState<CodeLanguage>("tsx");
  const gallerySample = useMemo(
    () => LANGUAGE_OPTIONS.find((o) => o.value === galleryLang)?.sample ?? TS_SNIPPET,
    [galleryLang],
  );

  /* Live editor controls */
  const [editorValue, setEditorValue] = useState(EDITOR_INITIAL);
  const [editorLang, setEditorLang] = useState<CodeLanguage>("tsx");
  const [editorReadOnly, setEditorReadOnly] = useState(false);
  const [editorWrap, setEditorWrap] = useState(false);
  const [editorLineNumbers, setEditorLineNumbers] = useState(true);

  return (
    <div className="docs-page">
      {/* ─────────────── 1. Overview ─────────────── */}
      <Section
        title="Overview"
        description="Three components in one package — CodeBlock for read-only viewing, CodeEditor for live editing, InlineCode for prose. Static blocks share the editor syntax palette without mounting editable surfaces. Choose renderer=editor for a virtualized read-only viewer of very large files."
      >
        <CodeBlock
          renderer="static"
          language="tsx"
          filename="App.tsx"
          showLineNumbers
          code={`import {
  CodeBlock,
  CodeEditor,
  InlineCode,
} from "@virtari-packages/react-code";

// Read-only viewer
<CodeBlock renderer="static" language="tsx" code={snippet} />

// Live editor
<CodeEditor value={value} onValueChange={setValue} language="javascript" />

// Inline code renders a semantic code element
<InlineCode>name</InlineCode>
`}
        />
      </Section>

      {/* ─────────────── 2. Languages gallery ─────────────── */}
      <Section
        title="Languages"
        description="JavaScript, TypeScript, JSX/TSX, CSS, HTML, JSON, Markdown, Python, Go, Rust, SQL, YAML and XML have preloaded syntax support. Shell and unknown languages remain readable plain text."
      >
        <Row>
          <Field label="Language" controlId="code-gallery-language">
            <Select value={galleryLang} onValueChange={(v) => setGalleryLang(v as CodeLanguage)}>
              <SelectTrigger id="code-gallery-language"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Row>
        <CodeBlock
          renderer="static"
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
        <Stack gap="md">
          {SIZES.map((size) => (
            <CodeBlock
          renderer="static"
              key={size}
              size={size}
              language="tsx"
              filename={`Size: ${size}`}
              code={TS_SNIPPET}
            />
          ))}
        </Stack>
      </Section>

      {/* ─────────────── 4. Variants ─────────────── */}
      <Section
        title="Variants"
        description="`card` — full chrome with border. `minimal` — chromeless, transparent background. `embedded` — no radius, drop into nested containers."
      >
        <Stack gap="md">
          {VARIANTS.map((variant) => (
            <CodeBlock
          renderer="static"
              key={variant}
              variant={variant}
              language="tsx"
              filename={variant === "card" ? "Card variant" : variant === "minimal" ? "Minimal variant" : "Embedded variant"}
              code={TS_SNIPPET}
              copyable={variant !== "minimal"}
            />
          ))}
        </Stack>
      </Section>

      {/* ─────────────── 5. Line numbers + highlighting ─────────────── */}
      <Section
        title="Line numbers & line highlighting"
        description="Toggle the gutter and pass a list of 1-indexed line numbers to highlight."
      >
        <CodeBlock
          renderer="static"
          language="tsx"
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
          renderer="static"
          language="tsx"
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
          renderer="static"
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
          <Stack gap="sm"><Text size="2">Wrap demo (off)</Text>
            <CodeBlock renderer="static" language="tsx" code={LONG_SNIPPET} wrap={false} />
          </Stack>
        </Row>
        <Row>
          <Stack gap="sm"><Text size="2">Wrap demo (on)</Text>
            <CodeBlock renderer="static" language="tsx" code={LONG_SNIPPET} wrap />
          </Stack>
        </Row>
      </Section>

      {/* ─────────────── 9. Max height ─────────────── */}
      <Section
        title="Max height"
        description="Caps the body and adds a vertical scrollbar styled to match the design system."
      >
        <CodeBlock
          renderer="static"
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
          <Field label="Language" controlId="code-editor-language">
            <Select value={editorLang} onValueChange={(v) => setEditorLang(v as CodeLanguage)}>
              <SelectTrigger id="code-editor-language"><SelectValue /></SelectTrigger>
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
          editorLabel="Live source playground"
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
        <Text as="p" size="2">
          Use <InlineCode>InlineCode</InlineCode> for short identifiers in prose. To highlight an important
          identifier inline, choose <InlineCode color="primary">color=&quot;primary&quot;</InlineCode>;
          for a warmer accent, use <InlineCode color="accent">color=&quot;accent&quot;</InlineCode>.
          The component renders a semantic <InlineCode>&lt;code&gt;</InlineCode> element with no JS overhead.
        </Text>
      </Section>

      {/* ─────────────── 12. In context ─────────────── */}
      <Section
        title="In context — embedded inside a Card"
        description="The `embedded` variant strips border-radius so a code block can drop cleanly inside a surface that already has rounded corners."
      >
        <Card>
          <CardHeader>
            <CardTitle>How to use it</CardTitle>
            <CardDescription>Import core, tokens and the exported package styles at the application root.</CardDescription>
          </CardHeader>
          <CodeBlock
          renderer="static"
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
