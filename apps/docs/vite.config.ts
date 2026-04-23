import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    // Explicit aliases bypass Vite's exports-field resolver, which sporadically
    // fails on workspace packages when new consumer files add imports. Order
    // matters: more specific subpaths must appear BEFORE the bare package name.
    alias: [
      { find: /^use-sync-external-store\/shim\/with-selector(?:\.js)?$/, replacement: fileURLToPath(new URL("./src/shims/useSyncExternalStoreWithSelector.ts", import.meta.url)) },
      { find: /^use-sync-external-store\/shim(?:\/index\.js)?$/, replacement: fileURLToPath(new URL("./src/shims/useSyncExternalStoreShim.ts", import.meta.url)) },
      { find: "@virtari-packages/react-data-table/styles", replacement: fileURLToPath(new URL("../../packages/react-data-table/dist/DataTable.css", import.meta.url)) },
      { find: "@virtari-packages/react-data-table/tokens", replacement: fileURLToPath(new URL("../../packages/react-data-table/dist/DataTable.tokens.css", import.meta.url)) },
      { find: "@virtari-packages/react-data-table/dnd", replacement: fileURLToPath(new URL("../../packages/react-data-table/dist/index.dnd.js", import.meta.url)) },
      { find: "@virtari-packages/react-data-table", replacement: fileURLToPath(new URL("../../packages/react-data-table/dist/index.js", import.meta.url)) },
      { find: "@virtari-packages/react-layout", replacement: fileURLToPath(new URL("../../packages/react-layout/dist/index.js", import.meta.url)) },
      { find: "@virtari-packages/react-header", replacement: fileURLToPath(new URL("../../packages/react-header/dist/index.js", import.meta.url)) },
      { find: "@virtari-packages/react-nav", replacement: fileURLToPath(new URL("../../packages/react-nav/dist/index.js", import.meta.url)) },
      { find: "@virtari-packages/react-sidebar", replacement: fileURLToPath(new URL("../../packages/react-sidebar/dist/index.js", import.meta.url)) },
      { find: "@virtari-packages/utils", replacement: fileURLToPath(new URL("../../packages/utils/dist/index.js", import.meta.url)) },
    ],
    conditions: ["style", "import", "module", "browser", "default"],
  },
  optimizeDeps: {
    // Stop Vite from auto-re-scanning when a consumer file is edited. The
    // re-scan sporadically bails on our workspace packages' subpath exports
    // (e.g. "@virtari-packages/react-data-table/styles") which throws a
    // "Failed to resolve import" overlay until the server is force-restarted.
    noDiscovery: true,
    // Pre-bundle these CJS/mixed deps so their ESM interop is correct — with
    // noDiscovery on, Vite won't auto-discover them, so list them here.
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "i18next",
      "react-i18next",
      "use-sync-external-store",
      "use-sync-external-store/shim",
      "use-sync-external-store/shim/with-selector",
    ],
  },
});
