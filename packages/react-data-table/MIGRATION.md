# DataTable Migration Guide

## 0.2.x → 0.3.0 — Pagination extraction

Pagination was extracted into its own package,
[`@virtari-packages/react-pagination`](../react-pagination), so it can be used
outside of DataTable (blog lists, search results, card grids, etc.).

### What changed

The following exports were **removed** from `@virtari-packages/react-data-table`:

- `Pagination` (namespace)
- `PaginationRoot`, `PaginationPrev`, `PaginationNext`
- `PaginationPages`, `PaginationPageSize`, `PaginationInfo`
- `PaginationDefault`
- `PaginationRootProps`, `PaginationButtonProps`, `PaginationPagesProps`,
  `PaginationPageSizeProps`, `PaginationInfoProps`, `PaginationDefaultProps`

In their place, DataTable now exposes a single adapter:

- `DataTablePagination` — a thin wrapper around `Pagination.Default` from
  `@virtari-packages/react-pagination` that reads DataTable state (page index,
  page size, total rows) out of the DataTable context.

The `DataTable` namespace still exposes `DataTable.Pagination`, but it now
points to the adapter as a plain component — not a compound.

### Migrating usage

#### Default layout (most common)

```diff
- <DataTable.Pagination.Default pageSizeOptions={[10, 25, 50]} sticky />
+ <DataTable.Pagination pageSizeOptions={[10, 25, 50]} sticky />
```

Or via named import:

```diff
- import { PaginationDefault } from "@virtari-packages/react-data-table";
- <PaginationDefault pageSizeOptions={[10, 25, 50]} />
+ import { DataTablePagination } from "@virtari-packages/react-data-table";
+ <DataTablePagination pageSizeOptions={[10, 25, 50]} />
```

#### Granular layouts

If you were composing pagination parts manually inside a DataTable, import the
parts from `@virtari-packages/react-pagination` directly and drive them from
DataTable state using `useDataTableContext`:

```tsx
import { Pagination } from "@virtari-packages/react-pagination";
import { useDataTableContext } from "@virtari-packages/react-data-table";

function MyPagination() {
  const { table, rowCount, mode } = useDataTableContext();
  const { pageIndex, pageSize } = table.getState().pagination;
  const total =
    mode === "server"
      ? (rowCount ?? 0)
      : table.getFilteredRowModel().rows.length;

  return (
    <Pagination.Root
      page={pageIndex}
      pageSize={pageSize}
      total={total}
      onPageChange={(p) => table.setPageIndex(p)}
      onPageSizeChange={(s) =>
        table.setPagination((prev) => ({ ...prev, pageIndex: 0, pageSize: s }))
      }
    >
      <Pagination.Info />
      <Pagination.Prev />
      <Pagination.Pages />
      <Pagination.Next />
    </Pagination.Root>
  );
}
```

### CSS imports

Add the pagination stylesheet alongside DataTable's:

```diff
  import "@virtari-packages/react-data-table/styles";
+ import "@virtari-packages/react-pagination/styles";
```

Pagination-related CSS custom properties on the DataTable scope
(`--data-table-pagination-*`) still exist; they control the outer wrapper's
background and border only. Inner visuals now read from
`--vds-pagination-*` tokens defined in the pagination package.
