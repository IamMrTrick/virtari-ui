# Data-Attribute Styling Pattern — Authoritative References

A curated list of authoritative sources backing the design decisions in `@virtari-packages/react-button` (and the rest of the Virtari Design System): class-anchored `[data-variant]`/`[data-size]`/`[data-color]` selectors, CSS Cascade Layers (`@layer`), CSS custom properties for theming, and logical properties for RTL.

Use this document to settle any "attribute selectors are slow / won't scale to enterprise" debate with primary sources.

---

## 1. The "attribute selectors are slow" myth — debunked by browser vendors

The claim that `[data-foo="bar"]` is meaningfully slower than `.foo-bar` in modern engines is outdated. The most authoritative refutations come from the browser vendors themselves.

- **[The truth about CSS selector performance — Microsoft Edge Blog (2023)](https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/)**
  Written by engineers on the Edge/Blink team. Quantifies that selector matching is roughly 3–5% of style recalc time on real pages and concludes the historical advice to "prefer classes over attributes" is no longer meaningful.

- **[CSS Selector Performance has changed! (For the better) — Web Performance Calendar](https://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/)**
  The classic Nicole Sullivan piece showing that the Yahoo/Google "efficient CSS selectors" advice from the late 2000s no longer applies after the rule-bucketing optimizations.

- **[Optimizing CSS: ID Selectors and Other Myths — SitePoint](https://www.sitepoint.com/optimizing-css-id-selectors-and-other-myths/)**
  General teardown of the "selector performance" folk wisdom.

- **[Mozilla Bug 1704551 — Poor style calculation performance for attribute selectors](https://bugzilla.mozilla.org/show_bug.cgi?id=1704551)**
  Historical context: Firefox *did* once have measurably slower attribute matching (~190ms vs ~15ms in Safari on the same benchmark). The fix — adding attribute names to the Bloom filter — brought it down to ~40ms. Anyone citing pre-2021 benchmarks is citing a fixed bug.

---

## 2. How modern engines actually match selectors (rule bucketing & Bloom filters)

The reason class-anchored attribute selectors are fast: engines bucket rules by their rightmost compound selector and use Bloom filters for ancestor rejection. `.vds-button[data-variant="solid"]` only ever runs the attribute check on elements already filtered by the `.vds-button` bucket.

- **[CSS Style Calculation in Blink — Chromium source docs](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/css/style-calculation.md)**
  Internal Chromium documentation describing `FindBestRuleSetAndAdd` and the rule-hashing strategy.

- **[Analyze CSS selector performance during Recalculate Style events — Chrome DevTools](https://developer.chrome.com/docs/devtools/performance/selector-stats)**
  Google's official tooling guidance: if you're worried about selector cost, profile, don't guess.

- **[DevTools: Selector Performance Tracing for Style Calculations — Microsoft Edge Explainer](https://microsoftedge.github.io/DevTools/explainers/StyleTracing/explainer.html)**
  Edge's equivalent profiling explainer.

- **[Find the most expensive CSS selectors — DevToolsTips](https://devtoolstips.org/tips/en/find-expensive-selectors/)**
  Practical tutorial on using the selector stats panel.

---

## 3. Major design systems using the data-attribute pattern

The strongest empirical argument: every large, production-grade design system in the React ecosystem has converged on this pattern. If it didn't scale to enterprise, none of them would do it.

### Radix UI / shadcn/ui

- **[Radix Primitives — Styling Guide](https://www.radix-ui.com/primitives/docs/guides/styling)**
  Official: *"When components are stateful, their state is exposed in a `data-state` attribute."*
- **[Anatomy of a Primitive — Vercel Academy (shadcn/ui)](https://vercel.com/academy/shadcn-ui/anatomy-of-a-primitive)**
  Walkthrough of the shadcn pattern, which is built on the same data-attribute approach.

### Mantine v7

- **[Mantine — `data-*` attributes](https://mantine.dev/styles/data-attributes/)**
  *"All components now have `data-variant` attribute on the root element, even if the component does not have any predefined variants."*
- **[Mantine 6.x to 7.x migration guide](https://mantine.dev/guides/6x-to-7x/)**
  Mantine deliberately migrated **from Emotion (CSS-in-JS) to CSS modules + data attributes** in v7 — the opposite direction of the "don't use attributes" advice. Reasons: smaller bundles, better performance, Next.js App Router compatibility.
- **[Mantine v7.0.0 changelog](https://mantine.dev/changelog/7-0-0/)**

### React Aria / Adobe Spectrum

- **[React Aria — Styling](https://react-spectrum.adobe.com/react-aria/styling.html)**
  *"React Aria exposes UI states such as pressed, hovered, and selected using data attributes, which are like custom pseudo classes."* Adobe explicitly chose data attributes over class toggling because they work consistently across mouse, touch, and keyboard.
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html)**

### General reference

- **[Data Attributes — components.build](https://www.components.build/data-attributes)**
  Pattern-focused guide aggregating the data-attribute approach across DSes.

---

## 4. CSS Cascade Layers (`@layer`)

Why every component in `@virtari-packages/*` is wrapped in `@layer design-system.components`: predictable cascade, no specificity wars, consumer overrides without `!important`.

- **[`@layer` at-rule — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer)**
  Official spec reference.
- **[Cascade Layers — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers)**
  Tutorial.
- **[Organizing Design System Component Patterns With CSS Cascade Layers — CSS-Tricks](https://css-tricks.com/organizing-design-system-component-patterns-with-css-cascade-layers/)**
  Direct application to design systems.
- **[Mastering CSS Cascade Layers for Scalable Design Systems — Design Systems Collective](https://www.designsystemscollective.com/mastering-css-cascade-layers-for-scalable-design-systems-981fdab2a961)**
  Scalability angle.
- **[Cascade Layers Guide — CSS-Tricks](https://css-tricks.com/css-cascade-layers/)**
  General reference.
- **[Getting Started With CSS Cascade Layers — Smashing Magazine](https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/)**
  Introduction.
- **[Cascade Layers — Panda CSS docs](https://panda-css.com/docs/concepts/cascade-layers)**
  How another mature CSS framework uses layers.

---

## 5. CSS Logical Properties (RTL)

Why `padding-inline`, `block-size`, `border-inline-end-color` are used everywhere instead of physical properties — RTL works automatically without overrides.

- **[CSS Logical Properties and Values — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values)**
  Module reference.
- **[`padding-inline` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline)**
  Property reference.
- **[Logical properties for margins, borders, and padding — MDN Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values/Margins_borders_padding)**
  Comprehensive guide.
- **[Right to Left Styling 101 — Ahmad Shadeed](https://rtlstyling.com/posts/rtl-styling/)**
  The de-facto reference on RTL CSS in the industry.

---

## 6. The TL;DR three links

If you only have time to send three links to settle the debate:

1. **[Microsoft Edge — The truth about CSS selector performance](https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/)** — straight from a browser vendor.
2. **[Radix UI — Styling Guide](https://www.radix-ui.com/primitives/docs/guides/styling)** — the design system pattern used by millions of production sites.
3. **[Mantine v7 — `data-*` attributes](https://mantine.dev/styles/data-attributes/)** — a major DS that *migrated to* this pattern in 2023, not away from it.

The empirical argument: Radix, React Aria (Adobe), Mantine, and shadcn each get >10M weekly downloads and all use class-anchored data-attribute styling. The "won't scale to enterprise" hypothesis is incompatible with that evidence.
