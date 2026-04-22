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
} from "@virtari-packages/react-data-table";
import {
  DataTableCustomizeDrawer,
  DataTableDndProvider,
  DataTableDraggableHeaderCell,
  type ColumnConfig,
} from "@virtari-packages/react-data-table/dnd";
import "@virtari-packages/react-data-table/styles";
import { Avatar } from "@virtari-packages/react-avatar";
import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import { Checkbox } from "@virtari-packages/react-checkbox";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@virtari-packages/react-drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@virtari-packages/react-dropdown-menu";
import { Input } from "@virtari-packages/react-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import { toast } from "@virtari-packages/react-toast";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronDown,
  IconDownload,
  IconFileText,
  IconLock,
  IconMail,
  IconPencil,
  IconPlus,
  IconRefresh,
  IconShield,
  IconTrash,
  IconUser,
  IconUserCheck,
  IconUserOff,
  IconX,
} from "@virtari-packages/react-icons";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Types & mock data â€” 380 deterministic users
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Default column config (drives the Customize drawer)
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const DEFAULT_COLUMN_CONFIG: ColumnConfig[] = [
  { id: "name", label: "Full name", icon: <IconUser size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "email", label: "Email", icon: <IconMail size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "role", label: "Role", icon: <IconShield size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "status", label: "Status", icon: <IconUserCheck size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "joinedAt", label: "Joined date", icon: <IconCalendar size={14} stroke={1.75} aria-hidden />, visible: true },
  { id: "twoFA", label: "2F Auth", icon: <IconLock size={14} stroke={1.75} aria-hidden />, visible: true },
];

const STORAGE_KEY = "vds:demo:users-table-columns";
const SHOW_REFRESH_ACTION = false;

function sameColumnConfig(a: ColumnConfig[], b: ColumnConfig[]) {
  if (a.length !== b.length) return false;
  return a.every((column, index) => {
    const next = b[index];
    return next?.id === column.id && next.visible === column.visible;
  });
}

function sameColumnOrder(a: readonly string[], b: readonly string[]) {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Page
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const ch = createColumnHelper<User>();

export function DataTableUsersPage() {
  /* Data */
  const [data, setData] = useState<User[]>(() => makeUsers(380));
  const [loading, setLoading] = useState(false);

  /* Table state â€” controlled */
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
  const isLayoutCustomized = useMemo(
    () =>
      !sameColumnConfig(columnConfig, DEFAULT_COLUMN_CONFIG) ||
      (columnOrderUser !== null &&
        !sameColumnOrder(columnOrderUser, columnOrderDefault)),
    [columnConfig, columnOrderDefault, columnOrderUser],
  );

  const handleColumnsChange = (next: ColumnConfig[]) => {
    setColumnConfig(next);
    setColumnOrderUser(null);
  };

  /* Drawer states */
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [quickEdit, setQuickEdit] = useState<User | null>(null);

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Mutations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

  const handleRefresh = () => {
    setLoading(true);
    window.setTimeout(() => {
      setData(makeUsers(380));
      setLoading(false);
      toast.success("Refreshed", "Loaded the latest user data.");
    }, 600);
  };

  const handleExport = (format: "csv" | "excel" | "json" | "pdf") => {
    toast.info(`Export â€” ${format.toUpperCase()}`, "Demo action â€” no file produced.");
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

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Filters wiring â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

  const setFilter = (id: string, value: unknown) => {
    setColumnFilters((prev) => {
      const others = prev.filter((c) => c.id !== id);
      if (value === undefined || value === null || value === "") return others;
      return [...others, { id, value }];
    });
  };

  const filterValue = (id: string) =>
    columnFilters.find((c) => c.id === id)?.value;

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Columns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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
                color="auto"
                colorKey={full}
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
  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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
        {/* â”€â”€â”€â”€â”€ Toolbar (row 1) â”€â”€â”€â”€â”€ */}
        <DataTable.Toolbar>
          <DataTable.ViewModeToggle />

          <div style={{ flex: 1 }} aria-hidden />

          <DataTable.SearchField
            value={globalFilter}
            onValueChange={setGlobalFilter}
            inputSize="md"
            placeholder="Search"
            aria-label="Search users"
          />

          <DataTable.CustomizeButton
            label={isLayoutCustomized ? "Customized" : "Customize"}
            variant={isLayoutCustomized ? "soft" : "ghost"}
            size="md"
            intent="neutral"
            onClick={() => setCustomizeOpen(true)}
          />

          {SHOW_REFRESH_ACTION && (
            <Button
              variant="ghost"
              color="contrast"
              size="md"
              aria-label="Refresh"
              onClick={handleRefresh}
              disabled={loading}
            >
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
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="soft"
                color="contrast"
                size="md"
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
            size="md"
            leftSection={<IconPlus size={14} stroke={1.75} aria-hidden />}
            rightSection={
              <IconChevronDown size={12} stroke={1.75} aria-hidden />
            }
            onClick={() => setAddUserOpen(true)}
          >
            Add User
          </Button>
        </DataTable.Toolbar>

        {/* â”€â”€â”€â”€â”€ Filter bar (row 2) â€” chips for active filters â”€â”€â”€â”€â”€ */}
        <ActiveFilterBar
          columnFilters={columnFilters}
          onRemove={(id) => setFilter(id, undefined)}
          onAdd={() => setFilterDrawerOpen(true)}
        />

        {/* â”€â”€â”€â”€â”€ Body â€” Views switches Table/Board/List based on viewMode â”€â”€â”€â”€â”€ */}
        <DataTableDndProvider onColumnOrderChange={setColumnOrderUser}>
          <DataTable.Views
            /* Skip system columns (checkbox + row actions) from the default
             * Board/List renderers â€” we re-mount them in custom layouts so the
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

        {/* â”€â”€â”€â”€â”€ Bulk actions â”€â”€â”€â”€â”€ */}
        <DataTable.BulkActions.Root
          sticky
          style={{
            "--data-table-bulk-sticky-offset":
              "var(--data-table-pagination-sticky-offset)",
          } as React.CSSProperties}
        >
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

        {/* â”€â”€â”€â”€â”€ Pagination â€” built with vds Select + Buttons â”€â”€â”€â”€â”€ */}
        <CustomPagination />

        {loading && <DataTable.LoadingOverlay open label="Refreshing..." />}
      </DataTable.Root>

      {/* â”€â”€â”€â”€â”€ Filter drawer (custom â€” drives columnFilters directly) â”€â”€â”€â”€â”€ */}
      <FilterDrawer
        open={filterDrawerOpen}
        onOpenChange={setFilterDrawerOpen}
        roleValue={filterValue("role") as Role | undefined}
        statusValue={filterValue("status") as Status | undefined}
        twoFAValue={filterValue("twoFA") as boolean | undefined}
        onChange={setFilter}
        onClearAll={() => setColumnFilters([])}
      />

      {/* â”€â”€â”€â”€â”€ Customize drawer (column visibility + reorder via DnD) â”€â”€â”€â”€â”€ */}
      <DataTableCustomizeDrawer
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        columns={columnConfig}
        onColumnsChange={handleColumnsChange}
        defaultColumns={DEFAULT_COLUMN_CONFIG}
      />

      {/* â”€â”€â”€â”€â”€ Add User drawer â”€â”€â”€â”€â”€ */}
      <AddUserDrawer
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        onSubmit={handleAddUser}
      />

      {/* â”€â”€â”€â”€â”€ Quick Edit drawer â”€â”€â”€â”€â”€ */}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Data table header cell composition.
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Data table header cell composition.
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Sortable + Resizable header cell â€” wraps DataTable.HeaderCell
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function SortableResizableHeader({ header }: { header: Header<any, unknown> }) {
  const canSort = header.column.getCanSort();
  const isPinned =
    header.column.id === "__select" || header.column.id === "__actions";

  /* flexRender handles function headers â€” NEVER stringify a function. */
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
      </DataTable.HeaderCell>
    );
  }

  return (
    <DataTableDraggableHeaderCell header={header}>
      {inner}
    </DataTableDraggableHeaderCell>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Active filter bar â€” chips for current columnFilters
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
  const iconFor = (id: string): ReactNode | undefined => {
    switch (id) {
      case "role":
        return <IconUser size={12} stroke={1.75} />;
      case "status":
        return <IconShield size={12} stroke={1.75} />;
      case "twoFA":
        return <IconLock size={12} stroke={1.75} />;
      default:
        return undefined;
    }
  };

  return (
    <DataTable.FilterBar
      sticky
      stickyOffset="var(--data-table-toolbar-sticky-offset, 0)"
      filters={columnFilters.map((f) => ({
        id: f.id,
        icon: iconFor(f.id),
        label: labelFor(f.id),
        value: renderValue(f.id, f.value),
      }))}
      onFilterClick={onAdd}
      onRemoveFilter={onRemove}
      onAddFilter={onAdd}
    />
  );

}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Custom pagination â€” vds Select + Buttons
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
      data-sticky=""
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--vds-space-3, 0.75rem)",
          color: "var(--vds-color-text-muted, #9ca3af)",
          fontSize: "var(--vds-text-sm, 0.875rem)",
          fontWeight: "var(--vds-font-weight-medium, 500)",
        }}
      >
        <span>Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            const nextPageSize = Number(v);
            table.setPagination((prev) => ({
              ...prev,
              pageIndex: 0,
              pageSize: nextPageSize,
            }));
          }}
        >
          <SelectTrigger
            size="sm"
            appearance="outline"
            style={{ minInlineSize: "3.75rem", inlineSize: "3.75rem" }}
          >
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
          color="contrast"
          size="sm"
          aria-label="First page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          leftSection={<IconChevronsLeft size={14} stroke={1.75} aria-hidden />}
        />
        <Button
          variant="ghost"
          color="contrast"
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
              variant={p === pageIndex ? "soft" : "ghost"}
              color="contrast"
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
              ...
            </span>
          ),
        )}
        <Button
          variant="ghost"
          color="contrast"
          size="sm"
          aria-label="Next page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          leftSection={<IconChevronRight size={14} stroke={1.75} aria-hidden />}
        />
        <Button
          variant="ghost"
          color="contrast"
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Filter drawer â€” drives columnFilters directly via setFilter
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Add User drawer â€” vds Drawer + Inputs + Select + Switch
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Quick edit drawer
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
                color="auto"
                colorKey={`${user.firstName} ${user.lastName}`}
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Helpers
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Custom List view â€” checkbox on the leading edge, actions on trailing
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
              flexDirection: "row",
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
              color="auto"
              colorKey={full}
            />
            <div style={{ flex: 1, minInlineSize: 0 }}>
              <div className="vds-data-table-list-primary">{full}</div>
              <div
                className="vds-data-table-list-secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  gap: "var(--vds-space-3, 0.75rem)",
                  minInlineSize: 0,
                  overflow: "hidden",
                }}
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
              style={{
                display: "inline-flex",
                flexShrink: 0,
                gap: "var(--vds-space-1, 0.25rem)",
              }}
            >
              <Button
                variant="ghost"
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• *
 * Custom Board view â€” card grid with checkbox top-left, actions top-right
 * â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

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
                color="auto"
                colorKey={full}
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
