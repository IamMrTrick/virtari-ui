import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stack } from "@virtari-packages/react-layout";
import { Input } from "@virtari-packages/react-input";
import { Textarea } from "@virtari-packages/react-textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@virtari-packages/react-select";
import { Card, CardContent } from "@virtari-packages/react-card";
import "@virtari-packages/tokens";
import "@virtari-packages/core";
import "@virtari-packages/react-layout/styles";
import "@virtari-packages/react-input/styles";
import "@virtari-packages/react-textarea/styles";
import "@virtari-packages/react-select/styles";
import "@virtari-packages/react-card/styles";

function App() {
  const [report, setReport] = useState("Waiting for layout");
  function run() {
    const lines: string[] = [];
    const check = (ok: boolean, message: string) => lines.push(`${ok ? "PASS" : "FAIL"} ${message}`);
    document.querySelectorAll<HTMLElement>("[data-stack-case]").forEach(stack => {
      const name = stack.dataset.stackCase!;
      const expected = parseFloat(getComputedStyle(stack).rowGap);
      const children = [...stack.children].filter((child): child is HTMLElement => child instanceof HTMLElement && (child.hasAttribute("data-stack-child") || child.classList.contains("vds-select-control")));
      const childName = (child: HTMLElement) => child.dataset.stackChild ?? "Select";
      check(children.length === 4, `${name}: all four visible control surfaces are included in measurement`);
      check(Number.isFinite(expected) && expected > 0, `${name}: parent owns a resolved positive gap`);
      for (let index = 1; index < children.length; index++) {
        const actual = children[index].getBoundingClientRect().top - children[index - 1].getBoundingClientRect().bottom;
        check(Math.abs(actual - expected) < .6, `${name}: ${childName(children[index - 1])} → ${childName(children[index])} = ${actual.toFixed(2)}px (expected ${expected}px)`);
      }
      const nativeSelect = stack.querySelector<HTMLSelectElement>("select[aria-hidden='true']");
      check(!!nativeSelect && (getComputedStyle(nativeSelect).position === "absolute" || getComputedStyle(nativeSelect).display === "none"), `${name}: native select remains available without occupying a flex slot`);
      check([...stack.querySelectorAll<HTMLElement>("[data-hidden-probe]")].every(node => node.getClientRects().length === 0), `${name}: hidden nodes occupy no space`);
      const inner = stack.querySelector<HTMLElement>("[data-inner-stack]")!;
      const innerChildren = [...inner.children] as HTMLElement[];
      const innerGap = parseFloat(getComputedStyle(inner).rowGap);
      const actualInnerGap = innerChildren[1].getBoundingClientRect().top - innerChildren[0].getBoundingClientRect().bottom;
      check(Math.abs(actualInnerGap - innerGap) < .6, `${name}: nested Card's own Stack retains ${innerGap}px gap (actual ${actualInnerGap.toFixed(2)}px)`);
    });
    const failed = lines.filter(line => line.startsWith("FAIL")).length;
    setReport(`${lines.length - failed}/${lines.length} passed\n${lines.join("\n")}`);
  }
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => setTimeout(() => { if (!cancelled) run(); }, 250));
    return () => { cancelled = true; };
  }, []);
  return <main style={{ padding: 24 }}>
    <h1>Stack spacing regression</h1>
    <p>Runs automatically. Input, native Select, Textarea, nested Card and hidden nodes must share the Stack's spacing contract.</p>
    <button onClick={run}>Run spacing checks</button>
    <pre id="stack-results" aria-live="polite" style={{ whiteSpace: "pre-wrap" }}>{report}</pre>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 32 }}>
      {(["sm", "lg"] as const).flatMap(gap => ([false, true] as const).flatMap(recursive => (["ltr", "rtl"] as const).map(dir => {
        const name = `${gap}/${recursive ? "recursive" : "direct"}/${dir}`;
        return <form key={name} dir={dir} onSubmit={event => event.preventDefault()}>
          <h2>{name}</h2>
          <Stack gap={gap} recursive={recursive} data-stack-case={name}>
            <Input data-stack-child="Input" aria-label={`${name} input`} defaultValue="Mixed Agj متن"/>
            <div hidden data-hidden-probe>Hidden content must not add a gap</div>
            <Select name={`${name}-select`} defaultValue="a"><SelectTrigger data-stack-child="Select" aria-label={`${name} select`}><SelectValue/></SelectTrigger><SelectContent><SelectItem value="a">First choice</SelectItem><SelectItem value="b">Second choice</SelectItem></SelectContent></Select>
            <input type="hidden" name="metadata" value="hidden" data-hidden-probe/>
            <Textarea data-stack-child="Textarea" aria-label={`${name} textarea`} defaultValue="Textarea resets its own margins." rows={2}/>
            <Card data-stack-child="Card"><CardContent><Stack gap="xs" data-inner-stack><Input aria-label={`${name} nested input`} placeholder="Nested input"/><Textarea aria-label={`${name} nested textarea`} placeholder="Nested textarea" rows={2}/></Stack></CardContent></Card>
          </Stack>
        </form>;
      })))}
    </div>
  </main>;
}
createRoot(document.getElementById("root")!).render(<App/>);
