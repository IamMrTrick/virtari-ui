import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeEditor } from "@virtari-packages/react-code";
import { useEffect, useState, type CSSProperties } from "react";
import { useEditorContext } from "./context";
import { readSourceValue, writeSourceValue } from "./editor-utils";
import type { EditorMode } from "./types";

interface EditorSourcePanelProps {
  maxHeight?: CSSProperties["maxHeight"];
  minHeight?: CSSProperties["minHeight"];
  mode: Exclude<EditorMode, "rich-text">;
}

export function EditorSourcePanel({
  maxHeight,
  minHeight = "12rem",
  mode,
}: EditorSourcePanelProps) {
  const [editor] = useLexicalComposerContext();
  const { markdownTransformers, readOnly } = useEditorContext();
  const [value, setValue] = useState("");
  const language = mode === "markdown" ? "markdown" : "html";

  useEffect(() => {
    setValue(readSourceValue(editor, mode, markdownTransformers));
  }, [editor, markdownTransformers, mode]);

  return (
    <div
      className="vds-editor-source-panel"
      style={{
        minBlockSize: minHeight,
        maxBlockSize: maxHeight,
      }}
    >
      <CodeEditor
        className="vds-editor-source-code"
        value={value}
        onValueChange={(nextValue) => {
          setValue(nextValue);
          writeSourceValue(editor, mode, nextValue);
        }}
        language={language}
        filename={mode === "markdown" ? "document.md" : "document.html"}
        copyable
        readOnly={readOnly}
        showLineNumbers
        wrap
        minLines={12}
        maxLines={32}
        variant="embedded"
        size="md"
      />
    </div>
  );
}
