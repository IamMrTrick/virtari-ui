import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@virtari/utils";

/*
 * Toolbar action-button primitives.
 *
 * Thin <button>s with consistent styling hooks via `.vds-data-table-toolbar-button`.
 * Defaults to an inline SVG glyph + label. Consumers can pass an `icon` and
 * override everything. Wired to look and behave like ghost Button tokens
 * without taking a hard dependency on @virtari/react-button.
 */

export interface ToolbarActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: ReactNode;
  count?: number | string;
  /** Visually emphasize (primary tint) — e.g. active filter. */
  intent?: "neutral" | "primary";
}

function Glyph({ children }: { children: ReactNode }) {
  return <span className="vds-data-table-toolbar-button-icon">{children}</span>;
}

export const ToolbarActionButton = forwardRef<
  HTMLButtonElement,
  ToolbarActionButtonProps
>(function ToolbarActionButton(
  { icon, label, count, intent = "neutral", className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      data-intent={intent}
      className={cn("vds-data-table-toolbar-button", className)}
      {...props}
    >
      {icon && <Glyph>{icon}</Glyph>}
      {(label || children) && (
        <span className="vds-data-table-toolbar-button-label">
          {children ?? label}
        </span>
      )}
      {count !== undefined && count !== 0 && (
        <span className="vds-data-table-toolbar-button-count">{count}</span>
      )}
    </button>
  );
});

/* ─────────────── Icon SVGs ─────────────── */

const SearchIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.25" />
    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);
const FilterIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M2 3h10L8 8v3l-2 1V8L2 3Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
  </svg>
);
const RefreshIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M12 7a5 5 0 1 1-1.5-3.5L12 5V2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DownloadIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M7 2v7m0 0 3-3m-3 3L4 6M2.5 11h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const SettingsIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);
const RotateCcwIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M2 7a5 5 0 1 0 1.5-3.5L2 5V2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EyeOffIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M1.5 3 12.5 11M3 5.5C1.8 6.6 1.5 7 1.5 7s2.5 4 5.5 4c1 0 2-.3 2.8-.7M6 4.1a6 6 0 0 1 1-.1c3 0 5.5 4 5.5 4s-.4.7-1.3 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);
const TrashIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M3 4h8m-1 0v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4m2 0V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const XIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

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

export const DataTableExportButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableExportButton({ label = "Export", ...props }, ref) {
    return (
      <ToolbarActionButton ref={ref} icon={DownloadIcon} label={label} {...props} />
    );
  },
);

export const DataTableAddButton = forwardRef<HTMLButtonElement, BaseProps>(
  function DataTableAddButton({ label = "Add", intent = "primary", ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={PlusIcon}
        label={label}
        intent={intent}
        {...props}
      />
    );
  },
);

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
  function DataTableDeleteButton({ label = "Delete", ...props }, ref) {
    return (
      <ToolbarActionButton
        ref={ref}
        icon={TrashIcon}
        label={label}
        data-intent="danger"
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
        aria-label={props["aria-label"] ?? "Close"}
        label={label}
        {...props}
      />
    );
  },
);

export const DataTableSearchIcon = SearchIcon;
