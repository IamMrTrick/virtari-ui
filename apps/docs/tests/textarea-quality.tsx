import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { Textarea, TextareaField } from "@virtari-packages/react-textarea";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-textarea/styles";

const root = createRoot(document.getElementById("root")!);
const results: string[] = [];
const check = (ok: boolean, name: string) => results.push(`${ok ? "PASS" : "FAIL"} ${name}`);
const wait = () => new Promise(resolve => setTimeout(resolve, 30));
const textarea = () => document.querySelector("textarea")!;
const render = (node: React.ReactNode) => flushSync(() => root.render(node));
render(<TextareaField id="meta" label="Review" description={0} error={0} showCounter maxLength={0} aria-describedby="external external" />);
check(textarea().getAttribute("aria-describedby") === "external meta-description meta-error meta-counter", "zero metadata IDs and deduplicated external association");
check(document.getElementById("meta-counter")?.textContent === "0/0", "zero character limit is displayed");
check(textarea().getAttribute("aria-invalid") === "true", "rendered error implies invalid state");
render(<TextareaField id="meta" label="Review" error="Issue" invalid={false} aria-invalid="spelling" counter={false} />);
check(textarea().getAttribute("aria-invalid") === "false", "explicit invalid false wins over error and native invalid");
check(!textarea().getAttribute("aria-describedby")?.includes("counter"), "false counter has no dangling association");
render(<TextareaField label="Review" aria-invalid="grammar" showCounter counterFormatter={() => null} />);
check(textarea().getAttribute("aria-invalid") === "grammar", "native grammar invalid value is preserved");
check(!textarea().hasAttribute("aria-describedby"), "null formatter has no dangling association");
let nodeRef: HTMLTextAreaElement | null = null;
let changes = 0;
render(<form id="review-form"><TextareaField key="reset" label="Reset notes" name="notes" defaultValue="Initial" showCounter ref={node => { nodeRef = node; }} onChange={() => changes++} /><button type="reset">Reset</button></form>);
await wait();
check(nodeRef === textarea(), "ref points to native textarea");
document.querySelector<HTMLLabelElement>("label")!.click();
check(document.activeElement === textarea(), "label focuses native control");
const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
setValue.call(textarea(), "Edited notes");
textarea().dispatchEvent(new Event("input", { bubbles: true }));
await wait();
check(changes === 1 && document.querySelector(".vds-field-meta-item--counter")?.textContent === "12", "uncontrolled counter and consumer onChange update together");
const form = document.querySelector("form")!;
check(new FormData(form).get("notes") === "Edited notes", "native form serialization");
form.reset(); await wait();
check(textarea().value === "Initial" && document.querySelector(".vds-field-meta-item--counter")?.textContent === "7", "native reset restores value and live counter");
setValue.call(textarea(), "Keep"); textarea().dispatchEvent(new Event("input", { bubbles: true })); await wait();
form.addEventListener("reset", event => event.preventDefault(), { once: true });
form.reset(); await wait();
check(textarea().value === "Keep" && document.querySelector(".vds-field-meta-item--counter")?.textContent === "4", "cancelled native reset preserves counter and value");
render(<Textarea aria-label="Read only pulse" readOnly typingPulse defaultValue="Read only" />);
textarea().dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
check(!textarea().classList.contains("vds-textarea--pulse"), "read-only does not trigger typing feedback");
render(<Textarea aria-label="Cancelled pulse" typingPulse onKeyDown={event => event.preventDefault()} />);
textarea().dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true, cancelable: true }));
check(!textarea().classList.contains("vds-textarea--pulse"), "consumer key cancellation is honored");
render(<Textarea aria-label="Pulse" typingPulse />);
textarea().focus(); textarea().dispatchEvent(new KeyboardEvent("keydown", { key: "b", bubbles: true }));
check(textarea().classList.contains("vds-textarea--pulse"), "printable typing triggers opt-in pulse");
render(<Textarea aria-label="Pulse" typingPulse={false} />); await wait();
check(!textarea().classList.contains("vds-textarea--pulse"), "disabling typing pulse clears transient class");
render(<Textarea aria-label="Invalid pulse" aria-invalid="grammar" typingPulse />);
textarea().focus(); textarea().dispatchEvent(new KeyboardEvent("keydown", { key: "c", bubbles: true }));
check(getComputedStyle(textarea()).getPropertyValue("--_textarea-ring").trim() === getComputedStyle(textarea()).getPropertyValue("--vds-color-danger-a4").trim(), "invalid pulse uses the danger ring role");
render(<TextareaField label="Controlled" value="Hello" readOnly showCounter />);
check(document.querySelector(".vds-field-meta-item--counter")?.textContent === "5", "controlled counter follows supplied value");
const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
render(<main style={{ padding: 24, display: "grid", gap: 24 }}>
  <section style={{ width: 280 }}>{sizes.map(size => <TextareaField key={size} label={`Size ${size}`} size={size} rows={3} defaultValue={"Multiline text\nSecond line\nThird line"} />)}</section>
  {(["light", "dark", "dark-oled"] as const).map(theme => <section key={theme} data-theme={theme} style={{ background: "var(--vds-color-surface)", color: "var(--vds-color-text)", padding: 24, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
    {(["bordered", "tonal", "elevated"] as const).map(surface => <div key={surface} data-surface-style={surface} dir="rtl" style={{ minWidth: 0 }}>
      <TextareaField label={`${theme} / ${surface} — یادداشت‌های بررسی`} description="Long description that wraps within the available field width." error="Please add more detail." invalid rows={3} defaultValue="متن نمونه برای بررسی اندازه و فاصله‌ها" showCounter maxLength={180} />
      <TextareaField label="Disabled" disabled defaultValue="Archived content" />
      <div data-theme="light" style={{ background: "var(--vds-color-surface)", padding: 16 }}><TextareaField label="Nested light" placeholder="Local theme placeholder" /></div>
    </div>)}
  </section>)}
</main>);
for (const control of document.querySelectorAll<HTMLTextAreaElement>("textarea")) {
  const css = getComputedStyle(control);
  check(css.paddingTop === css.paddingBottom && css.paddingLeft === css.paddingRight, `${control.labels?.[0]?.textContent}: symmetric padding`);
  check(control.getBoundingClientRect().width <= control.parentElement!.getBoundingClientRect().width + 1, `${control.labels?.[0]?.textContent}: fits container`);
}
document.getElementById("results")!.textContent = `${results.filter(line => line.startsWith("PASS")).length}/${results.length} passed\n${results.filter(line => line.startsWith("FAIL")).join("\n")}`;

