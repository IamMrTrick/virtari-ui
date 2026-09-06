import { useMemo, useRef, useState } from "react";
import { useYooptaEditor } from "@yoopta/editor";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../popover";
import {
  IconCopy,
  IconLink,
  IconTrash,
  IconRepeat,
} from "../../icons";

import { ActionMenu } from "./ActionMenu";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blockId: string | null;
  anchor?: HTMLElement | null;
};

export function BlockOptions({ open, onOpenChange, blockId, anchor }: Props) {
  const editor = useYooptaEditor();
  const turnIntoRef = useRef<HTMLButtonElement>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const virtualRef = useMemo(
    () => ({
      current: {
        getBoundingClientRect: () =>
          anchor?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0),
      },
    }),
    [anchor],
  );

  const onDuplicate = () => {
    if (!blockId) return;
    editor.duplicateBlock({ blockId, focus: true });
    onOpenChange(false);
  };

  const onCopyLink = () => {
    if (!blockId) return;
    if (typeof window !== "undefined" && navigator?.clipboard) {
      const base = window.location.href.split("#")[0];
      navigator.clipboard.writeText(`${base}#${blockId}`).catch(() => {});
    }
    onOpenChange(false);
  };

  const onDelete = () => {
    if (!blockId) return;
    editor.deleteBlock({ blockId });
    onOpenChange(false);
  };

  const onTurnInto = () => {
    setActionMenuOpen(true);
  };

  return (
    <>
      <Popover open={open && !actionMenuOpen} onOpenChange={onOpenChange}>
        <PopoverAnchor virtualRef={virtualRef as never} />
        <PopoverContent
          side="right"
          align="end"
          sideOffset={8}
          className="vds-yoo-block-options"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="vds-yoo-block-options-group">
            <button
              ref={turnIntoRef}
              type="button"
              onClick={onTurnInto}
              className="vds-yoo-block-options-item"
            >
              <IconRepeat size={16} />
              <span>Turn into</span>
            </button>
          </div>
          <div className="vds-yoo-block-options-separator" />
          <div className="vds-yoo-block-options-group">
            <button
              type="button"
              onClick={onDuplicate}
              className="vds-yoo-block-options-item"
            >
              <IconCopy size={16} />
              <span>Duplicate</span>
            </button>
            <button
              type="button"
              onClick={onCopyLink}
              className="vds-yoo-block-options-item"
            >
              <IconLink size={16} />
              <span>Copy link to block</span>
            </button>
            <button
              type="button"
              onClick={onDelete}
              data-variant="danger"
              className="vds-yoo-block-options-item"
            >
              <IconTrash size={16} />
              <span>Delete</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <ActionMenu
        open={actionMenuOpen}
        onOpenChange={(o) => {
          setActionMenuOpen(o);
          if (!o) onOpenChange(false);
        }}
        anchor={turnIntoRef.current}
        placement="right-start"
        mode={{ kind: "turnInto" }}
      />
    </>
  );
}
