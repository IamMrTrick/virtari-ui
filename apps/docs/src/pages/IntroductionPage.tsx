import { Trans, useTranslation } from "react-i18next";
import { Badge } from "@virtari-packages/react-badge";
import { Section } from "../components";

export function IntroductionPage() {
  const { t } = useTranslation("introduction");

  return (
    <>
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
