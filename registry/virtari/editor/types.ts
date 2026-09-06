import type {
  ContentEditableProps,
} from "@lexical/react/LexicalContentEditable";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";
import type { Transformer } from "@lexical/markdown";
import type {
  EditorState,
  LexicalEditor,
  SerializedEditorState,
} from "lexical";
import type { CSSProperties, ReactNode, RefObject } from "react";
import type { IconProps } from "../icons";
import type { EditorMediaKind } from "./EditorMediaNode";

export type EditorPreset = "core" | "pro";
export type EditorValueFormat = "json" | "html" | "markdown";
export type EditorCharset = "UTF-8" | "UTF-16";
export type EditorMode = "rich-text" | "markdown" | "html";
export type EditorElementAlignment =
  | "left"
  | "center"
  | "right"
  | "justify"
  | "start"
  | "end";

export type EditorBlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "quote"
  | "code"
  | "bullet"
  | "number"
  | "check";

export interface EditorCharacterLimitOptions {
  maxLength: number;
  charset?: EditorCharset;
}

export interface EditorFeatureOptions {
  history?: boolean;
  links?: boolean;
  autoLinks?: boolean;
  lists?: boolean;
  checklists?: boolean;
  tables?: boolean;
  codeBlocks?: boolean;
  media?: boolean;
  horizontalRule?: boolean;
  draggableBlocks?: boolean;
  markdownShortcuts?: boolean;
  tabIndentation?: boolean;
  strictListIndent?: boolean;
  tableCellMerge?: boolean;
  tableCellBackgroundColor?: boolean;
  tableHorizontalScroll?: boolean;
  advancedTextFormats?: boolean;
  textAlignment?: boolean;
  fontFamily?: boolean;
  fontSize?: boolean;
  textColors?: boolean;
  comments?: boolean;
  shortcuts?: boolean;
  maxIndent?: number;
  characterLimit?: number | EditorCharacterLimitOptions;
}

export interface ResolvedEditorFeatureOptions {
  history: boolean;
  links: boolean;
  autoLinks: boolean;
  lists: boolean;
  checklists: boolean;
  tables: boolean;
  codeBlocks: boolean;
  media: boolean;
  horizontalRule: boolean;
  draggableBlocks: boolean;
  markdownShortcuts: boolean;
  tabIndentation: boolean;
  strictListIndent: boolean;
  tableCellMerge: boolean;
  tableCellBackgroundColor: boolean;
  tableHorizontalScroll: boolean;
  advancedTextFormats: boolean;
  textAlignment: boolean;
  fontFamily: boolean;
  fontSize: boolean;
  textColors: boolean;
  comments: boolean;
  shortcuts: boolean;
  maxIndent: number;
  characterLimit: EditorCharacterLimitOptions | null;
}

export interface EditorMetrics {
  text: string;
  html: string;
  markdown: string;
  json: SerializedEditorState | null;
  characterCount: number;
  wordCount: number;
  isEmpty: boolean;
}

export interface EditorChangePayload extends EditorMetrics {
  editor: LexicalEditor;
  editorState: EditorState;
  tags: Set<string>;
}

export interface EditorChangeSerializationOptions {
  html?: boolean;
  markdown?: boolean;
  json?: boolean;
  debounceMs?: number;
}

export interface EditorComposerProps {
  namespace?: string;
  preset?: EditorPreset;
  initialValue?: string | SerializedEditorState | null;
  initialValueFormat?: EditorValueFormat;
  activeMode?: EditorMode;
  onChange?: (payload: EditorChangePayload) => void;
  changeSerialization?: EditorChangeSerializationOptions;
  onError?: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  features?: EditorFeatureOptions;
  linkMatchers?: LinkMatcher[];
  markdownTransformers?: Transformer[];
  editorRef?:
    | React.RefCallback<LexicalEditor>
    | RefObject<LexicalEditor | null | undefined>;
  children?: ReactNode;
}

export interface EditorSurfaceProps
  extends Omit<
    ContentEditableProps,
    "placeholder" | "aria-placeholder" | "className" | "style" | "onChange"
  > {
  placeholder?: ReactNode;
  placeholderText?: string;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  placeholderClassName?: string;
  minHeight?: CSSProperties["minHeight"];
  maxHeight?: CSSProperties["maxHeight"];
}

export interface EditorToolbarProps {
  className?: string;
  sticky?: boolean;
  showClearButton?: boolean;
  insertMenu?: EditorInsertMenuProps | null;
  modeSwitcher?: EditorModeSwitcherProps | null;
  mode?: EditorMode;
  onModeChange?: (mode: EditorMode) => void;
  onRequestComment?: () => void;
  fontFamilies?: EditorToolbarOption[];
  fontSizes?: EditorToolbarOption[];
  textColorSwatches?: EditorColorSwatch[];
  highlightColorSwatches?: EditorColorSwatch[];
}

export interface EditorToolbarOption {
  label: string;
  value: string;
}

export interface EditorColorSwatch {
  label: string;
  value: string;
}

export interface EditorInsertMenuItem {
  key: string;
  title: string;
  description?: string;
  keywords?: string[];
  icon?: IconProps["icon"];
  shortcut?: string;
  run: (editor: LexicalEditor, targetBlockElement?: HTMLElement | null) => void;
}

export interface EditorMediaInsertRequest {
  editor: LexicalEditor;
  kind: EditorMediaKind;
  targetBlockElement?: HTMLElement | null;
}

export interface EditorInsertMenuProps {
  className?: string;
  items?: EditorInsertMenuItem[];
  label?: string;
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRequestMediaInsert?: (request: EditorMediaInsertRequest) => void;
  targetBlockElement?: HTMLElement | null;
}

export type EditorBlockToolsPlacement = "inside" | "edge";

export interface EditorBlockToolsProps {
  className?: string;
  placement?: EditorBlockToolsPlacement;
}

export interface EditorStatusBarProps {
  className?: string;
  showFeatureHints?: boolean;
}

export interface EditorSlashMenuItem {
  key: string;
  title: string;
  description?: string;
  keywords?: string[];
  icon?: IconProps["icon"];
  run: (editor: LexicalEditor) => void;
}

export interface EditorSlashMenuProps {
  className?: string;
  items?: EditorSlashMenuItem[];
}

export interface EditorFloatingToolbarProps {
  className?: string;
  showLinkActions?: boolean;
  showCommentActions?: boolean;
  onRequestComment?: () => void;
}

export interface EditorModeSwitcherProps {
  className?: string;
  modes?: EditorMode[];
  labels?: Partial<Record<EditorMode, string>>;
}

export interface EditorCommentThread {
  id: string;
  quote: string;
  body: string;
  createdAt: string;
  status: "open" | "resolved";
}

export interface EditorProps
  extends Omit<EditorComposerProps, "children">,
    Omit<EditorSurfaceProps, "className" | "style" | "onError"> {
  className?: string;
  style?: CSSProperties;
  surfaceClassName?: string;
  surfaceStyle?: CSSProperties;
  toolbar?: boolean | EditorToolbarProps;
  insertMenu?: boolean | EditorInsertMenuProps;
  statusBar?: boolean | EditorStatusBarProps;
  slashMenu?: boolean | EditorSlashMenuProps;
  floatingToolbar?: boolean | EditorFloatingToolbarProps;
  modeSwitcher?: boolean | EditorModeSwitcherProps;
  blockTools?: EditorBlockToolsProps;
  defaultMode?: EditorMode;
  mode?: EditorMode;
  onModeChange?: (mode: EditorMode) => void;
  onCommentsChange?: (comments: EditorCommentThread[]) => void;
}
