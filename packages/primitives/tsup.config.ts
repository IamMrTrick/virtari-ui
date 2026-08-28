import { defineConfig } from "tsup";

export default defineConfig({
  // one entry per primitive — consumers import subpaths
  // (`@virtari-packages/primitives/select`), so each stays independently
  // tree-shakeable while shared internals collapse into common chunks.
  entry: ["src/*/index.ts"],
  format: ["esm", "cjs"],
  dts: false, // see package.json "build" — tsc emits declarations instead
  clean: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@floating-ui/react-dom",
    "aria-hidden",
    "react-remove-scroll",
    "use-sync-external-store",
  ],
});
