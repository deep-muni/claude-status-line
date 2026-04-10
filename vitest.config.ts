import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@utils": "./src/utils",
      "@segments": "./src/segments",
    },
  },
});