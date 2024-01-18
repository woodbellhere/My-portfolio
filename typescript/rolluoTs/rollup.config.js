import path from "path";
import ts from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
export default {
  input: "./src/index.ts",
  output: {
    file: path.resolve(__dirname, "./lib/index.js"),
    format: "umd",
    sourcemap: true,
  },

  plugins: [ts(), terser()],
};
