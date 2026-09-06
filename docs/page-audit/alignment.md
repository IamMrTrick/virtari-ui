# Focused alignment correction

The user paused the broad page review because of cost and remaining visible text/icon misalignment. No new page agents are running; unfinished pages remain Pending in README.md.

Earlier checks centered CSS line boxes but did not establish optical text alignment. The default Vazirmatn font gives Latin labels asymmetric visual space inside those boxes. Core now provides `vds-control-text` using the browser's `text-box: trim-both cap alphabetic` metrics; unsupported browsers retain ordinary line boxes. This trims layout leading, not painted glyphs, and does not introduce per-label pixel transforms or alter font tokens.

The shared `controlText` utility groups adjacent plain text into a span, preserves consumer elements, and handles fragments. Button, Chip, Tabs and SegmentedControl use it for text next to icons. Badge and Nav use the same text class on their existing label slots. ChipLabel retains a full line-height container around trimmed text, and navigation keeps vertical glyph overflow visible. Opaque custom child components retain their own typography; the helper does not rewrite arbitrary consumer components.

`/tests/control-alignment.html` provides a visible before/after comparison for Button, mixed icon/text Button, Chip, Badge and Persian labels under Vazirmatn, Inter and Arial. The coordinator inspected the actual Chromium rendering rather than relying only on centered bounding boxes. This does not guarantee identical optical balance for every string, font override or unsupported browser.

Reference: [CSS text-box metrics](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-edge).
