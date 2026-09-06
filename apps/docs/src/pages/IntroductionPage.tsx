import { CodeBlock as VirtariCodeBlock, InlineCode } from "@virtari-packages/react-code";
import { Trans, useTranslation } from "react-i18next";
import { Badge } from "@virtari-packages/react-badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@virtari-packages/react-card";
import { Grid, Cluster, Stack } from "@virtari-packages/react-layout";
import { Button } from "@virtari-packages/react-button";
import { IconPalette, IconLayout, IconTypography, IconArrowRight } from "@virtari-packages/react-icons";
import { Section } from "../components";
import { SurfaceStylesExample } from "../components/SurfaceStylesExample";
import { FieldToneExample } from "../components/FieldToneExample";

export function IntroductionPage() {
  const { t, i18n } = useTranslation("introduction");
  const fa = i18n.language.startsWith("fa");
  const label = (en: string, persian: string) => fa ? persian : en;
  const href = (page: string) => fa ? `#/fa/${page}` : `#/${page}`;
  const principles = [
    { icon: <IconPalette size={24}/>, title: label("Color with purpose", "رنگ هدفمند"), body: label("Tonal surfaces create hierarchy. Primary color marks the action and the current destination.", "سطوح رنگی سلسله‌مراتب می‌سازند؛ رنگ اصلی، اقدام و مقصد فعال را مشخص می‌کند."), path: "colors" },
    { icon: <IconLayout size={24}/>, title: label("A shared rhythm", "ریتم مشترک"), body: label("Space follows relationships: tight within a control, generous between groups. Components do the work.", "فاصله از رابطه می‌آید: کم درون کنترل، بیشتر میان گروه‌ها. این قواعد در کامپوننت‌ها مشترک‌اند."), path: "composition" },
    { icon: <IconTypography size={24}/>, title: label("Every script belongs", "جا برای هر زبان"), body: label("Centered line boxes, logical spacing, and flexible controls give every script room to breathe.", "خطوط متن وسط‌چین، فاصله‌گذاری منطقی و کنترل‌های منعطف، به هر خط و زبان فضای کافی می‌دهند."), path: "typography" },
  ];

  return (
    <>
      <Card variant="soft" size="lg" className="docs-language-hero">
        <CardContent><Stack gap="lg">
          <Badge color="primary" variant="soft">{label("The Virtari design language", "زبان طراحی ویرتاری")}</Badge>
          <p className="docs-language-statement">{label("Expressive by nature.\nConsistent by design.", "بیانی زنده.\nطراحی یکپارچه.")}</p>
          <p className="docs-prose">{label("Inspired by Material’s clarity, shaped by Virtari. One foundation for surfaces, typography, space, and motion — composed from the components you use.", "با الهام از وضوح متریال و با هویت ویرتاری. مبنایی مشترک برای سطح، تایپوگرافی، فاصله و حرکت؛ ساخته‌شده از همان کامپوننت‌هایی که استفاده می‌کنید.")}</p>
          <Cluster><Button asChild rightSection={<IconArrowRight className="docs-directional-icon" size={18}/>}><a href={href("colors")}>{label("Explore foundations", "کشف مبانی")}</a></Button><Button asChild color="contrast" variant="ghost"><a href={href("button")}>{label("Browse components", "مرور کامپوننت‌ها")}</a></Button></Cluster>
        </Stack></CardContent>
      </Card>
      <Section title={label("Principles in practice", "اصول در عمل")}>
        <Grid className="docs-principles-grid" gap="md" minItemWidth="13rem">
          {principles.map(principle => <Card key={principle.path} variant="soft" className="docs-principle-card">
            <CardHeader><span className="docs-principle-icon" aria-hidden="true">{principle.icon}</span><CardTitle>{principle.title}</CardTitle><CardDescription>{principle.body}</CardDescription></CardHeader>
            <CardContent><Button asChild size="sm" variant="ghost" rightSection={<IconArrowRight className="docs-directional-icon" size={16}/>}><a href={href(principle.path)}>{label("Explore", "مشاهده")}</a></Button></CardContent>
          </Card>)}
        </Grid>
      </Section>
      <Section title={label("Three surface styles, one system", "سه سبک سطح، یک سیستم")}>
        <p className="docs-prose">{label("The same fields and nested cards in each style. Change radius in Settings to compare their shape together.", "همان ورودی‌ها و کارت‌های تو‌در‌تو در هر سه سبک. با تغییر رادیوس در تنظیمات، شکل همه را هم‌زمان مقایسه کنید.")}</p>
        <SurfaceStylesExample/>
      </Section>
      <Section title={label("Fields on colored surfaces", "ورودی‌ها روی سطوح رنگی")}
        description={label("Field tone works independently from border, shadow and radius. A deeper transparent fill retains the color of its container.", "شدت رنگ ورودی مستقل از بوردر، سایه و رادیوس است. سطح شفاف قوی‌تر، رنگ ظرف خودش را حفظ می‌کند.")}>
        <FieldToneExample />
        <VirtariCodeBlock renderer="static" language="tsx" code={'<Card data-surface-style="tonal" data-field-tone="strong">\n  <CardContent>\n    <InputField label="Workspace" />\n  </CardContent>\n</Card>'} />
        <p className="docs-prose">{label("Use visible labels and connected help, then test contrast against your actual background. Stronger contrast preferences restore clear control boundaries.", "از برچسب قابل‌مشاهده و راهنمای متصل استفاده کنید و کنتراست را روی زمینهٔ واقعی بسنجید. تنظیم کنتراست بیشتر، مرز کنترل‌ها را واضح‌تر می‌کند.")}</p>
        <Cluster>
          <Button asChild variant="soft" rightSection={<IconArrowRight className="docs-directional-icon" />}><a href={href("guidelines")}>{label("Read the interaction guidelines", "راهنمای طراحی تعامل")}</a></Button>
          <Button asChild variant="ghost" color="contrast"><a href={href("brand")}>{label("Explore the Virtari identity", "هویت بصری ویرتاری")}</a></Button>
        </Cluster>
      </Section>
      <Section title={t("whatIs.title")}>
        <p className="docs-prose">
          <Trans
            ns="introduction"
            i18nKey="whatIs.body"
            components={{
              1: <strong />,
              2: <strong />,
              3: <strong />,
              4: <InlineCode />,
            }}
          />
        </p>
      </Section>

      <Section title={t("cssFeatures.title")}>
        <div className="docs-row" style={{ flexWrap: "wrap" }}>
          <Badge>CSS Nesting</Badge>
          <Badge>@layer</Badge>
          <Badge>color-mix()</Badge>
          <Badge>:has()</Badge>
          <Badge>@property</Badge>
          <Badge>Container Queries</Badge>
          <Badge>OKLCH Colors</Badge>
          <Badge>Logical Properties</Badge>
          <Badge>Responsive Queries</Badge>
        </div>
      </Section>

      <Section title={t("quickStart.title")} description={t("quickStart.description")}>
        <VirtariCodeBlock renderer="static" language="shell" filename={label("Add editable source", "افزودن سورس قابل‌ویرایش")} code="pnpm dlx virtari@latest init\npnpm dlx virtari@latest add button" />
        <VirtariCodeBlock renderer="static" language="tsx" filename="App.tsx" code={'import "./virtari/styles/index.css";\nimport { Button } from "./virtari/components/button";\n\nexport function App() {\n  return <Button variant="outline">Continue</Button>;\n}'} />
        <Button asChild variant="soft" rightSection={<IconArrowRight className="docs-directional-icon" size={16}/>}><a href={href("installation")}>{label("Read the installation guide", "مشاهدهٔ راهنمای نصب")}</a></Button>
      </Section>

      <Section title={t("architecture.title")}>
        <VirtariCodeBlock renderer="static" language="plaintext" code={t("architecture.snippet")} />
      </Section>
    </>
  );
}
