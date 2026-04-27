export * from "./index.core";
import { EditorCommentsPanel } from "./EditorCommentsPanel";
import { EditorComposer } from "./EditorComposer";
import { EditorDraggableBlocks } from "./EditorDraggableBlocks";
import { Editor } from "./Editor";
import { EditorField } from "./EditorField";
import { EditorFloatingToolbar } from "./EditorFloatingToolbar";
import { EditorInsertMenu } from "./EditorInsertMenu";
import { EditorModeSwitcher } from "./EditorModeSwitcher";
import { EditorSlashMenu } from "./EditorSlashMenu";
import { EditorStatusBar } from "./EditorStatusBar";
import { EditorSurface } from "./EditorSurface";
import { EditorToolbar } from "./EditorToolbar";

export { Editor };
export { EditorCommentsPanel } from "./EditorCommentsPanel";
export { EditorDraggableBlocks };
export { EditorField };
export { EditorFloatingToolbar };
export { EditorInsertMenu };
export { EditorModeSwitcher };
export {
  $createEditorMediaNode,
  $isEditorMediaNode,
  EditorMediaNode,
} from "./EditorMediaNode";
export { EditorSlashMenu };
export { EditorStatusBar };
export { EditorToolbar };

export type { EditorFieldProps } from "./EditorField";
export type {
  EditorMediaKind,
  SerializedEditorMediaNode,
} from "./EditorMediaNode";
export type {
  EditorBlockToolsPlacement,
  EditorBlockToolsProps,
  EditorChangeSerializationOptions,
  EditorFloatingToolbarProps,
  EditorCommentThread,
  EditorColorSwatch,
  EditorElementAlignment,
  EditorInsertMenuItem,
  EditorInsertMenuProps,
  EditorMode,
  EditorModeSwitcherProps,
  EditorProps,
  EditorSlashMenuItem,
  EditorSlashMenuProps,
  EditorStatusBarProps,
  EditorToolbarOption,
  EditorToolbarProps,
} from "./types";

export const EditorParts = {
  Composer: EditorComposer,
  DraggableBlocks: EditorDraggableBlocks,
  Surface: EditorSurface,
  CommentsPanel: EditorCommentsPanel,
  FloatingToolbar: EditorFloatingToolbar,
  InsertMenu: EditorInsertMenu,
  ModeSwitcher: EditorModeSwitcher,
  Toolbar: EditorToolbar,
  StatusBar: EditorStatusBar,
  SlashMenu: EditorSlashMenu,
  Field: EditorField,
} as const;
