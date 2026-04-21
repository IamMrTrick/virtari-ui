import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@virtari-packages/react-drawer";
import {
  Sidebar as VdsSidebar,
  SidebarHeader,
  SidebarBody,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@virtari-packages/react-sidebar";
import { Nav, NavGroup, NavList, NavItem } from "@virtari-packages/react-nav";
import { Input } from "@virtari-packages/react-input";
import { toast } from "@virtari-packages/react-toast";
import {
  IconAdjustmentsHorizontal,
  IconAlertCircle,
  IconArrowsVertical,
  IconBell,
  IconBook2,
  IconCalendar,
  IconCards,
  IconChevronDown,
  IconChevronRight,
  IconCircle,
  IconCircleDot,
  IconClick,
  IconCompass,
  IconCursorText,
  IconForms,
  IconHeading,
  IconIcons,
  IconKeyboard,
  IconLanguage,
  IconLayout,
  IconLayoutBoard,
  IconLayoutGrid,
  IconLayoutList,
  IconLayoutBottombar,
  IconLayoutNavbar,
  IconLayoutSidebar,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLetterT,
  IconLoader2,
  IconMenu,
  IconMessage2,
  IconPalette,
  IconProgress,
  IconRuler,
  IconSearch,
  IconSelector,
  IconSeparatorHorizontal,
  IconSquareCheck,
  IconSquareRounded,
  IconTable,
  IconTableRow,
  IconTag,
  IconToggleLeft,
  IconToggleRight,
  IconTool,
  IconTypography,
  IconUserCircle,
  IconX,
} from "@virtari-packages/react-icons";

const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

/* ────────────────────────────────
 * Icon map — one Tabler icon per docs page.
 * `FALLBACK_ICON` is used for paths not explicitly mapped.
 * ──────────────────────────────── */
const navIconProps = { size: 16, stroke: 1.75 } as const;

const ICONS: Record<string, ReactNode> = {
  introduction: <IconBook2 {...navIconProps} />,

  sizing: <IconRuler {...navIconProps} />,
  colors: <IconPalette {...navIconProps} />,
  typography: <IconTypography {...navIconProps} />,
  icons: <IconIcons {...navIconProps} />,
  composition: <IconLayoutBoard {...navIconProps} />,
  layout: <IconLayout {...navIconProps} />,
  header: <IconLayoutNavbar {...navIconProps} />,
  nav: <IconCompass {...navIconProps} />,
  "bottom-nav": <IconLayoutBottombar {...navIconProps} />,
  sidebar: <IconLayoutSidebar {...navIconProps} />,
  utilities: <IconTool {...navIconProps} />,
  rtl: <IconLanguage {...navIconProps} />,

  button: <IconClick {...navIconProps} />,
  input: <IconCursorText {...navIconProps} />,
  textarea: <IconForms {...navIconProps} />,
  select: <IconSelector {...navIconProps} />,
  checkbox: <IconSquareCheck {...navIconProps} />,
  "radio-group": <IconCircleDot {...navIconProps} />,
  switch: <IconToggleLeft {...navIconProps} />,
  toggle: <IconToggleRight {...navIconProps} />,
  slider: <IconAdjustmentsHorizontal {...navIconProps} />,
  "date-picker": <IconCalendar {...navIconProps} />,
  label: <IconTag {...navIconProps} />,

  avatar: <IconUserCircle {...navIconProps} />,
  badge: <IconTag {...navIconProps} />,
  chip: <IconTag {...navIconProps} />,
  card: <IconCards {...navIconProps} />,
  heading: <IconHeading {...navIconProps} />,
  text: <IconLetterT {...navIconProps} />,
  separator: <IconSeparatorHorizontal {...navIconProps} />,
  kbd: <IconKeyboard {...navIconProps} />,
  progress: <IconProgress {...navIconProps} />,
  skeleton: <IconSquareRounded {...navIconProps} />,
  spinner: <IconLoader2 {...navIconProps} />,

  dialog: <IconMessage2 {...navIconProps} />,
  drawer: <IconLayoutSidebar {...navIconProps} />,
  "alert-dialog": <IconAlertCircle {...navIconProps} />,
  "dropdown-menu": <IconMenu {...navIconProps} />,
  popover: <IconMessage2 {...navIconProps} />,
  tooltip: <IconMessage2 {...navIconProps} />,
  toast: <IconBell {...navIconProps} />,

  breadcrumb: <IconChevronRight {...navIconProps} />,
  tabs: <IconLayoutGrid {...navIconProps} />,
  accordion: <IconLayoutList {...navIconProps} />,
  collapsible: <IconChevronDown {...navIconProps} />,
  "scroll-area": <IconArrowsVertical {...navIconProps} />,
  "data-table": <IconTable {...navIconProps} />,
  "data-table-users": <IconUserCircle {...navIconProps} />,
  table: <IconTableRow {...navIconProps} />,
};

const FALLBACK_ICON = <IconCircle {...navIconProps} />;

/* ────────────────────────────────
 * Nav data
 * ──────────────────────────────── */
type NavGroupData = { group: string; items: { label: string; path: string }[] };

const NAV_ITEMS: NavGroupData[] = [
  { group: "Overview", items: [{ label: "Introduction", path: "introduction" }] },
  {
    group: "Foundations",
    items: [
      { label: "Sizing", path: "sizing" },
      { label: "Colors", path: "colors" },
      { label: "Typography", path: "typography" },
      { label: "Icons", path: "icons" },
      { label: "Composition", path: "composition" },
      { label: "Page Layout", path: "layout" },
      { label: "Utilities", path: "utilities" },
      { label: "RTL", path: "rtl" },
    ],
  },
  {
    group: "Form Controls",
    items: [
      { label: "Button", path: "button" },
      { label: "Input", path: "input" },
      { label: "Textarea", path: "textarea" },
      { label: "Select", path: "select" },
      { label: "Checkbox", path: "checkbox" },
      { label: "Radio Group", path: "radio-group" },
      { label: "Switch", path: "switch" },
      { label: "Toggle", path: "toggle" },
      { label: "Slider", path: "slider" },
      { label: "Date Picker", path: "date-picker" },
      { label: "Phone Input", path: "phone-input" },
      { label: "Language Picker", path: "language-picker" },
      { label: "Label", path: "label" },
    ],
  },
  {
    group: "Display",
    items: [
      { label: "Avatar", path: "avatar" },
      { label: "Badge", path: "badge" },
      { label: "Chip", path: "chip" },
      { label: "Flag", path: "flag" },
      { label: "Card", path: "card" },
      { label: "Heading", path: "heading" },
      { label: "Text", path: "text" },
      { label: "Separator", path: "separator" },
      { label: "Kbd", path: "kbd" },
      { label: "Progress", path: "progress" },
      { label: "Skeleton", path: "skeleton" },
      { label: "Spinner", path: "spinner" },
    ],
  },
  {
    group: "Overlays",
    items: [
      { label: "Dialog", path: "dialog" },
      { label: "Drawer", path: "drawer" },
      { label: "Alert Dialog", path: "alert-dialog" },
      { label: "Dropdown Menu", path: "dropdown-menu" },
      { label: "Popover", path: "popover" },
      { label: "Tooltip", path: "tooltip" },
      { label: "Toast", path: "toast" },
    ],
  },
  {
    group: "Navigation",
    items: [
      { label: "Header", path: "header" },
      { label: "Navigation", path: "nav" },
      { label: "Bottom Nav", path: "bottom-nav" },
      { label: "Sidebar", path: "sidebar" },
      { label: "Breadcrumb", path: "breadcrumb" },
    ],
  },
  {
    group: "Layout",
    items: [
      { label: "Tabs", path: "tabs" },
      { label: "Accordion", path: "accordion" },
      { label: "Collapsible", path: "collapsible" },
      { label: "Scroll Area", path: "scroll-area" },
    ],
  },
  {
    group: "Data",
    items: [
      { label: "Table", path: "table" },
      { label: "Data Table", path: "data-table" },
      { label: "Users showcase", path: "data-table-users" },
    ],
  },
];

/* ────────────────────────────────
 * Filter helpers
 * ──────────────────────────────── */
function filterGroups(groups: NavGroupData[], q: string): NavGroupData[] {
  if (!q) return groups;
  const needle = q.toLowerCase();
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => i.label.toLowerCase().includes(needle)),
    }))
    .filter((g) => g.items.length > 0);
}

/* ────────────────────────────────
 * Brand — logo + wordmark. Wordmark becomes sr-only on rail so the link
 * keeps its accessible name while visually only the logo remains.
 * ──────────────────────────────── */
function Brand() {
  const { collapsed } = useSidebar();
  return (
    <a
      href="#/introduction"
      className="docs-sidebar-logo"
      aria-label="Virtari Design System — home"
    >
      <span className="docs-sidebar-logo-mark" aria-hidden="true">V</span>
      <span
        className="docs-sidebar-logo-text"
        style={collapsed ? srOnly : undefined}
      >
        Virtari DS
      </span>
    </a>
  );
}

/* ────────────────────────────────
 * NavSearch — filter input with search icon + optional clear.
 * Hidden entirely in rail mode (no room at 3.5rem width).
 * ──────────────────────────────── */
function NavSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { collapsed } = useSidebar();
  if (collapsed) return null;

  return (
    <div style={{ position: "relative" }}>
      <IconSearch
        size={14}
        stroke={1.75}
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInlineStart: "var(--vds-space-2-5, 0.625rem)",
          insetBlockStart: "50%",
          transform: "translateY(-50%)",
          color: "var(--vds-color-text-muted)",
          pointerEvents: "none",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            insetInlineEnd: "var(--vds-space-1-5, 0.375rem)",
            insetBlockStart: "50%",
            transform: "translateY(-50%)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            inlineSize: "1.25rem",
            blockSize: "1.25rem",
            padding: 0,
            background: "transparent",
            border: 0,
            borderRadius: "var(--vds-radius-full, 9999px)",
            color: "var(--vds-color-text-muted)",
            cursor: "pointer",
          }}
        >
          <IconX size={12} stroke={1.75} aria-hidden />
        </button>
      )}
      <Input
        inputSize="sm"
        type="search"
        placeholder="Filter…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter navigation"
        style={{
          paddingInlineStart: "var(--vds-space-7, 1.75rem)",
          paddingInlineEnd: value
            ? "var(--vds-space-7, 1.75rem)"
            : undefined,
          inlineSize: "100%",
        }}
      />
    </div>
  );
}

/* ────────────────────────────────
 * NavContent — renders the filtered <Nav> tree.
 * Consumes Sidebar's collapsed state so Nav switches to rail rendering
 * (icon-only, labels sr-only) via its own `collapsed` prop.
 * ──────────────────────────────── */
function NavContent({
  activePage,
  onNavigate,
  query,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
  query: string;
}) {
  const { collapsed } = useSidebar();
  const filtered = useMemo(() => filterGroups(NAV_ITEMS, query), [query]);

  if (filtered.length === 0) {
    return (
      <p
        role="status"
        style={{
          margin: 0,
          padding: "var(--vds-space-2) var(--vds-space-2-5)",
          color: "var(--vds-color-text-muted)",
          fontSize: "var(--vds-text-xs)",
        }}
      >
        No matches for &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <Nav
      collapsed={collapsed}
      orientation="vertical"
      variant="filled"
      size="sm"
      currentPath={`#/${activePage}`}
      aria-label="Documentation"
    >
      {filtered.map((group) => (
        <NavGroup key={group.group} label={group.group}>
          <NavList>
            {group.items.map((item) => (
              <NavItem
                key={item.path}
                href={`#/${item.path}`}
                icon={ICONS[item.path] ?? FALLBACK_ICON}
                label={item.label}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.button === 1) return;
                  onNavigate(item.path);
                }}
              />
            ))}
          </NavList>
        </NavGroup>
      ))}
    </Nav>
  );
}

/** Header row — brand on the left (expanded only), trigger on the right (always). */
function HeaderRow() {
  const { collapsed } = useSidebar();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--vds-space-2)",
        minInlineSize: 0,
      }}
    >
      {!collapsed && <Brand />}
      <SidebarTrigger
        style={collapsed ? undefined : { marginInlineStart: "auto" }}
        expandLabel="Expand navigation"
        collapseLabel="Collapse navigation"
      >
        {collapsed ? (
          <IconLayoutSidebarLeftExpand size={20} stroke={1.5} aria-hidden />
        ) : (
          <IconLayoutSidebarLeftCollapse size={20} stroke={1.5} aria-hidden />
        )}
      </SidebarTrigger>
    </div>
  );
}

/* ────────────────────────────────
 * Desktop Sidebar — Sidebar landmark + Header/Body + collapse trigger.
 * When collapsed: Brand hides, Nav switches to icon-only via `collapsed`
 * prop, search input is skipped (no room on the rail).
 * ──────────────────────────────── */
export function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  const [query, setQuery] = useState("");

  return (
    <VdsSidebar
      mode="full-height"
      size="md"
      background="surface"
      aria-label="Primary"
      onShortcutBlocked={() => {
        // User pressed Ctrl/Cmd+B while editing an input — surface a friendly
        // heads-up via the toast store rather than silently swallowing the
        // keystroke. The sidebar itself does not ship a toast dependency;
        // each app wires its own notification surface here.
        toast.warning(
          "Can’t toggle while editing",
          "Unfocus the input, then press Ctrl+B (or Cmd+B) again.",
        );
      }}
    >
      <SidebarHeader
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          gap: "var(--vds-space-2)",
        }}
      >
        <HeaderRow />
        <NavSearch value={query} onChange={setQuery} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarBody>
        <NavContent
          activePage={activePage}
          onNavigate={onNavigate}
          query={query}
        />
      </SidebarBody>
    </VdsSidebar>
  );
}

/* ────────────────────────────────
 * Mobile sidebar — same Nav + search inside a Drawer.
 * ──────────────────────────────── */
export function MobileSidebar({
  open,
  onOpenChange,
  activePage,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterGroups(NAV_ITEMS, query), [query]);

  return (
    <Drawer
      direction="left"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(18rem, 85vw)"
    >
      <DrawerContent className="docs-sidebar-drawer" aria-label="Navigation">
        <DrawerHeader>
          <DrawerTitle style={srOnly}>Navigation</DrawerTitle>
          <DrawerDescription style={srOnly}>
            Documentation navigation menu
          </DrawerDescription>
          <a
            href="#/introduction"
            className="docs-sidebar-logo docs-sidebar-logo--in-drawer"
            aria-label="Virtari Design System — home"
          >
            <span className="docs-sidebar-logo-mark" aria-hidden="true">V</span>
            <span className="docs-sidebar-logo-text">Virtari DS</span>
          </a>
        </DrawerHeader>
        <DrawerBody>
          <div style={{ marginBlockEnd: "var(--vds-space-3)" }}>
            <MobileNavSearch value={query} onChange={setQuery} />
          </div>

          {filtered.length === 0 ? (
            <p
              role="status"
              style={{
                margin: 0,
                padding: "var(--vds-space-2)",
                color: "var(--vds-color-text-muted)",
                fontSize: "var(--vds-text-sm)",
              }}
            >
              No matches for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <Nav
              orientation="vertical"
              variant="filled"
              size="sm"
              currentPath={`#/${activePage}`}
              aria-label="Documentation"
            >
              {filtered.map((group) => (
                <NavGroup key={group.group} label={group.group}>
                  <NavList>
                    {group.items.map((item) => (
                      <NavItem
                        key={item.path}
                        href={`#/${item.path}`}
                        icon={ICONS[item.path] ?? FALLBACK_ICON}
                        label={item.label}
                        onClick={(e) => {
                          if (e.metaKey || e.ctrlKey || e.button === 1) return;
                          onNavigate(item.path);
                          onOpenChange(false);
                        }}
                      />
                    ))}
                  </NavList>
                </NavGroup>
              ))}
            </Nav>
          )}

          {/* Hidden DrawerClose so Escape / overlay-click still close; per-item close handled in onClick above. */}
          <DrawerClose asChild>
            <button type="button" style={srOnly} aria-hidden="true" tabIndex={-1}>
              Close
            </button>
          </DrawerClose>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

/** Mobile search — same UX as desktop, always visible inside the drawer. */
function MobileNavSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <IconSearch
        size={14}
        stroke={1.75}
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInlineStart: "var(--vds-space-2-5, 0.625rem)",
          insetBlockStart: "50%",
          transform: "translateY(-50%)",
          color: "var(--vds-color-text-muted)",
          pointerEvents: "none",
        }}
      />
      <Input
        inputSize="sm"
        type="search"
        placeholder="Filter…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter navigation"
        style={{
          paddingInlineStart: "var(--vds-space-7, 1.75rem)",
          inlineSize: "100%",
        }}
      />
    </div>
  );
}
