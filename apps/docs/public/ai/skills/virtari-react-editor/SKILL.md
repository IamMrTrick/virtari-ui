---
name: virtari-react-editor
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-editor. Lexical rich-text editor with a composable core, optional productivity chrome, source modes and field integration."
---

# @virtari-packages/react-editor

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-editor`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Editor or EditorField from the root export for assembled UI. Use EditorComposer plus EditorSurface from /core for custom composition; EditorParts is an alternate namespace for the assembled package parts. Load /styles, which includes editor tokens and imports the shared Virtari control styles listed at the top of Editor.css.
- Editor defaults to preset='pro'; EditorComposer defaults to 'core'. Feature overrides are merged through resolveEditorFeatures. The core preset already includes links, lists, code and history; it is not plain text.
- initialValue and initialValueFormat='json|html|markdown' initialize the Lexical state. This is not a controlled value/onValueChange contract. Capture changes with onChange and use editorRef for explicit document operations; keep the editor identity stable during ordinary typing.
- EditorComposer changeSerialization explicitly enables html, markdown or json in onChange and optionally debounces serialization. All three are false by default: onChange still includes text metrics, editorState, editor and tags, but callers must not expect populated serialization fields unless enabled.
- Use EditorField for a visible label plus description/error/counter association. A bare EditorSurface needs an accessible label or aria-labelledby. Its ref points to the editor stage wrapper; editorRef is the separate Lexical instance reference.
- mode/defaultMode/onModeChange control rich-text, markdown and HTML presentation. Source-mode change payloads contain the edited source in its matching field and json=null; do not assume every mode produces identical serialized output.
- readOnly updates Lexical editability. If using characterLimit, choose maxLength and charset deliberately; UTF-16 code units and UTF-8 bytes are not user-perceived grapheme counts.

## Known limits and mistakes to avoid

- Top-level EditorProps inherits changeSerialization, but Editor currently does not forward it to EditorComposer. Use custom Composer composition for serialization options or explicitly serialize from editorState; do not document the top-level prop as working until fixed.
- EditorSurface accepts placeholderText but currently does not apply it. Give the contenteditable an explicit accessible label; placeholder text is not a label.
- HTML initialization calls DOMParser. Treat editor initialization and DOM-backed tools as browser interactions and verify the consumer's SSR/hydration boundary rather than claiming unconditional SSR support.
- The editor does not provide a native form value, required-field validation or a hidden input automatically. Serialize into application form state and implement submission/validation there.
- Comments are held in local component state and reported through onCommentsChange, without an initialComments or controlled comments prop. This is not persistent collaborative commenting.
- HTML parsing and export are format conversion, not a general untrusted-HTML sanitizer. Validate stored content and URLs in the consuming application's rendering pipeline.

Related package IDs: `react-fieldset`, `react-yoopta-editor`, `react-code`, `react-tabs`, `react-file-upload`. Discover their focused skills from the catalog; do not load all packages at once.
