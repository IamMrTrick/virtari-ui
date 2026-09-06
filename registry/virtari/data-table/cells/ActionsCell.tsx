import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { cn } from "../../../lib/utils";
import { IconDots } from "../../icons";

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

/** Three-dot menu with row actions — wraps @virtari-packages/react-dropdown-menu. */
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
            <IconDots size={14} stroke={1.75} aria-hidden focusable={false} />
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
