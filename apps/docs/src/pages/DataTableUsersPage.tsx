import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DataTable,
  createColumnHelper,
  flexRender,
  useDataTableContext,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type Header,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  type DataTableViewMode,
} from "@virtari/react-data-table";
import {
  DataTableCustomizeDrawer,
  DataTableDndProvider,
  DataTableDraggableHeaderCell,
  type ColumnConfig,
} from "@virtari/react-data-table/dnd";
import "@virtari/react-data-table/styles";
import { Avatar } from "@virtari/react-avatar";
import { Badge } from "@virtari/react-badge";
import { Button } from "@virtari/react-button";
import { Checkbox } from "@virtari/react-checkbox";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@virtari/react-drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@virtari/react-dropdown-menu";
import { Input } from "@virtari/react-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari/react-select";
import { Switch } from "@virtari/react-switch";
import { toast } from "@virtari/react-toast";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronDown,
  IconDownload,
  IconEyeOff,
  IconFileText,
  IconFilter,
  IconLayoutGrid,
  IconLayoutList,
  IconList,
  IconLock,
  IconMail,
  IconPencil,
  IconPlus,
  IconRefresh,
  IconRotateClockwise2,
  IconSearch,
  IconSettings,
  IconShield,
  IconTable,
  IconTrash,
  IconUser,
  IconUserCheck,
  IconUserOff,
  IconX,
} from "@virtari/react-icons";

/* ════════════════════════════════════════════════════════════════ *
 * Types & mock data — 380 deterministic users
 * ════════════════════════════════════════════════════════════════ */

type Role =
  | "Project Manager"
  | "UX Designer"
  | "Front-End Developer"
  | "Product Owner"
  | "Business Analyst"
  | "Data Analyst"
  | "Software Engineer"
  | "Marketing Specialist"
  | "Security Analyst"
  | "DevOps Engineer"
  | "System Architect";

type Status = "active" | "inactive";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  joinedAt: string;
  twoFA: boolean;
}

const ROLES: Role[] = [
  "Project Manager",
  "UX Designer",
  "Front-End Developer",
  "Product Owner",
  "Business Analyst",
  "Data Analyst",
  "Software Engineer",
  "Marketing Specialist",
  "Security Analyst",
  "DevOps Engineer",
  "System Architect",
];

const FIRST_NAMES = [
  "Liam", "Noah", "Isabella", "William", "James", "Benjamin", "Amelia",
  "Emma", "Olivia", "Ava", "Sophia", "Mia", "Lucas", "Alexander", "Harper",
  "Mason", "Ethan", "Logan", "Charlotte", "Mila", "Henry", "Ella", "Jack",
  "Grace", "Daniel", "Lily", "Owen", "Chloe", "Wyatt", "Zoey",
];

const LAST_NAMES = [
  "Smith", "Anderson", "Garcia", "Clark", "Hall", "Lewis", "Davis",
  "Johnson", "Brown", "Williams", "Jones", "Miller", "Young", "Wright",
  "Martinez", "Taylor", "Moore", "Jackson", "Thomas", "White", "Harris",
];

function rng(seed: number) {
  let x = seed | 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}

function makeUsers(count: number): User[] {
  const r = rng(0x1f37c);
  const out: User[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[Math.floor(r() * FIRST_NAMES.length)]!;
    const last = LAST_NAMES[Math.floor(r() * LAST_NAMES.length)]!;
    out.push({
      id: i + 1,
      firstName: first,
      lastName: last,
      email: `${last.toLowerCase()}${i > 0 ? i : ""}@example.com`,
      role: ROLES[Math.floor(r() * ROLES.length)]!,
      status: r() < 0.85 ? "active" : "inactive",
      twoFA: r() < 0.7,
      joinedAt: new Date(
        now - Math.floor(r() * 36 * 30 * 24 * 3600 * 1000),
      ).toISOString(),
    });
  }
  return out;
}

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

/** Seeded per-user hue so every avatar has a stable, distinct tint. */
function avatarTint(seed: string): React.CSSProperties {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return {
    background: `linear-gradient(135deg,
      oklch(68% 0.16 ${hue}),
      oklch(56% 0.19 ${(hue + 40) % 360}))`,
    color: "#fff",
  };
}

function formatJoined(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return `${date}, ${time}`;
}

/* ════════════════════════════════════════════════════════════════ *
 * Default column config (drives the Customize drawer)
 * ════════════════════════════════════════════════════════════════ */

const DEFAULT_COLUMN_CONFIG: ColumnConfig[] = [
  { id: "name", label: "Full name", icon: <IconUser size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "email", label: "Email", icon: <IconMail size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "role", label: "Role", icon: <IconShield size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "status", label: "Status", icon: <IconUserCheck size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "joinedAt", label: "Joined date", icon: <IconCalendar size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "twoFA", label: "2F Auth", icon: <IconLock size={14} stroke={1.75} aria-hidden />, visible: true },
];

const STORAGE_KEY = "vds:demo:users-table-columns";

/* ════════════════════════════════════════════════════════════════ *
 * Page
 * ════════════════════════════════════════════════════════════════ */

const ch = createColumnHelper<User>();

export function DataTableUsersPage() {
  /* Data */
  const [data, setData] = useState<User[]>(() => makeUsers(380));
  const [loading, setLoading] = useState(false);

  /* Table state — controlled */
  const [viewMode, setViewMode] = useState<DataTableViewMode>("table");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnOrderUser, setColumnOrderUser] = useState<ColumnOrderState | null>(null);

  /* Column config (with localStorage persistence) */
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(() => {
    if (typeof window === "undefined") return DEFAULT_COLUMN_CONFIG;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_COLUMN_CONFIG;
      const parsed = JSON.parse(saved) as { id: string; visible: boolean }[];
      /* Re-merge with default to keep icons/labels fresh, preserve order+visibility. */
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

  /* Derive TanStack columnVisibility + columnOrder from config */
  const columnVisibility = useMemo<VisibilityState>(() => {
    const out: VisibilityState = {};
    for (const c of columnConfig) out[c.id] = c.visible;
    return out;
  }, [columnConfig]);

  /* Default order from customize drawer; user DnD reorder overrides it. */
  const columnOrderDefault = useMemo<string[]>(
    () => ["__select", ...columnConfig.map((c) => c.id), "__actions"],
    [columnConfig],
  );
  const columnOrder = columnOrderUser ?? columnOrderDefault;

  /* Drawer states */
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [quickEdit, setQuickEdit] = useState<User | null>(null);

  /* ─────────────────────────── Mutations ─────────────────────────── */

  const handleRefresh = () => {
    setLoading(true);
    window.setTimeout(() => {
      setData(makeUsers(380));
      setLoading(false);
      toast.success("Refreshed", "Loaded the latest user data.");
    }, 600);
  };

  const handleExport = (format: "csv" | "excel" | "json" | "pdf") => {
    toast.info(`Export — ${format.toUpperCase()}`, "Demo action — no file produced.");
  };

  const handleResetView = () => {
    setColumnConfig(DEFAULT_COLUMN_CONFIG);
    setSorting([]);
    setColumnFilters([]);
    setGlobalFilter("");
    toast.info("View reset", "Columns, sort, and filters restored.");
  };

  const handleAddUser = (u: Omit<User, "id">) => {
    setData((prev) => [
      { ...u, id: prev.length === 0 ? 1 : prev[0]!.id - 1 },
      ...prev,
    ]);
    setAddUserOpen(false);
    toast.success("User added", `${u.firstName} ${u.lastName} created.`);
  };

  const handleSaveQuickEdit = (next: User) => {
    setData((prev) => prev.map((u) => (u.id === next.id ? next : u)));
    setQuickEdit(null);
    toast.success("Saved", `Updated ${next.firstName} ${next.lastName}.`);
  };

  const handleDelete = (ids: number[]) => {
    setData((prev) => prev.filter((u) => !ids.includes(u.id)));
    setRowSelection({});
    toast.success(
      `Deleted ${ids.length} user${ids.length === 1 ? "" : "s"}`,
      "Demo action.",
    );
  };

  const handleDeactivate = (ids: number[]) => {
    setData((prev) =>
      prev.map((u) => (ids.includes(u.id) ? { ...u, status: "inactive" } : u)),
    );
    setRowSelection({});
    toast.success(
      `Deactivated ${ids.length} user${ids.length === 1 ? "" : "s"}`,
      "Demo action.",
    );
  };

  /* ─────────────────────────── Filters wiring ────────────────────── */

  const setFilter = (id: string, value: unknown) => {
    setColumnFilters((prev) => {
      const others = prev.filter((c) => c.id !== id);
      if (value === undefined || value === null || value === "") return others;
      return [...others, { id, value }];
    });
  };

  const filterValue = (id: string) =>
    columnFilters.find((c) => c.id === id)?.value;

  /* ─────────────────────────── Columns ───────────────────────────── */

  const columns = useMemo<ColumnDef<User, any>[]>(
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
      ch.accessor((u) => `${u.firstName} ${u.lastName}`, {
        id: "name",
        header: "Full name",
        size: 230,
        enableSorting: true,
        sortingFn: "text",
        cell: ({ row }) => {
          const u = row.original;
          const full = `${u.firstName} ${u.lastName}`;
          return (
            <button
              type="button"
              className="vds-data-table-row-link"
              onClick={() => setQuickEdit(u)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--vds-space-2, 0.5rem)",
                minInlineSize: 0,
              }}
            >
              <Avatar
                fallback={initials(u.firstName, u.lastName)}
                size="sm"
                style={avatarTint(full)}
              />
              <span
                style={{
                  fontWeight: "var(--vds-font-weight-medium, 500)",
                  color: "var(--vds-color-fg-default, var(--vds-color-text, #111827))",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {full}
              </span>
            </button>
          );
        },
      }),
      ch.accessor("email", {
        id: "email",
        header: "Email",
        size: 220,
        enableSorting: true,
        cell: ({ getValue }) => {
          const v = getValue<string>();
          return (
            <a
              href={`mailto:${v}`}
              style={{
                color: "var(--vds-color-primary-emphasis, #6366f1)",
                textDecoration: "underline",
                textDecorationColor:
                  "color-mix(in oklch, currentColor, transparent 60%)",
                textUnderlineOffset: "3px",
              }}
            >
              {v}
            </a>
          );
        },
      }),
      ch.accessor("role", {
        id: "role",
        header: "Role",
        size: 200,
        enableSorting: true,
        filterFn: "equalsString",
        cell: ({ getValue }) => (
          <span style={{ color: "inherit" }}>{getValue<Role>()}</span>
        ),
      }),
      ch.accessor("status", {
        id: "status",
        header: "Status",
        size: 130,
        enableSorting: true,
        filterFn: "equalsString",
        cell: ({ getValue }) => {
          const v = getValue<Status>();
          return (
            <Badge
              color={v === "active" ? "success" : "danger"}
              variant="soft"
              size="sm"
              dot
            >
              {v === "active" ? "Active" : "Inactive"}
            </Badge>
          );
        },
      }),
      ch.accessor("joinedAt", {
        id: "joinedAt",
        header: "Joined date",
        size: 200,
        enableSorting: true,
        sortingFn: "datetime",
        cell: ({ getValue }) => (
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatJoined(getValue<string>())}
          </span>
        ),
      }),
      ch.accessor("twoFA", {
        id: "twoFA",
        header: "2F Auth",
        size: 130,
        enableSorting: true,
        filterFn: (row, id, value) => row.getValue<boolean>(id) === value,
        cell: ({ getValue }) => {
          const enabled = getValue<boolean>();
          return (
            <Badge
              color={enabled ? "success" : "neutral"}
              variant="soft"
              size="sm"
              shape="square"
            >
              {enabled ? "Enabled" : "Disabled"}
            </Badge>
          );
        },
      }),
      {
        id: "__actions",
        size: 160,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
        header: () => "Actions",
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div style={{ display: "inline-flex", gap: "var(--vds-space-1, 0.25rem)" }}>
              <Button
                variant="ghost"
                color="neutral"
                size="xs"
                leftSection={<IconPencil size={12} stroke={1.75} aria-hidden />}
                onClick={() => setQuickEdit(u)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                color="danger"
                size="xs"
                leftSection={<IconTrash size={12} stroke={1.75} aria-hidden />}
                onClick={() => handleDelete([u.id])}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const filterCount = columnFilters.length;

  /* ─────────────────────────── Render ────────────────────────────── */

  return (
    <div>
      <DataTable.Root
        columns={columns}
        data={data}
        size="md"
        bordered="rows"
        stickyHeader
        columnResizeMode="onChange"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
        {/* ───── Toolbar (row 1) ───── */}
        <DataTable.Toolbar>
          <ViewModeSegmented value={viewMode} onChange={setViewMode} />

          <div style={{ flex: 1 }} aria-hidden />

          <SearchInput value={globalFilter} onChange={setGlobalFilter} />

          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            leftSection={<IconEyeOff size={14} stroke={1.75} aria-hidden />}
            onClick={() => setCustomizeOpen(true)}
          >
            Hide
          </Button>

          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            leftSection={<IconSettings size={14} stroke={1.75} aria-hidden />}
            onClick={() => setCustomizeOpen(true)}
          >
            Customize
          </Button>

          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            leftSection={
              <IconRefresh
                size={14}
                stroke={1.75}
                aria-hidden
                style={
                  loading
                    ? { animation: "vds-spin 0.9s linear infinite" }
                    : undefined
                }
              />
            }
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>

          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            leftSection={
              <IconRotateClockwise2 size={14} stroke={1.75} aria-hidden />
            }
            onClick={handleResetView}
          >
            Reset
          </Button>

          <Button
            variant={filterCount > 0 ? "outline" : "ghost"}
            color={filterCount > 0 ? "primary" : "neutral"}
            size="sm"
            leftSection={<IconFilter size={14} stroke={1.75} aria-hidden />}
            onClick={() => setFilterDrawerOpen(true)}
          >
            Filter
            {filterCount > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minInlineSize: "1.125rem",
                  blockSize: "1.125rem",
                  marginInlineStart: "0.375rem",
                  paddingInline: "0.25rem",
                  borderRadius: "999px",
                  background: "var(--vds-color-primary-emphasis, #6366f1)",
                  color: "#fff",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                }}
              >
                {filterCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                color="neutral"
                size="sm"
                leftSection={<IconDownload size={14} stroke={1.75} aria-hidden />}
                rightSection={
                  <IconChevronDown size={12} stroke={1.75} aria-hidden />
                }
              >
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={6}>
              <DropdownMenuLabel>Export as</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleExport("csv")}>
                <IconFileText size={14} stroke={1.75} aria-hidden />
                <span>CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport("excel")}>
                <IconFileText size={14} stroke={1.75} aria-hidden />
                <span>Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport("json")}>
                <IconFileText size={14} stroke={1.75} aria-hidden />
                <span>JSON</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleExport("pdf")}>
                <IconFileText size={14} stroke={1.75} aria-hidden />
                <span>PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="solid"
            color="primary"
            size="sm"
            leftSection={<IconPlus size={14} stroke={1.75} aria-hidden />}
            rightSection={
              <IconChevronDown size={12} stroke={1.75} aria-hidden />
            }
            onClick={() => setAddUserOpen(true)}
          >
            Add User
          </Button>
        </DataTable.Toolbar>

        {/* ───── Filter bar (row 2) — chips for active filters ───── */}
        <ActiveFilterBar
          columnFilters={columnFilters}
          onRemove={(id) => setFilter(id, undefined)}
          onAdd={() => setFilterDrawerOpen(true)}
        />

        {/* ───── Body — Views switches Table/Board/List based on viewMode ───── */}
        <DataTableDndProvider onColumnOrderChange={setColumnOrderUser}>
          <DataTable.Views
            /* Skip system columns (checkbox + row actions) from the default
             * Board/List renderers — we re-mount them in custom layouts so the
             * checkbox sits on the leading edge and actions on the trailing. */
            skipColumns={["__select", "__actions"]}
            emptyMessage="No users match your filters."
            table={
              <>
                <DataTable.ScrollArea>
                  <DataTable.Table>
                    <DataTable.Header>
                      {(groups) =>
                        groups.map((g) => (
                          <DataTable.HeaderGroup key={g.id} headerGroup={g}>
                            {(headers) =>
                              headers.map((h) => (
                                <SortableResizableHeader key={h.id} header={h} />
                              ))
                            }
                          </DataTable.HeaderGroup>
                        ))
                      }
                    </DataTable.Header>
                    <DataTable.Body emptyMessage="No users match your filters." />
                  </DataTable.Table>
                </DataTable.ScrollArea>
                <DataTable.ColumnGuide />
              </>
            }
            list={<CustomListView onQuickEdit={setQuickEdit} onDelete={handleDelete} />}
            board={<CustomBoardView onQuickEdit={setQuickEdit} onDelete={handleDelete} />}
          />
        </DataTableDndProvider>

        {/* ───── Bulk actions ───── */}
        <DataTable.BulkActions.Root sticky>
          {({ selectedRows, selectedCount, clearSelection }) => {
            const ids = selectedRows.map((r) => (r.original as User).id);
            return (
              <>
                <span className="vds-data-table-bulk-count">
                  {selectedCount} selected
                </span>
                <div style={{ flex: 1 }} aria-hidden />
                <Button
                  variant="ghost"
                  color="warning"
                  size="sm"
                  leftSection={<IconUserOff size={14} stroke={1.75} aria-hidden />}
                  onClick={() => handleDeactivate(ids)}
                >
                  Deactivate
                </Button>
                <Button
                  variant="ghost"
                  color="danger"
                  size="sm"
                  leftSection={<IconTrash size={14} stroke={1.75} aria-hidden />}
                  onClick={() => handleDelete(ids)}
                >
                  Delete
                </Button>
                <Button
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  leftSection={<IconX size={14} stroke={1.75} aria-hidden />}
                  onClick={clearSelection}
                >
                  Clear
                </Button>
              </>
            );
          }}
        </DataTable.BulkActions.Root>

        {/* ───── Pagination — built with vds Select + Buttons ───── */}
        <CustomPagination />

        {loading && <DataTable.LoadingOverlay open label="Refreshing…" />}
      </DataTable.Root>

      {/* ───── Filter drawer (custom — drives columnFilters directly) ───── */}
      <FilterDrawer
        open={filterDrawerOpen}
        onOpenChange={setFilterDrawerOpen}
        roleValue={filterValue("role") as Role | undefined}
        statusValue={filterValue("status") as Status | undefined}
        twoFAValue={filterValue("twoFA") as boolean | undefined}
        onChange={setFilter}
        onClearAll={() => setColumnFilters([])}
      />

      {/* ───── Customize drawer (column visibility + reorder via DnD) ───── */}
      <DataTableCustomizeDrawer
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        columns={columnConfig}
        onColumnsChange={setColumnConfig}
        defaultColumns={DEFAULT_COLUMN_CONFIG}
      />

      {/* ───── Add User drawer ───── */}
      <AddUserDrawer
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        onSubmit={handleAddUser}
      />

      {/* ───── Quick Edit drawer ───── */}
      <QuickEditDrawer
        user={quickEdit}
        onOpenChange={(open) => !open && setQuickEdit(null)}
        onSave={handleSaveQuickEdit}
      />

      {/* Spinner keyframes for the refresh icon. */}
      <style>{`
        @keyframes vds-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * View-mode segmented toggle (Table / Board / List) — vds Buttons
 * ════════════════════════════════════════════════════════════════ */

function ViewModeSegmented({
  value,
  onChange,
}: {
  value: DataTableViewMode;
  onChange: (v: DataTableViewMode) => void;
}) {
  const items: { id: DataTableViewMode; label: string; icon: ReactNode }[] = [
    { id: "table", label: "Table", icon: <IconTable size={14} stroke={1.75} aria-hidden /> },
    { id: "board", label: "Board", icon: <IconLayoutGrid size={14} stroke={1.75} aria-hidden /> },
    { id: "list", label: "List", icon: <IconList size={14} stroke={1.75} aria-hidden /> },
  ];
  return (
    <div
      role="group"
      aria-label="View mode"
      style={{
        display: "inline-flex",
        gap: "2px",
        padding: "2px",
        background: "var(--vds-color-surface-raised, var(--vds-color-bg-subtle, rgba(255,255,255,0.04)))",
        border: "1px solid var(--vds-color-border-muted, var(--vds-color-border, rgba(255,255,255,0.08)))",
        borderRadius: "var(--vds-radius-button, 0.5rem)",
      }}
    >
      {items.map((it) => (
        <Button
          key={it.id}
          variant={value === it.id ? "solid" : "ghost"}
          color={value === it.id ? "neutral" : "neutral"}
          size="xs"
          leftSection={it.icon}
          aria-pressed={value === it.id}
          onClick={() => onChange(it.id)}
          style={
            value === it.id
              ? {
                  background:
                    "var(--vds-color-surface, var(--vds-color-bg-elevated, #1f2937))",
                  color: "var(--vds-color-fg-default, var(--vds-color-text, #f9fafb))",
                  boxShadow:
                    "var(--vds-shadow-xs, 0 1px 2px rgba(0,0,0,0.06))",
                }
              : undefined
          }
        >
          {it.label}
        </Button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Search input — vds Input with absolute IconSearch
 * ════════════════════════════════════════════════════════════════ */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ position: "relative", inlineSize: "16rem" }}>
      <IconSearch
        size={14}
        stroke={1.75}
        aria-hidden
        style={{
          position: "absolute",
          insetInlineStart: "0.625rem",
          insetBlockStart: "50%",
          transform: "translateY(-50%)",
          color: "var(--vds-color-text-muted, #9ca3af)",
          pointerEvents: "none",
        }}
      />
      <Input
        inputSize="sm"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        aria-label="Search users"
        style={{
          paddingInlineStart: "1.875rem",
          inlineSize: "100%",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Sortable + Resizable header cell — wraps DataTable.HeaderCell
 * ════════════════════════════════════════════════════════════════ */

function SortableResizableHeader({ header }: { header: Header<any, unknown> }) {
  const canSort = header.column.getCanSort();
  const canResize = header.column.getCanResize();
  const isPinned =
    header.column.id === "__select" || header.column.id === "__actions";

  /* flexRender handles function headers — NEVER stringify a function. */
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );

  const inner = canSort ? (
    <DataTable.SortTrigger header={header as never}>
      {content}
    </DataTable.SortTrigger>
  ) : (
    content
  );

  /* Pinned system columns (checkbox/actions) aren't draggable. */
  if (isPinned) {
    return (
      <DataTable.HeaderCell header={header}>
        {inner}
        {canResize && <DataTable.ResizeHandle header={header} />}
      </DataTable.HeaderCell>
    );
  }

  return (
    <DataTableDraggableHeaderCell header={header}>
      {inner}
      {canResize && <DataTable.ResizeHandle header={header} />}
    </DataTableDraggableHeaderCell>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Active filter bar — chips for current columnFilters
 * ════════════════════════════════════════════════════════════════ */

function ActiveFilterBar({
  columnFilters,
  onRemove,
  onAdd,
}: {
  columnFilters: ColumnFiltersState;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  const labelFor = (id: string) => {
    switch (id) {
      case "role":
        return "Role";
      case "status":
        return "Status";
      case "twoFA":
        return "2F Auth";
      default:
        return id;
    }
  };
  const renderValue = (id: string, v: unknown): string => {
    if (id === "twoFA") return v ? "Enabled" : "Disabled";
    if (id === "status") return v === "active" ? "Active" : "Inactive";
    return String(v);
  };

  return (
    <div
      className="vds-data-table-filter-bar"
      role="toolbar"
      aria-label="Active filters"
    >
      {columnFilters.map((f) => (
        <button
          key={f.id}
          type="button"
          className="vds-data-table-filter-chip"
          onClick={onAdd}
        >
          <span className="vds-data-table-filter-chip-label">
            {labelFor(f.id)}
          </span>
          <span className="vds-data-table-filter-chip-value">
            {renderValue(f.id, f.value)}
          </span>
          <span
            role="button"
            tabIndex={-1}
            className="vds-data-table-filter-chip-remove"
            aria-label={`Remove ${labelFor(f.id)} filter`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(f.id);
            }}
          >
            ×
          </span>
        </button>
      ))}
      <button type="button" className="vds-data-table-filter-add" onClick={onAdd}>
        <IconPlus size={12} stroke={1.75} aria-hidden />
        <span>Add filter</span>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Custom pagination — vds Select + Buttons
 * ════════════════════════════════════════════════════════════════ */

function CustomPagination() {
  const { table } = useDataTableContext();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const total = table.getFilteredRowModel().rows.length;
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(total, (pageIndex + 1) * pageSize);

  const pages = pageRange(pageIndex, pageCount, 5);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="vds-data-table-pagination"
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--vds-space-3, 0.75rem)",
          color: "var(--vds-color-text-muted, #9ca3af)",
          fontSize: "var(--vds-text-sm, 0.875rem)",
        }}
      >
        <span>Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => table.setPageSize(Number(v))}
        >
          <SelectTrigger size="sm" style={{ minInlineSize: "5rem" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 15, 25, 50, 100].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>
          {start}-{end} of {total} rows
        </span>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="First page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          leftSection={<IconChevronsLeft size={14} stroke={1.75} aria-hidden />}
        />
        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="Previous page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          leftSection={<IconChevronLeft size={14} stroke={1.75} aria-hidden />}
        />
        {pages.map((p, i) =>
          typeof p === "number" ? (
            <Button
              key={`p-${p}`}
              variant={p === pageIndex ? "solid" : "ghost"}
              color={p === pageIndex ? "primary" : "neutral"}
              size="sm"
              aria-label={`Page ${p + 1}`}
              aria-current={p === pageIndex ? "page" : undefined}
              onClick={() => table.setPageIndex(p)}
            >
              {p + 1}
            </Button>
          ) : (
            <span
              key={`e-${i}`}
              aria-hidden
              style={{
                paddingInline: "0.375rem",
                color: "var(--vds-color-text-muted, #9ca3af)",
              }}
            >
              …
            </span>
          ),
        )}
        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="Next page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          leftSection={<IconChevronRight size={14} stroke={1.75} aria-hidden />}
        />
        <Button
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="Last page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(pageCount - 1)}
          leftSection={<IconChevronsRight size={14} stroke={1.75} aria-hidden />}
        />
      </div>
    </nav>
  );
}

function pageRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | "ellipsis-l" | "ellipsis-r")[] {
  if (total <= 0) return [];
  const out: (number | "ellipsis-l" | "ellipsis-r")[] = [];
  if (total <= siblingCount + 4) {
    for (let i = 0; i < total; i++) out.push(i);
    return out;
  }
  const left = Math.max(current - Math.floor(siblingCount / 2), 1);
  const right = Math.min(left + siblingCount - 1, total - 2);
  out.push(0);
  if (left > 1) out.push("ellipsis-l");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < total - 2) out.push("ellipsis-r");
  out.push(total - 1);
  return out;
}

/* ════════════════════════════════════════════════════════════════ *
 * Filter drawer — drives columnFilters directly via setFilter
 * ════════════════════════════════════════════════════════════════ */

function FilterDrawer({
  open,
  onOpenChange,
  roleValue,
  statusValue,
  twoFAValue,
  onChange,
  onClearAll,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  roleValue?: Role;
  statusValue?: Status;
  twoFAValue?: boolean;
  onChange: (id: string, value: unknown) => void;
  onClearAll: () => void;
}) {
  const activeCount =
    (roleValue ? 1 : 0) +
    (statusValue ? 1 : 0) +
    (twoFAValue !== undefined ? 1 : 0);

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(26rem, 95vw)"
    >
      <DrawerContent aria-label="Filters">
        <DrawerHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--vds-space-2, 0.5rem)",
            }}
          >
            <DrawerTitle>Filters</DrawerTitle>
            {activeCount > 0 && (
              <Badge color="primary" variant="soft" size="sm">
                {activeCount}
              </Badge>
            )}
          </div>
        </DrawerHeader>

        <DrawerBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-4, 1rem)",
            }}
          >
            <FilterField
              label="Role"
              icon={<IconShield size={14} stroke={1.75} aria-hidden />}
            >
              <Select
                value={roleValue ?? ""}
                onValueChange={(v) => onChange("role", v || undefined)}
              >
                <SelectTrigger
                  size="md"
                  clearable={!!roleValue}
                  onClear={() => onChange("role", undefined)}
                >
                  <SelectValue placeholder="Any role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField
              label="Status"
              icon={<IconUserCheck size={14} stroke={1.75} aria-hidden />}
            >
              <Select
                value={statusValue ?? ""}
                onValueChange={(v) =>
                  onChange("status", (v as Status) || undefined)
                }
              >
                <SelectTrigger
                  size="md"
                  clearable={!!statusValue}
                  onClear={() => onChange("status", undefined)}
                >
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField
              label="2F Auth"
              icon={<IconLock size={14} stroke={1.75} aria-hidden />}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--vds-space-3, 0.75rem)",
                }}
              >
                <span style={{ fontSize: "var(--vds-text-sm, 0.875rem)" }}>
                  {twoFAValue === undefined
                    ? "Any"
                    : twoFAValue
                      ? "Enabled only"
                      : "Disabled only"}
                </span>
                <Switch
                  checked={twoFAValue === true}
                  onCheckedChange={(c) =>
                    onChange("twoFA", c ? true : undefined)
                  }
                  aria-label="Filter 2F Auth enabled"
                />
              </div>
              {twoFAValue !== undefined && (
                <Button
                  variant="link"
                  color="neutral"
                  size="xs"
                  onClick={() => onChange("twoFA", undefined)}
                  style={{ alignSelf: "flex-start", padding: 0 }}
                >
                  Clear
                </Button>
              )}
            </FilterField>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <div
            style={{
              display: "flex",
              gap: "var(--vds-space-2, 0.5rem)",
              justifyContent: "space-between",
              inlineSize: "100%",
            }}
          >
            <Button
              variant="ghost"
              color="danger"
              size="sm"
              onClick={onClearAll}
              disabled={activeCount === 0}
            >
              Clear all
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FilterField({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5, 0.375rem)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--vds-space-1-5, 0.375rem)",
          fontSize: "var(--vds-text-xs, 0.75rem)",
          fontWeight: "var(--vds-font-weight-medium, 500)",
          color: "var(--vds-color-text-muted, #9ca3af)",
          textTransform: "uppercase",
          letterSpacing: "var(--vds-tracking-wide, 0.025em)",
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Add User drawer — vds Drawer + Inputs + Select + Switch
 * ════════════════════════════════════════════════════════════════ */

function AddUserDrawer({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (u: Omit<User, "id">) => void;
}) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Front-End Developer");
  const [active, setActive] = useState(true);
  const [twoFA, setTwoFA] = useState(true);

  useEffect(() => {
    if (open) {
      setFirst("");
      setLast("");
      setEmail("");
      setRole("Front-End Developer");
      setActive(true);
      setTwoFA(true);
    }
  }, [open]);

  const canSubmit = first.trim() && last.trim() && email.trim().includes("@");

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(28rem, 95vw)"
    >
      <DrawerContent aria-label="Add new user">
        <DrawerHeader>
          <DrawerTitle>Add new user</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <div style={fieldStackStyle}>
            <Field label="First name">
              <Input
                inputSize="md"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="e.g. Liam"
                autoFocus
              />
            </Field>
            <Field label="Last name">
              <Input
                inputSize="md"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                placeholder="e.g. Smith"
              />
            </Field>
            <Field label="Email">
              <Input
                inputSize="md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </Field>
            <Field label="Role">
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger size="md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <ToggleRow
                label={active ? "Active" : "Inactive"}
                checked={active}
                onChange={setActive}
              />
            </Field>
            <Field label="2F Authentication">
              <ToggleRow
                label={twoFA ? "Enabled" : "Disabled"}
                checked={twoFA}
                onChange={setTwoFA}
              />
            </Field>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div style={drawerFooterStyle}>
            <Button
              variant="ghost"
              color="neutral"
              size="md"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="md"
              disabled={!canSubmit}
              onClick={() =>
                onSubmit({
                  firstName: first.trim(),
                  lastName: last.trim(),
                  email: email.trim(),
                  role,
                  status: active ? "active" : "inactive",
                  twoFA,
                  joinedAt: new Date().toISOString(),
                })
              }
            >
              Create user
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Quick edit drawer
 * ════════════════════════════════════════════════════════════════ */

function QuickEditDrawer({
  user,
  onOpenChange,
  onSave,
}: {
  user: User | null;
  onOpenChange: (o: boolean) => void;
  onSave: (u: User) => void;
}) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Front-End Developer");
  const [active, setActive] = useState(true);
  const [twoFA, setTwoFA] = useState(true);

  useEffect(() => {
    if (user) {
      setFirst(user.firstName);
      setLast(user.lastName);
      setEmail(user.email);
      setRole(user.role);
      setActive(user.status === "active");
      setTwoFA(user.twoFA);
    }
  }, [user]);

  const open = user !== null;

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(28rem, 95vw)"
    >
      <DrawerContent aria-label="Quick edit user">
        <DrawerHeader>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--vds-space-3, 0.75rem)",
            }}
          >
            {user && (
              <Avatar
                fallback={initials(user.firstName, user.lastName)}
                size="md"
                style={avatarTint(`${user.firstName} ${user.lastName}`)}
              />
            )}
            <div>
              <DrawerTitle>Quick edit</DrawerTitle>
              {user && (
                <div
                  style={{
                    fontSize: "var(--vds-text-xs, 0.75rem)",
                    color: "var(--vds-color-text-muted, #9ca3af)",
                  }}
                >
                  ID #{user.id}
                </div>
              )}
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div style={fieldStackStyle}>
            <Field label="First name">
              <Input
                inputSize="md"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </Field>
            <Field label="Last name">
              <Input
                inputSize="md"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </Field>
            <Field label="Email">
              <Input
                inputSize="md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Role">
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger size="md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <ToggleRow
                label={active ? "Active" : "Inactive"}
                checked={active}
                onChange={setActive}
              />
            </Field>
            <Field label="2F Authentication">
              <ToggleRow
                label={twoFA ? "Enabled" : "Disabled"}
                checked={twoFA}
                onChange={setTwoFA}
              />
            </Field>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div style={drawerFooterStyle}>
            <Button
              variant="ghost"
              color="neutral"
              size="md"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="md"
              onClick={() => {
                if (!user) return;
                onSave({
                  ...user,
                  firstName: first.trim(),
                  lastName: last.trim(),
                  email: email.trim(),
                  role,
                  status: active ? "active" : "inactive",
                  twoFA,
                });
              }}
            >
              Save changes
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Helpers
 * ════════════════════════════════════════════════════════════════ */

const fieldStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--vds-space-4, 1rem)",
};

const drawerFooterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "var(--vds-space-2, 0.5rem)",
  inlineSize: "100%",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5, 0.375rem)",
      }}
    >
      <span
        style={{
          fontSize: "var(--vds-text-xs, 0.75rem)",
          fontWeight: "var(--vds-font-weight-medium, 500)",
          color: "var(--vds-color-text-muted, #9ca3af)",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-3, 0.75rem)",
        padding: "var(--vds-space-2, 0.5rem) var(--vds-space-3, 0.75rem)",
        background:
          "var(--vds-color-surface-raised, var(--vds-color-bg-subtle, rgba(255,255,255,0.04)))",
        border:
          "1px solid var(--vds-color-border-muted, var(--vds-color-border, rgba(255,255,255,0.08)))",
        borderRadius: "var(--vds-radius-element, 0.375rem)",
      }}
    >
      <span style={{ fontSize: "var(--vds-text-sm, 0.875rem)" }}>{label}</span>
      <Switch
        checked={checked}
        onCheckedChange={(c) => onChange(Boolean(c))}
        aria-label={label}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Custom List view — checkbox on the leading edge, actions on trailing
 * ════════════════════════════════════════════════════════════════ */

function CustomListView({
  onQuickEdit,
  onDelete,
}: {
  onQuickEdit: (u: User) => void;
  onDelete: (ids: number[]) => void;
}) {
  const { table } = useDataTableContext();
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="vds-data-table-list vds-data-table-list-empty">
        No users match your filters.
      </div>
    );
  }

  return (
    <div role="list" className="vds-data-table-list">
      {rows.map((row) => {
        const u = row.original as User;
        const full = `${u.firstName} ${u.lastName}`;
        return (
          <div
            key={row.id}
            role="listitem"
            data-selected={row.getIsSelected() ? "" : undefined}
            className="vds-data-table-list-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--vds-space-3, 0.75rem)",
            }}
          >
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(c) => row.toggleSelected(Boolean(c))}
              aria-label={`Select ${full}`}
            />
            <Avatar
              fallback={initials(u.firstName, u.lastName)}
              size="sm"
              style={avatarTint(full)}
            />
            <div style={{ flex: 1, minInlineSize: 0 }}>
              <div className="vds-data-table-list-primary">{full}</div>
              <div
                className="vds-data-table-list-secondary"
                style={{ display: "flex", gap: "var(--vds-space-3, 0.75rem)" }}
              >
                <span>{u.email}</span>
                <span>{u.role}</span>
                <Badge
                  color={u.status === "active" ? "success" : "danger"}
                  variant="soft"
                  size="xs"
                  dot
                >
                  {u.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <Badge
                  color={u.twoFA ? "success" : "neutral"}
                  variant="soft"
                  size="xs"
                  shape="square"
                >
                  2FA {u.twoFA ? "on" : "off"}
                </Badge>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {formatJoined(u.joinedAt)}
                </span>
              </div>
            </div>
            <div
              style={{ display: "inline-flex", gap: "var(--vds-space-1, 0.25rem)" }}
            >
              <Button
                variant="ghost"
                color="neutral"
                size="xs"
                leftSection={<IconPencil size={12} stroke={1.75} aria-hidden />}
                onClick={() => onQuickEdit(u)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                color="danger"
                size="xs"
                leftSection={<IconTrash size={12} stroke={1.75} aria-hidden />}
                onClick={() => onDelete([u.id])}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ *
 * Custom Board view — card grid with checkbox top-left, actions top-right
 * ════════════════════════════════════════════════════════════════ */

function CustomBoardView({
  onQuickEdit,
  onDelete,
}: {
  onQuickEdit: (u: User) => void;
  onDelete: (ids: number[]) => void;
}) {
  const { table } = useDataTableContext();
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="vds-data-table-board vds-data-table-board-empty">
        No users match your filters.
      </div>
    );
  }

  return (
    <div role="list" className="vds-data-table-board">
      {rows.map((row) => {
        const u = row.original as User;
        const full = `${u.firstName} ${u.lastName}`;
        return (
          <article
            key={row.id}
            role="listitem"
            data-selected={row.getIsSelected() ? "" : undefined}
            className="vds-data-table-board-card"
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "var(--vds-space-2, 0.5rem)",
              }}
            >
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(c) => row.toggleSelected(Boolean(c))}
                aria-label={`Select ${full}`}
              />
              <div
                style={{
                  display: "inline-flex",
                  gap: "var(--vds-space-1, 0.25rem)",
                }}
              >
                <Button
                  variant="ghost"
                  color="neutral"
                  size="xs"
                  leftSection={
                    <IconPencil size={12} stroke={1.75} aria-hidden />
                  }
                  onClick={() => onQuickEdit(u)}
                  aria-label="Edit"
                />
                <Button
                  variant="ghost"
                  color="danger"
                  size="xs"
                  leftSection={
                    <IconTrash size={12} stroke={1.75} aria-hidden />
                  }
                  onClick={() => onDelete([u.id])}
                  aria-label="Delete"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--vds-space-3, 0.75rem)",
              }}
            >
              <Avatar
                fallback={initials(u.firstName, u.lastName)}
                size="md"
                style={avatarTint(full)}
              />
              <div style={{ minInlineSize: 0 }}>
                <div
                  style={{
                    fontWeight: "var(--vds-font-weight-semibold, 600)",
                    color:
                      "var(--vds-color-fg-default, var(--vds-color-text, #f9fafb))",
                  }}
                >
                  {full}
                </div>
                <div
                  style={{
                    color: "var(--vds-color-text-muted, #9ca3af)",
                    fontSize: "var(--vds-text-xs, 0.75rem)",
                  }}
                >
                  {u.email}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--vds-space-1-5, 0.375rem)",
              }}
            >
              <Badge color="neutral" variant="soft" size="xs" shape="square">
                {u.role}
              </Badge>
              <Badge
                color={u.status === "active" ? "success" : "danger"}
                variant="soft"
                size="xs"
                dot
              >
                {u.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <Badge
                color={u.twoFA ? "success" : "neutral"}
                variant="soft"
                size="xs"
                shape="square"
              >
                2FA {u.twoFA ? "on" : "off"}
              </Badge>
            </div>
            <div
              style={{
                marginBlockStart: "auto",
                color: "var(--vds-color-text-muted, #9ca3af)",
                fontSize: "var(--vds-text-xs, 0.75rem)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Joined {formatJoined(u.joinedAt)}
            </div>
          </article>
        );
      })}
    </div>
  );
}
