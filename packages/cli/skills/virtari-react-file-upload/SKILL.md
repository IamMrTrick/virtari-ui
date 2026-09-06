---
name: virtari-react-file-upload
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-file-upload. File selection/dropzone composition, previews and application-driven upload progress."
---

# @virtari-packages/react-file-upload

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-file-upload`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose FileUpload.Root, Dropzone, Trigger, List, Item and Preview. Item exposes Name, Size, Remove and Progress subcomponents through the namespace; provide each Item its File object.
- Use files/defaultFiles/onFilesChange for selection state, accept as a react-dropzone MIME-to-extension map, minSize/maxSize in bytes, maxFiles and multiple (false by default). Handle onReject with user-visible actionable feedback.
- Include the keyboard-operable Trigger: dropzone keyboard handling is intentionally disabled. Use the Dropzone render state for drag acceptance/rejection feedback without relying on color alone.
- FileUpload.Input is a separate styled native file input with an accept string, native onChange event, name/form and input ref; it is not the dropzone root's controlled files adapter.
- Perform upload requests, cancellation, retries and persistence in the application. Pass measured progress to Item/progress; Preview manages its temporary object URL lifecycle.

## Known limits and mistakes to avoid

- The package selects files; it does not upload them. Root.accept and Input.accept intentionally have different shapes.
- Root does not expose native form serialization or reset for its File[] state; build FormData from selected files and reset state explicitly.
- Item.Remove does not automatically consume the root disabled state; pass disabled when removal must also be locked.

Related package IDs: `react-form`, `react-progress`, `react-button`, `react-fieldset`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
