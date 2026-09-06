import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn, controlText } from "@virtari-packages/utils";
import { KbdShortcut } from "@virtari-packages/react-kbd";

/* ────────────────────────────────────────────────────────────
 * Root
 * ──────────────────────────────────────────────────────────── */

export interface CommandRootProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive> {}

export const CommandRoot = forwardRef<HTMLDivElement, CommandRootProps>(
  function CommandRoot({ className, ...props }, ref) {
    return (
      <CommandPrimitive
        ref={ref}
        className={cn("vds-command", className)}
        {...props}
      />
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Input
 * ──────────────────────────────────────────────────────────── */

export interface CommandInputProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput({ className, ...props }, ref) {
    return (
      <div className="vds-command-input-wrapper">
        <CommandPrimitive.Input
          ref={ref}
          className={cn("vds-command-input", className)}
          {...props}
        />
      </div>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * List, Group, Item, Empty, Loading, Separator
 * ──────────────────────────────────────────────────────────── */

export interface CommandListProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList({ className, ...props }, ref) {
    return (
      <CommandPrimitive.List
        ref={ref}
        className={cn("vds-command-list", className)}
        {...props}
      />
    );
  },
);

export interface CommandGroupProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  function CommandGroup({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Group
        ref={ref}
        className={cn("vds-command-group", className)}
        {...props}
      />
    );
  },
);

export interface CommandItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "children"
  > {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  /** Keyboard shortcut for this action (e.g. "mod+k"). Rendered visually via <Kbd>. */
  shortcut?: string;
  children?: ReactNode;
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandItem(
    {
      className,
      leftSection,
      rightSection,
      shortcut,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <CommandPrimitive.Item
        ref={ref}
        className={cn("vds-command-item", className)}
        {...props}
      >
        {leftSection ? (
          <span className="vds-command-item-left" aria-hidden="true">
            {leftSection}
          </span>
        ) : null}
        <span className="vds-command-item-label">{controlText(children)}</span>
        {rightSection ? (
          <span className="vds-command-item-right">{rightSection}</span>
        ) : null}
        {shortcut ? (
          <span className="vds-command-item-shortcut" aria-hidden="true">
            <KbdShortcut combo={shortcut} />
          </span>
        ) : null}
      </CommandPrimitive.Item>
    );
  },
);

export interface CommandEmptyProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  function CommandEmpty({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Empty
        ref={ref}
        className={cn("vds-command-empty", className)}
        {...props}
      />
    );
  },
);

export interface CommandLoadingProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Loading> {}

export const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(
  function CommandLoading({ className, ...props }, ref) {
    return (
      <CommandPrimitive.Loading
        ref={ref}
        className={cn("vds-command-loading", className)}
        {...props}
      />
    );
  },
);

export interface CommandSeparatorProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandSeparator = forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("vds-command-separator", className)}
      {...props}
    />
  );
});
