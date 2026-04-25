import { useMemo, useState } from "react";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import { Button } from "@virtari-packages/react-button";
import { Kbd } from "@virtari-packages/react-kbd";
import {
  Icon,
  IconChevronDown,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconPhoto,
  IconPlus,
  IconQuote,
  IconSeparatorHorizontal,
  IconTable,
  IconTypography,
  IconVideo,
  IconWorld,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import { useEditorContext } from "./context";
import { EditorDropdown, EditorDropdownItem } from "./EditorDropdown";
import { insertBlock, type EditorInsertBlockKind } from "./editor-utils";
import { EditorMediaDialog } from "./EditorMediaDialog";
import type { EditorMediaKind } from "./EditorMediaNode";
import type {
  EditorInsertMenuItem,
  EditorInsertMenuProps,
} from "./types";

const DEFAULT_LABEL = "Insert";

type ResolvedInsertMenuItem = EditorInsertMenuItem & {
  kind?: EditorInsertBlockKind;
};

function isMediaInsertKind(
  kind: EditorInsertBlockKind | undefined,
): kind is EditorMediaKind {
  return kind === "image" || kind === "video" || kind === "embed";
}

function createDefaultItems(
  features: ReturnType<typeof useEditorContext>["features"],
  compact: boolean,
) {
  const items: ResolvedInsertMenuItem[] = [];
  const includeTextBlocks = compact;

  if (features.horizontalRule) {
    items.push({
      key: "divider",
      title: "Horizontal Rule",
      description: "Insert a divider between blocks.",
      icon: IconSeparatorHorizontal,
      kind: "divider",
      run: (editor, targetBlockElement) =>
        insertBlock(editor, "divider", targetBlockElement),
    });
  }

  if (includeTextBlocks) {
    items.push(
      {
        key: "paragraph",
        title: "Paragraph",
        description: "Insert a plain text block.",
        icon: IconTypography,
        kind: "paragraph",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "paragraph", targetBlockElement),
      },
      {
        key: "h1",
        title: "Heading 1",
        description: "Insert a large page heading.",
        icon: IconH1,
        kind: "h1",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "h1", targetBlockElement),
      },
      {
        key: "h2",
        title: "Heading 2",
        description: "Insert a section heading.",
        icon: IconH2,
        kind: "h2",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "h2", targetBlockElement),
      },
      {
        key: "h3",
        title: "Heading 3",
        description: "Insert a subsection heading.",
        icon: IconH3,
        kind: "h3",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "h3", targetBlockElement),
      },
      {
        key: "quote",
        title: "Quote",
        description: "Insert a quoted block.",
        icon: IconQuote,
        kind: "quote",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "quote", targetBlockElement),
      },
    );

    if (features.codeBlocks) {
      items.push({
        key: "code",
        title: "Code block",
        description: "Insert a fenced code block.",
        icon: IconCode,
        kind: "code",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "code", targetBlockElement),
      });
    }

    if (features.lists) {
      items.push(
        {
          key: "bullet",
          title: "Bulleted list",
          description: "Insert an unordered list.",
          icon: IconList,
          kind: "bullet",
          run: (editor, targetBlockElement) =>
            insertBlock(editor, "bullet", targetBlockElement),
        },
        {
          key: "number",
          title: "Numbered list",
          description: "Insert an ordered list.",
          icon: IconListNumbers,
          kind: "number",
          run: (editor, targetBlockElement) =>
            insertBlock(editor, "number", targetBlockElement),
        },
      );
    }

    if (features.checklists) {
      items.push({
        key: "check",
        title: "Checklist",
        description: "Insert a task list.",
        icon: IconListCheck,
        kind: "check",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "check", targetBlockElement),
      });
    }
  }

  if (features.media) {
    items.push(
      {
        key: "image",
        title: "Image",
        description: "Insert an image block.",
        icon: IconPhoto,
        kind: "image",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "image", targetBlockElement),
      },
      {
        key: "video",
        title: "Video",
        description: "Insert a video block.",
        icon: IconVideo,
        kind: "video",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "video", targetBlockElement),
      },
      {
        key: "embed",
        title: "Embed",
        description: "Insert an iframe, post, prototype, audio, map, or custom embed.",
        icon: IconWorld,
        kind: "embed",
        run: (editor, targetBlockElement) =>
          insertBlock(editor, "embed", targetBlockElement),
      },
    );
  }

  if (features.tables) {
    items.push({
      key: "table",
      title: "Table",
      description: "Insert a 3 x 3 table with headers.",
      icon: IconTable,
      kind: "table",
      run: (editor, targetBlockElement) =>
        insertBlock(editor, "table", targetBlockElement),
    });
  }

  return items;
}

export function EditorInsertMenu({
  className,
  items,
  label = DEFAULT_LABEL,
  compact = false,
  onOpenChange,
  targetBlockElement,
}: EditorInsertMenuProps) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
  const [mediaDialog, setMediaDialog] = useState<{
    kind: EditorMediaKind;
    targetBlockElement?: HTMLElement | null;
  } | null>(null);

  const resolvedItems = useMemo<ResolvedInsertMenuItem[]>(
    () => items ?? createDefaultItems(features, compact),
    [compact, features, items],
  );

  return (
    <div className={cn("vds-editor-insert", className)}>
      <EditorDropdown
        autoFocusItems={!compact}
        className={cn(
          "vds-editor-dropdown vds-editor-menu vds-editor-insert-menu",
          compact ? "vds-editor-insert-menu-compact" : null,
        )}
        closeOnTriggerMove={!compact}
        disabled={readOnly}
        onOpenChange={onOpenChange}
        trigger={({ buttonRef, controlsId, open, toggle }) => (
          <Button
            ref={buttonRef}
            type="button"
            variant={open ? "soft" : "ghost"}
            color="contrast"
            size="sm"
            className={cn(
              "vds-editor-toolbar-trigger vds-editor-insert-trigger",
              compact ? "vds-editor-insert-trigger-compact" : null,
            )}
            aria-label={label}
            aria-controls={controlsId}
            aria-expanded={open}
            disabled={readOnly}
            leftSection={<Icon icon={IconPlus} size="sm" />}
            rightSection={
              compact ? undefined : <Icon icon={IconChevronDown} size="xs" />
            }
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggle();
            }}
          >
            {compact ? null : label}
          </Button>
        )}
      >
        {resolvedItems.map((item) => (
          <EditorDropdownItem
            key={item.key}
            className="vds-editor-menu-item vds-editor-menu-item-rich"
            onSelect={() => {
              if (isMediaInsertKind(item.kind)) {
                setMediaDialog({
                  kind: item.kind,
                  targetBlockElement,
                });
                return;
              }

              item.run(editor, targetBlockElement);
            }}
          >
            {item.icon ? (
              <span className="vds-editor-menu-item-icon">
                <Icon icon={item.icon} size="sm" />
              </span>
            ) : null}

            <span className="vds-editor-menu-item-copy">
              <span className="vds-editor-menu-item-label">
                {item.title}
              </span>
              {item.description ? (
                <span className="vds-editor-menu-item-description">
                  {item.description}
                </span>
              ) : null}
            </span>

            {item.shortcut ? (
              <Kbd className="vds-editor-menu-item-shortcut">
                {item.shortcut}
              </Kbd>
            ) : null}
          </EditorDropdownItem>
        ))}
      </EditorDropdown>
      <EditorMediaDialog
        editor={editor}
        kind={mediaDialog?.kind ?? null}
        open={mediaDialog !== null}
        targetBlockElement={mediaDialog?.targetBlockElement ?? null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setMediaDialog(null);
          }
        }}
      />
    </div>
  );
}
