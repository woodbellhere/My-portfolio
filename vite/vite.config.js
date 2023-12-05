import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// export default {
//   optimizeDeps: {
//     // 不对指定模块预构建
//     exclude: ["lodash-es"],
//   },
// };

// /** @type import('vite').UserConfig */
// const viteConfig = {
//   optimizeDeps: {
//     exclude: [],
//   },
// };

// 策略模式写if else
const envResolver = {
  // build: () => Object.assign({}, viteBaseConfig, viteProdConfig),
  build: () => ({ ...viteBaseConfig, ...viteProdConfig }),
  // serve: () => Object.assign({}, viteBaseConfig, viteDevConfig),
  serve: () => ({ ...viteBaseConfig, ...viteDevConfig }),
};

export default defineConfig(({ command, mode }) => {
  // if (command === "build") {
  // } else {
  // }
  console.log("process", process.cwd());
  const env = loadEnv(mode, process.cwd(), "");
  console.log("process", env);
  return envResolver[command]();
});
