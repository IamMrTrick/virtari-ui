import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableVariant,
  type TableRowStyle,
  type TableSize,
  type TableDensity,
  type TableColor,
  type TableSortDirection,
} from "@virtari-packages/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import { Badge } from "@virtari-packages/react-badge";
import { Row as LayoutRow } from "@virtari-packages/react-layout";
import { Section } from "../components";

/* ─────────────────────────── Demo data ─────────────────────────── */

type Invoice = {
  id: string;
  customer: string;
  email: string;
  status: "paid" | "pending" | "overdue" | "refunded";
  amount: number;
  date: string;
};

const INVOICES: Invoice[] = [
  { id: "INV-1021", customer: "Ada Lovelace",     email: "ada@analytical.co",      status: "paid",     amount: 1240.0, date: "2026-03-04" },
  { id: "INV-1022", customer: "Grace Hopper",     email: "grace@navy.mil",         status: "pending",  amount:  780.5, date: "2026-03-07" },
  { id: "INV-1023", customer: "Alan Turing",      email: "alan@bletchley.uk",      status: "overdue",  amount: 2460.0, date: "2026-02-18" },
  { id: "INV-1024", customer: "Katherine Johnson",email: "katherine@nasa.gov",     status: "paid",     amount:  320.75,date: "2026-03-12" },
  { id: "INV-1025", customer: "Margaret Hamilton",email: "margaret@apollo.io",     status: "refunded", amount:  540.0, date: "2026-01-30" },
  { id: "INV-1026", customer: "Linus Torvalds",   email: "linus@kernel.org",       status: "pending",  amount: 1820.25,date: "2026-03-15" },
  { id: "INV-1027", customer: "Barbara Liskov",   email: "liskov@mit.edu",         status: "paid",     amount:  990.0, date: "2026-03-09" },
];

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function StatusChip({ s }: { s: Invoice["status"] }) {
  const map = {
    paid:     { color: "success" as const, label: "Paid" },
    pending:  { color: "warning" as const, label: "Pending" },
    overdue:  { color: "danger"  as const, label: "Overdue" },
    refunded: { color: "neutral" as const, label: "Refunded" },
  }[s];
  return <Badge size="sm" color={map.color} variant="soft">{map.label}</Badge>;
}

/* ─────────────────────────── Helpers ─────────────────────────── */

const VARIANTS: TableVariant[] = ["surface", "plain", "bordered", "ghost"];
const ROW_STYLES: TableRowStyle[] = ["divided", "striped", "none"];
const SIZES: TableSize[] = ["sm", "md", "lg"];
const DENSITIES: TableDensity[] = ["compact", "normal", "comfortable"];
const COLORS: TableColor[] = ["primary", "accent", "success", "warning", "danger", "info", "neutral"];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-sm)",
        color: "var(--vds-color-text)",
      }}
    >
      <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{label}</span>
      {children}
      {hint && (
        <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function SwitchRow({
  title,
  hint,
  checked,
  onCheckedChange,
}: {
  title: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-4)",
        fontSize: "var(--vds-text-sm)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{title}</span>
        {hint && (
          <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
            {hint}
          </span>
        )}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export function TablePage() {
  return (
    <>
      <PlaygroundSection />
      <VariantsSection />
      <RowStylesSection />
      <SizesSection />
      <DensitySection />
      <SelectionSection />
      <SortableSection />
      <StickyHeaderSection />
      <StickyColumnSection />
      <NumericAlignSection />
      <FooterCaptionSection />
      <LoadingSection />
      <RTLSection />
      <ApiSection />
      <UsageSection />
    </>
  );
}

/* ─────────────────────── Playground ─────────────────────── */

function PlaygroundSection() {
  const [variant, setVariant] = useState<TableVariant>("surface");
  const [rows, setRows] = useState<TableRowStyle>("divided");
  const [size, setSize] = useState<TableSize>("md");
  const [density, setDensity] = useState<TableDensity>("normal");
  const [color, setColor] = useState<TableColor>("primary");
  const [hoverable, setHoverable] = useState(true);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [sentence, setSentence] = useState(false);

  return (
    <Section
      title="Live playground"
      description="Tune frame, row chrome, size, density, and accent color. Every axis is orthogonal — combine freely."
    >
      <LayoutRow
        autoFit
        minColWidth="12rem"
        gap="md"
        style={{
          padding: "var(--vds-space-4)",
          background: "var(--vds-color-bg-subtle)",
          borderRadius: "var(--vds-radius-surface)",
          border: "1px solid var(--vds-color-border-muted)",
          marginBlockEnd: "var(--vds-space-4)",
        }}
      >
        <Field label="Variant">
          <Select value={variant} onValueChange={(v) => setVariant(v as TableVariant)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {VARIANTS.map((v) => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Rows">
          <Select value={rows} onValueChange={(v) => setRows(v as TableRowStyle)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROW_STYLES.map((v) => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Size">
          <Select value={size} onValueChange={(v) => setSize(v as TableSize)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SIZES.map((v) => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Density">
          <Select value={density} onValueChange={(v) => setDensity(v as TableDensity)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {DENSITIES.map((v) => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Accent color">
          <Select value={color} onValueChange={(v) => setColor(v as TableColor)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COLORS.map((v) => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <SwitchRow title="Hoverable rows" checked={hoverable} onCheckedChange={setHoverable} />
          <SwitchRow title="Sticky header" checked={stickyHeader} onCheckedChange={setStickyHeader} />
          <SwitchRow
            title="Sentence-case header"
            hint="Opt out of the uppercase treatment."
            checked={sentence}
            onCheckedChange={setSentence}
          />
        </div>
      </LayoutRow>

      <InvoiceTable
        variant={variant}
        rows={rows}
        size={size}
        density={density}
        color={color}
        hoverable={hoverable}
        stickyHeader={stickyHeader}
        headerCase={sentence ? "sentence" : "uppercase"}
      />
    </Section>
  );
}

/* ─────────────────── Reusable sample table ─────────────────── */

function InvoiceTable(props: {
  variant?: TableVariant;
  rows?: TableRowStyle;
  size?: TableSize;
  density?: TableDensity;
  color?: TableColor;
  hoverable?: boolean;
  stickyHeader?: boolean;
  headerCase?: "uppercase" | "sentence";
  maxBlockSize?: string;
}) {
  const { maxBlockSize, ...rest } = props;
  return (
    <div style={maxBlockSize ? { maxBlockSize, overflow: "auto" } : undefined}>
      <Table {...rest}>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead numeric>Amount</TableHead>
            <TableHead align="end">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                <VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode>
              </TableCell>
              <TableCell wrap>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span>{inv.customer}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)" }}>{inv.email}</span>
                </div>
              </TableCell>
              <TableCell><StatusChip s={inv.status} /></TableCell>
              <TableCell numeric>{money(inv.amount)}</TableCell>
              <TableCell align="end">{inv.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ─────────────────────── Variants ─────────────────────── */

function VariantsSection() {
  return (
    <Section
      title="Variants"
      description="Four frame strategies — surface (default, framed), plain (divider-only), bordered (full grid), ghost (typographic)."
    >
      <div style={{ display: "grid", gap: "var(--vds-space-6)" }}>
        {VARIANTS.map((v) => (
          <div key={v}>
            <p style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              <VirtariInlineCode>variant=&quot;{v}&quot;</VirtariInlineCode>
            </p>
            <InvoiceTable variant={v} hoverable />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────── Row styles ─────────────────────── */

function RowStylesSection() {
  return (
    <Section
      title="Row styles"
      description="Divided (default) paints bottom dividers. Striped zebra-paints even rows. None strips all row chrome."
    >
      <div style={{ display: "grid", gap: "var(--vds-space-6)" }}>
        {ROW_STYLES.map((r) => (
          <div key={r}>
            <p style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              <VirtariInlineCode>rows=&quot;{r}&quot;</VirtariInlineCode>
            </p>
            <InvoiceTable rows={r} hoverable />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────── Sizes ─────────────────────── */

function SizesSection() {
  return (
    <Section
      title="Sizes"
      description="Three presets — sm(36px) · md(44, default) · lg(52px). Controls cell padding, font, and row height."
    >
      <div style={{ display: "grid", gap: "var(--vds-space-6)" }}>
        {SIZES.map((s) => (
          <div key={s}>
            <p style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              <VirtariInlineCode>size=&quot;{s}&quot;</VirtariInlineCode>
            </p>
            <InvoiceTable size={s} hoverable />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────── Density ─────────────────────── */

function DensitySection() {
  return (
    <Section
      title="Density"
      description="Density composes with size — tighten for dashboards, loosen for marketing. Independent axis, no conflict."
    >
      <div style={{ display: "grid", gap: "var(--vds-space-6)" }}>
        {DENSITIES.map((d) => (
          <div key={d}>
            <p style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              <VirtariInlineCode>density=&quot;{d}&quot;</VirtariInlineCode>
            </p>
            <InvoiceTable density={d} hoverable />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────── Selection ─────────────────────── */

function SelectionSection() {
  const [selectedId, setSelectedId] = useState<string | null>("INV-1022");

  return (
    <Section
      title="Selection & hover"
      description="Pass selected on a row to tint it + paint an accent stripe. The stripe flips to the trailing edge in RTL."
    >
      <Table hoverable color="primary">
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.slice(0, 5).map((inv) => (
            <TableRow
              key={inv.id}
              selected={selectedId === inv.id}
              onClick={() => setSelectedId(inv.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode></TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell><StatusChip s={inv.status} /></TableCell>
              <TableCell numeric>{money(inv.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p style={{ marginBlockStart: "var(--vds-space-3)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
        Click any row to select. The accent stripe color follows the table&rsquo;s <VirtariInlineCode>color</VirtariInlineCode> prop.
      </p>
    </Section>
  );
}

/* ─────────────────────── Sortable ─────────────────────── */

function SortableSection() {
  type SortKey = keyof Invoice;
  const [sort, setSort] = useState<{ key: SortKey; dir: TableSortDirection }>({
    key: "date",
    dir: "descending",
  });

  const sorted = useMemo(() => {
    if (sort.dir === "none") return INVOICES;
    const arr = [...INVOICES].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av < bv) return sort.dir === "ascending" ? -1 : 1;
      if (av > bv) return sort.dir === "ascending" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sort]);

  function toggle(key: SortKey) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "ascending" };
      if (prev.dir === "ascending") return { key, dir: "descending" };
      if (prev.dir === "descending") return { key, dir: "none" };
      return { key, dir: "ascending" };
    });
  }

  const dirFor = (key: SortKey): TableSortDirection =>
    sort.key === key ? sort.dir : "none";

  return (
    <Section
      title="Sortable headers"
      description="Mark a TableHead sortable to get cursor, hover, focus ring, aria-sort, and keyboard (Enter/Space) — you wire the sort logic."
    >
      <Table hoverable>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection={dirFor("id")}       onClick={() => toggle("id")}      >Invoice</TableHead>
            <TableHead sortable sortDirection={dirFor("customer")} onClick={() => toggle("customer")}>Customer</TableHead>
            <TableHead sortable sortDirection={dirFor("status")}   onClick={() => toggle("status")}  >Status</TableHead>
            <TableHead sortable sortDirection={dirFor("amount")}   onClick={() => toggle("amount")} numeric>Amount</TableHead>
            <TableHead sortable sortDirection={dirFor("date")}     onClick={() => toggle("date")} align="end">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode></TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell><StatusChip s={inv.status} /></TableCell>
              <TableCell numeric>{money(inv.amount)}</TableCell>
              <TableCell align="end">{inv.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}

/* ─────────────────────── Sticky header ─────────────────────── */

function StickyHeaderSection() {
  const many: Invoice[] = Array.from({ length: 30 }, (_, i) => {
    const src = INVOICES[i % INVOICES.length];
    return { ...src, id: `INV-${2000 + i}` };
  });

  return (
    <Section
      title="Sticky header"
      description="Constrain the root to a fixed block-size + enable stickyHeader — the thead pins to the top as rows scroll."
    >
      <div style={{ maxBlockSize: "18rem", overflow: "auto", borderRadius: "var(--vds-radius-data-table)" }}>
        <Table stickyHeader hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead numeric>Amount</TableHead>
              <TableHead align="end">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {many.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode></TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell><StatusChip s={inv.status} /></TableCell>
                <TableCell numeric>{money(inv.amount)}</TableCell>
                <TableCell align="end">{inv.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p style={{ marginBlockStart: "var(--vds-space-3)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
        Scroll inside the frame — the header row stays pinned.
      </p>
    </Section>
  );
}

/* ─────────────────────── Sticky columns ─────────────────────── */

function StickyColumnSection() {
  const columns = ["Q1", "Q2", "Q3", "Q4", "H1", "H2", "FY", "Forecast"];
  const rows = [
    { name: "Revenue", vals: [120, 140, 160, 180, 260, 340, 600, 640] },
    { name: "Costs",   vals: [ 80,  90, 100, 110, 170, 210, 380, 400] },
    { name: "Gross",   vals: [ 40,  50,  60,  70,  90, 130, 220, 240] },
    { name: "Opex",    vals: [ 20,  25,  30,  35,  45,  65, 110, 120] },
    { name: "EBITDA",  vals: [ 20,  25,  30,  35,  45,  65, 110, 120] },
  ];

  return (
    <Section
      title="Sticky columns"
      description="Pin a column to the start or end of the scroll container. Backgrounds are painted on the cell, so rows don't bleed through."
    >
      <Table variant="bordered" size="sm">
        <TableHeader>
          <TableRow>
            <TableHead sticky="start">Metric</TableHead>
            {columns.map((c) => (
              <TableHead key={c} numeric>{c}</TableHead>
            ))}
            <TableHead sticky="end" numeric>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const total = r.vals.reduce((a, b) => a + b, 0);
            return (
              <TableRow key={r.name}>
                <TableCell sticky="start" style={{ fontWeight: 600 }}>{r.name}</TableCell>
                {r.vals.map((v, i) => (
                  <TableCell key={i} numeric>{v}</TableCell>
                ))}
                <TableCell sticky="end" numeric style={{ fontWeight: 600 }}>{total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p style={{ marginBlockStart: "var(--vds-space-3)", fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
        Scroll horizontally — the <strong>Metric</strong> and <strong>Total</strong> columns stay in place.
      </p>
    </Section>
  );
}

/* ─────────────────────── Numeric + alignment ─────────────────────── */

function NumericAlignSection() {
  return (
    <Section
      title="Alignment & numeric cells"
      description="align uses logical start/center/end (RTL-safe). numeric adds tabular-nums + end alignment in one flag."
    >
      <Table variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead align="center">Count</TableHead>
            <TableHead numeric>Price</TableHead>
            <TableHead numeric>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alpha widget</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell numeric>{money(19.99)}</TableCell>
            <TableCell numeric>{money(59.97)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beta gadget</TableCell>
            <TableCell align="center">12</TableCell>
            <TableCell numeric>{money(4.5)}</TableCell>
            <TableCell numeric>{money(54.0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gamma device</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell numeric>{money(1299.0)}</TableCell>
            <TableCell numeric>{money(1299.0)}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} align="end" style={{ fontWeight: 600 }}>Total</TableCell>
            <TableCell numeric style={{ fontWeight: 600 }}>{money(1412.97)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Section>
  );
}

/* ─────────────────────── Footer + Caption ─────────────────────── */

function FooterCaptionSection() {
  return (
    <Section
      title="Footer & caption"
      description="TableCaption sits under the table (caption-side: bottom) and is announced by screen readers. TableFooter groups totals/summary rows."
    >
      <Table>
        <TableCaption>Q1 2026 outstanding invoices — sample data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.slice(0, 4).map((inv) => (
            <TableRow key={inv.id}>
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode></TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell numeric>{money(inv.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} style={{ fontWeight: 600 }}>Subtotal</TableCell>
            <TableCell numeric style={{ fontWeight: 600 }}>
              {money(INVOICES.slice(0, 4).reduce((a, b) => a + b.amount, 0))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Section>
  );
}

/* ─────────────────────── Loading ─────────────────────── */

function LoadingSection() {
  const [loading, setLoading] = useState(true);

  return (
    <Section
      title="Loading state"
      description="Set loading to dim the tbody and block interaction while data refreshes. Pair with your own overlay or skeleton if needed."
    >
      <div style={{ display: "flex", gap: "var(--vds-space-3)", marginBlockEnd: "var(--vds-space-3)" }}>
        <SwitchRow title="Loading" checked={loading} onCheckedChange={setLoading} />
      </div>
      <div>
        <Table hoverable loading={loading}>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead numeric>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.slice(0, 3).map((inv) => (
              <TableRow key={inv.id}>
                <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{inv.id}</VirtariInlineCode></TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell numeric>{money(inv.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}

/* ─────────────────────── RTL ─────────────────────── */

function RTLSection() {
  return (
    <Section
      title="RTL-safe by default"
      description="Every paint uses logical properties — padding-inline, border-inline-end, text-align: start/end, inset-inline-start/end. The selected-row accent stripe flips sides automatically."
    >
      <div dir="rtl" lang="fa">
        <Table hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>شناسه</TableHead>
              <TableHead>مشتری</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead numeric>مبلغ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow selected>
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>INV-1021</VirtariInlineCode></TableCell>
              <TableCell>آدا لاولیس</TableCell>
              <TableCell><Badge size="sm" color="success" variant="soft">پرداخت‌شده</Badge></TableCell>
              <TableCell numeric>۱٬۲۴۰٫۰۰</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>INV-1022</VirtariInlineCode></TableCell>
              <TableCell>گریس هاپر</TableCell>
              <TableCell><Badge size="sm" color="warning" variant="soft">در انتظار</Badge></TableCell>
              <TableCell numeric>۷۸۰٫۵۰</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><VirtariInlineCode style={{ fontSize: "0.8125em" }}>INV-1023</VirtariInlineCode></TableCell>
              <TableCell>آلن تورینگ</TableCell>
              <TableCell><Badge size="sm" color="danger" variant="soft">سررسید گذشته</Badge></TableCell>
              <TableCell numeric>۲٬۴۶۰٫۰۰</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}

/* ─────────────────────── API ─────────────────────── */

function ApiSection() {
  const rows: Array<{ prop: string; type: string; def: string; desc: string }> = [
    { prop: "variant",      type: `"surface" | "plain" | "bordered" | "ghost"`, def: `"surface"`, desc: "Frame strategy — affects border, radius, and raised-surface paint." },
    { prop: "rows",         type: `"divided" | "striped" | "none"`,             def: `"divided"`, desc: "Body row chrome — dividers, zebra, or bare." },
    { prop: "size",         type: `"sm" | "md" | "lg"`,                         def: `"md"`,      desc: "Cell padding + font + row height preset." },
    { prop: "density",      type: `"compact" | "normal" | "comfortable"`,       def: `"normal"`,  desc: "Extra padding axis — composes with size." },
    { prop: "color",        type: `"primary" | "accent" | "success" | "warning" | "danger" | "info" | "neutral"`, def: `"primary"`, desc: "Accent color — drives selected-row tint + stripe + sort indicator." },
    { prop: "layout",       type: `"auto" | "fixed"`,                           def: `"auto"`,    desc: "Column layout algorithm on the inner <table>." },
    { prop: "headerCase",   type: `"uppercase" | "sentence"`,                   def: `"uppercase"`, desc: "Header text treatment — swap to sentence case for report-style tables." },
    { prop: "stickyHeader", type: "boolean", def: "false", desc: "Pin the thead to the scroll container's top edge." },
    { prop: "hoverable",    type: "boolean", def: "false", desc: "Tint tbody rows on hover." },
    { prop: "loading",      type: "boolean", def: "false", desc: "Dim tbody + disable pointer events during data refresh." },
    { prop: "tableProps",   type: "React.TableHTMLAttributes<HTMLTableElement>", def: "—", desc: "Forwarded onto the inner <table> (id, aria-label, aria-labelledby, ...)." },
  ];

  const cellProps: Array<{ prop: string; type: string; desc: string }> = [
    { prop: "align",    type: `"start" | "center" | "end"`, desc: "Logical text alignment — RTL-safe." },
    { prop: "numeric",  type: "boolean", desc: "Tabular-nums + end alignment in one flag." },
    { prop: "wrap",     type: "boolean", desc: "Allow wrapping instead of the default nowrap." },
    { prop: "sticky",   type: `"start" | "end"`, desc: "Pin the column to the scroll container's start or end edge." },
  ];

  const headProps: Array<{ prop: string; type: string; desc: string }> = [
    { prop: "sortable",      type: "boolean", desc: "Render as a sortable column — cursor, hover, focusable, Enter/Space." },
    { prop: "sortDirection", type: `"ascending" | "descending" | "none"`, desc: "Sets aria-sort and paints the indicator." },
    { prop: "sortIndicator", type: "ReactNode", desc: "Override the default chevron indicator." },
  ];

  return (
    <Section title="API" description="Props exposed by each subcomponent.">
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-6)" }}>
        <div>
          <h3 style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-base)" }}>Table (root)</h3>
          <Table variant="bordered" size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead wrap>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.prop}>
                  <TableCell><VirtariInlineCode>{r.prop}</VirtariInlineCode></TableCell>
                  <TableCell wrap><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{r.type}</VirtariInlineCode></TableCell>
                  <TableCell><VirtariInlineCode>{r.def}</VirtariInlineCode></TableCell>
                  <TableCell wrap>{r.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-base)" }}>TableCell + TableHead</h3>
          <Table variant="bordered" size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead wrap>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cellProps.map((r) => (
                <TableRow key={r.prop}>
                  <TableCell><VirtariInlineCode>{r.prop}</VirtariInlineCode></TableCell>
                  <TableCell wrap><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{r.type}</VirtariInlineCode></TableCell>
                  <TableCell wrap>{r.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 style={{ margin: "0 0 var(--vds-space-2)", fontSize: "var(--vds-text-base)" }}>TableHead (sorting)</h3>
          <Table variant="bordered" size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead wrap>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {headProps.map((r) => (
                <TableRow key={r.prop}>
                  <TableCell><VirtariInlineCode>{r.prop}</VirtariInlineCode></TableCell>
                  <TableCell wrap><VirtariInlineCode style={{ fontSize: "0.8125em" }}>{r.type}</VirtariInlineCode></TableCell>
                  <TableCell wrap>{r.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── Usage ─────────────────────── */

function UsageSection() {
  return (
    <Section title="Usage">
      <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from "@virtari-packages/react-table";

<Table variant="surface" rows="divided" size="md" hoverable>
  <TableCaption>Q1 2026 outstanding invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead numeric>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell>INV-1021</TableCell>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell numeric>$1,240.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Subtotal</TableCell>
      <TableCell numeric>$1,240.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`} />
    </Section>
  );
}
