import { useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { CommandDialog, CommandInput, CommandList, CommandItem } from "@virtari-packages/react-command";
import { getKeyboardPlatform } from "@virtari-packages/utils";
import "@virtari-packages/tokens";
import "@virtari-packages/core";
import "@virtari-packages/react-command/styles";
import "@virtari-packages/react-dialog/styles";

const wait = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));
const callbacks = { open: 0, close: 0 };
function Probe({ customFocus = false }: { customFocus?: boolean }) {
  const [open, setOpen] = useState(false);
  return <>
    <input id="opener-input" aria-label="Original input" defaultValue="Workspace" />
    <button id="opener-button" onClick={() => setOpen(true)}>Open palette</button>
    <button id="consumer-target">Consumer focus target</button>
    <CommandDialog open={open} onOpenChange={setOpen} hotkey="mod+k" animation="none" title="Focus fixture"
      onOpenAutoFocus={event => {
        callbacks.open++;
        if (customFocus) { event.preventDefault(); document.getElementById("custom-initial")!.focus(); }
      }}
      onCloseAutoFocus={event => {
        callbacks.close++;
        if (customFocus) { event.preventDefault(); document.getElementById("consumer-target")!.focus(); }
      }}>
      <CommandInput aria-label="Find action" />
      <button id="custom-initial" onClick={() => setOpen(false)}>Close palette</button>
      <CommandList><CommandItem value="sample">Sample action</CommandItem></CommandList>
    </CommandDialog>
  </>;
}
function App() {
  const [report, setReport] = useState("Ready.");
  const [running, setRunning] = useState(false);
  async function run() {
    setRunning(true);
    const lines: string[] = [];
    const check = (ok: boolean, label: string) => lines.push(`${ok ? "PASS" : "FAIL"} ${label}`);
    const harness = createRoot(document.getElementById("harness")!);
    const close = async () => {
      document.activeElement!.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
      await wait(350);
    };
    try {
      flushSync(() => harness.render(<Probe />)); await wait();
      const input = document.getElementById("opener-input") as HTMLInputElement;
      input.focus(); input.setSelectionRange(3, 3);
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "k", bubbles: true, cancelable: true, ...(getKeyboardPlatform() === "mac" ? { metaKey: true } : { ctrlKey: true }) }));
      await wait();
      check(document.activeElement?.getAttribute("aria-label") === "Find action", "Hotkey from an input focuses palette search");
      await close();
      check(!document.querySelector('[role="dialog"]'), "Escape closes controlled palette");
      check(document.activeElement === input, "Escape returns to the original input without a DialogTrigger");
      check(input.selectionStart === 3 && input.selectionEnd === 3, "Input caret position survives palette focus return");
      const button = document.getElementById("opener-button")!;
      button.focus(); button.click(); await wait();
      await close();
      check(document.activeElement === button, "Button-opened palette returns focus to its button");
      check(callbacks.open === 2 && callbacks.close === 2, "Consumer focus callbacks run once per open and close");
      flushSync(() => harness.render(<Probe customFocus />)); await wait();
      button.focus(); button.click(); await wait();
      check(document.activeElement?.id === "custom-initial", "Consumer can override initial focus with preventDefault");
      document.getElementById("custom-initial")!.click(); await wait(350);
      check(document.activeElement?.id === "consumer-target", "Consumer close focus override is respected");
    } catch (error) { lines.push(`FAIL ${String(error)}`); }
    finally { flushSync(() => harness.unmount()); setReport(`${lines.filter(line => line.startsWith("PASS")).length}/${lines.length} passed\n${lines.join("\n")}`); setRunning(false); }
  }
  return <main style={{ padding: 32 }}><h1>Command focus checks</h1><button onClick={run} disabled={running}>Run focus checks</button><pre id="results">{report}</pre></main>;
}
createRoot(document.getElementById("root")!).render(<App />);
