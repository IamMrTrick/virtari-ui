import { useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { KbdShortcut } from "@virtari-packages/react-kbd";
import { ariaKeyShortcuts, formatCombo, getKeyboardPlatform, matchesCombo, parseCombo, useHotkey } from "@virtari-packages/utils";
import "@virtari-packages/tokens";
import "@virtari-packages/core";
import "@virtari-packages/react-kbd/styles";

const wait = () => new Promise(resolve => setTimeout(resolve, 20));
const counts = { primary: 0, duplicate: 0, demo: 0, editable: 0, repeat: 0 };
function Probe() {
  useHotkey("mod+k", () => counts.primary++);
  useHotkey("mod+k", () => counts.duplicate++);
  useHotkey("mod+shift+k", () => counts.demo++);
  useHotkey("mod+e", () => counts.editable++, { allowInInputs: true });
  useHotkey("mod+r", () => counts.repeat++, { allowRepeat: true });
  return <><KbdShortcut id="detected" combo="mod+k" /><input id="editable" aria-label="Editable target" /></>;
}

function App() {
  const [report, setReport] = useState("Ready.");
  const [running, setRunning] = useState(false);
  async function run() {
    if (running) return;
    setRunning(true);
    const lines: string[] = [];
    const check = (ok: boolean, label: string) => lines.push(`${ok ? "PASS" : "FAIL"} ${label}`);
    const originalPlatform = Object.getOwnPropertyDescriptor(navigator, "platform");
    const originalUserAgentData = Object.getOwnPropertyDescriptor(navigator, "userAgentData");
    let harness: ReturnType<typeof createRoot> | undefined;
    try {
      for (const platform of ["other", "mac"] as const) {
        Object.defineProperty(navigator, "platform", { configurable: true, value: platform === "mac" ? "MacIntel" : "Win32" });
        Object.defineProperty(navigator, "userAgentData", { configurable: true, value: undefined });
        for (const key of Object.keys(counts) as Array<keyof typeof counts>) counts[key] = 0;
        harness = createRoot(document.getElementById("harness")!);
        flushSync(() => harness!.render(<Probe />));
        await wait();
        const mod = platform === "mac" ? { metaKey: true } : { ctrlKey: true };
        const event = (extra: KeyboardEventInit = {}) => new KeyboardEvent("keydown", { key: "k", bubbles: true, cancelable: true, ...mod, ...extra });
        check(getKeyboardPlatform() === platform, `${platform}: browser detection`);
        check(formatCombo("mod+k").join(" ") === (platform === "mac" ? "⌘ K" : "Ctrl K"), `${platform}: visual modifier follows platform`);
        check(ariaKeyShortcuts("mod+k") === (platform === "mac" ? "Meta+K" : "Control+K"), `${platform}: valid ARIA modifier names`);
        check(document.querySelector("#detected .vds-kbd-accessible-label")!.textContent === (platform === "mac" ? "Command + K" : "Control + K"), `${platform}: readable shortcut text for assistive technology`);
        check(document.getElementById("detected")!.dir === "ltr", `${platform}: shortcut direction is isolated from RTL text`);
        check(matchesCombo(event(), parseCombo("mod+k")), `${platform}: displayed combination matches binding`);
        check(!matchesCombo(event({ ...mod, ctrlKey: platform === "mac", metaKey: platform !== "mac" }), parseCombo("mod+k")), `${platform}: wrong platform modifier rejected`);
        const press = event(); document.dispatchEvent(press);
        check(counts.primary === 1 && press.defaultPrevented, `${platform}: primary binding runs and prevents browser default`);
        check(counts.duplicate === 0 && counts.demo === 0, `${platform}: handled shortcut cannot toggle another palette`);
        document.dispatchEvent(event({ repeat: true }));
        check(counts.primary === 1, `${platform}: held key does not repeatedly toggle`);
        document.dispatchEvent(event({ isComposing: true }));
        document.dispatchEvent(event({ keyCode: 229 }));
        check(counts.primary === 1, `${platform}: IME composition ignored`);
        const handled = event(); handled.preventDefault(); document.dispatchEvent(handled);
        check(counts.primary === 1, `${platform}: already-handled key ignored`);
        document.dispatchEvent(event({ altKey: true }));
        check(counts.primary === 1, `${platform}: unrequested modifier ignored`);
        document.dispatchEvent(event({ shiftKey: true }));
        check(counts.demo === 1 && counts.primary === 1, `${platform}: demo shortcut does not hijack documentation search`);
        const input = document.getElementById("editable")!;
        input.dispatchEvent(event());
        check(counts.primary === 1, `${platform}: editable target protected by default`);
        input.dispatchEvent(event({ key: "e" }));
        check(counts.editable === 1, `${platform}: opted-in shortcuts work in input fields`);
        document.dispatchEvent(event({ key: "r", repeat: true }));
        check(counts.repeat === 1, `${platform}: repeat opt-in remains available`);
        flushSync(() => harness!.unmount()); harness = undefined;
        document.dispatchEvent(event());
        check(counts.primary === 1, `${platform}: unmount removes document listener`);
      }
      Object.defineProperty(navigator, "userAgentData", { configurable: true, value: { platform: "macOS" } });
      check(getKeyboardPlatform() === "mac", "Client Hints platform takes precedence over legacy platform");
      check(formatCombo("opt+win+k", "mac").join(" ") === "⌥ ⌘ K", "Modifier aliases match accepted parser grammar");
    } catch (error) { lines.push(`FAIL ${String(error)}`); }
    finally {
      if (harness) flushSync(() => harness!.unmount());
      if (originalPlatform) Object.defineProperty(navigator, "platform", originalPlatform); else Reflect.deleteProperty(navigator, "platform");
      if (originalUserAgentData) Object.defineProperty(navigator, "userAgentData", originalUserAgentData); else Reflect.deleteProperty(navigator, "userAgentData");
      setReport(`${lines.filter(line => line.startsWith("PASS")).length}/${lines.length} passed\n${lines.join("\n")}`);
      setRunning(false);
    }
  }
  return <main style={{ padding: 32 }}><h1>Platform shortcut checks</h1><button onClick={run} disabled={running}>Run shortcut checks</button><pre id="results">{report}</pre></main>;
}
createRoot(document.getElementById("root")!).render(<App />);
