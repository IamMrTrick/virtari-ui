import { defineConfig } from "tsup";
import prependUseClient from "../../scripts/prepend-use-client.mjs";

export default defineConfig({
  entry: ["src/index.ts", "src/index.core.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "lexical",
    /^@lexical\//,
  ],
  treeshake: true,
  onSuccess: prependUseClient,
});
