# Drawer page audit

Reviewed `apps/docs/src/pages/DrawerPage.tsx`, `packages/react-drawer/src/*`, the package export map, and focused Drawer guidance. Package behavior and the actual docs route were checked in Chromium on 2026-09-06.

## Findings and corrections

- Preserved the existing mouse-release recovery: capture-phase release listeners, primary-button checks on movement, secondary-button handling, and cancellation/blur cleanup already exist in the package. No replacement drag implementation was needed.
- Outside handles docked through logical insets but translated in a fixed physical direction. This moved side handles inside RTL drawers and shifted top/bottom handles off center. `Drawer.css` now mirrors these translations in RTL.
- Outside-handle mode needs visible overflow. Its header/footer backgrounds consequently painted square corners over a floating shell's rounded corners. The first/last painted section now inherits the appropriate shell corners while the handle remains outside. This defect was visible in the narrow OLED screenshot before the fix and corrected afterward.
- The Persistent example claimed its action could close the drawer, but `DrawerClose` correctly obeys `dismissible=false`. `DemoDrawer` now owns `open`, and its persistent Done action explicitly completes that controlled workflow. Other examples retain ordinary `DrawerClose` actions.
- Added keyboard buttons for the named stage and minimized demonstrations. Stage buttons precede the handle so the smallest resting stage does not crop them. Corrected snap-size prose (numbers only; fractions refer to measured drawer size), initial-focus guidance, and blanket keyboard/IME claims.
- Existing static package CodeBlock/InlineCode migration retained. This review did not modify shared docs rendering.

## Checks and evidence

- `pnpm --filter @virtari-packages/react-drawer typecheck` passed; focused `git diff --check` passed.
- Existing `/tests/drawer-release.html`: all five browser assertions passed, including lost mouseup recovery, later hover stability, stopped propagation, secondary-button release, and a fresh primary release.
- New package-only `/tests/drawer-quality.html?direction=right&rtl&outside`: eight initial assertions passed for floating clearances, radii, slot padding, content containment, outside handle placement, drag start, unscaled content, and cleanup. The later slot-background assertion covers the additional visual fix.
- `/tests/drawer-quality.html?rtl&outside&theme=dark-oled` at 360 × 740: all nine assertions passed after the final package fix. Screenshot inspected: all four visible corners rounded, handle centered outside, Persian/Latin description wrapped, padded body scrolled internally, and narrow footer actions stacked.
- Actual `/#drawer` route: Persistent ignored Escape; Done closed it and returned focus to its trigger. Named stage buttons responded to Enter and updated pressed state. Minimize/Expand buttons switched state through keyboard activation. Default opening focus was the drawer container in the package fixture and docs dialogs.
- Source verification: full/fixed available size subtracts the offset twice; floating cross-axis insets preserve every-edge clearance. Header/body/footer own their token padding. Existing opening easing is `cubic-bezier(0.22, 1.08, 0.36, 1)`; elastic extension is bounded and leaves content unscaled. Reduced-motion token durations resolve to zero, the drag extension is disabled, and the handle cue removes motion.

## Scope and remaining limits

This was a focused regression audit, not a complete theme/direction/device matrix. Top/left outside-handle fixes and reduced-motion media behavior were source-reviewed; physical touch/pen capture, OS blur, real mobile keyboards, and assistive technology were not exercised. Dark/OLED narrow and light RTL side were rendered; no color role changed, so no new color contrast claim is made. Scoped portals still require theme attributes on the portal content or document root. The handle remains decorative; consumers must supply keyboard stage actions where needed. Existing fractional-stage behavior may intentionally translate body content beyond the visible viewport. Root owns final AI generation and repository integration checks.
