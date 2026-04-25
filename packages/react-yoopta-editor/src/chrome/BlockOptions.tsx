import { useRef, useState } from "react";
import { BlockOptions as YooBlockOptions, useBlockActions } from "@yoopta/ui/block-options";
import { ActionMenu } from "./ActionMenu";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  blockId: string | null;
  anchor?: HTMLElement | null;
};

export function BlockOptions({ open, onOpenChange, blockId, anchor }: Props) {
  const { duplicateBlock, copyBlockLink, deleteBlock } = useBlockActions();
  const turnIntoRef = useRef<HTMLButtonElement>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const onActionMenuClose = (menuOpen: boolean) => {
    setActionMenuOpen(menuOpen);
    if (!menuOpen) onOpenChange?.(false);
  };

  return (
    <>
      <YooBlockOptions open={open} onOpenChange={onOpenChange} anchor={anchor}>
        <YooBlockOptions.Content side="right" align="end">
          <YooBlockOptions.Group>
            <YooBlockOptions.Item
              ref={turnIntoRef}
              onSelect={() => setActionMenuOpen(true)}
              keepOpen
            >
              Turn into
            </YooBlockOptions.Item>
          </YooBlockOptions.Group>
          <YooBlockOptions.Separator />
          <YooBlockOptions.Group>
            <YooBlockOptions.Item
              onSelect={() => {
                if (!blockId) return;
                duplicateBlock(blockId);
                onOpenChange?.(false);
              }}
            >
              Duplicate
            </YooBlockOptions.Item>
            <YooBlockOptions.Item
              onSelect={() => {
                if (!blockId) return;
                copyBlockLink(blockId);
                onOpenChange?.(false);
              }}
            >
              Copy link to block
            </YooBlockOptions.Item>
            <YooBlockOptions.Item
              variant="destructive"
              onSelect={() => {
                if (!blockId) return;
                deleteBlock(blockId);
                onOpenChange?.(false);
              }}
            >
              Delete
            </YooBlockOptions.Item>
          </YooBlockOptions.Group>
        </YooBlockOptions.Content>
      </YooBlockOptions>
      <ActionMenu
        placement="right-start"
        open={actionMenuOpen}
        onOpenChange={onActionMenuClose}
        anchor={turnIntoRef.current}
      />
    </>
  );
}
