import { cn } from "@virtari/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";

/* ── SidebarHeader — branding / logo area ── */

export interface SidebarHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"header"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

export function SidebarHeader({
  as: Tag = "header",
  className,
  ref,
  ...rest
}: SidebarHeaderProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-sidebar__header", className)}
      {...rest}
    />
  );
}

/* ── SidebarBody — main scrollable nav area ── */

export interface SidebarBodyProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag. `"div"` by default; pass `"nav"` + `aria-label` when body IS the nav. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

export function SidebarBody({
  as: Tag = "div",
  className,
  ref,
  ...rest
}: SidebarBodyProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-sidebar__body", className)}
      {...rest}
    />
  );
}

/* ── SidebarFooter — bottom-pinned area (user profile, settings) ── */

export interface SidebarFooterProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"footer"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

export function SidebarFooter({
  as: Tag = "footer",
  className,
  ref,
  ...rest
}: SidebarFooterProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-sidebar__footer", className)}
      {...rest}
    />
  );
}

/* ── SidebarSeparator — visual divider ── */

export interface SidebarSeparatorProps extends HTMLAttributes<HTMLElement> {
  /** Override default tag `"hr"`. */
  as?: ElementType;
  ref?: Ref<HTMLElement>;
}

export function SidebarSeparator({
  as: Tag = "hr",
  className,
  ref,
  ...rest
}: SidebarSeparatorProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-sidebar__separator", className)}
      role="separator"
      aria-orientation="horizontal"
      {...rest}
    />
  );
}
