import { Slot } from "@radix-ui/react-slot";
import { cn } from "@virtari-packages/utils";
import {
  useCallback,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import {
  NavSubmenuContext,
  isActivePath,
  useNavContext,
  useNavLevel,
  useNavSubmenuContext,
  type NavSubmenuMode,
} from "./context";
import { useSubmenu } from "./useSubmenu";

/* ──────────────────────────────────────────────
 * Composition primitives
 * ────────────────────────────────────────────── */

export interface NavIconProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function NavIcon({
  asChild = false,
  className,
  ref,
  ...rest
}: NavIconProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      ref={ref}
      className={cn("vds-nav__icon", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}

export interface NavLabelProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function NavLabel({ className, ref, ...rest }: NavLabelProps) {
  return (
    <span ref={ref} className={cn("vds-nav__label", className)} {...rest} />
  );
}

export interface NavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function NavBadge({ className, ref, ...rest }: NavBadgeProps) {
  return (
    <span ref={ref} className={cn("vds-nav__badge", className)} {...rest} />
  );
}

export interface NavKbdProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export function NavKbd({ className, ref, ...rest }: NavKbdProps) {
  return (
    <kbd ref={ref} className={cn("vds-nav__kbd", className)} {...rest} />
  );
}

export interface NavChevronProps extends HTMLAttributes<SVGElement> {}

export function NavChevron({ className, ...rest }: NavChevronProps) {
  return (
    <svg
      className={cn("vds-nav__chevron", className)}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
 * NavLink — <a>
 * Honors currentPath matching from NavContext and
 * renders aria-current="page" when href matches.
 * ────────────────────────────────────────────── */

export interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> {
  asChild?: boolean;
  /** Manually force active state (overrides auto-match). */
  active?: boolean;
  /** Disabled state — sets aria-disabled + removes pointer events. */
  disabled?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export function NavLink({
  asChild = false,
  active,
  disabled,
  href,
  className,
  onClick,
  children,
  ref,
  ...rest
}: NavLinkProps) {
  const { currentPath, matchStrategy } = useNavContext();
  const Comp = asChild ? Slot : "a";

  const autoActive =
    active ?? isActivePath(href, currentPath, matchStrategy);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    },
    [disabled, onClick],
  );

  return (
    <Comp
      ref={ref}
      href={disabled ? undefined : href}
      className={cn("vds-nav__link", className)}
      aria-current={autoActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      data-active={autoActive || undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ──────────────────────────────────────────────
 * NavTrigger — <button> for disclosure
 * Reads NavSubmenuContext (provided by NavItem) to
 * wire aria-expanded, aria-controls, and click.
 * ────────────────────────────────────────────── */

export interface NavTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  asChild?: boolean;
  /** Visual active state (e.g. one of its descendants is the current page). */
  active?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function NavTrigger({
  asChild = false,
  active,
  disabled,
  className,
  type,
  children,
  ref,
  ...rest
}: NavTriggerProps) {
  const submenu = useNavSubmenuContext();
  const Comp = asChild ? Slot : "button";

  if (!submenu) {
    // No ancestor NavItem — render a plain button (still styled) so the
    // component stays functional even if the user forgot the wrapper.
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn("vds-nav__trigger", className)}
        disabled={asChild ? undefined : disabled}
        data-active={active || undefined}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  const { id, open, setOpen, floating } = submenu;
  const referenceProps =
    floating?.getReferenceProps({
      onClick: () => setOpen(!open),
    }) ?? { onClick: () => setOpen(!open) };

  const mergedRef = (el: HTMLButtonElement | null) => {
    if (floating) floating.refs.setReference(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    }
  };

  return (
    <Comp
      ref={mergedRef}
      type={asChild ? undefined : (type ?? "button")}
      className={cn("vds-nav__trigger", className)}
      aria-expanded={open}
      aria-controls={id}
      aria-disabled={disabled || undefined}
      disabled={asChild ? undefined : disabled}
      data-active={active || undefined}
      {...referenceProps}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ──────────────────────────────────────────────
 * NavItem — <li> + submenu state provider
 *
 * Two usage modes:
 *   1. Declarative (props):   <NavItem href icon label badge submenu={...} />
 *   2. Compound  (children):  <NavItem><NavLink|NavTrigger>...</NavLink|NavTrigger>[<NavSubmenu>...]</NavItem>
 *
 * The component detects which mode based on whether any declarative props
 * are set. Both paths go through the same rendered DOM.
 * ────────────────────────────────────────────── */

export interface NavItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, "children"> {
  /* ── Declarative props ── */
  href?: string;
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  kbd?: ReactNode;
  /** When provided, item renders with a disclosure trigger and this submenu content. */
  submenu?: ReactNode;
  /** Per-item submenu mode override — defaults to Nav's `submenu` setting. */
  submenuMode?: NavSubmenuMode;
  /** Controlled open state for the submenu (advanced). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Floating placement (popover mode). */
  placement?: Parameters<typeof useSubmenu>[0]["placement"];
  active?: boolean;
  disabled?: boolean;

  /* ── Compound props ── */
  children?: ReactNode;

  ref?: Ref<HTMLLIElement>;
}

export function NavItem({
  href,
  label,
  icon,
  badge,
  kbd,
  submenu,
  submenuMode,
  open,
  onOpenChange,
  placement,
  active,
  disabled,
  className,
  children,
  ref,
  ...rest
}: NavItemProps) {
  const navCtx = useNavContext();
  const level = useNavLevel();

  // Compound mode activates when no declarative prop is used.
  const isDeclarative =
    href != null ||
    label != null ||
    icon != null ||
    badge != null ||
    kbd != null ||
    submenu != null;

  // Collapsed rail forces every submenu into popover mode — an inline
  // accordion would be meaningless on a 3.5rem-wide rail.
  const resolvedMode = navCtx.collapsed
    ? "popover"
    : (submenuMode ?? navCtx.submenuMode);
  const submenuState = useSubmenu({
    mode: resolvedMode,
    orientation: navCtx.orientation,
    open,
    onOpenChange,
    placement,
  });

  // When collapsed, the visible label is hidden. Derive an accessible name
  // + a native tooltip from the `label` prop so both assistive tech and
  // mouse users still know what the icon means.
  const collapsedA11yProps: {
    "aria-label"?: string;
    title?: string;
  } = {};
  if (navCtx.collapsed && typeof label === "string") {
    collapsedA11yProps["aria-label"] = label;
    collapsedA11yProps.title = label;
  }

  const itemContent = isDeclarative ? (
    submenu != null ? (
      <>
        <NavTrigger active={active} disabled={disabled} {...collapsedA11yProps}>
          {icon != null && <NavIcon>{icon}</NavIcon>}
          {label != null && <NavLabel>{label}</NavLabel>}
          {badge != null && <NavBadge>{badge}</NavBadge>}
          {kbd != null && <NavKbd>{kbd}</NavKbd>}
          <NavChevron />
        </NavTrigger>
        {submenu}
      </>
    ) : (
      <NavLink
        href={href}
        active={active}
        disabled={disabled}
        {...collapsedA11yProps}
      >
        {icon != null && <NavIcon>{icon}</NavIcon>}
        {label != null && <NavLabel>{label}</NavLabel>}
        {badge != null && <NavBadge>{badge}</NavBadge>}
        {kbd != null && <NavKbd>{kbd}</NavKbd>}
      </NavLink>
    )
  ) : (
    children
  );

  return (
    <NavSubmenuContext.Provider value={submenuState}>
      <li
        ref={ref}
        className={cn("vds-nav__item", className)}
        data-orientation={navCtx.orientation}
        data-level={level}
        {...rest}
      >
        {itemContent}
      </li>
    </NavSubmenuContext.Provider>
  );
}
