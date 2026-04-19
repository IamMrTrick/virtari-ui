import { Kbd } from "@virtari-packages/react-kbd";
import { Section, Row } from "../components";

export function KbdPage() {
  return (
    <>
      <Section title="Single Keys" description="Individual keyboard keys.">
        <Row>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
        </Row>
      </Section>

      <Section title="Keyboard Shortcuts" description="Common key combinations.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Copy</span>
            <span><Kbd>Ctrl</Kbd> + <Kbd>C</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Paste</span>
            <span><Kbd>Ctrl</Kbd> + <Kbd>V</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Undo</span>
            <span><Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Save</span>
            <span><Kbd>Ctrl</Kbd> + <Kbd>S</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Select All</span>
            <span><Kbd>Ctrl</Kbd> + <Kbd>A</Kbd></span>
          </div>
        </div>
      </Section>

      <Section title="Mac Shortcuts" description="Using Mac modifier symbols.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Copy</span>
            <span><Kbd>&#8984;</Kbd> + <Kbd>C</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Paste</span>
            <span><Kbd>&#8984;</Kbd> + <Kbd>V</Kbd></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Spotlight</span>
            <span><Kbd>&#8984;</Kbd> + <Kbd>Space</Kbd></span>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Kbd } from "@virtari-packages/react-kbd";

// Single key
<Kbd>Ctrl</Kbd>

// Combination
<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>

// Mac style
<Kbd>\u2318</Kbd> + <Kbd>V</Kbd>`}</pre>
      </Section>
    </>
  );
}
