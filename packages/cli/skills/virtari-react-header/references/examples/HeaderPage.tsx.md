# Original documentation page

Source ID: `apps/docs/src/pages/HeaderPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState, type ReactNode } from "react";
import {
  Header,
  HeaderTop,
  HeaderMain,
  HeaderBottom,
  HeaderStart,
  HeaderCenter,
  HeaderEnd,
  type HeaderStickyMode,
} from "@virtari-packages/react-header";
import { Nav, NavList, NavItem } from "@virtari-packages/react-nav";
import { Button } from "@virtari-packages/react-button";
import { Section } from "../components";

/* ─────────────────────────────── Helpers ─────────────────────────────── */

function DemoFrame({
  children,
  height = "22rem",
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
        position: "relative",
        overflowY: "auto",
        blockSize: height,
        border: "1px solid var(--vds-color-border-muted)",
        borderRadius: "var(--vds-radius-surface)",
        background: "var(--vds-color-bg)",
      }}
    >
      {children}
    </div>
  );
}

function Filler({ paragraphs = 8 }: { paragraphs?: number }) {
  const copy =
    "Scroll this area to see how the header rows above behave. Each row's sticky mode is configured independently, so you can stack an always-pinned row under a hide-on-scroll row and watch them coordinate offsets automatically.";
  return (
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
      {Array.from({ length: paragraphs }).map((_, i) => (
        <p key={i} style={{ margin: 0 }}>
          §{i + 1}. {copy}
        </p>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--vds-space-2)",
        fontWeight: "var(--vds-font-weight-semibold)",
        fontSize: "var(--vds-text-sm)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "inline-grid",
          placeItems: "center",
          inlineSize: "1.5rem",
          blockSize: "1.5rem",
          borderRadius: "var(--vds-radius-control-action)",
          background: "var(--vds-color-primary-emphasis)",
          color: "var(--vds-color-on-primary, #fff)",
          fontSize: "0.75rem",
        }}
      >
        V
      </span>
      Virtari
    </span>
  );
}

/**
 * HeaderNav — a horizontal <Nav> of link items. This is the real integration
 * pattern: a Nav landmark (<nav> wrapping <ul>) lives inside the center slot
 * of a HeaderMain. Items receive `aria-current="page"` if href matches the
 * currentPath, get keyboard focus rings, and inherit Nav variant / size.
 */
function HeaderNav({
  items,
  currentPath,
  label = "Primary",
}: {
  items: { label: string; href: string }[];
  currentPath?: string;
  label?: string;
}) {
  return (
    <Nav
      orientation="horizontal"
      size="sm"
      variant="ghost"
      currentPath={currentPath}
      aria-label={label}
    >
      <NavList>
        {items.map((i) => (
          <NavItem
            key={i.label}
            href={i.href}
            label={i.label}
            onClick={(e) => {
              // Demo-only: prevent the hash from navigating away.
              e.preventDefault();
            }}
          />
        ))}
      </NavList>
    </Nav>
  );
}

const STICKY_MODES: HeaderStickyMode[] = ["none", "always", "smart", "collapse"];

/* ─────────────────────────────── Page ─────────────────────────────── */

export function HeaderPage() {
  return (
    <>
      <Section
        title="Structure"
        description="Header is the semantic landmark for a page's banner. It composes up to three rows (top / main / bottom), each with three sections (start / center / end). Sticky stacking is coordinated automatically — each sticky row measures its own height and offsets the next sticky row below it."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Header, HeaderTop, HeaderMain, HeaderBottom,
  HeaderStart, HeaderCenter, HeaderEnd,
} from "@virtari-packages/react-header";

<Header aria-label="Site header" stickyOffset="0px">
  <HeaderTop sticky="collapse" background="emphasis">
    <HeaderStart>Free shipping this week</HeaderStart>
    <HeaderEnd>Close</HeaderEnd>
  </HeaderTop>

  <HeaderMain sticky="always">
    <HeaderStart><Logo /></HeaderStart>
    <HeaderCenter><Nav /></HeaderCenter>
    <HeaderEnd><Actions /></HeaderEnd>
  </HeaderMain>

  <HeaderBottom sticky="smart" height="sm" background="subtle">
    <HeaderStart>Breadcrumb</HeaderStart>
    <HeaderEnd>Filters</HeaderEnd>
  </HeaderBottom>
</Header>`} />
      </Section>

      <Section
        title="Basic — single row"
        description="The main row is the default. Left / center / right content flow into HeaderStart / HeaderCenter / HeaderEnd."
      >
        <DemoFrame label="Basic header demo">
          <Header>
            <HeaderMain>
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  items={[
                    { label: "Features", href: "#/features" },
                    { label: "Pricing", href: "#/pricing" },
                    { label: "Docs", href: "#/docs" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm" variant="ghost">
                  Sign in
                </Button>
                <Button size="sm">Get started</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <Filler />
        </DemoFrame>
      </Section>

      <Section
        title="All three rows — sticky: always"
        description="Top promo (always), main (always), and a bottom toolbar (always). Watch the offsets: each row pins below the previous sticky row automatically via CSS var stacking."
      >
        <DemoFrame label="Three-row always-sticky demo" height="24rem">
          <Header>
            <HeaderTop sticky="always" background="emphasis" height="sm">
              <HeaderStart>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    fontWeight: "var(--vds-font-weight-medium)",
                  }}
                >
                  🎉 New: Layout primitives are live
                </span>
              </HeaderStart>
              <HeaderEnd>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </HeaderEnd>
            </HeaderTop>

            <HeaderMain sticky="always">
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  currentPath="#/components"
                  items={[
                    { label: "Overview", href: "#/overview" },
                    { label: "Components", href: "#/components" },
                    { label: "Tokens", href: "#/tokens" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm">Docs</Button>
              </HeaderEnd>
            </HeaderMain>

            <HeaderBottom sticky="always" background="subtle" height="sm">
              <HeaderStart>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    color: "var(--vds-color-text-muted)",
                  }}
                >
                  foundations › colors
                </span>
              </HeaderStart>
              <HeaderEnd>
                <Button size="sm" variant="ghost">
                  Filter
                </Button>
              </HeaderEnd>
            </HeaderBottom>
          </Header>
          <Filler paragraphs={12} />
        </DemoFrame>
      </Section>

      <Section
        title="Smart sticky — hides on scroll down, returns on scroll up"
        description="The main row pins, but translates out of view when you scroll down and slides back when you scroll up. Useful when vertical space is precious."
      >
        <DemoFrame label="Smart sticky demo" height="24rem">
          <Header>
            <HeaderMain sticky="smart">
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  items={[
                    { label: "Products", href: "#/products" },
                    { label: "Pricing", href: "#/pricing" },
                    { label: "Blog", href: "#/blog" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm">Sign up</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <Filler paragraphs={12} />
        </DemoFrame>
      </Section>

      <Section
        title="Collapse sticky — smoothly shrinks to zero"
        description="The row stays pinned but its inner height animates to 0 once it scrolls past, as if it's being tucked away. Perfect for promo bars that shouldn't eat chrome forever. Scroll to see."
      >
        <DemoFrame label="Collapse sticky demo" height="24rem">
          <Header>
            <HeaderTop sticky="collapse" background="emphasis" height="sm">
              <HeaderStart>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    fontWeight: "var(--vds-font-weight-medium)",
                  }}
                >
                  Flash sale ends in 4h · Free shipping on all orders
                </span>
              </HeaderStart>
            </HeaderTop>

            <HeaderMain sticky="always">
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  items={[
                    { label: "Shop", href: "#/shop" },
                    { label: "New", href: "#/new" },
                    { label: "Sale", href: "#/sale" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm">Cart (2)</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <Filler paragraphs={14} />
        </DemoFrame>
      </Section>

      <Section
        title="Mixed modes — collapse + always + smart"
        description="Each row's sticky state is independent. Here the top promo collapses, the main header stays always-visible, and the bottom toolbar uses smart. All three coordinate offsets so they never overlap."
      >
        <DemoFrame label="Mixed sticky modes demo" height="26rem">
          <Header>
            <HeaderTop sticky="collapse" background="emphasis" height="sm">
              <HeaderCenter>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    fontWeight: "var(--vds-font-weight-medium)",
                  }}
                >
                  🚀 Shipping within 24h — order before midnight
                </span>
              </HeaderCenter>
            </HeaderTop>

            <HeaderMain sticky="always">
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  items={[
                    { label: "Explore", href: "#/explore" },
                    { label: "Library", href: "#/library" },
                    { label: "Docs", href: "#/docs" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm" variant="ghost">
                  Sign in
                </Button>
                <Button size="sm">Get app</Button>
              </HeaderEnd>
            </HeaderMain>

            <HeaderBottom sticky="smart" background="subtle" height="sm">
              <HeaderStart>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    color: "var(--vds-color-text-muted)",
                  }}
                >
                  components › header
                </span>
              </HeaderStart>
              <HeaderEnd>
                <HeaderNav
                  label="Meta"
                  items={[
                    { label: "Source", href: "#/source" },
                    { label: "Report bug", href: "#/report" },
                  ]}
                />
              </HeaderEnd>
            </HeaderBottom>
          </Header>
          <Filler paragraphs={16} />
        </DemoFrame>
      </Section>

      <Section
        title="Transparent mode"
        description="The row's background and bottom border are removed. Combine with a colored ancestor (e.g. hero image) for chromeless headers over content."
      >
        <DemoFrame label="Transparent demo">
          <div
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.2 265), oklch(0.35 0.15 300))",
              color: "#fff",
              minBlockSize: "100%",
            }}
          >
            <Header>
              <HeaderMain transparent>
                <HeaderStart>
                  <Logo />
                </HeaderStart>
                <HeaderCenter>
                  <HeaderNav
                    items={[
                      { label: "Home", href: "#/home" },
                      { label: "Tours", href: "#/tours" },
                      { label: "Contact", href: "#/contact" },
                    ]}
                  />
                </HeaderCenter>
                <HeaderEnd>
                  <Button size="sm" variant="outline">
                    Book now
                  </Button>
                </HeaderEnd>
              </HeaderMain>
            </Header>
            <div
              style={{
                padding: "var(--vds-space-12) var(--vds-space-6)",
                fontSize: "var(--vds-text-2xl)",
                fontWeight: "var(--vds-font-weight-semibold)",
                textAlign: "center",
              }}
            >
              Somewhere above the clouds.
            </div>
            <Filler paragraphs={6} />
          </div>
        </DemoFrame>
      </Section>

      <Section
        title="Center mode"
        description="When center mode is on, the middle section is geometrically centered regardless of start/end widths. Off by default — the middle section otherwise takes the available 1fr between start and end."
      >
        <DemoFrame label="Center mode demo">
          <Header>
            <HeaderMain center>
              <HeaderStart>
                <Logo />
              </HeaderStart>
              <HeaderCenter>
                <HeaderNav
                  items={[
                    { label: "Home", href: "#/home" },
                    { label: "About", href: "#/about" },
                    { label: "Contact", href: "#/contact" },
                  ]}
                />
              </HeaderCenter>
              <HeaderEnd>
                <Button size="sm">Shop</Button>
              </HeaderEnd>
            </HeaderMain>
          </Header>
          <Filler paragraphs={3} />
        </DemoFrame>
      </Section>

      <Section
        title="stickyOffset — banner above the header"
        description="When something (e.g. a cookie banner, another app chrome) sits above the header, set stickyOffset so sticky rows pin below it."
      >
        <StickyOffsetDemo />
      </Section>

      <Section
        title="API"
        description="Typed, ref-forwarding, with data-* attributes exposed for CSS overrides."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`interface HeaderProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "header"
  stickyOffset?: string;          // external top offset, any CSS length
}

interface HeaderRowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "div"
  slot: "top" | "main" | "bottom";
  sticky?: "none" | "always" | "smart" | "collapse";
  transparent?: boolean;
  center?: boolean;               // dead-center the middle section
  background?: "none" | "subtle" | "muted" | "emphasis";
  gutter?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  width?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  height?: "sm" | "md" | "lg" | "xl";
  blockSize?: string;             // arbitrary height
  contained?: boolean;            // default true
  collapseAt?: number;            // scrollY trigger for "collapse"
  smartThreshold?: number;        // px delta for "smart" flip
}

interface HeaderSectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "div"
  side: "start" | "center" | "end";
}

// Shortcuts (pre-configured slot / side):
HeaderTop, HeaderMain, HeaderBottom   // omit \`slot\`
HeaderStart, HeaderCenter, HeaderEnd  // omit \`side\``} />

        <div className="docs-prose">
          Sticky mode legend:{" "}
          <strong>
            {STICKY_MODES.map((m, i) => (
              <span key={m}>
                <VirtariInlineCode>{m}</VirtariInlineCode>
                {i < STICKY_MODES.length - 1 ? " · " : ""}
              </span>
            ))}
          </strong>
        </div>
      </Section>

      <Section
        title="Accessibility"
        description="Semantics and focus behavior. Navigation, nav-menu, and nav-item are separate components shipping next."
      >
        <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
          <li>
            Root is <VirtariInlineCode>&lt;header&gt;</VirtariInlineCode> — the banner landmark.
            Implicitly announced by screen readers when a direct descendant of{" "}
            <VirtariInlineCode>&lt;body&gt;</VirtariInlineCode>.
          </li>
          <li>
            Swap <VirtariInlineCode>as=&quot;nav&quot;</VirtariInlineCode> on the row or section that
            contains navigation — and always provide an{" "}
            <VirtariInlineCode>aria-label</VirtariInlineCode> when a page has more than one nav
            landmark.
          </li>
          <li>
            Row ordering follows source order. Write{" "}
            <VirtariInlineCode>HeaderTop → HeaderMain → HeaderBottom</VirtariInlineCode> to get the
            correct visual and sticky-stack order.
          </li>
          <li>
            <VirtariInlineCode>sticky=&quot;smart&quot;</VirtariInlineCode> sets{" "}
            <VirtariInlineCode>pointer-events: none</VirtariInlineCode> while hidden so hidden rows
            can&apos;t receive clicks through the transform.
          </li>
          <li>
            All transitions respect{" "}
            <VirtariInlineCode>prefers-reduced-motion: reduce</VirtariInlineCode>.
          </li>
        </ul>
      </Section>
    </>
  );
}

function StickyOffsetDemo() {
  const [offset, setOffset] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-3)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "var(--vds-space-2)",
          alignItems: "center",
          fontSize: "var(--vds-text-sm)",
        }}
      >
        <span>stickyOffset</span>
        {[0, 24, 48].map((v) => (
          <Button
            key={v}
            size="sm"
            variant={offset === v ? "solid" : "outline"}
            onClick={() => setOffset(v)}
          >
            {v}px
          </Button>
        ))}
      </div>

      <DemoFrame label="stickyOffset demo">
        {offset > 0 && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              blockSize: `${offset}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--vds-color-warning-muted, #fef3c7)",
              color: "var(--vds-color-warning-muted-text, #78350f)",
              fontSize: "var(--vds-text-xs)",
              fontWeight: "var(--vds-font-weight-medium)",
            }}
          >
            Pretend cookie banner — {offset}px tall
          </div>
        )}
        <Header stickyOffset={`${offset}px`}>
          <HeaderMain sticky="always">
            <HeaderStart>
              <Logo />
            </HeaderStart>
            <HeaderEnd>
              <Button size="sm">Account</Button>
            </HeaderEnd>
          </HeaderMain>
        </Header>
        <Filler paragraphs={10} />
      </DemoFrame>
    </div>
  );
}

```
