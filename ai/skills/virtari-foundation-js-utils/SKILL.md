---
name: virtari-foundation-js-utils
description: "Use when implementing or reviewing Virtari JavaScript and React utilities. Shared class, ref, native-form, direction and keyboard behavior with explicit contracts."
---

# JavaScript and React utilities

Shared class, ref, native-form, direction and keyboard behavior with explicit contracts.

- Import helpers from '@virtari-packages/utils'. cn joins truthy string arguments; useComposedRefs combines object/callback refs and supports React 19 callback cleanup.
- controlText groups adjacent plain text in vds-control-text spans and preserves consumer elements/fragments. Core supplies font-metric text-box trimming for supported browsers, with ordinary line boxes as fallback. Use this inside icon/text flex rows instead of fixed per-label transforms; arbitrary custom child components keep their own typography.
- useFormReset(ref, onReset, formId?) associates with the nearest form or an explicit document form ID and runs after cancellable native reset listeners via a microtask.
- useDirection(ref?) initially returns ltr for stable server markup, reads computed client direction, then observes dir changes on the target and its current ancestors.
- Bind platform-neutral shortcuts with useHotkey('mod+k', handler). Use formatCombo for visible keys, ariaKeyShortcuts for the bound action and shortcutLabel for spoken labels from the same combination.
- mod resolves to Meta on detected Apple hardware and Control elsewhere. useKeyboardPlatform provides hydration-stable display; getKeyboardPlatform is the direct runtime lookup.
- useHotkey defaults enabled and preventDefault to true, allows neither editable targets nor repeated keydown by default, and ignores already prevented and IME composition events. Scope target and opt into allowInInputs or allowRepeat only deliberately.

## Pitfalls

- cn is not clsx object syntax or tailwind-merge. It does not deduplicate or resolve conflicting classes.
- useDirection observes dir attributes, not arbitrary class/style/media changes or reparenting. Set dir explicitly for live locale changes.
- A displayed Kbd does not bind a shortcut. Bind behavior and expose the matching accessible shortcut on the action.
- Hotkey grammar splits on '+', has one final key and exact modifier matching; do not promise arbitrary key sequences or chord support.
- Calling formatCombo directly during server/client initial rendering can produce different platform text. Prefer useKeyboardPlatform when hydration consistency matters.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `js-utils`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
