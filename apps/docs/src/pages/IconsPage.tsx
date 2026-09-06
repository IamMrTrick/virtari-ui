import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import * as TablerIcons from "@tabler/icons-react";
// The @tabler/icons package's `exports` field only maps `./*` → `./icons/*`,
// so deep-importing the root `icons.json` requires a direct node_modules path.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- ambient JSON module declared in icons-manifest.d.ts
import iconsManifestRaw from "../../node_modules/@tabler/icons/icons.json";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Input } from "@virtari-packages/react-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari-packages/react-select";
import { Section, Row } from "../components";

/* ────────────────────────── Tabler metadata ────────────────────────── */

interface TablerIconMeta {
  name: string;
  category: string;
  tags: (string | number)[];
  styles: { outline?: unknown; filled?: unknown };
}

const iconsManifest = iconsManifestRaw as Record<string, TablerIconMeta>;

function toComponentName(kebab: string, filled: boolean): string {
  const pascal = kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `Icon${pascal}${filled ? "Filled" : ""}`;
}

interface IconEntry {
  /** Kebab-case name (e.g. "chevron-down"). */
  key: string;
  /** PascalCase component name (e.g. "IconChevronDown"). */
  componentName: string;
  category: string;
  tags: string[];
  hasOutline: boolean;
  hasFilled: boolean;
}

const ALL_ICONS: IconEntry[] = Object.values(iconsManifest)
  .map((meta): IconEntry => ({
    key: meta.name,
    componentName: toComponentName(meta.name, false),
    category: meta.category || "Uncategorized",
    tags: (meta.tags ?? []).map(String),
    hasOutline: Boolean(meta.styles?.outline),
    hasFilled: Boolean(meta.styles?.filled),
  }))
  .sort((a, b) => a.key.localeCompare(b.key));

const CATEGORIES = ["All", ...Array.from(new Set(ALL_ICONS.map((i) => i.category))).sort()];

/* ────────────────────────── Page ────────────────────────── */

type IconStyle = "outline" | "filled";

const SIZE_OPTIONS = [16, 20, 24, 32, 40] as const;
const STROKE_OPTIONS = [1, 1.25, 1.5, 1.75, 2, 2.5] as const;

const ICON_TILE_SIZE = 96;
const ICON_TILE_GAP = 8;

export function IconsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [style, setStyle] = useState<IconStyle>("outline");
  const [size, setSize] = useState<number>(28);
  const [stroke, setStroke] = useState<number>(1.5);
  const [copied, setCopied] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    return ALL_ICONS.filter((icon) => {
      if (category !== "All" && icon.category !== category) return false;
      if (style === "filled" && !icon.hasFilled) return false;
      if (!deferredQuery) return true;
      if (icon.key.includes(deferredQuery)) return true;
      if (icon.category.toLowerCase().includes(deferredQuery)) return true;
      return icon.tags.some((tag) => tag.toLowerCase().includes(deferredQuery));
    });
  }, [deferredQuery, category, style]);

  const handleCopy = async (entry: IconEntry) => {
    const componentName = toComponentName(entry.key, style === "filled" && entry.hasFilled);
    const snippet = `import { ${componentName} } from "@virtari-packages/react-icons";\n\n<${componentName} size={${size}} stroke={${stroke}} />`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(componentName);
    } catch {
      setCopied(null);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <>
      <Section
        title="Browse"
        description={`${ALL_ICONS.length.toLocaleString()} Tabler icons (MIT) — re-exported from @virtari-packages/react-icons. Click any icon to copy import + JSX.`}
      >
        <Row>
          <div className="docs-icons-search">
            <Input
              type="search"
              placeholder="Search by name, tag, or category…"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              inputSize="md"
              autoFocus
            />
          </div>
        </Row>
        <Row>
          <ToolbarField label="Category">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger size="sm" style={{ minWidth: "12rem" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ToolbarField>
          <ToolbarField label="Style">
            <div className="docs-icons-toggle">
              <button
                type="button"
                data-active={style === "outline" || undefined}
                onClick={() => setStyle("outline")}
              >
                Outline
              </button>
              <button
                type="button"
                data-active={style === "filled" || undefined}
                onClick={() => setStyle("filled")}
              >
                Filled
              </button>
            </div>
          </ToolbarField>
          <ToolbarField label="Size">
            <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
              <SelectTrigger size="sm" style={{ minWidth: "5rem" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ToolbarField>
          <ToolbarField label="Stroke">
            <Select value={String(stroke)} onValueChange={(v) => setStroke(Number(v))}>
              <SelectTrigger size="sm" style={{ minWidth: "5rem" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STROKE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ToolbarField>
        </Row>
        <p className="docs-icons-count">
          {filtered.length.toLocaleString()} {filtered.length === 1 ? "icon" : "icons"}
          {style === "filled" ? " (filled subset)" : ""}
          {category !== "All" ? ` · ${category}` : ""}
          {deferredQuery ? ` · "${deferredQuery}"` : ""}
        </p>
      </Section>

      <Section title="Grid">
        <IconGrid
          entries={filtered}
          style={style}
          size={size}
          stroke={stroke}
          onCopy={handleCopy}
          copied={copied}
        />
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { IconCheck } from "@virtari-packages/react-icons";

// Direct (tree-shakable, simplest)
<IconCheck size={20} stroke={1.5} />

// Wrapper with system tokens
import { Icon, IconCheck } from "@virtari-packages/react-icons";
<Icon icon={IconCheck} size="md" color="success" label="Saved" />

// App-wide defaults
import { IconProvider } from "@virtari-packages/react-icons";
<IconProvider size="md" stroke={1.5}>
  {/* every <Icon> below inherits these defaults */}
</IconProvider>`} />
      </Section>
    </>
  );
}

/* ────────────────────────── Toolbar field ────────────────────────── */

function ToolbarField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="docs-icons-field">
      <span className="docs-icons-field-label">{label}</span>
      {children}
    </label>
  );
}

/* ────────────────────────── Virtualized grid ────────────────────────── */

interface IconGridProps {
  entries: IconEntry[];
  style: IconStyle;
  size: number;
  stroke: number;
  onCopy: (entry: IconEntry) => void;
  copied: string | null;
}

function IconGrid({ entries, style, size, stroke, onCopy, copied }: IconGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(8);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const cols = Math.max(1, Math.floor((width + ICON_TILE_GAP) / (ICON_TILE_SIZE + ICON_TILE_GAP)));
      setColumns(cols);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowCount = Math.ceil(entries.length / columns);
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ICON_TILE_SIZE + ICON_TILE_GAP,
    overscan: 4,
  });

  if (entries.length === 0) {
    return (
      <div className="docs-icons-empty">
        No icons match your filter.
      </div>
    );
  }

  return (
    <div ref={parentRef} className="docs-icons-grid-scroll">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowEntries = entries.slice(startIndex, startIndex + columns);
          const rowStyle: CSSProperties = {
            position: "absolute",
            insetInlineStart: 0,
            insetBlockStart: 0,
            width: "100%",
            height: `${ICON_TILE_SIZE}px`,
            transform: `translateY(${virtualRow.start}px)`,
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${ICON_TILE_GAP}px`,
          };
          return (
            <div key={virtualRow.key} style={rowStyle}>
              {rowEntries.map((entry) => (
                <IconTile
                  key={entry.key}
                  entry={entry}
                  style={style}
                  size={size}
                  stroke={stroke}
                  onCopy={onCopy}
                  copied={copied}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────── Tile ────────────────────────── */

interface IconTileProps {
  entry: IconEntry;
  style: IconStyle;
  size: number;
  stroke: number;
  onCopy: (entry: IconEntry) => void;
  copied: string | null;
}

function IconTile({ entry, style, size, stroke, onCopy, copied }: IconTileProps) {
  const isFilled = style === "filled" && entry.hasFilled;
  const componentName = toComponentName(entry.key, isFilled);
  const Component = (TablerIcons as unknown as Record<string, TablerIcons.Icon | undefined>)[componentName];
  const isCopied = copied === componentName;

  return (
    <button
      type="button"
      className="docs-icons-tile"
      data-copied={isCopied || undefined}
      onClick={() => onCopy(entry)}
      title={`${entry.key} — click to copy`}
    >
      <span className="docs-icons-tile-glyph" aria-hidden>
        {Component ? <Component size={size} stroke={stroke} /> : null}
      </span>
      <span className="docs-icons-tile-name">{entry.key}</span>
      {isCopied ? <span className="docs-icons-tile-badge">Copied!</span> : null}
    </button>
  );
}
