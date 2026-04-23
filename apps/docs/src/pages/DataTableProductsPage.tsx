import { useEffect, useMemo, useState } from "react";
import {
  DataTable,
  DataTableFilterDrawer,
  ActionsCell,
  AvatarCell,
  CopyableCell,
  DateCell,
  NumberCell,
  StatusBadgeCell,
  createColumnHelper,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFieldDefinition,
  type FilterGroup,
  type RowSelectionState,
  type SortingState,
} from "@virtari-packages/react-data-table";
import {
  DataTableCustomizeDrawer,
  DataTableDndProvider,
  type ColumnConfig,
} from "@virtari-packages/react-data-table/dnd";
import "@virtari-packages/react-data-table/styles";
import { toast } from "@virtari-packages/react-toast";
import {
  ShowcaseShell,
  DOCS_STICKY_TOP_OFFSET,
  makeProducts,
  CATEGORY_TONES,
  STOCK_TONES,
  type ProductRow,
  type ProductCategory,
  type StockStatus,
} from "./_data-table-shared";

const STORAGE_KEY = "vds:demo:products-table-columns";

const DEFAULT_COLUMN_CONFIG: ColumnConfig[] = [
  { id: "product", label: "Product", visible: true },
  { id: "category", label: "Category", visible: true },
  { id: "price", label: "Price", visible: true },
  { id: "stock", label: "Stock", visible: true },
  { id: "updatedAt", label: "Updated", visible: true },
];

const CATEGORIES: ProductCategory[] = [
  "Apparel",
  "Electronics",
  "Home",
  "Beauty",
  "Sports",
];

const STOCK_LABELS: Record<StockStatus, string> = {
  "in-stock": "In stock",
  low: "Low",
  out: "Out of stock",
};

const AVAILABLE_FILTERS: FilterFieldDefinition[] = [
  {
    id: "category",
    label: "Category",
    type: "select",
    category: "shown",
    options: CATEGORIES.map((c) => ({ label: c, value: c })),
  },
  {
    id: "stockStatus",
    label: "Stock status",
    type: "select",
    category: "shown",
    options: (Object.keys(STOCK_LABELS) as StockStatus[]).map((v) => ({
      label: STOCK_LABELS[v],
      value: v,
    })),
  },
  { id: "price", label: "Price", type: "number", category: "popular" },
  { id: "name", label: "Product name", type: "text", category: "popular" },
];

function filterGroupsToColumnFilters(
  groups: FilterGroup[],
): ColumnFiltersState {
  const out: ColumnFiltersState = [];
  const seen = new Set<string>();
  for (const g of groups) {
    for (const c of g.conditions) {
      if (seen.has(c.fieldId)) continue;
      if (c.value === undefined || c.value === null || c.value === "") continue;
      seen.add(c.fieldId);
      out.push({ id: c.fieldId, value: c.value });
    }
  }
  return out;
}

const ch = createColumnHelper<ProductRow>();

export function DataTableProductsPage() {
  const [data, setData] = useState<ProductRow[]>(() => makeProducts(200));
  const [loading, setLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(() => {
    if (typeof window === "undefined") return DEFAULT_COLUMN_CONFIG;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_COLUMN_CONFIG;
      const parsed = JSON.parse(saved) as { id: string; visible: boolean }[];
      const map = new Map(DEFAULT_COLUMN_CONFIG.map((c) => [c.id, c]));
      const ordered: ColumnConfig[] = [];
      for (const p of parsed) {
        const def = map.get(p.id);
        if (def) {
          ordered.push({ ...def, visible: p.visible });
          map.delete(p.id);
        }
      }
      for (const left of map.values()) ordered.push(left);
      return ordered;
    } catch {
      return DEFAULT_COLUMN_CONFIG;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          columnConfig.map((c) => ({ id: c.id, visible: c.visible })),
        ),
      );
    } catch {
      /* noop */
    }
  }, [columnConfig]);

  const columnVisibility = useMemo(() => {
    const out: Record<string, boolean> = {};
    for (const c of columnConfig) out[c.id] = c.visible;
    return out;
  }, [columnConfig]);

  const columnOrder = useMemo(
    () => ["__select", ...columnConfig.map((c) => c.id), "__actions"],
    [columnConfig],
  );

  const handleApplyFilters = (groups: FilterGroup[]) => {
    setFilterGroups(groups);
    setColumnFilters(filterGroupsToColumnFilters(groups));
  };

  const handleRefresh = () => {
    setLoading(true);
    window.setTimeout(() => {
      setData(makeProducts(200));
      setLoading(false);
      toast.success("Refreshed", "Catalog reloaded.");
    }, 500);
  };

  const handleArchive = (ids: number[]) => {
    setData((prev) => prev.filter((p) => !ids.includes(p.id)));
    setRowSelection({});
    toast.success(
      `Archived ${ids.length} product${ids.length === 1 ? "" : "s"}`,
      "Removed from the catalog demo.",
    );
  };

  const handleDelete = (ids: number[]) => {
    setData((prev) => prev.filter((p) => !ids.includes(p.id)));
    setRowSelection({});
    toast.warning(
      `Deleted ${ids.length} product${ids.length === 1 ? "" : "s"}`,
      "Demo action.",
    );
  };

  const columns = useMemo<ColumnDef<ProductRow, any>[]>(
    () => [
      {
        id: "__select",
        size: 44,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        header: () => <DataTable.SelectAllCheckbox scope="page" />,
        cell: ({ row }) => <DataTable.RowSelectCheckbox row={row} />,
      },
      ch.accessor((p) => p.name, {
        id: "product",
        header: "Product",
        size: 260,
        enableSorting: true,
        sortingFn: "text",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <AvatarCell
              fallback={p.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
              size="sm"
              color="auto"
              colorKey={p.category}
              primary={p.name}
              secondary={<CopyableCell copyText={p.sku}>{p.sku}</CopyableCell>}
            />
          );
        },
      }),
      ch.accessor("category", {
        id: "category",
        header: "Category",
        size: 150,
        enableSorting: true,
        filterFn: "equalsString",
        cell: ({ getValue }) => {
          const v = getValue<ProductCategory>();
          return <StatusBadgeCell tone={CATEGORY_TONES[v]} label={v} />;
        },
      }),
      ch.accessor("price", {
        id: "price",
        header: "Price",
        size: 140,
        enableSorting: true,
        filterFn: "inNumberRange",
        cell: ({ getValue }) => (
          <NumberCell value={getValue<number>()} format="currency" align="end" />
        ),
      }),
      ch.accessor("stock", {
        id: "stock",
        header: "Stock",
        size: 160,
        enableSorting: true,
        cell: ({ row }) => {
          const { stock, stockStatus } = row.original;
          return (
            <StatusBadgeCell
              tone={STOCK_TONES[stockStatus]}
              label={`${stock} · ${STOCK_LABELS[stockStatus]}`}
            />
          );
        },
      }),
      ch.accessor("stockStatus", {
        id: "stockStatus",
        header: "Stock status",
        enableSorting: false,
        enableHiding: false,
        filterFn: "equalsString",
        cell: () => null,
        size: 0,
      }),
      ch.accessor("updatedAt", {
        id: "updatedAt",
        header: "Updated",
        size: 160,
        enableSorting: true,
        sortingFn: "datetime",
        cell: ({ getValue }) => (
          <DateCell value={getValue<string>()} format="medium" />
        ),
      }),
      {
        id: "__actions",
        size: 60,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        header: "",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <ActionsCell
              items={[
                {
                  id: "view",
                  label: "View",
                  onSelect: () => toast.info("View", p.name),
                },
                {
                  id: "duplicate",
                  label: "Duplicate",
                  onSelect: () => toast.info("Duplicate", p.name),
                },
                {
                  id: "archive",
                  label: "Archive",
                  onSelect: () => handleArchive([p.id]),
                },
                {
                  id: "delete",
                  label: "Delete",
                  tone: "danger",
                  separatorBefore: true,
                  onSelect: () => handleDelete([p.id]),
                },
              ]}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <ShowcaseShell
      title="Products catalog"
      description="Product catalog showcase — per-column filters, grouping by category, bulk archive, customize columns, and table/board view modes."
    >
      <DataTable.Root
        columns={columns}
        data={data}
        size="md"
        bordered="rows"
        stickyHeader
        stickyOffset={DOCS_STICKY_TOP_OFFSET}
        columnResizeMode="onChange"
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        columnVisibility={columnVisibility}
        columnOrder={columnOrder}
        defaultColumnPinning={{ left: ["__select"], right: ["__actions"] }}
        defaultPagination={{ pageIndex: 0, pageSize: 15 }}
      >
        <DataTable.Toolbar sticky>
          <DataTable.ViewModeToggle modes={["table", "board"]} />
          <div style={{ flex: 1 }} />
          <DataTable.SearchField
            value={globalFilter}
            onValueChange={setGlobalFilter}
            inputSize="md"
            placeholder="Search products"
            aria-label="Search products"
          />
          <DataTable.FilterButton
            count={filterGroups.reduce((s, g) => s + g.conditions.length, 0)}
            onClick={() => setFilterOpen(true)}
          />
          <DataTable.CustomizeButton onClick={() => setCustomizeOpen(true)} />
          <DataTable.RefreshButton onClick={handleRefresh} disabled={loading} />
          <DataTable.ExportButton
            onClick={() => toast.info("Export", "Demo action.")}
          />
          <DataTable.AddButton
            label="New product"
            onClick={() =>
              toast.success("New product", "Opens create drawer.")
            }
          />
        </DataTable.Toolbar>

        <DataTableDndProvider>
          <DataTable.Views
            skipColumns={["__select", "__actions", "stockStatus"]}
            emptyMessage="No products match your filters."
            table={
              <>
                <DataTable.ScrollArea>
                  <DataTable.Table>
                    <DataTable.Header />
                    <DataTable.Body emptyMessage="No products match your filters." />
                  </DataTable.Table>
                </DataTable.ScrollArea>
                <DataTable.ColumnGuide />
              </>
            }
            board={<DataTable.Board />}
          />
        </DataTableDndProvider>

        <DataTable.BulkActions.Root sticky>
          {({ selectedRows, selectedCount, clearSelection }) => {
            const ids = selectedRows.map((r) => (r.original as ProductRow).id);
            return (
              <>
                <DataTable.BulkActions.Count count={selectedCount} />
                <div style={{ flex: 1 }} />
                <DataTable.ExportButton
                  size="sm"
                  onClick={() =>
                    toast.success(
                      "Export queued",
                      `${ids.length} product(s).`,
                    )
                  }
                />
                <DataTable.DeleteButton
                  size="sm"
                  onClick={() => handleArchive(ids)}
                  label="Archive"
                />
                <DataTable.DeleteButton
                  size="sm"
                  onClick={() => handleDelete(ids)}
                />
                <DataTable.BulkActions.Clear onClick={clearSelection} />
              </>
            );
          }}
        </DataTable.BulkActions.Root>

        <DataTable.Pagination.Default
          pageSizeOptions={[10, 15, 25, 50]}
          sticky
        />

        {loading && <DataTable.LoadingOverlay open label="Refreshing..." />}
      </DataTable.Root>

      <DataTableFilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        availableFilters={AVAILABLE_FILTERS}
        filterGroups={filterGroups}
        onApplyFilters={handleApplyFilters}
      />

      <DataTableCustomizeDrawer
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        columns={columnConfig}
        onColumnsChange={setColumnConfig}
        defaultColumns={DEFAULT_COLUMN_CONFIG}
      />
    </ShowcaseShell>
  );
}
