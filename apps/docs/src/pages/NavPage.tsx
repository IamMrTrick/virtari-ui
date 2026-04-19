import { useState, type ReactNode } from "react";
import {
  Nav,
  NavGroup,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavIcon,
  NavLabel,
  NavBadge,
  NavKbd,
  NavChevron,
  NavSubmenu,
  NavSeparator,
  NavMega,
  NavMegaSection,
  type NavVariant,
  type NavSize,
} from "@virtari-packages/react-nav";
import {
  IconHome,
  IconUsers,
  IconSettings,
  IconBox,
  IconPalette,
  IconFileText,
  IconBook2,
  IconStar,
  IconBolt,
  IconSearch,
  IconBell,
  IconLayoutGrid,
  IconCode,
  IconCompass,
  IconBrandGithub,
  IconMail,
  IconShoppingCart,
  IconRocket,
  IconArrowRight,
} from "@virtari-packages/react-icons";
import { Button } from "@virtari-packages/react-button";
import { Badge } from "@virtari-packages/react-badge";
import { Section } from "../components";

/* ──────────────────────────────────────────────
 * Demo frames
 * ────────────────────────────────────────────── */

function DemoFrame({
  label,
  children,
  height,
  padded = true,
}: {
  label: string;
  children: ReactNode;
  height?: string;
  padded?: boolean;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      style={{
        position: "relative",
        padding: padded ? "var(--vds-space-4)" : 0,
        border: "1px solid var(--vds-color-border-muted)",
        borderRadius: "var(--vds-radius-surface)",
        background: "var(--vds-color-bg)",
        minBlockSize: height,
      }}
    >
      {children}
    </div>
  );
}

function SidebarFrame({
  children,
  label,
  width = "16rem",
  height = "28rem",
  note,
}: {
  children: ReactNode;
  label: string;
  width?: string;
  height?: string;
  note?: ReactNode;
}) {
  return (
    <DemoFrame label={label} height={height}>
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-4)",
          alignItems: "stretch",
          blockSize: "100%",
        }}
      >
        <aside
          style={{
            flex: "none",
            inlineSize: width,
            padding: "var(--vds-space-3)",
            background: "var(--vds-color-bg-subtle)",
            borderRadius: "var(--vds-radius-element)",
            border: "1px solid var(--vds-color-border-muted)",
            overflowY: "auto",
            transition: "inline-size 200ms var(--vds-ease-out)",
          }}
        >
          {children}
        </aside>
        <div
          style={{
            flex: "1 1 auto",
            padding: "var(--vds-space-4)",
            color: "var(--vds-color-text-muted)",
            fontSize: "var(--vds-text-sm)",
            lineHeight: "var(--vds-leading-relaxed)",
          }}
        >
          {note ??
            "Main content area — click sidebar items or expand groups on the side."}
        </div>
      </div>
    </DemoFrame>
  );
}

/* ──────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────── */

export function NavPage() {
  return (
    <>
      <IntroSection />
      <IconsSection />
      <DeclarativeSidebar />
      <CompoundSidebar />
      <GroupsSection />
      <CollapsedSection />
      <NestedSection />
      <TreeSection />
      <MenubarSection />
      <MegaSection />
      <VariantsSection />
      <SizesSection />
      <StatesSection />
      <CurrentPathSection />
      <ApiSection />
      <AccessibilitySection />
    </>
  );
}

/* ──────────────────────────────
 * Intro
 * ────────────────────────────── */

function IntroSection() {
  return (
    <Section
      title="One nav, many shapes"
      description="Nav is the W3C-pattern navigation primitive — a nav landmark containing a list of links with disclosure buttons for expandable sections. The same component composes a sidebar, a menubar, a mega menu, or a multi-level tree. Orientation and submenu presentation are the only things that change."
    >
      <pre className="docs-code">{`import { Nav, NavList, NavItem, NavSubmenu } from "@virtari-packages/react-nav";

// Sidebar — vertical, inline submenus
<Nav orientation="vertical" currentPath={pathname}>
  <NavList>
    <NavItem href="/" label="Home" icon={<IconHome />} />
    <NavItem
      label="Products"
      icon={<IconBox />}
      submenu={
        <NavSubmenu>
          <NavList>
            <NavItem href="/products/all" label="All products" />
          </NavList>
        </NavSubmenu>
      }
    />
  </NavList>
</Nav>

// Menubar — horizontal, popover submenus
<Nav orientation="horizontal">
  <NavList>{/* same items, same API */}</NavList>
</Nav>`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * Icons
 * ────────────────────────────── */

function IconsSection() {
  return (
    <Section
      title="Icons — icon, label, badge, kbd"
      description="Every NavItem has four slots: icon (leading), label (main), and trailing badge or kbd hint. Pass them as props for the declarative API, or compose them as subcomponents (NavIcon / NavLabel / NavBadge / NavKbd) for fine-grained control."
    >
      <SidebarFrame
        label="Icon slots"
        note="Hover / focus any item — icons inherit currentColor so they recolor with the active state. The leading icon is aria-hidden; the label provides the accessible name."
      >
        <Nav orientation="vertical" currentPath="/inbox">
          <NavList>
            <NavItem href="/home" label="Home" icon={<IconHome size={18} />} />
            <NavItem
              href="/inbox"
              label="Inbox"
              icon={<IconMail size={18} />}
              badge={<Badge variant="secondary">12</Badge>}
            />
            <NavItem
              href="/search"
              label="Search"
              icon={<IconSearch size={18} />}
              kbd="⌘K"
            />
            <NavItem
              href="/notifications"
              label="Notifications"
              icon={<IconBell size={18} />}
              badge={<Badge variant="destructive">3</Badge>}
            />
            <NavItem
              href="/store"
              label="Store"
              icon={<IconShoppingCart size={18} />}
              kbd="⌘S"
            />
          </NavList>
        </Nav>
      </SidebarFrame>

      <pre className="docs-code">{`<NavItem href="/inbox"
  label="Inbox"
  icon={<IconMail />}
  badge={<Badge tone="info" size="sm">12</Badge>}
/>

<NavItem href="/search"
  label="Search"
  icon={<IconSearch />}
  kbd="⌘K"
/>`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * Declarative sidebar
 * ────────────────────────────── */

function DeclarativeSidebar() {
  return (
    <Section
      title="Sidebar — declarative API"
      description="For the 90%-common case: pass href, label, icon, badge, kbd, submenu as props. No composition required. aria-current='page' is wired automatically from the Nav's currentPath."
    >
      <SidebarFrame label="Declarative sidebar">
        <Nav orientation="vertical" currentPath="/components/button">
          <NavGroup label="Workspace">
            <NavList>
              <NavItem href="/" label="Home" icon={<IconHome size={18} />} />
              <NavItem
                href="/team"
                label="Team"
                icon={<IconUsers size={18} />}
                badge={<Badge variant="secondary">3</Badge>}
              />
              <NavItem
                href="/settings"
                label="Settings"
                icon={<IconSettings size={18} />}
                kbd="⌘,"
              />
            </NavList>
          </NavGroup>

          <NavSeparator />

          <NavGroup label="Components">
            <NavList>
              <NavItem
                label="Primitives"
                icon={<IconBox size={18} />}
                submenu={
                  <NavSubmenu>
                    <NavList>
                      <NavItem href="/components/button" label="Button" />
                      <NavItem href="/components/input" label="Input" />
                      <NavItem href="/components/select" label="Select" />
                    </NavList>
                  </NavSubmenu>
                }
              />
              <NavItem
                label="Layout"
                icon={<IconLayoutGrid size={18} />}
                submenu={
                  <NavSubmenu>
                    <NavList>
                      <NavItem href="/components/section" label="Section" />
                      <NavItem href="/components/row" label="Row" />
                      <NavItem href="/components/col" label="Col" />
                    </NavList>
                  </NavSubmenu>
                }
              />
            </NavList>
          </NavGroup>
        </Nav>
      </SidebarFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * Compound sidebar
 * ────────────────────────────── */

function CompoundSidebar() {
  return (
    <Section
      title="Sidebar — compound API"
      description="When you need full control over slot order, wrapping (for routing libs via asChild), or extra markup: compose NavItem with NavLink / NavTrigger / NavIcon / NavLabel / NavBadge / NavKbd / NavChevron manually. This is what the declarative API builds internally."
    >
      <SidebarFrame label="Compound sidebar">
        <Nav orientation="vertical">
          <NavList>
            <NavItem>
              <NavLink href="/dashboard" active>
                <NavIcon><IconHome size={18} /></NavIcon>
                <NavLabel>Dashboard</NavLabel>
                <NavKbd>⌘1</NavKbd>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavTrigger>
                <NavIcon><IconBox size={18} /></NavIcon>
                <NavLabel>Inventory</NavLabel>
                <NavChevron />
              </NavTrigger>
              <NavSubmenu>
                <NavList>
                  <NavItem>
                    <NavLink href="/inventory/products">
                      <NavLabel>Products</NavLabel>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/inventory/stock">
                      <NavLabel>Stock</NavLabel>
                      <NavBadge>
                        <Badge variant="outline">low</Badge>
                      </NavBadge>
                    </NavLink>
                  </NavItem>
                </NavList>
              </NavSubmenu>
            </NavItem>

            <NavItem>
              <NavLink href="/reports">
                <NavIcon><IconFileText size={18} /></NavIcon>
                <NavLabel>Reports</NavLabel>
              </NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </SidebarFrame>

      <pre className="docs-code">{`<NavItem>
  <NavTrigger>
    <NavIcon><IconBox /></NavIcon>
    <NavLabel>Inventory</NavLabel>
    <NavChevron />
  </NavTrigger>
  <NavSubmenu>
    <NavList>
      <NavItem><NavLink href="/inventory/products">Products</NavLink></NavItem>
    </NavList>
  </NavSubmenu>
</NavItem>`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * Groups & separators
 * ────────────────────────────── */

function GroupsSection() {
  return (
    <Section
      title="Groups & separators"
      description="NavGroup wraps a NavList with an uppercase label. It renders as role='group' + aria-labelledby so screen readers announce the group name when entering its items. NavSeparator renders a role='separator' rule between sections."
    >
      <SidebarFrame label="Groups sidebar" height="30rem">
        <Nav orientation="vertical" currentPath="/tokens/colors">
          <NavGroup label="Foundations">
            <NavList>
              <NavItem href="/tokens/colors" label="Colors" icon={<IconPalette size={18} />} />
              <NavItem href="/tokens/typography" label="Typography" icon={<IconFileText size={18} />} />
              <NavItem href="/tokens/spacing" label="Spacing" icon={<IconLayoutGrid size={18} />} />
            </NavList>
          </NavGroup>

          <NavSeparator />

          <NavGroup label="Primitives">
            <NavList>
              <NavItem href="/components/button" label="Button" icon={<IconBox size={18} />} />
              <NavItem href="/components/input" label="Input" icon={<IconCode size={18} />} />
              <NavItem href="/components/select" label="Select" icon={<IconBox size={18} />} />
            </NavList>
          </NavGroup>

          <NavSeparator />

          <NavGroup label="Resources">
            <NavList>
              <NavItem href="/docs" label="Documentation" icon={<IconBook2 size={18} />} />
              <NavItem href="/github" label="GitHub" icon={<IconBrandGithub size={18} />} />
            </NavList>
          </NavGroup>
        </Nav>
      </SidebarFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * Collapsed (rail)
 * ────────────────────────────── */

function CollapsedSection() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Section
      title="Collapsed rail — minimize the sidebar"
      description="Flip `collapsed` to shrink the nav into an icon-only rail. Labels fade to sr-only (screen readers still hear the name), badges/chevrons hide, items become square, and every submenu auto-switches to popover mode so dropdowns anchor to the icon and float out to the side."
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          marginBlockEnd: "var(--vds-space-3)",
          alignItems: "center",
        }}
      >
        <Button size="sm" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? "Expand" : "Collapse"}
        </Button>
        <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          <code>collapsed={String(collapsed)}</code>
        </span>
      </div>

      <SidebarFrame
        label="Collapsed rail demo"
        width={collapsed ? "3.5rem" : "16rem"}
        height="32rem"
        note={
          <>
            <p style={{ margin: 0 }}>Main content area. Toggle the rail with the button above. Notice:</p>
            <ul style={{ paddingInlineStart: "1.25em", marginBlockStart: "var(--vds-space-2)" }}>
              <li>Labels stay sr-only — screen readers still announce them.</li>
              <li><code>title</code> attribute shows the label on mouse hover.</li>
              <li>Items with submenus switch from inline accordion to popover.</li>
              <li>Popover anchors to the icon and flips / shifts via Floating UI.</li>
            </ul>
          </>
        }
      >
        <Nav
          orientation="vertical"
          collapsed={collapsed}
          currentPath="/components/button"
        >
          <NavGroup label="Workspace">
            <NavList>
              <NavItem href="/" label="Home" icon={<IconHome size={18} />} />
              <NavItem href="/team" label="Team" icon={<IconUsers size={18} />} />
              <NavItem href="/settings" label="Settings" icon={<IconSettings size={18} />} />
            </NavList>
          </NavGroup>

          <NavSeparator />

          <NavGroup label="Catalog">
            <NavList>
              <NavItem
                label="Products"
                icon={<IconBox size={18} />}
                submenu={
                  <NavSubmenu>
                    <NavList>
                      <NavItem href="/components/button" label="Button" />
                      <NavItem href="/components/input" label="Input" />
                      <NavItem href="/components/select" label="Select" />
                    </NavList>
                  </NavSubmenu>
                }
              />
              <NavItem
                label="Layout"
                icon={<IconLayoutGrid size={18} />}
                submenu={
                  <NavSubmenu>
                    <NavList>
                      <NavItem href="/components/section" label="Section" />
                      <NavItem href="/components/row" label="Row" />
                      <NavItem href="/components/col" label="Col" />
                    </NavList>
                  </NavSubmenu>
                }
              />
              <NavItem href="/docs" label="Docs" icon={<IconBook2 size={18} />} />
            </NavList>
          </NavGroup>
        </Nav>
      </SidebarFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * Nested
 * ────────────────────────────── */

function NestedSection() {
  return (
    <Section
      title="Nested — arbitrary depth"
      description="Inline submenus nest without ceremony. Each level bumps the `--item-indent` token for a readable hierarchy. Indent is styled up to 10 levels out of the box — the step tapers past level 3 so deep trees stay inside a standard 16rem sidebar. Below: three quick levels, then a ten-level smoke test."
    >
      <SidebarFrame label="Nested sidebar — three levels">
        <Nav orientation="vertical">
          <NavList>
            <NavItem
              label="Documentation"
              icon={<IconBook2 size={18} />}
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/docs/start" label="Getting started" />
                    <NavItem
                      label="Guides"
                      submenu={
                        <NavSubmenu>
                          <NavList>
                            <NavItem href="/docs/guides/auth" label="Authentication" />
                            <NavItem
                              label="Theming"
                              submenu={
                                <NavSubmenu>
                                  <NavList>
                                    <NavItem href="/docs/theming/colors" label="Colors" />
                                    <NavItem href="/docs/theming/radii" label="Radii" />
                                    <NavItem href="/docs/theming/typography" label="Typography" />
                                  </NavList>
                                </NavSubmenu>
                              }
                            />
                            <NavItem href="/docs/guides/i18n" label="i18n" />
                          </NavList>
                        </NavSubmenu>
                      }
                    />
                    <NavItem href="/docs/api" label="API reference" />
                  </NavList>
                </NavSubmenu>
              }
            />
          </NavList>
        </Nav>
      </SidebarFrame>

      <div style={{ marginBlockStart: "var(--vds-space-4)" }}>
        <SidebarFrame label="Ten-level nested sidebar" height="34rem">
          <TenLevelTree />
        </SidebarFrame>
      </div>
    </Section>
  );
}

/**
 * TenLevelTree — renders a single spine of ten nested inline submenus so every
 * `--item-indent` rule from level 1 through level 10 in Nav.tokens.css is
 * exercised visually. The "Level N" label matches the item's `data-level`.
 */
function TenLevelTree() {
  // Build the spine from the innermost leaf (level 10) outwards.
  // At level 10 the item has no submenu — it's a terminal link.
  let node: ReactNode = (
    <NavItem href="/depth/10" label="Level 10 · leaf" />
  );
  for (let depth = 9; depth >= 1; depth--) {
    const submenu = (
      <NavSubmenu>
        <NavList>{node}</NavList>
      </NavSubmenu>
    );
    node = (
      <NavItem
        label={`Level ${depth}`}
        icon={depth === 1 ? <IconBook2 size={18} /> : undefined}
        submenu={submenu}
      />
    );
  }

  return (
    <Nav orientation="vertical">
      <NavList>{node}</NavList>
    </Nav>
  );
}

/* ──────────────────────────────
 * Menubar
 * ────────────────────────────── */

function MenubarSection() {
  return (
    <Section
      title="Menubar — horizontal with popover submenus"
      description="Same component, different orientation. Popover submenus use Floating UI for flip / shift collision handling. Click or Enter / Space toggles the disclosure; Escape closes; outside-click dismisses — standard disclosure semantics."
    >
      <DemoFrame label="Menubar demo" height="18rem">
        <Nav orientation="horizontal" aria-label="Main">
          <NavList>
            <NavItem href="/" label="Home" />
            <NavItem
              label="Products"
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/products/design" label="Design tools" icon={<IconPalette size={16} />} />
                    <NavItem href="/products/dev" label="Developer tools" icon={<IconCode size={16} />} />
                    <NavItem href="/products/team" label="Team" icon={<IconUsers size={16} />} />
                  </NavList>
                </NavSubmenu>
              }
            />
            <NavItem
              label="Resources"
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/docs" label="Documentation" icon={<IconBook2 size={16} />} />
                    <NavItem href="/blog" label="Blog" icon={<IconFileText size={16} />} />
                    <NavItem href="/showcase" label="Showcase" icon={<IconStar size={16} />} />
                  </NavList>
                </NavSubmenu>
              }
            />
            <NavItem href="/pricing" label="Pricing" />
            <NavItem href="/contact" label="Contact" />
          </NavList>
        </Nav>
      </DemoFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * Mega
 * ────────────────────────────── */

function MegaSection() {
  return (
    <Section
      title="Mega menu — multi-column dropdown"
      description="When a submenu isn't just a list. NavMega replaces NavSubmenu and accepts free-form children organized in columns via NavMegaSection. Same state machine, same ARIA — only the presentation changes."
    >
      <DemoFrame label="Mega menu demo" height="22rem">
        <Nav orientation="horizontal" aria-label="Platform nav">
          <NavList>
            <NavItem href="/" label="Home" />
            <NavItem
              label="Platform"
              submenu={
                <NavMega columns={3}>
                  <NavMegaSection heading="Design">
                    <NavList>
                      <NavItem href="/design/tokens" label="Tokens" icon={<IconPalette size={16} />} />
                      <NavItem href="/design/components" label="Components" icon={<IconBox size={16} />} />
                      <NavItem href="/design/templates" label="Templates" icon={<IconLayoutGrid size={16} />} />
                    </NavList>
                  </NavMegaSection>

                  <NavMegaSection heading="Develop">
                    <NavList>
                      <NavItem href="/dev/sdk" label="SDK" icon={<IconBolt size={16} />} />
                      <NavItem href="/dev/cli" label="CLI" icon={<IconCode size={16} />} />
                      <NavItem href="/dev/api" label="REST API" icon={<IconCompass size={16} />} />
                    </NavList>
                  </NavMegaSection>

                  <NavMegaSection heading="Featured">
                    <a
                      href="/new/v2"
                      style={{
                        display: "block",
                        padding: "var(--vds-space-3)",
                        borderRadius: "var(--vds-radius-element)",
                        border: "1px solid var(--vds-color-border-muted)",
                        textDecoration: "none",
                        color: "inherit",
                        background:
                          "linear-gradient(135deg, var(--vds-color-primary-subtle), transparent)",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--vds-space-2)",
                          fontWeight: "var(--vds-font-weight-semibold)",
                          fontSize: "var(--vds-text-sm)",
                        }}
                      >
                        <IconRocket size={18} /> Virtari 2.0
                      </div>
                      <div
                        style={{
                          fontSize: "var(--vds-text-xs)",
                          color: "var(--vds-color-text-muted)",
                          marginBlockStart: "var(--vds-space-1)",
                        }}
                      >
                        New layout primitives, Header and Nav just shipped.
                      </div>
                      <div
                        style={{
                          fontSize: "var(--vds-text-xs)",
                          marginBlockStart: "var(--vds-space-2)",
                          color: "var(--vds-color-primary-emphasis)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Read more <IconArrowRight size={14} />
                      </div>
                    </a>
                  </NavMegaSection>
                </NavMega>
              }
            />
            <NavItem href="/pricing" label="Pricing" />
          </NavList>
        </Nav>
      </DemoFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * Variants
 * ────────────────────────────── */

const VARIANTS: NavVariant[] = [
  "ghost",
  "filled",
  "pill",
  "underline",
  "reveal",
  "outline",
  "lift",
  "none",
  "dot",
  "tab",
];

const VARIANT_HINTS: Record<NavVariant, string> = {
  ghost: "Minimal bg tint on hover — default, safe anywhere.",
  filled: "Solid bg block on hover. Good for dense sidebars.",
  pill: "Fully-rounded bg. Reads as an action chip.",
  underline: "Thin bottom border on current, tints on hover. Tab-style horizontal navs.",
  reveal: "Animated underline grows from the centre on hover. Marketing menubars.",
  outline: "Hollow border ring fades in on hover. Soft, structured look.",
  lift: "Soft shadow + 1px translate on hover. Card-like bounce.",
  none: "Zero chrome — only the text recolors to primary on hover / current.",
  dot: "Small primary circle pops in below the label. Minimalist indicator.",
  tab: "Thick primary bar with rounded top corners. Reads as a tab-strip.",
};

function VariantsSection() {
  const [variant, setVariant] = useState<NavVariant>("ghost");
  return (
    <Section
      title="Variants — ten hover decorations"
      description="Ten visual treatments. ghost / filled / pill / underline are the staples; reveal / outline / lift add richer hover decorations; none / dot / tab strip everything back to a single primary indicator — all especially suited to horizontal menubars. Each honors the current-page state and pulls from the same token palette."
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          flexWrap: "wrap",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        {VARIANTS.map((v) => (
          <Button
            key={v}
            size="sm"
            variant={variant === v ? "solid" : "outline"}
            onClick={() => setVariant(v)}
          >
            {v}
          </Button>
        ))}
      </div>

      <div
        style={{
          fontSize: "var(--vds-text-sm)",
          color: "var(--vds-color-text-muted)",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        {VARIANT_HINTS[variant]}
      </div>

      <DemoFrame label={`Variant: ${variant}`}>
        <Nav orientation="horizontal" variant={variant} currentPath="/docs">
          <NavList>
            <NavItem href="/" label="Home" icon={<IconHome size={16} />} />
            <NavItem href="/docs" label="Docs" icon={<IconBook2 size={16} />} />
            <NavItem href="/blog" label="Blog" icon={<IconFileText size={16} />} />
            <NavItem href="/pricing" label="Pricing" />
          </NavList>
        </Nav>
      </DemoFrame>

      <div style={{ marginBlockStart: "var(--vds-space-6)" }}>
        <h3
          style={{
            fontSize: "var(--vds-text-sm)",
            fontWeight: "var(--vds-font-weight-semibold)",
            marginBlock: "0 var(--vds-space-3)",
            color: "var(--vds-color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "var(--vds-tracking-wide)",
          }}
        >
          All seven side-by-side
        </h3>
        <div
          style={{
            display: "grid",
            gap: "var(--vds-space-3)",
          }}
        >
          {VARIANTS.map((v) => (
            <DemoFrame key={v} label={`Variant preview: ${v}`}>
              <div
                style={{
                  fontSize: "var(--vds-text-xs)",
                  color: "var(--vds-color-text-muted)",
                  fontFamily: "var(--vds-font-mono)",
                  marginBlockEnd: "var(--vds-space-2)",
                }}
              >
                variant="{v}"
              </div>
              <Nav orientation="horizontal" variant={v} currentPath="/docs">
                <NavList>
                  <NavItem href="/" label="Home" />
                  <NavItem href="/docs" label="Docs" />
                  <NavItem href="/blog" label="Blog" />
                  <NavItem href="/pricing" label="Pricing" />
                </NavList>
              </Nav>
            </DemoFrame>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────
 * Tree lines
 * ────────────────────────────── */

function TreeSection() {
  return (
    <Section
      title="Tree lines — file-tree style nesting"
      description="Opt in via the `tree` prop on Nav. Each inline submenu draws a 1px vertical guide from the parent item's icon centre down through its children — the classic file-tree look (VS Code sidebar, Finder). No-op for popover submenus and horizontal navs."
    >
      <SidebarFrame label="Tree nav" height="32rem">
        <Nav orientation="vertical" tree>
          <NavList>
            <NavItem
              label="src"
              icon={<IconBook2 size={18} />}
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/src/app" label="app.tsx" />
                    <NavItem
                      label="components"
                      submenu={
                        <NavSubmenu>
                          <NavList>
                            <NavItem href="/src/components/button" label="Button.tsx" />
                            <NavItem href="/src/components/input" label="Input.tsx" />
                            <NavItem
                              label="layout"
                              submenu={
                                <NavSubmenu>
                                  <NavList>
                                    <NavItem href="/src/layout/section" label="Section.tsx" />
                                    <NavItem href="/src/layout/row" label="Row.tsx" />
                                    <NavItem href="/src/layout/col" label="Col.tsx" />
                                  </NavList>
                                </NavSubmenu>
                              }
                            />
                          </NavList>
                        </NavSubmenu>
                      }
                    />
                    <NavItem href="/src/styles" label="styles.css" />
                  </NavList>
                </NavSubmenu>
              }
            />
            <NavItem
              label="public"
              icon={<IconBook2 size={18} />}
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/public/logo" label="logo.svg" />
                    <NavItem href="/public/favicon" label="favicon.ico" />
                  </NavList>
                </NavSubmenu>
              }
            />
            <NavItem href="/readme" label="README.md" icon={<IconFileText size={18} />} />
          </NavList>
        </Nav>
      </SidebarFrame>

      <pre className="docs-code">{`<Nav orientation="vertical" tree>
  <NavList>
    <NavItem label="src" icon={<IconFolder/>} submenu={
      <NavSubmenu>
        <NavList>{/* ... */}</NavList>
      </NavSubmenu>
    }/>
  </NavList>
</Nav>`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * Sizes
 * ────────────────────────────── */

const SIZES: NavSize[] = ["sm", "md", "lg"];

function SizesSection() {
  return (
    <Section
      title="Sizes — sm, md, lg"
      description="Three density tiers. Item height, padding, icon size, and typography all scale together from the same size scale as Button and Input, so a compact nav next to compact buttons lines up visually."
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--vds-space-4)",
        }}
      >
        {SIZES.map((size) => (
          <DemoFrame key={size} label={`Size: ${size}`}>
            <div
              style={{
                fontSize: "var(--vds-text-xs)",
                color: "var(--vds-color-text-muted)",
                fontFamily: "var(--vds-font-mono)",
                marginBlockEnd: "var(--vds-space-2)",
              }}
            >
              size="{size}"
            </div>
            <Nav orientation="horizontal" size={size} currentPath="/docs">
              <NavList>
                <NavItem href="/" label="Home" icon={<IconHome size={size === "lg" ? 20 : size === "sm" ? 14 : 16} />} />
                <NavItem href="/docs" label="Docs" icon={<IconBook2 size={size === "lg" ? 20 : size === "sm" ? 14 : 16} />} />
                <NavItem href="/settings" label="Settings" icon={<IconSettings size={size === "lg" ? 20 : size === "sm" ? 14 : 16} />} kbd="⌘," />
              </NavList>
            </Nav>
          </DemoFrame>
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────────
 * States
 * ────────────────────────────── */

function StatesSection() {
  return (
    <Section
      title="States — active, disabled"
      description="Active / current state comes from currentPath or manual `active` prop. Disabled sets aria-disabled='true', removes href, and blocks click events without hiding the item from assistive tech."
    >
      <SidebarFrame label="States sidebar" height="18rem">
        <Nav orientation="vertical">
          <NavList>
            <NavItem href="/home" label="Home" icon={<IconHome size={18} />} active />
            <NavItem href="/profile" label="Profile" icon={<IconUsers size={18} />} />
            <NavItem
              href="/billing"
              label="Billing"
              icon={<IconFileText size={18} />}
              disabled
            />
            <NavItem
              href="/experimental"
              label="Experimental"
              icon={<IconBolt size={18} />}
              badge={<Badge variant="outline">beta</Badge>}
            />
            <NavItem
              label="Disabled submenu"
              icon={<IconBox size={18} />}
              disabled
              submenu={
                <NavSubmenu>
                  <NavList>
                    <NavItem href="/nope" label="Unreachable" />
                  </NavList>
                </NavSubmenu>
              }
            />
          </NavList>
        </Nav>
      </SidebarFrame>

      <pre className="docs-code">{`<NavItem href="/home" label="Home" active />
<NavItem href="/billing" label="Billing" disabled />
<NavItem label="Beta" badge={<Badge variant="outline">beta</Badge>} />`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * currentPath
 * ────────────────────────────── */

function CurrentPathSection() {
  const [path, setPath] = useState("/docs/layout");
  const paths = ["/", "/docs", "/docs/layout", "/pricing"];

  return (
    <Section
      title="currentPath — auto aria-current"
      description={`Set currentPath on Nav and every NavLink whose href matches receives aria-current="page" automatically, plus data-active="true" for CSS. Use matchStrategy="startsWith" for nested-route matching (default is "exact").`}
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          flexWrap: "wrap",
          marginBlockEnd: "var(--vds-space-3)",
        }}
      >
        {paths.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={path === p ? "solid" : "outline"}
            onClick={() => setPath(p)}
            style={{ fontFamily: "var(--vds-font-mono)" }}
          >
            {p}
          </Button>
        ))}
      </div>

      <DemoFrame label={`currentPath: ${path}`}>
        <Nav
          orientation="horizontal"
          currentPath={path}
          matchStrategy="startsWith"
          aria-label="Docs sections"
        >
          <NavList>
            <NavItem href="/" label="Home" />
            <NavItem href="/docs" label="Docs" />
            <NavItem href="/docs/layout" label="Layout" />
            <NavItem href="/pricing" label="Pricing" />
          </NavList>
        </Nav>
      </DemoFrame>
    </Section>
  );
}

/* ──────────────────────────────
 * API
 * ────────────────────────────── */

function ApiSection() {
  return (
    <Section
      title="API"
      description="Every prop typed. Refs forwarded. Extra HTML props spread onto the root element."
    >
      <pre className="docs-code">{`interface NavProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;                             // default "nav"
  orientation?: "vertical" | "horizontal";      // default "vertical"
  submenu?: "inline" | "popover";               // default: inline (vert) / popover (horiz)
  variant?:
    | "ghost" | "filled" | "pill" | "underline"
    | "reveal" | "outline" | "lift"
    | "none" | "dot" | "tab";
  size?: "sm" | "md" | "lg";
  currentPath?: string;                         // drives auto aria-current
  matchStrategy?: "exact" | "startsWith";       // default "exact"
  collapsed?: boolean;                          // rail mode
  tree?: boolean;                               // vertical guide lines for nested inline submenus
}

interface NavItemProps extends HTMLAttributes<HTMLLIElement> {
  // Declarative (all optional — any combination triggers declarative mode):
  href?: string;
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  kbd?: ReactNode;
  submenu?: ReactNode;                          // <NavSubmenu> or <NavMega>
  submenuMode?: "inline" | "popover";           // per-item override
  open?: boolean;                               // controlled disclosure
  onOpenChange?: (open: boolean) => void;
  placement?: FloatingPlacement;                // popover placement
  active?: boolean;                             // override auto-match
  disabled?: boolean;
}

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;                            // Slot for routing libs
  active?: boolean;
  disabled?: boolean;
}

interface NavTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  active?: boolean;                             // e.g. a descendant is current
}

// Content slots:
NavIcon, NavLabel, NavBadge, NavKbd, NavChevron

// Containers:
NavList, NavGroup, NavSeparator

// Submenu containers:
NavSubmenu                                      // list-based
NavMega + NavMegaSection                        // free-form, multi-column`}</pre>
    </Section>
  );
}

/* ──────────────────────────────
 * Accessibility
 * ────────────────────────────── */

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Follows the W3C APG navigation-menu disclosure pattern — not the application-menu (role='menu') pattern. This is the correct choice for site navigation."
    >
      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
        <li>
          Root is <code>&lt;nav&gt;</code> — the navigation landmark — with{" "}
          <code>aria-label</code> (defaults to <em>Navigation</em>, override when the page has more than one nav landmark).
        </li>
        <li>
          List is a native <code>&lt;ul&gt;</code> with <code>&lt;li&gt;</code> items. No{" "}
          <code>role="menu"</code> / <code>"menubar"</code> — those roles are reserved for app-style menus (File / Edit / View) and confuse screen readers when applied to site navigation.
        </li>
        <li>
          <code>NavTrigger</code> renders a real <code>&lt;button&gt;</code> with{" "}
          <code>aria-expanded</code> and <code>aria-controls</code> pointing to the submenu id — the standard disclosure pattern. Works with Enter / Space / Tab out of the box.
        </li>
        <li>
          <code>NavLink</code> receives <code>aria-current="page"</code> when its{" "}
          <code>href</code> matches <code>currentPath</code>, so assistive tech announces the user's location.
        </li>
        <li>
          Popover submenus use <code>@floating-ui/react</code> + <code>FloatingFocusManager</code> — Escape closes and returns focus to the trigger; outside click dismisses; focus is never trapped (unlike modals).
        </li>
        <li>
          <code>NavGroup</code> renders <code>role="group" aria-labelledby</code> so screen readers announce the group name when entering its list.
        </li>
        <li>
          Disabled state sets <code>aria-disabled="true"</code> and removes <code>href</code> — activation is cleanly blocked without hiding the element from AT.
        </li>
        <li>Icons are <code>aria-hidden="true"</code>; the label is the accessible name.</li>
        <li>In collapsed rail mode, labels become visually-hidden but remain in the a11y tree; items additionally carry a <code>title</code> for hover hints.</li>
        <li>All transitions respect <code>prefers-reduced-motion: reduce</code>.</li>
      </ul>
    </Section>
  );
}
