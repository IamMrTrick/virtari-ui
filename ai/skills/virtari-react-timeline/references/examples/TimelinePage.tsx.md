# Original documentation page

Source ID: `apps/docs/src/pages/TimelinePage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import {
  IconArrowsExchange,
  IconBolt,
  IconBrush,
  IconCalendar,
  IconCheck,
  IconCircleCheck,
  IconCpu,
  IconCube,
  IconEdit,
  IconFileDescription,
  IconFileText,
  IconFilter,
  IconFlag,
  IconGitMerge,
  IconPalette,
  IconPencil,
  IconPhoto,
  IconRefresh,
  IconRocket,
  IconSparkles,
  IconUpload,
  IconVideo,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import {
  Timeline,
  TimelineBadge,
  TimelineCard,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineMedia,
  TimelineMeta,
  TimelineOppositeContent,
  TimelineTime,
  TimelineTitle,
} from "@virtari-packages/react-timeline";
import "@virtari-packages/react-timeline/styles";
import "@virtari-packages/react-timeline/tokens";
import { Section } from "../components";

type IconComponent = ComponentType<{
  size?: number;
  stroke?: number;
  "aria-hidden"?: boolean;
}>;

function TimelineIcon({ icon: Icon }: { icon: IconComponent }) {
  return <Icon size={16} stroke={2.1} aria-hidden />;
}

function Panel({
  title,
  actions,
  children,
  style,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...panelStyle, ...style }}>
      <div style={panelHeaderStyle}>
        <h3 style={panelTitleStyle}>{title}</h3>
        {actions && <div style={panelActionsStyle}>{actions}</div>}
      </div>
      {children}
    </div>
  );
}

function IconButton({ label, icon: Icon }: { label: string; icon: IconComponent }) {
  return (
    <button type="button" aria-label={label} title={label} style={iconButtonStyle}>
      <Icon size={16} stroke={2} aria-hidden />
    </button>
  );
}

function VersionPanel() {
  return (
    <Panel
      title="Versions"
      actions={
        <>
          <IconButton label="Filter versions" icon={IconFilter} />
          <IconButton label="Close versions" icon={IconX} />
        </>
      }
    >
      <div style={panelBodyStyle}>
        <Timeline connector="gap" variant="compact" density="compact" aria-label="Document versions">
          <TimelineItem status="active" tone="primary" effect="glow">
            <TimelineIndicator>
              <TimelineIcon icon={IconFileDescription} />
            </TimelineIndicator>
            <TimelineConnector />
            <TimelineContent>
              <TimelineCard style={selectedVersionStyle}>
                <div style={versionRowStyle}>
                  <div>
                    <TimelineTitle>New Version</TimelineTitle>
                    <TimelineTime dateTime="2024-08-30">Aug 30, 2024</TimelineTime>
                  </div>
                  <IconCheck size={18} stroke={2.4} aria-hidden />
                </div>
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem status="pending" tone="accent">
            <TimelineIndicator>
              <TimelineIcon icon={IconFileText} />
            </TimelineIndicator>
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>Version: 3.0</TimelineTitle>
              <TimelineMeta>
                <TimelineTime dateTime="2024-08-20">Aug 20, 2024</TimelineTime>
                <span>By Jane Cooper</span>
              </TimelineMeta>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem status="pending" tone="accent">
            <TimelineIndicator>
              <TimelineIcon icon={IconFileText} />
            </TimelineIndicator>
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>Version: 2.3</TimelineTitle>
              <TimelineMeta>
                <TimelineTime dateTime="2024-07-31">Jul 31, 2024</TimelineTime>
                <span>By Wade Warren</span>
              </TimelineMeta>

              <Timeline size="sm" connector="touch" variant="minimal" density="compact" aria-label="Minor versions">
                {[
                  ["Version: 2.2", "By Esther Howard"],
                  ["Version: 2.1", "By Jenny Wilson"],
                  ["Version: 2.0", "By Wade Warren"],
                ].map(([title, author], index) => (
                  <TimelineItem key={title} status="pending">
                    <TimelineIndicator>
                      <TimelineIcon icon={IconFileText} />
                    </TimelineIndicator>
                    {index < 2 && <TimelineConnector />}
                    <TimelineContent>
                      <TimelineTitle>{title}</TimelineTitle>
                      <TimelineMeta>
                        <TimelineTime dateTime="2024-07-31">Jul 31, 2024</TimelineTime>
                        <span>{author}</span>
                      </TimelineMeta>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem status="pending" tone="accent">
            <TimelineIndicator>
              <TimelineIcon icon={IconFileText} />
            </TimelineIndicator>
            <TimelineContent>
              <TimelineTitle>Version 1.0</TimelineTitle>
              <TimelineMeta>
                <TimelineTime dateTime="2024-06-20">Jun 20, 2024</TimelineTime>
                <span>By Robert Fox</span>
              </TimelineMeta>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </Panel>
  );
}

function ActivityPanel() {
  const items = [
    {
      icon: IconRefresh,
      tone: "warning" as const,
      title: "Kevin Dukkon changed status from Draft to In Progress",
      time: "19m ago",
      status: "active" as const,
    },
    {
      icon: IconEdit,
      tone: "accent" as const,
      title: "Monty Hayton created the Energy Charter Treaty",
      time: "Yesterday",
      status: "pending" as const,
    },
    {
      icon: IconPencil,
      tone: "info" as const,
      title: "Monty Hayton edited the Energy Charter Treaty",
      time: "Yesterday",
      status: "pending" as const,
    },
    {
      icon: IconGitMerge,
      tone: "primary" as const,
      title: "Monty Hayton merged Energy Charter Treaty V2.0 to the Supply Chain Transparency",
      time: "Yesterday",
      status: "pending" as const,
    },
    {
      icon: IconArrowsExchange,
      tone: "accent" as const,
      title: "Monty Hayton converted the treaty to Supply Chain Transparency",
      time: "Yesterday",
      status: "pending" as const,
    },
  ];

  return (
    <Panel
      title="Activity"
      actions={<IconButton label="Close activity" icon={IconX} />}
      style={{ maxBlockSize: "38rem", overflow: "hidden" }}
    >
      <div style={panelBodyStyle}>
        <Timeline size="sm" connector="gap" variant="minimal" density="compact" aria-label="Recent activity">
          {items.map((item, index) => (
            <TimelineItem
              key={item.title}
              status={item.status}
              tone={item.tone}
              effect={index === 0 ? "pulse" : "none"}
            >
              <TimelineIndicator>
                <TimelineIcon icon={item.icon} />
              </TimelineIndicator>
              {index < items.length - 1 && <TimelineConnector />}
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineTime>{item.time}</TimelineTime>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Panel>
  );
}

function CompanyTimeline() {
  const items = [
    ["2002-2005", IconRocket, "Company Started", "Founding team shipped the first product system and opened the first customer workflow."],
    ["2005-2009", IconWorld, "Website Launched", "Documentation, onboarding, and billing flows moved into a single public surface."],
    ["2009-2014", IconSparkles, "Made 100+ Themes", "Brand tokens, density modes, and motion presets became reusable across teams."],
    ["2014-till", IconFlag, "Launch Project", "A unified component contract made roadmap delivery predictable across releases."],
  ] as const;

  return (
    <Timeline
      align="center"
      connector="touch"
      variant="card"
      density="comfortable"
      aria-label="Company timeline"
      style={{ maxInlineSize: "52rem", marginInline: "auto" }}
    >
      {items.map(([date, icon, title, description], index) => (
        <TimelineItem
          key={date}
          status={index === 0 ? "complete" : "pending"}
          tone="info"
          effect={index === 0 ? "spotlight" : "none"}
        >
          <TimelineOppositeContent>
            <TimelineTime>{date}</TimelineTime>
          </TimelineOppositeContent>
          <TimelineIndicator>
            <TimelineIcon icon={icon} />
          </TimelineIndicator>
          {index < items.length - 1 && <TimelineConnector />}
          <TimelineContent>
            <TimelineTitle>{title}</TimelineTitle>
            <TimelineDescription>{description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

function ProjectionTimeline() {
  return (
    <Timeline
      align="alternate"
      connector="gap"
      line="solid"
      density="spacious"
      aria-label="Projection history"
      style={{ maxInlineSize: "46rem", marginInline: "auto" }}
    >
      <TimelineItem status="active" tone="danger" side="end" effect="glow">
        <TimelineOppositeContent>
          <TimelineBadge tone="danger">02 - 26</TimelineBadge>
        </TimelineOppositeContent>
        <TimelineIndicator>
          <TimelineIcon icon={IconCalendar} />
        </TimelineIndicator>
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>LENCO 1.0</TimelineTitle>
          <TimelineDescription>
            Lenco 1.0 launches, delivering core innovations right on schedule.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="pending" side="start">
        <TimelineOppositeContent>
          <TimelineBadge>11 - 25</TimelineBadge>
        </TimelineOppositeContent>
        <TimelineIndicator>
          <TimelineIcon icon={IconCpu} />
        </TimelineIndicator>
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>Mass Production</TimelineTitle>
          <TimelineDescription>
            The right teams can reach validated data exactly when needed.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem status="pending" tone="neutral">
        <TimelineOppositeContent>
          <TimelineBadge>08 - 25</TimelineBadge>
        </TimelineOppositeContent>
        <TimelineIndicator>
          <TimelineIcon icon={IconCube} />
        </TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>First Prototype</TimelineTitle>
          <TimelineDescription>
            Prototype grants access to essential features and release checks.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function LaunchTimeline() {
  const milestones = [
    ["Jan 20", IconRocket, "Start of Evaluation", "Preparation", "complete", "success"],
    ["Feb 14", IconCheck, "Initial Scoping", "Data checking", "complete", "success"],
    ["Mar 8", IconCircleCheck, "Validation", "Completed proof of concept", "active", "primary"],
    ["Apr 30", IconCheck, "Contracting", "Signed Contract", "pending", "info"],
    ["Jun 7", IconCheck, "Migration", "All information is migrated", "pending", "info"],
    ["Sep 16", IconWorld, "Global Launch", "In Asia, Australia, Latin America", "complete", "success"],
  ] as const;

  return (
    <Timeline
      orientation="horizontal"
      connector="touch"
      size="lg"
      density="compact"
      aria-label="Launch roadmap"
      style={{ inlineSize: "100%" }}
    >
      {milestones.map(([date, icon, title, description, status, tone], index) => (
        <TimelineItem
          key={date}
          status={status}
          tone={tone}
          effect={status === "active" ? "ping" : "none"}
        >
          <TimelineOppositeContent>
            <TimelineTime>{date}</TimelineTime>
          </TimelineOppositeContent>
          <TimelineIndicator>
            <TimelineIcon icon={icon} />
          </TimelineIndicator>
          {index < milestones.length - 1 && <TimelineConnector />}
          <TimelineContent>
            <TimelineTitle>{title}</TimelineTitle>
            <TimelineDescription>{description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

function AssetActivityTimeline() {
  return (
    <div style={activityShellStyle}>
      <div style={activityHeaderStyle}>
        <h3 style={activityTitleStyle}>Activity Timeline</h3>
        <button type="button" style={plainButtonStyle}>Show all</button>
      </div>

      <p style={groupLabelStyle}>THIS WEEK</p>
      <Timeline size="sm" connector="gap" variant="compact" density="compact" aria-label="This week activity">
        <TimelineItem status="pending" tone="neutral">
          <TimelineIndicator>
            <TimelineIcon icon={IconUpload} />
          </TimelineIndicator>
          <TimelineConnector />
          <TimelineContent>
            <TimelineTitle>LoRA Model M applied to 2 images</TimelineTitle>
            <TimelineMeta>Open gallery - 2 credits - LoRA M - Jan 27 at 9:32 AM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="active" tone="danger">
          <TimelineIndicator>
            <TimelineIcon icon={IconPhoto} />
          </TimelineIndicator>
          <TimelineConnector />
          <TimelineContent>
            <TimelineTitle>4 images were generated with Remix</TimelineTitle>
            <TimelineMedia>
              {["primary", "success", "danger", "warning"].map((tone) => (
                <span key={tone} style={thumbnailStyle(tone)} />
              ))}
            </TimelineMedia>
            <TimelineMeta>View prompt - 4 credits - 4K - Jan 27 at 9:30 AM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="pending" tone="info">
          <TimelineIndicator>
            <TimelineIcon icon={IconVideo} />
          </TimelineIndicator>
          <TimelineConnector />
          <TimelineContent>
            <TimelineTitle>1 video clip was generated with Storyboard and Loop</TimelineTitle>
            <TimelineMedia>
              <span style={wideThumbStyle("info")} />
            </TimelineMedia>
            <TimelineMeta>View prompt - 5 credits - 30s / HD - Jan 26 at 2:10 PM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="complete" tone="accent" effect="spotlight">
          <TimelineIndicator>
            <TimelineIcon icon={IconBolt} />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>Your plan has been upgraded to Ray Pro</TimelineTitle>
            <TimelineMeta>Manage plan - TXRGTA625 - Jan 26 at 10:00 AM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <p style={{ ...groupLabelStyle, marginBlockStart: "var(--vds-space-4)" }}>LAST WEEK</p>
      <Timeline size="sm" connector="gap" variant="compact" density="compact" aria-label="Last week activity">
        <TimelineItem status="pending" tone="warning">
          <TimelineIndicator>
            <TimelineIcon icon={IconPalette} />
          </TimelineIndicator>
          <TimelineConnector />
          <TimelineContent>
            <TimelineTitle>Color palette extracted from Van Gogh's The Starry Night</TimelineTitle>
            <TimelineMedia>
              {["primary", "info", "warning", "success", "neutral"].map((tone) => (
                <span key={tone} style={swatchStyle(tone)} />
              ))}
            </TimelineMedia>
            <TimelineMeta>Customize - 1 credit - Jan 22 at 2:22 AM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="pending" tone="accent">
          <TimelineIndicator>
            <TimelineIcon icon={IconBrush} />
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>1 mesh gradient was generated with Remix</TimelineTitle>
            <TimelineMedia>
              <span style={gradientThumbStyle} />
            </TimelineMedia>
            <TimelineMeta>View prompt - 1 credit - 4K - Jan 21 at 9:41 AM</TimelineMeta>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

function ConnectorEffectsDemo() {
  const steps = [
    ["Design review", "pulse", "primary"],
    ["API contract", "glow", "info"],
    ["Ready to ship", "spotlight", "success"],
  ] as const;

  return (
    <div style={effectsGridStyle}>
      {(["gap", "touch"] as const).map((connector) => (
        <div key={connector} style={effectsPanelStyle}>
          <p style={effectsLabelStyle}>connector = {connector}</p>
          <Timeline
            connector={connector}
            density="compact"
            variant="minimal"
            aria-label={`${connector} connector timeline`}
          >
            {steps.map(([title, effect, tone], index) => (
              <TimelineItem
                key={`${connector}-${title}`}
                status={index === 2 ? "complete" : index === 0 ? "active" : "pending"}
                tone={tone}
                effect={effect}
              >
                <TimelineIndicator>
                  <TimelineIcon icon={index === 2 ? IconCheck : IconSparkles} />
                </TimelineIndicator>
                {index < steps.length - 1 && <TimelineConnector />}
                <TimelineContent>
                  <TimelineTitle>{title}</TimelineTitle>
                  <TimelineMeta>{effect} effect</TimelineMeta>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ))}
    </div>
  );
}

export function TimelinePage() {
  return (
    <>
      <Section
        title="Timeline Patterns"
        description="Token-driven vertical feeds, version history, centered roadmaps, alternating history, and horizontal launch milestones."
      >
        <div style={heroGridStyle}>
          <VersionPanel />
          <ActivityPanel />
        </div>
      </Section>

      <Section
        title="Company Timeline"
        description="Centered timeline with date rail, cards, semantic tones, and a mobile collapse to a single rail."
      >
        <CompanyTimeline />
      </Section>

      <Section
        title="Dates Into Projection"
        description="Alternating editorial timeline with badges and compact story copy."
      >
        <ProjectionTimeline />
      </Section>

      <Section
        title="Launch Milestones"
        description="Horizontal roadmap that scrolls safely on narrow screens instead of squeezing text."
      >
        <div style={horizontalFrameStyle}>
          <LaunchTimeline />
        </div>
      </Section>

      <Section
        title="Connector Modes + Effects"
        description="Gap keeps the rail away from markers. Touch connects marker edge to marker edge. Effects are token-colored and reduced-motion safe."
      >
        <ConnectorEffectsDemo />
      </Section>

      <Section
        title="Activity Feed"
        description="Grouped activity timeline with thumbnails, swatches, metadata, and compact density."
      >
        <AssetActivityTimeline />
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@virtari-packages/react-timeline";
import "@virtari-packages/react-timeline/styles";

<Timeline
  orientation="vertical"      // vertical | horizontal
  align="alternate"           // start | center | alternate
  connector="gap"             // gap | touch
  variant="card"              // default | compact | card | minimal
  density="comfortable"       // compact | comfortable | spacious
  line="solid"                // solid | dashed | none
  size="md"                   // sm | md | lg
>
  <TimelineItem
    status="active"
    tone="primary"
    effect="pulse"            // none | pulse | glow | ping | spotlight
  >
    <TimelineOppositeContent>
      <TimelineTime dateTime="2026-02-26">02 - 26</TimelineTime>
    </TimelineOppositeContent>
    <TimelineIndicator />
    <TimelineConnector />
    <TimelineContent>
      <TimelineTitle>Launch Project</TimelineTitle>
      <TimelineDescription>Milestone details stay token-driven.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`} />
      </Section>
    </>
  );
}

const heroGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
  gap: "var(--vds-space-6)",
  alignItems: "start",
  inlineSize: "100%",
  minInlineSize: 0,
};

const panelStyle: CSSProperties = {
  boxSizing: "border-box",
  inlineSize: "100%",
  minInlineSize: 0,
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
  boxShadow: "var(--vds-shadow-lg)",
  overflow: "hidden",
};

const panelHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--vds-space-3)",
  minInlineSize: 0,
  padding: "var(--vds-space-4) var(--vds-space-5)",
  borderBlockEnd: "1px solid var(--vds-color-border-muted)",
};

const panelTitleStyle: CSSProperties = {
  margin: 0,
  minInlineSize: 0,
  fontSize: "var(--vds-text-base)",
  fontWeight: "var(--vds-font-weight-semibold)",
};

const panelActionsStyle: CSSProperties = {
  display: "inline-flex",
  flex: "none",
  gap: "var(--vds-space-2)",
};

const panelBodyStyle: CSSProperties = {
  minInlineSize: 0,
  overflow: "hidden",
  padding: "var(--vds-space-4) var(--vds-space-5)",
};

const iconButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  inlineSize: "2.25rem",
  blockSize: "2.25rem",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-element)",
  background: "var(--vds-color-surface)",
  color: "var(--vds-color-text-muted)",
  cursor: "pointer",
};

const selectedVersionStyle: CSSProperties = {
  background: "var(--vds-color-primary-bg-subtle)",
  borderColor: "var(--vds-color-border-primary)",
  boxShadow: "none",
};

const versionRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--vds-space-3)",
};

const horizontalFrameStyle: CSSProperties = {
  boxSizing: "border-box",
  inlineSize: "100%",
  minInlineSize: 0,
  padding: "var(--vds-space-4)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
  overflow: "hidden",
};

const effectsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  gap: "var(--vds-space-4)",
  maxInlineSize: "52rem",
};

const effectsPanelStyle: CSSProperties = {
  minInlineSize: 0,
  padding: "var(--vds-space-4)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
};

const effectsLabelStyle: CSSProperties = {
  margin: 0,
  marginBlockEnd: "var(--vds-space-3)",
  color: "var(--vds-color-text-muted)",
  fontSize: "var(--vds-text-xs)",
  fontFamily: "var(--vds-font-mono)",
};

const activityShellStyle: CSSProperties = {
  boxSizing: "border-box",
  inlineSize: "100%",
  maxInlineSize: "34rem",
  minInlineSize: 0,
  padding: "var(--vds-space-5)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
  boxShadow: "var(--vds-shadow-sm)",
};

const activityHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--vds-space-3)",
  marginBlockEnd: "var(--vds-space-4)",
};

const activityTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "var(--vds-text-lg)",
  fontWeight: "var(--vds-font-weight-semibold)",
};

const plainButtonStyle: CSSProperties = {
  border: 0,
  background: "transparent",
  color: "var(--vds-color-text-muted)",
  cursor: "pointer",
  font: "inherit",
  fontSize: "var(--vds-text-sm)",
};

const groupLabelStyle: CSSProperties = {
  margin: 0,
  marginBlockEnd: "var(--vds-space-3)",
  color: "var(--vds-color-primary-text)",
  fontSize: "var(--vds-text-xs)",
  fontWeight: "var(--vds-font-weight-bold)",
  letterSpacing: "var(--vds-tracking-wide)",
};

function thumbnailStyle(tone: string): CSSProperties {
  return {
    inlineSize: "2rem",
    blockSize: "2rem",
    marginInlineEnd: "-0.5rem",
    border: "2px solid var(--vds-color-surface)",
    borderRadius: "var(--vds-radius-card)",
    background: `linear-gradient(135deg, var(--vds-color-${tone}-bg), var(--vds-color-${tone}-solid))`,
    boxShadow: "var(--vds-shadow-xs)",
  };
}

function wideThumbStyle(tone: string): CSSProperties {
  return {
    inlineSize: "4.75rem",
    blockSize: "2.25rem",
    border: "1px solid var(--vds-color-border-muted)",
    borderRadius: "var(--vds-radius-card)",
    background: `radial-gradient(circle at 32% 40%, var(--vds-color-${tone}-solid), transparent 38%), var(--vds-color-${tone}-bg)`,
  };
}

function swatchStyle(tone: string): CSSProperties {
  return {
    inlineSize: "1.25rem",
    blockSize: "1.25rem",
    borderRadius: "var(--vds-radius-full)",
    background:
      tone === "neutral"
        ? "var(--vds-color-bg-inverse)"
        : `var(--vds-color-${tone}-solid)`,
    boxShadow: "0 0 0 2px var(--vds-color-surface)",
  };
}

const gradientThumbStyle: CSSProperties = {
  inlineSize: "5rem",
  blockSize: "2.75rem",
  borderRadius: "var(--vds-radius-card)",
  background:
    "linear-gradient(135deg, var(--vds-color-primary-solid), var(--vds-color-accent-solid), var(--vds-color-warning-solid))",
  boxShadow: "var(--vds-shadow-xs)",
};

```
