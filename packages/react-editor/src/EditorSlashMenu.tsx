import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import {
  createPortal,
} from "react-dom";
import { useMemo, useState } from "react";
import {
  Icon,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconQuote,
  IconSeparatorHorizontal,
  IconTable,
  IconTypography,
} from "@virtari-packages/react-icons";
import { useEditorConfig } from "./context";
import {
  applyBlockType,
  insertBlock,
  insertDefaultTable,
  toggleBulletList,
  toggleCheckList,
  toggleNumberList,
} from "./editor-utils";
import { cn } from "@virtari-packages/utils";
import type {
  EditorSlashMenuItem,
  EditorSlashMenuProps,
} from "./types";

class SlashCommandOption extends MenuOption {
  item: EditorSlashMenuItem;

  constructor(item: EditorSlashMenuItem) {
    super(item.key);
    this.item = item;
  }
}

export function EditorSlashMenu({
  className,
  items,
}: EditorSlashMenuProps) {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [queryString, setQueryString] = useState<string | null>(null);
  const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const defaultItems = useMemo<EditorSlashMenuItem[]>(
    () => {
      const next: EditorSlashMenuItem[] = [
        {
          key: "paragraph",
          title: "Paragraph",
          description: "Reset the current block to body text.",
          keywords: ["text", "body", "normal"],
          icon: IconTypography,
          run: (currentEditor) => applyBlockType(currentEditor, "paragraph"),
        },
        {
          key: "h1",
          title: "Heading 1",
          description: "Large page heading.",
          keywords: ["title", "hero"],
          icon: IconH1,
          run: (currentEditor) => applyBlockType(currentEditor, "h1"),
        },
        {
          key: "h2",
          title: "Heading 2",
          description: "Section heading.",
          keywords: ["subtitle", "section"],
          icon: IconH2,
          run: (currentEditor) => applyBlockType(currentEditor, "h2"),
        },
        {
          key: "h3",
          title: "Heading 3",
          description: "Subsection heading.",
          keywords: ["subheading"],
          icon: IconH3,
          run: (currentEditor) => applyBlockType(currentEditor, "h3"),
        },
        {
          key: "quote",
          title: "Quote",
          description: "Indented quotation block.",
          keywords: ["blockquote", "citation"],
          icon: IconQuote,
          run: (currentEditor) => applyBlockType(currentEditor, "quote"),
        },
      ];

      if (features.lists) {
        next.push(
          {
            key: "bullet",
            title: "Bulleted list",
            description: "Create an unordered list.",
            keywords: ["ul", "list", "bullet"],
            icon: IconList,
            run: (currentEditor) => toggleBulletList(currentEditor, "paragraph"),
          },
          {
            key: "number",
            title: "Numbered list",
            description: "Create an ordered list.",
            keywords: ["ol", "list", "number"],
            icon: IconListNumbers,
            run: (currentEditor) => toggleNumberList(currentEditor, "paragraph"),
          },
        );
      }

      if (features.checklists) {
        next.push({
          key: "check",
          title: "Checklist",
          description: "Track tasks with checkboxes.",
          keywords: ["todo", "task"],
          icon: IconListCheck,
          run: (currentEditor) => toggleCheckList(currentEditor, "paragraph"),
        });
      }

      if (features.codeBlocks) {
        next.push({
          key: "code",
          title: "Code block",
          description: "Insert a fenced code block.",
          keywords: ["snippet", "code"],
          icon: IconCode,
          run: (currentEditor) => applyBlockType(currentEditor, "code"),
        });
      }

      if (features.horizontalRule) {
        next.push({
          key: "divider",
          title: "Divider",
          description: "Insert a horizontal rule.",
          keywords: ["rule", "separator", "hr"],
          icon: IconSeparatorHorizontal,
          run: (currentEditor) => insertBlock(currentEditor, "divider"),
        });
      }

      if (features.tables) {
        next.push({
          key: "table",
          title: "Table",
          description: "Insert a 3 x 3 table with headers.",
          keywords: ["grid", "columns", "rows"],
          icon: IconTable,
          run: (currentEditor) => insertDefaultTable(currentEditor),
        });
      }

      return next;
    },
    [features],
  );

  const sourceItems = items ?? defaultItems;
  const normalizedQuery = (queryString ?? "").trim().toLowerCase();

  const options = useMemo(
    () =>
      sourceItems
        .filter((item) => {
          if (!normalizedQuery) return true;
          const haystack = [
            item.title,
            item.description ?? "",
            ...(item.keywords ?? []),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        })
        .map((item) => new SlashCommandOption(item)),
    [normalizedQuery, sourceItems],
  );

  if (readOnly) return null;

  return (
    <LexicalTypeaheadMenuPlugin<SlashCommandOption>
      options={options}
      onQueryChange={setQueryString}
      triggerFn={checkForSlashTriggerMatch}
      anchorClassName="vds-editor-slash-anchor"
      onSelectOption={(option, _textNode, closeMenu) => {
        option.item.run(editor);
        closeMenu();
      }}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options: menuOptions },
      ) =>
        anchorElementRef.current && menuOptions.length > 0
          ? createPortal(
              <div
                className={cn("vds-editor-slash-menu", className)}
                data-radius-host=""
              >
                {menuOptions.map((option, index) => (
                  <button
                    key={option.key}
                    type="button"
                    className="vds-editor-slash-option"
                    data-active={selectedIndex === index || undefined}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectOptionAndCleanUp(option);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.item.icon ? (
                      <span className="vds-editor-slash-option-icon">
                        <Icon icon={option.item.icon} size="sm" />
                      </span>
                    ) : null}
                    <span className="vds-editor-slash-option-copy">
                      <span className="vds-editor-slash-option-title">
                        {option.item.title}
                      </span>
                      {option.item.description ? (
                        <span className="vds-editor-slash-option-description">
                          {option.item.description}
                        </span>
                      ) : null}
                    </span>
                  </button>
                ))}
              </div>,
              anchorElementRef.current,
            )
          : null
      }
    />
  );
}
