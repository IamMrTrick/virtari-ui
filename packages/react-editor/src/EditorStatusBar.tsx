import { cn } from "@virtari-packages/utils";
import { useEditorContext } from "./context";
import type { EditorStatusBarProps } from "./types";

export function EditorStatusBar({
  className,
  showFeatureHints = true,
}: EditorStatusBarProps) {
  const { features, metrics } = useEditorContext();

  const remaining =
    features.characterLimit != null
      ? features.characterLimit.maxLength - metrics.characterCount
      : null;

  return (
    <div className={cn("vds-editor-status", className)}>
      <div className="vds-editor-status-group">
        <span className="vds-editor-status-pill">
          {metrics.wordCount} words
        </span>
        <span className="vds-editor-status-pill">
          {metrics.characterCount} chars
        </span>
        {remaining != null ? (
          <span
            className="vds-editor-status-pill"
            data-state={
              remaining < 0
                ? "over"
                : remaining <= Math.max(10, features.characterLimit!.maxLength * 0.1)
                  ? "near"
                  : undefined
            }
          >
            {remaining} remaining
          </span>
        ) : null}
      </div>

      {showFeatureHints ? (
        <div className="vds-editor-status-group" data-align="end">
          {features.markdownShortcuts ? (
            <span className="vds-editor-status-pill">Markdown shortcuts</span>
          ) : null}
          {features.tables ? (
            <span className="vds-editor-status-pill">Tables</span>
          ) : null}
          {features.horizontalRule ? (
            <span className="vds-editor-status-pill">Divider</span>
          ) : null}
          {features.autoLinks ? (
            <span className="vds-editor-status-pill">Auto links</span>
          ) : null}
          {features.draggableBlocks ? (
            <span className="vds-editor-status-pill">Drag blocks</span>
          ) : null}
          {features.comments ? (
            <span className="vds-editor-status-pill">Comments</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
