import type { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerBody,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@virtari-packages/react-drawer";
import { Button } from "@virtari-packages/react-button";
import { SegmentedControl, SegmentedControlItem } from "@virtari-packages/react-segmented-control";
import { Switch } from "@virtari-packages/react-switch";
import { IconSun, IconMoon } from "@virtari-packages/react-icons";
import type { RadiusMode, Direction } from "../App";
import { SUPPORTED_LOCALES, type Locale } from "../i18n";

const RADIUS_MODES: { value: RadiusMode; i18nKey: string }[] = [
  { value: "sharp", i18nKey: "settings.radiusSharp" },
  { value: "soft", i18nKey: "settings.radiusSoft" },
  { value: "round", i18nKey: "settings.radiusRound" },
  { value: "pill", i18nKey: "settings.radiusPill" },
];

const DIRECTIONS: { value: Direction; labelKey: string; hint: string }[] = [
  { value: "ltr", labelKey: "settings.dirLtr", hint: "English / Latin" },
  { value: "rtl", labelKey: "settings.dirRtl", hint: "\u0641\u0627\u0631\u0633\u06cc / \u0627\u0644\u0639\u0631\u0628\u06cc\u0629" },
];

const LOCALES: { value: Locale; i18nKey: string }[] = SUPPORTED_LOCALES.map(
  (value) => ({
    value,
    i18nKey: value === "fa" ? "settings.langPersian" : "settings.langEnglish",
  }),
);

const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

/* ──────────────────────────────────────────────
 * Section — labelled group of controls inside the drawer
 * ────────────────────────────────────────────── */
function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-settings-section">
      <header className="docs-settings-section-header">
        <h3 className="docs-settings-section-title">{label}</h3>
        {hint && <p className="docs-settings-section-hint">{hint}</p>}
      </header>
      {children}
    </section>
  );
}

/* ──────────────────────────────────────────────
 * Settings drawer — right-anchored panel with
 * language / direction / radius / theme controls.
 * ────────────────────────────────────────────── */
export function SettingsDrawer({
  open,
  onOpenChange,
  dark,
  onDarkChange,
  radius,
  onRadiusChange,
  direction,
  onDirectionChange,
  locale,
  onLocaleChange,
  microInteractions,
  onMicroInteractionsChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
  radius: RadiusMode;
  onRadiusChange: (radius: RadiusMode) => void;
  direction: Direction;
  onDirectionChange: (direction: Direction) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  microInteractions: boolean;
  onMicroInteractionsChange: (v: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(22rem, 90vw)"
      indicator="hidden"
      headerVariant="bordered"
      scaleBackground
    >
      <DrawerContent
        className="docs-settings-drawer"
        aria-label={t("settings.title")}
      >
        <DrawerHeader>
          <DrawerTitle className="docs-settings-title">
            {t("settings.title")}
          </DrawerTitle>
          <DrawerDescription style={srOnly}>
            {t("settings.description")}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="docs-settings-body">
          <Section label={t("settings.language")}>
            <SegmentedControl fullWidth value={locale} onValueChange={value => onLocaleChange(value as Locale)} aria-label={t("settings.language")}>
              {LOCALES.map(option => <SegmentedControlItem key={option.value} value={option.value}>{t(option.i18nKey)}</SegmentedControlItem>)}
            </SegmentedControl>
          </Section>
          <Section label={t("settings.direction")}>
            <SegmentedControl fullWidth value={direction} onValueChange={value => onDirectionChange(value as Direction)} aria-label={t("settings.direction")}>
              {DIRECTIONS.map(option => <SegmentedControlItem key={option.value} value={option.value}>{t(option.labelKey)}</SegmentedControlItem>)}
            </SegmentedControl>
          </Section>
          <Section label={t("settings.radius")}>
            <SegmentedControl fullWidth value={radius} onValueChange={value => onRadiusChange(value as RadiusMode)} aria-label={t("settings.radius")}>
              {RADIUS_MODES.map(option => <SegmentedControlItem key={option.value} value={option.value}>{t(option.i18nKey)}</SegmentedControlItem>)}
            </SegmentedControl>
          </Section>

          {/* ── Micro-interactions ── */}
          <Section label={t("settings.microInteractions")} hint={t("settings.microInteractionsHint")}>
            <label className="docs-settings-theme-toggle">
              <span className="docs-settings-theme-text">
                <span className="docs-settings-theme-label">
                  {locale === "fa" ? (microInteractions ? "فعال" : "غیرفعال") : (microInteractions ? "Enabled" : "Disabled")}
                </span>
              </span>
              <Switch
                checked={microInteractions}
                onCheckedChange={onMicroInteractionsChange}
                aria-label={t("settings.microInteractions")}
              />
            </label>
          </Section>

          {/* ── Theme ── */}
          <Section label={t("settings.theme")}>
            <label className="docs-settings-theme-toggle">
              <span className="docs-settings-theme-icon" aria-hidden="true">
                {dark ? (
                  <IconMoon size={18} stroke={1.75} />
                ) : (
                  <IconSun size={18} stroke={1.75} />
                )}
              </span>
              <span className="docs-settings-theme-text">
                <span className="docs-settings-theme-label">
                  {dark ? t("settings.themeDark") : t("settings.themeLight")}
                </span>
              </span>
              <Switch
                checked={dark}
                onCheckedChange={onDarkChange}
                aria-label={t("settings.themeDark")}
              />
            </label>
          </Section>
        </DrawerBody>
        <DrawerFooter className="docs-settings-footer">
          <DrawerClose asChild>
            <Button variant="outline">{t("sidebar.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
