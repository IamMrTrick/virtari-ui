import { useEffect, useMemo, useRef, useState } from "react";
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
  type DataTableServerRequestState,
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
  makeOrders,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TONES,
  type OrderRow,
  type OrderStatus,
} from "./_data-table-shared";

const STORAGE_KEY = "vds:demo:orders-table-columns";

const DEFAULT_COLUMN_CONFIG: ColumnConfig[] = [
  { id: "number", label: "Order #", visible: true },
  { id: "customer", label: "Customer", visible: true },
  { id: "status", label: "Status", visible: true },
  { id: "itemCount", label: "Items", visible: true },
  { id: "total", label: "Total", visible: true },
  { id: "placedAt", label: "Placed", visible: true },
];

const AVAILABLE_FILTERS: FilterFieldDefinition[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    category: "shown",
    options: (Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((v) => ({
      label: ORDER_STATUS_LABELS[v],
      value: v,
    })),
  },
  { id: "total", label: "Total", type: "number", category: "popular" },
  { id: "placedAt", label: "Placed", type: "date", category: "popular" },
  { id: "customerName", label: "Customer", type: "text", category: "popular" },
];

function initials(full: string) {
  return full
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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

const ch = createColumnHelper<OrderRow>();

/* Deterministic full dataset for the "server". */
const ALL_ORDERS: OrderRow[] = makeOrders(500);

export function DataTableOrdersPage() {
  const [data, setData] = useState<OrderRow[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

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

  const fetchRef = useRef(0);
  const fetchData = (state: DataTableServerRequestState) => {
    const run = ++fetchRef.current;
    setLoading(true);
    window.setTimeout(() => {
      if (run !== fetchRef.current) return;
      let rows = [...ALL_ORDERS];
      if (state.globalFilter) {
        const q = String(state.globalFilter).toLowerCase();
        rows = rows.filter(
          (o) =>
            o.number.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) ||
            o.customerEmail.toLowerCase().includes(q),
        );
      }
      for (const f of state.columnFilters) {
        if (f.id === "status") {
          rows = rows.filter((o) => o.status === f.value);
        } else if (f.id === "customerName") {
          const q = String(f.value).toLowerCase();
          rows = rows.filter((o) => o.customerName.toLowerCase().includes(q));
        } else if (f.id === "total") {
          const [min, max] = (f.value as [number | "", number | ""]) ?? [
            "",
            "",
          ];
          if (min !== "" && min != null)
            rows = rows.filter((o) => o.total >= Number(min));
          if (max !== "" && max != null)
            rows = rows.filter((o) => o.total <= Number(max));
        } else if (f.id === "placedAt") {
          const [from, to] = (f.value as [string, string]) ?? ["", ""];
          if (from) rows = rows.filter((o) => o.placedAt >= from);
          if (to) rows = rows.filter((o) => o.placedAt <= to);
        }
      }
      if (state.sorting.length > 0) {
        rows.sort((a, b) => {
          for (const s of state.sorting) {
            const av = (a as unknown as Record<string, number | string>)[s.id]!;
            const bv = (b as unknown as Record<string, number | string>)[s.id]!;
            if (av < bv) return s.desc ? 1 : -1;
            if (av > bv) return s.desc ? -1 : 1;
          }
          return 0;
        });
      }
      const total = rows.length;
      const start = state.pagination.pageIndex * state.pagination.pageSize;
      const page = rows.slice(start, start + state.pagination.pageSize);
      setData(page);
      setRowCount(total);
      setLoading(false);
    }, 350);
  };

  const handleApplyFilters = (groups: FilterGroup[]) => {
    setFilterGroups(groups);
    setColumnFilters(filterGroupsToColumnFilters(groups));
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleRefresh = () => {
    fetchData({
      sorting,
      globalFilter,
      columnFilters,
      pagination,
      grouping: [],
    });
    toast.info("Refreshed", "Reloaded from the server.");
  };

  const handleExport = () =>
    toast.info("Export", `Would export ${rowCount} filtered orders.`);

  const handleCancel = (ids: number[]) =>
    toast.warning(
      `Cancelled ${ids.length} order${ids.length === 1 ? "" : "s"}`,
      "Demo action.",
    );

  const handleRefund = (ids: number[]) =>
    toast.success(
      `Refund queued for ${ids.length} order${ids.length === 1 ? "" : "s"}`,
      "Demo action.",
    );

  const columns = useMemo<ColumnDef<OrderRow, any>[]>(
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
      ch.accessor("number", {
        id: "number",
        header: "Order #",
        size: 140,
        enableSorting: true,
        cell: ({ getValue }) => {
          const v = getValue<string>();
          return (
            <CopyableCell copyText={v}>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
            </CopyableCell>
          );
        },
      }),
      ch.accessor((o) => o.customerName, {
        id: "customer",
        header: "Customer",
        size: 240,
        enableSorting: true,
        sortingFn: "text",
        cell: ({ row }) => {
          const o = row.original;
          return (
            <AvatarCell
              fallback={initials(o.customerName)}
              size="sm"
              color="auto"
              colorKey={o.customerName}
              primary={o.customerName}
              secondary={o.customerEmail}
            />
          );
        },
      }),
      ch.accessor("status", {
        id: "status",
        header: "Status",
        size: 140,
        enableSorting: true,
        enableGrouping: true,
        filterFn: "equalsString",
        cell: ({ getValue }) => {
          const v = getValue<OrderStatus>();
          return (
            <StatusBadgeCell
              tone={ORDER_STATUS_TONES[v]}
              label={ORDER_STATUS_LABELS[v]}
            />
          );
        },
      }),
      ch.accessor("itemCount", {
        id: "itemCount",
        header: "Items",
        size: 100,
        enableSorting: true,
        cell: ({ getValue }) => (
          <NumberCell value={getValue<number>()} align="end" />
        ),
      }),
      ch.accessor("total", {
        id: "total",
        header: "Total",
        size: 140,
        enableSorting: true,
        aggregationFn: "sum",
        cell: ({ getValue }) => (
          <NumberCell value={getValue<number>()} format="currency" align="end" />
        ),
        aggregatedCell: ({ getValue }) => (
          <NumberCell value={getValue<number>()} format="currency" align="end" />
        ),
      }),
      ch.accessor("placedAt", {
        id: "placedAt",
        header: "Placed",
        size: 170,
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
          const o = row.original;
          return (
            <ActionsCell
              items={[
                {
                  id: "invoice",
                  label: "View invoice",
                  onSelect: () => toast.info("Invoice", o.number),
                },
                {
                  id: "refund",
                  label: "Refund",
                  onSelect: () => handleRefund([o.id]),
                },
                {
                  id: "cancel",
                  label: "Cancel",
                  tone: "danger",
                  separatorBefore: true,
                  onSelect: () => handleCancel([o.id]),
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
      title="Orders"
      description="Server-side orders showcase — simulated 350ms latency, date-range filter drawer, grouping by status, bulk refund/cancel, and export."
    >
      <DataTable.Root
        columns={columns}
        data={data}
        mode="server"
        rowCount={rowCount}
        onDataRequest={fetchData}
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
        pagination={pagination}
        onPaginationChange={setPagination}
        columnVisibility={columnVisibility}
        columnOrder={columnOrder}
        defaultColumnPinning={{ left: ["__select"], right: ["__actions"] }}
      >
        <DataTable.Toolbar sticky>
          <DataTable.SearchField
            value={globalFilter}
            onValueChange={setGlobalFilter}
            inputSize="md"
            placeholder="Search orders"
            aria-label="Search orders"
          />
          <div style={{ flex: 1 }} />
          <DataTable.FilterButton
            count={filterGroups.reduce((s, g) => s + g.conditions.length, 0)}
            onClick={() => setFilterOpen(true)}
          />
          <DataTable.CustomizeButton onClick={() => setCustomizeOpen(true)} />
          <DataTable.RefreshButton onClick={handleRefresh} disabled={loading} />
          <DataTable.ExportButton onClick={handleExport} />
        </DataTable.Toolbar>

        <DataTableDndProvider>
          <DataTable.ScrollArea>
            <DataTable.Table>
              <DataTable.Header />
              <DataTable.Body emptyMessage="No orders match your filters." />
            </DataTable.Table>
          </DataTable.ScrollArea>
          <DataTable.ColumnGuide />
        </DataTableDndProvider>

        <DataTable.BulkActions.Root sticky>
          {({ selectedRows, selectedCount, clearSelection }) => {
            const ids = selectedRows.map((r) => (r.original as OrderRow).id);
            return (
              <>
                <DataTable.BulkActions.Count count={selectedCount} />
                <div style={{ flex: 1 }} />
                <DataTable.ExportButton
                  size="sm"
                  onClick={() =>
                    toast.success("Export queued", `${ids.length} order(s).`)
                  }
                />
                <DataTable.DeleteButton
                  size="sm"
                  label="Refund"
                  onClick={() => handleRefund(ids)}
                />
                <DataTable.DeleteButton
                  size="sm"
                  label="Cancel"
                  onClick={() => handleCancel(ids)}
                />
                <DataTable.BulkActions.Clear onClick={clearSelection} />
              </>
            );
          }}
        </DataTable.BulkActions.Root>

        <DataTable.Pagination.Default
          pageSizeOptions={[10, 20, 50, 100]}
          sticky
        />

        <DataTable.LoadingOverlay open={loading} label="Loading orders..." />
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
