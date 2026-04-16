import { ScrollArea } from "@virtari/react-scroll-area";
import { Section, Row } from "../components";

export function ScrollAreaPage() {
  return (
    <>
      <Section title="Vertical Scroll" description="A scroll area with overflowing vertical content.">
        <ScrollArea style={{ height: "200px", width: "300px", borderRadius: "var(--vds-radius-md)", border: "1px solid var(--vds-color-border)" }}>
          <div style={{ padding: "var(--vds-space-4)" }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ margin: "0 0 var(--vds-space-2)" }}>
                Item {i + 1} — Lorem ipsum dolor sit amet
              </p>
            ))}
          </div>
        </ScrollArea>
      </Section>

      <Section title="Horizontal Scroll" description="A scroll area with overflowing horizontal content.">
        <ScrollArea style={{ width: "400px", borderRadius: "var(--vds-radius-md)", border: "1px solid var(--vds-color-border)" }}>
          <div style={{ display: "flex", gap: "var(--vds-space-3)", padding: "var(--vds-space-4)", width: "max-content" }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: "100px",
                  height: "80px",
                  borderRadius: "var(--vds-radius-md)",
                  background: "var(--vds-color-surface-2, #e5e5e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { ScrollArea } from "@virtari/react-scroll-area";

<ScrollArea style={{ height: 200 }}>
  {/* Overflowing content */}
</ScrollArea>`}</pre>
      </Section>
    </>
  );
}
