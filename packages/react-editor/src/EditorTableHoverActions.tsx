import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import {
  $getNearestNodeFromDOMNode,
} from "lexical";
import {
  $getTableCellNodeFromLexicalNode,
  $isTableCellNode,
} from "@lexical/table";
import { Button } from "@virtari-packages/react-button";
import {
  Icon,
  IconPlus,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import { useEditorConfig } from "./context";
import {
  insertTableColumn,
  insertTableRow,
} from "./editor-utils";

interface EditorTableHoverActionsProps {
  anchorElement: HTMLElement | null;
  className?: string;
}

interface HoveredTableCell {
  key: string;
  element: HTMLElement;
}

const HOVER_ACTIONS_CLASSNAME = "vds-editor-table-hover-actions";

export function EditorTableHoverActions({
  anchorElement,
  className,
}: EditorTableHoverActionsProps) {
  const [editor] = useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const hoveredCellElementRef = useRef<HTMLElement | null>(null);
  const [hoveredCell, setHoveredCell] = useState<HoveredTableCell | null>(null);

  function clearHoveredCell() {
    if (hoveredCellElementRef.current) {
      delete hoveredCellElementRef.current.dataset.vdsTableHovered;
    }

    hoveredCellElementRef.current = null;
    setHoveredCell(null);
  }

  function updateHoveredCell(cellElement: HTMLElement) {
    editor.getEditorState().read(() => {
      const lexicalNode = $getNearestNodeFromDOMNode(cellElement);
      const tableCellNode = $isTableCellNode(lexicalNode)
        ? lexicalNode
        : lexicalNode
          ? $getTableCellNodeFromLexicalNode(lexicalNode)
          : null;

      if (!tableCellNode) {
        clearHoveredCell();
        return;
      }

      if (
        hoveredCellElementRef.current &&
        hoveredCellElementRef.current !== cellElement
      ) {
        delete hoveredCellElementRef.current.dataset.vdsTableHovered;
      }

      hoveredCellElementRef.current = cellElement;
      hoveredCellElementRef.current.dataset.vdsTableHovered = "true";

      setHoveredCell((currentCell) => {
        if (
          currentCell &&
          currentCell.key === tableCellNode.getKey() &&
          currentCell.element === cellElement
        ) {
          return currentCell;
        }

        return {
          key: tableCellNode.getKey(),
          element: cellElement,
        };
      });
    });
  }

  useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }

    const activeAnchorElement = anchorElement;

    function handlePointerMove(event: PointerEvent) {
      const path = event.composedPath();
      const target = path.find(
        (node) => node instanceof HTMLElement,
      );

      if (!(target instanceof HTMLElement)) {
        clearHoveredCell();
        return;
      }

      if (target.closest(`.${HOVER_ACTIONS_CLASSNAME}`)) {
        return;
      }

      const cellElement = target.closest<HTMLElement>(".vds-editor-table-cell");

      if (!cellElement || !activeAnchorElement.contains(cellElement)) {
        clearHoveredCell();
        return;
      }

      updateHoveredCell(cellElement);
    }

    function handlePointerLeave(event: PointerEvent) {
      const relatedTarget = event.relatedTarget;

      if (
        relatedTarget instanceof HTMLElement &&
        relatedTarget.closest(`.${HOVER_ACTIONS_CLASSNAME}`)
      ) {
        return;
      }

      clearHoveredCell();
    }

    activeAnchorElement.addEventListener("pointermove", handlePointerMove);
    activeAnchorElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      clearHoveredCell();
      activeAnchorElement.removeEventListener("pointermove", handlePointerMove);
      activeAnchorElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [anchorElement, editor, readOnly]);

  useLayoutEffect(() => {
    if (!anchorElement || !hoveredCellElementRef.current) {
      return;
    }

    const scrollerElement = anchorElement.parentElement;

    function syncHoveredRect() {
      if (!hoveredCellElementRef.current?.isConnected) {
        clearHoveredCell();
        return;
      }

      updateHoveredCell(hoveredCellElementRef.current);
    }

    window.addEventListener("resize", syncHoveredRect);
    scrollerElement?.addEventListener("scroll", syncHoveredRect, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", syncHoveredRect);
      scrollerElement?.removeEventListener("scroll", syncHoveredRect);
    };
  }, [anchorElement, hoveredCell]);

  if (!anchorElement || !hoveredCell || readOnly) {
    return null;
  }

  return createPortal(
    <div className={cn(HOVER_ACTIONS_CLASSNAME, className)}>
      <Button
        type="button"
        variant="soft"
        color="primary"
        size="xs"
        className="vds-editor-table-hover-button"
        data-axis="column"
        aria-label="Insert column"
        title="Insert column to the right"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => insertTableColumn(editor, true, null, hoveredCell.key)}
      >
        <Icon icon={IconPlus} size="sm" />
      </Button>

      <Button
        type="button"
        variant="soft"
        color="primary"
        size="xs"
        className="vds-editor-table-hover-button"
        data-axis="row"
        aria-label="Insert row"
        title="Insert row below"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => insertTableRow(editor, true, null, hoveredCell.key)}
      >
        <Icon icon={IconPlus} size="sm" />
      </Button>
    </div>,
    hoveredCell.element,
  );
}
