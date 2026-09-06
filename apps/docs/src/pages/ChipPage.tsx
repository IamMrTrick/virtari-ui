import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { Chip, ChipIcon, ChipLabel, ChipRemove } from "@virtari-packages/react-chip";
import { Avatar } from "@virtari-packages/react-avatar";
import { Input } from "@virtari-packages/react-input";
import {
  IconCheck,
  IconStar,
  IconHeart,
  IconFlame,
  IconTag,
  IconX,
  IconMapPin,
  IconCalendar,
  IconWorld,
  IconShoppingCart,
  IconFilter,
  IconPalette,
  IconCode,
  IconSparkles,
  IconPlus,
  IconSearch,
  IconClock,
} from "@virtari-packages/react-icons";
import { Section, Row, Stack } from "../components";

/* ─── Chip (filter) — controlled on/off state ─── */
function FilterChip({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <Chip
      asChild
      variant={on ? "primary" : "default"}
      appearance={on ? "solid" : "outline"}
      interactive
    >
      <button type="button" onClick={() => setOn((v) => !v)} aria-pressed={on}>
        {on && (
          <ChipIcon>
            <IconCheck size={14} stroke={2.25} />
          </ChipIcon>
        )}
        <ChipLabel>{label}</ChipLabel>
      </button>
    </Chip>
  );
}

/* ─── Tokenized tag input — removable chips + quick-add ─── */
function TagInput() {
  const [tags, setTags] = useState<string[]>([
    "react",
    "typescript",
    "design-system",
  ]);
  const [draft, setDraft] = useState("");

  function commit() {
    const t = draft.trim().toLowerCase();
    if (!t || tags.includes(t)) {
      setDraft("");
      return;
    }
    setTags((prev) => [...prev, t]);
    setDraft("");
  }

  function remove(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--vds-space-2)",
        padding: "var(--vds-space-2) var(--vds-space-3)",
        border: "1px solid var(--vds-color-border)",
        borderRadius: "var(--vds-radius-card, 0.5rem)",
        background: "var(--vds-color-surface)",
        maxInlineSize: "32rem",
      }}
    >
      {tags.map((tag) => (
        <Chip key={tag} variant="primary" size="sm">
          <ChipLabel>{tag}</ChipLabel>
          <ChipRemove
            aria-label={`Remove ${tag}`}
            onClick={() => remove(tag)}
          />
        </Chip>
      ))}
      <Input
        inputSize="sm"
        placeholder={tags.length ? "Add tag…" : "Type and press Enter"}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
          } else if (e.key === "Backspace" && !draft && tags.length) {
            remove(tags[tags.length - 1]);
          }
        }}
        style={{
          flex: 1,
          minInlineSize: "8rem",
          border: 0,
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        }}
      />
    </div>
  );
}

/* ─── Multi-select filter bar — toggleable category chips ─── */
const CATEGORIES = [
  { id: "all", label: "All", icon: <IconWorld size={14} /> },
  { id: "design", label: "Design", icon: <IconPalette size={14} /> },
  { id: "engineering", label: "Engineering", icon: <IconCode size={14} /> },
  { id: "product", label: "Product", icon: <IconSparkles size={14} /> },
  { id: "trending", label: "Trending", icon: <IconFlame size={14} /> },
] as const;

function CategoryFilter() {
  const [active, setActive] = useState<string>("all");
  return (
    <Row>
      {CATEGORIES.map((c) => {
        const on = active === c.id;
        return (
          <Chip
            key={c.id}
            asChild
            variant={on ? "primary" : "default"}
            appearance={on ? "solid" : "soft"}
            interactive
          >
            <button
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={on}
            >
              <ChipIcon>{c.icon}</ChipIcon>
              <ChipLabel>{c.label}</ChipLabel>
            </button>
          </Chip>
        );
      })}
    </Row>
  );
}

/* ─── Active filters bar — e-commerce style ─── */
function ActiveFilters() {
  const [filters, setFilters] = useState<{ key: string; label: string }[]>([
    { key: "size-m", label: "Size: M" },
    { key: "color-black", label: "Color: Black" },
    { key: "price-0-100", label: "Under $100" },
    { key: "in-stock", label: "In stock" },
  ]);

  if (!filters.length) {
    return (
      <p style={{ color: "var(--vds-color-text-muted)", margin: 0 }}>
        No filters applied.
      </p>
    );
  }

  return (
    <Row>
      <Chip size="sm" variant="info" appearance="outline">
        <ChipIcon>
          <IconFilter size={12} stroke={2} />
        </ChipIcon>
        <ChipLabel>{filters.length} filters</ChipLabel>
      </Chip>
      {filters.map((f) => (
        <Chip key={f.key} size="sm" variant="default">
          <ChipLabel>{f.label}</ChipLabel>
          <ChipRemove
            aria-label={`Remove ${f.label}`}
            onClick={() =>
              setFilters((prev) => prev.filter((p) => p.key !== f.key))
            }
          />
        </Chip>
      ))}
      <Chip
        asChild
        size="sm"
        variant="danger"
        appearance="outline"
        interactive
      >
        <button type="button" onClick={() => setFilters([])}>
          <ChipIcon>
            <IconX size={12} stroke={2.25} />
          </ChipIcon>
          <ChipLabel>Clear all</ChipLabel>
        </button>
      </Chip>
    </Row>
  );
}

export function ChipPage() {
  return (
    <>
      {/* ─── Variants ─────────────────────────────────────── */}
      <Section
        title="Variants"
        description="Six semantic intents. Default is neutral; the rest carry status meaning."
      >
        <Row>
          <Chip>Default</Chip>
          <Chip variant="primary">Primary</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="danger">Danger</Chip>
          <Chip variant="info">Info</Chip>
        </Row>
      </Section>

      {/* ─── Appearances ──────────────────────────────────── */}
      <Section
        title="Appearances"
        description="Each variant renders in three appearances: soft (default), solid, and outline."
      >
        <Stack>
          <Row>
            <Chip variant="primary" appearance="soft">
              Soft
            </Chip>
            <Chip variant="success" appearance="soft">
              Soft
            </Chip>
            <Chip variant="warning" appearance="soft">
              Soft
            </Chip>
            <Chip variant="danger" appearance="soft">
              Soft
            </Chip>
            <Chip variant="info" appearance="soft">
              Soft
            </Chip>
          </Row>
          <Row>
            <Chip variant="primary" appearance="solid">
              Solid
            </Chip>
            <Chip variant="success" appearance="solid">
              Solid
            </Chip>
            <Chip variant="warning" appearance="solid">
              Solid
            </Chip>
            <Chip variant="danger" appearance="solid">
              Solid
            </Chip>
            <Chip variant="info" appearance="solid">
              Solid
            </Chip>
          </Row>
          <Row>
            <Chip variant="primary" appearance="outline">
              Outline
            </Chip>
            <Chip variant="success" appearance="outline">
              Outline
            </Chip>
            <Chip variant="warning" appearance="outline">
              Outline
            </Chip>
            <Chip variant="danger" appearance="outline">
              Outline
            </Chip>
            <Chip variant="info" appearance="outline">
              Outline
            </Chip>
          </Row>
        </Stack>
      </Section>

      {/* ─── Sizes ────────────────────────────────────────── */}
      <Section
        title="Sizes"
        description="Small (1.75rem), medium (2rem, default), and large (2.5rem) — aligned with the Button size ramp."
      >
        <Row>
          <Chip size="sm" variant="primary">
            Small
          </Chip>
          <Chip size="md" variant="primary">
            Medium
          </Chip>
          <Chip size="lg" variant="primary">
            Large
          </Chip>
        </Row>
      </Section>

      {/* ─── Leading icons ────────────────────────────────── */}
      <Section
        title="With leading icon"
        description="ChipIcon inherits the variant's emphasis color and auto-sizes per chip size."
      >
        <Row>
          <Chip variant="success">
            <ChipIcon>
              <IconCheck size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Verified</ChipLabel>
          </Chip>
          <Chip variant="warning">
            <ChipIcon>
              <IconStar size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Featured</ChipLabel>
          </Chip>
          <Chip variant="danger">
            <ChipIcon>
              <IconFlame size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Hot</ChipLabel>
          </Chip>
          <Chip variant="info">
            <ChipIcon>
              <IconTag size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>New</ChipLabel>
          </Chip>
          <Chip>
            <ChipIcon>
              <IconClock size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>3 min read</ChipLabel>
          </Chip>
        </Row>
      </Section>

      {/* ─── With avatar ──────────────────────────────────── */}
      <Section
        title="With avatar"
        description="Drop an Avatar into ChipIcon for person chips — mention pills, assignees, collaborators."
      >
        <Row>
          <Chip size="lg" variant="default">
            <ChipIcon>
              <Avatar
                src="https://i.pravatar.cc/80?u=vds-1"
                alt="Sara"
                fallback="SR"
                size="xs"
              />
            </ChipIcon>
            <ChipLabel>Sara Rezaei</ChipLabel>
          </Chip>
          <Chip size="lg" variant="primary">
            <ChipIcon>
              <Avatar
                src="https://i.pravatar.cc/80?u=vds-2"
                alt="Arman"
                fallback="AR"
                size="xs"
              />
            </ChipIcon>
            <ChipLabel>Arman Bakhtiari</ChipLabel>
            <ChipRemove aria-label="Remove Arman" />
          </Chip>
          <Chip size="lg" appearance="outline">
            <ChipIcon>
              <Avatar fallback="NB" size="xs" />
            </ChipIcon>
            <ChipLabel>Niloofar B.</ChipLabel>
          </Chip>
        </Row>
      </Section>

      {/* ─── Removable chips ──────────────────────────────── */}
      <Section
        title="Removable"
        description="ChipRemove renders a focusable button with a visible focus ring and a default label of 'Remove'."
      >
        <Row>
          <Chip variant="primary">
            <ChipLabel>react</ChipLabel>
            <ChipRemove aria-label="Remove react" />
          </Chip>
          <Chip variant="success">
            <ChipIcon>
              <IconCheck size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>shipped</ChipLabel>
            <ChipRemove aria-label="Remove shipped" />
          </Chip>
          <Chip variant="warning" appearance="outline">
            <ChipLabel>draft</ChipLabel>
            <ChipRemove aria-label="Remove draft" />
          </Chip>
        </Row>
      </Section>

      {/* ─── Interactive chips ────────────────────────────── */}
      <Section
        title="Interactive (button / link)"
        description="Pair asChild with interactive to make a chip focusable, hoverable, and pressable. Works with <button>, <a>, or any pressable element."
      >
        <Row>
          <Chip asChild variant="primary" interactive>
            <button type="button">
              <ChipIcon>
                <IconPlus size={14} stroke={2.25} />
              </ChipIcon>
              <ChipLabel>Add filter</ChipLabel>
            </button>
          </Chip>
          <Chip asChild variant="info" appearance="outline" interactive>
            <a href="#/chip" onClick={(e) => e.preventDefault()}>
              <ChipIcon>
                <IconSearch size={14} stroke={2.25} />
              </ChipIcon>
              <ChipLabel>Browse all</ChipLabel>
            </a>
          </Chip>
          <Chip asChild variant="default" interactive>
            <button type="button">
              <ChipLabel>Click me</ChipLabel>
            </button>
          </Chip>
        </Row>
      </Section>

      {/* ─── Disabled ─────────────────────────────────────── */}
      <Section title="Disabled">
        <Row>
          <Chip disabled>
            <ChipLabel>Disabled</ChipLabel>
          </Chip>
          <Chip variant="primary" disabled>
            <ChipIcon>
              <IconHeart size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Favorited</ChipLabel>
          </Chip>
          <Chip variant="success" disabled>
            <ChipLabel>Shipped</ChipLabel>
            <ChipRemove aria-label="Remove" />
          </Chip>
        </Row>
      </Section>

      {/* ─── Real example 1: Category filter ─────────────── */}
      <Section
        title="Example — Category filter"
        description="Single-select filter bar. Active category flips to solid primary."
      >
        <CategoryFilter />
      </Section>

      {/* ─── Real example 2: Filter toggles ──────────────── */}
      <Section
        title="Example — Toggleable filters"
        description="Multi-select feature tags. Each chip is independently pressable and keeps its own pressed state."
      >
        <Row>
          <FilterChip label="Free shipping" defaultOn />
          <FilterChip label="In stock" defaultOn />
          <FilterChip label="On sale" />
          <FilterChip label="New arrivals" />
          <FilterChip label="Eco-friendly" />
        </Row>
      </Section>

      {/* ─── Real example 3: Tag input ───────────────────── */}
      <Section
        title="Example — Tag input"
        description="Type a tag and press Enter to add. Backspace on an empty input removes the last chip."
      >
        <TagInput />
      </Section>

      {/* ─── Real example 4: Active filters bar ──────────── */}
      <Section
        title="Example — Active filters bar"
        description="E-commerce style applied-filter summary with a 'Clear all' escape hatch."
      >
        <ActiveFilters />
      </Section>

      {/* ─── Real example 5: Product card meta ───────────── */}
      <Section
        title="Example — Product card meta"
        description="Composed chips showing status, stock, and shipping across a product card."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
            gap: "var(--vds-space-4)",
            maxInlineSize: "42rem",
          }}
        >
          <article
            style={{
              padding: "var(--vds-space-4)",
              border: "1px solid var(--vds-color-border)",
              borderRadius: "var(--vds-radius-card, 0.75rem)",
              background: "var(--vds-color-surface)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-3)",
            }}
          >
            <header>
              <h3
                style={{
                  margin: 0,
                  fontSize: "var(--vds-text-base)",
                  fontWeight: "var(--vds-font-weight-semibold, 600)",
                }}
              >
                Aurora Hoodie
              </h3>
              <p
                style={{
                  margin: "var(--vds-space-1) 0 0",
                  color: "var(--vds-color-text-muted)",
                  fontSize: "var(--vds-text-sm)",
                }}
              >
                $89 — Cotton blend
              </p>
            </header>
            <Row>
              <Chip size="sm" variant="danger" appearance="solid">
                <ChipIcon>
                  <IconFlame size={12} stroke={2.25} />
                </ChipIcon>
                <ChipLabel>Trending</ChipLabel>
              </Chip>
              <Chip size="sm" variant="success">
                <ChipIcon>
                  <IconCheck size={12} stroke={2.25} />
                </ChipIcon>
                <ChipLabel>In stock</ChipLabel>
              </Chip>
              <Chip size="sm" variant="info" appearance="outline">
                <ChipIcon>
                  <IconShoppingCart size={12} stroke={2.25} />
                </ChipIcon>
                <ChipLabel>Free shipping</ChipLabel>
              </Chip>
            </Row>
          </article>

          <article
            style={{
              padding: "var(--vds-space-4)",
              border: "1px solid var(--vds-color-border)",
              borderRadius: "var(--vds-radius-card, 0.75rem)",
              background: "var(--vds-color-surface)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-3)",
            }}
          >
            <header>
              <h3
                style={{
                  margin: 0,
                  fontSize: "var(--vds-text-base)",
                  fontWeight: "var(--vds-font-weight-semibold, 600)",
                }}
              >
                Linen Summer Tee
              </h3>
              <p
                style={{
                  margin: "var(--vds-space-1) 0 0",
                  color: "var(--vds-color-text-muted)",
                  fontSize: "var(--vds-text-sm)",
                }}
              >
                $34 — Limited run
              </p>
            </header>
            <Row>
              <Chip size="sm" variant="warning" appearance="solid">
                <ChipIcon>
                  <IconStar size={12} stroke={2.25} />
                </ChipIcon>
                <ChipLabel>Only 3 left</ChipLabel>
              </Chip>
              <Chip size="sm" variant="default">
                <ChipIcon>
                  <IconMapPin size={12} stroke={2.25} />
                </ChipIcon>
                <ChipLabel>Ships from Tehran</ChipLabel>
              </Chip>
            </Row>
          </article>
        </div>
      </Section>

      {/* ─── Real example 6: Event metadata ──────────────── */}
      <Section
        title="Example — Event metadata"
        description="Date / location / attendee chips in a single informational row."
      >
        <Row>
          <Chip variant="info" appearance="outline">
            <ChipIcon>
              <IconCalendar size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Apr 24, 2026</ChipLabel>
          </Chip>
          <Chip variant="default">
            <ChipIcon>
              <IconMapPin size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>Remote</ChipLabel>
          </Chip>
          <Chip variant="primary" appearance="outline">
            <ChipIcon>
              <IconWorld size={14} stroke={2.25} />
            </ChipIcon>
            <ChipLabel>English · Persian</ChipLabel>
          </Chip>
        </Row>
      </Section>

      {/* ─── Usage ────────────────────────────────────────── */}
      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Chip,
  ChipIcon,
  ChipLabel,
  ChipRemove,
} from "@virtari-packages/react-chip";

// Simple chip
<Chip variant="success">Verified</Chip>

// With icon + removable
<Chip variant="primary">
  <ChipIcon><IconTag size={14} /></ChipIcon>
  <ChipLabel>react</ChipLabel>
  <ChipRemove aria-label="Remove react" onClick={handleRemove} />
</Chip>

// Interactive (renders as a <button>)
<Chip asChild variant="primary" interactive>
  <button type="button" onClick={toggle} aria-pressed={on}>
    <ChipLabel>Free shipping</ChipLabel>
  </button>
</Chip>`} />
      </Section>
    </>
  );
}
