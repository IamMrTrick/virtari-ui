import { useEffect } from "react";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_HIGH,
  KEY_DOWN_COMMAND,
} from "lexical";
import { useEditorContext } from "./context";
import { hasPrimaryModifier } from "./editor-shortcuts";
import {
  applyBlockType,
  formatElement,
  indentContent,
  outdentContent,
  toggleBulletList,
  toggleCheckList,
  toggleNumberList,
} from "./editor-utils";

function isToolbarTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("input, textarea, select, button, [role='menu']"))
  );
}

export function EditorShortcutsPlugin() {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();

  useEffect(() => {
    if (readOnly || !features.shortcuts) {
      return;
    }

    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        const rootElement = editor.getRootElement();

        if (
          editor.isComposing() ||
          !rootElement ||
          isToolbarTarget(event.target) ||
          !hasPrimaryModifier(event)
        ) {
          return false;
        }

        const target = event.target;

        if (!(target instanceof Node) || !rootElement.contains(target)) {
          return false;
        }

        const key = event.key.toLowerCase();

        if (event.altKey && !event.shiftKey) {
          switch (key) {
            case "0":
              event.preventDefault();
              applyBlockType(editor, "paragraph");
              return true;
            case "1":
              event.preventDefault();
              applyBlockType(editor, "h1");
              return true;
            case "2":
              event.preventDefault();
              applyBlockType(editor, "h2");
              return true;
            case "3":
              event.preventDefault();
              applyBlockType(editor, "h3");
              return true;
            case "c":
              if (!features.codeBlocks) return false;
              event.preventDefault();
              applyBlockType(editor, "code");
              return true;
            default:
              return false;
          }
        }

        if (event.shiftKey) {
          switch (key) {
            case "7":
              if (!features.lists) return false;
              event.preventDefault();
              toggleNumberList(editor, "paragraph");
              return true;
            case "8":
              if (!features.lists) return false;
              event.preventDefault();
              toggleBulletList(editor, "paragraph");
              return true;
            case "9":
              if (!features.checklists) return false;
              event.preventDefault();
              toggleCheckList(editor, "paragraph");
              return true;
            case "q":
              event.preventDefault();
              applyBlockType(editor, "quote");
              return true;
            case "l":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "left");
              return true;
            case "e":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "center");
              return true;
            case "r":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "right");
              return true;
            case "j":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "justify");
              return true;
            default:
              return false;
          }
        }

        switch (event.key) {
          case "[":
            event.preventDefault();
            outdentContent(editor);
            return true;
          case "]":
            event.preventDefault();
            indentContent(editor);
            return true;
          default:
            return false;
        }
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor, features, readOnly]);

  return null;
}
