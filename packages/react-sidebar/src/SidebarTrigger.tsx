import { cn } from "@virtari-packages/utils";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { useSidebarOptional } from "./Sidebar";

export interface SidebarTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom icon. When omitted a built-in chevron is used; the chevron rotates
   * based on `side` and the collapsed state so it always points toward the
   * direction the sidebar will collapse into.
   */
  children?: ReactNode;
  /**
   * Accessible label. Default: "Collapse sidebar" / "Expand sidebar" depending on state.
   * Override for localization.
   */
  expandLabel?: string;
  collapseLabel?: string;
  ref?: Ref<HTMLButtonElement>;
}

function ChevronIcon() {
  return (
    <svg
      className="vds-sidebar-trigger__chevron"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 4 6 8l4 4" />
    </svg>
  );
}

/**
 * Collapse/expand toggle. Reads the current state from the nearest
 * <Sidebar> via context — if rendered outside a Sidebar, the button is
 * inert (useful for placing a placeholder trigger in a shell that may or
 * may not have a sidebar mounted).
 */
export function SidebarTrigger({
  className,
  onClick,
  children,
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
  "aria-label": ariaLabelProp,
  type,
  disabled: disabledProp,
  ref,
  ...rest
}: SidebarTriggerProps) {
  const ctx = useSidebarOptional();
  const collapsed = ctx?.collapsed ?? false;
  const collapsible = ctx?.collapsible ?? false;
  const disabled = disabledProp || !ctx || !collapsible;

  const label = ariaLabelProp ?? (collapsed ? expandLabel : collapseLabel);

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn("vds-sidebar-trigger", className)}
      data-collapsed={collapsed ? "true" : undefined}
      aria-expanded={!collapsed}
      aria-controls={undefined /* users can wire via id if they want */}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        if (!disabled) ctx?.toggle();
        onClick?.(e);
      }}
      {...rest}
    >
      {children ?? <ChevronIcon />}
    </button>
  );
}
