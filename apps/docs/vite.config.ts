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
      "@virtari-packages/react-layout": fileURLToPath(
        new URL("../../packages/react-layout/dist/index.js", import.meta.url),
      ),
      "@virtari-packages/react-header": fileURLToPath(
        new URL("../../packages/react-header/dist/index.js", import.meta.url),
      ),
      "@virtari-packages/react-nav": fileURLToPath(
        new URL("../../packages/react-nav/dist/index.js", import.meta.url),
      ),
      "@virtari-packages/react-sidebar": fileURLToPath(
        new URL("../../packages/react-sidebar/dist/index.js", import.meta.url),
      ),
      "@virtari-packages/utils": fileURLToPath(
        new URL("../../packages/utils/dist/index.js", import.meta.url),
      ),
    },
    conditions: ["style", "import", "module", "browser", "default"],
  },
});
