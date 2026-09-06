# Virtari Design System — Agent Integration Guide

Complete reference for an AI coding agent on how to consume `@virtari-packages/*` in a React project.

---

## 1. What this is

A private React + CSS design system published to **GitHub Packages** under the `Virtari-Packages` organization. 49 independent packages, all under the scope `@virtari-packages/*`. Every package ships ESM + CJS + CSS.

Three architectural rules that matter for every component:

- **Token-driven.** Every color, radius, spacing, typography value comes from a CSS custom property like `--vds-color-primary-500`. Override that variable and the component reflects it instantly, no rebuild.
- **Logical properties + RTL-safe.** Components use `margin-inline`, `padding-block`, `inset-inline-start` — they flip correctly when the host document sets `dir="rtl"`.
- **Styles live in `@layer design-system.components`.** Consumer CSS can always override without `!important`.

---

## 2. One-time authentication setup

Packages are private. Before any install, create a `.npmrc` (globally or per-project) with a GitHub Personal Access Token that has the `read:packages` scope.

### Generate the token
1. Go to https://github.com/settings/tokens → **Generate new token (classic)**.
2. Scopes: check only **`read:packages`**.
3. Copy the token (starts with `ghp_…`).

### `.npmrc` (global — recommended)
Create or append to `~/.npmrc` (`%USERPROFILE%\.npmrc` on Windows):

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_YOUR_READ_TOKEN
```

### `.npmrc` (per-project)
Same content, placed at the repo root. **Add `.npmrc` to `.gitignore`** if the token is hard-coded, or use `${GITHUB_TOKEN}` and export the env var instead:

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Verify auth works
```bash
npm view @virtari-packages/react-button version
# should print a version like 0.2.0
```

---

## 3. Install

Every package is optional and independent. Always install the three foundations; then add the components you actually use.

```bash
# foundations — always
pnpm add @virtari-packages/tokens @virtari-packages/core @virtari-packages/utilities

# components — pick as needed
pnpm add @virtari-packages/react-button @virtari-packages/react-input @virtari-packages/react-dialog
```

### Peer dependencies
`react` and `react-dom` at `^18` or `^19`. Some packages have optional peers (noted in their own README):

- `react-data-table` optionally uses `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` for column dragging.
- `react-icons` re-exports `@tabler/icons-react` icons. Install `@tabler/icons-react` if importing individual icons.

---

## 4. Bootstrap the app

Do this **once** at the entry file (`main.tsx` / `app/layout.tsx` / whichever is your root). Order matters: tokens → core → utilities → component styles.

```ts
// src/main.tsx
import "@virtari-packages/tokens";                  // CSS custom properties
import "@virtari-packages/core";                    // reset + CSS layers
import "@virtari-packages/utilities";               // utility classes (optional but recommended)

// per-component styles — one import per component you render
import "@virtari-packages/react-button/styles";
import "@virtari-packages/react-input/styles";
import "@virtari-packages/react-dialog/styles";
// …

// your own theme overrides (always last)
import "./styles/theme.css";
```

### Next.js / App Router
Put the imports in `app/layout.tsx` (server component is fine — these are side-effect CSS imports).

### Vite / CRA
Put them in `src/main.tsx` before rendering `<App />`.

---

## 5. Using components

Every component is a named export. TypeScript types ship inside the package.

```tsx
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@virtari-packages/react-dialog";

export function SignIn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input type="email" placeholder="you@example.com" />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button color="primary">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Conventions applied across every component
- **Variant props** live in `[data-variant]`, sizes in `[data-size]`, state in `[data-state]` / `data-disabled`.
- Compound components (Dialog/Drawer/Select/DropdownMenu/etc.) follow a consistent anatomy: `Root` → `Trigger` → `Content` → slots like `Header`, `Body`, `Footer`.
- Most primitives accept `asChild` (via `Slot` from `@virtari-packages/primitives`) so you can swap the underlying element.

---

### Selector audit rules

- **Anchor selectors to one root class.** Prefer `.vds-button[data-variant="outline"]`, not bare attribute selectors.
- **Use `data-*` only for real styling axes.** Variant, size, tone, orientation, loading, semantic state: yes. One-off presentational quirks: no.
- **Keep selectors shallow.** Root plus at most one descendant in normal cases. If a selector starts encoding ancestry, add an explicit class or state hook instead.
- **Prefer explicit hooks over inferred structure.** If the component can compute a state such as icon-only, emit `data-icon-only` instead of relying on `:has(...)`.
- **Keep the DOM contract stable across render paths.** `asChild` and non-`asChild` branches should emit the same wrappers the CSS expects.

## 6. Theming with tokens

All visual atoms read from `--vds-*` CSS custom properties. Override them at the scope you want.

### App-wide brand change
```css
/* src/styles/theme.css */
:root {
  /* Primary ramp — 10 shades */
  --vds-color-primary-50:  oklch(97% 0.02 265);
  --vds-color-primary-100: oklch(94% 0.05 265);
  --vds-color-primary-200: oklch(88% 0.10 265);
  --vds-color-primary-300: oklch(80% 0.14 265);
  --vds-color-primary-400: oklch(70% 0.18 265);
  --vds-color-primary-500: oklch(62% 0.20 265);  /* main brand */
  --vds-color-primary-600: oklch(54% 0.20 265);
  --vds-color-primary-700: oklch(46% 0.18 265);
  --vds-color-primary-800: oklch(38% 0.14 265);
  --vds-color-primary-900: oklch(30% 0.10 265);

  /* Shape */
  --vds-radius-element: 0.75rem;   /* buttons, inputs */
  --vds-radius-surface: 1rem;      /* cards, dialogs */

  /* Typography */
  --vds-font-sans: "Vazirmatn", "Inter", system-ui, sans-serif;
}
```

### Dark mode (switch at runtime)
```css
[data-theme="dark"] {
  --vds-color-bg-default: oklch(18% 0.01 260);
  --vds-color-text-default: oklch(96% 0.005 260);
  /* override any other semantic token you need */
}
```
```ts
document.documentElement.dataset.theme = "dark";
```

### Scoped override (one subtree)
```tsx
<section style={{ "--vds-color-primary-500": "#10b981" }}>
  <Button>Green button, rest of the app unchanged</Button>
</section>
```

### Key token namespaces
- `--vds-color-{intent}-{50..900}` — intent = primary | success | warning | danger | info | accent | contrast
- `--vds-color-bg-*` / `--vds-color-text-*` / `--vds-color-border-*` — semantic layers
- `--vds-space-{0..96}` — spacing scale
- `--vds-size-{sm|md|lg|xl}` — component height scale
- `--vds-radius-{element|surface|pill|full}`
- `--vds-font-{sans|mono}`, `--vds-text-{xs..4xl}`
- `--vds-shadow-{sm|md|lg|xl}`
- `--vds-z-{base|sticky|dropdown|overlay|modal|popover|toast|tooltip}`

Full list lives in `@virtari-packages/tokens/dist/tokens.css`.

---

## 7. RTL support

The host document decides direction. All components adapt automatically.

```html
<html lang="fa" dir="rtl">
```

No per-component prop or config needed. If you see any component misbehaving in RTL, it's a bug — file it.

---

## 8. Utility classes (`@virtari-packages/utilities`)

Tailwind-style atomic classes, driven by the same tokens. All use logical properties.

```tsx
<div className="vds-u-flex vds-u-items-center vds-u-gap-3 vds-u-pi-4 vds-u-pb-2">
  <Button>OK</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

Prefixes:
- `vds-u-m{i|b|is|ie|bs|be}-*` — margin (inline/block/start/end)
- `vds-u-p{i|b|is|ie|bs|be}-*` — padding
- `vds-u-gap-{0..16}` / `vds-u-gap-x-*` / `vds-u-gap-y-*`
- `vds-u-w-*` (inline-size) / `vds-u-h-*` (block-size)
- `vds-u-flex`, `vds-u-grid`, `vds-u-grid-cols-{1..12}`, etc.
- Responsive breakpoint prefixes: `sm:` `md:` `lg:` `xl:` `2xl:` — e.g. `md:vds-u-flex-row`.

---

## 9. Package catalog

### Foundations
- `@virtari-packages/tokens` — CSS custom properties (required)
- `@virtari-packages/core` — CSS reset + cascade layer declarations (required)
- `@virtari-packages/utilities` — atomic utility classes
- `@virtari-packages/utils` — internal helpers (auto-installed as a dep)

### Primitives
- `@virtari-packages/react-button`
- `@virtari-packages/react-input`
- `@virtari-packages/react-textarea`
- `@virtari-packages/react-label`
- `@virtari-packages/react-checkbox` — includes `Checkbox`, `CheckboxCard`, `CheckboxField`, `CheckboxGroup`, `PillCheckbox`
- `@virtari-packages/react-radio-group` — includes `PillRadio`, `RadioCard`, `RadioField`, `SegmentedRadio`
- `@virtari-packages/react-switch`
- `@virtari-packages/react-toggle`
- `@virtari-packages/react-select`
- `@virtari-packages/react-slider`
- `@virtari-packages/react-separator`
- `@virtari-packages/react-text` — `Heading`, `Text`
- `@virtari-packages/react-kbd`
- `@virtari-packages/react-icons` — wrapper around Tabler icons
- `@virtari-packages/react-flag` — country flag SVGs
- `@virtari-packages/react-phone-input`
- `@virtari-packages/react-language-picker`
- `@virtari-packages/react-date-picker` — `DatePicker`, `DateRangePicker`, `Calendar`, `DateField`, `TimeField`

### Overlays
- `@virtari-packages/react-dialog`
- `@virtari-packages/react-alert-dialog`
- `@virtari-packages/react-drawer`
- `@virtari-packages/react-popover`
- `@virtari-packages/react-dropdown-menu`
- `@virtari-packages/react-tooltip`
- `@virtari-packages/react-toast`

### Display
- `@virtari-packages/react-avatar`
- `@virtari-packages/react-badge`
- `@virtari-packages/react-chip`
- `@virtari-packages/react-progress`
- `@virtari-packages/react-skeleton`
- `@virtari-packages/react-spinner`
- `@virtari-packages/react-card`

### Layout / navigation
- `@virtari-packages/react-layout` — `Row`, `Col`, `Stack`, `Container`, grid primitives
- `@virtari-packages/react-scroll-area`
- `@virtari-packages/react-accordion`
- `@virtari-packages/react-collapsible`
- `@virtari-packages/react-tabs`
- `@virtari-packages/react-header`
- `@virtari-packages/react-sidebar`
- `@virtari-packages/react-nav`
- `@virtari-packages/react-bottom-nav` — mobile bottom-tab bar (Material 3 / iOS / Floating / Underline variants)
- `@virtari-packages/react-breadcrumb`

### Data
- `@virtari-packages/react-table` — simple table primitives
- `@virtari-packages/react-data-table` — advanced table (sort/filter/pagination/virtualization/DnD) — builds on TanStack Table

---

## 10. Common pitfalls

1. **Styles not showing up.** Forgot `import "@virtari-packages/tokens"` or `import "@virtari-packages/<name>/styles"`. Every component you render needs its `/styles` entry imported once somewhere.

2. **`401 Unauthorized` on install.** Token missing, expired, or missing `read:packages` scope. Regenerate the token; make sure `.npmrc` exists and points to `https://npm.pkg.github.com`.

3. **Vite dep-scan failures after first install.** Vite sometimes caches a broken dep-scan. Fix with `pnpm exec vite --force` once, then it's fine.

4. **RTL bugs.** Don't use `left`/`right`/`top`/`bottom` in consumer CSS. Use `inset-inline-start` / `inset-block-end` etc. If a component has a visible RTL glitch, it's a package bug.

5. **Specificity conflicts.** Components already live in `@layer design-system.components`. Write your overrides either in a later layer (`@layer app {}`) or outside layers — plain selectors always beat layered ones. Never use `!important`.

6. **Mixing scopes.** The scope is `@virtari-packages` (with the `-packages` suffix). Any import or install using bare `@virtari/*` will fail with `ENOENT` / `404`.

7. **Tree-shaking CSS.** CSS imports are `sideEffects: true`. Don't remove them — your bundler will, and styles will vanish.

---

## 11. Versioning & updates

Every package uses independent semver. Versions bump via Changesets on the source repo. To pull the latest of everything:

```bash
pnpm up "@virtari-packages/*" --latest
```

Check https://github.com/orgs/Virtari-Packages/packages for the current published version of each package.

---

## 12. Useful links

- Repo: https://github.com/IamMrTrick/virtari-ui
- Published packages: https://github.com/orgs/Virtari-Packages/packages
- Demo app (source): `apps/docs/` in the repo — every component has a live example page
- License: MIT.
