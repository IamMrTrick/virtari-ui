# @virtari-packages/react-yoopta-editor API snapshot

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
  "./styles": {
    "style": "./dist/YooptaEditor.css",
    "default": "./dist/YooptaEditor.css"
  },
  "./tokens": {
    "style": "./dist/YooptaEditor.tokens.css",
    "default": "./dist/YooptaEditor.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `YooptaEditor` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaEditorProps` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YOOPTA_PLUGINS` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YOOPTA_MARKS` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `playgroundInitialValue` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `STARTER_CONTENT` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaContentValue` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaOnChangeOptions` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaPath` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaPathIndex` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaBlockData` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaBlock` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooptaPlugin` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `SlateElement` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `YooEditor` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `RenderBlockProps` (type) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `createYooptaEditor` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `Blocks` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `Elements` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `Marks` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.
- `Paths` (export) from `@virtari-packages/react-yoopta-editor`; source: `packages/react-yoopta-editor/src/index.ts`.

## Source type declarations

Source: `packages/react-yoopta-editor/src/chrome/ActionMenu.tsx`

```tsx
export type ActionMenuMode = { kind: "turnInto" } | { kind: "insert"; at: number };
```

Source: `packages/react-yoopta-editor/src/chrome/ActionMenu.tsx`

```tsx
export function ActionMenu({
  open,
  onOpenChange,
  anchor,
  placement = "bottom-start",
  mode = { kind: "turnInto" },
}: Props);
```

Source: `packages/react-yoopta-editor/src/chrome/BlockActions.tsx`

```tsx
export function BlockActions();
```

Source: `packages/react-yoopta-editor/src/chrome/BlockOptions.tsx`

```tsx
export function BlockOptions({ open, onOpenChange, blockId, anchor }: Props);
```

Source: `packages/react-yoopta-editor/src/chrome/pluginIcons.tsx`

```tsx
export function getPluginIcon(type: string, size = 18): ReactNode;
```

Source: `packages/react-yoopta-editor/src/chrome/pluginIcons.tsx`

```tsx
export function getPluginDisplay(
  plugin: { type: string; options?: { display?: { title?: string; description?: string } } } | undefined,
): { title: string; description?: string };
```

Source: `packages/react-yoopta-editor/src/chrome/SlashMenu.tsx`

```tsx
export function SlashMenu();
```

Source: `packages/react-yoopta-editor/src/chrome/TableHoverActions.tsx`

```tsx
export function TableHoverActions();
```

Source: `packages/react-yoopta-editor/src/chrome/Toolbar.tsx`

```tsx
export function Toolbar();
```

Source: `packages/react-yoopta-editor/src/elements/AccordionElements.tsx`

```tsx
export function AccordionListElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/AccordionElements.tsx`

```tsx
export function AccordionItemElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/AccordionElements.tsx`

```tsx
export function AccordionHeadingElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/AccordionElements.tsx`

```tsx
export function AccordionContentElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/CarouselElements.tsx`

```tsx
export function CarouselContainerElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/CarouselElements.tsx`

```tsx
export function CarouselListItemElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/FileElement.tsx`

```tsx
export function FileElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/ImageElement.tsx`

```tsx
export function ImageElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/MediaPicker.tsx`

```tsx
export type MediaPickerProps = {
  /** File MIME accept map for the upload tab. */
  accept?: Record<string, string[]>;
  /** Idle copy + icon shown in the dropzone. */
  uploadIcon: ReactNode;
  uploadHint: string;
  /** Idle copy + icon shown in the embed input row. */
  embedIcon: ReactNode;
  embedHint: string;
  embedPlaceholder: string;
  /** Disable the embed tab entirely (e.g. file-only blocks). */
  hideEmbed?: boolean;
  /** Wired to the upload hook's loading state. */
  uploading: boolean;
  uploadProgress?: number | null;
  uploadError?: string | null;
  /** Notified when the user drops/selects a file. */
  onFiles: (files: File[]) => void;
  /** Notified when the user submits a URL via the Embed tab. */
  onEmbed: (url: string) => void | Promise<void>;
  /** Validation message when embed URL is rejected. */
  embedError?: string | null;
};
```

Source: `packages/react-yoopta-editor/src/elements/MediaPicker.tsx`

```tsx
export function MediaPicker({
  accept,
  uploadIcon,
  uploadHint,
  embedIcon,
  embedHint,
  embedPlaceholder,
  hideEmbed,
  uploading,
  uploadProgress,
  uploadError,
  onFiles,
  onEmbed,
  embedError,
}: MediaPickerProps);
```

Source: `packages/react-yoopta-editor/src/elements/TabsElements.tsx`

```tsx
export function TabsContainerElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/TabsElements.tsx`

```tsx
export function TabsListElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/TabsElements.tsx`

```tsx
export function TabsItemHeadingElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/TabsElements.tsx`

```tsx
export function TabsItemContentElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/TodoListElement.tsx`

```tsx
export function TodoListElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/elements/VideoElement.tsx`

```tsx
export function VideoElement(renderProps: PluginElementRenderProps);
```

Source: `packages/react-yoopta-editor/src/YooptaEditor.tsx`

```tsx
export type YooptaEditorProps = {
  value?: YooptaContentValue;
  onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
  onPathChange?: (path: YooptaPath) => void;
  placeholder?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: CSSProperties;
};
```

Source: `packages/react-yoopta-editor/src/YooptaEditor.tsx`

```tsx
export function YooptaEditor({
  value,
  onChange,
  onPathChange,
  placeholder = "Type / to open menu, or start typing...",
  autoFocus,
  readOnly,
  className,
  style,
}: YooptaEditorProps);
```

## Source files

- `packages/react-yoopta-editor/src/chrome/ActionMenu.tsx`
- `packages/react-yoopta-editor/src/chrome/BlockActions.tsx`
- `packages/react-yoopta-editor/src/chrome/BlockOptions.tsx`
- `packages/react-yoopta-editor/src/chrome/pluginIcons.tsx`
- `packages/react-yoopta-editor/src/chrome/SlashMenu.tsx`
- `packages/react-yoopta-editor/src/chrome/TableHoverActions.tsx`
- `packages/react-yoopta-editor/src/chrome/Toolbar.tsx`
- `packages/react-yoopta-editor/src/css.d.ts`
- `packages/react-yoopta-editor/src/elements/AccordionElements.tsx`
- `packages/react-yoopta-editor/src/elements/CarouselElements.tsx`
- `packages/react-yoopta-editor/src/elements/FileElement.tsx`
- `packages/react-yoopta-editor/src/elements/ImageElement.tsx`
- `packages/react-yoopta-editor/src/elements/MediaPicker.tsx`
- `packages/react-yoopta-editor/src/elements/TabsElements.tsx`
- `packages/react-yoopta-editor/src/elements/TodoListElement.tsx`
- `packages/react-yoopta-editor/src/elements/VideoElement.tsx`
- `packages/react-yoopta-editor/src/index.ts`
- `packages/react-yoopta-editor/src/marks.ts`
- `packages/react-yoopta-editor/src/plugins.ts`
- `packages/react-yoopta-editor/src/starter-content.ts`
- `packages/react-yoopta-editor/src/uploads.ts`
- `packages/react-yoopta-editor/src/YooptaEditor.css`
- `packages/react-yoopta-editor/src/YooptaEditor.tokens.css`
- `packages/react-yoopta-editor/src/YooptaEditor.tsx`
- `packages/react-yoopta-editor/package.json`
