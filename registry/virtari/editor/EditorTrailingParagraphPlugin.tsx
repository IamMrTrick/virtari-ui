import { useEffect } from "react";
import {
  $createParagraphNode,
  $getRoot,
  type LexicalNode,
} from "lexical";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";

const TRAILING_PARAGRAPH_TAG = "vds-editor-trailing-paragraph";

function isFreeParagraph(node: LexicalNode | null) {
  return node?.getType() === "paragraph" && node.getTextContent().trim() === "";
}

function ensureTrailingParagraph() {
  const root = $getRoot();

  if (!isFreeParagraph(root.getLastChild())) {
    root.append($createParagraphNode());
  }
}

export function EditorTrailingParagraphPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let isApplying = false;

    function normalizeTrailingParagraph() {
      if (isApplying) {
        return;
      }

      let shouldNormalize = false;

      editor.getEditorState().read(() => {
        shouldNormalize = !isFreeParagraph($getRoot().getLastChild());
      });

      if (!shouldNormalize) {
        return;
      }

      isApplying = true;
      editor.update(
        () => {
          ensureTrailingParagraph();
        },
        { tag: TRAILING_PARAGRAPH_TAG },
      );
      isApplying = false;
    }

    normalizeTrailingParagraph();

    return editor.registerUpdateListener(({ tags }) => {
      if (tags.has(TRAILING_PARAGRAPH_TAG)) {
        return;
      }

      normalizeTrailingParagraph();
    });
  }, [editor]);

  return null;
}
