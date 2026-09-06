---
name: virtari-react-command
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-command. cmdk-based searchable command collection with optional controlled dialog and platform-aware shortcut hints."
---

# @virtari-packages/react-command

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-command`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose CommandRoot with CommandInput and CommandList; put CommandGroup, CommandItem, CommandEmpty and optional Loading/Separator inside. Equivalent namespaced exports are Command.Root/Input/List/Group/Item/Empty/Loading/Separator.
- CommandDialog is controlled: provide open and onOpenChange. It adds CommandRoot internally, so put Input/List children directly inside the dialog rather than nesting another Root.
- No global hotkey is bound by default. Opt in with hotkey='mod+k' (or a string array); this toggle is allowed while an input is focused. Match any displayed key hint with the actual binding.
- CommandItem shortcut is display-only, rendered by KbdShortcut for the current platform. Bind the real action with the exported useHotkey if a global keyboard action is intended; use item onSelect for palette activation.
- Use item leftSection/rightSection for aligned supporting content. leftSection is aria-hidden, so put the action's accessible text in children. Native cmdk value/filter/shouldFilter and input value/onValueChange behavior are inherited rather than replaced.
- CommandDialog supplies a hidden accessible title by default and restores focus to the actual opener on close. Consumer autofocus handlers can prevent its restoration. Its default md width is the command-specific 40rem ceiling; other sizes use the Dialog ramp.
- Import react-command/styles plus react-dialog/styles for CommandDialog and react-kbd/styles for shortcut badges; component CSS is not auto-imported by JavaScript.

## Known limits and mistakes to avoid

- A shortcut label does not register a handler; avoid duplicate bindings between CommandDialog hotkey and a separate useHotkey for the same toggle.
- DialogContent owns the portal and backdrop used by CommandDialog. Do not add a second DialogPortal or DialogOverlay around it.
- Command is the namespaced object, not a JSX root component. Use Command.Root or CommandRoot.

Related package IDs: `react-dialog`, `react-kbd`, `react-icons`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
