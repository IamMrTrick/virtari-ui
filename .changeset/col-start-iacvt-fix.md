---
"@virtari-packages/react-layout": patch
---

fix(react-layout): Col span collapsing below 640px and broken `start` prop

The base rule declared `grid-column-start: var(--col-start)` unconditionally.
With `--col-start` unset (the common case) the declaration is invalid at
computed-value time, which resets `grid-column-start` to `auto` and wipes the
span applied by the `grid-column` shorthand on the previous line — every
`<Col span={n}>` collapsed to a single grid track below 640px. At ≥640px the
responsive `grid-column` shorthands re-declared later in the file masked the
collapse but also overrode the longhand, making `start` inert there; and when
the longhand did apply (<640px with `start` set), it clobbered the span, which
lives in the shorthand's start component.

`Col.tsx` now composes `start` directly into the emitted `--col-span-*` values
(`start={3} span={6}` → `grid-column: 3 / span 6`; `start` + `span="full"` →
`3 / -1`), and the bare `grid-column-start` declaration is gone. `start` now
works at every breakpoint, rides through the `--col-span-sm/md/lg/xl` fallback
chain, and no longer cancels `span`. `order: var(--col-order)` had the same
invalid-at-computed-value-time pattern (harmlessly, since it resolved to the
default `0`) and gained an explicit `0` fallback. The inline `--col-start`
custom property is no longer emitted or consumed.

Consumers that worked around the collapse by re-asserting the base span under
`max-width: 639.98px` can drop that override after upgrading.
