import { useState } from "react";
import {
  Button,
  type ButtonColor,
  type ButtonVariant,
  type ButtonSize,
} from "@virtari-packages/react-button";
import { ButtonGroup } from "@virtari-packages/react-button-group";
import { Input } from "@virtari-packages/react-input";
import { Tabs, TabsList, TabsTrigger } from "@virtari-packages/react-tabs";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
} from "@virtari-packages/react-icons";
import { Section, Row } from "../components";

const ALL_SIZES: ButtonSize[] = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
];
const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "soft"];
const COLORS: ButtonColor[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast",
];

const ICON_PROPS = {
  size: 16,
  stroke: 1.75,
  "aria-hidden": true as const,
  focusable: false as const,
};

function labelFor(s: ButtonSize) {
  return s.toUpperCase();
}

export function ButtonGroupPage() {
  const [range, setRange] = useState<"day" | "week" | "month">("week");
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [marks, setMarks] = useState<Record<"bold" | "italic" | "underline", boolean>>({
    bold: false,
    italic: false,
    underline: false,
  });

  return (
    <>
      <Section
        title="Size alignment with Button, Input, Tabs"
        description="Every control at size md is exactly 36px tall. Swap the size to see the whole row scale in lockstep."
      >
        {(["sm", "md", "lg", "xl", "2xl"] as ButtonSize[]).map((s) => (
          <Row key={s}>
            <span
              style={{
                inlineSize: "2.5rem",
                fontSize: "var(--vds-text-xs)",
                color: "var(--vds-color-text-muted)",
              }}
            >
              {labelFor(s)}
            </span>
            <Button size={s}>Button</Button>
            <Input
              inputSize={s === "3xl" ? "2xl" : s}
              placeholder="Input"
              style={{ inlineSize: "10rem" }}
            />
            <ButtonGroup size={s} variant="outline" attached>
              <Button>Day</Button>
              <Button>Week</Button>
              <Button>Month</Button>
            </ButtonGroup>
            <Tabs defaultValue="a">
              <TabsList size={s} variant="segmented">
                <TabsTrigger value="a">Tab A</TabsTrigger>
                <TabsTrigger value="b">Tab B</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        ))}
      </Section>

      <Section
        title="Sizes — full ramp"
        description="2xs → 3xl. Children inherit size from the group through context; they never need to be told."
      >
        {ALL_SIZES.map((s) => (
          <Row key={s}>
            <span
              style={{
                inlineSize: "2.5rem",
                fontSize: "var(--vds-text-xs)",
                color: "var(--vds-color-text-muted)",
              }}
            >
              {labelFor(s)}
            </span>
            <ButtonGroup size={s} variant="outline" attached>
              <Button>Low</Button>
              <Button>Med</Button>
              <Button>High</Button>
            </ButtonGroup>
          </Row>
        ))}
      </Section>

      <Section
        title="Variants — attached"
        description="Each variant from Button works inside ButtonGroup. The group owns the variant; every child renders with it."
      >
        {VARIANTS.map((v) => (
          <Row key={v}>
            <span
              style={{
                inlineSize: "4rem",
                fontSize: "var(--vds-text-xs)",
                color: "var(--vds-color-text-muted)",
              }}
            >
              {v}
            </span>
            <ButtonGroup variant={v} attached>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Row>
        ))}
      </Section>

      <Section
        title="Colors — attached"
        description="All seven Button colors work the same inside a group."
      >
        {COLORS.map((c) => (
          <Row key={c}>
            <span
              style={{
                inlineSize: "5rem",
                fontSize: "var(--vds-text-xs)",
                color: "var(--vds-color-text-muted)",
              }}
            >
              {c}
            </span>
            <ButtonGroup color={c} variant="solid" attached>
              <Button>A</Button>
              <Button>B</Button>
              <Button>C</Button>
            </ButtonGroup>
          </Row>
        ))}
      </Section>

      <Section
        title="Attached vs spaced"
        description="Flip the attached prop. Attached collapses inner radii and shares the 1px border; spaced keeps each button standalone with gap."
      >
        <Row>
          <span style={{ inlineSize: "5rem", fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
            attached
          </span>
          <ButtonGroup variant="outline" attached>
            <Button>Draft</Button>
            <Button>Review</Button>
            <Button>Publish</Button>
          </ButtonGroup>
        </Row>
        <Row>
          <span style={{ inlineSize: "5rem", fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
            spaced
          </span>
          <ButtonGroup variant="outline">
            <Button>Draft</Button>
            <Button>Review</Button>
            <Button>Publish</Button>
          </ButtonGroup>
        </Row>
      </Section>

      <Section
        title="Orientation — vertical"
        description="orientation=&quot;vertical&quot; + attached stacks the group along the block axis with collapsed top/bottom radii."
      >
        <Row>
          <ButtonGroup orientation="vertical" variant="outline" attached>
            <Button leftSection={<IconAlignLeft {...ICON_PROPS} />}>Left</Button>
            <Button leftSection={<IconAlignCenter {...ICON_PROPS} />}>Center</Button>
            <Button leftSection={<IconAlignRight {...ICON_PROPS} />}>Right</Button>
          </ButtonGroup>
        </Row>
      </Section>

      <Section
        title="Full width"
        description="Each child gets equal flex basis inside a full-width group — good for toolbars that must span a card."
      >
        <div style={{ inlineSize: "min(32rem, 100%)" }}>
          <ButtonGroup variant="outline" attached fullWidth>
            <Button>Daily</Button>
            <Button>Weekly</Button>
            <Button>Monthly</Button>
            <Button>Yearly</Button>
          </ButtonGroup>
        </div>
      </Section>

      <Section
        title="Pressed state — single selection (aria-pressed)"
        description="The group doesn't track state itself; wire aria-pressed and a color swap on the active child. Works with context colors/variants."
      >
        <Row>
          <ButtonGroup variant="outline" attached>
            {(["day", "week", "month"] as const).map((r) => (
              <Button
                key={r}
                aria-pressed={range === r}
                color={range === r ? "primary" : undefined}
                variant={range === r ? "solid" : undefined}
                onClick={() => setRange(r)}
              >
                {r[0].toUpperCase() + r.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
          <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
            active: {range}
          </span>
        </Row>

        <Row>
          <ButtonGroup variant="ghost" attached aria-label="Alignment">
            {(
              [
                ["left", IconAlignLeft],
                ["center", IconAlignCenter],
                ["right", IconAlignRight],
              ] as const
            ).map(([v, Icon]) => (
              <Button
                key={v}
                aria-pressed={align === v}
                variant={align === v ? "soft" : undefined}
                onClick={() => setAlign(v)}
                aria-label={`Align ${v}`}
              >
                <Icon {...ICON_PROPS} />
              </Button>
            ))}
          </ButtonGroup>
          <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
            active: {align}
          </span>
        </Row>
      </Section>

      <Section
        title="Pressed state — multi selection"
        description="Same idea, multi-toggle — a classic rich-text toolbar."
      >
        <Row>
          <ButtonGroup variant="ghost" attached aria-label="Text formatting">
            {(
              [
                ["bold", IconBold],
                ["italic", IconItalic],
                ["underline", IconUnderline],
              ] as const
            ).map(([k, Icon]) => (
              <Button
                key={k}
                aria-pressed={marks[k]}
                variant={marks[k] ? "soft" : undefined}
                onClick={() =>
                  setMarks((m) => ({ ...m, [k]: !m[k] }))
                }
                aria-label={k}
              >
                <Icon {...ICON_PROPS} />
              </Button>
            ))}
          </ButtonGroup>
          <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
            {Object.entries(marks)
              .filter(([, on]) => on)
              .map(([k]) => k)
              .join(", ") || "none"}
          </span>
        </Row>
      </Section>

      <Section
        title="Prop precedence"
        description="Own props win over context. Here the group sets variant=outline, but one child overrides to solid+primary to stand out."
      >
        <Row>
          <ButtonGroup variant="outline" attached>
            <Button>Cancel</Button>
            <Button>Save draft</Button>
            <Button variant="solid" color="primary">
              Publish
            </Button>
          </ButtonGroup>
        </Row>
      </Section>
    </>
  );
}
