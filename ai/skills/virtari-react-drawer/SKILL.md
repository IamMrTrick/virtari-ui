---
name: virtari-react-drawer
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-drawer. Edge drawer with named snap states, minimized stages, floating offsets and guarded pointer/touch dragging."
---

# @virtari-packages/react-drawer

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-drawer`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Drawer, DrawerTrigger asChild, DrawerContent, DrawerHandle, DrawerHeader/Title/Description, DrawerBody and DrawerFooter. DrawerContent already portals and renders DrawerOverlay; section components own their padding and DrawerBody supplies the tracked scroll region.
- Drawer direction is top/bottom/left/right; horizontal docking and gestures mirror with computed RTL direction. sizeMode is adaptive/full/fixed; fixed size accepts pixels, a CSS length string, or a viewport-info callback.
- Floating mode is selected with offset, not a float prop. A positive resolved offset sets data-floating and applies edge clearance and rounded corners. offset can be one declared size or a directional map.
- Use either snapPoints or openStates with stable id and numeric size; named openStates take precedence. Snap values between zero and one are fractions of the measured drawer size; larger values are pixels. activeOpenState/onActiveOpenStateChange or activeSnapPoint/onActiveSnapPointChange control the chosen stage.
- Root open/onOpenChange controls visibility independently of the active stage. minimizedState/minimizedSize adds a minimized stage that becomes nonmodal. snapBehavior defaults to staged; closest selects the other supported snapping policy.
- stretch defaults true and extends the anchored size on overdrag without scaling child content. scaleBackground is a separate opt-in effect and defaults false. Preserve the library transform/drag lifecycle rather than layering a consumer scale animation on the same content node.
- Use dragHandleOnly for restricted dragging and data-vds-drawer-no-drag on custom interactive surfaces. Keep a DrawerHandle mounted when dragHandleOnly is enabled. Existing handlers end mouse/pointer sessions on release, pointer cancellation/lost capture, blur, or a move with no primary button pressed.
- preventAutoFocus defaults true: the content receives initial focus instead of an input, avoiding automatic keyboard opening. Set false for primitive autofocus, or use Content onOpenAutoFocus to implement a deliberate focus target. dismissible=false prevents built-in close requests, Escape and outside dismissal.

## Known limits and mistakes to avoid

- DrawerHandle is aria-hidden visual drag affordance, not a keyboard slider. Provide explicit reachable controls for state changes needed without dragging.
- Do not interpret a snap fraction as a viewport percentage: it is relative to the measured drawer size.
- Do not overwrite the content transform or spread custom pointer handlers that bypass the composed lifecycle; this can reintroduce stuck dragging or unanchored scaling.
- With dismissible=false, a DrawerClose request is blocked by the same root guard; a controlled owner must deliberately change open when its workflow completes.

Related package IDs: `react-dialog`, `react-button`, `react-scroll-area`, `react-form`. Discover their focused skills from the catalog; do not load all packages at once.
