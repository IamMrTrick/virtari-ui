import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@virtari/react-dropdown-menu";
import { cn } from "@virtari/utils";

export interface ActionItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  /** Insert a separator BEFORE this item. */
  separatorBefore?: boolean;
}

export interface ActionsCellProps {
  items: ActionItem[];
  /** Override the trigger glyph/button content. */
  trigger?: ReactNode;
  className?: string;
}

/** Three-dot menu with row actions — wraps @virtari/react-dropdown-menu. */
export function ActionsCell({ items, trigger, className }: ActionsCellProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Row actions"
          className={cn("vds-data-table-actions-cell-trigger", className)}
        >
          {trigger ?? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="currentColor">
              <circle cx="3" cy="7" r="1.25" />
              <circle cx="7" cy="7" r="1.25" />
              <circle cx="11" cy="7" r="1.25" />
            </svg>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, i) => (
          <div key={item.id}>
            {item.separatorBefore && i > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              disabled={item.disabled}
              onSelect={() => item.onSelect?.()}
              data-tone={item.tone}
            >
              {item.icon && (
                <span className="vds-data-table-actions-cell-item-icon">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
