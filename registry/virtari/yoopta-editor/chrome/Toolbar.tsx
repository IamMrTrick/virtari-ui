import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Editor as SlateEditor, Range } from "slate";
import { Blocks, Marks, useYooptaEditor } from "@yoopta/editor";
import { MathInlineCommands } from "@yoopta/math";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "../../popover";
import {
  IconBold,
  IconChevronDown,
  IconCode,
  IconHighlight,
  IconItalic,
  IconMath,
  IconStrikethrough,
  IconUnderline,
  IconX,
} from "../../icons";

import { ActionMenu } from "./ActionMenu";

const HIGHLIGHT_PRESETS = [
  "var(--vds-color-warning-solid)",
  "var(--vds-color-info-solid)",
  "var(--vds-color-success-solid)",
  "var(--vds-color-danger-solid)",
  "var(--vds-color-accent-solid)",
  "var(--vds-color-primary-solid)",
  "var(--vds-color-neutral-solid)",
  "var(--vds-color-bg-inverse)",
];

export function Toolbar() {
  const editor = useYooptaEditor();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);
  const turnIntoRef = useRef<HTMLButtonElement>(null);
  const highlightBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      if (actionMenuOpen || highlightOpen) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setRect(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const root = editor.refElement;
      if (!root || !root.contains(range.commonAncestorContainer)) {
        setRect(null);
        return;
      }
      const r = range.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) {
        setRect(null);
        return;
      }
      setRect(r);
    };
    document.addEventListener("selectionchange", update);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("selectionchange", update);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [editor, actionMenuOpen, highlightOpen]);

  const highlightValue = (Marks.getValue(editor, { type: "highlight" }) as
    | { color?: string; backgroundColor?: string }
    | null) ?? null;
  const highlightActive = Marks.isActive(editor, { type: "highlight" });

  const onInsertMath = () => {
    if (editor.path.current === null) return;
    const currentBlockId = Object.keys(editor.children).find(
      (id) => editor.children[id]?.meta.order === editor.path.current,
    );
    if (!currentBlockId) return;
    const slate = Blocks.getBlockSlate(editor, { id: currentBlockId });
    if (!slate || !slate.selection) return;
    const selectedText = !Range.isCollapsed(slate.selection)
      ? SlateEditor.string(slate, slate.selection)
      : "";
    MathInlineCommands.insertMathInline(editor, selectedText || "E = mc^2", {
      slate,
    });
  };

  const setHighlight = (color: string) => {
    Marks.add(editor, {
      type: "highlight",
      value: { backgroundColor: color },
    });
    setHighlightOpen(false);
  };

  const clearHighlight = () => {
    if (highlightActive) Marks.remove(editor, { type: "highlight" });
    setHighlightOpen(false);
  };

  const visible = rect !== null || actionMenuOpen || highlightOpen;
  const anchorRect = rect ?? new DOMRect(0, 0, 0, 0);

  const virtualRef = useMemo(
    () => ({
      current: { getBoundingClientRect: () => anchorRect },
    }),
    [anchorRect],
  );

  if (typeof document === "undefined") return null;

  return (
    <>
      {visible &&
        rect &&
        createPortal(
          <div
            className="vds-yoo-toolbar"
            style={{
              position: "fixed",
              top: Math.max(8, rect.top - 44),
              left: rect.left + rect.width / 2,
              transform: "translateX(-50%)",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <button
              ref={turnIntoRef}
              type="button"
              className="vds-yoo-toolbar-button"
              onClick={() => setActionMenuOpen(true)}
            >
              Turn into
              <IconChevronDown size={14} />
            </button>
            <span className="vds-yoo-toolbar-separator" />
            {editor.formats.bold && (
              <ToolbarFormatButton
                title="Bold"
                onClick={() => Marks.toggle(editor, { type: "bold" })}
                active={Marks.isActive(editor, { type: "bold" })}
              >
                <IconBold size={16} />
              </ToolbarFormatButton>
            )}
            {editor.formats.italic && (
              <ToolbarFormatButton
                title="Italic"
                onClick={() => Marks.toggle(editor, { type: "italic" })}
                active={Marks.isActive(editor, { type: "italic" })}
              >
                <IconItalic size={16} />
              </ToolbarFormatButton>
            )}
            {editor.formats.underline && (
              <ToolbarFormatButton
                title="Underline"
                onClick={() => Marks.toggle(editor, { type: "underline" })}
                active={Marks.isActive(editor, { type: "underline" })}
              >
                <IconUnderline size={16} />
              </ToolbarFormatButton>
            )}
            {editor.formats.strike && (
              <ToolbarFormatButton
                title="Strikethrough"
                onClick={() => Marks.toggle(editor, { type: "strike" })}
                active={Marks.isActive(editor, { type: "strike" })}
              >
                <IconStrikethrough size={16} />
              </ToolbarFormatButton>
            )}
            {editor.formats.code && (
              <ToolbarFormatButton
                title="Code"
                onClick={() => Marks.toggle(editor, { type: "code" })}
                active={Marks.isActive(editor, { type: "code" })}
              >
                <IconCode size={16} />
              </ToolbarFormatButton>
            )}
            {editor.formats.highlight && (
              <button
                ref={highlightBtnRef}
                type="button"
                className="vds-yoo-toolbar-button"
                data-active={highlightActive ? "" : undefined}
                title="Highlight"
                onClick={() => setHighlightOpen((v) => !v)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (highlightActive) Marks.remove(editor, { type: "highlight" });
                }}
                style={{
                  backgroundColor: highlightActive
                    ? highlightValue?.backgroundColor
                    : undefined,
                  color: highlightActive ? highlightValue?.color : undefined,
                }}
              >
                <IconHighlight size={16} />
              </button>
            )}
            {editor.plugins.MathInline && (
              <>
                <span className="vds-yoo-toolbar-separator" />
                <ToolbarFormatButton title="Insert Math" onClick={onInsertMath}>
                  <IconMath size={16} />
                </ToolbarFormatButton>
              </>
            )}
          </div>,
          document.body,
        )}

      <ActionMenu
        open={actionMenuOpen}
        onOpenChange={setActionMenuOpen}
        anchor={turnIntoRef.current}
        placement="bottom-start"
        mode={{ kind: "turnInto" }}
      />

      <Popover open={highlightOpen} onOpenChange={setHighlightOpen}>
        <PopoverAnchor virtualRef={virtualRef as never} />
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={6}
          className="vds-yoo-highlight-popover"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="vds-yoo-highlight-presets">
            {HIGHLIGHT_PRESETS.map((c) => (
              <button
                key={c}
                type="button"
                className="vds-yoo-highlight-swatch"
                style={{ backgroundColor: c }}
                onClick={() => setHighlight(c)}
                title={c}
                aria-label={`Set highlight ${c}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="vds-yoo-highlight-clear"
            onClick={clearHighlight}
          >
            <IconX size={14} />
            <span>Remove</span>
          </button>
        </PopoverContent>
      </Popover>
    </>
  );
}

function ToolbarFormatButton({
  active,
  title,
  onClick,
  children,
}: {
  active?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="vds-yoo-toolbar-button"
      data-active={active ? "" : undefined}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
