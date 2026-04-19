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
    "@virtari/utils",
    "@virtari/react-flag",
    "@virtari/react-input",
    "@virtari/react-select",
    "libphonenumber-js",
    "libphonenumber-js/min",
  ],
  treeshake: true,
  onSuccess: prependUseClient,
});
