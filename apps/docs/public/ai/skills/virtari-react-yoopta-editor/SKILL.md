---
name: virtari-react-yoopta-editor
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-yoopta-editor. Yoopta block editor with Virtari chrome and plugins, distinct document state and extension exports."
---

# @virtari-packages/react-yoopta-editor

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-yoopta-editor`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use YooptaEditor with a YooptaContentValue and onChange(value, options). The document is a keyed block object, not Lexical JSON, HTML, Markdown or an array of strings. STARTER_CONTENT is a full playground document; omitting value creates an empty paragraph.
- The wrapper creates one engine instance and preserves identity when a parent echoes the current document. A different external document is applied without saving history and remounts the block view; undefined after initialization retains current content, while an empty object replaces it with an empty paragraph.
- readOnly is applied to the existing editor instance on rerender. autoFocus, placeholder and onPathChange are explicit wrapper props; className/style apply to the outer container.
- Load the package /styles entry for Virtari chrome and tokens. The editor imports KaTeX CSS as a module side effect; the consuming bundler must handle CSS imports.
- YOOPTA_PLUGINS, YOOPTA_MARKS, createYooptaEditor, Blocks, Elements, Marks and Paths are public extension building blocks. For custom plugins or upload handlers, compose the underlying Yoopta editor using these exports; the assembled wrapper does not expose a plugins or upload prop.
- Keep external updates intentional and preserve selection while persisting ordinary edits. Serialize application form state explicitly; the wrapper has no native input name or automatic form submission value.

## Known limits and mistakes to avoid

- Built-in image, video and file handlers create browser object URLs. These are previews, not uploaded or durable assets; persisting the document does not preserve their contents after the browser session. No remote storage service is implemented.
- The wrapper does not accept arbitrary HTML/ARIA attributes, dir, an editor ref or a label prop. Do not invent these props; accessible labeling or deeper locale/direction integration requires supported underlying-engine composition or a wrapper improvement.
- The mounted editor has an internal 100-pixel bottom padding. Outer style changes do not necessarily control the internal content padding.
- Deep comparison of external values uses JSON.stringify; large documents incur serialization work. Avoid constructing unrelated external document values on every parent render.
- DOM selection, portals, uploads and block layout are browser behaviors. Verify client initialization and hydration in the target framework; the wrapper provides no SSR-specific adapter.
- This package and react-editor use different engines and document formats. They are not interchangeable controlled-input implementations and have no built-in bidirectional migration.

Related package IDs: `react-editor`, `react-file-upload`, `react-popover`, `react-tabs`, `react-tooltip`. Discover their focused skills from the catalog; do not load all packages at once.
