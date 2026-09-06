# Original documentation page

Source ID: `apps/docs/src/pages/PaginationPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationInfo,
  PaginationNext,
  PaginationPageSize,
  PaginationPages,
  PaginationPrev,
  PaginationRoot,
} from "@virtari-packages/react-pagination";
import "@virtari-packages/react-pagination/styles";
import { Section, Stack } from "../components";

interface Item {
  id: number;
  title: string;
  author: string;
}

function makeItems(count: number): Item[] {
  const out: Item[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: i + 1,
      title: `Article #${i + 1} — a thoughtful look at topic ${((i * 7) % 37) + 1}`,
      author: ["Amelia", "Liam", "Noah", "Mia", "Ethan", "Ava"][i % 6]!,
    });
  }
  return out;
}

const ALL_ITEMS = makeItems(237);

function pageSlice(items: Item[], page: number, pageSize: number) {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}

export function PaginationPage() {
  /* Showcase 1 — opinionated default */
  const [p1, setP1] = useState(0);
  const [ps1, setPs1] = useState(10);
  const slice1 = useMemo(() => pageSlice(ALL_ITEMS, p1, ps1), [p1, ps1]);

  /* Showcase 2 — controlled with state preview */
  const [p2, setP2] = useState(0);
  const [ps2, setPs2] = useState(25);

  /* Showcase 3 — different sizes */
  const [sP, setSP] = useState(0);
  const [mP, setMP] = useState(0);
  const [lP, setLP] = useState(0);

  /* Showcase 4 — composed custom layout */
  const [p4, setP4] = useState(0);

  return (
    <>
      <Section
        title="Default layout"
        description="Pagination.Default is the opinionated convenience layout — rows-per-page select, item range info, prev/next, and numbered buttons with ellipsis. Controlled API: pass page, pageSize, total."
      >
        <Stack>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--vds-space-2, 0.5rem)", minBlockSize: "14rem" }}>
            {slice1.map((it) => (
              <li key={it.id} style={{ padding: "var(--vds-space-2, 0.5rem) var(--vds-space-3, 0.75rem)", border: "1px solid var(--vds-color-border-default, #e5e7eb)", borderRadius: "var(--vds-radius-card, 0.5rem)" }}>
                <strong>{it.title}</strong>{" "}
                <span style={{ color: "var(--vds-color-text-muted, #6b7280)" }}>by {it.author}</span>
              </li>
            ))}
          </ul>
          <Pagination.Default
            page={p1}
            pageSize={ps1}
            total={ALL_ITEMS.length}
            onPageChange={setP1}
            onPageSizeChange={setPs1}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </Stack>
      </Section>

      <Section
        title="Controlled state"
        description="Drive page and pageSize from your own state — works with server-side pagination. The current slice here uses total = 987 (mock), with a 25-per-page default."
      >
        <Stack>
          <Pagination.Default
            page={p2}
            pageSize={ps2}
            total={987}
            onPageChange={setP2}
            onPageSizeChange={setPs2}
          />
          <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify({ page: p2, pageSize: ps2 }, null, 2)} />
        </Stack>
      </Section>

      <Section
        title="Sizes"
        description="size='sm' | 'md' | 'lg' propagates via CSS vars to both the page buttons and the rows-per-page Select trigger."
      >
        <Stack>
          <Pagination.Default
            size="sm"
            page={sP}
            pageSize={10}
            total={120}
            onPageChange={setSP}
            hidePageSize
          />
          <Pagination.Default
            size="md"
            page={mP}
            pageSize={10}
            total={120}
            onPageChange={setMP}
            hidePageSize
          />
          <Pagination.Default
            size="lg"
            page={lP}
            pageSize={10}
            total={120}
            onPageChange={setLP}
            hidePageSize
          />
        </Stack>
      </Section>

      <Section
        title="Composed custom layout"
        description="Compose PaginationRoot with the individual parts (Info/PageSize/Prev/Pages/Next) to build any arrangement. Root provides shared state via context — no prop drilling."
      >
        <PaginationRoot
          page={p4}
          pageSize={20}
          total={540}
          onPageChange={setP4}
          siblingCount={3}
          size="md"
          style={{ justifyContent: "center", gap: "var(--vds-space-4, 1rem)" }}
        >
          <PaginationPrev />
          <PaginationPages />
          <PaginationNext />
          <PaginationInfo />
        </PaginationRoot>
      </Section>

      <Section
        title="With DataTable"
        description="When paginating a DataTable, use <DataTable.Pagination /> — it reads TanStack state out of DataTable context and renders this package under the hood. See the Data Table page for a live example."
      >
        <p style={{ margin: 0, color: "var(--vds-color-text-muted, #6b7280)" }}>
          Import <VirtariInlineCode>DataTablePagination</VirtariInlineCode> from <VirtariInlineCode>@virtari-packages/react-data-table</VirtariInlineCode>, or use the namespace form <VirtariInlineCode>&lt;DataTable.Pagination /&gt;</VirtariInlineCode>.
        </p>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Pagination } from "@virtari-packages/react-pagination";
import "@virtari-packages/react-pagination/styles";

function MyList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  return (
    <Pagination.Default
      page={page}
      pageSize={pageSize}
      total={totalRows}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      pageSizeOptions={[10, 25, 50, 100]}
    />
  );
}

// Or compose individual parts:
<Pagination.Root page={page} pageSize={size} total={total} onPageChange={setPage}>
  <Pagination.Info />
  <Pagination.Prev />
  <Pagination.Pages />
  <Pagination.Next />
</Pagination.Root>`} />
      </Section>
    </>
  );
}

/* Intentionally keep the extra part imports even though Default covers most
 * cases — they're the building blocks the last section demonstrates. */
void PaginationInfo;
void PaginationPageSize;

```
