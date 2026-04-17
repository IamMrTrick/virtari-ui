import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@virtari/react-layout": fileURLToPath(
        new URL("../../packages/react-layout/dist/index.js", import.meta.url),
      ),
      "@virtari/utils": fileURLToPath(
        new URL("../../packages/utils/dist/index.js", import.meta.url),
      ),
    },
    conditions: ["import", "module", "browser", "default"],
  },
});
