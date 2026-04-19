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
} from "@virtari/react-nav";
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
} from "@virtari/react-icons";
import { Button } from "@virtari/react-button";
import { Badge } from "@virtari/react-badge";
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
      <pre className="docs-code">{`import { Nav, NavList, NavItem, NavSubmenu } from "@virtari/react-nav";

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
      description="Inline submenus nest without ceremony. Each level bumps the indent token for a readable hierarchy. Arbitrary depth is supported — three shown here, but you can go deeper."
    >
      <SidebarFrame label="Nested sidebar">
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
    </Section>
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

const VARIANTS: NavVariant[] = ["ghost", "filled", "pill", "underline"];

function VariantsSection() {
  const [variant, setVariant] = useState<NavVariant>("ghost");
  return (
    <Section
      title="Variants — ghost, filled, pill, underline"
      description="Four visual treatments. All honor the active / current-page state, all pull from the same token palette, and all work in horizontal and vertical orientations."
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
  variant?: "ghost" | "filled" | "pill" | "underline";
  size?: "sm" | "md" | "lg";
  currentPath?: string;                         // drives auto aria-current
  matchStrategy?: "exact" | "startsWith";       // default "exact"
  collapsed?: boolean;                          // rail mode
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
