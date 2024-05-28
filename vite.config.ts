import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "dist",
      lib: {
        entry: "./src/index.ts",
        name: "lit-auth-ui",
        fileName: "lit-auth-ui",
        formats: ["es"],
      },
    },
    rollupOptions: {
      external: mode === "production" ? "" : /^lit-element/,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@assets": "/src/assets",
        "@components": "/src/components",
        "@shared": "/src/shared",
        "@build": "/src/build",
        "@public": "/public",
      },
    },
  };
});
