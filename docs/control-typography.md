# Control typography and geometry

Controls center the complete CSS line box using flex alignment and equal block padding. The shared unitless control leading is 1.5 in both writing directions. Minimum heights let larger user text grow the control instead of clipping it. Icons occupy separate non-shrinking slots; the normal gap is 8px and compact gap 4px, both semantic tokens. Native controls inherit the chosen font, and browser text adjustment is retained at 100%.

The old global 1.5px label translation and asymmetric toggle padding depended on one font. Shared optical and indicator offset defaults are now zero. The optical token remains an opt-in calibration escape hatch for a specific, measured font; do not use one translation for all typefaces.

Font ascent/descent and fallback runs determine glyph placement, so centering line boxes is consistent but does not guarantee identical optical centering for every arbitrary font. Latin cap-height trimming should not be applied globally to Persian marks or mixed-script labels. CSS font metrics and line box behavior are defined in [CSS Inline Layout](https://www.w3.org/TR/css-inline-3/).

## Regression page

Run the docs development server and open /tests/control-geometry.html. It reports 48 checks for Button, Chip, Badge and Toggle in Arial, Georgia and monospace, LTR/RTL, 14px and enlarged 24px text. Checks cover label-box centering where the component has a label slot, symmetric padding, and line-box containment. The page also provides mixed-script visual samples for manual inspection; it does not assert optical glyph alignment or replace real iPhone/browser testing.
