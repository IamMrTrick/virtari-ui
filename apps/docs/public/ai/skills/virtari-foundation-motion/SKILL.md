---
name: virtari-foundation-motion
description: "Use when implementing or reviewing Virtari Motion, transitions and effects. Reusable duration/easing pairs with reduced-motion behavior and explicit effect roles."
---

# Motion, transitions and effects

Reusable duration/easing pairs with reduced-motion behavior and explicit effect roles.

- Use duration roles 50/100/200/300/400/500ms and easing roles in, out, in-out, bounce, spring or ios. Transition presets pair a duration with easing, for example transition: opacity var(--vds-transition-base).
- Reduced-motion sets shared duration roles to 0ms at the root. New animation code must use those roles or implement equivalent reduced-motion handling.
- Fade, scale and physical/logical slide keyframes are available from the motion token sheet. Prefer inline-start/inline-end names for direction-dependent UI movement.
- Prefer semantic disabled colors; when opacity is needed use --vds-opacity-disabled rather than a new literal. It currently aliases opacity-50.
- Shadows, elevation aliases, gradients and blur/backdrop values are distinct. Filter tokens contain complete blur(...) expressions, not bare lengths. Use effects only when the intended surface calls for them.

## Pitfalls

- A token called spring is a cubic-bezier timing function, not a physics simulation or JavaScript lerp engine.
- Root reduced-motion durations do not disable an unrelated hardcoded animation duration.
- Current logical slide/fade variables explicitly override RTL but lack an explicit nested LTR reset. Validate nested direction scopes before relying on these variables there.
- Changing an element's opacity dims its text, border and focus treatment together. It does not disable interaction or communicate disabled semantics.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `motion`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
