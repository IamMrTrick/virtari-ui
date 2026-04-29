---
"@virtari-packages/react-yoopta-editor": minor
"@virtari-packages/react-popover": patch
"@virtari-packages/react-file-upload": patch
---

react-yoopta-editor: full chrome rewrite + Notion-style table + lucide-react removal.

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
