import { useEffect, useRef, useState } from "react";
import {
  DraggableBlockPlugin_EXPERIMENTAL,
} from "@lexical/react/LexicalDraggableBlockPlugin";
import {
  Icon,
  IconGripVertical,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import { useEditorContext } from "./context";
import { EditorInsertMenu } from "./EditorInsertMenu";
import type { EditorBlockToolsPlacement } from "./types";

const DRAGGABLE_BLOCK_MENU_CLASSNAME = "vds-editor-block-tools";
const DRAG_HIT_TEST_GUTTER = 112;
const DRAG_HIT_TEST_VERTICAL_BUFFER = 48;
const DRAG_SETTLE_DURATION = 210;

interface EditorDraggableBlocksProps {
  anchorElement: HTMLElement | null;
  className?: string;
  placement?: EditorBlockToolsPlacement;
}

function isOnMenu(element: HTMLElement) {
  return Boolean(element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`));
}

function isDragFromBlockMenu(target: HTMLElement, menuElement: HTMLElement) {
  return menuElement.contains(target) || target.contains(menuElement);
}

function getEditorContent(anchorElement: HTMLElement) {
  return anchorElement.querySelector<HTMLElement>(".vds-editor-content");
}

function captureBlockRects(anchorElement: HTMLElement) {
  const content = getEditorContent(anchorElement);
  const rects = new Map<HTMLElement, DOMRect>();

  if (!content) {
    return rects;
  }

  for (const child of Array.from(content.children)) {
    if (child instanceof HTMLElement) {
      rects.set(child, child.getBoundingClientRect());
    }
  }

  return rects;
}

function animateBlocksFromPreviousRects(
  anchorElement: HTMLElement,
  previousRects: Map<HTMLElement, DOMRect>,
) {
  const content = getEditorContent(anchorElement);

  if (!content || previousRects.size === 0) {
    return;
  }

  const movedBlocks: HTMLElement[] = [];

  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }

    const previousRect = previousRects.get(child);

    if (!previousRect) {
      continue;
    }

    const nextRect = child.getBoundingClientRect();
    const deltaX = previousRect.left - nextRect.left;
    const deltaY = previousRect.top - nextRect.top;

    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      continue;
    }

    child.dataset.vdsDragSettling = "true";
    child.style.transition = "none";
    child.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    movedBlocks.push(child);
  }

  if (movedBlocks.length === 0) {
    return;
  }

  window.requestAnimationFrame(() => {
    for (const block of movedBlocks) {
      block.style.transition = "";
      block.style.transform = "";
    }

    window.setTimeout(() => {
      for (const block of movedBlocks) {
        delete block.dataset.vdsDragSettling;
        block.style.transition = "";
        block.style.transform = "";
      }
    }, DRAG_SETTLE_DURATION);
  });
}

function getNearestTopLevelBlock(
  content: HTMLElement,
  x: number,
  y: number,
) {
  const contentRect = content.getBoundingClientRect();

  if (
    x < contentRect.left - DRAG_HIT_TEST_GUTTER ||
    x > contentRect.right + DRAG_HIT_TEST_GUTTER ||
    y < contentRect.top - DRAG_HIT_TEST_VERTICAL_BUFFER ||
    y > contentRect.bottom + DRAG_HIT_TEST_VERTICAL_BUFFER
  ) {
    return null;
  }

  let nearestBlock: HTMLElement | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }

    const rect = child.getBoundingClientRect();
    const distance = Math.abs(y - (rect.top + rect.height / 2));

    if (distance < nearestDistance) {
      nearestBlock = child;
      nearestDistance = distance;
    }
  }

  return nearestBlock;
}

function getTopLevelBlockFromPoint(
  anchorElement: HTMLElement,
  x: number,
  y: number,
) {
  const content = getEditorContent(anchorElement);

  if (!content) {
    return null;
  }

  const pointElement = anchorElement.ownerDocument.elementFromPoint(x, y);

  if (!(pointElement instanceof HTMLElement)) {
    return getNearestTopLevelBlock(content, x, y);
  }

  let current: HTMLElement | null = pointElement;

  while (current && current.parentElement !== content) {
    if (current === content || current === anchorElement) {
      return getNearestTopLevelBlock(content, x, y);
    }

    current = current.parentElement;
  }

  return current?.parentElement === content
    ? current
    : getNearestTopLevelBlock(content, x, y);
}

export function EditorDraggableBlocks({
  anchorElement,
  className,
  placement = "inside",
}: EditorDraggableBlocksProps) {
  const { readOnly } = useEditorContext();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const targetLineRef = useRef<HTMLDivElement | null>(null);
  const targetBlockElementRef = useRef<HTMLElement | null>(null);
  const draggedBlockElementRef = useRef<HTMLElement | null>(null);
  const dropBlockElementRef = useRef<HTMLElement | null>(null);
  const dragPreviewElementRef = useRef<HTMLElement | null>(null);
  const insertMenuOpenRef = useRef(false);
  const [targetBlockElement, setTargetBlockElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    targetBlockElementRef.current = targetBlockElement;
  }, [targetBlockElement]);

  function handleTargetElementChanged(nextTargetBlockElement: HTMLElement | null) {
    if (insertMenuOpenRef.current && !nextTargetBlockElement) {
      return;
    }

    setTargetBlockElement(nextTargetBlockElement);
  }

  useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }

    const activeAnchorElement = anchorElement;
    const ownerDocument = activeAnchorElement.ownerDocument;

    function clearDropState() {
      const dragged = draggedBlockElementRef.current;
      const drop = dropBlockElementRef.current;
      const dragPreview = dragPreviewElementRef.current;

      if (dragged) {
        delete dragged.dataset.vdsDragSource;
      }

      if (drop) {
        delete drop.dataset.vdsDropPosition;
      }

      dragPreview?.remove();
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-placeholder-size",
      );
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-indicator-offset",
      );
      delete activeAnchorElement.dataset.vdsDragActive;
      draggedBlockElementRef.current = null;
      dropBlockElementRef.current = null;
      dragPreviewElementRef.current = null;
    }

    function setDropTarget(blockElement: HTMLElement | null, clientY: number) {
      const previousDrop = dropBlockElementRef.current;

      if (previousDrop && previousDrop !== blockElement) {
        delete previousDrop.dataset.vdsDropPosition;
      }

      if (!blockElement || blockElement === draggedBlockElementRef.current) {
        dropBlockElementRef.current = null;
        return;
      }

      const rect = blockElement.getBoundingClientRect();
      blockElement.dataset.vdsDropPosition =
        clientY < rect.top + rect.height / 2 ? "before" : "after";
      dropBlockElementRef.current = blockElement;
    }

    function handleDragStart(event: DragEvent) {
      const target = event.target;

      if (
        !(target instanceof HTMLElement) ||
        !menuRef.current ||
        !isDragFromBlockMenu(target, menuRef.current)
      ) {
        return;
      }

      const draggedBlockElement = targetBlockElementRef.current;

      if (!draggedBlockElement) {
        return;
      }

      activeAnchorElement.dataset.vdsDragActive = "true";
      draggedBlockElement.dataset.vdsDragSource = "true";
      draggedBlockElementRef.current = draggedBlockElement;

      if (event.dataTransfer) {
        const rect = draggedBlockElement.getBoundingClientRect();
        const preview = draggedBlockElement.cloneNode(true) as HTMLElement;
        const placeholderSize = Math.max(28, Math.min(rect.height, 240));

        preview.classList.add("vds-editor-drag-preview");
        preview.setAttribute("aria-hidden", "true");
        preview.style.inlineSize = `${Math.min(rect.width, 560)}px`;
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-placeholder-size",
          `${placeholderSize}px`,
        );
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-indicator-offset",
          `${placeholderSize / 2 + 6}px`,
        );
        ownerDocument.body.append(preview);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(
          preview,
          Math.min(24, rect.width / 2),
          Math.min(24, rect.height / 2),
        );
        dragPreviewElementRef.current = preview;
      }
    }

    function handleDragOver(event: DragEvent) {
      if (!draggedBlockElementRef.current) {
        return;
      }

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }

      const blockElement = getTopLevelBlockFromPoint(
        activeAnchorElement,
        event.clientX,
        event.clientY,
      );

      setDropTarget(blockElement, event.clientY);
    }

    function handleDrop() {
      const previousRects = captureBlockRects(activeAnchorElement);

      window.setTimeout(() => {
        clearDropState();
        animateBlocksFromPreviousRects(activeAnchorElement, previousRects);
      });
    }

    ownerDocument.addEventListener("dragstart", handleDragStart, true);
    ownerDocument.addEventListener("dragover", handleDragOver, true);
    ownerDocument.addEventListener("drop", handleDrop, true);
    ownerDocument.addEventListener("dragend", clearDropState, true);

    return () => {
      clearDropState();
      ownerDocument.removeEventListener("dragstart", handleDragStart, true);
      ownerDocument.removeEventListener("dragover", handleDragOver, true);
      ownerDocument.removeEventListener("drop", handleDrop, true);
      ownerDocument.removeEventListener("dragend", clearDropState, true);
    };
  }, [anchorElement, readOnly]);

  if (!anchorElement || readOnly) {
    return null;
  }

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElement}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div
          ref={menuRef}
          className={cn(DRAGGABLE_BLOCK_MENU_CLASSNAME, className)}
          data-placement={placement}
          aria-hidden="true"
        >
          <EditorInsertMenu
            compact
            className="vds-editor-block-insert"
            label="Insert block"
            onOpenChange={(open) => {
              insertMenuOpenRef.current = open;
            }}
            targetBlockElement={targetBlockElement}
          />
          <span className="vds-editor-drag-handle">
            <Icon icon={IconGripVertical} size="sm" />
          </span>
        </div>
      }
      targetLineComponent={
        <div
          ref={targetLineRef}
          className="vds-editor-drag-target-line"
          aria-hidden="true"
        />
      }
      isOnMenu={isOnMenu}
      onElementChanged={handleTargetElementChanged}
    />
  );
}
