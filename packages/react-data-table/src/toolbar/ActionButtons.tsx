import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@virtari-packages/utils";
import {
  IconChevronDown,
  IconDotsVertical,
  IconDownload,
  IconEyeOff,
  IconFilter,
  IconPlus,
  IconRefresh,
  IconRotateClockwise2,
  IconSearch,
  IconSettings,
  IconTrash,
  IconX,
} from "@virtari-packages/react-icons";

/*
 * Toolbar action-button primitives.
 *
 * Thin <button>s with consistent styling hooks via `.vds-data-table-toolbar-button`.
 * Defaults to an inline SVG glyph + label. Consumers can pass an `icon` and
 * override everything. Wired to look and behave like ghost Button tokens
 * without taking a hard dependency on @virtari-packages/react-button.
 */

export type ToolbarActionButtonVariant = "ghost" | "outline" | "solid";
export type ToolbarActionButtonSize = "sm" | "md";

export interface ToolbarActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Trailing glyph (e.g. chevron-down for split-style buttons). */
  trailingIcon?: ReactNode;
  label?: ReactNode;
  count?: number | string;
  /** Color intent. "primary" is the accent hue. "danger" is destructive. */
  intent?: "neutral" | "primary" | "danger";
  /** Visual variant. Default "ghost". */
  variant?: ToolbarActionButtonVariant;
  /** Size preset. Default "md". */
  size?: ToolbarActionButtonSize;
  /** Icon-only (skip the label slot even if provided). */
  iconOnly?: boolean;
}

function Glyph({ children }: { children: ReactNode }) {
  return <span className="vds-data-table-toolbar-button-icon">{children}</span>;
}

export const ToolbarActionButton = forwardRef<
  HTMLButtonElement,
  ToolbarActionButtonProps
>(function ToolbarActionButton(
  {
    icon,
    trailingIcon,
    label,
    count,
    intent = "neutral",
    variant = "ghost",
    size = "md",
    iconOnly = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const showLabel = !iconOnly && (label !== undefined || children !== undefined);
  return (
    <button
      ref={ref}
      type="button"
      data-intent={intent}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? "" : undefined}
      className={cn("vds-data-table-toolbar-button", className)}
      {...props}
    >
      {icon && <Glyph>{icon}</Glyph>}
      {showLabel && (
        <span className="vds-data-table-toolbar-button-label">
          {children ?? label}
        </span>
      )}
      {count !== undefined && count !== 0 && (
        <span className="vds-data-table-toolbar-button-count">{count}</span>
      )}
      {trailingIcon && <Glyph>{trailingIcon}</Glyph>}
    </button>
  );
});

/* ─────────────── Icon glyphs (Tabler) ─────────────── */

const TOOLBAR_ICON = { size: 14, stroke: 1.5, "aria-hidden": true as const, focusable: false as const };
const CHEVRON_ICON = { size: 12, stroke: 1.5, "aria-hidden": true as const, focusable: false as const };

const SearchIcon = <IconSearch {...TOOLBAR_ICON} />;
const FilterIcon = <IconFilter {...TOOLBAR_ICON} />;
const RefreshIcon = <IconRefresh {...TOOLBAR_ICON} />;
const DownloadIcon = <IconDownload {...TOOLBAR_ICON} />;
const PlusIcon = <IconPlus {...TOOLBAR_ICON} />;
const SettingsIcon = <IconSettings {...TOOLBAR_ICON} />;
const RotateCcwIcon = <IconRotateClockwise2 {...TOOLBAR_ICON} />;
const EyeOffIcon = <IconEyeOff {...TOOLBAR_ICON} />;
const TrashIcon = <IconTrash {...TOOLBAR_ICON} />;
const XIcon = <IconX {...TOOLBAR_ICON} />;
const MoreIcon = <IconDotsVertical {...TOOLBAR_ICON} />;
const ChevronDownIcon = <IconChevronDown {...CHEVRON_ICON} />;

/* ─────────────── Named convenience buttons ─────────────── */

type BaseProps = Omit<ToolbarActionButtonProps, "icon" | "label"> & {
  label?: ReactNode;
};

export const DataTableFilterButton = forwardRef<
  HTMLButtonElement,
  BaseProps & { count?: number }
>(function DataTableFilterButton(
  { label = "Filter", count, intent, ...props },
  ref,
) {
  return (
    <ToolbarActionButton
      ref={ref}
      icon={FilterIcon}
      label={label}
      count={count}
      intent={intent ?? (count && count > 0 ? "primary" : "neutral")}
      {...props}
    />
  );
});

export const DataTableRefreshButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableRefreshButton({ label = "Refresh", ...props }, ref) {
    return (
      <ToolbarActionButton ref={ref} icon={RefreshIcon} label={label} {...props} />
    );
  },
);

/** Export — default `variant="outline"` (matches the reference dashboard). */
export const DataTableExportButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableExportButton(
    { label = "Export", variant = "outline", ...props },
    ref,
  ) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={DownloadIcon}
        label={label}
        variant={variant}
        {...props}
      />
    );
  },
);

/** Add — default `variant="solid"` with `intent="primary"` + trailing chevron. */
export const DataTableAddButton = forwardRef<
  HTMLButtonElement,
  BaseProps & { withChevron?: boolean }
>(function DataTableAddButton(
  {
    label = "Add",
    intent = "primary",
    variant = "solid",
    withChevron = false,
    trailingIcon,
    ...props
  },
  ref,
) {
  return (
    <ToolbarActionButton
      ref={ref}
      icon={PlusIcon}
      label={label}
      intent={intent}
      variant={variant}
      trailingIcon={trailingIcon ?? (withChevron ? ChevronDownIcon : undefined)}
      {...props}
    />
  );
});

export const DataTableCustomizeButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableCustomizeButton({ label = "Customize", ...props }, ref) {
    return (
      <ToolbarActionButton ref={ref} icon={SettingsIcon} label={label} {...props} />
    );
  },
);

export const DataTableResetLayoutButton = forwardRef<
  HTMLButtonElement,
  BaseProps
>(function DataTableResetLayoutButton({ label = "Reset Layout", ...props }, ref) {
  return (
    <ToolbarActionButton ref={ref} icon={RotateCcwIcon} label={label} {...props} />
  );
});

export const DataTableHideColumnsButton = forwardRef<
  HTMLButtonElement,
  BaseProps
>(function DataTableHideColumnsButton({ label = "Hide", ...props }, ref) {
  return (
    <ToolbarActionButton ref={ref} icon={EyeOffIcon} label={label} {...props} />
  );
});

export const DataTableDeleteButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableDeleteButton({ label = "Delete", intent = "danger", ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={TrashIcon}
        label={label}
        intent={intent}
        {...props}
      />
    );
  },
);

export const DataTableCloseButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableCloseButton({ label, ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={XIcon}
        aria-label={(props as { "aria-label"?: string })["aria-label"] ?? "Close"}
        label={label}
        iconOnly={label === undefined}
        {...props}
      />
    );
  },
);

/** Icon-only search button (ghost). For a full search input, compose
 *  `<DataTable.GlobalFilter>` alongside. */
export const DataTableSearchButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableSearchButton({ label = "Search", ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={SearchIcon}
        label={label}
        {...props}
      />
    );
  },
);

/** Icon-only overflow-menu button (⋯). Consumer wraps in a DropdownMenu. */
export const DataTableMoreButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableMoreButton({ ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={MoreIcon}
        iconOnly
        aria-label={(props as { "aria-label"?: string })["aria-label"] ?? "More"}
        {...props}
      />
    );
  },
);

/** Inline row-action ghost button — for Edit / Delete inline pairs in
 *  an Actions column. Smaller height, tighter padding than toolbar buttons. */
export const DataTableRowAction = forwardRef<
  HTMLButtonElement,
  ToolbarActionButtonProps
>(function DataTableRowAction({ size = "sm", variant = "ghost", ...props }, ref) {
  return (
    <ToolbarActionButton ref={ref} size={size} variant={variant} {...props} />
  );
});

export const DataTableSearchIcon = SearchIcon;
export const DataTableChevronDownIcon = ChevronDownIcon;
export const DataTableMoreIcon = MoreIcon;
