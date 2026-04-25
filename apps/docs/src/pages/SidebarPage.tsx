import { useState, type ReactNode, type CSSProperties } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
  useSidebarOptional,
  type SidebarSize,
  type SidebarSide,
  type SidebarBackground,
} from "@virtari-packages/react-sidebar";
import {
  Nav,
  NavList,
  NavGroup,
  NavItem,
  NavLink,
  NavTrigger,
  NavIcon,
  NavLabel,
  NavBadge,
  NavChevron,
  NavSubmenu,
} from "@virtari-packages/react-nav";
import {
  Header,
  HeaderMain,
  HeaderStart,
  HeaderCenter,
  HeaderEnd,
} from "@virtari-packages/react-header";
import { Avatar } from "@virtari-packages/react-avatar";
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import {
  IconLayoutDashboard,
  IconFolder,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconBell,
  IconHelpCircle,
  IconLifebuoy,
  IconMenu2,
  IconSearch,
} from "@virtari-packages/react-icons";
import { Section } from "../components";

/* ─────────────────────────────── Shared demo bits ─────────────────────────────── */

const srOnlyStyle: CSSProperties = {
  position: "absolute",
  inlineSize: 1,
  blockSize: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

function DemoShell({
  children,
  height = "26rem",
  label,
}: {
  children: ReactNode;
  height?: string;
  label: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      style={{
        display: "flex",
        blockSize: height,
        border: "1px solid var(--vds-color-border-muted)",
        borderRadius: "var(--vds-radius-surface)",
        overflow: "hidden",
        background: "var(--vds-color-bg)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function ContentArea({ children }: { children?: ReactNode }) {
  return (
    <main
      style={{
        flex: 1,
        padding: "var(--vds-space-5)",
        color: "var(--vds-color-text-muted)",
        fontSize: "var(--vds-text-sm)",
        lineHeight: "var(--vds-leading-relaxed)",
        overflowY: "auto",
        minInlineSize: 0,
      }}
    >
      {children ?? (
        <>
          <h3
            style={{
              margin: 0,
              marginBlockEnd: "var(--vds-space-3)",
              color: "var(--vds-color-text)",
              fontSize: "var(--vds-text-lg)",
            }}
          >
            Main content
          </h3>
          <p style={{ margin: 0 }}>
            The sidebar is a separate <code>&lt;aside&gt;</code> landmark.
            Toggle the rail and try the search filter on the left.
          </p>
        </>
      )}
    </main>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-grid",
        placeItems: "center",
        inlineSize: "1.75rem",
        blockSize: "1.75rem",
        borderRadius: "var(--vds-radius-sm)",
        background: "var(--vds-color-primary-emphasis)",
        color: "var(--vds-color-on-primary, #fff)",
        fontWeight: "var(--vds-font-weight-semibold)",
        fontSize: "0.875rem",
        flex: "none",
      }}
    >
      V
    </span>
  );
}

/** Brand wordmark — logo always visible; wordmark becomes sr-only on rail. */
function Brand() {
  const { collapsed = false } = useSidebarOptional() ?? {};
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-space-2)",
        minInlineSize: 0,
        fontWeight: "var(--vds-font-weight-semibold)",
        fontSize: "var(--vds-text-sm)",
      }}
    >
      <LogoMark />
      <span style={collapsed ? srOnlyStyle : { whiteSpace: "nowrap" }}>
        Virtari
      </span>
    </span>
  );
}

function UserProfile({ flex = false }: { flex?: boolean }) {
  const { collapsed = false } = useSidebarOptional() ?? {};
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-space-2)",
        minInlineSize: 0,
        flex: flex ? 1 : undefined,
      }}
    >
      <Avatar fallback="VX" size="sm" />
      <span
        style={{
          display: collapsed ? "none" : "flex",
          flexDirection: "column",
          minInlineSize: 0,
          lineHeight: 1.2,
        }}
      >
        <span
          style={{
            fontSize: "var(--vds-text-sm)",
            fontWeight: "var(--vds-font-weight-medium)",
            color: "var(--vds-color-text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Vera Xu
        </span>
        <span
          style={{
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Admin
        </span>
      </span>
    </span>
  );
}

/* ─────────────────────────────── Nav data ─────────────────────────────── */

type NavNode = {
  path: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
  children?: NavNode[];
};

const iconProps = { size: 18, stroke: 1.75 } as const;

const PRIMARY: NavNode[] = [
  { path: "dashboard", label: "Dashboard", icon: <IconLayoutDashboard {...iconProps} /> },
  {
    path: "projects",
    label: "Projects",
    icon: <IconFolder {...iconProps} />,
    badge: "12",
    children: [
      { path: "proj-alpha",   label: "Alpha launch" },
      { path: "proj-beta",    label: "Beta campaign" },
      { path: "proj-gamma",   label: "Gamma rollout" },
      {
        path: "proj-archive",
        label: "Archive",
        icon: <IconFolder {...iconProps} />,
        children: [
          { path: "proj-archive-2025", label: "2025 snapshot" },
          { path: "proj-archive-2024", label: "2024 snapshot" },
          { path: "proj-cold-storage", label: "Cold storage" },
        ],
      },
    ],
  },
  { path: "team",      label: "Team",      icon: <IconUsers {...iconProps} /> },
  { path: "analytics", label: "Analytics", icon: <IconChartBar {...iconProps} /> },
];

const WORKSPACE: NavNode[] = [
  { path: "notifications", label: "Notifications", icon: <IconBell {...iconProps} />, badge: "3" },
  { path: "settings",      label: "Settings",      icon: <IconSettings {...iconProps} /> },
];

const SUPPORT: NavNode[] = [
  { path: "help",    label: "Help Center", icon: <IconHelpCircle {...iconProps} /> },
  { path: "contact", label: "Contact",     icon: <IconLifebuoy {...iconProps} /> },
];

/* ─────────────────────────────── Filter helpers ─────────────────────────────── */

function matchesQuery(label: string, q: string) {
  if (!q) return true;
  return label.toLowerCase().includes(q.toLowerCase());
}

/**
 * Keep items whose own label matches; keep parents whose children match
 * (and narrow `children` to the matching subset so the submenu shows only
 * relevant entries). Pure — returns a new list.
 */
function filterNodes(nodes: NavNode[], q: string): NavNode[] {
  if (!q) return nodes;
  return nodes.flatMap((node) => {
    const self = matchesQuery(node.label, q);
    const filteredChildren = node.children ? filterNodes(node.children, q) : undefined;
    const hasChildMatch = filteredChildren != null && filteredChildren.length > 0;
    if (!self && !hasChildMatch) return [];
    return [
      {
        ...node,
        // Preserve original children when self matches but children don't —
        // otherwise (self doesn't match, children do) narrow to matches only.
        children: self ? node.children : filteredChildren,
      },
    ];
  });
}

/* ─────────────────────────────── Search input ─────────────────────────────── */

function NavSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { collapsed = false } = useSidebarOptional() ?? {};
  if (collapsed) return null;
  return (
    <div style={{ position: "relative", marginBlockEnd: "var(--vds-space-2)" }}>
      <IconSearch
        size={14}
        stroke={1.75}
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInlineStart: "var(--vds-space-2-5)",
          insetBlockStart: "50%",
          transform: "translateY(-50%)",
          color: "var(--vds-color-text-muted)",
          pointerEvents: "none",
        }}
      />
      <Input
        inputSize="sm"
        type="search"
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter navigation"
        style={{ paddingInlineStart: "var(--vds-space-7, 1.75rem)" }}
      />
    </div>
  );
}

/* ─────────────────────────────── Nav tree renderer ─────────────────────────────── */

function renderNode(
  node: NavNode,
  onSelect: (path: string) => void,
): ReactNode {
  if (node.children && node.children.length > 0) {
    return (
      <NavItem key={node.path}>
        <NavTrigger>
          {node.icon != null && <NavIcon>{node.icon}</NavIcon>}
          <NavLabel>{node.label}</NavLabel>
          {node.badge != null && <NavBadge>{node.badge}</NavBadge>}
          <NavChevron />
        </NavTrigger>
        <NavSubmenu>
          <NavList>
            {node.children.map((child) => renderNode(child, onSelect))}
          </NavList>
        </NavSubmenu>
      </NavItem>
    );
  }
  return (
    <NavItem key={node.path}>
      <NavLink
        href={`#demo-${node.path}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(node.path);
        }}
      >
        {node.icon != null && <NavIcon>{node.icon}</NavIcon>}
        <NavLabel>{node.label}</NavLabel>
        {node.badge != null && <NavBadge>{node.badge}</NavBadge>}
      </NavLink>
    </NavItem>
  );
}

function DemoNav({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (path: string) => void;
}) {
  const { collapsed = false } = useSidebarOptional() ?? {};
  const [query, setQuery] = useState("");

  const primary   = filterNodes(PRIMARY,   query);
  const workspace = filterNodes(WORKSPACE, query);
  const support   = filterNodes(SUPPORT,   query);

  const noMatches =
    primary.length === 0 && workspace.length === 0 && support.length === 0;

  return (
    <>
      <NavSearch value={query} onChange={setQuery} />

      <Nav
        collapsed={collapsed}
        currentPath={`#demo-${active}`}
        aria-label="Primary"
        size="sm"
      >
        {primary.length > 0 && (
          <NavList>
            {primary.map((n) => renderNode(n, onSelect))}
          </NavList>
        )}

        {workspace.length > 0 && (
          <NavGroup label="Workspace">
            <NavList>
              {workspace.map((n) => renderNode(n, onSelect))}
            </NavList>
          </NavGroup>
        )}

        {support.length > 0 && (
          <NavGroup label="Support">
            <NavList>
              {support.map((n) => renderNode(n, onSelect))}
            </NavList>
          </NavGroup>
        )}

        {noMatches && !collapsed && (
          <p
            style={{
              padding: "var(--vds-space-2) var(--vds-space-2-5)",
              color: "var(--vds-color-text-muted)",
              fontSize: "var(--vds-text-xs)",
              margin: 0,
            }}
          >
            No matches for “{query}”.
          </p>
        )}
      </Nav>
    </>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function SidebarPage() {
  return (
    <>
      <Section
        title="Structure"
        description="Sidebar is the app-chrome navigation rail — <aside> landmark that pairs with Header in two layout modes. Compose SidebarHeader / SidebarBody / SidebarFooter with @virtari-packages/react-nav inside. The sidebar's collapsed state is forwarded to Nav, which owns the rail-mode rendering (icons only, submenus become popovers)."
      >
        <pre className="docs-code">{`import {
  Sidebar, SidebarHeader, SidebarBody,
  SidebarFooter, SidebarSeparator, SidebarTrigger,
  useSidebarOptional,
} from "@virtari-packages/react-sidebar";
import { Nav, NavList, NavItem, NavLink, NavTrigger,
         NavSubmenu, NavIcon, NavLabel, NavBadge, NavChevron,
         NavGroup } from "@virtari-packages/react-nav";

function NavTree() {
  const { collapsed = false } = useSidebarOptional() ?? {};
  return (
    <Nav collapsed={collapsed} currentPath={path} aria-label="Primary">
      <NavList>
        <NavItem href="/dashboard"
          icon={<IconLayoutDashboard size={18} />}
          label="Dashboard" />
      </NavList>
    </Nav>
  );
}

<Sidebar collapsible>
  <SidebarHeader>
    <Brand />
    <SidebarTrigger style={{ marginInlineStart: "auto" }} />
  </SidebarHeader>
  <SidebarSeparator />
  <SidebarBody>
    <NavTree />
  </SidebarBody>
  <SidebarSeparator />
  <SidebarFooter>
    <Avatar fallback="VX" size="sm" /> <UserMeta />
  </SidebarFooter>
</Sidebar>`}</pre>
      </Section>

      <BasicDemo />
      <SubmenuDemo />
      <ModesDemo />
      <SizesDemo />
      <SidesDemo />
      <BackgroundsDemo />
      <ExternalTriggerDemo />
      <AppShellDemo />
      <ApiSection />
      <AccessibilitySection />
    </>
  );
}

/* ─────────────────────────────── Demos ─────────────────────────────── */

function BasicDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="Basic — collapse + filter search"
      description="Brand + trigger in the header aligned to the Header row height so they sit level with <Header> beside them. A search input filters nav items (and their submenu children). When collapsed to a rail, the search hides and Nav switches to icon-only mode via its own `collapsed` prop — no extra CSS on the sidebar side."
    >
      <DemoShell label="Basic sidebar demo" height="32rem">
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          blockSize="100%"
          aria-label="Primary navigation"
        >
          <SidebarHeader>
            <Brand />
            <SidebarTrigger style={{ marginInlineStart: "auto" }} />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
          <SidebarSeparator />
          <SidebarFooter>
            <UserProfile flex />
          </SidebarFooter>
        </Sidebar>
        <ContentArea>
          <h3
            style={{
              margin: 0,
              marginBlockEnd: "var(--vds-space-3)",
              color: "var(--vds-color-text)",
              fontSize: "var(--vds-text-lg)",
              textTransform: "capitalize",
            }}
          >
            {active}
          </h3>
          <p style={{ margin: 0 }}>
            Try typing &quot;proj&quot; in the search — the Projects submenu
            narrows to matching entries. Archive now has its own nested submenu,
            so the collapsed rail also demonstrates a second flyout.
          </p>
        </ContentArea>
      </DemoShell>
    </Section>
  );
}

function SubmenuDemo() {
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="Submenu + dropdown behaviour"
      description="Projects has children — in the expanded sidebar the submenu opens inline (accordion). When the sidebar collapses to a rail, Nav forces the same submenu to popover mode so it floats out of the rail. Per-item behaviour is handled entirely by @virtari-packages/react-nav — the sidebar only tells Nav whether it's in rail mode."
    >
      <DemoShell label="Submenu demo" height="28rem">
        <Sidebar blockSize="100%" aria-label="Primary navigation">
          <SidebarHeader>
            <Brand />
            <SidebarTrigger style={{ marginInlineStart: "auto" }} />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
        </Sidebar>
        <ContentArea>
          <h3
            style={{
              margin: 0,
              marginBlockEnd: "var(--vds-space-3)",
              color: "var(--vds-color-text)",
              fontSize: "var(--vds-text-lg)",
              textTransform: "capitalize",
            }}
          >
            {active.replace(/^proj-/, "Project · ")}
          </h3>
          <p style={{ margin: 0 }}>
            Submenu items (Alpha launch / Beta campaign / Gamma rollout)
            update <code>active</code> on click via{" "}
            <code>e.preventDefault()</code> + <code>onSelect</code>. Archive is
            a nested submenu example for the collapsed rail popover.
          </p>
        </ContentArea>
      </DemoShell>
    </Section>
  );
}

function ModesDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="Modes — full-height vs below-header"
      description="Full-height places the sidebar beside the header (GitHub / Linear / Notion). Below-header puts it under a full-width header, stickyOffset matching the header's height."
    >
      <div className="docs-prose" style={{ marginBlockEnd: "var(--vds-space-3)" }}>
        <strong>mode=&quot;full-height&quot;</strong>
      </div>
      <DemoShell label="Full-height mode demo" height="30rem">
        <Sidebar
          mode="full-height"
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          blockSize="100%"
          aria-label="Primary navigation"
        >
          <SidebarHeader>
            <Brand />
            <SidebarTrigger style={{ marginInlineStart: "auto" }} />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
        </Sidebar>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minInlineSize: 0 }}>
          <Header>
            <HeaderMain>
              <HeaderStart>
                <strong
                  style={{
                    fontSize: "var(--vds-text-sm)",
                    textTransform: "capitalize",
                  }}
                >
                  {active}
                </strong>
              </HeaderStart>
              <HeaderEnd>
                <Button size="sm">Action</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <ContentArea />
        </div>
      </DemoShell>

      <div
        className="docs-prose"
        style={{ marginBlockStart: "var(--vds-space-6)", marginBlockEnd: "var(--vds-space-3)" }}
      >
        <strong>mode=&quot;below-header&quot;</strong>
      </div>
      <DemoShell label="Below-header mode demo" height="30rem">
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minInlineSize: 0 }}>
          <Header>
            <HeaderMain>
              <HeaderStart>
                <Brand />
              </HeaderStart>
              <HeaderEnd>
                <Button size="sm">New</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <div style={{ display: "flex", flex: 1, minBlockSize: 0 }}>
            <Sidebar
              mode="below-header"
              stickyOffset="0px"
              blockSize="100%"
              aria-label="Primary navigation"
            >
              <SidebarBody>
                <DemoNav active={active} onSelect={setActive} />
              </SidebarBody>
              <SidebarSeparator />
              <SidebarFooter>
                <SidebarTrigger />
                <UserProfile flex />
              </SidebarFooter>
            </Sidebar>
            <ContentArea />
          </div>
        </div>
      </DemoShell>
    </Section>
  );
}

function SizesDemo() {
  const sizes: SidebarSize[] = ["sm", "md", "lg", "xl"];
  const [size, setSize] = useState<SidebarSize>("md");
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="Sizes"
      description="Four preset widths driven by layout tokens (sm 12rem, md 16rem, lg 20rem, xl 24rem) plus inlineSize / railSize / blockSize for arbitrary lengths."
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        {sizes.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={size === s ? "solid" : "outline"}
            onClick={() => setSize(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <DemoShell label="Sizes demo" height="28rem">
        <Sidebar size={size} blockSize="100%" aria-label="Primary navigation">
          <SidebarHeader>
            <Brand />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
        </Sidebar>
        <ContentArea />
      </DemoShell>
    </Section>
  );
}

function SidesDemo() {
  const [side, setSide] = useState<SidebarSide>("start");
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  const sidebar = (
    <Sidebar
      side={side}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      blockSize="100%"
      aria-label="Primary navigation"
    >
      <SidebarHeader>
        <Brand />
        <SidebarTrigger style={{ marginInlineStart: "auto" }} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarBody>
        <DemoNav active={active} onSelect={setActive} />
      </SidebarBody>
    </Sidebar>
  );

  return (
    <Section
      title="Side — logical anchoring"
      description="Anchors to the inline-start or inline-end edge. Logical properties — RTL auto-flips the border and chevron."
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        <Button
          size="sm"
          variant={side === "start" ? "solid" : "outline"}
          onClick={() => setSide("start")}
        >
          start
        </Button>
        <Button
          size="sm"
          variant={side === "end" ? "solid" : "outline"}
          onClick={() => setSide("end")}
        >
          end
        </Button>
      </div>
      <DemoShell label="Side demo" height="28rem">
        {side === "start" ? (
          <>
            {sidebar}
            <ContentArea />
          </>
        ) : (
          <>
            <ContentArea />
            {sidebar}
          </>
        )}
      </DemoShell>
    </Section>
  );
}

function BackgroundsDemo() {
  const bgs: SidebarBackground[] = ["surface", "subtle", "muted", "none"];
  const [bg, setBg] = useState<SidebarBackground>("surface");
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="Backgrounds"
      description="Four surface presets mapped to @virtari-packages/tokens color scales. `none` strips the background — pair with a colored page or glass effect."
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        {bgs.map((b) => (
          <Button
            key={b}
            size="sm"
            variant={bg === b ? "solid" : "outline"}
            onClick={() => setBg(b)}
          >
            {b}
          </Button>
        ))}
      </div>
      <DemoShell label="Backgrounds demo" height="26rem">
        <Sidebar
          background={bg}
          blockSize="100%"
          aria-label="Primary navigation"
        >
          <SidebarHeader>
            <Brand />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
        </Sidebar>
        <ContentArea />
      </DemoShell>
    </Section>
  );
}

function ExternalTriggerDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="External trigger"
      description="Sidebar's collapse state is controllable from anywhere. Example: a hamburger in the Header flips the sidebar between expanded and rail."
    >
      <DemoShell label="External trigger demo" height="30rem">
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          blockSize="100%"
          aria-label="Primary navigation"
        >
          <SidebarHeader>
            <Brand />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
        </Sidebar>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minInlineSize: 0 }}>
          <Header>
            <HeaderMain>
              <HeaderStart>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCollapsed((c) => !c)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  leftSection={<IconMenu2 size={16} stroke={1.75} />}
                >
                  Toggle
                </Button>
              </HeaderStart>
              <HeaderCenter>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    color: "var(--vds-color-text-muted)",
                  }}
                >
                  state · {collapsed ? "rail" : "expanded"}
                </span>
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm">Action</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <ContentArea />
        </div>
      </DemoShell>
    </Section>
  );
}

function AppShellDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <Section
      title="App shell — Header + Sidebar + scrollable content"
      description="Full chrome composition. Sidebar full-height beside the header column; sticky main header at top; scrollable content below. Each component owns its own axis."
    >
      <DemoShell label="App shell demo" height="36rem">
        <Sidebar
          size="md"
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          blockSize="100%"
          aria-label="Primary navigation"
        >
          <SidebarHeader>
            <Brand />
            <SidebarTrigger style={{ marginInlineStart: "auto" }} />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarBody>
            <DemoNav active={active} onSelect={setActive} />
          </SidebarBody>
          <SidebarSeparator />
          <SidebarFooter>
            <UserProfile flex />
          </SidebarFooter>
        </Sidebar>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minInlineSize: 0,
            overflowY: "auto",
          }}
        >
          <Header>
            <HeaderMain sticky="always">
              <HeaderStart>
                <strong
                  style={{
                    fontSize: "var(--vds-text-sm)",
                    textTransform: "capitalize",
                  }}
                >
                  {active}
                </strong>
              </HeaderStart>
              <HeaderCenter>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    color: "var(--vds-color-text-muted)",
                  }}
                >
                  workspace · dashboard
                </span>
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm" variant="ghost">
                  Share
                </Button>
                <Button size="sm">New</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <div
            style={{
              padding: "var(--vds-space-6)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--vds-space-4)",
              color: "var(--vds-color-text-muted)",
              fontSize: "var(--vds-text-sm)",
              lineHeight: "var(--vds-leading-relaxed)",
            }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <p key={i} style={{ margin: 0 }}>
                §{i + 1}. Scrollable content. The sidebar stays pinned
                beside this region; the header sticks at the top.
              </p>
            ))}
          </div>
        </div>
      </DemoShell>
    </Section>
  );
}

/* ─────────────────────────────── Reference sections ─────────────────────────────── */

function ApiSection() {
  return (
    <Section
      title="API"
      description="Typed, ref-forwarding. Sub-parts mirror semantic tags (<header> / <div> / <footer> / <hr>)."
    >
      <pre className="docs-code">{`interface SidebarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "aside"
  mode?: "full-height" | "below-header";   // default "full-height"
  side?: "start" | "end";        // logical
  size?: "sm" | "md" | "lg" | "xl";
  inlineSize?: string;           // arbitrary expanded width
  railSize?: string;             // arbitrary rail width
  blockSize?: string;            // arbitrary height (default 100svh)
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (c: boolean) => void;
  collapsible?: boolean;         // default true
  stickyOffset?: string;         // "0px" default — pass header height in below-header mode
  background?: "none" | "surface" | "subtle" | "muted";
  bordered?: boolean;            // default true
}

/* Each sub-part is a thin semantic wrapper. */
interface SidebarHeaderProps    extends HTMLAttributes<HTMLElement> { as?: ElementType; }
interface SidebarBodyProps      extends HTMLAttributes<HTMLElement> { as?: ElementType; }
interface SidebarFooterProps    extends HTMLAttributes<HTMLElement> { as?: ElementType; }
interface SidebarSeparatorProps extends HTMLAttributes<HTMLElement> { as?: ElementType; }

interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;          // custom icon (default chevron)
  expandLabel?: string;          // i18n: "Expand sidebar"
  collapseLabel?: string;        // i18n: "Collapse sidebar"
}

// Hook — read/toggle from any descendant of <Sidebar>
function useSidebar(): {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (c: boolean) => void;
  collapsible: boolean;
  side: "start" | "end";
};`}</pre>
    </Section>
  );
}

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Landmarks are layered correctly — <aside> for the sidebar, <nav> for the nav itself (from @virtari-packages/react-nav). Rail mode keeps labels in the accessibility tree."
    >
      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
        <li>
          Root is <code>&lt;aside&gt;</code> — the complementary landmark.
          Pass <code>aria-label</code> so multiple asides can be told apart.
        </li>
        <li>
          Put <code>@virtari-packages/react-nav</code> inside{" "}
          <code>&lt;SidebarBody&gt;</code> — Nav renders its own{" "}
          <code>&lt;nav&gt;</code> landmark, and NavLink auto-applies{" "}
          <code>aria-current=&quot;page&quot;</code>.
        </li>
        <li>
          Forward <code>collapsed</code> from{" "}
          <code>useSidebar()</code> into <code>&lt;Nav collapsed&gt;</code> so
          rail-mode behaviour (labels sr-only, popover submenus) stays native
          to Nav.
        </li>
        <li>
          <code>&lt;SidebarTrigger&gt;</code> auto-wires{" "}
          <code>aria-expanded</code> and switches its aria-label between{" "}
          <code>expandLabel</code> / <code>collapseLabel</code>.
        </li>
        <li>
          The filter input carries <code>aria-label</code> and uses{" "}
          <code>type=&quot;search&quot;</code> — the browser exposes a native
          clear button when text is entered.
        </li>
        <li>
          Mobile: wrap Sidebar inside{" "}
          <code>@virtari-packages/react-drawer</code> and toggle via{" "}
          <code>useSidebar()</code> — the Sidebar itself is desktop-first.
        </li>
        <li>
          All transitions respect{" "}
          <code>prefers-reduced-motion: reduce</code>.
        </li>
      </ul>
    </Section>
  );
}
