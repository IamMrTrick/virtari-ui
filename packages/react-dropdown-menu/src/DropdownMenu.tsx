import { cn, useDirection } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DirectionProvider } from "@radix-ui/react-direction";

/* ── Root ──
 * Auto-threads the active text direction into Radix so submenu placement,
 * focus traversal, and arrow-key navigation flip under RTL. Consumers can
 * still override by passing `dir`. */
export interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}

export function DropdownMenu({ dir, ...props }: DropdownMenuProps) {
  const autoDir = useDirection();
  return (
    <DirectionProvider dir={dir ?? autoDir}>
      <DropdownMenuPrimitive.Root {...props} />
    </DirectionProvider>
  );
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/* ── DropdownMenuContent ── */
export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("vds-dropdown-menu-content", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/* ── DropdownMenuItem ── */
export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}

export function DropdownMenuItem({
  className,
  ref,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn("vds-dropdown-menu-item", className)}
      {...props}
    />
  );
}

/* ── DropdownMenuSeparator ── */
export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("vds-dropdown-menu-separator", className)}
      {...props}
    />
  );
}

/* ── DropdownMenuLabel ── */
export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}

export function DropdownMenuLabel({
  className,
  ref,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn("vds-dropdown-menu-label", className)}
      {...props}
    />
  );
}
