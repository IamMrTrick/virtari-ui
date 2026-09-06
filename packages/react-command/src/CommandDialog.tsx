import { useRef, type ReactNode } from "react";
import { cn, useHotkey } from "@virtari-packages/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...contentProps
}: CommandDialogProps) {
  // CommandDialog is controlled and has no DialogTrigger for the primitive to
  // restore. Preserve the actual opener, including an input using the hotkey.
  const openerRef = useRef<HTMLElement | null>(null);
  useHotkey(
    typeof hotkey === "string" || Array.isArray(hotkey) ? hotkey : "",
    () => onOpenChange(!open),
    { enabled: hotkey !== false && hotkey !== undefined, allowInInputs: true },
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          size={size}
          className={cn("vds-command-dialog", className)}
          {...contentProps}
          onOpenAutoFocus={(event) => {
            const ownerDocument = (event.target as HTMLElement | null)?.ownerDocument ?? document;
            openerRef.current = ownerDocument.activeElement as HTMLElement | null;
            onOpenAutoFocus?.(event);
          }}
          onCloseAutoFocus={(event) => {
            onCloseAutoFocus?.(event);
            const opener = openerRef.current;
            openerRef.current = null;
            if (!event.defaultPrevented && opener?.isConnected) {
              event.preventDefault();
              opener.focus({ preventScroll: true });
            }
          }}
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
    </Dialog>
  );
}
