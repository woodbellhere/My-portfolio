const path = require("node:path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "none",
  // 相对路径中这个./不能省略
  entry: "./src/index.js",
  output: {
    // 打包后的文件名
    filename: "bundle.js",
    // 打包文件的路径名,需要是绝对路径，正好用path模块
    path: path.join(__dirname, "./dist"),
    // 默认网站根目录（index.html的目录），加图片这些的时候你就要指定到dist打包目录
    // publicPath: "dist/",
  },
  devServer: {
    // contentBase: "./public",
    // proxy: {
    //   "/api": {
    //     target: "https://api.github.com",
    //     pathRewrite: { "^/api": "" },
    //     changeOrigin: true,
    //   },
    // },
    hot: true,
    // hot: "only", //不自动刷新页面
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.jpg$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 12 * 1024,
          },
        },
      },
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            // attributes: ["img:src", "a:href"],
            sources: {
              list: [
                {
                  tag: "img",
                  attribute: "src",
                  type: "src",
                },
                {
                  tag: "a",
                  attribute: "href",
                  type: "src",
                },
              ],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack plugin",
      meta: {
        viewport: "width=device-width",
      },
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({ patterns: [{ from: "public", to: "public" }] }),
    new HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // 要求代码片段，所以还要再包一层字符串,用json是个常见技巧
      API_BASE_URL: JSON.stringify("https://api.example.com"), //'"https://api.exmaple.com"',
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    // 只导出被外部使用的成员
    useExports: true,
    minimize: true,
    concatenateModule: true,
    // sideEffects:true,
  },
};

// const allDevtool = [所有模式的字符串];
// module.exports = allDevtool.map((item) => {
//   return {
//     devtool: item,
//     mode: "none",
//     entry: "./src/index.js",
//     output: {
//       filename: `js/${item}.js`,
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           use: {
//             loader: "babel-loader",
//             options: { presets: ["@babel/preset-env"] },
//           },
//         },
//       ],
//     },
//   };
// });

// module.exports = (env, argv) => {
//   const config = {
//     mode: "development",
//     entry: "./src/index.js",
//     output: {
//       filename: "js/bundle.js",
//     },
//     devtool: "cheap-eval-module-source-map",
//     devServer: {
//       hot: true,
//       contentBase: "public",
//     },
//     module: {
//       rules: [
//         {
//           test: /\.css$/,
//           use: ["style-loader", "css-loader"],
//         },
//         {
//           test: /\.(png|jpg?g|gif)$/,
//           use: {
//             loader: "file-loader",
//             options: {
//               outputPath: "img",
//               name: "[name].[ext]",
//             },
//           },
//         },
//       ],
//     },
//     plugins: [new HtmlWebpackPlugin({ title: "a show case" })],
//   };

//   if (env === "production") {
//     config.mode = "production";
//     config.devtool = false;
//     config.plugins = [
//       ...config.plugins,
//       new CleanWebpackPlugin(),
//       new CopyWebpackPlugin(["public"]),
//     ];
//   }

//   return config;
// };

// module.exports = {
//   mode: "none",
//   entry: {
//     index: "./src/index.js",
//     album: "./src/album.js",
//   },
//   output: {
//     //用[name]来动态生成文件名
//     filename: "[name].bundle.js",
//   },
//   optimization: {
//     splitChunks: {
//       chunks: "all",
//     },
//   },
//   module: {
//     xxxx,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "multi entry",
//       template: "./src/index.html",
//       filename: "index.html",
//       chunks: ["index"],
//     }),
//     new HtmlWebpackPlugin({
//       title: "multi entry",
//       template: "./src/album.html",
//       filename: "album.html",
//       chunks: ["album"],
//     }),
//   ],
// };
