/**
 * Generate @virtari-packages/utilities CSS.
 *
 * Source of truth for all utility classes. Emits `dist/_expanded.css` which
 * is then processed by the repo-root postcss pipeline (postcss-import,
 * postcss-custom-media, postcss-nesting, autoprefixer) to produce the final
 * `dist/utilities.css`.
 *
 * Class naming: `vds-u-{property}-{value}` with responsive prefixes
 *   `sm:` / `md:` / `lg:` / `xl:` / `2xl:` (escaped in CSS as `\:`).
 *
 * All spacing uses logical properties (margin-inline, padding-block, etc.).
 * All scale values reference `--vds-space-*` / `--vds-z-*` tokens from
 * `@virtari-packages/tokens` so consumer theming cascades through.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG = path.resolve(__dirname, "..");
const DIST = path.join(PKG, "dist");
const TOKENS_BREAKPOINTS = path.resolve(
  PKG,
  "..",
  "tokens",
  "src",
  "breakpoints.css"
);

const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"];

/* ────────────────────────────── scales ────────────────────────────── */

const SPACE_KEYS = [
  "0", "px", "0-5", "1", "1-5", "2", "2-5", "3", "3-5", "4", "5", "6", "7",
  "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40",
  "44", "48", "52", "56", "60", "64", "72", "80", "96",
];

/* Gap/sizing use a tighter subset to keep bundle size manageable. */
const GAP_KEYS = SPACE_KEYS.filter((k) =>
  ["0", "px", "0-5", "1", "1-5", "2", "2-5", "3", "3-5", "4", "5", "6", "7", "8", "10", "12", "14", "16"].includes(k)
);

const SIZE_KEYS = GAP_KEYS;

const FRACTIONS = {
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "3/4": "75%",
};

const SIZE_KEYWORDS = {
  auto: "auto",
  full: "100%",
  screen: "100dvb", // block-axis: dynamic viewport; see h vs w override below
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

/* Logical spacing shorthands map class fragment → CSS property. */
const MARGIN_MAP = {
  m: "margin",
  mi: "margin-inline",
  mb: "margin-block",
  mis: "margin-inline-start",
  mie: "margin-inline-end",
  mbs: "margin-block-start",
  mbe: "margin-block-end",
};

const PADDING_MAP = {
  p: "padding",
  pi: "padding-inline",
  pb: "padding-block",
  pis: "padding-inline-start",
  pie: "padding-inline-end",
  pbs: "padding-block-start",
  pbe: "padding-block-end",
};

const Z_KEYS = [
  "hide", "base", "docked", "dropdown", "sticky", "banner", "overlay",
  "modal", "popover", "toast", "tooltip",
];

/* ─────────────────────────── rule builders ─────────────────────────── */

function spaceValue(key) {
  return `var(--vds-space-${key})`;
}

function escapeKey(key) {
  // `0-5` → `0\.5` — Tailwind-style decimal key: authored as `0-5`, written
  // in CSS as `.vds-u-p-0-5` (no dot needed since key has dash). We keep
  // dashes as-is in class names for easy typing.
  return key;
}

const rules = [];

/* Display */
const DISPLAY_VALUES = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  hidden: "none",
  contents: "contents",
  "flow-root": "flow-root",
};
for (const [name, value] of Object.entries(DISPLAY_VALUES)) {
  rules.push([`vds-u-${name}`, `display: ${value};`]);
}

/* Spacing — margin */
for (const [frag, prop] of Object.entries(MARGIN_MAP)) {
  for (const key of SPACE_KEYS) {
    rules.push([`vds-u-${frag}-${escapeKey(key)}`, `${prop}: ${spaceValue(key)};`]);
  }
  // Margin supports `auto` for centering / pushing.
  rules.push([`vds-u-${frag}-auto`, `${prop}: auto;`]);
}

/* Spacing — padding (no auto) */
for (const [frag, prop] of Object.entries(PADDING_MAP)) {
  for (const key of SPACE_KEYS) {
    rules.push([`vds-u-${frag}-${escapeKey(key)}`, `${prop}: ${spaceValue(key)};`]);
  }
}

/* Gap */
for (const key of GAP_KEYS) {
  rules.push([`vds-u-gap-${escapeKey(key)}`, `gap: ${spaceValue(key)};`]);
  rules.push([`vds-u-gap-x-${escapeKey(key)}`, `column-gap: ${spaceValue(key)};`]);
  rules.push([`vds-u-gap-y-${escapeKey(key)}`, `row-gap: ${spaceValue(key)};`]);
}

/* Flex */
const FLEX_DIR = {
  "flex-row": "row",
  "flex-col": "column",
  "flex-row-reverse": "row-reverse",
  "flex-col-reverse": "column-reverse",
};
for (const [k, v] of Object.entries(FLEX_DIR)) {
  rules.push([`vds-u-${k}`, `flex-direction: ${v};`]);
}

const FLEX_WRAP = {
  "flex-wrap": "wrap",
  "flex-nowrap": "nowrap",
  "flex-wrap-reverse": "wrap-reverse",
};
for (const [k, v] of Object.entries(FLEX_WRAP)) {
  rules.push([`vds-u-${k}`, `flex-wrap: ${v};`]);
}

const ITEMS = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};
for (const [k, v] of Object.entries(ITEMS)) {
  rules.push([`vds-u-items-${k}`, `align-items: ${v};`]);
}

const JUSTIFY = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};
for (const [k, v] of Object.entries(JUSTIFY)) {
  rules.push([`vds-u-justify-${k}`, `justify-content: ${v};`]);
}

const SELF = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  auto: "auto",
  baseline: "baseline",
};
for (const [k, v] of Object.entries(SELF)) {
  rules.push([`vds-u-self-${k}`, `align-self: ${v};`]);
}

/* flex shorthand */
const FLEX_VAL = {
  1: "1 1 0%",
  auto: "1 1 auto",
  initial: "0 1 auto",
  none: "none",
};
for (const [k, v] of Object.entries(FLEX_VAL)) {
  rules.push([`vds-u-flex-${k}`, `flex: ${v};`]);
}
rules.push([`vds-u-grow`, `flex-grow: 1;`]);
rules.push([`vds-u-grow-0`, `flex-grow: 0;`]);
rules.push([`vds-u-shrink`, `flex-shrink: 1;`]);
rules.push([`vds-u-shrink-0`, `flex-shrink: 0;`]);

/* Grid */
for (let i = 1; i <= 12; i++) {
  rules.push([
    `vds-u-grid-cols-${i}`,
    `grid-template-columns: repeat(${i}, minmax(0, 1fr));`,
  ]);
  rules.push([`vds-u-col-span-${i}`, `grid-column: span ${i} / span ${i};`]);
}
rules.push([`vds-u-col-span-full`, `grid-column: 1 / -1;`]);

for (let i = 1; i <= 6; i++) {
  rules.push([
    `vds-u-grid-rows-${i}`,
    `grid-template-rows: repeat(${i}, minmax(0, 1fr));`,
  ]);
  rules.push([`vds-u-row-span-${i}`, `grid-row: span ${i} / span ${i};`]);
}
rules.push([`vds-u-row-span-full`, `grid-row: 1 / -1;`]);

/* Auto-fit / auto-fill (one-off pragmatic helpers). */
rules.push([
  `vds-u-grid-auto-fit`,
  `grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));`,
]);
rules.push([
  `vds-u-grid-auto-fill`,
  `grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr));`,
]);

/* Sizing — width (inline-size) and height (block-size) */
for (const key of SIZE_KEYS) {
  rules.push([`vds-u-w-${escapeKey(key)}`, `inline-size: ${spaceValue(key)};`]);
  rules.push([`vds-u-h-${escapeKey(key)}`, `block-size: ${spaceValue(key)};`]);
}

for (const [k, v] of Object.entries(FRACTIONS)) {
  const cls = k.replace("/", "\\/");
  rules.push([`vds-u-w-${cls}`, `inline-size: ${v};`]);
  rules.push([`vds-u-h-${cls}`, `block-size: ${v};`]);
}

for (const [k, v] of Object.entries(SIZE_KEYWORDS)) {
  // `screen` maps to dvi (dynamic viewport inline) for width, dvb for height.
  if (k === "screen") {
    rules.push([`vds-u-w-screen`, `inline-size: 100dvi;`]);
    rules.push([`vds-u-h-screen`, `block-size: 100dvb;`]);
  } else {
    rules.push([`vds-u-w-${k}`, `inline-size: ${v};`]);
    rules.push([`vds-u-h-${k}`, `block-size: ${v};`]);
  }
}

// min/max variants for common sizing needs (useful for forms and modals).
for (const key of SIZE_KEYS) {
  rules.push([
    `vds-u-min-w-${escapeKey(key)}`,
    `min-inline-size: ${spaceValue(key)};`,
  ]);
  rules.push([
    `vds-u-max-w-${escapeKey(key)}`,
    `max-inline-size: ${spaceValue(key)};`,
  ]);
  rules.push([
    `vds-u-min-h-${escapeKey(key)}`,
    `min-block-size: ${spaceValue(key)};`,
  ]);
  rules.push([
    `vds-u-max-h-${escapeKey(key)}`,
    `max-block-size: ${spaceValue(key)};`,
  ]);
}
rules.push([`vds-u-min-w-0`, `min-inline-size: 0;`]);
rules.push([`vds-u-min-h-0`, `min-block-size: 0;`]);
rules.push([`vds-u-max-w-full`, `max-inline-size: 100%;`]);
rules.push([`vds-u-max-h-full`, `max-block-size: 100%;`]);

/* Position */
for (const v of ["static", "relative", "absolute", "fixed", "sticky"]) {
  rules.push([`vds-u-${v}`, `position: ${v};`]);
}

// Logical inset (writing-mode aware).
rules.push([
  `vds-u-inset-0`,
  `inset-block: 0; inset-inline: 0;`,
]);
rules.push([`vds-u-inset-auto`, `inset-block: auto; inset-inline: auto;`]);

const INSET_SIDES = {
  "inset-block-0": "inset-block: 0;",
  "inset-inline-0": "inset-inline: 0;",
  "inset-bs-0": "inset-block-start: 0;",
  "inset-be-0": "inset-block-end: 0;",
  "inset-is-0": "inset-inline-start: 0;",
  "inset-ie-0": "inset-inline-end: 0;",
  "inset-bs-auto": "inset-block-start: auto;",
  "inset-be-auto": "inset-block-end: auto;",
  "inset-is-auto": "inset-inline-start: auto;",
  "inset-ie-auto": "inset-inline-end: auto;",
};
for (const [k, decl] of Object.entries(INSET_SIDES)) {
  rules.push([`vds-u-${k}`, decl]);
}

/* Overflow */
for (const v of ["visible", "hidden", "auto", "scroll", "clip"]) {
  rules.push([`vds-u-overflow-${v}`, `overflow: ${v};`]);
  rules.push([`vds-u-overflow-x-${v}`, `overflow-x: ${v};`]);
  rules.push([`vds-u-overflow-y-${v}`, `overflow-y: ${v};`]);
}

/* Z-index (semantic tokens only — no raw numbers to prevent ad-hoc stacking). */
for (const k of Z_KEYS) {
  rules.push([`vds-u-z-${k}`, `z-index: var(--vds-z-${k});`]);
}

/* ───────────────────────────── emitters ───────────────────────────── */

function escapePrefix(prefix) {
  // CSS identifiers cannot start with a digit. Escape a leading digit as its
  // hex codepoint followed by a space, per CSS Syntax spec (e.g. "2xl" → "\32 xl").
  if (/^\d/.test(prefix)) {
    const code = prefix.charCodeAt(0).toString(16);
    return `\\${code} ${prefix.slice(1)}`;
  }
  return prefix;
}

function toCss(list, prefix = "") {
  // prefix is the breakpoint: "sm", "md", etc. "" means base.
  const escapedPrefix = prefix ? escapePrefix(prefix) : "";
  const lines = list.map(([cls, decl]) => {
    const selector = prefix ? `.${escapedPrefix}\\:${cls}` : `.${cls}`;
    return `${selector} { ${decl} }`;
  });
  return lines.join("\n");
}

function main() {
  fs.mkdirSync(DIST, { recursive: true });

  const breakpointDecls = fs.readFileSync(TOKENS_BREAKPOINTS, "utf8").trim();

  let out = "";
  out += "/* @virtari-packages/utilities — generated by scripts/generate.mjs. DO NOT EDIT BY HAND. */\n\n";
  out += breakpointDecls + "\n\n";
  out += "@layer utilities {\n";
  out += toCss(rules) + "\n";
  out += "}\n";

  for (const bp of BREAKPOINTS) {
    out += `\n@layer utilities {\n`;
    out += `@media (--vds-${bp}) {\n`;
    out += toCss(rules, bp) + "\n";
    out += `}\n`;
    out += `}\n`;
  }

  const outPath = path.join(DIST, "_expanded.css");
  fs.writeFileSync(outPath, out);

  // Quick stats for humans.
  const base = rules.length;
  const total = base * (1 + BREAKPOINTS.length);
  console.log(
    `[utilities] generated ${base} base classes × ${1 + BREAKPOINTS.length} (base + ${BREAKPOINTS.length} breakpoints) = ${total} total → ${path.relative(PKG, outPath)}`
  );
}

main();
