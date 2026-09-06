---
name: virtari-react-dialog
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-dialog. Accessible modal or nonmodal dialog with internally portaled content, shared sections and explicit dismissal controls."
---

# @virtari-packages/react-dialog

Use the existing package and its composition API. Verify the installed version against this snapshot (2.0.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-dialog`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Dialog > DialogTrigger asChild and DialogContent. Content creates DialogPortal and DialogOverlay itself; place Header, Title, Description, Body and Footer inside it without a second portal/overlay pair.
- Root is the dialog primitive and accepts open/defaultOpen/onOpenChange and modal. Preserve DialogTitle and meaningful DialogDescription; visually hide a title with the system screen-reader utility if necessary.
- Use showCloseButton and closeButtonLabel for the built-in close icon, or DialogClose asChild around a Button for another closing action. Supply accessible labels in the application's language.
- Content separates size sm/md/lg/xl/full, animation scale/fade/slide-up/slide-down/zoom/bounce/none, intent, backdrop and responsive. responsive enables full viewport treatment on narrow screens; container chooses the portal destination.
- Use preventCloseOnOutsideClick and preventCloseOnEscape only when the workflow needs them. Consumer onEscapeKeyDown/onPointerDownOutside/onInteractOutside handlers run first and may prevent the default behavior.
- Keep section padding on DialogHeader, DialogBody and DialogFooter. Content is a radius host; use system nested-surface guidance for cards within it rather than independent corner constants.

## Known limits and mistakes to avoid

- Adding a DialogOverlay outside DialogContent duplicates the backdrop because Content owns an overlay already.
- Replacing title/description primitives with visually similar plain text loses the primitive's accessible naming relationships.
- Preventing all dismissal paths requires a visible, keyboard-accessible completion or cancel action.

Related package IDs: `react-alert-dialog`, `react-drawer`, `react-command`, `react-button`, `react-card`. Discover their focused skills from the catalog; do not load all packages at once.
