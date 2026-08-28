# @virtari-packages/react-yoopta-editor

## 0.3.3

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

- Updated dependencies [4bfc69a]
  - @virtari-packages/react-accordion@0.3.1
  - @virtari-packages/react-button@0.4.2
  - @virtari-packages/react-file-upload@0.2.2
  - @virtari-packages/react-input@0.4.2
  - @virtari-packages/react-scroll-area@0.3.1
  - @virtari-packages/react-tabs@0.4.1

## 0.3.2

### Patch Changes

- Updated dependencies [e3f38c5]
  - @virtari-packages/react-input@0.4.1

## 0.3.1

### Patch Changes

- b893c0a: Fix typecheck failures in `react-yoopta-editor`:
  - `TabsElements`: move `variant="underline"` from `<Tabs>` (where it's not a valid prop) to `<TabsList>` (where the `TabsVariant` API lives).
  - `TableHoverActions`: cast `path` arrays to `never` to work around `@yoopta/table` declaring `Location` without importing it from `slate` (which makes TS resolve to the DOM `Location` interface).

- Updated dependencies [b893c0a]
  - @virtari-packages/react-button@0.4.1
  - @virtari-packages/react-input@0.4.0

## 0.3.0

### Minor Changes

- 9d56d6d: react-yoopta-editor: full chrome rewrite + Notion-style table + lucide-react removal.

  **react-yoopta-editor**
  - Drop `@yoopta/ui` and `lucide-react` entirely. All chrome (Toolbar, SlashMenu, ActionMenu, BlockOptions, BlockActions, TableHoverActions) is now reimplemented on `@yoopta/editor` primitives + Virtari design tokens with Tabler icons only.
  - New `Toolbar` — selection-anchored floating toolbar (B/I/U/S/Code/Highlight/Math) with preset highlight color popover.
  - New `SlashMenu` — auto-detects `/` typing via Slate `Editor.string` and filters available plugins; full keyboard nav.
  - New `ActionMenu` — turn-into / insert popover with searchable plugin list and Tabler icon mapping for 28 plugin types.
  - New `BlockOptions` — popover (Turn into / Duplicate / Copy link / Delete) anchored to the block grip.
  - New `BlockActions` — hover plus + drag-handle bar with native HTML5 drag-and-drop block reordering.
  - New `TableHoverActions` — Notion-style table chrome:
    - Add column / add row buttons on the right and bottom edges.
    - Per-column drag handles on top of every column; per-row drag handles on the left of every row.
    - Click handle → highlights the entire column / row (cells get `data-selected` with primary-color tint).
    - Drag handle → reorders columns / rows via `TableCommands.moveTableColumn` / `moveTableRow` with a live drop indicator line.
    - `Esc` clears the selection; `Backspace` / `Delete` removes the selected row / column.
    - Real-time reposition via `ResizeObserver` + `MutationObserver` + post-mutation `setTimeout` retries (handles Yoopta's async state batching).
    - 40 px hover buffer plus `mouseenter` cancellation so handles stay alive while the cursor travels to them.
  - New custom element renderers:
    - `TodoListElement` — Tabler checkbox icon, line-through when checked, toggles `props.checked` via Slate `Transforms.setNodes`.
    - `TabsElements` (4 levels) — wraps `tabs-container` / `tabs-list` / `tabs-item-heading` / `tabs-item-content` in the Virtari Tabs primitive.
    - `CarouselElements` — `carousel-container` becomes a horizontal `scroll-snap` rail; each `carousel-list-item` is a fixed-width slide.
  - Suppress the leaf-level slash placeholder inside table cells so `Type /…` no longer leaks into empty cells.
  - `STARTER_CONTENT` now ships interactive Tabs / Accordion / Table samples for the playground.

  **react-popover**
  - Re-export `PopoverAnchor` so consumers can position popovers against virtual references (used by the Yoopta chrome).

  **react-file-upload**
  - `FileUploadDropzone` is now click-anywhere: `noClick: true` was removed and `FileUploadTrigger` calls `e.stopPropagation()` to prevent the dropzone's bubbled click from re-opening the picker.

### Patch Changes

- Updated dependencies [9d56d6d]
  - @virtari-packages/react-popover@0.4.1
  - @virtari-packages/react-file-upload@0.2.1

## 0.2.2

### Patch Changes

- Updated dependencies [bdd9b44]
  - @virtari-packages/react-button@0.4.0

## 0.2.1

### Patch Changes

- Updated dependencies [b9889b9]
- Updated dependencies
  - @virtari-packages/react-button@0.3.1
  - @virtari-packages/react-input@0.3.1

## 0.2.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0
  - @virtari-packages/react-accordion@0.3.0
  - @virtari-packages/react-button@0.3.0
  - @virtari-packages/react-dropdown-menu@0.4.0
  - @virtari-packages/react-file-upload@0.2.0
  - @virtari-packages/react-icons@0.3.0
  - @virtari-packages/react-input@0.3.0
  - @virtari-packages/react-popover@0.4.0
  - @virtari-packages/react-scroll-area@0.3.0
  - @virtari-packages/react-tabs@0.4.0
  - @virtari-packages/react-tooltip@0.4.0
