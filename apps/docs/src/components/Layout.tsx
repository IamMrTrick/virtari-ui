import { Switch } from "@virtari/react-switch";
import type { RadiusMode } from "../App";

const RADIUS_MODES: { value: RadiusMode; label: string }[] = [
  { value: "sharp", label: "Sharp" },
  { value: "soft", label: "Soft" },
  { value: "round", label: "Round" },
  { value: "pill", label: "Pill" },
];

export function Layout({
  dark,
  onToggleDark,
  radius,
  onRadiusChange,
  title,
  description,
  children,
  onToggleSidebar,
}: {
  dark: boolean;
  onToggleDark: (v: boolean) => void;
  radius: RadiusMode;
  onRadiusChange: (v: RadiusMode) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  onToggleSidebar: () => void;
}) {
  return (
    <main className="docs-main">
      <header className="docs-header">
        <div className="docs-header-start">
          <button
            className="docs-sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>
          <div>
            <h1 className="docs-header-title">{title}</h1>
            <p className="docs-header-description">{description}</p>
          </div>
        </div>
        <div className="docs-header-actions">
          <div className="docs-toolbar">
            <div className="docs-toolbar-group">
              <span className="docs-toolbar-label">Radius</span>
              <div className="docs-radius-switcher">
                {RADIUS_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    className="docs-radius-option"
                    data-active={radius === mode.value || undefined}
                    onClick={() => onRadiusChange(mode.value)}
                  >
                    <span
                      className="docs-radius-preview"
                      data-mode={mode.value}
                    />
                    <span className="docs-radius-option-label">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="docs-toolbar-divider" />
            <div className="docs-toolbar-group">
              <span className="docs-toolbar-label">Dark</span>
              <Switch checked={dark} onCheckedChange={onToggleDark} size="sm" />
            </div>
          </div>
        </div>
      </header>
      <div className="docs-content">{children}</div>
    </main>
  );
}
