import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          const infoName = assetInfo.names?.[0] || assetInfo.name || "";
          if (infoName.includes("style.css")) {
            return "index.css";
          }
          return infoName;
        },
      },
    },
  },
});
