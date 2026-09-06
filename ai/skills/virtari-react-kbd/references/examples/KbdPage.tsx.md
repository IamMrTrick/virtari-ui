# Original documentation page

Source ID: `apps/docs/src/pages/KbdPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { Kbd, KbdShortcut } from "@virtari-packages/react-kbd";
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

      <Section title="Keyboard Shortcuts" description="Use mod for application shortcuts: Command on Apple platforms, Control on Windows and Linux. These examples display shortcuts; they do not register handlers.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Copy</span>
            <KbdShortcut combo="mod+c" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Paste</span>
            <KbdShortcut combo="mod+v" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Undo</span>
            <KbdShortcut combo="mod+z" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Save</span>
            <KbdShortcut combo="mod+s" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Select All</span>
            <KbdShortcut combo="mod+a" />
          </div>
        </div>
      </Section>

      <Section title="Platform comparison" description="Explicit platform overrides are for documentation or a known remote environment. Application hints should use the detected platform.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Windows / Linux</span>
            <KbdShortcut combo="mod+k" platform="other" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>macOS</span>
            <KbdShortcut combo="mod+k" platform="mac" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxInlineSize: "20rem" }}>
            <span>Additional modifier</span>
            <KbdShortcut combo="mod+shift+k" />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Kbd, KbdShortcut } from "@virtari-packages/react-kbd";
import { ariaKeyShortcuts, useHotkey, useKeyboardPlatform } from "@virtari-packages/utils";

// Single key
<Kbd>Ctrl</Kbd>

// Platform-aware display; it does not bind the shortcut
<KbdShortcut combo="mod+k" />

// Use the same combination for behavior and accessibility
const platform = useKeyboardPlatform();
useHotkey("mod+k", openSearch);
<Button onClick={openSearch} aria-keyshortcuts={ariaKeyShortcuts("mod+k", platform)}>
  Search <KbdShortcut combo="mod+k" />
</Button>`}</pre>
      </Section>
    </>
  );
}

```
