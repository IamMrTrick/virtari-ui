import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Header,
  HeaderMain,
  HeaderStart,
  HeaderEnd,
} from "@virtari-packages/react-header";
import { IconMenu2, IconSettings } from "@virtari-packages/react-icons";
import { SettingsDrawer } from "./SettingsDrawer";
import type { RadiusMode, Direction } from "../App";
import type { Locale } from "../i18n";

export function Layout({
  dark,
  onToggleDark,
  radius,
  onRadiusChange,
  direction,
  onDirectionChange,
  locale,
  onLocaleChange,
  microInteractions,
  onMicroInteractionsChange,
  title,
  description,
  children,
  onToggleSidebar,
}: {
  dark: boolean;
  onToggleDark: (v: boolean) => void;
  radius: RadiusMode;
  onRadiusChange: (v: RadiusMode) => void;
  direction: Direction;
  onDirectionChange: (v: Direction) => void;
  locale: Locale;
  onLocaleChange: (v: Locale) => void;
  microInteractions: boolean;
  onMicroInteractionsChange: (v: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  onToggleSidebar: () => void;
}) {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="docs-main">
      <Header className="docs-header" stickyOffset="0px">
        <HeaderMain
          sticky="always"
          background="subtle"
          height="xl"
          gutter="lg"
          width="full"
          contained={false}
        >
          <HeaderStart>
            <button
              type="button"
              className="docs-sidebar-toggle"
              onClick={onToggleSidebar}
              aria-label={t("layout.toggleSidebar")}
            >
              <IconMenu2 size={20} stroke={1.5} aria-hidden focusable={false} />
            </button>
            <div className="docs-header-titles">
              <h1 className="docs-header-title">{title}</h1>
              <p className="docs-header-description">{description}</p>
            </div>
          </HeaderStart>

          <HeaderEnd>
            <button
              type="button"
              className="docs-settings-trigger"
              onClick={() => setSettingsOpen(true)}
              aria-label={t("settings.open")}
              aria-expanded={settingsOpen}
            >
              <IconSettings size={20} stroke={1.5} aria-hidden focusable={false} />
            </button>
          </HeaderEnd>
        </HeaderMain>
      </Header>

      <div className="docs-content">{children}</div>

      <SettingsDrawer
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        dark={dark}
        onDarkChange={onToggleDark}
        radius={radius}
        onRadiusChange={onRadiusChange}
        direction={direction}
        onDirectionChange={onDirectionChange}
        locale={locale}
        onLocaleChange={onLocaleChange}
        microInteractions={microInteractions}
        onMicroInteractionsChange={onMicroInteractionsChange}
      />
    </main>
  );
}
