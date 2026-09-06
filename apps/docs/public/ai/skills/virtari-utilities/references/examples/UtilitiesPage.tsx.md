# Original documentation page

Source ID: `apps/docs/src/pages/UtilitiesPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { Card } from "@virtari-packages/react-card";
import { InputField } from "@virtari-packages/react-input";
import { Stack, Cluster } from "@virtari-packages/react-layout";
import { Section } from "../components";
import { ReferenceCode, ReferenceFilter, ReferencePagination, REFERENCE_PAGE_SIZE, useReferenceLanguage } from "../components/KnowledgeReference";
import generatedCatalog from "../data/generatedUtilities.json";

const catalog = generatedCatalog as { breakpoints: string[]; utilities: { id: string; className: string; category: string; declarations: { property: string; value: string }[]; breakpoint: string | null; condition: string | null; sourceId: string }[] };

const categories = [...new Set(catalog.utilities.map(item => item.category))].sort();

export function UtilitiesPage() {
  const { text } = useReferenceLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [breakpoint, setBreakpoint] = useState("base");
  const [page, setPage] = useState(0);
  const [rtl, setRtl] = useState(false);
  const filtered = useMemo(() => catalog.utilities.filter(item =>
    (category === "all" || item.category === category) &&
    (breakpoint === "all" || (breakpoint === "base" ? !item.breakpoint : item.breakpoint === breakpoint)) &&
    `${item.className} ${item.category} ${item.declarations.map(declaration => `${declaration.property} ${declaration.value}`).join(" ")} ${item.sourceId}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [query, category, breakpoint]);
  const visible = filtered.slice(page * REFERENCE_PAGE_SIZE, (page + 1) * REFERENCE_PAGE_SIZE);
  const reset = () => { setQuery(""); setCategory("all"); setBreakpoint("all"); setPage(0); };

  return <Stack gap="xl" className="docs-reference">
    <Section title={text("Use the actual class, with its exact value", "نام واقعی کلاس و مقدار دقیق آن")}
      description={text("This catalog is generated from the utility builder and core CSS. Each row is an emitted class, not a naming template. Use layout components for repeated composition and utilities for local adjustments.", "این فهرست از سازندهٔ یوتیلیتی‌ها و CSS اصلی تولید می‌شود. هر ردیف یک کلاس واقعی است، نه الگوی نام‌گذاری. برای ترکیب‌های تکراری از کامپوننت‌های چیدمان و برای تنظیمات محلی از یوتیلیتی استفاده کنید.")}>
      <ReferenceCode label={text("Stylesheet setup", "راه‌اندازی استایل")} code={'@import "@virtari-packages/core";\n@import "@virtari-packages/tokens";\n@import "@virtari-packages/utilities";'} />
      <p className="docs-prose">{text("Spacing and sizing use logical inline/block properties. Responsive classes apply only at their displayed condition. Copy class names directly into className; CSS selector escaping is not part of the HTML class. Arbitrary values and hover: variants are not supported.", "فاصله و اندازه از ویژگی‌های منطقی inline و block استفاده می‌کنند. کلاس‌های واکنش‌گرا فقط در شرط نمایش‌داده‌شده فعال‌اند. نام کلاس را مستقیماً در className کپی کنید؛ escape سلکتور CSS بخشی از کلاس HTML نیست. مقادیر دلخواه و وریانت‌های hover: پشتیبانی نمی‌شوند.")}</p>
    </Section>
    <Section title={text("Utility catalog", "فهرست یوتیلیتی‌ها")}>
      <div className="docs-reference-filters">
        <InputField label={text("Find a class, property or token", "جست‌وجوی کلاس، ویژگی یا توکن")} type="search" placeholder="vds-u-gap-4, inline-size, --vds-space…" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} />
        <ReferenceFilter label={text("Category", "دسته‌بندی")} value={category} onChange={value => { setCategory(value); setPage(0); }} options={[{ value: "all", label: text("All categories", "همهٔ دسته‌ها") }, ...categories.map(value => ({ value, label: value }))]} />
        <ReferenceFilter label={text("Breakpoint", "نقطهٔ شکست")} value={breakpoint} onChange={value => { setBreakpoint(value); setPage(0); }} options={[{ value: "all", label: text("All breakpoints", "همهٔ نقاط شکست") }, { value: "base", label: text("Base classes", "کلاس‌های پایه") }, ...catalog.breakpoints.map(value => ({ value, label: value }))]} />
      </div>
      <Cluster gap="md">
        <span className="docs-reference-stat docs-prose" role="status">{filtered.length} / {catalog.utilities.length} {text("classes", "کلاس")}</span>
        <Button size="sm" variant="ghost" onClick={reset}>{text("Reset filters / show all", "پاک‌کردن فیلترها / نمایش همه")}</Button>
      </Cluster>
      <div className="docs-reference-results">
        {visible.map(item => <Card key={item.id} className="docs-reference-entry"><Stack gap="sm">
          <h3 dir="ltr"><VirtariInlineCode>{item.className}</VirtariInlineCode></h3>
          <div className="docs-reference-meta">
            <span>{text("Category", "دسته")}: {item.category} · {item.breakpoint || text("Base", "پایه")}</span>
            {item.condition && <VirtariInlineCode dir="ltr">{item.condition}</VirtariInlineCode>}
            <span dir="ltr">{item.sourceId}</span>
          </div>
          <ReferenceCode label={text("Class name", "نام کلاس")} code={item.className} />
          <VirtariCodeBlock renderer="static" language="css" code={item.declarations.map(declaration => `${declaration.property}: ${declaration.value};`).join("\n")} />
        </Stack></Card>)}
      </div>
      {!filtered.length && <p className="docs-prose">{text("No matches. Try a shorter query or reset the filters.", "نتیجه‌ای پیدا نشد. عبارت کوتاه‌تری بنویسید یا فیلترها را پاک کنید.")}</p>}
      <ReferencePagination page={page} count={filtered.length} onChange={setPage} />
    </Section>
    <Section title={text("Responsive layout example", "نمونهٔ چیدمان واکنش‌گرا")}>
      <ReferenceCode label="className" code="vds-u-grid vds-u-grid-cols-1 sm:vds-u-grid-cols-2 md:vds-u-grid-cols-3 vds-u-gap-4" />
      <div className="vds-u-grid vds-u-grid-cols-1 sm:vds-u-grid-cols-2 md:vds-u-grid-cols-3 vds-u-gap-4">
        {[1, 2, 3].map(number => <Card className="vds-u-p-4" key={number}>{text("Item", "آیتم")} {number}</Card>)}
      </div>
    </Section>
    <Section title={text("Flex, gap and padding", "فلکس، فاصله و پدینگ")}
      description={text("The gap changes from step 2 to step 6 at the md breakpoint. Resize the viewport to inspect it.", "فاصله در نقطهٔ شکست md از مرحلهٔ ۲ به ۶ تغییر می‌کند. برای بررسی، اندازهٔ صفحه را تغییر دهید.")}>
      <ReferenceCode label="className" code="vds-u-flex vds-u-flex-row vds-u-flex-wrap vds-u-gap-2 md:vds-u-gap-6 vds-u-p-4" />
      <Card className="vds-u-flex vds-u-flex-row vds-u-flex-wrap vds-u-gap-2 md:vds-u-gap-6 vds-u-p-4">
        <Button>{text("One", "یک")}</Button><Button variant="outline">{text("Two", "دو")}</Button><Button variant="ghost">{text("Three", "سه")}</Button>
      </Card>
    </Section>
    <Section title={text("Logical spacing and direction", "فاصله‌گذاری منطقی و جهت متن")}
      description={text("mis means margin-inline-start. Auto margin consumes the remaining inline space; its side follows dir without changing the class.", "mis یعنی margin-inline-start. مارجین auto فضای خالی محور inline را می‌گیرد؛ سمت آن بدون تغییر کلاس با dir هماهنگ می‌شود.")}>
      <Cluster gap="sm">
        <Button size="sm" variant={rtl ? "outline" : "solid"} aria-pressed={!rtl} onClick={() => setRtl(false)}>LTR</Button>
        <Button size="sm" variant={rtl ? "solid" : "outline"} aria-pressed={rtl} onClick={() => setRtl(true)}>RTL</Button>
      </Cluster>
      <ReferenceCode label="className" code="vds-u-flex vds-u-flex-row vds-u-items-center vds-u-gap-3 vds-u-p-4" />
      <Card dir={rtl ? "rtl" : "ltr"} className="vds-u-flex vds-u-flex-row vds-u-items-center vds-u-gap-3 vds-u-p-4">
        <Card className="vds-u-mis-auto vds-u-p-3"><VirtariInlineCode>vds-u-mis-auto</VirtariInlineCode></Card>
        <span>{text("Follows", "بعدی")}</span>
      </Card>
    </Section>
    <Section title={text("Utility layer overrides", "اولویت لایهٔ یوتیلیتی")}
      description={text("The utilities layer follows components. vds-u-p-0 can remove a Card's default padding without !important. Each slot still owns its own padding.", "لایهٔ یوتیلیتی پس از کامپوننت‌ها قرار دارد. vds-u-p-0 می‌تواند پدینگ پیش‌فرض کارت را بدون !important حذف کند. هر بخش داخلی همچنان پدینگ خودش را دارد.")}>
      <Stack gap="md">
        <Card><VirtariInlineCode>{'<Card>Default padding</Card>'}</VirtariInlineCode></Card>
        <Card className="vds-u-p-0"><VirtariInlineCode>{'<Card className="vds-u-p-0">No padding</Card>'}</VirtariInlineCode></Card>
      </Stack>
    </Section>
  </Stack>;
}

```
