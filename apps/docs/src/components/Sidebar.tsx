import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
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
  IconBuildingStore,
  IconCalendar,
  IconCards,
  IconChevronDown,
  IconChevronRight,
  IconCircle,
  IconCircleDot,
  IconClick,
  IconCode,
  IconCompass,
  IconCursorText,
  IconForms,
  IconGitBranch,
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
  IconPackage,
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
  IconTerminal2,
  IconNumbers,
  IconUpload,
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
  "button-group": <IconClick {...navIconProps} />,
  input: <IconCursorText {...navIconProps} />,
  "number-input": <IconNumbers {...navIconProps} />,
  "otp-input": <IconNumbers {...navIconProps} />,
  textarea: <IconForms {...navIconProps} />,
  select: <IconSelector {...navIconProps} />,
  checkbox: <IconSquareCheck {...navIconProps} />,
  "radio-group": <IconCircleDot {...navIconProps} />,
  switch: <IconToggleLeft {...navIconProps} />,
  toggle: <IconToggleRight {...navIconProps} />,
  slider: <IconAdjustmentsHorizontal {...navIconProps} />,
  "date-picker": <IconCalendar {...navIconProps} />,
  editor: <IconCursorText {...navIconProps} />,
  "yoopta-editor": <IconLayoutList {...navIconProps} />,
  code: <IconCode {...navIconProps} />,
  label: <IconTag {...navIconProps} />,

  avatar: <IconUserCircle {...navIconProps} />,
  badge: <IconTag {...navIconProps} />,
  chip: <IconTag {...navIconProps} />,
  "color-picker": <IconPalette {...navIconProps} />,
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
  carousel: <IconCards {...navIconProps} />,
  "data-table": <IconTable {...navIconProps} />,
  "data-table-users": <IconUserCircle {...navIconProps} />,
  "data-table-products": <IconPackage {...navIconProps} />,
  "data-table-orders": <IconBuildingStore {...navIconProps} />,
  table: <IconTableRow {...navIconProps} />,
  pagination: <IconNumbers {...navIconProps} />,
  form: <IconForms {...navIconProps} />,
  "file-upload": <IconUpload {...navIconProps} />,
  command: <IconTerminal2 {...navIconProps} />,
  "empty-state": <IconSquareRounded {...navIconProps} />,
  fieldset: <IconForms {...navIconProps} />,
  stepper: <IconProgress {...navIconProps} />,
  timeline: <IconArrowsVertical {...navIconProps} />,
  "tag-input": <IconTag {...navIconProps} />,
  flow: <IconGitBranch {...navIconProps} />,
};

const FALLBACK_ICON = <IconCircle {...navIconProps} />;

/* ────────────────────────────────
 * Nav data — each group carries an i18n key for the header and a list of
 * page paths. Item labels come from the `nav` translation namespace at
 * render time so switching locale flips the whole tree.
 * ──────────────────────────────── */
type NavGroupData = { groupKey: string; items: string[] };

const NAV_ITEMS: NavGroupData[] = [
  { groupKey: "groups.overview", items: ["introduction"] },
  {
    groupKey: "groups.foundations",
    items: [
      "sizing",
      "colors",
      "typography",
      "icons",
      "composition",
      "layout",
      "utilities",
      "rtl",
    ],
  },
  {
    groupKey: "groups.formControls",
    items: [
      "form",
      "button",
      "button-group",
      "input",
      "number-input",
      "otp-input",
      "textarea",
      "editor",
      "yoopta-editor",
      "code",
      "select",
      "checkbox",
      "radio-group",
      "switch",
      "toggle",
      "slider",
      "color-picker",
      "date-picker",
      "phone-input",
      "language-picker",
      "file-upload",
      "label",
      "fieldset",
      "tag-input",
    ],
  },
  {
    groupKey: "groups.display",
    items: [
      "avatar",
      "badge",
      "chip",
      "flag",
      "card",
      "heading",
      "text",
      "separator",
      "kbd",
      "progress",
      "skeleton",
      "spinner",
      "empty-state",
    ],
  },
  {
    groupKey: "groups.overlays",
    items: [
      "dialog",
      "drawer",
      "alert-dialog",
      "dropdown-menu",
      "popover",
      "tooltip",
      "toast",
      "command",
    ],
  },
  {
    groupKey: "groups.navigation",
    items: ["header", "nav", "bottom-nav", "sidebar", "breadcrumb"],
  },
  {
    groupKey: "groups.layout",
    items: ["tabs", "accordion", "collapsible", "scroll-area", "stepper", "timeline", "flow", "carousel"],
  },
  {
    groupKey: "groups.data",
    items: [
      "table",
      "pagination",
      "data-table",
      "data-table-users",
      "data-table-products",
      "data-table-orders",
    ],
  },
];

type ResolvedGroup = { group: string; items: { label: string; path: string }[] };

/* ────────────────────────────────
 * Filter helpers
 * ──────────────────────────────── */
function filterGroups(groups: ResolvedGroup[], q: string): ResolvedGroup[] {
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
function Brand({ homeHref }: { homeHref: string }) {
  const { t } = useTranslation();
  const { collapsed } = useSidebar();
  return (
    <a
      href={homeHref}
      className="docs-sidebar-logo"
      aria-label={t("brand.homeLabel")}
    >
      <span className="docs-sidebar-logo-mark" aria-hidden="true">V</span>
      <span
        className="docs-sidebar-logo-text"
        style={collapsed ? srOnly : undefined}
      >
        {t("brand.wordmark")}
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
  const { t } = useTranslation();
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
          aria-label={t("sidebar.clearSearch")}
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
        placeholder={t("sidebar.filterPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("sidebar.filterAriaLabel")}
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

/* Resolve raw nav structure to translated labels. Computed inside components
   so switching locale via i18n triggers a re-render with new strings. */
function useResolvedNav(): ResolvedGroup[] {
  const { t } = useTranslation();
  return useMemo(
    () =>
      NAV_ITEMS.map((g) => ({
        group: t(g.groupKey),
        items: g.items.map((path) => ({
          label: t(`nav:${path}`, { defaultValue: path }),
          path,
        })),
      })),
    [t],
  );
}

type HrefFor = (page: string) => string;

/* ────────────────────────────────
 * NavContent — renders the filtered <Nav> tree.
 * ──────────────────────────────── */
function NavContent({
  activePage,
  hrefFor,
  onNavigate,
  query,
}: {
  activePage: string;
  hrefFor: HrefFor;
  onNavigate: (page: string) => void;
  query: string;
}) {
  const { t } = useTranslation();
  const { collapsed } = useSidebar();
  const resolved = useResolvedNav();
  const filtered = useMemo(() => filterGroups(resolved, query), [resolved, query]);

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
        {t("sidebar.noMatches", { query })}
      </p>
    );
  }

  return (
    <Nav
      collapsed={collapsed}
      orientation="vertical"
      variant="filled"
      size="sm"
      currentPath={hrefFor(activePage)}
      aria-label={t("sidebar.ariaDocs")}
    >
      {filtered.map((group) => (
        <NavGroup key={group.group} label={group.group}>
          <NavList>
            {group.items.map((item) => (
              <NavItem
                key={item.path}
                href={hrefFor(item.path)}
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
function HeaderRow({ homeHref }: { homeHref: string }) {
  const { t } = useTranslation();
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
      {!collapsed && <Brand homeHref={homeHref} />}
      <SidebarTrigger
        style={collapsed ? undefined : { marginInlineStart: "auto" }}
        expandLabel={t("sidebar.expand")}
        collapseLabel={t("sidebar.collapse")}
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
  hrefFor,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
  hrefFor: HrefFor;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  return (
    <VdsSidebar
      mode="full-height"
      size="md"
      background="surface"
      aria-label={t("sidebar.ariaPrimary")}
      onShortcutBlocked={() => {
        toast.warning(
          t("sidebar.toggleBlockedTitle"),
          t("sidebar.toggleBlockedBody"),
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
        <HeaderRow homeHref={hrefFor("introduction")} />
        <NavSearch value={query} onChange={setQuery} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarBody>
        <NavContent
          activePage={activePage}
          hrefFor={hrefFor}
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
  hrefFor,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePage: string;
  onNavigate: (page: string) => void;
  hrefFor: HrefFor;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const resolved = useResolvedNav();
  const filtered = useMemo(() => filterGroups(resolved, query), [resolved, query]);

  return (
    <Drawer
      direction="left"
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(18rem, 85vw)"
    >
      <DrawerContent
        className="docs-sidebar-drawer"
        aria-label={t("sidebar.mobileAriaLabel")}
      >
        <DrawerHeader>
          <DrawerTitle style={srOnly}>{t("sidebar.mobileAriaLabel")}</DrawerTitle>
          <DrawerDescription style={srOnly}>
            {t("sidebar.mobileDescription")}
          </DrawerDescription>
          <a
            href={hrefFor("introduction")}
            className="docs-sidebar-logo docs-sidebar-logo--in-drawer"
            aria-label={t("brand.homeLabel")}
          >
            <span className="docs-sidebar-logo-mark" aria-hidden="true">V</span>
            <span className="docs-sidebar-logo-text">{t("brand.wordmark")}</span>
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
              {t("sidebar.noMatches", { query })}
            </p>
          ) : (
            <Nav
              orientation="vertical"
              variant="filled"
              size="sm"
              currentPath={hrefFor(activePage)}
              aria-label={t("sidebar.ariaDocs")}
            >
              {filtered.map((group) => (
                <NavGroup key={group.group} label={group.group}>
                  <NavList>
                    {group.items.map((item) => (
                      <NavItem
                        key={item.path}
                        href={hrefFor(item.path)}
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

          {/* Hidden DrawerClose so Escape / overlay-click still close. */}
          <DrawerClose asChild>
            <button type="button" style={srOnly} aria-hidden="true" tabIndex={-1}>
              {t("sidebar.close")}
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
  const { t } = useTranslation();
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
        placeholder={t("sidebar.filterPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("sidebar.filterAriaLabel")}
        style={{
          paddingInlineStart: "var(--vds-space-7, 1.75rem)",
          inlineSize: "100%",
        }}
      />
    </div>
  );
}
