import { useState } from "react";
import {
  Header,
  HeaderMain,
  HeaderStart,
  HeaderEnd,
} from "@virtari-packages/react-header";
import { IconMenu2, IconSettings } from "@virtari-packages/react-icons";
import { SettingsDrawer } from "./SettingsDrawer";
import type { RadiusMode, Direction } from "../App";

export function Layout({
  dark,
  onToggleDark,
  radius,
  onRadiusChange,
  direction,
  onDirectionChange,
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
  title: string;
  description: string;
  children: React.ReactNode;
  onToggleSidebar: () => void;
}) {
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
              aria-label="Toggle navigation sidebar"
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
              aria-label="Open settings"
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
      />
    </main>
  );
}
