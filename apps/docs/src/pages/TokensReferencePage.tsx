import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { Card } from "@virtari-packages/react-card";
import { InputField } from "@virtari-packages/react-input";
import { Stack, Cluster } from "@virtari-packages/react-layout";
import { Section } from "../components";
import { ReferenceCode, ReferenceFilter, ReferencePagination, REFERENCE_PAGE_SIZE, useReferenceLanguage } from "../components/KnowledgeReference";
import catalog from "../data/generatedTokens.json";

const categories = [...new Set(catalog.tokens.map(item => item.category))].sort();
const uniqueNames = new Set(catalog.tokens.map(item => item.name)).size;

export function TokensReferencePage() {
  const { text } = useReferenceLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => catalog.tokens.filter(item =>
    (category === "all" || item.category === category) &&
    `${item.name} ${item.value} ${item.selector} ${item.conditions.join(" ")} ${item.sourceId}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [query, category]);

  return <Stack gap="xl" className="docs-reference">
    <Section title={text("Every definition, with its scope", "هر تعریف، همراه با محدودهٔ اثر")}
      description={text("The source inventory includes colors, spacing, sizes, typography, shape, motion, elevation and component variables. A repeated name is intentional: themes, radius modes and local selectors can redefine it.", "این فهرست رنگ، فاصله، اندازه، تایپوگرافی، رادیوس، حرکت، سایه و متغیرهای کامپوننت‌ها را پوشش می‌دهد. تکرار نام عمدی است: تم، حالت رادیوس و سلکتور محلی می‌توانند تعریف دیگری داشته باشند.")}>
      <p className="docs-prose">{text("Values below are original CSS expressions, not computed pixels. Keep var() relationships and semantic roles so scoped themes continue to work. Search a selector such as data-radius, a token name or a source path to inspect its definitions.", "مقادیر زیر عبارت اصلی CSS هستند، نه پیکسل محاسبه‌شده. ارتباط‌های var() و نقش‌های معنایی را حفظ کنید تا تم‌های محلی کار کنند. برای بررسی تعریف‌ها، سلکتوری مانند data-radius، نام توکن یا مسیر منبع را جست‌وجو کنید.")}</p>
      <p className="docs-reference-stat docs-prose">{uniqueNames} {text("unique variable names", "نام متغیر یکتا")} · {catalog.tokens.length} {text("scoped definitions", "تعریف با محدودهٔ اثر")}</p>
    </Section>
    <Section title={text("Token reference", "مرجع توکن‌ها")}>
      <div className="docs-reference-filters">
        <InputField label={text("Find a variable, value or selector", "جست‌وجوی متغیر، مقدار یا سلکتور")} type="search" placeholder="--vds-space-4, data-radius, duration…" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} />
        <ReferenceFilter label={text("Category", "دسته‌بندی")} value={category} onChange={value => { setCategory(value); setPage(0); }} options={[{ value: "all", label: text("All categories", "همهٔ دسته‌ها") }, ...categories.map(value => ({ value, label: value }))]} />
      </div>
      <Cluster gap="md">
        <span className="docs-reference-stat docs-prose" role="status">{filtered.length} / {catalog.tokens.length} {text("definitions", "تعریف")}</span>
        <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setCategory("all"); setPage(0); }}>{text("Reset filters", "پاک‌کردن فیلترها")}</Button>
      </Cluster>
      <div className="docs-reference-results">
        {filtered.slice(page * REFERENCE_PAGE_SIZE, (page + 1) * REFERENCE_PAGE_SIZE).map(item => <Card key={item.id} className="docs-reference-entry"><Stack gap="sm">
          <h3 dir="ltr"><VirtariInlineCode>{item.name}</VirtariInlineCode></h3>
          <ReferenceCode label={text("CSS reference", "ارجاع CSS")} code={`var(${item.name})`} />
          <VirtariCodeBlock renderer="static" language="css" code={`${item.name}: ${item.value};`} />
          <div className="docs-reference-meta">
            <span>{text("Category", "دسته")}: {item.category}</span>
            <span>{text("Selector", "سلکتور")}: <VirtariInlineCode dir="ltr">{item.selector || text("Top level", "سطح اصلی")}</VirtariInlineCode></span>
            {item.conditions.map((condition, index) => <VirtariInlineCode dir="ltr" key={index}>{condition}</VirtariInlineCode>)}
            <span dir="ltr">{item.sourceId}:{item.line}</span>
          </div>
        </Stack></Card>)}
      </div>
      {!filtered.length && <p className="docs-prose">{text("No matching definitions. Try another name or reset the filters.", "تعریف مرتبطی پیدا نشد. نام دیگری را امتحان کنید یا فیلترها را پاک کنید.")}</p>}
      <ReferencePagination page={page} count={filtered.length} onChange={setPage} />
    </Section>
  </Stack>;
}
