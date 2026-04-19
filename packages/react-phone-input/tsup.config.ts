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
    "@radix-ui/react-popover",
    "@virtari-packages/utils",
    "@virtari-packages/react-flag",
    "@virtari-packages/react-input",
    "@virtari-packages/react-select",
    "libphonenumber-js",
    "libphonenumber-js/min",
  ],
  treeshake: true,
  onSuccess: prependUseClient,
});
