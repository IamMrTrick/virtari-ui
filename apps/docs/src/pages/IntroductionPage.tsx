import { Trans, useTranslation } from "react-i18next";
import { Badge } from "@virtari-packages/react-badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@virtari-packages/react-card";
import { Grid, Cluster, Stack } from "@virtari-packages/react-layout";
import { Button } from "@virtari-packages/react-button";
import { IconPalette, IconLayout, IconTypography, IconArrowRight } from "@virtari-packages/react-icons";
import { Section } from "../components";

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
            <CardContent><Button asChild size="sm" variant="ghost"><a href={href(principle.path)}>{label("Explore", "مشاهده")}<IconArrowRight className="docs-directional-icon" size={16}/></a></Button></CardContent>
          </Card>)}
        </Grid>
      </Section>
      <Section title={t("whatIs.title")}>
        <p className="docs-prose">
          {/* `components` positional map — <1>/<2>/<3> = <strong>, <4> = <code>.
              i18next renders translated chunks between these markers. */}
          <Trans
            ns="introduction"
            i18nKey="whatIs.body"
            components={[
              <strong key="0" />,
              <strong key="1" />,
              <strong key="2" />,
              <code key="3" />,
            ]}
          />
        </p>
      </Section>

      <Section title={t("cssFeatures.title")}>
        <div className="docs-row" style={{ flexWrap: "wrap" }}>
          {/* Tech-feature names are kept in English by convention even in
              Persian — they\u2019re canonical CSS identifiers. */}
          <Badge>CSS Nesting</Badge>
          <Badge>@layer</Badge>
          <Badge>color-mix()</Badge>
          <Badge>:has()</Badge>
          <Badge>@property</Badge>
          <Badge>Container Queries</Badge>
          <Badge>OKLCH Colors</Badge>
          <Badge>Logical Properties</Badge>
          <Badge>@custom-media</Badge>
        </div>
      </Section>

      <Section title={t("quickStart.title")}>
        <pre className="docs-code">{t("quickStart.snippet")}</pre>
      </Section>

      <Section title={t("architecture.title")}>
        <pre className="docs-code">{t("architecture.snippet")}</pre>
      </Section>
    </>
  );
}
