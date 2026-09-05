---
"@virtari-packages/react-drawer": patch
---

Replace overdrag scaling with a bounded size extension along the opening axis. The docked edge stays fixed and content remains unscaled. The free edge extends by at most 14px and returns smoothly on release. Disable the extension with stretch={false}; reduced motion and virtual keyboard interactions also suppress it.

Add bounded elastic handle feedback when pulling past the open limit, with a primary alpha halo and a soft release. Support all drawer directions and reduced motion without scaling the panel.
