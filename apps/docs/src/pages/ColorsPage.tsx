import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputField } from "@virtari-packages/react-input";
import { Button } from "@virtari-packages/react-button";
import { SegmentedControl, SegmentedControlItem } from "@virtari-packages/react-segmented-control";
import { Stack, Cluster } from "@virtari-packages/react-layout";
import { toast } from "@virtari-packages/react-toast";
import { Section } from "../components";
import { COLOR_GROUPS, COLOR_COUNT } from "../data/colorCatalog";

export function ColorsPage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const copy = (en: string, persian: string) => fa ? persian : en;
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("current");
  const [selection, setSelection] = useState("");
  const filtered = COLOR_GROUPS.map(group => ({ ...group, entries: group.entries.filter(entry => `${entry.token} ${entry.expression} ${group.kind}`.toLowerCase().includes(query.trim().toLowerCase())) })).filter(group => group.entries.length);
  const count = filtered.reduce((sum, group) => sum + group.entries.length, 0);
  const descriptions = {
    solid: copy("12-step scales: 1–2 backgrounds, 3–5 interactive surfaces, 6–8 boundaries, 9–10 solid fills, 11–12 text. Choose text/background pairs by contrast.", "طیف ۱۲ مرحله‌ای: ۱–۲ زمینه، ۳–۵ سطح تعاملی، ۶–۸ مرز، ۹–۱۰ رنگ پر و ۱۱–۱۲ متن. ترکیب متن و زمینه را با کنتراست انتخاب کنید."),
    alpha: copy("Transparent layers over a checkerboard. Neutral adapts to the theme; black and white stay fixed. Intent alphas follow their solid-9 color.", "لایه‌های شفاف روی زمینهٔ شطرنجی. Neutral با تم تغییر می‌کند؛ سیاه و سفید ثابت‌اند. آلفای هر رنگ از مرحلهٔ ۹ آن پیروی می‌کند."),
    semantic: copy("Purpose-based roles used by components, resolved against the selected theme and brand.", "رنگ‌های کاربردی مصرف‌شده در کامپوننت‌ها، هماهنگ با تم و برند انتخاب‌شده."),
    alias: copy("Existing compatibility and syntax-highlight tokens. Prefer canonical roles for new components; the old 50–950 scale is not a complete palette.", "توکن‌های سازگاری و هایلایت کد موجود. برای کامپوننت جدید نام‌های اصلی را ترجیح دهید؛ طیف قدیمی ۵۰–۹۵۰ پالت کامل نیست."),
  };
  return <Stack gap="xl">
    <p className="docs-prose">{copy("The complete color inventory, read directly from Virtari’s token source. Select a swatch to copy its CSS variable and inspect its rendered value.", "فهرست کامل رنگ‌ها، مستقیماً از منبع توکن‌های ویرتاری. هر نمونه را انتخاب کنید تا متغیر CSS کپی و مقدار نمایشی آن مشخص شود.")}</p>
    <Stack gap="md">
      <InputField label={copy("Find a color or token", "جست‌وجوی رنگ یا توکن")} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="primary, alpha, text, scrim…" />
      <Cluster gap="md">
        <SegmentedControl aria-label={copy("Palette preview theme", "تم پیش‌نمایش پالت")} value={theme} onValueChange={value => { setTheme(value); setSelection(""); }}>
          <SegmentedControlItem value="current">{copy("Current", "فعلی")}</SegmentedControlItem>
          <SegmentedControlItem value="light">{copy("Light", "روشن")}</SegmentedControlItem>
          <SegmentedControlItem value="dark">{copy("Dark", "تیره")}</SegmentedControlItem>
          <SegmentedControlItem value="dark-oled">OLED</SegmentedControlItem>
        </SegmentedControl>
        <span className="docs-prose" aria-live="polite">{count} / {COLOR_COUNT} {copy("tokens", "توکن")}</span>
      </Cluster>
      <p className="docs-palette-status" role="status" dir="auto">{selection || copy("Choose a swatch to inspect and copy it.", "یک نمونه را برای بررسی و کپی انتخاب کنید.")}</p>
    </Stack>
    <Section title={copy("Color catalog", "فهرست رنگ‌ها")}>
    <div className="docs-palette" data-theme={theme === "current" ? undefined : theme}>
      {filtered.map(group => <Stack as="section" key={group.id} gap="md">
        <h3 className="docs-palette-heading">{group.id === "compatibility" ? copy("Compatibility & syntax", "سازگاری و هایلایت کد") : group.id.replace(/-/g, " ").replace(/^./, char => char.toUpperCase())}</h3>
        <p className="docs-prose">{group.id === "anchors" ? copy("Absolute black and white, independent of theme.", "سیاه و سفید مطلق، مستقل از تم.") : descriptions[group.kind]}</p>
        <div className="docs-palette-grid" data-kind={group.kind}>
          {group.entries.map(entry => <Button key={entry.token} variant="ghost" color="contrast" className="docs-palette-swatch" data-color-token={entry.token} title={`${entry.token}\n${copy("Default definition", "تعریف پیش‌فرض")}: ${entry.expression}`} aria-label={`${copy("Copy", "کپی")} ${entry.token}`} onClick={async event => {
            const swatch = event.currentTarget.querySelector(".docs-palette-paint")!;
            const value = getComputedStyle(swatch).backgroundColor;
            try { await navigator.clipboard.writeText(`var(${entry.token})`); setSelection(`${copy("Copied", "کپی شد")}: var(${entry.token}) · ${value}`); toast.success(`${copy("Copied", "کپی شد")}: ${entry.token} · ${value}`); }
            catch { setSelection(`${entry.token} · ${value} · ${copy("Copy unavailable; select this text.", "کپی ممکن نبود؛ این متن را انتخاب کنید.")}`); }
          }}>
            <span className="docs-palette-checker" aria-hidden="true"><span className="docs-palette-paint" style={{ backgroundColor: `var(${entry.token})` }} /></span>
            <code dir="ltr">{entry.token.replace("--vds-color-", "")}</code>
          </Button>)}
        </div>
      </Stack>)}
      {!count && <p className="docs-prose">{copy("No matching colors. Try another token name.", "رنگی پیدا نشد؛ نام دیگری را امتحان کنید.")}</p>}
    </div>
    </Section>
  </Stack>;
}
