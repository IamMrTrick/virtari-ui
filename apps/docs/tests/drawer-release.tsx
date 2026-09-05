import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Drawer, DrawerContent, DrawerHeader, DrawerHandle, DrawerTitle, DrawerDescription, DrawerBody } from "@virtari-packages/react-drawer";
import "@virtari-packages/tokens";
import "@virtari-packages/core";
import "@virtari-packages/react-drawer/styles";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
function App() {
  const [report, setReport] = useState("Ready");
  const [running, setRunning] = useState(false);
  async function run() {
    setRunning(true);
    const results: string[] = [];
    const panel = document.querySelector<HTMLElement>(".vds-drawer-content")!;
    const handle = document.querySelector<HTMLElement>(".vds-drawer-handle")!;
    const move = (buttons: number, delta = -60) => {
      const r = handle.getBoundingClientRect();
      window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, buttons, clientX: r.x + r.width / 2, clientY: r.y + delta }));
    };
    const start = async () => {
      const r = handle.getBoundingClientRect();
      handle.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 0, buttons: 1, clientX: r.x + r.width / 2, clientY: r.y }));
      move(1);
      await wait(70);
      if (!panel.hasAttribute("data-dragging")) throw new Error("Drag did not start");
    };
    const check = (ok: boolean, message: string) => {
      results.push(`${ok ? "PASS" : "FAIL"}: ${message}`);
      setReport(results.join("\n"));
    };
    try {
      await start();
      // Simulate returning from outside the browser with no mouseup delivered.
      move(0, 180);
      await wait(70);
      check(!panel.hasAttribute("data-dragging"), "Lost mouseup ends drag on unpressed movement");
      await wait(600);
      const settled = panel.getBoundingClientRect();
      move(0, 240);
      await wait(70);
      const after = panel.getBoundingClientRect();
      check(Math.abs(settled.y - after.y) < 0.1 && Math.abs(settled.height - after.height) < 0.1, "Later hover movement cannot move the drawer");

      await start();
      const swallow = (event: Event) => event.stopPropagation();
      handle.addEventListener("mouseup", swallow, { once: true });
      handle.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, button: 0, buttons: 0 }));
      await wait(70);
      check(!panel.hasAttribute("data-dragging"), "Release is received even when a child stops propagation");
      await wait(600);

      await start();
      window.dispatchEvent(new MouseEvent("mouseup", { button: 2, buttons: 1 }));
      await wait(70);
      check(panel.hasAttribute("data-dragging"), "Releasing a secondary button preserves a held primary drag");
      window.dispatchEvent(new MouseEvent("mouseup", { button: 0, buttons: 0 }));
      await wait(70);
      check(!panel.hasAttribute("data-dragging"), "A fresh drag still releases normally after recovery");
    } catch (error) { check(false, String(error)); }
    finally { window.dispatchEvent(new MouseEvent("mouseup", { button: 0 })); setRunning(false); }
  }
  return <Drawer defaultOpen sizeMode="fixed" size={340} preventAutoFocus>
    <DrawerContent><DrawerHeader><DrawerHandle/><DrawerTitle>Drawer release regression</DrawerTitle><DrawerDescription>Mouse release, recovery, and event propagation.</DrawerDescription></DrawerHeader>
      <DrawerBody><button disabled={running} onClick={run}>Run regression checks</button><pre aria-live="polite">{report}</pre></DrawerBody>
    </DrawerContent>
  </Drawer>;
}
createRoot(document.getElementById("root")!).render(<App/>);
