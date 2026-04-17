import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Avatar } from "@virtari/react-avatar";
import { Button } from "@virtari/react-button";
import { Checkbox } from "@virtari/react-checkbox";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type Direction,
  type DrawerHeaderVariant,
  type DrawerIndicatorPlacement,
  type DrawerOpenState,
  type DrawerSizeMode,
  type DrawerSnapBehavior,
} from "@virtari/react-drawer";
import { Input } from "@virtari/react-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari/react-select";
import { Switch } from "@virtari/react-switch";
import { Textarea } from "@virtari/react-textarea";
import { Section } from "../components";

const CARD_STYLE = {
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-xl)",
  background: "color-mix(in oklch, var(--vds-color-surface), transparent 4%)",
} satisfies CSSProperties;

type SelectOption = { value: string; label: string };

const DIRECTION_OPTIONS: SelectOption[] = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const SIZE_MODE_OPTIONS: SelectOption[] = [
  { value: "adaptive", label: "Adaptive" },
  { value: "full", label: "Full" },
  { value: "fixed", label: "Fixed" },
];

const SNAP_BEHAVIOR_OPTIONS: SelectOption[] = [
  { value: "staged", label: "Staged" },
  { value: "closest", label: "Closest" },
];

const INDICATOR_OPTIONS: SelectOption[] = [
  { value: "inside", label: "Inside" },
  { value: "outside", label: "Outside" },
  { value: "hidden", label: "Hidden" },
];

const HEADER_OPTIONS: SelectOption[] = [
  { value: "plain", label: "Plain" },
  { value: "bordered", label: "Bordered" },
];

function parsePositiveNumber(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeNumber(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function formatDrawerSize(value: number): string {
  if (value <= 1) return `${Math.round(value * 100)}%`;
  return `${Math.round(value)}px`;
}

function formatOffset(value: number): string {
  return value > 0 ? `${Math.round(value)}px` : "0";
}

function quoteIfNeeded(value: string): string {
  return /^[a-z0-9_.-]+$/i.test(value) ? value : `"${value}"`;
}

function buildPlaygroundCode(args: {
  direction: Direction;
  sizeMode: DrawerSizeMode;
  fixedSize: string;
  offset: number;
  indicator: DrawerIndicatorPlacement;
  headerVariant: DrawerHeaderVariant;
  dragHandleOnly: boolean;
  scaleBackground: boolean;
  dismissible: boolean;
  snapBehavior: DrawerSnapBehavior;
  openStates: readonly DrawerOpenState[];
  minimizedState: { id: string; size: number } | null;
}): string {
  const {
    direction,
    sizeMode,
    fixedSize,
    offset,
    indicator,
    headerVariant,
    dragHandleOnly,
    scaleBackground,
    dismissible,
    snapBehavior,
    openStates,
    minimizedState,
  } = args;

  const lines = [
    "<Drawer",
    `  direction=${quoteIfNeeded(direction)}`,
    `  sizeMode=${quoteIfNeeded(sizeMode)}`,
    `  openStates={[`,
    ...openStates.map((state) => `    { id: ${quoteIfNeeded(state.id)}, size: ${state.size} },`),
    "  ]}",
  ];

  if (sizeMode === "fixed") {
    lines.push(`  size=${quoteIfNeeded(fixedSize)}`);
  }
  if (offset > 0) {
    lines.push(`  offset={${offset}}`);
  }
  if (minimizedState) {
    lines.push(
      `  minimizedState={{ id: ${quoteIfNeeded(minimizedState.id)}, size: ${minimizedState.size} }}`,
    );
  }
  if (indicator !== "inside") {
    lines.push(`  indicator=${quoteIfNeeded(indicator)}`);
  }
  if (headerVariant !== "plain") {
    lines.push(`  headerVariant=${quoteIfNeeded(headerVariant)}`);
  }
  if (snapBehavior !== "staged") {
    lines.push(`  snapBehavior=${quoteIfNeeded(snapBehavior)}`);
  }
  if (dragHandleOnly) {
    lines.push("  dragHandleOnly");
  }
  if (scaleBackground) {
    lines.push("  scaleBackground");
  }
  if (!dismissible) {
    lines.push("  dismissible={false}");
  }

  lines.push(">");
  lines.push("  <DrawerTrigger asChild>");
  lines.push("    <Button>Open drawer</Button>");
  lines.push("  </DrawerTrigger>");
  lines.push("  <DrawerContent>");
  lines.push("    <DrawerHeader>");
  lines.push("      <DrawerHandle />");
  lines.push("      <DrawerTitle>Drawer</DrawerTitle>");
  lines.push("      <DrawerDescription>Named stages + edge offset.</DrawerDescription>");
  lines.push("    </DrawerHeader>");
  lines.push("    <DrawerBody>{/* content */}</DrawerBody>");
  lines.push("    <DrawerFooter>{/* actions */}</DrawerFooter>");
  lines.push("  </DrawerContent>");
  lines.push("</Drawer>");

  return lines.join("\n");
}

function ControlField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-2)",
        minInlineSize: 0,
      }}
    >
      <span style={{ fontSize: "var(--vds-text-xs)", fontWeight: "var(--vds-font-weight-semibold)" }}>
        {label}
      </span>
      {children}
      {hint && (
        <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-subtle)" }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function SelectField({
  value,
  onValueChange,
  options,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function StatCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        ...CARD_STYLE,
        padding: "var(--vds-space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-2)",
        minInlineSize: "12rem",
        flex: "1 1 12rem",
      }}
    >
      <span style={{ fontSize: "0.6875rem", color: "var(--vds-color-text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {eyebrow}
      </span>
      <strong style={{ fontSize: "var(--vds-text-sm)" }}>{title}</strong>
      <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>{children}</span>
    </div>
  );
}

function RecipeCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        ...CARD_STYLE,
        padding: "var(--vds-space-5)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-4)",
        flex: "1 1 16rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
        <strong>{title}</strong>
        <p style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>{description}</p>
      </div>
      {children}
    </div>
  );
}

export function DrawerPage() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const [direction, setDirection] = useState<Direction>("bottom");
  const [sizeMode, setSizeMode] = useState<DrawerSizeMode>("adaptive");
  const [snapBehavior, setSnapBehavior] = useState<DrawerSnapBehavior>("staged");
  const [indicator, setIndicator] = useState<DrawerIndicatorPlacement>("outside");
  const [headerVariant, setHeaderVariant] = useState<DrawerHeaderVariant>("bordered");
  const [dragHandleOnly, setDragHandleOnly] = useState(false);
  const [scaleBackground, setScaleBackground] = useState(true);
  const [dismissible, setDismissible] = useState(true);
  const [minimizedEnabled, setMinimizedEnabled] = useState(true);
  const [fixedSize, setFixedSize] = useState("32rem");
  const [offsetInput, setOffsetInput] = useState("24");
  const [peekInput, setPeekInput] = useState("0.34");
  const [comfortableInput, setComfortableInput] = useState("0.68");
  const [fullInput, setFullInput] = useState("1");
  const [minimizedInput, setMinimizedInput] = useState("76");
  const [activeOpenState, setActiveOpenState] = useState<string | null>("comfortable");

  const openStates = useMemo<DrawerOpenState[]>(() => {
    const states: DrawerOpenState[] = [
      { id: "peek", label: "Peek", size: parsePositiveNumber(peekInput, 0.34) },
      { id: "comfortable", label: "Comfortable", size: parsePositiveNumber(comfortableInput, 0.68) },
      { id: "full", label: "Full", size: parsePositiveNumber(fullInput, 1) },
    ];
    return [...states].sort((a, b) => a.size - b.size);
  }, [comfortableInput, fullInput, peekInput]);

  const minimizedState = useMemo(
    () => minimizedEnabled
      ? {
        id: "minimized",
        label: "Minimized",
        size: parsePositiveNumber(minimizedInput, 76),
      }
      : null,
    [minimizedEnabled, minimizedInput],
  );

  const offset = useMemo(
    () => parseNonNegativeNumber(offsetInput, 24),
    [offsetInput],
  );

  const activeStateLabel = useMemo(() => {
    if (activeOpenState === minimizedState?.id) return minimizedState.label;
    return openStates.find((state) => state.id === activeOpenState)?.label ?? "Comfortable";
  }, [activeOpenState, minimizedState, openStates]);

  const generatedCode = useMemo(() => buildPlaygroundCode({
    direction,
    sizeMode,
    fixedSize,
    offset,
    indicator,
    headerVariant,
    dragHandleOnly,
    scaleBackground,
    dismissible,
    snapBehavior,
    openStates,
    minimizedState: minimizedState ? { id: minimizedState.id, size: minimizedState.size } : null,
  }), [
    direction,
    dismissible,
    dragHandleOnly,
    fixedSize,
    headerVariant,
    indicator,
    minimizedState,
    offset,
    openStates,
    scaleBackground,
    sizeMode,
    snapBehavior,
  ]);

  useEffect(() => {
    const validIds = new Set([
      ...openStates.map((state) => state.id),
      ...(minimizedState ? [minimizedState.id] : []),
    ]);

    if (activeOpenState && validIds.has(activeOpenState)) return;
    setActiveOpenState(openStates[1]?.id ?? openStates[0]?.id ?? minimizedState?.id ?? null);
  }, [activeOpenState, minimizedState, openStates]);

  return (
    <>
      <Section
        title="Configurator"
        description="Recommended API: name your open stages, add edge offset when you need a floating sheet, and control indicator/header chrome declaratively."
      >
        <div
          data-vds-drawer-wrapper
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "calc(var(--vds-radius-xl) + var(--vds-space-1))",
            border: "1px solid var(--vds-color-border-muted)",
            background:
              "radial-gradient(circle at top left, color-mix(in oklch, var(--vds-color-primary-500), transparent 82%), transparent 38%), radial-gradient(circle at bottom right, color-mix(in oklch, var(--vds-color-info-500), transparent 88%), transparent 42%), linear-gradient(180deg, color-mix(in oklch, var(--vds-color-bg-subtle), white 2%), var(--vds-color-surface))",
            boxShadow: "var(--vds-shadow-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--vds-space-6)",
              alignItems: "stretch",
              padding: "var(--vds-space-6)",
            }}
          >
            <div style={{ flex: "1 1 22rem", display: "flex", flexDirection: "column", gap: "var(--vds-space-5)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--vds-color-primary-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Professional Surface
                </span>
                <h3 style={{ fontSize: "var(--vds-text-2xl)", lineHeight: "var(--vds-leading-tight)" }}>
                  Tune the drawer in one place, then drag it like a real product surface.
                </h3>
                <p style={{ maxInlineSize: "40rem", fontSize: "var(--vds-text-sm)", lineHeight: "var(--vds-leading-relaxed)", color: "var(--vds-color-text-muted)" }}>
                  This playground drives the actual component API. Change the stage sizes, indicator placement, header chrome, fixed sizing, or edge offset and the generated code below updates with it.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-3)" }}>
                {openStates.map((state) => (
                  <button
                    key={state.id}
                    type="button"
                    onClick={() => setActiveOpenState(state.id)}
                    style={{
                      border: activeOpenState === state.id
                        ? "1px solid color-mix(in oklch, var(--vds-color-primary-400), transparent 25%)"
                        : "1px solid var(--vds-color-border-muted)",
                      background: activeOpenState === state.id
                        ? "color-mix(in oklch, var(--vds-color-primary-500), transparent 88%)"
                        : "color-mix(in oklch, var(--vds-color-surface), transparent 2%)",
                      color: "inherit",
                      borderRadius: "var(--vds-radius-full)",
                      padding: "0.45rem 0.8rem",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    {state.label} · {formatDrawerSize(state.size)}
                  </button>
                ))}
                {minimizedState && (
                  <button
                    type="button"
                    onClick={() => setActiveOpenState(minimizedState.id)}
                    style={{
                      border: activeOpenState === minimizedState.id
                        ? "1px solid color-mix(in oklch, var(--vds-color-warning-400), transparent 12%)"
                        : "1px dashed var(--vds-color-border)",
                      background: activeOpenState === minimizedState.id
                        ? "color-mix(in oklch, var(--vds-color-warning-500), transparent 90%)"
                        : "transparent",
                      color: "inherit",
                      borderRadius: "var(--vds-radius-full)",
                      padding: "0.45rem 0.8rem",
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    {minimizedState.label} · {formatDrawerSize(minimizedState.size)}
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-3)" }}>
                <StatCard eyebrow="Current" title={activeStateLabel}>
                  {direction} / {sizeMode} / {snapBehavior}
                </StatCard>
                <StatCard eyebrow="Chrome" title={`${indicator} indicator`}>
                  Header: {headerVariant}, offset: {formatOffset(offset)}
                </StatCard>
                <StatCard eyebrow="Interaction" title={dragHandleOnly ? "Handle only" : "Surface drag"}>
                  {dismissible ? "Dismissible" : "Persistent"} · {scaleBackground ? "Background scale on" : "Background scale off"}
                </StatCard>
              </div>

              <Drawer
                direction={direction}
                sizeMode={sizeMode}
                size={sizeMode === "fixed" ? fixedSize : undefined}
                offset={offset}
                indicator={indicator}
                headerVariant={headerVariant}
                openStates={openStates}
                activeOpenState={activeOpenState}
                onActiveOpenStateChange={setActiveOpenState}
                minimizedState={minimizedState ?? undefined}
                snapBehavior={snapBehavior}
                dragHandleOnly={dragHandleOnly}
                scaleBackground={scaleBackground}
                dismissible={dismissible}
              >
                <DrawerTrigger asChild>
                  <Button>Open Configured Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerHandle />
                    <DrawerTitle>Checkout Workspace</DrawerTitle>
                    <DrawerDescription>
                      Stage this drawer as a floating action sheet, a dense side rail, or a full-height workspace without touching custom CSS.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <div style={{ display: "grid", gap: "var(--vds-space-4)" }}>
                      <div
                        style={{
                          ...CARD_STYLE,
                          padding: "var(--vds-space-4)",
                          display: "grid",
                          gap: "var(--vds-space-3)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                          <div>
                            <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>
                              Shipping Workspace
                            </p>
                            <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                              Current state: {activeStateLabel}
                            </p>
                          </div>
                          <Avatar fallback="JD" />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-2)" }}>
                          {openStates.map((state) => (
                            <Button
                              key={state.id}
                              variant={activeOpenState === state.id ? "soft" : "outline"}
                              size="sm"
                              onClick={() => setActiveOpenState(state.id)}
                            >
                              {state.label}
                            </Button>
                          ))}
                          {minimizedState && (
                            <Button
                              variant={activeOpenState === minimizedState.id ? "soft" : "outline"}
                              size="sm"
                              onClick={() => setActiveOpenState(minimizedState.id)}
                            >
                              Minimize
                            </Button>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                        <div style={{ display: "grid", gap: "var(--vds-space-1)" }}>
                          <label htmlFor="drawer-playground-name" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                            Workspace name
                          </label>
                          <Input id="drawer-playground-name" placeholder="Northstar rollout" />
                        </div>
                        <div style={{ display: "grid", gap: "var(--vds-space-1)" }}>
                          <label htmlFor="drawer-playground-owner" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                            Owner
                          </label>
                          <Input id="drawer-playground-owner" placeholder="Jordan Diaz" />
                        </div>
                        <div style={{ display: "grid", gap: "var(--vds-space-1)" }}>
                          <label htmlFor="drawer-playground-notes" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                            Notes
                          </label>
                          <Textarea id="drawer-playground-notes" rows={4} placeholder="Add constraints, shipping notes, or internal context..." />
                        </div>
                        <label style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
                          <Checkbox id="drawer-playground-lock" />
                          <span style={{ fontSize: "var(--vds-text-sm)" }}>Require approval before publishing</span>
                        </label>
                      </div>
                    </div>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" fullWidth>Close</Button>
                    </DrawerClose>
                    <Button fullWidth>Save Workspace</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            <div
              style={{
                ...CARD_STYLE,
                flex: "0 1 24rem",
                padding: "var(--vds-space-5)",
                display: "grid",
                gap: "var(--vds-space-4)",
                alignSelf: "stretch",
              }}
            >
              <div style={{ display: "grid", gap: "var(--vds-space-3)", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))" }}>
                <ControlField label="Direction">
                  <SelectField
                    value={direction}
                    onValueChange={(value) => setDirection(value as Direction)}
                    options={DIRECTION_OPTIONS}
                    placeholder="Select direction"
                  />
                </ControlField>

                <ControlField label="Size mode">
                  <SelectField
                    value={sizeMode}
                    onValueChange={(value) => setSizeMode(value as DrawerSizeMode)}
                    options={SIZE_MODE_OPTIONS}
                    placeholder="Select size mode"
                  />
                </ControlField>

                <ControlField label="Indicator">
                  <SelectField
                    value={indicator}
                    onValueChange={(value) => setIndicator(value as DrawerIndicatorPlacement)}
                    options={INDICATOR_OPTIONS}
                    placeholder="Select indicator"
                  />
                </ControlField>

                <ControlField label="Header chrome">
                  <SelectField
                    value={headerVariant}
                    onValueChange={(value) => setHeaderVariant(value as DrawerHeaderVariant)}
                    options={HEADER_OPTIONS}
                    placeholder="Select header style"
                  />
                </ControlField>

                <ControlField label="Snap behavior">
                  <SelectField
                    value={snapBehavior}
                    onValueChange={(value) => setSnapBehavior(value as DrawerSnapBehavior)}
                    options={SNAP_BEHAVIOR_OPTIONS}
                    placeholder="Select snap behavior"
                  />
                </ControlField>

                <ControlField label="Edge offset" hint="Numeric px gap from the opening edge.">
                  <Input value={offsetInput} onChange={(event) => setOffsetInput(event.target.value)} />
                </ControlField>

                <ControlField label="Fixed size" hint="Used only when size mode is fixed.">
                  <Input value={fixedSize} onChange={(event) => setFixedSize(event.target.value)} />
                </ControlField>

                <ControlField label="Minimized size" hint="Pre-close rest state.">
                  <Input value={minimizedInput} onChange={(event) => setMinimizedInput(event.target.value)} />
                </ControlField>

                <ControlField label="Peek stage">
                  <Input value={peekInput} onChange={(event) => setPeekInput(event.target.value)} />
                </ControlField>

                <ControlField label="Comfortable stage">
                  <Input value={comfortableInput} onChange={(event) => setComfortableInput(event.target.value)} />
                </ControlField>

                <ControlField label="Full stage">
                  <Input value={fullInput} onChange={(event) => setFullInput(event.target.value)} />
                </ControlField>
              </div>

              <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <span style={{ fontSize: "var(--vds-text-sm)" }}>Enable minimized stage</span>
                  <Switch checked={minimizedEnabled} onCheckedChange={setMinimizedEnabled} />
                </label>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <span style={{ fontSize: "var(--vds-text-sm)" }}>Drag from handle only</span>
                  <Switch checked={dragHandleOnly} onCheckedChange={setDragHandleOnly} />
                </label>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <span style={{ fontSize: "var(--vds-text-sm)" }}>Scale background</span>
                  <Switch checked={scaleBackground} onCheckedChange={setScaleBackground} />
                </label>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <span style={{ fontSize: "var(--vds-text-sm)" }}>Dismissible</span>
                  <Switch checked={dismissible} onCheckedChange={setDismissible} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <pre className="docs-code">{generatedCode}</pre>
      </Section>

      <Section
        title="Design Model"
        description="Use the semantic API for authored experiences, then drop down to low-level snap control only when you truly need it."
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-3)" }}>
          <StatCard eyebrow="Stages" title="openStates">
            Named stages wrap the existing snap engine, so your product code can talk in terms like <code>peek</code>, <code>comfortable</code>, and <code>full</code> instead of raw numbers.
          </StatCard>
          <StatCard eyebrow="Positioning" title="offset">
            A single prop creates a floating sheet or inset side panel without hacking margins or overriding transforms by hand.
          </StatCard>
          <StatCard eyebrow="Chrome" title="indicator + headerVariant">
            Move the drag indicator inside, outside, or hide it entirely, and flip the header between plain and bordered without custom selectors.
          </StatCard>
        </div>
      </Section>

      <Section
        title="Recipes"
        description="A few concrete patterns that map cleanly to the new prop surface."
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vds-space-3)" }}>
          <RecipeCard
            title="Floating Action Sheet"
            description="Bottom sheet that never hugs the viewport edge and keeps a visible external handle."
          >
            <Drawer
              offset={20}
              indicator="outside"
              headerVariant="bordered"
              openStates={[
                { id: "peek", size: 0.38 },
                { id: "full", size: 1 },
              ]}
              minimizedState={{ id: "minimized", size: 72 }}
            >
              <DrawerTrigger asChild>
                <Button variant="outline">Open Action Sheet</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHandle />
                  <DrawerTitle>Quick Transfer</DrawerTitle>
                  <DrawerDescription>Floating mobile sheet with a small lift from the bottom edge.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
                    <Input placeholder="Recipient" />
                    <Input placeholder="Amount" />
                    <Input placeholder="Transfer note" />
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" fullWidth>Cancel</Button>
                  </DrawerClose>
                  <Button fullWidth>Review</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </RecipeCard>

          <RecipeCard
            title="Navigation Rail"
            description="Side drawer with an external grabber and plain header chrome for app navigation."
          >
            <Drawer
              direction="left"
              sizeMode="fixed"
              size="22rem"
              indicator="outside"
              headerVariant="plain"
              openStates={[
                { id: "compact", size: 300 },
                { id: "wide", size: 352 },
              ]}
              defaultOpenState="wide"
            >
              <DrawerTrigger asChild>
                <Button variant="outline">Open Navigation</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHandle />
                  <DrawerTitle>Workspace Nav</DrawerTitle>
                  <DrawerDescription>Plain header keeps the chrome quiet while the grabber stays discoverable.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <div style={{ display: "grid", gap: "var(--vds-space-2)" }}>
                    {["Overview", "Deployments", "Projects", "Billing", "Security"].map((item) => (
                      <Button key={item} variant="ghost" style={{ justifyContent: "flex-start" }}>
                        {item}
                      </Button>
                    ))}
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </RecipeCard>

          <RecipeCard
            title="Dense Review Panel"
            description="Right-side fixed workspace with bordered header and hidden indicator for pointer-heavy desktop flows."
          >
            <Drawer
              direction="right"
              sizeMode="fixed"
              size="30rem"
              indicator="hidden"
              headerVariant="bordered"
              openStates={[
                { id: "review", size: 420 },
                { id: "expanded", size: 480 },
              ]}
              defaultOpenState="review"
            >
              <DrawerTrigger asChild>
                <Button variant="outline">Open Review Panel</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHandle />
                  <DrawerTitle>Review Queue</DrawerTitle>
                  <DrawerDescription>Hide the indicator when the surface already reads like a desktop panel.</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <div style={{ display: "grid", gap: "var(--vds-space-4)" }}>
                    {[
                      { name: "Ari", copy: "Updated payment flow copy" },
                      { name: "Lena", copy: "Uploaded revised motion comps" },
                      { name: "Noah", copy: "Requested QA sign-off" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        style={{
                          ...CARD_STYLE,
                          padding: "var(--vds-space-3)",
                          display: "flex",
                          gap: "var(--vds-space-3)",
                          alignItems: "flex-start",
                        }}
                      >
                        <Avatar fallback={item.name[0]} size="sm" />
                        <div>
                          <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>{item.name}</p>
                          <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>{item.copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </RecipeCard>
        </div>
      </Section>

      <Section
        title="Low-Level Snap Control"
        description="The old numeric API still works when you want direct values instead of semantic stage ids."
      >
        <Drawer
          snapPoints={[0.45, 0.8, 1]}
          defaultSnapPoint={0.8}
          minimizedSize={76}
          snapBehavior="staged"
        >
          <DrawerTrigger asChild>
            <Button variant="soft">Open Numeric Snap Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader variant="bordered">
              <DrawerHandle placement="inside" />
              <DrawerTitle>Numeric Snappoints</DrawerTitle>
              <DrawerDescription>
                Use <code>snapPoints</code>, <code>defaultSnapPoint</code>, and <code>minimizedSize</code> when your product already stores the raw values.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div style={{ display: "grid", gap: "var(--vds-space-4)" }}>
                <div style={{ display: "grid", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-settings-display-name" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Display Name
                  </label>
                  <Input id="drawer-settings-display-name" name="displayName" placeholder="Your name" />
                </div>
                <div style={{ display: "grid", gap: "var(--vds-space-1)" }}>
                  <label htmlFor="drawer-settings-email" style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                    Email Address
                  </label>
                  <Input id="drawer-settings-email" name="settingsEmail" placeholder="you@example.com" type="email" />
                </div>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <div>
                    <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Push Notifications</p>
                    <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>Receive updates on your device.</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </label>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--vds-space-3)" }}>
                  <div>
                    <p style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>Marketing Emails</p>
                    <p style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>Receive release notes and feature roundups.</p>
                  </div>
                  <Switch checked={marketing} onCheckedChange={setMarketing} />
                </label>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" fullWidth>Cancel</Button>
              </DrawerClose>
              <Button fullWidth>Save Settings</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "@virtari/react-drawer";

// Recommended semantic API
<Drawer
  direction="bottom"
  sizeMode="adaptive"
  offset={24}
  indicator="outside"
  headerVariant="bordered"
  openStates={[
    { id: "peek", size: 0.34 },
    { id: "comfortable", size: 0.68 },
    { id: "full", size: 1 },
  ]}
  defaultOpenState="comfortable"
  minimizedState={{ id: "minimized", size: 76 }}
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Order Summary</DrawerTitle>
      <DrawerDescription>Named stages keep product code readable.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* content */}</DrawerBody>
    <DrawerFooter>{/* actions */}</DrawerFooter>
  </DrawerContent>
</Drawer>

// Low-level numeric API stays available
<Drawer
  direction="right"
  sizeMode="fixed"
  size="30rem"
  snapPoints={[320, 420, 520]}
  defaultSnapPoint={420}
  minimizedSize={72}
  indicator="hidden"
/>`}</pre>
      </Section>
    </>
  );
}
