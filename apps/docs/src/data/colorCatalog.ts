/// <reference types="vite/client" />

// Inventory declarations, not references or theme duplicates. Keep documentation
// synchronized with the actual source imported by the token package.
const sources = import.meta.glob<string>("../../../../packages/tokens/src/colors/**/*.css", {
  query: "?raw", import: "default", eager: true,
});
export type ColorEntry = { token: string; expression: string };
export type ColorGroup = { id: string; kind: "solid" | "alpha" | "semantic" | "alias"; entries: ColorEntry[] };
const groups = new Map<string, ColorGroup>();
const seen = new Set<string>();
for (const [path, css] of Object.entries(sources).sort(([a], [b]) => Number(a.endsWith("aliases.css")) - Number(b.endsWith("aliases.css")) || a.localeCompare(b))) {
  for (const match of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(--vds-color-[\w-]+)\s*:\s*([^;{}]+);/g)) {
    const [, token, expression] = match;
    if (seen.has(token)) continue;
    seen.add(token);
    const scale = token.match(/^--vds-color-(.+)-(a?)(\d+)$/);
    const canonicalScale = scale && Number(scale[3]) <= 12 && !path.endsWith("aliases.css");
    const kind: ColorGroup["kind"] = path.includes("/semantic/") ? "semantic" : canonicalScale ? (scale[2] ? "alpha" : "solid") : path.endsWith("aliases.css") ? "alias" : "solid";
    const id = kind === "semantic" ? path.split("/").pop()!.replace(".css", "") : canonicalScale ? `${scale[1]}${scale[2] ? "-alpha" : ""}` : kind === "alias" ? "compatibility" : "anchors";
    if (!groups.has(id)) groups.set(id, { id, kind, entries: [] });
    groups.get(id)!.entries.push({ token, expression: expression.trim() });
  }
}
const familyOrder = ["neutral", "primary", "success", "warning", "danger", "info", "accent", "black", "white", "anchors"];
export const COLOR_GROUPS = [...groups.values()].sort((a, b) => {
  const kinds = ["solid", "alpha", "semantic", "alias"];
  return kinds.indexOf(a.kind) - kinds.indexOf(b.kind) || familyOrder.indexOf(a.id.replace("-alpha", "")) - familyOrder.indexOf(b.id.replace("-alpha", ""));
});
export const COLOR_COUNT = seen.size;
