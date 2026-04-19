import type { CSSProperties, ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  DrawerDescription,
} from "@virtari-packages/react-drawer";
import { Switch } from "@virtari-packages/react-switch";
import { IconSun, IconMoon } from "@virtari-packages/react-icons";
import type { RadiusMode, Direction } from "../App";

const RADIUS_MODES: { value: RadiusMode; label: string }[] = [
  { value: "sharp", label: "Sharp" },
  { value: "soft", label: "Soft" },
  { value: "round", label: "Round" },
  { value: "pill", label: "Pill" },
];

const DIRECTIONS: { value: Direction; label: string; hint: string }[] = [
  { value: "ltr", label: "LTR", hint: "English / Latin" },
  { value: "rtl", label: "RTL", hint: "فارسی / العربية" },
];

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
 * direction / radius / theme controls.
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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
  radius: RadiusMode;
  onRadiusChange: (radius: RadiusMode) => void;
  direction: Direction;
  onDirectionChange: (direction: Direction) => void;
}) {
  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(22rem, 90vw)"
      scaleBackground
    >
      <DrawerContent className="docs-settings-drawer" aria-label="Settings">
        <DrawerHeader>
          <DrawerTitle className="docs-settings-title">Settings</DrawerTitle>
          <DrawerDescription style={srOnly}>
            Configure direction, radius and theme.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="docs-settings-body">
          {/* ── Direction ── */}
          <Section
            label="Direction"
            hint="Mirror the layout. Logical properties make every component adapt."
          >
            <div
              className="docs-settings-segmented"
              role="radiogroup"
              aria-label="Text direction"
            >
              {DIRECTIONS.map((d) => {
                const active = direction === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    data-active={active || undefined}
                    className="docs-settings-segmented-option"
                    onClick={() => onDirectionChange(d.value)}
                  >
                    <span className="docs-settings-segmented-label">{d.label}</span>
                    <span className="docs-settings-segmented-hint">{d.hint}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* ── Radius ── */}
          <Section
            label="Radius"
            hint="Corner roundness cascades through every component via the radii token tier."
          >
            <div
              className="docs-settings-radius"
              role="radiogroup"
              aria-label="Corner radius"
            >
              {RADIUS_MODES.map((mode) => {
                const active = radius === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    data-active={active || undefined}
                    className="docs-settings-radius-option"
                    onClick={() => onRadiusChange(mode.value)}
                  >
                    <span
                      className="docs-settings-radius-preview"
                      data-mode={mode.value}
                      aria-hidden="true"
                    />
                    <span className="docs-settings-radius-label">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* ── Theme ── */}
          <Section label="Theme" hint="OKLCH palette — semantic tokens auto-invert.">
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
                  {dark ? "Dark mode" : "Light mode"}
                </span>
                <span className="docs-settings-theme-hint">
                  Tap to switch to {dark ? "light" : "dark"}.
                </span>
              </span>
              <Switch
                checked={dark}
                onCheckedChange={onDarkChange}
                aria-label="Dark mode"
              />
            </label>
          </Section>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
