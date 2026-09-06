# SegmentedControl

A single-choice control for changing a view or a setting. Use Tabs when the
selection controls associated tab panels; use SegmentedControl for radio-group
semantics.

```tsx
import { SegmentedControl, SegmentedControlItem } from '@virtari-packages/react-segmented-control';
import '@virtari-packages/tokens';
import '@virtari-packages/react-segmented-control/styles';

<SegmentedControl defaultValue="list" aria-label="Display view">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
</SegmentedControl>
```

The style entry includes the shared Tabs track styles. A separate Tabs style
import is unnecessary. Sizes are `sm`, `md` and `lg`; `fullWidth` expands the
group and `orientation="vertical"` stacks its options.

Track corners use the field radius, with inner corners reduced by the track
padding. Horizontal tracks become capsules in pill mode; vertical stacks keep
a finite field radius so their outer corners do not cut into the first and
last labels. Tabs and SegmentedControl share their icon/text layout.

Provide an accessible group label and clear option text. Native radio-group
keyboard navigation and disabled states are preserved. Direction resolves
from the explicit `dir` prop, then `DirectionProvider`, then the DOM ancestor;
the indicator follows runtime direction changes too.
