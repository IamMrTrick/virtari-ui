import { useTranslation } from "react-i18next";
import { Button } from "@virtari-packages/react-button";
import { CodeBlock, type CodeLanguage } from "@virtari-packages/react-code";
import { Cluster } from "@virtari-packages/react-layout";
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

export function ReferenceCode({ code, label, language }: { code: string; label: string; language?: CodeLanguage }) {
  const { text } = useReferenceLanguage();
  const resolvedLanguage = language ?? (code.trim().startsWith("{") ? "json" : code.startsWith("pnpm") ? "shell" : code.includes("@import") || code.includes("--vds-") ? "css" : "plaintext");
  return <CodeBlock renderer="static" code={code} filename={label} language={resolvedLanguage} wrap size="sm"
    copyLabel={`${text("Copy", "کپی")} ${label}`} copiedLabel={text("Copied", "کپی شد")}
    copyErrorLabel={text("Copy failed; select and copy the code manually", "کپی ممکن نشد؛ متن کد را انتخاب و کپی کنید")} />;
}
