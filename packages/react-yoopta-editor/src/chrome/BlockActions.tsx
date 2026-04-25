import { useRef, useState } from "react";
import { Blocks, useYooptaEditor } from "@yoopta/editor";
import { FloatingBlockActions } from "@yoopta/ui/floating-block-actions";
import { DragHandle } from "@yoopta/ui/block-dnd";
import { ActionMenuList } from "@yoopta/ui/action-menu-list";
import { IconGripVertical, IconPlus } from "@virtari-packages/react-icons";

import { BlockOptions } from "./BlockOptions";

export function BlockActions() {
  const editor = useYooptaEditor();
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const [blockOptionsOpen, setBlockOptionsOpen] = useState(false);
  const [insertMenuOpen, setInsertMenuOpen] = useState(false);
  const [insertContext, setInsertContext] = useState<{ at: number } | null>(null);

  const onPlusClick = (blockId: string | null) => {
    if (!blockId) return;
    const block = Blocks.getBlock(editor, { id: blockId });
    if (!block) return;
    setInsertContext({ at: block.meta.order + 1 });
    setInsertMenuOpen(true);
  };

  const onDragClick = (blockId: string | null) => {
    if (!blockId) return;
    const block = Blocks.getBlock(editor, { id: blockId });
    if (!block) return;
    editor.setPath({ current: block.meta.order });
    setBlockOptionsOpen(true);
  };

  const onInsertMenuOpenChange = (open: boolean) => {
    setInsertMenuOpen(open);
    if (!open) setInsertContext(null);
  };

  return (
    <>
      <FloatingBlockActions frozen={blockOptionsOpen || insertMenuOpen}>
        {({ blockId }) => (
          <>
            <FloatingBlockActions.Button
              ref={plusButtonRef}
              onClick={() => onPlusClick(blockId)}
              title="Add block below"
            >
              <IconPlus size={14} />
            </FloatingBlockActions.Button>
            <DragHandle blockId={blockId} ref={dragHandleRef} asChild>
              <FloatingBlockActions.Button
                onClick={() => onDragClick(blockId)}
                title="Drag to reorder"
              >
                <IconGripVertical size={14} />
              </FloatingBlockActions.Button>
            </DragHandle>

            <BlockOptions
              open={blockOptionsOpen}
              onOpenChange={setBlockOptionsOpen}
              blockId={blockId}
              anchor={dragHandleRef.current}
            />
          </>
        )}
      </FloatingBlockActions>

      <ActionMenuList
        open={insertMenuOpen}
        onOpenChange={onInsertMenuOpenChange}
        anchor={plusButtonRef.current}
        view="default"
        placement="right-start"
      >
        {({ actions, onSelect: defaultOnSelect, empty }) => (
          <ActionMenuList.Content>
            {empty ? (
              <ActionMenuList.Empty>No blocks available</ActionMenuList.Empty>
            ) : (
              <ActionMenuList.Group>
                {actions.map((action) => (
                  <ActionMenuList.Item
                    key={action.type}
                    action={action}
                    onClick={() => {
                      if (insertContext) {
                        editor.insertBlock(action.type, {
                          at: insertContext.at,
                          focus: true,
                        });
                      } else {
                        defaultOnSelect(action.type);
                      }
                      onInsertMenuOpenChange(false);
                    }}
                  />
                ))}
              </ActionMenuList.Group>
            )}
          </ActionMenuList.Content>
        )}
      </ActionMenuList>
    </>
  );
}
