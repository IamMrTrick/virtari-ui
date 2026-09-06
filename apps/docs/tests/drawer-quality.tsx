import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerHandle, DrawerBody, DrawerFooter, DrawerClose, type Direction } from "@virtari-packages/react-drawer";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-drawer/styles";

const params = new URLSearchParams(location.search);
const direction = (params.get("direction") || "bottom") as Direction;
const rtl = params.has("rtl");
document.documentElement.dir = rtl ? "rtl" : "ltr";
document.documentElement.dataset.theme = params.get("theme") || "light";
document.documentElement.dataset.surfaceStyle = params.get("surface") || "tonal";
const outside = params.has("outside");
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  const [report, setReport] = useState("Ready");
  async function check() {
    const panel = document.querySelector<HTMLElement>(".vds-drawer-content")!;
    const handle = document.querySelector<HTMLElement>(".vds-drawer-handle")!;
    const header = document.querySelector<HTMLElement>(".vds-drawer-header")!;
    const body = document.querySelector<HTMLElement>(".vds-drawer-body")!;
    const footer = document.querySelector<HTMLElement>(".vds-drawer-footer")!;
    const results: string[] = [];
    const assert = (ok: boolean, label: string) => results.push(`${ok ? "PASS" : "FAIL"}: ${label}`);
    const rect = panel.getBoundingClientRect();
    const cs = getComputedStyle(panel);
    assert(rect.left >= 15 && rect.top >= 15 && innerWidth - rect.right >= 15 && innerHeight - rect.bottom >= 15, "Floating gap on every viewport edge");
    assert([cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius].every(x => parseFloat(x) > 0), "All floating corners rounded");
    assert([header, body, footer].every(el => parseFloat(getComputedStyle(el).paddingInlineStart) >= 24 && parseFloat(getComputedStyle(el).paddingBlockStart) >= 16), "Header/body/footer own their padding");
    assert(panel.scrollWidth <= panel.clientWidth, "Long content stays within the drawer");
    if (outside) {
      assert(getComputedStyle(header).borderTopLeftRadius === cs.borderTopLeftRadius && getComputedStyle(footer).borderBottomRightRadius === cs.borderBottomRightRadius, "Outside-handle slot backgrounds preserve floating corners");
      const h = handle.getBoundingClientRect();
      const horizontal = direction === "left" || direction === "right";
      const docksLeft = (direction === "left") !== rtl;
      assert(horizontal ? (docksLeft ? h.left >= rect.right : h.right <= rect.left) : Math.abs((h.left + h.right) / 2 - (rect.left + rect.right) / 2) < 1, "Outside handle mirrors its free edge and stays centered");
    }
    const h = handle.getBoundingClientRect();
    const x = h.x + h.width / 2, y = h.y + h.height / 2;
    const horizontal = direction === "left" || direction === "right";
    const positive = horizontal ? ((direction === "left") !== rtl) : direction === "top";
    handle.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 0, buttons: 1, clientX: x, clientY: y }));
    window.dispatchEvent(new MouseEvent("mousemove", { buttons: 1, clientX: x + (horizontal ? (positive ? 70 : -70) : 0), clientY: y + (!horizontal ? (positive ? 70 : -70) : 0) }));
    await wait(70);
    assert(panel.hasAttribute("data-dragging"), "Drag starts");
    assert(getComputedStyle(panel).transform.startsWith("matrix(1, 0, 0, 1"), "Elastic drag does not scale content");
    window.dispatchEvent(new MouseEvent("mouseup", { button: 0, buttons: 0 }));
    await wait(650);
    assert(!panel.hasAttribute("data-dragging") && !panel.hasAttribute("data-elastic"), "Release clears drag and elastic state");
    setReport(results.join("\n"));
  }
  return <Drawer direction={direction} offset={16} sizeMode="fixed" size={340} indicator={outside ? "outside" : "inside"}>
    <DrawerTrigger asChild><button>Open quality drawer</button></DrawerTrigger>
    <DrawerContent>
      <DrawerHeader><DrawerHandle/><DrawerTitle>Drawer quality</DrawerTitle><DrawerDescription>Long content wraps: تنظیمات نمایش و دسترسی برای حساب کاربری</DrawerDescription></DrawerHeader>
      <DrawerBody><label>Name <input placeholder="Your name"/></label><button onClick={check}>Run quality checks</button><pre style={{whiteSpace:"pre-wrap"}} aria-live="polite">{report}</pre></DrawerBody>
      <DrawerFooter><DrawerClose asChild><button>Close drawer</button></DrawerClose><button>Save changes</button></DrawerFooter>
    </DrawerContent>
  </Drawer>;
}
createRoot(document.getElementById("root")!).render(<App/>);
