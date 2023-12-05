import { defineConfig } from "vite";
const postcssPresetEnv = require("postcss-preset-env");
import { ViteAliases } from "vite-aliases";
import { createHtmlPlugin } from "vite-plugin-html";
import { ViteCompressionPluginConfig } from "vite-plugin-compression2";
import viteCDNPlugin from "vite-plugin-cdn-import";
import path from "node:path";

export default defineConfig({
  resolve: {
    // 资源路径层级太深时可以使用别名简写
    // alias: {
    //   "@": path.resolve(import.meta.url, "./src"),
    //   "@assets": path.resolve(import.meta.url, "./src/assets"),
    // },
  },
  optimizeDeps: {
    // 排除预构建
    exclude: [],
  },
  envPrefix: "ENV_", //环境变量的env前缀
  build: {
    // minify: false,
    rollupOptions: {
      // 静态资源输出项
      output: "[hash].[name].[ext]",
      // external: ["lodash"],
      // externalGlobal: {
      //   var: "_",
      //   path: "https://cdn/jsdeliver.net/npm/lodash@4.17.21/lodash.min.js",
      // },
    },
    assetsInlineLimit: 4 * 1024,
    outDir: "testDist",
    assetsDir: "static",
    // emptyOutDir:true //清除输出目录中的所有文件
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      scopeBehaviour: "local",
      // generateScopedName: "[name]_[local]_[hash:5]",
      hashPrefix: "hello",
      globalModulePaths: [],
    },
    preprocessorOptions: {},
    devSourcemap: true, //sourcemap只有开启与否
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
  plugins: [
    ViteAliases(),
    createHtmlPlugin({
      inject: { data: { title: "homepage" } },
    }),
    ViteCompressionPluginConfig({}),
    viteCDNPlugin({
      // 纯粹以lodash为例子
      modules: {
        name: "lodash",
        var: "_",
        path: "https://cdn/jsdeliver.net/npm/lodash@4.17.21/lodash.min.js",
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://www.360.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
