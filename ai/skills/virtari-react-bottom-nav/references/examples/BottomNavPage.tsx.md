# Original documentation page

Source ID: `apps/docs/src/pages/BottomNavPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  BottomNav,
  BottomNavItem,
  BottomNavFab,
  type BottomNavVariant,
  type BottomNavSize,
} from "@virtari-packages/react-bottom-nav";
import {
  IconHome,
  IconSearch,
  IconHeart,
  IconBell,
  IconUser,
  IconCompass,
  IconPlus,
  IconMessage2,
  IconSettings,
} from "@virtari-packages/react-icons";
import { Switch } from "@virtari-packages/react-switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Section, Row, Stack } from "../components";

/**
 * Demo frame — a phone-sized viewport that positions the bottom nav relative
 * to itself (not the page). Uses `position: "static"` on the nav so multiple
 * demos can coexist on one docs page without overlap, and so the fixed-bar
 * z-index doesn't hoist the preview above the docs chrome.
 */
function PhoneFrame({
  children,
  tall = false,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        inlineSize: "min(100%, 22rem)",
        blockSize: tall ? "24rem" : "16rem",
        border: "1px solid var(--vds-color-border-muted)",
        borderRadius: "var(--vds-radius-card, 1rem)",
        overflow: "hidden",
        background: "var(--vds-color-bg-subtle)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        isolation: "isolate",
      }}
    >
      {children}
    </div>
  );
}

/** Clickable demo — items track internal state so the preview shows live
 *  active-state changes without real navigation. No `href`, no page scroll. */
function DemoNav({
  variant = "material",
  size = "md",
  animatedIndicator = true,
  safeArea = true,
  elevated = false,
  withFab = false,
  withBadges = false,
  withNotch = false,
  initialKey = "home",
}: {
  variant?: BottomNavVariant;
  size?: BottomNavSize;
  animatedIndicator?: boolean;
  safeArea?: boolean;
  elevated?: boolean;
  withFab?: boolean;
  withBadges?: boolean;
  withNotch?: boolean;
  initialKey?: string;
}) {
  const [active, setActive] = useState(initialKey);

  const items = [
    { key: "home", icon: <IconHome size={22} />, label: "Home" },
    { key: "search", icon: <IconSearch size={22} />, label: "Search" },
    ...(withFab
      ? ([] as const)
      : ([{ key: "likes", icon: <IconHeart size={22} />, label: "Likes" }] as const)),
    {
      key: "alerts",
      icon: <IconBell size={22} />,
      label: "Alerts",
      badge: withBadges ? 3 : undefined,
    },
    {
      key: "me",
      icon: <IconUser size={22} />,
      label: "Profile",
      badge: withBadges ? true : undefined,
    },
  ] as const;

  const before = items.slice(0, 2);
  const after = items.slice(2);

  return (
    <BottomNav
      position="static"
      variant={variant}
      size={size}
      animatedIndicator={animatedIndicator}
      safeArea={safeArea}
      elevated={elevated}
      notch={withNotch}
    >
      {before.map((item) => (
        <BottomNavItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          active={active === item.key}
          onClick={() => setActive(item.key)}
          badge={"badge" in item ? item.badge : undefined}
        />
      ))}
      {withFab && <BottomNavFab icon={<IconPlus size={26} />} label="Compose" />}
      {after.map((item) => (
        <BottomNavItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          active={active === item.key}
          onClick={() => setActive(item.key)}
          badge={"badge" in item ? item.badge : undefined}
        />
      ))}
    </BottomNav>
  );
}

export function BottomNavPage() {
  const [variant, setVariant] = useState<BottomNavVariant>("material");
  const [size, setSize] = useState<BottomNavSize>("md");
  const [animatedIndicator, setAnimatedIndicator] = useState(true);
  const [safeArea, setSafeArea] = useState(true);
  const [elevated, setElevated] = useState(false);

  return (
    <>
      <Section
        title="Overview"
        description="Mobile-first bottom tab bar with four visual variants, an optional centre FAB, badge counters, iOS safe-area insets, auto-hide on scroll, and a JS-driven sliding indicator. Click between tabs in any preview to see the active-state animation — items track internal state so no real navigation happens."
      >
        <PhoneFrame>
          <DemoNav variant="material" withBadges />
        </PhoneFrame>
      </Section>

      <Section
        title="Variants"
        description="material (neutral pill behind the active icon) · ios (flat, colour-only) · floating (detached pill-bar with side margins) · underline (3px top-bar indicator, intent-coloured)."
      >
        <Stack>
          {(["material", "ios", "floating", "underline"] as const).map((v) => (
            <Row key={v}>
              <span
                className="docs-size-label"
                style={{ minInlineSize: "5.5rem" }}
              >
                {v}
              </span>
              <PhoneFrame>
                <DemoNav variant={v} initialKey="search" />
              </PhoneFrame>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section
        title="Sizes"
        description="sm (44px, WCAG AAA minimum) · md (52px, default) · lg (64px, roomy)."
      >
        <Stack>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <PhoneFrame>
                <DemoNav size={s} />
              </PhoneFrame>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section
        title="Badges"
        description="Pass badge={true} for a dot, badge={number} for a count pill (auto-overflows past max=99). The badge sits near the top-outer corner of the icon for clear separation from the item centre."
      >
        <PhoneFrame>
          <BadgesDemo />
        </PhoneFrame>
      </Section>

      <Section
        title="Centre FAB"
        description="Place a <BottomNavFab> among items for a prominent action (compose, camera, etc.). Pair with notch on the root to carve a rounded arc behind it."
      >
        <Stack>
          <Row>
            <span className="docs-size-label" style={{ minInlineSize: "5.5rem" }}>
              With notch
            </span>
            <PhoneFrame>
              <DemoNav
                variant="floating"
                withFab
                withNotch
                withBadges
                initialKey="home"
              />
            </PhoneFrame>
          </Row>
          <Row>
            <span className="docs-size-label" style={{ minInlineSize: "5.5rem" }}>
              Flat (no notch)
            </span>
            <PhoneFrame>
              <FlatFabDemo />
            </PhoneFrame>
          </Row>
        </Stack>
      </Section>

      <Section
        title="Floating + elevated"
        description="The floating variant is always elevated; other variants opt in with elevated prop."
      >
        <Stack>
          <Row>
            <span className="docs-size-label" style={{ minInlineSize: "5.5rem" }}>
              Floating
            </span>
            <PhoneFrame>
              <MinimalNav variant="floating" />
            </PhoneFrame>
          </Row>
          <Row>
            <span className="docs-size-label" style={{ minInlineSize: "5.5rem" }}>
              Elevated material
            </span>
            <PhoneFrame>
              <MinimalNav variant="material" elevated />
            </PhoneFrame>
          </Row>
        </Stack>
      </Section>

      <Section
        title="RTL"
        description="All layout uses logical properties — placing the component inside dir=rtl flips items, indicator, and badge placement automatically."
      >
        <div dir="rtl">
          <PhoneFrame>
            <RtlDemo />
          </PhoneFrame>
        </div>
      </Section>

      <Section
        title="Playground"
        description="Tweak the knobs and see them reflected below."
      >
        <Stack>
          <Row>
            <span className="docs-size-label">Variant</span>
            <div style={{ inlineSize: "10rem" }}>
              <Select
                value={variant}
                onValueChange={(v) => setVariant(v as BottomNavVariant)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["material", "ios", "floating", "underline"] as const).map(
                    (v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </Row>
          <Row>
            <span className="docs-size-label">Size</span>
            <div style={{ inlineSize: "10rem" }}>
              <Select
                value={size}
                onValueChange={(v) => setSize(v as BottomNavSize)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Row>
          <Row>
            <span className="docs-size-label">animatedIndicator</span>
            <Switch
              checked={animatedIndicator}
              onCheckedChange={setAnimatedIndicator}
            />
          </Row>
          <Row>
            <span className="docs-size-label">safeArea</span>
            <Switch checked={safeArea} onCheckedChange={setSafeArea} />
          </Row>
          <Row>
            <span className="docs-size-label">elevated</span>
            <Switch checked={elevated} onCheckedChange={setElevated} />
          </Row>

          <PhoneFrame>
            <DemoNav
              variant={variant}
              size={size}
              animatedIndicator={animatedIndicator}
              safeArea={safeArea}
              elevated={elevated}
              withBadges
            />
          </PhoneFrame>
        </Stack>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  BottomNav,
  BottomNavItem,
  BottomNavFab,
  BottomNavBadge,
} from "@virtari-packages/react-bottom-nav";

<BottomNav variant="material" currentPath={pathname}>
  <BottomNavItem href="/home"   icon={<IconHome />}   label="Home" />
  <BottomNavItem href="/search" icon={<IconSearch />} label="Search" />
  <BottomNavFab icon={<IconPlus />} label="Compose" color="accent" />
  <BottomNavItem href="/alerts" icon={<IconBell />}   label="Alerts" badge={3} />
  <BottomNavItem href="/me"     icon={<IconUser />}   label="Profile" />
</BottomNav>`} />
      </Section>
    </>
  );
}

/* ─── Standalone interactive demos (each owns its own state) ─── */

function BadgesDemo() {
  const [active, setActive] = useState("alerts");
  return (
    <BottomNav position="static" variant="ios">
      <BottomNavItem
        icon={<IconHome size={22} />}
        label="Home"
        active={active === "home"}
        onClick={() => setActive("home")}
      />
      <BottomNavItem
        icon={<IconMessage2 size={22} />}
        label="Messages"
        active={active === "messages"}
        onClick={() => setActive("messages")}
        badge={12}
      />
      <BottomNavItem
        icon={<IconBell size={22} />}
        label="Alerts"
        active={active === "alerts"}
        onClick={() => setActive("alerts")}
        badge={128}
      />
      <BottomNavItem
        icon={<IconUser size={22} />}
        label="Profile"
        active={active === "me"}
        onClick={() => setActive("me")}
        badge
      />
    </BottomNav>
  );
}

function FlatFabDemo() {
  const [active, setActive] = useState("search");
  return (
    <BottomNav position="static" variant="material">
      <BottomNavItem
        icon={<IconHome size={22} />}
        label="Home"
        active={active === "home"}
        onClick={() => setActive("home")}
      />
      <BottomNavItem
        icon={<IconSearch size={22} />}
        label="Search"
        active={active === "search"}
        onClick={() => setActive("search")}
      />
      <BottomNavFab icon={<IconPlus size={26} />} color="accent" label="Add" />
      <BottomNavItem
        icon={<IconBell size={22} />}
        label="Alerts"
        active={active === "alerts"}
        onClick={() => setActive("alerts")}
      />
      <BottomNavItem
        icon={<IconUser size={22} />}
        label="Profile"
        active={active === "me"}
        onClick={() => setActive("me")}
      />
    </BottomNav>
  );
}

function MinimalNav({
  variant,
  elevated,
}: {
  variant: BottomNavVariant;
  elevated?: boolean;
}) {
  const [active, setActive] = useState("home");
  return (
    <BottomNav position="static" variant={variant} elevated={elevated}>
      <BottomNavItem
        icon={<IconHome size={22} />}
        label="Home"
        active={active === "home"}
        onClick={() => setActive("home")}
      />
      <BottomNavItem
        icon={<IconCompass size={22} />}
        label="Explore"
        active={active === "explore"}
        onClick={() => setActive("explore")}
      />
      <BottomNavItem
        icon={<IconSettings size={22} />}
        label="Settings"
        active={active === "settings"}
        onClick={() => setActive("settings")}
      />
    </BottomNav>
  );
}

function RtlDemo() {
  const [active, setActive] = useState("alerts");
  return (
    <BottomNav position="static" variant="material">
      <BottomNavItem
        icon={<IconHome size={22} />}
        label="خانه"
        active={active === "home"}
        onClick={() => setActive("home")}
      />
      <BottomNavItem
        icon={<IconSearch size={22} />}
        label="جستجو"
        active={active === "search"}
        onClick={() => setActive("search")}
      />
      <BottomNavItem
        icon={<IconBell size={22} />}
        label="اعلان‌ها"
        active={active === "alerts"}
        onClick={() => setActive("alerts")}
        badge={5}
      />
      <BottomNavItem
        icon={<IconUser size={22} />}
        label="پروفایل"
        active={active === "me"}
        onClick={() => setActive("me")}
      />
    </BottomNav>
  );
}

```
