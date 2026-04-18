import { useEffect, useMemo, useState } from "react";
import {
  DataTable,
  createColumnHelper,
  FilterPopover,
  TextFilter,
  NumberFilter,
  SelectFilter,
  DateFilter,
  EditableCell,
  AvatarCell,
  StatusBadgeCell,
  NumberCell,
  DateCell,
  LinkCell,
  CopyableCell,
  ActionsCell,
  DataTableFilterDrawer,
  type FilterFieldDefinition,
  type FilterGroup,
  useDataTableContext,
  type ColumnDef,
  type DataTableServerRequestState,
} from "@virtari/react-data-table";
import {
  DataTableCustomizeDrawer,
  DataTableDndProvider,
  DataTableDraggableHeaderCell,
  type ColumnConfig,
} from "@virtari/react-data-table/dnd";
import "@virtari/react-data-table/styles";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

/* ─────────────────────────────── Dataset ─────────────────────────────── */

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "pending" | "suspended";
  role: "admin" | "editor" | "viewer";
  salary: number;
  joined: string;
}

const STATUS: Person["status"][] = ["active", "pending", "suspended"];
const ROLE: Person["role"][] = ["admin", "editor", "viewer"];

function makePeople(n: number): Person[] {
  const out: Person[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: i + 1,
      firstName: `User${i + 1}`,
      lastName: `Doe${i + 1}`,
      email: `user${i + 1}@virtari.dev`,
      status: STATUS[i % 3]!,
      role: ROLE[(i * 7) % 3]!,
      salary: 30000 + ((i * 137) % 120000),
      joined: new Date(2020, (i * 5) % 12, ((i * 3) % 28) + 1)
        .toISOString()
        .slice(0, 10),
    });
  }
  return out;
}

const ch = createColumnHelper<Person>();

/* ─────────────────────────────── 1. Basic ─────────────────────────────── */

function BasicExample() {
  const [data] = useState(() => makePeople(12));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First name", size: 140 }),
      ch.accessor("lastName", { header: "Last name", size: 140 }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("status", { header: "Status", size: 120 }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data} size="md" bordered="rows">
      <DataTable.Toolbar>
        <DataTable.GlobalFilter placeholder="Search people…" />
      </DataTable.Toolbar>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body emptyMessage="No results" />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 2. Resizable ─────────────────────────────── */

function ResizableExample() {
  const [data] = useState(() => makePeople(20));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", {
        header: "First",
        size: 160,
        minSize: 80,
        maxSize: 320,
      }),
      ch.accessor("lastName", { header: "Last", size: 160, minSize: 80 }),
      ch.accessor("email", { header: "Email", size: 280, minSize: 120 }),
      ch.accessor("status", { header: "Status", size: 120, minSize: 80 }),
      ch.accessor("salary", {
        header: "Salary",
        size: 120,
        minSize: 80,
        cell: (i) => `$${i.getValue<number>().toLocaleString()}`,
      }),
    ],
    [],
  );
  return (
    <div style={{ position: "relative" }}>
      <DataTable.Root columns={columns} data={data} columnResizeMode="onChange">
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header />
            <DataTable.Body />
          </DataTable.Table>
        </DataTable.ScrollArea>
        <DataTable.ColumnGuide />
      </DataTable.Root>
      <p style={{ fontSize: 12, color: "var(--vds-color-text-muted)", marginTop: 8 }}>
        Drag a column edge · double-click the handle to auto-fit · Tab to the
        handle and press ← / → (Shift for ±32) to resize by keyboard.
      </p>
    </div>
  );
}

/* ─────────────────────────────── 3. Virtualized 10k ─────────────────────────────── */

function VirtualizedExample() {
  const [data] = useState(() => makePeople(10_000));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("id", { header: "#", size: 80 }),
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("lastName", { header: "Last", size: 140 }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("status", { header: "Status", size: 120 }),
      ch.accessor("salary", {
        header: "Salary",
        size: 120,
        cell: (i) => `$${i.getValue<number>().toLocaleString()}`,
      }),
    ],
    [],
  );
  return (
    <div style={{ blockSize: 420 }}>
      <DataTable.Root
        columns={columns}
        data={data}
        virtualization={{ estimateRowSize: 40, overscan: 10 }}
        style={{ blockSize: "100%" }}
      >
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header />
            <DataTable.Body />
          </DataTable.Table>
        </DataTable.ScrollArea>
      </DataTable.Root>
    </div>
  );
}

/* ─────────────────────────────── 4. Selection ─────────────────────────────── */

function SelectionExample() {
  const [data] = useState(() => makePeople(10));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "__select",
        size: 40,
        header: () => <DataTable.SelectAllCheckbox scope="page" />,
        cell: ({ row }) => <DataTable.RowSelectCheckbox row={row} />,
        enableSorting: false,
        enableResizing: false,
      },
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role", size: 120 }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
      <DataTable.Pagination.Default pageSizeOptions={[5, 10, 25]} />
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 5. Pinned columns ─────────────────────────────── */

function PinnedExample() {
  const [data] = useState(() => makePeople(20));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("id", { header: "#", size: 60 }),
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("lastName", { header: "Last", size: 140 }),
      ch.accessor("email", { header: "Email", size: 260 }),
      ch.accessor("status", { header: "Status", size: 120 }),
      ch.accessor("role", { header: "Role", size: 120 }),
      ch.accessor("salary", {
        header: "Salary",
        size: 140,
        cell: (i) => `$${i.getValue<number>().toLocaleString()}`,
      }),
      ch.accessor("joined", { header: "Joined", size: 140 }),
    ],
    [],
  );
  return (
    <DataTable.Root
      columns={columns}
      data={data}
      defaultColumnPinning={{ left: ["id", "firstName"], right: ["salary"] }}
    >
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 6. Column reorder (dnd) ─────────────────────────────── */

function DndExample() {
  const [data] = useState(() => makePeople(10));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("lastName", { header: "Last", size: 140 }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role", size: 120 }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTableDndProvider>
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header>
              {(groups) =>
                groups.map((g) => (
                  <DataTable.HeaderGroup key={g.id} headerGroup={g}>
                    {(headers) =>
                      headers.map((h) => (
                        <DataTableDraggableHeaderCell
                          key={h.id}
                          header={h}
                        />
                      ))
                    }
                  </DataTable.HeaderGroup>
                ))
              }
            </DataTable.Header>
            <DataTable.Body />
          </DataTable.Table>
        </DataTable.ScrollArea>
      </DataTableDndProvider>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 7. Server-side ─────────────────────────────── */

function ServerSideExample() {
  const [data, setData] = useState<Person[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<
    { id: string; desc: boolean }[]
  >([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("id", { header: "#", size: 60 }),
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("status", { header: "Status", size: 120 }),
    ],
    [],
  );

  const fetch = (state: DataTableServerRequestState) => {
    setLoading(true);
    window.setTimeout(() => {
      const all = makePeople(250);
      /* Apply sort client-side to mimic a real server. */
      const sorted =
        state.sorting.length > 0
          ? [...all].sort((a, b) => {
              for (const s of state.sorting) {
                const av = (a as unknown as Record<string, string | number>)[s.id]!;
                const bv = (b as unknown as Record<string, string | number>)[s.id]!;
                if (av < bv) return s.desc ? 1 : -1;
                if (av > bv) return s.desc ? -1 : 1;
              }
              return 0;
            })
          : all;
      const start = state.pagination.pageIndex * state.pagination.pageSize;
      setData(sorted.slice(start, start + state.pagination.pageSize));
      setRowCount(sorted.length);
      setLoading(false);
    }, 300);
  };

  return (
    <div style={{ position: "relative" }}>
      <DataTable.Root
        columns={columns}
        data={data}
        mode="server"
        rowCount={rowCount}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        onDataRequest={fetch}
      >
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header />
            <DataTable.Body emptyMessage="Loading…" />
          </DataTable.Table>
        </DataTable.ScrollArea>
        <DataTable.Pagination.Default pageSizeOptions={[5, 10, 25]} />
        <DataTable.LoadingOverlay open={loading} />
      </DataTable.Root>
    </div>
  );
}

/* ─────────────────────────────── 8. Grouping + aggregation ─────────────────────────────── */

function GroupingExample() {
  const [data] = useState(() => makePeople(50));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("status", {
        header: "Status",
        size: 120,
        enableGrouping: true,
      }),
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("lastName", { header: "Last", size: 140 }),
      ch.accessor("salary", {
        header: "Salary",
        size: 140,
        aggregationFn: "mean",
        cell: (i) => {
          const v = i.getValue<number>();
          return `$${Math.round(v).toLocaleString()}`;
        },
        aggregatedCell: (i) => {
          const v = i.getValue<number>();
          return `avg $${Math.round(v).toLocaleString()}`;
        },
      }),
    ],
    [],
  );
  return (
    <DataTable.Root
      columns={columns}
      data={data}
      defaultGrouping={["status"]}
      defaultExpanded={true}
    >
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 9. Inline editing ─────────────────────────────── */

function EditingExample() {
  const [data, setData] = useState(() => makePeople(8));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First", size: 160 }),
      ch.accessor("lastName", { header: "Last", size: 160 }),
      ch.accessor("email", { header: "Email", size: 260 }),
      ch.accessor("salary", {
        header: "Salary",
        size: 140,
        cell: (i) => `$${i.getValue<number>().toLocaleString()}`,
      }),
    ],
    [],
  );
  return (
    <DataTable.Root
      columns={columns}
      data={data}
      onCellEdit={(row, columnId, next) => {
        setData((prev) =>
          prev.map((r) =>
            r.id === (row.original as Person).id
              ? { ...r, [columnId]: next }
              : r,
          ),
        );
      }}
    >
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body>
            {(rows) =>
              rows.map((row) => (
                <DataTable.Row key={row.id} row={row}>
                  {(cells) =>
                    cells.map((cell) =>
                      cell.column.id === "firstName" ||
                      cell.column.id === "lastName" ||
                      cell.column.id === "email" ? (
                        <EditableCell key={cell.id} cell={cell} mode="text" />
                      ) : cell.column.id === "salary" ? (
                        <EditableCell key={cell.id} cell={cell} mode="number" />
                      ) : (
                        <DataTable.Cell key={cell.id} cell={cell} />
                      ),
                    )
                  }
                </DataTable.Row>
              ))
            }
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.ScrollArea>
      <p style={{ fontSize: 12, color: "var(--vds-color-text-muted)", padding: 8 }}>
        Double-click any cell · Enter to commit · Esc to cancel.
      </p>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 10. Per-column filters ─────────────────────────────── */

function FiltersExample() {
  const [data] = useState(() => makePeople(30));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", {
        header: "First",
        size: 160,
        filterFn: "includesString",
      }),
      ch.accessor("status", {
        header: "Status",
        size: 140,
        filterFn: "equalsString",
      }),
      ch.accessor("salary", {
        header: "Salary",
        size: 180,
        filterFn: "inNumberRange",
        cell: (i) => `$${i.getValue<number>().toLocaleString()}`,
      }),
      ch.accessor("joined", {
        header: "Joined",
        size: 200,
        filterFn: (row, id, value: [string, string]) => {
          const v = row.getValue<string>(id);
          const [from, to] = value;
          if (from && v < from) return false;
          if (to && v > to) return false;
          return true;
        },
      }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header>
            {(groups) =>
              groups.map((g) => (
                <DataTable.HeaderGroup key={g.id} headerGroup={g}>
                  {(headers) =>
                    headers.map((h) => (
                      <DataTable.HeaderCell key={h.id} header={h}>
                        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                          {String(h.column.columnDef.header)}
                          <FilterPopover column={h.column}>
                            {h.column.id === "status" ? (
                              <SelectFilter column={h.column} />
                            ) : h.column.id === "salary" ? (
                              <NumberFilter column={h.column} />
                            ) : h.column.id === "joined" ? (
                              <DateFilter column={h.column} />
                            ) : (
                              <TextFilter column={h.column} />
                            )}
                          </FilterPopover>
                        </span>
                      </DataTable.HeaderCell>
                    ))
                  }
                </DataTable.HeaderGroup>
              ))
            }
          </DataTable.Header>
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────────────────────── 11. Variants ─────────────────────────────── */

function VariantsExample() {
  const [data] = useState(() => makePeople(6));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First", size: 140 }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role", size: 120 }),
    ],
    [],
  );
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [bordered, setBordered] = useState<"none" | "rows" | "grid">("rows");
  const [striped, setStriped] = useState(false);
  return (
    <div>
      <Row>
        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value as "sm" | "md" | "lg")} style={{ marginInlineStart: 4 }}>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </label>
        <label>
          Bordered:
          <select
            value={bordered}
            onChange={(e) => setBordered(e.target.value as "none" | "rows" | "grid")}
            style={{ marginInlineStart: 4 }}
          >
            <option value="none">none</option>
            <option value="rows">rows</option>
            <option value="grid">grid</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={striped}
            onChange={(e) => setStriped(e.target.checked)}
          />{" "}
          Striped
        </label>
      </Row>
      <DataTable.Root
        columns={columns}
        data={data}
        size={size}
        bordered={bordered}
        striped={striped}
      >
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header />
            <DataTable.Body />
          </DataTable.Table>
        </DataTable.ScrollArea>
      </DataTable.Root>
    </div>
  );
}

/* ─────────────────────────────── 12. Grid keyboard nav ─────────────────────────────── */

function GridModeExample() {
  const [data] = useState(() => makePeople(10));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("lastName", { header: "Last" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role" }),
    ],
    [],
  );
  return (
    <div>
      <DataTable.Root columns={columns} data={data} interactionMode="grid">
        <DataTable.ScrollArea>
          <DataTable.Table>
            <DataTable.Header />
            <DataTable.Body />
          </DataTable.Table>
        </DataTable.ScrollArea>
      </DataTable.Root>
      <p style={{ fontSize: 12, color: "var(--vds-color-text-muted)", marginTop: 8 }}>
        Focus a cell, then use arrow keys · Home/End (Ctrl for whole grid) ·
        PageUp/PageDown by 10 rows.
      </p>
    </div>
  );
}

/* ─────────────── v2: View modes (table / board / list) ─────────────── */

function ViewModesExample() {
  const [data] = useState(() => makePeople(12));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("lastName", { header: "Last" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role" }),
      ch.accessor("status", { header: "Status" }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data} defaultViewMode="table">
      <DataTable.Toolbar>
        <DataTable.ViewModeToggle />
        <div style={{ flex: 1 }} />
        <DataTable.GlobalFilter placeholder="Search…" />
      </DataTable.Toolbar>
      <DataTable.Views
        table={
          <DataTable.ScrollArea>
            <DataTable.Table>
              <DataTable.Header />
              <DataTable.Body />
            </DataTable.Table>
          </DataTable.ScrollArea>
        }
      />
    </DataTable.Root>
  );
}

/* ─────────────── v2: Bulk actions + select-all-across-pages ─────────────── */

function BulkActionsExample() {
  const [data] = useState(() => makePeople(10));
  const [allAcross, setAllAcross] = useState(false);
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "__select",
        size: 40,
        header: () => <DataTable.SelectAllCheckbox scope="page" />,
        cell: ({ row }) => <DataTable.RowSelectCheckbox row={row} />,
        enableSorting: false,
        enableResizing: false,
      },
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("role", { header: "Role" }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
      <DataTable.BulkActions.Root isAllAcrossPagesSelected={allAcross}>
        {({ selectedRows, selectedCount, clearSelection }) => (
          <>
            <DataTable.BulkActions.SelectAllAcrossPages
              totalCount={2500}
              isAllAcrossPagesSelected={allAcross}
              onSelectAll={() => setAllAcross(true)}
              onClear={() => {
                setAllAcross(false);
                clearSelection();
              }}
            />
            <DataTable.BulkActions.Count
              count={allAcross ? 2500 : selectedCount}
            />
            <div style={{ flex: 1 }} />
            <DataTable.ExportButton
              onClick={() => console.log("Export", selectedRows)}
            />
            <DataTable.DeleteButton
              onClick={() => console.log("Delete", selectedRows)}
            />
            <DataTable.BulkActions.Clear />
          </>
        )}
      </DataTable.BulkActions.Root>
    </DataTable.Root>
  );
}

/* ─────────────── v2: Toolbar action buttons ─────────────── */

function ToolbarExample() {
  const [data] = useState(() => makePeople(8));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("status", { header: "Status" }),
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.Toolbar>
        <DataTable.ViewModeToggle />
        <div style={{ flex: 1 }} />
        <DataTable.GlobalFilter placeholder="Search" />
        <DataTable.FilterButton count={2} onClick={() => {}} />
        <DataTable.HideColumnsButton onClick={() => {}} />
        <DataTable.CustomizeButton onClick={() => {}} />
        <DataTable.RefreshButton onClick={() => {}} />
        <DataTable.ExportButton onClick={() => {}} />
        <DataTable.AddButton onClick={() => {}} label="New user" />
      </DataTable.Toolbar>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────── v2: Cell primitives ─────────────── */

function CellPrimitivesExample() {
  const [data] = useState(() => makePeople(6));
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor((r) => r, {
        id: "person",
        header: "Person",
        size: 260,
        cell: (info) => {
          const p = info.getValue() as Person;
          return (
            <AvatarCell
              fallback={`${p.firstName[0]}${p.lastName[0]}`}
              primary={`${p.firstName} ${p.lastName}`}
              secondary={
                <CopyableCell>
                  <LinkCell href={`mailto:${p.email}`}>{p.email}</LinkCell>
                </CopyableCell>
              }
            />
          );
        },
      }),
      ch.accessor("status", {
        header: "Status",
        size: 140,
        cell: (info) => {
          const s = info.getValue<Person["status"]>();
          const tone =
            s === "active" ? "success" : s === "pending" ? "warning" : "danger";
          return <StatusBadgeCell tone={tone} label={s} />;
        },
      }),
      ch.accessor("salary", {
        header: "Salary",
        size: 140,
        cell: (info) => (
          <NumberCell value={info.getValue<number>()} format="currency" />
        ),
      }),
      ch.accessor("joined", {
        header: "Joined",
        size: 160,
        cell: (info) => (
          <DateCell value={info.getValue<string>()} format="medium" />
        ),
      }),
      {
        id: "actions",
        size: 60,
        enableSorting: false,
        enableResizing: false,
        header: "",
        cell: ({ row }) => (
          <ActionsCell
            items={[
              { id: "view", label: "View", onSelect: () => console.log("view", row.original) },
              { id: "edit", label: "Edit", onSelect: () => console.log("edit") },
              {
                id: "delete",
                label: "Delete",
                tone: "danger",
                separatorBefore: true,
                onSelect: () => console.log("delete"),
              },
            ]}
          />
        ),
      },
    ],
    [],
  );
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
    </DataTable.Root>
  );
}

/* ─────────────── v2: FilterDrawer ─────────────── */

function FilterDrawerExample() {
  const [data] = useState(() => makePeople(20));
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<FilterGroup[]>([]);
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      ch.accessor("firstName", { header: "First" }),
      ch.accessor("email", { header: "Email", size: 240 }),
      ch.accessor("status", { header: "Status" }),
      ch.accessor("role", { header: "Role" }),
    ],
    [],
  );
  const availableFilters: FilterFieldDefinition[] = [
    {
      id: "status",
      label: "Status",
      type: "select",
      category: "shown",
      options: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "suspended" },
      ],
    },
    { id: "role", label: "Role", type: "select", category: "shown", options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ] },
    { id: "firstName", label: "First name", type: "text", category: "popular" },
    { id: "salary", label: "Salary", type: "number", category: "popular" },
    { id: "joined", label: "Joined", type: "date", category: "popular" },
  ];
  const activeCount = groups.reduce((s, g) => s + g.conditions.length, 0);
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.Toolbar>
        <div style={{ flex: 1 }} />
        <DataTable.FilterButton count={activeCount} onClick={() => setOpen(true)} />
      </DataTable.Toolbar>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
      <DataTableFilterDrawer
        open={open}
        onOpenChange={setOpen}
        availableFilters={availableFilters}
        filterGroups={groups}
        onApplyFilters={setGroups}
      />
    </DataTable.Root>
  );
}

/* ─────────────── v2: Customize view drawer ─────────────── */

function CustomizeDrawerExample() {
  const [data] = useState(() => makePeople(8));
  const [open, setOpen] = useState(false);
  const defaultColumns: ColumnConfig[] = [
    { id: "firstName", label: "First name", visible: true },
    { id: "lastName", label: "Last name", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "role", label: "Role", visible: false },
    { id: "salary", label: "Salary", visible: false },
    { id: "joined", label: "Joined", visible: false },
  ];
  const [configs, setConfigs] = useState<ColumnConfig[]>(defaultColumns);
  const columns = useMemo<ColumnDef<Person>[]>(() => {
    const byId: Record<string, ColumnDef<Person>> = {
      firstName: ch.accessor("firstName", { header: "First" }),
      lastName: ch.accessor("lastName", { header: "Last" }),
      email: ch.accessor("email", { header: "Email", size: 240 }),
      status: ch.accessor("status", { header: "Status" }),
      role: ch.accessor("role", { header: "Role" }),
      salary: ch.accessor("salary", { header: "Salary" }),
      joined: ch.accessor("joined", { header: "Joined" }),
    };
    return configs.filter((c) => c.visible).map((c) => byId[c.id]!);
  }, [configs]);
  return (
    <DataTable.Root columns={columns} data={data}>
      <DataTable.Toolbar>
        <div style={{ flex: 1 }} />
        <DataTable.CustomizeButton onClick={() => setOpen(true)} />
      </DataTable.Toolbar>
      <DataTable.ScrollArea>
        <DataTable.Table>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Table>
      </DataTable.ScrollArea>
      <DataTableCustomizeDrawer
        open={open}
        onOpenChange={setOpen}
        columns={configs}
        defaultColumns={defaultColumns}
        onColumnsChange={setConfigs}
      />
    </DataTable.Root>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function DataTablePage() {
  return (
    <div>
      <Section
        title="Basic"
        description="Core composition — sort, global filter, ellipsis truncation. Click any header to sort; Shift-click for multi-sort."
      >
        <BasicExample />
      </Section>
      <Section
        title="Excel-like resize"
        description="Drag column edges, double-click to auto-fit, keyboard-accessible via Tab + arrows."
      >
        <ResizableExample />
      </Section>
      <Section
        title="Virtualized 10,000 rows"
        description="@tanstack/react-virtual powers the row window. Scroll at 60fps; sticky header persists."
      >
        <VirtualizedExample />
      </Section>
      <Section
        title="Row selection + pagination"
        description="Tri-state header checkbox (all / some / none) + compound pagination."
      >
        <SelectionExample />
      </Section>
      <Section
        title="Pinned columns"
        description="Sticky left + right rails with auto scroll-shadows."
      >
        <PinnedExample />
      </Section>
      <Section
        title="Column reorder (drag-and-drop)"
        description="Optional @virtari/react-data-table/dnd subpath. @dnd-kit only loads when imported."
      >
        <DndExample />
      </Section>
      <Section
        title="Server-side"
        description="mode='server' disables client-side row models. onDataRequest fires debounced on any state change."
      >
        <ServerSideExample />
      </Section>
      <Section
        title="Grouping + aggregation"
        description="Group by column, aggregate with sum/mean/count/min/max via TanStack's aggregationFn."
      >
        <GroupingExample />
      </Section>
      <Section
        title="Inline cell editing"
        description="Double-click a cell to edit. Enter commits, Esc cancels. Supports text/number/date editors."
      >
        <EditingExample />
      </Section>
      <Section
        title="Per-column filters"
        description="Text / Number (range) / Select / Date primitives wrapped in a popover."
      >
        <FiltersExample />
      </Section>
      <Section
        title="Density, bordered, striped"
        description="Variant matrix — three density modes, three border modes, opt-in zebra."
      >
        <VariantsExample />
      </Section>
      <Section
        title="Grid interaction mode (beta)"
        description="interactionMode='grid' enables roving tabindex + arrow-key cell navigation."
      >
        <GridModeExample />
      </Section>

      <Section
        title="View modes — Table / Board / List"
        description="Three pre-built layouts for the same dataset. Toggle via DataTable.ViewModeToggle."
      >
        <ViewModesExample />
      </Section>
      <Section
        title="Bulk actions bar"
        description="Sticky bar that appears when rows are selected. Supports 'select all across pages' banner + custom action slots."
      >
        <BulkActionsExample />
      </Section>
      <Section
        title="Toolbar action buttons"
        description="Named buttons for Filter / Refresh / Export / Add / Customize / Hide / ResetLayout — all with matching icons and count badges."
      >
        <ToolbarExample />
      </Section>
      <Section
        title="Cell primitives library"
        description="Avatar, StatusBadge, Number, Date, Link, Copyable, Actions — composable cell renderers tied to Virtari's token system."
      >
        <CellPrimitivesExample />
      </Section>
      <Section
        title="Filter drawer (advanced)"
        description="Drawer-based multi-condition filter UI with AND/OR groups, comparison operators, and per-field config panels."
      >
        <FilterDrawerExample />
      </Section>
      <Section
        title="Customize view drawer"
        description="Reorder + toggle column visibility via drag-and-drop. Ships under /dnd subpath."
      >
        <CustomizeDrawerExample />
      </Section>
    </div>
  );
}
