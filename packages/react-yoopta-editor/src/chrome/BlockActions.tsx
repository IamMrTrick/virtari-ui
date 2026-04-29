import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useYooptaEditor, Blocks } from "@yoopta/editor";
import { IconGripVertical, IconPlus } from "@virtari-packages/react-icons";

import { ActionMenu } from "./ActionMenu";
import { BlockOptions } from "./BlockOptions";

type Hover = {
  blockId: string;
  rect: DOMRect;
};

const HIDE_DELAY = 220;

export function BlockActions() {
  const editor = useYooptaEditor();
  const [hover, setHover] = useState<Hover | null>(null);
  const [insertOpen, setInsertOpen] = useState(false);
  const [insertAt, setInsertAt] = useState<number | null>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [optionsBlockId, setOptionsBlockId] = useState<string | null>(null);

  const plusRef = useRef<HTMLButtonElement>(null);
  const gripRef = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<number | null>(null);
  const dragTargetRef = useRef<{ id: string; before: boolean } | null>(null);

  const frozen = insertOpen || optionsOpen;

  const findBlockUnder = useCallback((x: number, y: number) => {
    const root = editor.refElement;
    if (!root) return null;
    const blocks = root.querySelectorAll<HTMLElement>("[data-yoopta-block-id]");
    for (const el of blocks) {
      const r = el.getBoundingClientRect();
      if (y >= r.top && y <= r.bottom && x >= r.left - 80 && x <= r.right + 80) {
        const id = el.getAttribute("data-yoopta-block-id");
        if (id) return { id, rect: r };
      }
    }
    return null;
  }, [editor]);

  useEffect(() => {
    const root = editor.refElement;
    if (!root) return;

    const onMouseMove = (e: MouseEvent) => {
      if (frozen) return;
      const found = findBlockUnder(e.clientX, e.clientY);
      if (found) {
        if (hideTimer.current !== null) {
          window.clearTimeout(hideTimer.current);
          hideTimer.current = null;
        }
        setHover({ blockId: found.id, rect: found.rect });
      }
    };
    const onMouseLeave = () => {
      if (frozen) return;
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setHover(null), HIDE_DELAY);
    };

    root.addEventListener("mousemove", onMouseMove);
    root.addEventListener("mouseleave", onMouseLeave);
    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("mouseleave", onMouseLeave);
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    };
  }, [editor, findBlockUnder, frozen]);

  useEffect(() => {
    if (!hover) return;
    const update = () => {
      const el = editor.refElement?.querySelector<HTMLElement>(
        `[data-yoopta-block-id="${hover.blockId}"]`,
      );
      if (!el) return;
      setHover({ blockId: hover.blockId, rect: el.getBoundingClientRect() });
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [hover, editor]);

  const onPlusClick = () => {
    if (!hover) return;
    const block = Blocks.getBlock(editor, { id: hover.blockId });
    if (!block) return;
    setInsertAt(block.meta.order + 1);
    setInsertOpen(true);
  };

  const onGripClick = () => {
    if (!hover) return;
    const block = Blocks.getBlock(editor, { id: hover.blockId });
    if (!block) return;
    editor.setPath({ current: block.meta.order });
    setOptionsBlockId(hover.blockId);
    setOptionsOpen(true);
  };

  const onDragStart = (e: React.DragEvent) => {
    if (!hover) return;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x-yoopta-block-id", hover.blockId);
    const el = editor.refElement?.querySelector<HTMLElement>(
      `[data-yoopta-block-id="${hover.blockId}"]`,
    );
    if (el) e.dataTransfer.setDragImage(el, 0, 0);
  };

  useEffect(() => {
    const root = editor.refElement;
    if (!root) return;

    const onDragOver = (e: DragEvent) => {
      if (!e.dataTransfer?.types.includes("text/x-yoopta-block-id")) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const found = findBlockUnder(e.clientX, e.clientY);
      if (!found) {
        dragTargetRef.current = null;
        return;
      }
      const before = e.clientY < found.rect.top + found.rect.height / 2;
      dragTargetRef.current = { id: found.id, before };
    };

    const onDrop = (e: DragEvent) => {
      const sourceId = e.dataTransfer?.getData("text/x-yoopta-block-id");
      if (!sourceId) return;
      e.preventDefault();
      const target = dragTargetRef.current;
      dragTargetRef.current = null;
      if (!target || target.id === sourceId) return;
      const targetBlock = Blocks.getBlock(editor, { id: target.id });
      if (!targetBlock) return;
      const sourceBlock = Blocks.getBlock(editor, { id: sourceId });
      if (!sourceBlock) return;
      const targetOrder = target.before
        ? targetBlock.meta.order
        : targetBlock.meta.order + 1;
      const adjusted =
        sourceBlock.meta.order < targetOrder ? targetOrder - 1 : targetOrder;
      editor.moveBlock(sourceId, adjusted);
    };

    root.addEventListener("dragover", onDragOver);
    root.addEventListener("drop", onDrop);
    return () => {
      root.removeEventListener("dragover", onDragOver);
      root.removeEventListener("drop", onDrop);
    };
  }, [editor, findBlockUnder]);

  if (typeof document === "undefined") return null;

  return (
    <>
      {hover &&
        createPortal(
          <div
            className="vds-yoo-block-actions"
            style={{
              position: "fixed",
              top: hover.rect.top + 2,
              left: hover.rect.left - 64,
            }}
            data-frozen={frozen ? "" : undefined}
            onMouseEnter={() => {
              if (hideTimer.current !== null) {
                window.clearTimeout(hideTimer.current);
                hideTimer.current = null;
              }
            }}
          >
            <button
              ref={plusRef}
              type="button"
              className="vds-yoo-block-actions-button"
              onClick={onPlusClick}
              title="Add block below"
              aria-label="Add block below"
            >
              <IconPlus size={14} />
            </button>
            <button
              ref={gripRef}
              type="button"
              className="vds-yoo-block-actions-button"
              draggable
              onDragStart={onDragStart}
              onClick={onGripClick}
              title="Drag to reorder, click to open options"
              aria-label="Block options"
            >
              <IconGripVertical size={14} />
            </button>
          </div>,
          document.body,
        )}

      <ActionMenu
        open={insertOpen}
        onOpenChange={(o) => {
          setInsertOpen(o);
          if (!o) setInsertAt(null);
        }}
        anchor={plusRef.current}
        placement="right-start"
        mode={insertAt !== null ? { kind: "insert", at: insertAt } : undefined}
      />

      <BlockOptions
        open={optionsOpen}
        onOpenChange={(o) => {
          setOptionsOpen(o);
          if (!o) setOptionsBlockId(null);
        }}
        blockId={optionsBlockId}
        anchor={gripRef.current}
      />
    </>
  );
}
