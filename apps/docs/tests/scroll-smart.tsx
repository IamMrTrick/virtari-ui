import { useRef, useState, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { ScrollArea } from "@virtari-packages/react-scroll-area";
import "@virtari-packages/tokens";
import "@virtari-packages/core";
import "@virtari-packages/react-scroll-area/styles";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const surface: CSSProperties = { height: 180, width: 280, borderRadius: 28, border: "1px solid var(--vds-color-border)", background: "var(--vds-color-surface)", "--scroll-area-track-inset": "12px" } as CSSProperties;

function App() {
  const viewport = useRef<HTMLDivElement>(null);
  const primitive = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const consumerEvents = useRef(0);
  const [report, setReport] = useState("Ready. Click Run and keep the pointer on the button while checks run.");
  const [running, setRunning] = useState(false);
  async function run() {
    if (running) return;
    setRunning(true);
    const lines: string[] = [];
    const check = (ok: boolean, label: string) => { lines.push(`${ok ? "PASS" : "FAIL"} ${label}`); setReport(lines.join("\n")); };
    try {
      button.current?.focus({ preventScroll: true });
      await wait(450);
      const node = viewport.current!;
      const wrapper = node.closest<HTMLElement>(".vds-scroll-area-root")!;
      const track = wrapper.querySelector<HTMLElement>(".vds-scrollbar[data-orientation='vertical']")!;
      const fit = document.querySelector<HTMLElement>(".fitting .vds-scroll-area-viewport")!;
      const opacity = () => parseFloat(getComputedStyle(track).opacity);
      check(node === document.querySelector(".overflowing .vds-scroll-area-viewport"), "Forwarded viewport ref points to the native scrolling element");
      check(primitive.current === node.parentElement, "Existing root ref still identifies the primitive root");
      check(node.getAttribute("aria-label") === "Long document" && node.getAttribute("role") === "region", "Viewport accessible name and region attributes are forwarded");
      check(node.scrollHeight > node.clientHeight + 100 && fit.scrollHeight <= fit.clientHeight + 1, "Long and fitting content retain correct native overflow geometry");
      check(!fit.closest(".vds-scroll-area-root")!.querySelector(".vds-scrollbar"), "Fitting content renders no redundant track");
      check(!wrapper.matches(":hover") && !wrapper.matches(":focus-within"), "Idle check is outside pointer hover and keyboard focus");
      check(opacity() < 0.01, "Idle overflowing track is visually hidden");
      const initialWidth = node.clientWidth;
      const beforeEvents = consumerEvents.current;
      const targetTop = node.scrollTop < 100 ? 240 : 0;
      node.scrollTo({ top: targetTop, behavior: "instant" });
      await wait(80);
      check(Math.abs(node.scrollTop - targetTop) < 1, "Native scrollTo updates the actual viewport position");
      check(consumerEvents.current > beforeEvents, "Consumer viewport onScroll callback receives native scrolling");
      check(wrapper.getAttribute("data-scrolling") === "true" && opacity() > 0, "Scrolling reveals the track during activity");
      const areaBox = primitive.current!.getBoundingClientRect();
      const trackBox = track.getBoundingClientRect();
      check(trackBox.top >= areaBox.top + 11.5 && trackBox.bottom <= areaBox.bottom - 11.5 && trackBox.left >= areaBox.left - .5 && trackBox.right <= areaBox.right + .5, "Track stays within surface bounds and clear of both rounded ends");
      check(getComputedStyle(primitive.current!).overflow === "hidden" && parseFloat(getComputedStyle(primitive.current!).borderTopLeftRadius) === 28, "Rounded primitive clips descendants at its own boundary");
      await wait(450);
      check(!wrapper.hasAttribute("data-scrolling") && opacity() < 0.01, "Track fades after scroll inactivity without hover or focus");
      check(node.clientWidth === initialWidth, "Revealing and hiding the track never shifts content width");
      node.focus({ preventScroll: true });
      await wait(220);
      check(document.activeElement === node && node.tabIndex === 0, "Viewport is an ordinary keyboard-focusable scroll target");
      check(opacity() > .99, "Keyboard focus reveals the overflowing track");
      button.current?.focus({ preventScroll: true });
      await wait(220);
      check(opacity() < .01, "Leaving the region hides its track again");
      const failed = lines.filter(line => line.startsWith("FAIL")).length;
      setReport(`${lines.join("\n")}\n\n${lines.length - failed}/${lines.length} passed`);
    } catch (error) { check(false, String(error)); }
    finally { setRunning(false); }
  }
  return <main style={{ padding: 24 }}>
    <h1>Smart ScrollArea regression</h1>
    <p>Click Run and leave the pointer on the button. Then use Tab to focus “Long document” and press Page Down to verify native keyboard scrolling.</p>
    <button ref={button} aria-disabled={running} onClick={run}>Run smart scroll checks</button>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBlock: 32 }}>
      <ScrollArea ref={primitive} viewportRef={viewport} className="overflowing" scrollHideDelay={120} style={surface}
        viewportProps={{ role: "region", "aria-label": "Long document", onScroll: () => { consumerEvents.current++; } }}>
        <div style={{ padding: 24 }}>{Array.from({ length: 24 }, (_, index) => <p key={index} style={{ marginBlock: 16 }}>Document paragraph {index + 1} — متن آزمایشی</p>)}</div>
      </ScrollArea>
      <ScrollArea className="fitting" style={surface} viewportProps={{ role: "region", "aria-label": "Short document" }}><p style={{ padding: 24 }}>Everything fits.</p></ScrollArea>
    </div>
    <pre id="report" aria-live="polite" style={{ whiteSpace: "pre-wrap" }}>{report}</pre>
  </main>;
}
createRoot(document.getElementById("root")!).render(<App/>);
