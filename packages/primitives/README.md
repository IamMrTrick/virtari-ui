# @virtari-packages/primitives

The headless behaviour layer under every `@virtari-packages/react-*` component:
focus management, keyboard navigation, portalling, dismissable layers, and
floating positioning. No styles, no opinions about markup — just correct,
accessible behaviour.

This package is **owned and maintained in-tree**. It is not a re-export of a
third-party dependency, and it does not track an upstream release cycle.

## Origin

It began as a fork of [Radix Primitives](https://github.com/radix-ui/primitives)
(MIT, Copyright (c) 2022 WorkOS) and has been adapted for Virtari:

- every generated DOM id is prefixed `vds-` instead of `radix-`
- every emitted attribute is `data-vds-*` instead of `data-radix-*`
- every emitted CSS custom property is `--vds-*` instead of `--radix-*`

See `LICENSE` for the full attribution notice, which must be retained.

## Usage

Import the primitive you need by subpath:

```tsx
import * as SelectPrimitive from "@virtari-packages/primitives/select";
import { Slot } from "@virtari-packages/primitives/slot";
```

## Available primitives

- `@virtari-packages/primitives/accordion`
- `@virtari-packages/primitives/alert-dialog`
- `@virtari-packages/primitives/avatar`
- `@virtari-packages/primitives/checkbox`
- `@virtari-packages/primitives/collapsible`
- `@virtari-packages/primitives/dialog`
- `@virtari-packages/primitives/direction`
- `@virtari-packages/primitives/dropdown-menu`
- `@virtari-packages/primitives/label`
- `@virtari-packages/primitives/popover`
- `@virtari-packages/primitives/progress`
- `@virtari-packages/primitives/radio-group`
- `@virtari-packages/primitives/scroll-area`
- `@virtari-packages/primitives/select`
- `@virtari-packages/primitives/separator`
- `@virtari-packages/primitives/slider`
- `@virtari-packages/primitives/slot`
- `@virtari-packages/primitives/switch`
- `@virtari-packages/primitives/tabs`
- `@virtari-packages/primitives/toast`
- `@virtari-packages/primitives/toggle`
- `@virtari-packages/primitives/tooltip`

Lower-level building blocks (`collection`, `dismissable-layer`, `focus-scope`,
`popper`, `portal`, `presence`, `primitive`, `roving-focus`, `use-controllable-state`,
and the `use-*` hooks) are exported on the same pattern and are considered
internal — they may change without a major bump.

## What we emit into the DOM

| Kind | Example |
| --- | --- |
| Generated ids | `vds-«r4o»` |
| Attributes | `data-vds-popper-content-wrapper`, `data-vds-focus-guard` |
| CSS variables | `--vds-popper-available-width`, `--vds-select-trigger-width` |
