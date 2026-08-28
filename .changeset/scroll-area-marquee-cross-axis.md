---
"@virtari-packages/react-scroll-area": patch
---

Fix marquee cross-axis alignment for mixed-height children.

- Centre marquee items on the cross axis (`align-items: center` on `.vds-scroll-area-marquee`), so text, dot separators, and logos of different sizes share a midline instead of stretching. The vertical variant inherits the same rule, centring items on the inline axis.
- Make each `.vds-scroll-area-marquee-item` wrapper a centring flex so inline-level children no longer sit on the text baseline and hang low.
