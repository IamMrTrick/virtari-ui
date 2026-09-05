---
"@virtari-packages/react-drawer": patch
---

Round all four corners when a drawer has a positive edge offset, using the existing drawer radius in every direction.

Apply floating gaps on every viewport edge and reserve both opening-axis gaps when calculating available size. Remove the panel's double scrollbar gutter so header, body, and footer own their padding without extra horizontal space.
