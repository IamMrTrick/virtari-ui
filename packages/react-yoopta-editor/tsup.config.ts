import { defineConfig } from "tsup";
import prependUseClient from "../../scripts/prepend-use-client.mjs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "slate",
    "slate-dom",
    "slate-react",
    /^@yoopta\//,
    /^@virtari-packages\//,
    "katex",
  ],
  treeshake: true,
  onSuccess: prependUseClient,
});
