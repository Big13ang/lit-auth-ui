import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@shared": "/src/shared",
      "@build": "/src/build",
      "@public": "/public",
    },
  },
});
