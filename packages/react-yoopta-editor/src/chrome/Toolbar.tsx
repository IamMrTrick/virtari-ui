import { useRef, useState } from "react";
import { Editor, Range } from "slate";
import { Blocks, Marks, useYooptaEditor } from "@yoopta/editor";
import { MathInlineCommands } from "@yoopta/math";
import { FloatingToolbar } from "@yoopta/ui/floating-toolbar";
import { HighlightColorPicker } from "@yoopta/ui/highlight-color-picker";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCode,
  IconHighlight,
  IconChevronDown,
  IconMath,
} from "@virtari-packages/react-icons";

import { ActionMenu } from "./ActionMenu";

const HIGHLIGHT_PRESETS = [
  "var(--vds-color-warning-solid)",
  "var(--vds-color-info-solid)",
  "var(--vds-color-success-solid)",
  "var(--vds-color-danger-solid)",
  "var(--vds-color-accent-solid)",
  "var(--vds-color-primary-solid)",
  "var(--vds-color-neutral-9)",
  "var(--vds-color-neutral-12)",
];

export function Toolbar() {
  const editor = useYooptaEditor();
  const turnIntoRef = useRef<HTMLButtonElement>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const highlightValue = Marks.getValue(editor, { type: "highlight" }) as
    | { color?: string; backgroundColor?: string }
    | null;

  const onInsertMath = () => {
    if (editor.path.current === null) return;
    const currentBlockId = Object.keys(editor.children).find(
      (id) => editor.children[id]?.meta.order === editor.path.current,
    );
    if (!currentBlockId) return;
    const slate = Blocks.getBlockSlate(editor, { id: currentBlockId });
    if (!slate || !slate.selection) return;
    const selectedText = !Range.isCollapsed(slate.selection)
      ? Editor.string(slate, slate.selection)
      : "";
    MathInlineCommands.insertMathInline(editor, selectedText || "E = mc^2", { slate });
  };

  return (
    <>
      <FloatingToolbar frozen={actionMenuOpen}>
        <FloatingToolbar.Content>
          <FloatingToolbar.Group>
            <FloatingToolbar.Button
              ref={turnIntoRef}
              onClick={() => setActionMenuOpen(true)}
            >
              Turn into
              <IconChevronDown size={14} />
            </FloatingToolbar.Button>
          </FloatingToolbar.Group>
          <FloatingToolbar.Separator />
          <FloatingToolbar.Group>
            {editor.formats.bold && (
              <FloatingToolbar.Button
                onClick={() => Marks.toggle(editor, { type: "bold" })}
                active={Marks.isActive(editor, { type: "bold" })}
                title="Bold"
              >
                <IconBold size={16} />
              </FloatingToolbar.Button>
            )}
            {editor.formats.italic && (
              <FloatingToolbar.Button
                onClick={() => Marks.toggle(editor, { type: "italic" })}
                active={Marks.isActive(editor, { type: "italic" })}
                title="Italic"
              >
                <IconItalic size={16} />
              </FloatingToolbar.Button>
            )}
            {editor.formats.underline && (
              <FloatingToolbar.Button
                onClick={() => Marks.toggle(editor, { type: "underline" })}
                active={Marks.isActive(editor, { type: "underline" })}
                title="Underline"
              >
                <IconUnderline size={16} />
              </FloatingToolbar.Button>
            )}
            {editor.formats.strike && (
              <FloatingToolbar.Button
                onClick={() => Marks.toggle(editor, { type: "strike" })}
                active={Marks.isActive(editor, { type: "strike" })}
                title="Strikethrough"
              >
                <IconStrikethrough size={16} />
              </FloatingToolbar.Button>
            )}
            {editor.formats.code && (
              <FloatingToolbar.Button
                onClick={() => Marks.toggle(editor, { type: "code" })}
                active={Marks.isActive(editor, { type: "code" })}
                title="Code"
              >
                <IconCode size={16} />
              </FloatingToolbar.Button>
            )}
            {editor.formats.highlight && (
              <HighlightColorPicker
                value={highlightValue ?? {}}
                presets={HIGHLIGHT_PRESETS}
                onChange={(values) => {
                  Marks.add(editor, {
                    type: "highlight",
                    value: {
                      color: values.color,
                      backgroundColor: values.backgroundColor,
                    },
                  });
                }}
              >
                <FloatingToolbar.Button
                  active={Marks.isActive(editor, { type: "highlight" })}
                  title="Highlight"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (Marks.isActive(editor, { type: "highlight" })) {
                      Marks.remove(editor, { type: "highlight" });
                    }
                  }}
                  style={{
                    backgroundColor: Marks.isActive(editor, { type: "highlight" })
                      ? highlightValue?.backgroundColor
                      : undefined,
                    color: Marks.isActive(editor, { type: "highlight" })
                      ? highlightValue?.color
                      : undefined,
                  }}
                >
                  <IconHighlight size={16} />
                </FloatingToolbar.Button>
              </HighlightColorPicker>
            )}
          </FloatingToolbar.Group>
          {editor.plugins.MathInline && (
            <>
              <FloatingToolbar.Separator />
              <FloatingToolbar.Group>
                <FloatingToolbar.Button onClick={onInsertMath} title="Insert Math">
                  <IconMath size={16} />
                </FloatingToolbar.Button>
              </FloatingToolbar.Group>
            </>
          )}
        </FloatingToolbar.Content>
      </FloatingToolbar>

      <ActionMenu
        open={actionMenuOpen}
        onOpenChange={setActionMenuOpen}
        anchor={turnIntoRef.current}
        placement="bottom-start"
      />
    </>
  );
}
