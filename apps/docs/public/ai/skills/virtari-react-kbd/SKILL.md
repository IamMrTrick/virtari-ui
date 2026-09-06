---
name: virtari-react-kbd
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-kbd. Display semantic keycaps and platform-aware keyboard shortcut labels without binding keyboard events."
---

# @virtari-packages/react-kbd

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-kbd`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Kbd for literal key text and KbdShortcut combo=mod+k for a shortcut using the same grammar as useHotkey. KbdShortcut detects the platform unless platform is explicitly provided.
- Use platform=mac or platform=other only for a known remote platform or demonstration. The display uses Mac symbols or other-platform names with appropriate separators, and a hidden spoken label.
- Keep the shortcut presentation left-to-right within RTL UI. Use the dedicated --vds-radius-kbd role for keycaps; they are intentionally smaller and less rounded than a button or segmented rail.
- Pair display with utils useHotkey for actual registration and ariaKeyShortcuts on the interactive control where appropriate. Customize aria-label on KbdShortcut for a localized spoken description.

## Known limits and mistakes to avoid

- KbdShortcut is display only. Rendering it does not register a shortcut or open a command dialog.
- Do not hardcode the Command symbol for every OS or substitute raw platform sniffing in each screen; use the shared utils platform contract.

Related package IDs: `utils`, `react-command`, `react-button`. Discover their focused skills from the catalog; do not load all packages at once.
