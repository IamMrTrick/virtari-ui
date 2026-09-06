---
name: virtari-react-alert-dialog
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-alert-dialog. Explicit confirmation dialog with alertdialog semantics, cancel-first focus and shared Dialog appearance."
---

# @virtari-packages/react-alert-dialog

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-alert-dialog`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose AlertDialog, optional AlertDialogTrigger asChild, and AlertDialogContent containing Title, Description, Body and Footer as needed. Content already creates its portal and overlay.
- Use AlertDialogAction asChild and AlertDialogCancel asChild around Virtari Button elements. These wrappers supply behavior without their own button appearance; Cancel is the primitive's initial focus target.
- Import both @virtari-packages/react-dialog/styles and @virtari-packages/react-alert-dialog/styles. The alert package stylesheet is intentionally a no-op; appearance comes from the shared vds-dialog classes.
- Content supports sm/md/lg/xl/full, animation, intent, backdrop, responsive and container. It defaults intent to destructive. For non-destructive confirmations choose the appropriate intent explicitly.
- Root supports controlled open/onOpenChange. Outside interactions are prevented by the underlying alert primitive. Escape is not blocked by current implementation; if the workflow explicitly requires this, preventDefault in onEscapeKeyDown and provide an explicit Cancel action.

## Known limits and mistakes to avoid

- Do not rely on the source header comment claiming Escape is disabled; the underlying primitive does not implement that default.
- Do not add a second AlertDialogPortal/Overlay around AlertDialogContent, and do not pass Dialog-only showCloseButton or preventCloseOnOutsideClick props.
- Do not present toast.confirm as a modal replacement for a decision that must block the workflow.

Related package IDs: `react-dialog`, `react-button`, `react-toast`. Discover their focused skills from the catalog; do not load all packages at once.
