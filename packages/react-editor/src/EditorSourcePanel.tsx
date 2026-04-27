import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CodeEditor } from "@virtari-packages/react-code";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useEditorConfig } from "./context";
import type { EditorMode } from "./types";

interface EditorSourcePanelProps {
  maxHeight?: CSSProperties["maxHeight"];
  minHeight?: CSSProperties["minHeight"];
  mode: Exclude<EditorMode, "rich-text">;
  onChange?: (nextValue: string) => void;
  value: string;
}

export function EditorSourcePanel({
  maxHeight,
  minHeight = "12rem",
  mode,
  onChange,
  value,
}: EditorSourcePanelProps) {
  useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const [localValue, setLocalValue] = useState(value);
  const valueRef = useRef(value);
  const language = mode === "markdown" ? "markdown" : "html";

  useEffect(() => {
    valueRef.current = value;
    setLocalValue((currentValue) =>
      currentValue === value ? currentValue : value,
    );
  }, [value]);

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
        value={localValue}
        onValueChange={(nextValue) => {
          if (nextValue === valueRef.current) {
            return;
          }

          valueRef.current = nextValue;
          setLocalValue(nextValue);
          onChange?.(nextValue);
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
