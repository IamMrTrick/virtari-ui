import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@virtari-packages/react-card";
import { Grid, Stack } from "@virtari-packages/react-layout";
import { InputField } from "@virtari-packages/react-input";
import { TextareaField } from "@virtari-packages/react-textarea";

/** Tone is inherited by all fields; the colored host remains part of the fill. */
export function FieldToneExample() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const label = (en: string, persian: string) => fa ? persian : en;
  return <Grid minItemWidth="15rem" gap="lg">
    {(["default", "strong"] as const).map(tone => <Card
      key={tone}
      data-surface-style="tonal"
      data-field-tone={tone}
      style={{ background: "var(--vds-color-primary-3)" }}
    >
      <CardHeader>
        <CardTitle>{tone === "default" ? label("Default fill", "سطح پیش‌فرض") : label("Deeper fill", "سطح یک پله قوی‌تر")}</CardTitle>
        <CardDescription>{tone === "default" ? label("A neutral field surface.", "سطح خنثی برای ورودی.") : label("A transparent layer over its parent color.", "یک لایهٔ شفاف روی رنگ زمینه.")}</CardDescription>
      </CardHeader>
      <CardContent><Stack gap="lg">
        <InputField label={label("Workspace", "فضای کاری")} defaultValue="Virtari Studio" />
        <TextareaField label={label("Description (optional)", "توضیحات (اختیاری)")} rows={2} placeholder={label("What is this space for?", "این فضا برای چیست؟")} />
      </Stack></CardContent>
    </Card>)}
  </Grid>;
}
