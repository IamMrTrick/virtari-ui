import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useYooptaEditor } from "@yoopta/editor";
import { TableCommands } from "@yoopta/table";
import { IconGripHorizontal, IconGripVertical, IconPlus } from "@virtari-packages/react-icons";

type Hover = {
  blockId: string;
  tableRect: DOMRect;
  /** rect for each column header (top of col 0..n) */
  colRects: DOMRect[];
  /** rect for each row (left of row 0..n) */
  rowRects: DOMRect[];
  rowCount: number;
  colCount: number;
};

type Selection =
  | { kind: "col"; idx: number; blockId: string }
  | { kind: "row"; idx: number; blockId: string }
  | null;

type DragState = {
  kind: "col" | "row";
  fromIdx: number;
  blockId: string;
  /** insertion index, where 0..n; null = no valid drop target */
  toIdx: number | null;
  dropLine: {
    top: number;
    left: number;
    width: number;
    height: number;
    axis: "vertical" | "horizontal";
  } | null;
} | null;

const HIDE_DELAY = 220;
const HANDLE_SIZE = 16;
const HANDLE_OFFSET = 6;

export function TableHoverActions() {
  const editor = useYooptaEditor();
  const [hover, setHover] = useState<Hover | null>(null);
  const [selection, setSelection] = useState<Selection>(null);
  const [drag, setDrag] = useState<DragState>(null);

  const hoverRef = useRef<Hover | null>(null);
  hoverRef.current = hover;
  const selectionRef = useRef<Selection>(null);
  selectionRef.current = selection;
  const dragRef = useRef<DragState>(null);
  dragRef.current = drag;
  const hideTimerRef = useRef<number | null>(null);

  const cancelHide = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimerRef.current = window.setTimeout(() => {
      // Don't hide if a selection or drag is active
      if (selectionRef.current || dragRef.current) return;
      setHover(null);
      hideTimerRef.current = null;
    }, HIDE_DELAY);
  }, [cancelHide]);

  const computeHover = useCallback(
    (clientX: number, clientY: number): Hover | null => {
      const root = editor.refElement;
      if (!root) return null;
      const blocks = root.querySelectorAll<HTMLElement>("[data-yoopta-block-id]");
      for (const blockEl of blocks) {
        const table = blockEl.querySelector<HTMLTableElement>("table");
        if (!table) continue;
        const rect = table.getBoundingClientRect();
        if (
          clientY < rect.top - 40 ||
          clientY > rect.bottom + 40 ||
          clientX < rect.left - 40 ||
          clientX > rect.right + 40
        )
          continue;
        const id = blockEl.getAttribute("data-yoopta-block-id");
        if (!id) continue;

        const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tr"));
        const rowCount = rows.length;
        const colCount = rows[0]?.children.length ?? 0;
        const rowRects = rows.map((r) => r.getBoundingClientRect());
        const colRects = rows[0]
          ? Array.from(rows[0].children).map((c) =>
              (c as HTMLElement).getBoundingClientRect(),
            )
          : [];

        return {
          blockId: id,
          tableRect: rect,
          rowRects,
          colRects,
          rowCount,
          colCount,
        };
      }
      return null;
    },
    [editor],
  );

  // Live recompute from DOM
  const repositionFromDOM = useCallback(() => {
    const cur = hoverRef.current;
    if (!cur) return;
    const liveBlock = editor.refElement?.querySelector<HTMLElement>(
      `[data-yoopta-block-id="${cur.blockId}"]`,
    );
    const liveTable = liveBlock?.querySelector<HTMLTableElement>("table");
    if (!liveTable) return;
    const rect = liveTable.getBoundingClientRect();
    const rows = Array.from(
      liveTable.querySelectorAll<HTMLTableRowElement>("tr"),
    );
    const rowCount = rows.length;
    const colCount = rows[0]?.children.length ?? 0;
    const rowRects = rows.map((r) => r.getBoundingClientRect());
    const colRects = rows[0]
      ? Array.from(rows[0].children).map((c) =>
          (c as HTMLElement).getBoundingClientRect(),
        )
      : [];
    setHover({
      ...cur,
      tableRect: rect,
      rowRects,
      colRects,
      rowCount,
      colCount,
    });
  }, [editor]);

  // Mouse tracking
  useEffect(() => {
    const root = editor.refElement;
    if (!root) return;
    const onMouseMove = (e: MouseEvent) => {
      const next = computeHover(e.clientX, e.clientY);
      if (next) {
        cancelHide();
        setHover(next);
      } else if (hoverRef.current && !selectionRef.current && !dragRef.current) {
        scheduleHide();
      }
    };
    root.addEventListener("mousemove", onMouseMove);
    return () => {
      root.removeEventListener("mousemove", onMouseMove);
    };
  }, [editor, computeHover, cancelHide, scheduleHide]);

  // Real-time reposition observers
  useEffect(() => {
    if (!hover) return;
    const blockEl = editor.refElement?.querySelector<HTMLElement>(
      `[data-yoopta-block-id="${hover.blockId}"]`,
    );
    const table = blockEl?.querySelector<HTMLTableElement>("table");
    if (!table) return;
    let rafId = 0;
    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(repositionFromDOM);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(table);
    const mo = new MutationObserver(schedule);
    mo.observe(table, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [hover?.blockId, editor, repositionFromDOM]);

  // Apply visual selection to cells via data-selected
  useEffect(() => {
    const root = editor.refElement;
    if (!root) return;
    // Clear existing
    root.querySelectorAll("[data-selected]").forEach((el) => {
      if (el.matches("td, th")) el.removeAttribute("data-selected");
    });
    if (!selection) return;
    const blockEl = root.querySelector<HTMLElement>(
      `[data-yoopta-block-id="${selection.blockId}"]`,
    );
    const table = blockEl?.querySelector<HTMLTableElement>("table");
    if (!table) return;
    const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tr"));
    if (selection.kind === "col") {
      rows.forEach((row) => {
        const cell = row.children[selection.idx] as HTMLElement | undefined;
        cell?.setAttribute("data-selected", "");
      });
    } else {
      const row = rows[selection.idx];
      if (row) {
        Array.from(row.children).forEach((c) =>
          (c as HTMLElement).setAttribute("data-selected", ""),
        );
      }
    }
  }, [selection, editor, hover]);

  // Keyboard: Esc clears selection, Backspace/Delete deletes the selected col/row
  useEffect(() => {
    if (!selection) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSelection(null);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const cur = hoverRef.current;
        if (selection.kind === "col" && cur && cur.colCount > 1) {
          // @yoopta/table types declare `Location` without importing it from slate,
          // so it resolves to the DOM Location — work around by casting the path.
          TableCommands.deleteTableColumn(editor, selection.blockId, {
            path: [0, 0, selection.idx] as never,
          });
        } else if (selection.kind === "row" && cur && cur.rowCount > 1) {
          TableCommands.deleteTableRow(editor, selection.blockId, {
            path: [0, selection.idx, 0] as never,
          });
        }
        setSelection(null);
        forceReposition();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
    // forceReposition referenced below — captured by closure
  }, [selection, editor]);

  // Click outside the table or selected handle clears selection
  useEffect(() => {
    if (!selection) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest(".vds-yoo-table-col-handle") ||
        target.closest(".vds-yoo-table-row-handle") ||
        target.closest(".vds-yoo-table-add-col") ||
        target.closest(".vds-yoo-table-add-row")
      )
        return;
      // If clicking inside the selected block's table, keep selection
      const block = editor.refElement?.querySelector(
        `[data-yoopta-block-id="${selection.blockId}"]`,
      );
      if (block?.contains(target)) {
        // clicking inside the table cells clears selection
        setSelection(null);
      } else {
        setSelection(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [selection, editor]);

  const forceReposition = useCallback(() => {
    [0, 16, 50, 120, 250].forEach((d) =>
      window.setTimeout(repositionFromDOM, d),
    );
  }, [repositionFromDOM]);

  // ── DnD: column/row reorder. Listen on `document` (not editor.refElement)
  // so events fire even when Slate's contenteditable swallows them, and read
  // drag state from the ref so it's never out of sync with React commits.
  useEffect(() => {
    const onDragOver = (e: DragEvent) => {
      const cur = dragRef.current;
      const hov = hoverRef.current;
      if (!cur || !hov) return;
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

      let toIdx: number;
      let dropLine: NonNullable<DragState>["dropLine"];
      if (cur.kind === "col") {
        const x = e.clientX;
        let nearest = 0;
        let bestDist = Infinity;
        for (let i = 0; i < hov.colRects.length; i++) {
          const left = hov.colRects[i]!.left;
          const d = Math.abs(x - left);
          if (d < bestDist) {
            bestDist = d;
            nearest = i;
          }
        }
        const lastRight = hov.colRects[hov.colRects.length - 1]!.right;
        if (Math.abs(x - lastRight) < bestDist) {
          nearest = hov.colRects.length;
        }
        toIdx = nearest;
        const lineX =
          toIdx === hov.colRects.length
            ? lastRight
            : hov.colRects[toIdx]!.left;
        dropLine = {
          axis: "vertical",
          top: hov.tableRect.top - 4,
          left: lineX - 1,
          width: 2,
          height: hov.tableRect.height + 8,
        };
      } else {
        const y = e.clientY;
        let nearest = 0;
        let bestDist = Infinity;
        for (let i = 0; i < hov.rowRects.length; i++) {
          const top = hov.rowRects[i]!.top;
          const d = Math.abs(y - top);
          if (d < bestDist) {
            bestDist = d;
            nearest = i;
          }
        }
        const lastBottom = hov.rowRects[hov.rowRects.length - 1]!.bottom;
        if (Math.abs(y - lastBottom) < bestDist) {
          nearest = hov.rowRects.length;
        }
        toIdx = nearest;
        const lineY =
          toIdx === hov.rowRects.length
            ? lastBottom
            : hov.rowRects[toIdx]!.top;
        dropLine = {
          axis: "horizontal",
          top: lineY - 1,
          left: hov.tableRect.left - 4,
          width: hov.tableRect.width + 8,
          height: 2,
        };
      }
      const next: NonNullable<DragState> = { ...cur, toIdx, dropLine };
      dragRef.current = next;
      setDrag(next);
    };

    const onDrop = (e: DragEvent) => {
      const cur = dragRef.current;
      if (!cur) return;
      e.preventDefault();
      e.stopPropagation();
      const { kind, fromIdx, toIdx, blockId } = cur;
      dragRef.current = null;
      setDrag(null);
      if (toIdx === null || toIdx === fromIdx || toIdx === fromIdx + 1) return;
      if (kind === "col") {
        const adjusted = toIdx > fromIdx ? toIdx - 1 : toIdx;
        TableCommands.moveTableColumn(editor, blockId, {
          from: [0, 0, fromIdx],
          to: [0, 0, adjusted],
        });
      } else {
        const adjusted = toIdx > fromIdx ? toIdx - 1 : toIdx;
        TableCommands.moveTableRow(editor, blockId, {
          from: [0, fromIdx],
          to: [0, adjusted],
        });
      }
      setSelection(null);
      forceReposition();
    };

    const onDragEnd = () => {
      dragRef.current = null;
      setDrag(null);
    };

    document.addEventListener("dragover", onDragOver, true);
    document.addEventListener("drop", onDrop, true);
    document.addEventListener("dragend", onDragEnd, true);
    return () => {
      document.removeEventListener("dragover", onDragOver, true);
      document.removeEventListener("drop", onDrop, true);
      document.removeEventListener("dragend", onDragEnd, true);
    };
  }, [editor, forceReposition]);

  if (typeof document === "undefined" || !hover) return null;

  const stopAndPrevent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onAddColumn = (e: React.MouseEvent) => {
    stopAndPrevent(e);
    TableCommands.insertTableColumn(editor, hover.blockId, { insertMode: "after" });
    forceReposition();
  };
  const onAddRow = (e: React.MouseEvent) => {
    stopAndPrevent(e);
    TableCommands.insertTableRow(editor, hover.blockId, { insertMode: "after" });
    forceReposition();
  };

  const isColSelected = (i: number) =>
    selection?.kind === "col" &&
    selection.idx === i &&
    selection.blockId === hover.blockId;
  const isRowSelected = (i: number) =>
    selection?.kind === "row" &&
    selection.idx === i &&
    selection.blockId === hover.blockId;

  const onColHandleClick = (idx: number) => (e: React.MouseEvent) => {
    stopAndPrevent(e);
    setSelection((s) =>
      s?.kind === "col" && s.idx === idx
        ? null
        : { kind: "col", idx, blockId: hover.blockId },
    );
  };
  const onRowHandleClick = (idx: number) => (e: React.MouseEvent) => {
    stopAndPrevent(e);
    setSelection((s) =>
      s?.kind === "row" && s.idx === idx
        ? null
        : { kind: "row", idx, blockId: hover.blockId },
    );
  };

  const onColDragStart = (idx: number) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x-yoopta-col", String(idx));
    const next = {
      kind: "col" as const,
      fromIdx: idx,
      blockId: hover.blockId,
      toIdx: null,
      dropLine: null,
    };
    dragRef.current = next;
    setDrag(next);
  };
  const onRowDragStart = (idx: number) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x-yoopta-row", String(idx));
    const next = {
      kind: "row" as const,
      fromIdx: idx,
      blockId: hover.blockId,
      toIdx: null,
      dropLine: null,
    };
    dragRef.current = next;
    setDrag(next);
  };

  const stayAlive = {
    onMouseEnter: cancelHide,
    onMouseLeave: scheduleHide,
  };

  return createPortal(
    <>
      {/* Add-column button on right edge */}
      <button
        {...stayAlive}
        type="button"
        className="vds-yoo-table-add-col"
        style={{
          position: "fixed",
          top: hover.tableRect.top,
          left: hover.tableRect.right + 4,
          height: hover.tableRect.height,
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onAddColumn}
        title="Add column"
        aria-label="Add column"
      >
        <IconPlus size={14} />
      </button>

      {/* Add-row button on bottom edge */}
      <button
        {...stayAlive}
        type="button"
        className="vds-yoo-table-add-row"
        style={{
          position: "fixed",
          top: hover.tableRect.bottom + 4,
          left: hover.tableRect.left,
          width: hover.tableRect.width,
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onAddRow}
        title="Add row"
        aria-label="Add row"
      >
        <IconPlus size={14} />
      </button>

      {/* Per-column drag handles on top of each column */}
      {hover.colRects.map((cr, i) => (
        <button
          {...stayAlive}
          key={`col-${i}`}
          type="button"
          className="vds-yoo-table-col-handle"
          data-selected={isColSelected(i) ? "" : undefined}
          draggable
          onDragStart={onColDragStart(i)}
          onClick={onColHandleClick(i)}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            top: hover.tableRect.top - HANDLE_SIZE - HANDLE_OFFSET,
            left: cr.left + cr.width / 2 - HANDLE_SIZE,
            inlineSize: HANDLE_SIZE * 2,
          }}
          title="Drag to reorder column, click to select (Backspace to delete)"
          aria-label={`Column ${i + 1}`}
        >
          <IconGripHorizontal size={12} />
        </button>
      ))}

      {/* Per-row drag handles on left of each row */}
      {hover.rowRects.map((rr, i) => (
        <button
          {...stayAlive}
          key={`row-${i}`}
          type="button"
          className="vds-yoo-table-row-handle"
          data-selected={isRowSelected(i) ? "" : undefined}
          draggable
          onDragStart={onRowDragStart(i)}
          onClick={onRowHandleClick(i)}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            top: rr.top + rr.height / 2 - HANDLE_SIZE,
            left: hover.tableRect.left - HANDLE_SIZE - HANDLE_OFFSET,
            blockSize: HANDLE_SIZE * 2,
          }}
          title="Drag to reorder row, click to select (Backspace to delete)"
          aria-label={`Row ${i + 1}`}
        >
          <IconGripVertical size={12} />
        </button>
      ))}

      {/* Drop indicator while dragging */}
      {drag?.dropLine && (
        <div
          className="vds-yoo-table-drop-line"
          data-axis={drag.dropLine.axis}
          style={{
            top: drag.dropLine.top,
            left: drag.dropLine.left,
            width: drag.dropLine.width,
            height: drag.dropLine.height,
          }}
        />
      )}
    </>,
    document.body,
  );
}
