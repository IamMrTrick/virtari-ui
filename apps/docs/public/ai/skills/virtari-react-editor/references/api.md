# @virtari-packages/react-editor API snapshot

Version: 0.4.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./core": {
    "import": {
      "types": "./dist/index.core.d.ts",
      "default": "./dist/index.core.js"
    },
    "require": {
      "types": "./dist/index.core.d.cts",
      "default": "./dist/index.core.cjs"
    }
  },
  "./styles": {
    "style": "./dist/Editor.css",
    "default": "./dist/Editor.css"
  },
  "./tokens": {
    "style": "./dist/Editor.tokens.css",
    "default": "./dist/Editor.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `EditorComposer` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorSurface` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `useEditorContext` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `$createEditorMediaNode` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `$isEditorMediaNode` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMediaNode` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMediaKind` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `SerializedEditorMediaNode` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `buildEditorNodes` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `createInitialEditorState` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_CORE_FEATURES` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_LINK_MATCHERS` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_MARKDOWN_TRANSFORMERS` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_PRO_FEATURES` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `resolveEditorFeatures` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EDITOR_THEME` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockType` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockToolsPlacement` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockToolsProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorChangePayload` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorChangeSerializationOptions` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCharacterLimitOptions` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCharset` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorColorSwatch` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCommentThread` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorComposerProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorElementAlignment` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorFeatureOptions` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMetrics` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMode` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorPreset` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorSurfaceProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorToolbarOption` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `EditorValueFormat` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `ResolvedEditorFeatureOptions` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.core.ts`.
- `Editor` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorCommentsPanel` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorDraggableBlocks` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorField` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorFloatingToolbar` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorInsertMenu` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorModeSwitcher` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorSlashMenu` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorStatusBar` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorToolbar` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorFieldProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorFloatingToolbarProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorInsertMenuItem` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorInsertMenuProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorModeSwitcherProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorSlashMenuItem` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorSlashMenuProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorStatusBarProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorToolbarProps` (type) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorParts` (export) from `@virtari-packages/react-editor`; source: `packages/react-editor/src/index.ts`.
- `EditorComposer` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorSurface` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `useEditorContext` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `$createEditorMediaNode` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `$isEditorMediaNode` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMediaNode` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMediaKind` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `SerializedEditorMediaNode` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `buildEditorNodes` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `createInitialEditorState` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_CORE_FEATURES` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_LINK_MATCHERS` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_MARKDOWN_TRANSFORMERS` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `DEFAULT_PRO_FEATURES` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `resolveEditorFeatures` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EDITOR_THEME` (export) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockType` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockToolsPlacement` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorBlockToolsProps` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorChangePayload` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorChangeSerializationOptions` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCharacterLimitOptions` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCharset` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorColorSwatch` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorCommentThread` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorComposerProps` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorElementAlignment` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorFeatureOptions` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMetrics` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorMode` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorPreset` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorSurfaceProps` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorToolbarOption` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `EditorValueFormat` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.
- `ResolvedEditorFeatureOptions` (type) from `@virtari-packages/react-editor/core`; source: `packages/react-editor/src/index.core.ts`.

## Source type declarations

Source: `packages/react-editor/src/context.tsx`

```tsx
export interface EditorConfigContextValue {
  features: ResolvedEditorFeatureOptions;
  linkMatchers: LinkMatcher[];
  markdownTransformers: Transformer[];
  readOnly: boolean;
}
```

Source: `packages/react-editor/src/context.tsx`

```tsx
export function useEditorConfig();
```

Source: `packages/react-editor/src/context.tsx`

```tsx
export function useEditorMetrics();
```

Source: `packages/react-editor/src/context.tsx`

```tsx
export function useEditorContext();
```

Source: `packages/react-editor/src/defaults.ts`

```tsx
export function resolveEditorFeatures(
  preset: EditorPreset,
  features?: EditorFeatureOptions,
): ResolvedEditorFeatureOptions;
```

Source: `packages/react-editor/src/defaults.ts`

```tsx
export function buildEditorNodes(
  features: ResolvedEditorFeatureOptions,
): Array<Klass<LexicalNode>>;
```

Source: `packages/react-editor/src/defaults.ts`

```tsx
export function applySerializedEditorValue(
  editor: LexicalEditor,
  value: string | SerializedEditorState | null | undefined,
  format: EditorValueFormat,
  markdownTransformers: Transformer[],
);
```

Source: `packages/react-editor/src/defaults.ts`

```tsx
export function createInitialEditorState(
  initialValue: string | SerializedEditorState | null | undefined,
  initialValueFormat: EditorValueFormat,
  markdownTransformers: Transformer[],
): InitialEditorStateType | undefined;
```

Source: `packages/react-editor/src/editor-shortcuts.ts`

```tsx
export function hasPrimaryModifier(
  event:
    | KeyboardEvent
    | ReactKeyboardEvent
    | Pick<KeyboardEvent, "ctrlKey" | "metaKey">,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export type EditorInsertBlockKind =
  | EditorBlockType
  | "divider"
  | "embed"
  | "image"
  | "table"
  | "video";
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export interface EditorMediaPayload {
  alt?: string;
  src: string;
}
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export interface ToolbarState {
  blockType: EditorBlockType;
  elementFormat: EditorElementAlignment;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isInlineCode: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isLowercase: boolean;
  isUppercase: boolean;
  isCapitalize: boolean;
  isTableSelection: boolean;
  isLink: boolean;
  linkUrl: string;
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  bgColor: string;
}
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function countCharacters(text: string, charset: EditorCharset);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function countWords(text: string);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function areEditorMetricsEqual(
  current: EditorMetrics,
  next: EditorMetrics,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function buildEditorMetrics(
  editorState: EditorState,
  charset: EditorCharset,
): EditorMetrics;
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function buildEditorChangePayload(
  editor: LexicalEditor,
  editorState: EditorState,
  markdownTransformers: Transformer[],
  charset: EditorCharset,
  tags: Set<string>,
  {
    includeHtml = true,
    includeJson = true,
    includeMarkdown = true,
  }: BuildEditorChangePayloadOptions = {},
): EditorChangePayload;
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function readEditorSnapshot(
  editor: LexicalEditor,
  markdownTransformers: Transformer[],
  charset: EditorCharset = "UTF-16",
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function readSourceValue(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function writeSourceValue(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  source: string,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function enterSourceMode(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function exitSourceMode(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function readToolbarState(): ToolbarState;
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function applyBlockType(
  editor: LexicalEditor,
  blockType: EditorBlockType,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function toggleList(editor: LexicalEditor, activeType: EditorBlockType);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function toggleBulletList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function toggleNumberList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function toggleCheckList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertDefaultTable(
  editor: LexicalEditor,
  rows = 3,
  columns = 3,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertTable(
  editor: LexicalEditor,
  rows = 3,
  columns = 3,
  targetBlockElement?: HTMLElement | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertTableRow(
  editor: LexicalEditor,
  insertAfter: boolean,
  selectionSnapshot?: RangeSelection | null,
  targetCellKey?: NodeKey | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertTableColumn(
  editor: LexicalEditor,
  insertAfter: boolean,
  selectionSnapshot?: RangeSelection | null,
  targetCellKey?: NodeKey | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function deleteTableRow(
  editor: LexicalEditor,
  selectionSnapshot?: RangeSelection | null,
  targetCellKey?: NodeKey | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function deleteTableColumn(
  editor: LexicalEditor,
  selectionSnapshot?: RangeSelection | null,
  targetCellKey?: NodeKey | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function deleteTable(
  editor: LexicalEditor,
  selectionSnapshot?: RangeSelection | null,
  targetCellKey?: NodeKey | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function applyLink(
  editor: LexicalEditor,
  url: string,
  selectionSnapshot?: RangeSelection | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function clearLink(
  editor: LexicalEditor,
  selectionSnapshot?: RangeSelection | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function clearEditor(editor: LexicalEditor);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function applyTextStyles(
  editor: LexicalEditor,
  styles: Record<string, string>,
  selectionSnapshot?: RangeSelection | null,
  skipHistoryStack = false,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function applySourceValue(
  editor: LexicalEditor,
  value: string,
  format: Extract<EditorValueFormat, "html" | "markdown">,
  markdownTransformers: Transformer[],
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function undo(editor: LexicalEditor);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function redo(editor: LexicalEditor);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function formatText(
  editor: LexicalEditor,
  format: TextFormatType,
  selectionSnapshot?: RangeSelection | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function formatElement(
  editor: LexicalEditor,
  format: ElementFormatType,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function indentContent(editor: LexicalEditor);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function outdentContent(editor: LexicalEditor);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertBlock(
  editor: LexicalEditor,
  kind: EditorInsertBlockKind,
  targetBlockElement?: HTMLElement | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function insertMediaBlock(
  editor: LexicalEditor,
  kind: EditorMediaKind,
  payload: EditorMediaPayload,
  targetBlockElement?: HTMLElement | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function getSelectionText(
  selectionSnapshot?: RangeSelection | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function wrapSelectionInComment(
  editor: LexicalEditor,
  commentId: string,
  selectionSnapshot?: RangeSelection | null,
);
```

Source: `packages/react-editor/src/editor-utils.ts`

```tsx
export function removeCommentMark(
  editor: LexicalEditor,
  commentId: string,
);
```

Source: `packages/react-editor/src/Editor.tsx`

```tsx
export function Editor({
  className,
  style,
  surfaceClassName,
  surfaceStyle,
  toolbar,
  insertMenu,
  statusBar,
  slashMenu,
  floatingToolbar,
  modeSwitcher,
  blockTools,
  preset = "pro",
  readOnly = false,
  namespace,
  initialValue,
  initialValueFormat = "json",
  onChange,
  onError,
  autoFocus,
  features,
  linkMatchers,
  markdownTransformers,
  editorRef,
  defaultMode = "rich-text",
  mode,
  onModeChange,
  onCommentsChange,
  id,
  placeholder,
  placeholderText,
  contentClassName,
  contentStyle,
  placeholderClassName,
  minHeight,
  maxHeight,
  role,
  tabIndex,
  autoCapitalize,
  autoComplete,
  "aria-activedescendant": ariaActivedescendant,
  "aria-autocomplete": ariaAutocomplete,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-owns": ariaOwns,
  "data-testid": dataTestId,
  dir,
  lang,
  spellCheck,
}: EditorProps);
```

Source: `packages/react-editor/src/EditorCodeHighlightPlugin.tsx`

```tsx
export function EditorCodeHighlightPlugin();
```

Source: `packages/react-editor/src/EditorCommentsPanel.tsx`

```tsx
export function EditorCommentsPanel({
  className,
  composerOpen,
  draft,
  pendingQuote,
  threads,
  onDraftChange,
  onSubmit,
  onCancel,
  onResolve,
  onRemove,
}: EditorCommentsPanelProps);
```

Source: `packages/react-editor/src/EditorComposer.tsx`

```tsx
export function EditorComposer({
  namespace = "VirtariEditor",
  preset = "core",
  initialValue = null,
  initialValueFormat = "json",
  activeMode = "rich-text",
  onChange,
  changeSerialization,
  onError = (error) => {
    throw error;
  },
  readOnly = false,
  autoFocus = false,
  features,
  linkMatchers = DEFAULT_LINK_MATCHERS,
  markdownTransformers = DEFAULT_MARKDOWN_TRANSFORMERS,
  editorRef,
  children,
}: EditorComposerProps);
```

Source: `packages/react-editor/src/EditorDraggableBlocks.tsx`

```tsx
export function EditorDraggableBlocks({
  anchorElement,
  className,
  placement = "inside",
}: EditorDraggableBlocksProps);
```

Source: `packages/react-editor/src/EditorDropdown.tsx`

```tsx
export function useEditorDropdown();
```

Source: `packages/react-editor/src/EditorDropdown.tsx`

```tsx
export function EditorDropdownItem({
  children,
  className,
  closeOnSelect = true,
  onSelect,
  title,
}: EditorDropdownItemProps);
```

Source: `packages/react-editor/src/EditorDropdown.tsx`

```tsx
export function EditorDropdownSeparator({
  className,
}: {
  className?: string;
});
```

Source: `packages/react-editor/src/EditorDropdown.tsx`

```tsx
export function EditorDropdown({
  autoFocusItems = true,
  children,
  className,
  closeOnTriggerMove = true,
  disabled,
  onOpenChange,
  stopCloseOnClickSelf = false,
  trigger,
}: EditorDropdownProps);
```

Source: `packages/react-editor/src/EditorField.tsx`

```tsx
export interface EditorFieldProps
  extends Omit<
      FieldProps,
      | keyof EditorProps
      | "children"
      | "controlId"
      | "disabled"
      | "invalid"
      | "required"
    >,
    Omit<EditorProps, "className" | "style"> {
  className?: string;
  style?: CSSProperties;
  editorClassName?: string;
  editorStyle?: CSSProperties;
  invalid?: boolean;
}
```

Source: `packages/react-editor/src/EditorField.tsx`

```tsx
export function EditorField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  style,
  editorClassName,
  editorStyle,
  invalid,
  id,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: EditorFieldProps);
```

Source: `packages/react-editor/src/EditorFloatingToolbar.tsx`

```tsx
export function EditorFloatingToolbar({
  className,
  showLinkActions = true,
  showCommentActions = true,
  onRequestComment,
  anchorElement,
}: EditorFloatingToolbarComponentProps);
```

Source: `packages/react-editor/src/EditorInsertMenu.tsx`

```tsx
export function EditorInsertMenu({
  className,
  items,
  label = DEFAULT_LABEL,
  compact = false,
  onOpenChange,
  onRequestMediaInsert,
  targetBlockElement,
}: EditorInsertMenuProps);
```

Source: `packages/react-editor/src/EditorMediaDialog.tsx`

```tsx
export function EditorMediaDialog({
  editor,
  kind,
  onOpenChange,
  open,
  targetBlockElement,
}: EditorMediaDialogProps);
```

Source: `packages/react-editor/src/EditorMediaNode.tsx`

```tsx
export type EditorMediaKind = "embed" | "image" | "video";
```

Source: `packages/react-editor/src/EditorMediaNode.tsx`

```tsx
export interface SerializedEditorMediaNode extends SerializedLexicalNode {
  alt: string;
  kind: EditorMediaKind;
  src: string;
  type: "vds-editor-media";
  version: 1;
}
```

Source: `packages/react-editor/src/EditorMediaNode.tsx`

```tsx
export function $createEditorMediaNode(
  kind: EditorMediaKind,
  src = "",
  alt = "",
);
```

Source: `packages/react-editor/src/EditorMediaNode.tsx`

```tsx
export function $isEditorMediaNode(
  node: LexicalNode | null | undefined,
): node is EditorMediaNode;
```

Source: `packages/react-editor/src/EditorModeSwitcher.tsx`

```tsx
export function EditorModeSwitcher({
  className,
  modes = ["rich-text", "markdown", "html"],
  labels,
  value,
  onChange,
}: EditorModeSwitcherControlProps);
```

Source: `packages/react-editor/src/EditorShortcutsPlugin.tsx`

```tsx
export function EditorShortcutsPlugin();
```

Source: `packages/react-editor/src/EditorSlashMenu.tsx`

```tsx
export function EditorSlashMenu({
  className,
  items,
}: EditorSlashMenuProps);
```

Source: `packages/react-editor/src/EditorSolidColorPicker.tsx`

```tsx
export function EditorSolidColorPicker({
  onChange,
  swatches,
  value,
}: EditorSolidColorPickerProps);
```

Source: `packages/react-editor/src/EditorSourcePanel.tsx`

```tsx
export function EditorSourcePanel({
  maxHeight,
  minHeight = "12rem",
  mode,
  onChange,
  value,
}: EditorSourcePanelProps);
```

Source: `packages/react-editor/src/EditorStatusBar.tsx`

```tsx
export function EditorStatusBar({
  className,
  showFeatureHints = true,
}: EditorStatusBarProps);
```

Source: `packages/react-editor/src/EditorTableHoverActions.tsx`

```tsx
export function EditorTableHoverActions({
  anchorElement,
  className,
}: EditorTableHoverActionsProps);
```

Source: `packages/react-editor/src/EditorToolbar.tsx`

```tsx
export function EditorToolbar({
  className,
  sticky = false,
  showClearButton = true,
  insertMenu,
  modeSwitcher,
  mode,
  onModeChange,
  onRequestComment,
  fontFamilies = DEFAULT_FONT_FAMILIES,
  fontSizes = DEFAULT_FONT_SIZES,
  textColorSwatches = DEFAULT_TEXT_COLOR_SWATCHES,
  highlightColorSwatches = DEFAULT_HIGHLIGHT_SWATCHES,
}: EditorToolbarProps);
```

Source: `packages/react-editor/src/EditorTrailingParagraphPlugin.tsx`

```tsx
export function EditorTrailingParagraphPlugin();
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorPreset = "core" | "pro";
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorValueFormat = "json" | "html" | "markdown";
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorCharset = "UTF-8" | "UTF-16";
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorMode = "rich-text" | "markdown" | "html";
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorElementAlignment =
  | "left"
  | "center"
  | "right"
  | "justify"
  | "start"
  | "end";
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorCharacterLimitOptions {
  maxLength: number;
  charset?: EditorCharset;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorMetrics {
  text: string;
  html: string;
  markdown: string;
  json: SerializedEditorState | null;
  characterCount: number;
  wordCount: number;
  isEmpty: boolean;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorChangePayload extends EditorMetrics {
  editor: LexicalEditor;
  editorState: EditorState;
  tags: Set<string>;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorChangeSerializationOptions {
  html?: boolean;
  markdown?: boolean;
  json?: boolean;
  debounceMs?: number;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorToolbarOption {
  label: string;
  value: string;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorColorSwatch {
  label: string;
  value: string;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorInsertMenuItem {
  key: string;
  title: string;
  description?: string;
  keywords?: string[];
  icon?: IconProps["icon"];
  shortcut?: string;
  run: (editor: LexicalEditor, targetBlockElement?: HTMLElement | null) => void;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorMediaInsertRequest {
  editor: LexicalEditor;
  kind: EditorMediaKind;
  targetBlockElement?: HTMLElement | null;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorInsertMenuProps {
  className?: string;
  items?: EditorInsertMenuItem[];
  label?: string;
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRequestMediaInsert?: (request: EditorMediaInsertRequest) => void;
  targetBlockElement?: HTMLElement | null;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export type EditorBlockToolsPlacement = "inside" | "edge";
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorBlockToolsProps {
  className?: string;
  placement?: EditorBlockToolsPlacement;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorStatusBarProps {
  className?: string;
  showFeatureHints?: boolean;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorSlashMenuItem {
  key: string;
  title: string;
  description?: string;
  keywords?: string[];
  icon?: IconProps["icon"];
  run: (editor: LexicalEditor) => void;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorSlashMenuProps {
  className?: string;
  items?: EditorSlashMenuItem[];
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorFloatingToolbarProps {
  className?: string;
  showLinkActions?: boolean;
  showCommentActions?: boolean;
  onRequestComment?: () => void;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorModeSwitcherProps {
  className?: string;
  modes?: EditorMode[];
  labels?: Partial<Record<EditorMode, string>>;
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
export interface EditorCommentThread {
  id: string;
  quote: string;
  body: string;
  createdAt: string;
  status: "open" | "resolved";
}
```

Source: `packages/react-editor/src/types.ts`

```tsx
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
```

## Source files

- `packages/react-editor/src/context.tsx`
- `packages/react-editor/src/defaults.ts`
- `packages/react-editor/src/editor-shortcuts.ts`
- `packages/react-editor/src/editor-utils.ts`
- `packages/react-editor/src/Editor.css`
- `packages/react-editor/src/Editor.tokens.css`
- `packages/react-editor/src/Editor.tsx`
- `packages/react-editor/src/EditorCodeHighlightPlugin.tsx`
- `packages/react-editor/src/EditorCommentsPanel.tsx`
- `packages/react-editor/src/EditorComposer.tsx`
- `packages/react-editor/src/EditorDraggableBlocks.tsx`
- `packages/react-editor/src/EditorDropdown.tsx`
- `packages/react-editor/src/EditorField.tsx`
- `packages/react-editor/src/EditorFloatingToolbar.tsx`
- `packages/react-editor/src/EditorInsertMenu.tsx`
- `packages/react-editor/src/EditorMediaDialog.tsx`
- `packages/react-editor/src/EditorMediaNode.tsx`
- `packages/react-editor/src/EditorModeSwitcher.tsx`
- `packages/react-editor/src/EditorShortcutsPlugin.tsx`
- `packages/react-editor/src/EditorSlashMenu.tsx`
- `packages/react-editor/src/EditorSolidColorPicker.tsx`
- `packages/react-editor/src/EditorSourcePanel.tsx`
- `packages/react-editor/src/EditorStatusBar.tsx`
- `packages/react-editor/src/EditorSurface.tsx`
- `packages/react-editor/src/EditorTableHoverActions.tsx`
- `packages/react-editor/src/EditorToolbar.tsx`
- `packages/react-editor/src/EditorTrailingParagraphPlugin.tsx`
- `packages/react-editor/src/index.core.ts`
- `packages/react-editor/src/index.ts`
- `packages/react-editor/src/theme.ts`
- `packages/react-editor/src/types.ts`
- `packages/react-editor/package.json`
