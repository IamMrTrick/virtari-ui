import type { ReactNode } from "react";
import { cn, useHotkey } from "@virtari-packages/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@virtari-packages/react-dialog";
import type { DialogContentProps } from "@virtari-packages/react-dialog";

import { CommandRoot } from "./Command";

export interface CommandDialogProps
  extends Omit<DialogContentProps, "children" | "title"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional global toggle combo. Not bound by default — consumer must opt in. */
  hotkey?: string | string[] | false;
  title?: ReactNode;
  description?: ReactNode;
  /** Hide title/description visually but keep them for screen readers. */
  hideTitle?: boolean;
  /**
   * Dialog width preset. At the default `"md"` the palette uses its own
   * `--command-dialog-width` (40rem / 640px — the conventional palette width)
   * instead of the plain dialog `md` width. Pass any other size to opt back
   * into the standard Dialog ramp.
   */
  size?: DialogContentProps["size"];
  children?: ReactNode;
}

export function CommandDialog({
  open,
  onOpenChange,
  hotkey,
  title = "Command palette",
  description,
  hideTitle = true,
  size = "md",
  className,
  children,
  ...contentProps
}: CommandDialogProps) {
  useHotkey(
    typeof hotkey === "string" || Array.isArray(hotkey) ? hotkey : "",
    () => onOpenChange(!open),
    { enabled: hotkey !== false && hotkey !== undefined, allowInInputs: true },
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          size={size}
          className={cn("vds-command-dialog", className)}
          {...contentProps}
        >
          <DialogTitle className={hideTitle ? "vds-sr-only" : undefined}>
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription
              className={hideTitle ? "vds-sr-only" : undefined}
            >
              {description}
            </DialogDescription>
          ) : null}
          <CommandRoot label={typeof title === "string" ? title : undefined}>
            {children}
          </CommandRoot>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
