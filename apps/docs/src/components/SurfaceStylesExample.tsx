import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@virtari-packages/react-card";
import { Input } from "@virtari-packages/react-input";
import { Textarea } from "@virtari-packages/react-textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@virtari-packages/react-select";
import { Grid, Stack } from "@virtari-packages/react-layout";

/** Same component composition under each surface style; geometry stays shared. */
export function SurfaceStylesExample() {
  const { i18n } = useTranslation();
  const fa = i18n.language.startsWith("fa");
  const modes = [
    { id: "bordered", label: fa ? "بوردر" : "Bordered" },
    { id: "tonal", label: fa ? "بدون بوردر" : "Tonal" },
    { id: "elevated", label: fa ? "سایه" : "Shadow" },
  ];

  return (
    <Grid minItemWidth="15rem" gap="lg">
      {modes.map((mode) => (
        <div key={mode.id} data-surface-style={mode.id}>
          <Card>
            <CardHeader><CardTitle>{mode.label}</CardTitle></CardHeader>
            <CardContent>
              <Stack gap="md">
                <Input
                  aria-label={`${mode.label}: ${fa ? "نام" : "Name"}`}
                  placeholder={fa ? "نام پروژه" : "Project name"}
                />
                <Select defaultValue="team">
                  <SelectTrigger aria-label={`${mode.label}: ${fa ? "دسترسی" : "Access"}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-surface-style={mode.id}>
                    <SelectItem value="team">{fa ? "تیم" : "Team"}</SelectItem>
                    <SelectItem value="private">{fa ? "خصوصی" : "Private"}</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  aria-label={`${mode.label}: ${fa ? "توضیحات" : "Description"}`}
                  placeholder={fa ? "توضیحات" : "Description"}
                  rows={2}
                />
                <Card size="sm">
                  <CardContent>
                    {fa ? "سطح داخلی با گوشه‌های هماهنگ" : "Nested surface with coordinated corners"}
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </div>
      ))}
    </Grid>
  );
}
