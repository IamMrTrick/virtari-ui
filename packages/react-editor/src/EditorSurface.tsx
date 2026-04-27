import { forwardRef } from "react";
import {
  ContentEditable,
} from "@lexical/react/LexicalContentEditable";
import {
  LexicalErrorBoundary,
} from "@lexical/react/LexicalErrorBoundary";
import {
  RichTextPlugin,
} from "@lexical/react/LexicalRichTextPlugin";
import { cn } from "@virtari-packages/utils";
import { useEditorConfig } from "./context";
import type { EditorSurfaceProps } from "./types";

export const EditorSurface = forwardRef<HTMLDivElement, EditorSurfaceProps>(
  function EditorSurface(
    {
      placeholder = "Start writing...",
      placeholderText,
      className,
      style,
      contentClassName,
      contentStyle,
      placeholderClassName,
      minHeight = "12rem",
      maxHeight,
      ...contentEditableProps
    }: EditorSurfaceProps,
    ref,
  ) {
    const { readOnly } = useEditorConfig();

    return (
      <div
        className={cn("vds-editor-surface", className)}
        style={style}
        data-read-only={readOnly || undefined}
      >
        <div
          className="vds-editor-scroller"
          style={{
            minBlockSize: minHeight,
            maxBlockSize: maxHeight,
          }}
        >
          <div ref={ref} className="vds-editor-stage">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  {...contentEditableProps}
                  className={cn("vds-editor-content", contentClassName)}
                  placeholder={null}
                  style={contentStyle}
                  role="textbox"
                  aria-multiline="true"
                />
              }
              placeholder={
                <div className={cn("vds-editor-placeholder", placeholderClassName)}>
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
      </div>
    );
  },
);
