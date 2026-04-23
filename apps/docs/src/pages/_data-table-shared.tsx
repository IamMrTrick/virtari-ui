import type { ReactNode } from "react";

/* ─────────────────────────────── Docs sticky offset ─────────────────────────────── */

/** Height of the docs app header (HeaderMain height="xl" = 5rem). DataTable
 *  sticky bands pin below this so they never sit under the chrome. */
export const DOCS_STICKY_TOP_OFFSET = "5rem";

/* ─────────────────────────────── Deterministic RNG ─────────────────────────────── */

export function seededRng(seed: number) {
  let x = seed | 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1_000_000) / 1_000_000;
  };
}

export function pickFrom<T>(r: () => number, arr: readonly T[]): T {
  return arr[Math.floor(r() * arr.length)]!;
}

/* ─────────────────────────────── Showcase shell ─────────────────────────────── */

export function ShowcaseShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-section">
      <h2 className="docs-section-title">{title}</h2>
      {description && (
        <p className="docs-section-description">{description}</p>
      )}
      {children}
    </section>
  );
}

/* ─────────────────────────────── Demo hint ─────────────────────────────── */

export function DemoHint({ children }: { children: ReactNode }) {
  return <p className="docs-demo-hint">{children}</p>;
}

/* ─────────────────────────────── Users dataset ─────────────────────────────── */

export type UserRole =
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

export type UserStatus = "active" | "inactive";

export interface UserRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  twoFA: boolean;
}

const USER_ROLES: UserRole[] = [
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

export function makeUsers(count: number): UserRow[] {
  const r = seededRng(0x1f37c);
  const out: UserRow[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const first = pickFrom(r, FIRST_NAMES);
    const last = pickFrom(r, LAST_NAMES);
    out.push({
      id: i + 1,
      firstName: first,
      lastName: last,
      email: `${last.toLowerCase()}${i > 0 ? i : ""}@example.com`,
      role: pickFrom(r, USER_ROLES),
      status: r() < 0.85 ? "active" : "inactive",
      twoFA: r() < 0.7,
      joinedAt: new Date(
        now - Math.floor(r() * 36 * 30 * 24 * 3600 * 1000),
      ).toISOString(),
    });
  }
  return out;
}

export function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function formatJoined(iso: string) {
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

/* ─────────────────────────────── Products dataset ─────────────────────────────── */

export type ProductCategory =
  | "Apparel"
  | "Electronics"
  | "Home"
  | "Beauty"
  | "Sports";

export type StockStatus = "in-stock" | "low" | "out";

export interface ProductRow {
  id: number;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  stock: number;
  stockStatus: StockStatus;
  updatedAt: string;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Apparel",
  "Electronics",
  "Home",
  "Beauty",
  "Sports",
];

const PRODUCT_PREFIXES = [
  "Aurora", "Vertex", "Nimbus", "Atlas", "Orion", "Lumen", "Halo", "Ember",
  "Zephyr", "Cobalt", "Quartz", "Onyx", "Ivory", "Slate", "Mesa", "Cirrus",
];

const PRODUCT_SUFFIXES = [
  "Pro", "Max", "Lite", "Plus", "Mini", "XL", "Core", "Edge", "Studio",
  "Classic", "Nova", "One",
];

export function makeProducts(count: number): ProductRow[] {
  const r = seededRng(0x2b1c0);
  const out: ProductRow[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const cat = pickFrom(r, PRODUCT_CATEGORIES);
    const prefix = pickFrom(r, PRODUCT_PREFIXES);
    const suffix = pickFrom(r, PRODUCT_SUFFIXES);
    const stock = Math.floor(r() * 300);
    const stockStatus: StockStatus =
      stock === 0 ? "out" : stock < 20 ? "low" : "in-stock";
    out.push({
      id: i + 1,
      name: `${prefix} ${suffix}`,
      sku: `VD-${String(10000 + i).slice(-5)}`,
      category: cat,
      price: Math.round((r() * 480 + 20) * 100) / 100,
      stock,
      stockStatus,
      updatedAt: new Date(
        now - Math.floor(r() * 90 * 24 * 3600 * 1000),
      ).toISOString(),
    });
  }
  return out;
}

export const CATEGORY_TONES: Record<
  ProductCategory,
  "info" | "success" | "warning" | "neutral" | "danger"
> = {
  Apparel: "info",
  Electronics: "neutral",
  Home: "success",
  Beauty: "warning",
  Sports: "danger",
};

export const STOCK_TONES: Record<
  StockStatus,
  "success" | "warning" | "danger"
> = {
  "in-stock": "success",
  low: "warning",
  out: "danger",
};

/* ─────────────────────────────── Orders dataset ─────────────────────────────── */

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderLineItem {
  id: number;
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRow {
  id: number;
  number: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  placedAt: string;
  items: OrderLineItem[];
}

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export function makeOrders(count: number): OrderRow[] {
  const r = seededRng(0x3e7f1);
  const products = makeProducts(40);
  const users = makeUsers(80);
  const out: OrderRow[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const u = users[Math.floor(r() * users.length)]!;
    const lineCount = 1 + Math.floor(r() * 5);
    const items: OrderLineItem[] = [];
    let total = 0;
    for (let j = 0; j < lineCount; j++) {
      const p = products[Math.floor(r() * products.length)]!;
      const qty = 1 + Math.floor(r() * 4);
      const line: OrderLineItem = {
        id: j + 1,
        product: p.name,
        quantity: qty,
        unitPrice: p.price,
      };
      items.push(line);
      total += qty * p.price;
    }
    out.push({
      id: i + 1,
      number: `ORD-${String(100000 + i).slice(-6)}`,
      customerName: `${u.firstName} ${u.lastName}`,
      customerEmail: u.email,
      status: pickFrom(r, ORDER_STATUSES),
      total: Math.round(total * 100) / 100,
      itemCount: items.reduce((s, it) => s + it.quantity, 0),
      placedAt: new Date(
        now - Math.floor(r() * 180 * 24 * 3600 * 1000),
      ).toISOString(),
      items,
    });
  }
  return out;
}

export const ORDER_STATUS_TONES: Record<
  OrderStatus,
  "neutral" | "info" | "warning" | "success" | "danger"
> = {
  pending: "neutral",
  processing: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  refunded: "warning",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};
