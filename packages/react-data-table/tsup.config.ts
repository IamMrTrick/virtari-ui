import { defineConfig } from "tsup";
import prependUseClient from "../../scripts/prepend-use-client.mjs";

export default defineConfig({
  entry: ["src/index.ts", "src/index.dnd.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@dnd-kit/core",
    "@dnd-kit/sortable",
    "@dnd-kit/utilities",
  ],
  treeshake: true,
  onSuccess: prependUseClient,
});
