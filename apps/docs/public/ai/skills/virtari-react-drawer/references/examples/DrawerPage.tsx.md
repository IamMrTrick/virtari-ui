# Original documentation page

Source ID: `apps/docs/src/pages/DrawerPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@virtari-packages/react-avatar";
import { Badge } from "@virtari-packages/react-badge";
import { Button } from "@virtari-packages/react-button";
import { Checkbox } from "@virtari-packages/react-checkbox";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerHandle,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type Direction,
  type DrawerHeaderVariant,
  type DrawerIndicatorPlacement,
  type DrawerSizeMode,
} from "@virtari-packages/react-drawer";
import { Input } from "@virtari-packages/react-input";
import { RadioGroup, RadioGroupItem } from "@virtari-packages/react-radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Separator } from "@virtari-packages/react-separator";
import { Slider } from "@virtari-packages/react-slider";
import { Switch } from "@virtari-packages/react-switch";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPanels,
} from "@virtari-packages/react-tabs";
import { Textarea } from "@virtari-packages/react-textarea";
import { Section, Row } from "../components";

/* ─────────────────────────────── Helpers ─────────────────────────────── */

/** Tracks a CSS media query. Inline here so examples stay self-contained. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Labeled form field — small column with a label on top. */
function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-sm)",
        color: "var(--vds-color-text)",
      }}
    >
      <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{label}</span>
      {children}
      {hint && (
        <span
          style={{
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

function FormStack({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-4)",
      }}
    >
      {children}
    </div>
  );
}

function InlineRow({
  children,
  gap = "3",
  align = "center",
}: {
  children: React.ReactNode;
  gap?: "2" | "3" | "4";
  align?: "center" | "start";
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: align === "start" ? "flex-start" : "center",
        gap: `var(--vds-space-${gap})`,
      }}
    >
      {children}
    </div>
  );
}

/** Switch-on-label pattern. Label left, switch right, keeps label clickable. */
function SwitchRow({
  title,
  hint,
  defaultChecked,
}: {
  title: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-4)",
        fontSize: "var(--vds-text-sm)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{title}</span>
        {hint && (
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
            }}
          >
            {hint}
          </span>
        )}
      </span>
      <Switch defaultChecked={defaultChecked} />
    </label>
  );
}

/* ──────────────────────────── Demo Drawer (options) ──────────────────────────── */

type DemoDrawerProps = {
  label: string;
  title?: string;
  description?: string;
  body?: React.ReactNode;
  direction?: Direction;
  sizeMode?: DrawerSizeMode;
  size?: string | number;
  offset?: number;
  indicator?: DrawerIndicatorPlacement;
  headerVariant?: DrawerHeaderVariant;
  dragHandleOnly?: boolean;
  dismissible?: boolean;
  scaleBackground?: boolean;
  stretch?: boolean;
};

function DemoDrawer({
  label,
  title = "Drawer",
  description = "Drag the handle or dismiss with Cancel.",
  body,
  scaleBackground = true,
  ...drawerProps
}: DemoDrawerProps) {
  return (
    <Drawer scaleBackground={scaleBackground} {...drawerProps}>
      <DrawerTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {body ?? (
            <p className="docs-prose">
              Replace the body with your own content — forms, lists, tables, media,
              or anything scrollable.
            </p>
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ───────────────────────── Example 1 — Edit record (responsive) ───────────────────────── */

function EditProfileDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const direction: Direction = isDesktop ? "right" : "bottom";

  return (
    <Drawer
      direction={direction}
      sizeMode={isDesktop ? "fixed" : "adaptive"}
      size={isDesktop ? "32rem" : undefined}
      openStates={
        isDesktop
          ? undefined
          : [
              { id: "peek", size: 0.55, label: "Peek" },
              { id: "full", size: 1, label: "Full" },
            ]
      }
      defaultOpenState={isDesktop ? undefined : "full"}
      headerVariant="bordered"
      scaleBackground
    >
      <DrawerTrigger asChild>
        <Button>Edit profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Update personal details and notification preferences. Changes save when you
            click Save.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <FormStack>
            <InlineRow gap="3">
              <Avatar fallback="AL" size="lg" />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: "var(--vds-font-weight-semibold)" }}>
                  Ada Lovelace
                </span>
                <span
                  style={{
                    fontSize: "var(--vds-text-xs)",
                    color: "var(--vds-color-text-muted)",
                  }}
                >
                  Member since 2024 · Admin
                </span>
              </div>
            </InlineRow>

            <Separator />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
                gap: "var(--vds-space-4)",
              }}
            >
              <Field label="First name" htmlFor="edit-first">
                <Input id="edit-first" defaultValue="Ada" />
              </Field>
              <Field label="Last name" htmlFor="edit-last">
                <Input id="edit-last" defaultValue="Lovelace" />
              </Field>
            </div>

            <Field label="Email" htmlFor="edit-email" hint="Used for sign-in and recovery.">
              <Input id="edit-email" type="email" defaultValue="ada@virtari.dev" />
            </Field>

            <Field label="Role">
              <Select defaultValue="admin">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Bio" hint="Max 240 characters." htmlFor="edit-bio">
              <Textarea
                id="edit-bio"
                rows={4}
                defaultValue="Working on differential engines and the notation thereof."
              />
            </Field>

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
              <span
                style={{
                  fontSize: "var(--vds-text-xs)",
                  fontWeight: "var(--vds-font-weight-semibold)",
                  color: "var(--vds-color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--vds-tracking-wider)",
                }}
              >
                Notifications
              </span>
              <SwitchRow
                title="Product updates"
                hint="New features and changelog highlights."
                defaultChecked
              />
              <SwitchRow
                title="Security alerts"
                hint="Sign-ins from new devices and policy changes."
                defaultChecked
              />
              <SwitchRow
                title="Weekly digest"
                hint="A roundup of activity every Monday."
              />
            </div>
          </FormStack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Save changes</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ──────────────────────────── Example 2 — Product filters ──────────────────────────── */

const BRAND_OPTIONS = [
  "Virtari",
  "Acme",
  "Globex",
  "Umbrella",
  "Initech",
  "Hooli",
] as const;

function ProductFiltersDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const direction: Direction = isDesktop ? "right" : "bottom";
  const [price, setPrice] = useState<number[]>([40, 320]);
  const [brands, setBrands] = useState<Set<string>>(
    new Set(["Virtari", "Acme"]),
  );
  const [condition, setCondition] = useState("any");
  const [sort, setSort] = useState("relevance");

  const activeCount = brands.size + (price[0] !== 0 || price[1] !== 500 ? 1 : 0)
    + (condition !== "any" ? 1 : 0);

  const toggleBrand = (brand: string) => {
    setBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  };

  const reset = () => {
    setPrice([0, 500]);
    setBrands(new Set());
    setCondition("any");
    setSort("relevance");
  };

  return (
    <Drawer
      direction={direction}
      sizeMode={isDesktop ? "fixed" : "adaptive"}
      size={isDesktop ? "24rem" : undefined}
      openStates={
        isDesktop
          ? undefined
          : [
              { id: "peek", size: 0.5, label: "Peek" },
              { id: "full", size: 1, label: "Full" },
            ]
      }
      headerVariant="bordered"
      scaleBackground
    >
      <DrawerTrigger asChild>
        <Button variant="outline" rightSection={activeCount > 0 ? <Badge>{activeCount}</Badge> : undefined}>
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Refine the product list. Filters apply when you click Apply.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <FormStack>
            <Field
              label={`Price — $${price[0]} to $${price[1]}`}
              hint="Drag either thumb to adjust."
            >
              <Slider
                min={0}
                max={500}
                step={10}
                value={price}
                onValueChange={setPrice}
              />
            </Field>

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
              <span
                style={{
                  fontSize: "var(--vds-text-sm)",
                  fontWeight: "var(--vds-font-weight-medium)",
                }}
              >
                Brand
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
                {BRAND_OPTIONS.map((brand) => (
                  <label
                    key={brand}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--vds-space-3)",
                      fontSize: "var(--vds-text-sm)",
                      cursor: "pointer",
                    }}
                  >
                    <Checkbox
                      checked={brands.has(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
              <span
                style={{
                  fontSize: "var(--vds-text-sm)",
                  fontWeight: "var(--vds-font-weight-medium)",
                }}
              >
                Condition
              </span>
              <RadioGroup value={condition} onValueChange={setCondition}>
                {[
                  { value: "any", label: "Any" },
                  { value: "new", label: "New" },
                  { value: "refurb", label: "Refurbished" },
                  { value: "used", label: "Used" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--vds-space-3)",
                      fontSize: "var(--vds-text-sm)",
                      cursor: "pointer",
                    }}
                  >
                    <RadioGroupItem value={opt.value} />
                    {opt.label}
                  </label>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <Field label="Sort">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price — low to high</SelectItem>
                  <SelectItem value="price-desc">Price — high to low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FormStack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
          <DrawerClose asChild>
            <Button>Apply</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ──────────────────────────── Example 3 — Cart summary ──────────────────────────── */

type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

const INITIAL_CART: CartItem[] = [
  { id: "a", name: "Aurora Lamp", variant: "Warm · Medium", price: 129, qty: 1 },
  { id: "b", name: "Ceramic Mug Set", variant: "Bone white · 4-pack", price: 48, qty: 2 },
  { id: "c", name: "Linen Throw", variant: "Stone grey", price: 79, qty: 1 },
];

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function CartDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const direction: Direction = isDesktop ? "right" : "bottom";
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  return (
    <Drawer
      direction={direction}
      sizeMode={isDesktop ? "fixed" : "adaptive"}
      size={isDesktop ? "28rem" : undefined}
      openStates={
        isDesktop
          ? undefined
          : [
              { id: "peek", size: 0.55, label: "Peek" },
              { id: "full", size: 1, label: "Full" },
            ]
      }
      headerVariant="bordered"
      scaleBackground
    >
      <DrawerTrigger asChild>
        <Button rightSection={totalItems > 0 ? <Badge>{totalItems}</Badge> : undefined}>
          Open cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>Your cart</DrawerTitle>
          <DrawerDescription>
            {items.length === 0
              ? "Your cart is empty."
              : `${totalItems} item${totalItems === 1 ? "" : "s"} · ${formatUSD(subtotal)}`}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {items.length === 0 ? (
            <p className="docs-prose">Add items to the cart to see them here.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.5rem 1fr auto",
                    gap: "var(--vds-space-3)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      inlineSize: "3.5rem",
                      blockSize: "3.5rem",
                      borderRadius: "var(--vds-radius-card)",
                      background:
                        "linear-gradient(135deg, var(--vds-color-primary-100), var(--vds-color-primary-200))",
                    }}
                    aria-hidden
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--vds-text-xs)",
                        color: "var(--vds-color-text-muted)",
                      }}
                    >
                      {item.variant}
                    </span>
                    <InlineRow gap="2">
                      <Button
                        size="2xs"
                        variant="outline"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </Button>
                      <span
                        style={{
                          minInlineSize: "1.5rem",
                          textAlign: "center",
                          fontVariantNumeric: "tabular-nums",
                          fontSize: "var(--vds-text-sm)",
                        }}
                      >
                        {item.qty}
                      </span>
                      <Button
                        size="2xs"
                        variant="outline"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </Button>
                    </InlineRow>
                  </div>
                  <span
                    style={{
                      fontWeight: "var(--vds-font-weight-semibold)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatUSD(item.price * item.qty)}
                  </span>
                </div>
              ))}

              <Separator />

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "Shipping", value: shipping },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "var(--vds-text-sm)",
                      color: "var(--vds-color-text-muted)",
                    }}
                  >
                    <span>{row.label}</span>
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                      {formatUSD(row.value)}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "var(--vds-font-weight-semibold)",
                    fontSize: "var(--vds-text-base)",
                  }}
                >
                  <span>Total</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatUSD(total)}</span>
                </div>
              </div>
            </div>
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Continue shopping</Button>
          </DrawerClose>
          <Button disabled={items.length === 0} fullWidth>
            Checkout · {formatUSD(total)}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ──────────────────────────── Example 4 — Mobile nav ──────────────────────────── */

function MobileNavDrawer() {
  const navItems = [
    { label: "Dashboard", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Team", href: "#" },
    { label: "Billing", href: "#" },
    { label: "Settings", href: "#" },
  ];
  const resources = [
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Support", href: "#" },
  ];

  return (
    <Drawer direction="left" sizeMode="fixed" size="20rem" indicator="hidden" scaleBackground>
      <DrawerTrigger asChild>
        <Button variant="outline">Open navigation</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader variant="bordered">
          <InlineRow gap="3">
            <div
              style={{
                inlineSize: "2rem",
                blockSize: "2rem",
                borderRadius: "var(--vds-radius-card)",
                background: "var(--vds-color-primary-500)",
                color: "white",
                display: "grid",
                placeItems: "center",
                fontWeight: "var(--vds-font-weight-bold)",
                fontSize: "var(--vds-text-sm)",
              }}
            >
              V
            </div>
            <DrawerTitle>Virtari</DrawerTitle>
          </InlineRow>
        </DrawerHeader>
        <DrawerBody>
          <nav style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
              <span
                style={{
                  fontSize: "var(--vds-text-xs)",
                  fontWeight: "var(--vds-font-weight-semibold)",
                  color: "var(--vds-color-text-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--vds-tracking-wider)",
                  paddingInline: "var(--vds-space-2)",
                  marginBlockEnd: "var(--vds-space-1)",
                }}
              >
                Workspace
              </span>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: "var(--vds-space-2) var(--vds-space-3)",
                    borderRadius: "var(--vds-radius-card)",
                    fontSize: "var(--vds-text-sm)",
                    color: "var(--vds-color-text)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
              <span
                style={{
                  fontSize: "var(--vds-text-xs)",
                  fontWeight: "var(--vds-font-weight-semibold)",
                  color: "var(--vds-color-text-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--vds-tracking-wider)",
                  paddingInline: "var(--vds-space-2)",
                  marginBlockEnd: "var(--vds-space-1)",
                }}
              >
                Resources
              </span>
              {resources.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: "var(--vds-space-2) var(--vds-space-3)",
                    borderRadius: "var(--vds-radius-card)",
                    fontSize: "var(--vds-text-sm)",
                    color: "var(--vds-color-text-muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <InlineRow gap="3">
            <Avatar fallback="AL" size="sm" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <span style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-medium)" }}>
                Ada Lovelace
              </span>
              <span
                style={{
                  fontSize: "var(--vds-text-xs)",
                  color: "var(--vds-color-text-muted)",
                }}
              >
                ada@virtari.dev
              </span>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                Sign out
              </Button>
            </DrawerClose>
          </InlineRow>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ─────────────────────── Example 5 — Notification center ─────────────────────── */

type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New comment on “Q2 roadmap”",
    body: "Priya: Ready to review when you are.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    title: "Deploy succeeded",
    body: "main@a3f21c0 shipped to production.",
    time: "14m ago",
    unread: true,
  },
  {
    id: "3",
    title: "Invoice paid",
    body: "Acme Inc. — $4,200.00",
    time: "1h ago",
    unread: false,
  },
  {
    id: "4",
    title: "New sign-in",
    body: "Chrome on macOS · San Francisco",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    title: "Weekly digest",
    body: "12 merges, 48 comments, 3 new teammates.",
    time: "2d ago",
    unread: false,
  },
];

function NotificationItem({ n }: { n: Notification }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: "var(--vds-space-3)",
        alignItems: "start",
        padding: "var(--vds-space-3)",
        borderRadius: "var(--vds-radius-card)",
        background: n.unread
          ? "var(--vds-color-primary-muted)"
          : "transparent",
      }}
    >
      <div
        style={{
          inlineSize: "0.5rem",
          blockSize: "0.5rem",
          borderRadius: "var(--vds-radius-full)",
          background: n.unread
            ? "var(--vds-color-primary-emphasis)"
            : "transparent",
          marginBlockStart: "0.45rem",
        }}
        aria-hidden
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minInlineSize: 0 }}>
        <span
          style={{
            fontSize: "var(--vds-text-sm)",
            fontWeight: "var(--vds-font-weight-medium)",
          }}
        >
          {n.title}
        </span>
        <span
          style={{
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          {n.body}
        </span>
      </div>
      <span
        style={{
          fontSize: "var(--vds-text-xs)",
          color: "var(--vds-color-text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {n.time}
      </span>
    </div>
  );
}

function NotificationsDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [items, setItems] = useState<Notification[]>(NOTIFICATIONS);
  const [tab, setTab] = useState("all");

  const unreadCount = items.filter((n) => n.unread).length;
  const unreadItems = items.filter((n) => n.unread);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  const renderList = (list: Notification[]) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1)",
        marginBlockStart: "var(--vds-space-3)",
      }}
    >
      {list.length === 0 ? (
        <p className="docs-prose">Nothing to see here.</p>
      ) : (
        list.map((n) => <NotificationItem key={n.id} n={n} />)
      )}
    </div>
  );

  return (
    <Drawer
      direction={isDesktop ? "right" : "bottom"}
      sizeMode={isDesktop ? "fixed" : "adaptive"}
      size={isDesktop ? "26rem" : undefined}
      openStates={
        isDesktop
          ? undefined
          : [
              { id: "peek", size: 0.5 },
              { id: "full", size: 1 },
            ]
      }
      headerVariant="bordered"
      scaleBackground
    >
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          rightSection={unreadCount > 0 ? <Badge>{unreadCount}</Badge> : undefined}
        >
          Notifications
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerHandle />
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <Tabs value={tab} onValueChange={setTab}>
            {/* Break the tab list out of DrawerBody's inline padding so the
                underline reaches the drawer edges; push the triggers back in
                with equal internal padding so they keep their visual inset. */}
            <TabsList
              style={{
                marginInline: "calc(-1 * var(--vds-space-6))",
                paddingInline: "var(--vds-space-6)",
                inlineSize: "calc(100% + 2 * var(--vds-space-6))",
                maxInlineSize: "none",
              }}
            >
              <TabsTrigger value="all">All · {items.length}</TabsTrigger>
              <TabsTrigger value="unread">Unread · {unreadCount}</TabsTrigger>
            </TabsList>
            <TabsPanels>
              <TabsContent value="all">{renderList(items)}</TabsContent>
              <TabsContent value="unread">{renderList(unreadItems)}</TabsContent>
            </TabsPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={markAllRead} disabled={unreadCount === 0}>
            Mark all read
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ───────────────────────────── Playground ───────────────────────────── */

type SelectOption<T extends string> = { value: T; label: string };

function LabeledSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectOption<T>>;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-xs)",
        color: "var(--vds-color-text-muted)",
        minInlineSize: "10rem",
      }}
    >
      <span>{label}</span>
      <Select value={value} onValueChange={(next) => onChange(next as T)}>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

const DIRECTION_OPTIONS: ReadonlyArray<SelectOption<Direction>> = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const SIZE_MODE_OPTIONS: ReadonlyArray<SelectOption<DrawerSizeMode>> = [
  { value: "adaptive", label: "Adaptive" },
  { value: "full", label: "Full" },
  { value: "fixed", label: "Fixed" },
];

const INDICATOR_OPTIONS: ReadonlyArray<SelectOption<DrawerIndicatorPlacement>> = [
  { value: "inside", label: "Inside" },
  { value: "outside", label: "Outside" },
  { value: "progress", label: "Progress" },
  { value: "hidden", label: "Hidden" },
];

const HEADER_OPTIONS: ReadonlyArray<SelectOption<DrawerHeaderVariant>> = [
  { value: "plain", label: "Plain" },
  { value: "bordered", label: "Bordered" },
];

function buildPlaygroundCode({
  direction,
  sizeMode,
  indicator,
  headerVariant,
}: {
  direction: Direction;
  sizeMode: DrawerSizeMode;
  indicator: DrawerIndicatorPlacement;
  headerVariant: DrawerHeaderVariant;
}) {
  const props = [
    `direction="${direction}"`,
    `sizeMode="${sizeMode}"`,
    sizeMode === "fixed" ? `size="28rem"` : null,
    `indicator="${indicator}"`,
    `headerVariant="${headerVariant}"`,
  ].filter(Boolean) as string[];

  return `<Drawer
  ${props.join("\n  ")}
  openStates={[
    { id: "peek", size: 0.4 },
    { id: "full", size: 1 },
  ]}
>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerHandle />
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* content */}</DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;
}

function Playground() {
  const [direction, setDirection] = useState<Direction>("bottom");
  const [sizeMode, setSizeMode] = useState<DrawerSizeMode>("adaptive");
  const [indicator, setIndicator] = useState<DrawerIndicatorPlacement>("inside");
  const [headerVariant, setHeaderVariant] = useState<DrawerHeaderVariant>("plain");

  return (
    <>
      <Row>
        <LabeledSelect
          label="Direction"
          value={direction}
          onChange={setDirection}
          options={DIRECTION_OPTIONS}
        />
        <LabeledSelect
          label="Size mode"
          value={sizeMode}
          onChange={setSizeMode}
          options={SIZE_MODE_OPTIONS}
        />
        <LabeledSelect
          label="Indicator"
          value={indicator}
          onChange={setIndicator}
          options={INDICATOR_OPTIONS}
        />
        <LabeledSelect
          label="Header"
          value={headerVariant}
          onChange={setHeaderVariant}
          options={HEADER_OPTIONS}
        />
      </Row>

      <Drawer
        direction={direction}
        sizeMode={sizeMode}
        size={sizeMode === "fixed" ? "28rem" : undefined}
        indicator={indicator}
        headerVariant={headerVariant}
        scaleBackground
        openStates={[
          { id: "peek", size: 0.4, label: "Peek" },
          { id: "full", size: 1, label: "Full" },
        ]}
      >
        <DrawerTrigger asChild>
          <Button>Open playground drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerHandle />
            <DrawerTitle>Playground</DrawerTitle>
            <DrawerDescription>
              direction={direction} · sizeMode={sizeMode} · indicator={indicator} ·
              header={headerVariant}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <p className="docs-prose">
              Change the controls above and reopen the drawer. Each change is
              reflected in the generated snippet below.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <pre className="docs-code">
        {buildPlaygroundCode({ direction, sizeMode, indicator, headerVariant })}
      </pre>
    </>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function DrawerPage() {
  return (
    <>
      <Section
        title="Overview"
        description="A drawer is a sliding surface that enters from any edge. Use it for secondary tasks that benefit from staying in the flow — editing, filtering, reviewing — where a full-page navigation would feel heavy and a popover would feel cramped."
      >
        <p className="docs-prose">
          Built on Dialog primitives for accessibility (focus trap, ESC, scroll lock),
          tuned for touch (native-feel drag with rubber-band physics, snap points,
          velocity flicks), and aware of the mobile virtual keyboard so focused
          inputs stay visible above the IME on both iOS and Android.
        </p>
      </Section>

      <Section
        title="Quick start"
        description="The smallest complete drawer. Trigger → Content → Header → Body → Footer."
      >
        <Row>
          <Drawer scaleBackground>
            <DrawerTrigger asChild>
              <Button>Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerHandle />
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Update your details and save your changes.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <FormStack>
                  <Field label="Name" htmlFor="qs-name">
                    <Input id="qs-name" defaultValue="Ada Lovelace" />
                  </Field>
                  <Field label="Email" htmlFor="qs-email">
                    <Input id="qs-email" type="email" defaultValue="ada@virtari.dev" />
                  </Field>
                </FormStack>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button>Save</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Row>
      </Section>

      <Section
        title="Anatomy"
        description="A drawer is a composition of named parts. Use them in this order."
      >
        <pre className="docs-code">{`<Drawer>                   // root — owns state, direction, size, snaps
  <DrawerTrigger />        // opens the drawer (asChild recommended)
  <DrawerContent>          // the sliding panel (portalled, focus-trapped)
    <DrawerHeader>         // top region — title + handle
      <DrawerHandle />     // drag indicator + drag surface
      <DrawerTitle />      // required for screen readers
      <DrawerDescription/> // optional supporting copy
    </DrawerHeader>
    <DrawerBody />         // scrollable content region
    <DrawerFooter />       // sticky action bar (auto-margin pushes to bottom)
    <DrawerClose />        // closes the drawer (place anywhere)
  </DrawerContent>
</Drawer>`}</pre>
        <p className="docs-prose">
          <strong>Why these parts?</strong> <code>DrawerBody</code> scrolls, which
          keeps the header and footer visually pinned while the middle region grows
          or shrinks to fit. <code>DrawerHandle</code> is a drag target on touch
          devices — keep it inside the header for the familiar bottom-sheet look,
          or set <code>indicator="outside"</code> for a floating pill.
        </p>
        <p className="docs-prose">
          <strong>Recommended shell:</strong> for desktop side-panels, prefer
          <code>direction="left" | "right"</code> with
          <code>indicator="hidden"</code>, and keep a separated header + footer so
          the drawer reads like an app panel instead of a plain sheet.
        </p>
      </Section>

      {/* ───────────────────────── Real-world patterns ───────────────────────── */}

      <Section
        title="Pattern — Responsive detail panel"
        description="Desktop: opens from the right as a fixed-width panel. Mobile: opens from the bottom with peek/full snap points. A single drawer adapts with a matchMedia hook — no layout duplication."
      >
        <Row>
          <EditProfileDrawer />
        </Row>
        <p className="docs-prose">
          The responsive direction comes from a tiny <code>useMediaQuery</code>
          hook. Swap <code>direction</code> and <code>sizeMode</code> based on the
          breakpoint, and pass <code>openStates</code> only on mobile so the user
          can peek the form before committing to full height.
        </p>
        <pre className="docs-code">{`const isDesktop = useMediaQuery("(min-width: 768px)");

<Drawer
  direction={isDesktop ? "right" : "bottom"}
  sizeMode={isDesktop ? "fixed" : "adaptive"}
  size={isDesktop ? "32rem" : undefined}
  openStates={isDesktop ? undefined : [
    { id: "peek", size: 0.55 },
    { id: "full", size: 1 },
  ]}
>
  {/* ... */}
</Drawer>`}</pre>
      </Section>

      <Section
        title="Pattern — Product filters"
        description="Ghost Reset + primary Apply in the footer, with an active-filter count as a badge on the trigger. On mobile the drawer opens from the bottom with a peek state so you can see what you're filtering without fully committing."
      >
        <Row>
          <ProductFiltersDrawer />
        </Row>
      </Section>

      <Section
        title="Pattern — Cart summary"
        description="A right drawer on desktop, bottom on mobile. The footer sums the cart and exposes the checkout CTA — try removing items to see the total update live."
      >
        <Row>
          <CartDrawer />
        </Row>
      </Section>

      <Section
        title="Pattern — Mobile navigation"
        description="A left drawer works for primary navigation. Hidden drag indicator, bordered header with the app mark, body holds the nav groups, and the footer docks the user identity."
      >
        <Row>
          <MobileNavDrawer />
        </Row>
      </Section>

      <Section
        title="Pattern — Notification center"
        description="A right drawer with Tabs inside for All vs. Unread. Footer actions: Mark all read and Close."
      >
        <Row>
          <NotificationsDrawer />
        </Row>
      </Section>

      {/* ────────────────────────────── Options ────────────────────────────── */}

      <Section
        title="Direction"
        description="Slide in from any edge. Bottom suits modal sheets on mobile; left and right suit navigation and detail panels on desktop; top is useful for command surfaces."
      >
        <Row>
          <DemoDrawer direction="bottom" label="Bottom" title="From bottom" />
          <DemoDrawer direction="top" label="Top" title="From top" />
          <DemoDrawer
            direction="left"
            label="Left"
            title="From left"
            sizeMode="fixed"
            size="22rem"
          />
          <DemoDrawer
            direction="right"
            label="Right"
            title="From right"
            sizeMode="fixed"
            size="22rem"
          />
        </Row>
      </Section>

      <Section
        title="Size modes"
        description="Adaptive fits the content, full covers the viewport, fixed uses an explicit size. Use adaptive for short forms, full for immersive flows, fixed for side panels."
      >
        <Row>
          <DemoDrawer
            sizeMode="adaptive"
            label="Adaptive"
            title="Adaptive"
            description="Height is measured from the content and clamped to the viewport."
          />
          <DemoDrawer
            sizeMode="full"
            label="Full"
            title="Full"
            description="Fills the viewport in the drawer's direction."
          />
          <DemoDrawer
            sizeMode="fixed"
            size="28rem"
            label="Fixed 28rem"
            title="Fixed"
            description="Uses the exact size you provide — accepts px, rem, or %."
          />
        </Row>
      </Section>

      <Section
        title="Offset — floating sheet"
        description="Keep a gap from every viewport edge with all four corners rounded. Accepts a number (px) or a string (any CSS length)."
      >
        <Row>
          <DemoDrawer
            offset={16}
            label="Floating bottom"
            title="Offset 16"
            description="16px from the bottom and sides, with at least 16px reserved above."
          />
          <DemoDrawer
            direction="right"
            sizeMode="fixed"
            size="22rem"
            offset={24}
            label="Floating right"
            title="Offset 24"
            description="24px from the top, bottom, and right, with at least 24px reserved on the left."
          />
        </Row>
      </Section>

      <Section
        title="Open states — staged drawer"
        description="Name each resting stage with a semantic id. Drag or flick the handle to snap between them. Prefer openStates over raw numeric snapPoints — the id is stable and self-documenting."
      >
        <Drawer
          openStates={[
            { id: "peek", size: 0.35, label: "Peek" },
            { id: "comfortable", size: 0.7, label: "Comfortable" },
            { id: "full", size: 1, label: "Full" },
          ]}
          defaultOpenState="comfortable"
          scaleBackground
        >
          <DrawerTrigger asChild>
            <Button>Open staged drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Three stages</DrawerTitle>
              <DrawerDescription>
                Drag or flick the handle — the drawer snaps to the nearest stage.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="docs-prose">
                Each stage has an <code>id</code> and a <code>size</code> — a ratio
                between 0 and 1 for relative sizing, or an absolute number/string
                for explicit sizing. Control the current stage via{" "}
                <code>activeOpenState</code> + <code>onActiveOpenStateChange</code>.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section
        title="Minimized lane"
        description="A pre-close resting position below the open states. Drag past the smallest stage and the drawer rests as a compact bar instead of dismissing. Useful for music players, call widgets, and progress trackers."
      >
        <Drawer
          openStates={[
            { id: "peek", size: 0.4, label: "Peek" },
            { id: "full", size: 1, label: "Full" },
          ]}
          minimizedState={{ id: "minimized", size: 72, label: "Minimized" }}
          scaleBackground
        >
          <DrawerTrigger asChild>
            <Button>Open with minimized lane</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHandle />
              <DrawerTitle>Three lanes</DrawerTitle>
              <DrawerDescription>
                minimized → open states → closed. Drag down past peek to minimize.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="docs-prose">
                While minimized the drawer becomes non-modal so the page behind is
                interactive. Tap the minimized bar to expand back to an open state.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section
        title="Indicator & header"
        description="Place the handle inside the header, literally outside the drawer, as a progress fill, or hide it entirely. Bottom/top drawers default to a plain header; left/right drawers default to a bordered header so side-panels read as structured app chrome."
      >
        <Row>
          <DemoDrawer
            indicator="inside"
            headerVariant="plain"
            label="Inside"
            title="Inside indicator"
            description="Handle sits inside the header, no separator."
          />
          <DemoDrawer
            indicator="outside"
            headerVariant="plain"
            label="Outside"
            title="Outside indicator"
            description="Just the bar, floating above the drawer's edge with no background."
          />
          <DemoDrawer
            indicator="progress"
            headerVariant="plain"
            label="Progress"
            title="Progress indicator"
            description="Drag me toward the close threshold — the bar fills as I approach dismissal."
          />
          <DemoDrawer
            indicator="hidden"
            headerVariant="bordered"
            label="Hidden"
            title="No indicator"
            description="Bordered header separates the title from the body."
          />
        </Row>
        <p className="docs-prose">
          <strong>Progress indicator</strong> is a drag-aware variant: as the
          user pulls the drawer past its smallest resting stage toward the{" "}
          <code>closeThreshold</code>, the handle bar fills from the center
          outward. When it's fully saturated, releasing dismisses the drawer.
          Use it for confirmation-heavy drawers (checkout, destructive flows)
          where the user benefits from seeing how committed a swipe is.
        </p>
      </Section>

      <Section
        title="Behavior flags"
        description="Fine-tune how the drawer feels. scaleBackground needs a parent with data-vds-drawer-wrapper."
      >
        <Row>
          <DemoDrawer
            dragHandleOnly
            label="Handle-only drag"
            title="Handle-only drag"
            description="Only the handle initiates drag. The body scrolls instead."
          />
          <DemoDrawer
            label="Elastic edge (default)"
            title="A little give at the edge"
            description="Pull past the open limit: the free edge extends slightly while the docked edge stays pinned. Text stays unscaled, and the handle adds a soft primary halo. Release to settle back."
          />
          <DemoDrawer
            dismissible={false}
            label="Persistent"
            title="Persistent drawer"
            description="Escape and overlay taps are ignored — close it with the action below."
          />
          <div data-vds-drawer-wrapper>
            <DemoDrawer
              scaleBackground
              label="Scales background"
              title="Background scales"
              description="The parent wrapper scales and rounds while the drawer is open."
            />
          </div>
        </Row>
      </Section>

      <Section
        title="Mobile keyboard (IME)"
        description="The drawer watches the virtual keyboard via the visualViewport API and keeps focused inputs visible above the IME on both iOS and Android. No viewport meta tag changes required."
      >
        <p className="docs-prose">
          On <strong>iOS</strong>, Safari scrolls the layout viewport so the focused
          input stays above the keyboard — the drawer follows natively. On{" "}
          <strong>Android</strong>, the layout viewport does not shrink when the
          IME opens, so a CSS custom property{" "}
          <code>--vds-drawer-keyboard-inset</code> lifts the bottom drawer by the
          keyboard height and shrinks side drawers so the focused input is never
          occluded. The formula self-balances — it contributes zero on iOS and the
          true keyboard height on Android.
        </p>
        <p className="docs-prose">
          Test it: open any of the real-world examples above on a mobile device,
          focus an input, and watch the drawer stay above the keyboard. Tab between
          inputs — each is scrolled into view automatically.
        </p>
      </Section>

      <Section
        title="Accessibility"
        description="Built on Dialog primitives. What you get for free — and what you own."
      >
        <p className="docs-prose">
          <strong>Built in:</strong> focus trap while open, <code>Escape</code> to
          close (unless <code>dismissible=false</code>), scroll lock on the
          document, <code>aria-modal</code>, labelled region via{" "}
          <code>DrawerTitle</code>, described by <code>DrawerDescription</code>{" "}
          when present. The drag handle is purely decorative — the drawer remains
          usable with keyboard only.
        </p>
        <p className="docs-prose">
          <strong>You own:</strong> always include <code>DrawerTitle</code>, even
          for visual-first drawers — wrap it with a visually-hidden utility if you
          don't want to show the text. Keep the initial focus sensible (first
          input, primary action, or the title) — use <code>preventAutoFocus</code>{" "}
          and call <code>focus()</code> yourself if the default pick is wrong.
        </p>
      </Section>

      <Section
        title="Playground"
        description="Flip four axes and open the drawer — the generated snippet below updates live."
      >
        <Playground />
      </Section>

      <Section title="Installation & imports">
        <pre className="docs-code">{`pnpm add @virtari-packages/react-drawer

// your app entry (once):
import "@virtari-packages/react-drawer/styles";

// per component:
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerHandle, DrawerTitle, DrawerDescription,
  DrawerBody, DrawerFooter, DrawerClose,
} from "@virtari-packages/react-drawer";`}</pre>
      </Section>

      <Section
        title="API reference"
        description="The most-used props on the Drawer root. Every part also forwards its refs and standard HTML attributes."
      >
        <pre className="docs-code">{`<Drawer>
  // Positioning
  direction?:      "top" | "bottom" | "left" | "right"   // default "bottom"
  sizeMode?:       "adaptive" | "full" | "fixed"         // default "adaptive"
  size?:           string | number                       // when sizeMode="fixed"
  offset?:         string | number                       // floating-sheet gap

  // Staging
  openStates?:     Array<{ id, size, label? }>           // named stages
  defaultOpenState?: string                              // initial stage id
  activeOpenState?:  string | null                       // controlled
  onActiveOpenStateChange?: (id) => void
  minimizedState?: { id, size, label? }                  // pre-close resting lane

  // Lower-level snap API (prefer openStates)
  snapPoints?:       SnapPoint[]
  defaultSnapPoint?: SnapPoint
  activeSnapPoint?:  SnapPoint
  onActiveSnapPointChange?: (snap) => void
  snapBehavior?:     "staged" | "closest"                // default "staged"
  snapStepThreshold?: number
  snapSkipThreshold?: number
  closeThreshold?:    number
  velocityThreshold?: number

  // Appearance
  indicator?:      "inside" | "outside" | "progress" | "hidden"  // default "inside"
  headerVariant?:  "plain" | "bordered"                  // default "plain" on top/bottom, "bordered" on left/right
  scaleBackground?: boolean                              // needs data-vds-drawer-wrapper
  stretch?:         boolean                              // default true; bounded edge extension, no content scaling

  // Behavior
  open?:            boolean                              // controlled
  defaultOpen?:     boolean
  onOpenChange?:    (open) => void
  modal?:           boolean                              // default true
  dismissible?:     boolean                              // default true
  dragHandleOnly?:  boolean                              // default false
  preventAutoFocus?: boolean
</Drawer>`}</pre>
      </Section>
    </>
  );
}

```
