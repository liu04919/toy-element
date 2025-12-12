import { defineConfig } from "vite";
import type { PluginOption } from "vite";
import { delay } from "lodash-es";
import { readFileSync } from "fs";
import { resolve } from "path";
import { compression } from "vite-plugin-compression2";
import vue from "@vitejs/plugin-vue";
import shell from "shelljs";
import terser from "@rollup/plugin-terser";
import hooks from "./hooksPlugin";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
const TRY_MOVE_STYLES_DELAY = 800 as const;

function moveStyles() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue() as PluginOption,
    compression({
      include: /.(cjs|css)$/i,
    }) as PluginOption,
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
    hooks({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles,
    }),
  ],
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
