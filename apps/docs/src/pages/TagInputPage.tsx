import { useState } from "react";
import { TagInput } from "@virtari-packages/react-tag-input";
import "@virtari-packages/react-tag-input/styles";
import "@virtari-packages/react-tag-input/tokens";
import { Label } from "@virtari-packages/react-label";
import { Section, Row } from "../components";

export function TagInputPage() {
  const [tags, setTags] = useState(["design", "system", "react"]);
  const [emailTags, setEmailTags] = useState<string[]>([]);
  const [limitedTags, setLimitedTags] = useState(["apple", "banana"]);

  return (
    <>
      <Section title="Default" description="Press Enter or comma to add a tag. Backspace removes the last tag.">
        <div style={{ maxWidth: "28rem" }}>
          <Label>Topics</Label>
          <TagInput
            value={tags}
            onChange={setTags}
            placeholder="Add tag…"
            style={{ marginBlockStart: "var(--vds-space-1)" }}
          />
          <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)", marginBlockStart: "var(--vds-space-1)" }}>
            Tags: {tags.join(", ") || "none"}
          </p>
        </div>
      </Section>

      <Section title="Email validation" description="Custom validate function rejects invalid emails.">
        <div style={{ maxWidth: "28rem" }}>
          <Label>Recipients</Label>
          <TagInput
            value={emailTags}
            onChange={setEmailTags}
            placeholder="email@example.com"
            validate={(tag) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)}
            style={{ marginBlockStart: "var(--vds-space-1)" }}
          />
        </div>
      </Section>

      <Section title="Max tags" description="Hides input once limit is reached.">
        <div style={{ maxWidth: "28rem" }}>
          <Label>Fruits (max 3)</Label>
          <TagInput
            value={limitedTags}
            onChange={setLimitedTags}
            maxTags={3}
            placeholder="Add fruit…"
            style={{ marginBlockStart: "var(--vds-space-1)" }}
          />
        </div>
      </Section>

      <Section title="Sizes" description="sm, md (default), lg.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxWidth: "28rem" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size}>
              <Label style={{ marginBlockEnd: "var(--vds-space-1)" }}>Size {size}</Label>
              <TagInput
                value={["one", "two"]}
                onChange={() => {}}
                size={size}
                placeholder={`${size} size…`}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Disabled">
        <div style={{ maxWidth: "28rem" }}>
          <TagInput
            value={["locked", "read-only"]}
            onChange={() => {}}
            disabled
          />
        </div>
      </Section>

      <Section title="Invalid">
        <div style={{ maxWidth: "28rem" }}>
          <TagInput
            value={["error"]}
            onChange={() => {}}
            invalid
            placeholder="Fix the error…"
          />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { TagInput } from "@virtari-packages/react-tag-input";
import "@virtari-packages/react-tag-input/styles";

const [tags, setTags] = useState(["react", "design"]);

<TagInput
  value={tags}
  onChange={setTags}
  placeholder="Add tag…"
  maxTags={10}
  allowDuplicates={false}
  delimiters={[","]}
  size="md"
  invalid={false}
  disabled={false}
/>`}</pre>
      </Section>
    </>
  );
}
