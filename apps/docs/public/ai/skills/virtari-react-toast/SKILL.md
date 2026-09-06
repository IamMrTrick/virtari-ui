---
name: virtari-react-toast
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-toast. Shared-store notifications with one Toaster renderer, action helpers, promise states and low-level toast primitives."
---

# @virtari-packages/react-toast

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-toast`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Mount one Toaster at the application shell and import react-toast/styles. Call toast({title, description, type, ...options}) or toast.success/error/warning/info/message(title, description?, options?). The named helpers take description as the second argument and options as the third.
- Retain returned IDs to dismiss or update a particular notification. toast.dismiss() with no ID removes all notifications; toastStore.update(id, patch) changes an existing one.
- toast.loading defaults duration to zero. toast.promise accepts a Promise or promise factory plus loading/success/error messages, updates the same notification, and returns a Promise that still rejects on failure; handle that rejection in application logic.
- Use action/actions, toast.withAction/withActions, undo or confirm for explicit notification actions. Action configuration supports label, onClick, variant and closeOnClick. Keep meaningful visible text in action labels.
- Toaster defaults position top-right, duration 4000ms, visibleToasts 3 and F8 viewport hotkey. Set label and closeLabel for localization. timerMode is parallel/sequential; pauseMode is hover/press, with hover also pausing for focus according to the documented API.
- Choose either the high-level shared Toaster/store path or compose ToastProvider, ToastViewport, ToastRoot, Title, Description, Action and Close for a custom low-level flow. These are distinct state/composition paths.

## Known limits and mistakes to avoid

- Multiple Toaster instances share one global store and modify its duration/cap settings; they do not create independent notification channels.
- toast.confirm is a notification action helper and does not provide AlertDialog focus trapping or blocking confirmation semantics.
- The current Toaster listens globally for Escape and dismisses the latest dismissible toast. Test coexistence with an open dialog so the same Escape does not unexpectedly dismiss unrelated UI.

Related package IDs: `react-alert`, `react-alert-dialog`, `react-button`, `react-spinner`. Discover their focused skills from the catalog; do not load all packages at once.
