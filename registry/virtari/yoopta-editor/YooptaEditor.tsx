import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import BaseYooptaEditor, {
  buildBlockData,
  buildBlockElement,
  createYooptaEditor,
  generateId,
  type YooptaContentValue,
  type YooptaOnChangeOptions,
  type YooptaPath,
} from "@yoopta/editor";
import { withMentions } from "@yoopta/mention";
import { withEmoji } from "@yoopta/emoji";
import { cn } from "../../lib/utils";

import { YOOPTA_PLUGINS } from "./plugins";
import { YOOPTA_MARKS } from "./marks";
import { Toolbar } from "./chrome/Toolbar";
import { SlashMenu } from "./chrome/SlashMenu";
import { BlockActions } from "./chrome/BlockActions";
import { TableHoverActions } from "./chrome/TableHoverActions";
import "katex/dist/katex.min.css";

export type YooptaEditorProps = {
  value?: YooptaContentValue;
  onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
  onPathChange?: (path: YooptaPath) => void;
  placeholder?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: CSSProperties;
};

function buildStarterValue(): YooptaContentValue {
  const id = generateId();
  return {
    [id]: buildBlockData({
      id,
      type: "Paragraph",
      meta: { order: 0, depth: 0 },
      value: [
        buildBlockElement({
          type: "paragraph",
          children: [{ text: "" }],
        }),
      ],
    }),
  };
}

function isEmptyValue(value: YooptaContentValue | undefined): boolean {
  return !value || Object.keys(value).length === 0;
}

export function YooptaEditor({
  value,
  onChange,
  onPathChange,
  placeholder = "Type / to open menu, or start typing...",
  autoFocus,
  readOnly,
  className,
  style,
}: YooptaEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [documentRevision, setDocumentRevision] = useState(0);

  const editor = useMemo(
    () =>
      withEmoji(
        withMentions(
          createYooptaEditor({
            plugins: YOOPTA_PLUGINS,
            marks: YOOPTA_MARKS,
            readOnly,
          }),
        ),
      ),
    [],
  );

  // Keep the editor identity and selection when the parent echoes an edit.
  // Only a distinct external document needs to replace the editor content.
  editor.readOnly = readOnly ?? false;
  useEffect(() => {
    if (initialized.current && value === undefined) return;
    const serialized = value === undefined ? undefined : JSON.stringify(value);
    if (initialized.current && serialized === JSON.stringify(editor.getEditorValue())) return;
    const next = isEmptyValue(value) ? buildStarterValue() : value!;
    initialized.current = true;
    editor.withoutSavingHistory(() => {
      editor.setEditorValue(next);
    });
    // Slate caches its mounted block editors. Refresh that view only when an
    // external document is loaded; ordinary edit echoes keep focus/selection.
    setDocumentRevision((revision) => revision + 1);
  }, [editor, value]);

  return (
    <div
      ref={containerRef}
      className={cn("vds-yoopta-editor", className)}
      style={style}
    >
      <BaseYooptaEditor
        key={documentRevision}
        editor={editor}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={onChange}
        onPathChange={onPathChange}
        style={{ width: "100%", paddingBottom: 100 }}
      >
        <Toolbar />
        <SlashMenu />
        <BlockActions />
        <TableHoverActions />
      </BaseYooptaEditor>
    </div>
  );
}
