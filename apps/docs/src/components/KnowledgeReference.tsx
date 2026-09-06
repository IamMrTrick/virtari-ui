import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@virtari-packages/react-button";
import { IconCopy } from "@virtari-packages/react-icons";
import { Stack, Cluster } from "@virtari-packages/react-layout";
import { Select, SelectField, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@virtari-packages/react-select";
import "../styles/knowledge-reference.css";

export const REFERENCE_PAGE_SIZE = 24;

export function useReferenceLanguage() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  return { fa, text: (en: string, persian: string) => fa ? persian : en };
}

export function ReferenceFilter({ label, value, onChange, options }: {
  label: string; value: string; onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return <SelectField label={label}>
    {({ controlId, describedBy }) => <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={controlId} aria-describedby={describedBy}><SelectValue /></SelectTrigger>
      <SelectContent>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
    </Select>}
  </SelectField>;
}

export function ReferencePagination({ page, count, onChange }: {
  page: number; count: number; onChange: (page: number) => void;
}) {
  const { text } = useReferenceLanguage();
  const pages = Math.max(1, Math.ceil(count / REFERENCE_PAGE_SIZE));
  return <Cluster className="docs-reference-pagination" gap="md" role="group" aria-label={text("Result pages", "صفحه‌های نتایج")}>
    <Button variant="outline" size="sm" disabled={page === 0} onClick={() => onChange(page - 1)}>{text("Previous", "قبلی")}</Button>
    <span aria-live="polite">{text(`Page ${page + 1} of ${pages}`, `صفحهٔ ${page + 1} از ${pages}`)}</span>
    <Button variant="outline" size="sm" disabled={page >= pages - 1} onClick={() => onChange(page + 1)}>{text("Next", "بعدی")}</Button>
  </Cluster>;
}

export function ReferenceCode({ code, label }: { code: string; label: string }) {
  const [status, setStatus] = useState("");
  const { text } = useReferenceLanguage();
  return <Stack gap="xs" className="docs-reference-code-group">
    <Cluster className="docs-reference-code-heading" gap="sm">
      <span>{label}</span>
      <Button variant="ghost" color="contrast" size="xs" aria-label={`${text("Copy", "کپی")} ${label}`} onClick={async () => {
        try { await navigator.clipboard.writeText(code); setStatus(text("Copied", "کپی شد")); }
        catch { setStatus(text("Clipboard unavailable. Select and copy the text below.", "کپی خودکار ممکن نیست. متن زیر را انتخاب و کپی کنید.")); }
      }}><IconCopy size={14} aria-hidden />{text("Copy", "کپی")}</Button>
    </Cluster>
    <pre className="docs-code docs-reference-code" dir="ltr"><code>{code}</code></pre>
    {status && <span className="docs-reference-muted" role="status">{status}</span>}
  </Stack>;
}
