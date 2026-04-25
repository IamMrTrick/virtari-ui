import { useCallback, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import BaseYooptaEditor, {
  buildBlockData,
  buildBlockElement,
  createYooptaEditor,
  generateId,
  type RenderBlockProps,
  type YooptaContentValue,
  type YooptaOnChangeOptions,
  type YooptaPath,
} from "@yoopta/editor";
import { SelectionBox } from "@yoopta/ui/selection-box";
import { BlockDndContext, SortableBlock } from "@yoopta/ui/block-dnd";
import { withMentions } from "@yoopta/mention";
import { withEmoji } from "@yoopta/emoji";
import { cn } from "@virtari-packages/utils";

import { YOOPTA_PLUGINS } from "./plugins";
import { YOOPTA_MARKS } from "./marks";
import { Toolbar } from "./chrome/Toolbar";
import { SlashMenu } from "./chrome/SlashMenu";
import { BlockActions } from "./chrome/BlockActions";
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
  const initialValueRef = useRef(value);

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
    [readOnly],
  );

  /* Sync the value into the editor ONCE on mount. Yoopta is internally
     stateful — re-running setEditorValue on every external value change
     resets selection/focus, which kills typing after Enter. The initial
     value is captured at first render and applied once; subsequent value
     prop changes are observed via onChange but not pushed back in. */
  useEffect(() => {
    const initial = isEmptyValue(initialValueRef.current)
      ? buildStarterValue()
      : initialValueRef.current!;
    editor.withoutSavingHistory(() => {
      editor.setEditorValue(initial);
    });
  }, [editor]);

  const renderBlock = useCallback(
    ({ children, blockId }: RenderBlockProps) => (
      <SortableBlock id={blockId} useDragHandle>
        {children}
      </SortableBlock>
    ),
    [],
  );

  return (
    <div
      ref={containerRef}
      className={cn("vds-yoopta-editor", className)}
      style={style}
    >
      <BlockDndContext editor={editor}>
        <BaseYooptaEditor
          editor={editor}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={onChange}
          onPathChange={onPathChange}
          renderBlock={renderBlock}
          style={{ width: "100%", paddingBottom: 100 }}
        >
          <Toolbar />
          <SlashMenu />
          <BlockActions />
          <SelectionBox selectionBoxElement={containerRef} />
        </BaseYooptaEditor>
      </BlockDndContext>
    </div>
  );
}
