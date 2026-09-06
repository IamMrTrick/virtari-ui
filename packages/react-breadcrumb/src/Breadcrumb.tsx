import {
  Children,
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { Slot } from "@virtari-packages/primitives/slot";
import { cn } from "@virtari-packages/utils";
import {
  IconChevronRight,
  IconPointFilled,
  IconArrowRight,
  IconHome,
  IconDots,
  type TablerIcon,
} from "@virtari-packages/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@virtari-packages/react-dropdown-menu";

/* ── Types ── */

export type BreadcrumbVariant =
  | "default"
  | "underline"
  | "ghost"
  | "soft"
  | "solid";

export type BreadcrumbSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type BreadcrumbSeparatorPreset = "chevron" | "slash" | "dot" | "arrow";

export interface BreadcrumbItemData {
  /** Visible label. Strings are also used by the JSON-LD `name` field. */
  label: ReactNode;
  /** Ancestor link destination. The final item is the current page; other items without href are plain text. */
  href?: string;
  /** Optional leading icon (Tabler icon component). */
  icon?: TablerIcon;
  /** Optional explicit override for the JSON-LD `name`. Useful when `label` is a non-string node. */
  name?: string;
}

/* ── Context (shared by all subcomponents) ── */

interface BreadcrumbContextValue {
  size: BreadcrumbSize;
  variant: BreadcrumbVariant;
  separator: BreadcrumbSeparatorPreset;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

function useBreadcrumbContext() {
  return (
    useContext(BreadcrumbContext) ?? {
      size: "md" as BreadcrumbSize,
      variant: "default" as BreadcrumbVariant,
      separator: "chevron" as BreadcrumbSeparatorPreset,
    }
  );
}

/* ── Separator icon registry ── */

const SEPARATOR_ICON: Record<
  Exclude<BreadcrumbSeparatorPreset, "slash">,
  TablerIcon
> = {
  chevron: IconChevronRight,
  dot: IconPointFilled,
  arrow: IconArrowRight,
};

/* ── Breadcrumb (Root, <nav>) ── */

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  /** Default separator preset used by every `<BreadcrumbSeparator>` without explicit children. */
  separator?: BreadcrumbSeparatorPreset;
  /** Convenience array API. When provided, Root renders the list itself; `children` is ignored. */
  items?: BreadcrumbItemData[];
  /** When `items.length > maxItems`, collapse the middle into an ellipsis menu. Disabled when undefined. */
  maxItems?: number;
  /** Items to keep visible at the start before the ellipsis. Default: 1. */
  itemsBeforeCollapse?: number;
  /** Items to keep visible at the end after the ellipsis. Default/minimum: 1, preserving the current page. */
  itemsAfterCollapse?: number;
  /** Inject a `<script type="application/ld+json">` with schema.org BreadcrumbList. Requires `items`. */
  seo?: boolean;
  /** Base URL used to resolve relative `href`s into absolute URLs in the JSON-LD payload. */
  seoBaseUrl?: string;
  /** Accessible label for the `<nav>` landmark. Default: "Breadcrumb". */
  "aria-label"?: string;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

export function Breadcrumb({
  variant = "default",
  size = "md",
  separator = "chevron",
  items,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  seo = false,
  seoBaseUrl,
  className,
  children,
  ref,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbProps) {
  const ctx = useMemo<BreadcrumbContextValue>(
    () => ({ size, variant, separator }),
    [size, variant, separator],
  );

  const jsonLd = useMemo(() => {
    if (!seo || !items?.length) return null;
    return buildJsonLd(items, seoBaseUrl);
  }, [seo, items, seoBaseUrl]);

  return (
    <BreadcrumbContext.Provider value={ctx}>
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("vds-breadcrumb", className)}
        data-variant={variant}
        data-size={size}
        data-separator={separator}
        {...props}
      >
        {items ? (
          <BreadcrumbList>
            {renderItemsArray(items, {
              maxItems,
              itemsBeforeCollapse,
              itemsAfterCollapse,
            })}
          </BreadcrumbList>
        ) : (
          children
        )}
        {jsonLd ? (
          <script
            type="application/ld+json"
            // HTML parses script end tags before JSON, including during SSR.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        ) : null}
      </nav>
    </BreadcrumbContext.Provider>
  );
}

/* ── BreadcrumbList (<ol>) ── */

export interface BreadcrumbListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  ref?: Ref<HTMLOListElement>;
}

export function BreadcrumbList({
  className,
  ref,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol
      ref={ref}
      className={cn("vds-breadcrumb__list", className)}
      {...props}
    />
  );
}

/* ── BreadcrumbItem (<li>) ── */

export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: Ref<HTMLLIElement>;
}

export function BreadcrumbItem({
  className,
  ref,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      ref={ref}
      className={cn("vds-breadcrumb__item", className)}
      {...props}
    />
  );
}

/* ── BreadcrumbLink (<a> or polymorphic via asChild) ── */

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export function BreadcrumbLink({
  asChild = false,
  className,
  ref,
  children,
  ...props
}: BreadcrumbLinkProps) {
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    return (
      <Slot
        ref={ref}
        className={cn("vds-breadcrumb__link", className)}
        {...props}
      >
        {cloneElement(
          child,
          undefined,
          renderBreadcrumbInlineContent(child.props.children),
        )}
      </Slot>
    );
  }

  return (
    <a
      ref={ref}
      className={cn("vds-breadcrumb__link", className)}
      {...props}
    >
      {renderBreadcrumbInlineContent(children)}
    </a>
  );
}

/* ── BreadcrumbPage (<span aria-current="page">) ── */

export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function BreadcrumbPage({
  className,
  ref,
  children,
  ...props
}: BreadcrumbPageProps) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn("vds-breadcrumb__page", className)}
      {...props}
    >
      {renderBreadcrumbInlineContent(children)}
    </span>
  );
}

/* ── BreadcrumbSeparator (<li aria-hidden>) ── */

export interface BreadcrumbSeparatorProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Override the preset for this single separator (otherwise inherits from Root). */
  preset?: BreadcrumbSeparatorPreset;
  /** Override the rendered content. When provided, takes precedence over the preset icon. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

export function BreadcrumbSeparator({
  preset,
  className,
  children,
  ref,
  ...props
}: BreadcrumbSeparatorProps) {
  const ctx = useBreadcrumbContext();
  const effective = preset ?? ctx.separator;

  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-preset={effective}
      className={cn("vds-breadcrumb__separator", className)}
      {...props}
    >
      {children ?? renderSeparatorIcon(effective)}
    </li>
  );
}

function renderSeparatorIcon(preset: BreadcrumbSeparatorPreset) {
  if (preset === "slash") {
    /* The slash glyph is rendered via ::before in CSS to avoid an extra SVG. */
    return null;
  }
  const SepIcon = SEPARATOR_ICON[preset] ?? IconChevronRight;
  return (
    <SepIcon stroke={1.75} aria-hidden focusable={false} />
  );
}

/* ── BreadcrumbEllipsis (collapse menu) ── */

export interface BreadcrumbEllipsisProps {
  /** Items to render inside the popover menu. */
  items?: BreadcrumbItemData[];
  /** Accessible label for the trigger button. */
  label?: string;
  className?: string;
}

export function BreadcrumbEllipsis({
  items,
  label = "Show hidden navigation",
  className,
}: BreadcrumbEllipsisProps) {
  /* Render as a non-interactive dot trio when no items are passed. */
  if (!items?.length) {
    return (
      <li
        role="presentation"
        aria-hidden="true"
        className={cn("vds-breadcrumb__ellipsis", className)}
      >
        <IconDots stroke={1.75} aria-hidden focusable={false} />
      </li>
    );
  }

  return (
    <li className={cn("vds-breadcrumb__ellipsis", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="vds-breadcrumb__ellipsis-trigger"
            aria-label={label}
          >
            <IconDots stroke={1.75} aria-hidden focusable={false} />
            <span className="vds-breadcrumb__sr-only">{label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {items.map((it, i) => {
            const key = `${i}-${typeof it.label === "string" ? it.label : ""}`;
            if (it.href) {
              return (
                <DropdownMenuItem key={key} asChild>
                  <a href={it.href}>{it.label}</a>
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem key={key} disabled>
                {it.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

/* ── BreadcrumbHome (shortcut) ── */

export interface BreadcrumbHomeProps
  extends Omit<BreadcrumbLinkProps, "children"> {
  /** Default: "/". */
  href?: string;
  /** Default: "Home". Used as `aria-label`. */
  label?: string;
  /** Optional visible label rendered next to the icon. */
  children?: ReactNode;
}

export function BreadcrumbHome({
  href = "/",
  label = "Home",
  children,
  ...props
}: BreadcrumbHomeProps) {
  return (
    <BreadcrumbLink href={href} aria-label={children ? undefined : label} {...props}>
      <IconHome stroke={1.75} aria-hidden focusable={false} />
      {children}
    </BreadcrumbLink>
  );
}

function renderBreadcrumbInlineContent(children: ReactNode) {
  const nodes = flattenBreadcrumbChildren(children);
  const leadingIcon =
    nodes.length > 0 && isBreadcrumbLeadingIcon(nodes[0]) ? nodes[0] : null;
  const labelNodes = leadingIcon ? nodes.slice(1) : nodes;

  return (
    <span
      className="vds-breadcrumb__content"
      data-icon-only={leadingIcon && labelNodes.length === 0 ? "" : undefined}
    >
      {leadingIcon ? (
        <span className="vds-breadcrumb__icon">{leadingIcon}</span>
      ) : null}
      {labelNodes.length ? (
        <span className="vds-breadcrumb__label">{labelNodes}</span>
      ) : null}
    </span>
  );
}

function flattenBreadcrumbChildren(children: ReactNode): ReactNode[] {
  const nodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;

    if (isValidElement(child) && child.type === Fragment) {
      nodes.push(
        ...flattenBreadcrumbChildren(
          (child.props as { children?: ReactNode }).children,
        ),
      );
      return;
    }

    nodes.push(child);
  });

  return nodes;
}

function isBreadcrumbLeadingIcon(node: ReactNode) {
  if (!isValidElement(node)) return false;

  const props = node.props as {
    children?: ReactNode;
    "aria-hidden"?: boolean;
    focusable?: boolean | string;
    "data-breadcrumb-icon"?: boolean;
  };

  if (props["data-breadcrumb-icon"]) return true;
  if (props["aria-hidden"] === true) return true;
  if (props.focusable === false || props.focusable === "false") return true;

  return typeof node.type !== "string" && Children.count(props.children) === 0;
}

/* ─────────────────────────────────────────────
 * Internals — array-mode rendering + collapse + JSON-LD
 * ───────────────────────────────────────────── */

interface CollapseConfig {
  maxItems?: number;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
}

function renderItemsArray(items: BreadcrumbItemData[], cfg: CollapseConfig) {
  const { maxItems } = cfg;
  const itemsBeforeCollapse = Number.isFinite(cfg.itemsBeforeCollapse)
    ? Math.max(0, Math.floor(cfg.itemsBeforeCollapse)) : 1;
  const itemsAfterCollapse = Number.isFinite(cfg.itemsAfterCollapse)
    ? Math.max(1, Math.floor(cfg.itemsAfterCollapse)) : 1;

  /* No collapse: render all items. */
  const shouldCollapse =
    typeof maxItems === "number" &&
    items.length > maxItems &&
    itemsBeforeCollapse + itemsAfterCollapse < items.length;

  if (!shouldCollapse) {
    return (
      <>
        {items.map((it, i) => (
          <Fragment key={keyFor(it, i)}>
            {renderItem(it, i === items.length - 1)}
            {i < items.length - 1 ? <BreadcrumbSeparator /> : null}
          </Fragment>
        ))}
      </>
    );
  }

  const head = items.slice(0, itemsBeforeCollapse);
  const tail = items.slice(items.length - itemsAfterCollapse);
  const hidden = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);

  return (
    <>
      {head.map((it, i) => (
        <Fragment key={`h-${keyFor(it, i)}`}>
          {renderItem(it, false)}
          <BreadcrumbSeparator />
        </Fragment>
      ))}
      <BreadcrumbEllipsis items={hidden} />
      <BreadcrumbSeparator />
      {tail.map((it, i) => (
        <Fragment key={`t-${keyFor(it, i)}`}>
          {renderItem(it, i === tail.length - 1)}
          {i < tail.length - 1 ? <BreadcrumbSeparator /> : null}
        </Fragment>
      ))}
    </>
  );
}

function renderItem(it: BreadcrumbItemData, isLast: boolean) {
  const Icon = it.icon;
  const content = (
    <>
      {Icon ? <Icon aria-hidden focusable={false} /> : null}
      {it.label}
    </>
  );

  if (isLast) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage>{content}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  if (!it.href) {
    return (
      <BreadcrumbItem>
        <span className="vds-breadcrumb__page">{renderBreadcrumbInlineContent(content)}</span>
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={it.href}>{content}</BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function keyFor(it: BreadcrumbItemData, i: number) {
  if (typeof it.label === "string") return `${i}-${it.label}`;
  if (it.href) return `${i}-${it.href}`;
  return String(i);
}

function buildJsonLd(items: BreadcrumbItemData[], baseUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => {
      const name = it.name ?? (typeof it.label === "string" ? it.label : undefined);
      const item = it.href ? resolveUrl(it.href, baseUrl) : undefined;
      return {
        "@type": "ListItem",
        position: i + 1,
        ...(name ? { name } : {}),
        ...(item ? { item } : {}),
      };
    }),
  };
}

function resolveUrl(href: string, baseUrl?: string): string {
  if (!baseUrl) return href;
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}
