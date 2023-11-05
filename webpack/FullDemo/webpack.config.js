const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  // entry: {
  //   hello: "./hello/a.js",
  //   b: "./hello/b.js",
  // },
  output: {
    // filename: "bundle.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jpg$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: "hello webpack",
      template: "./src/index.html",
    }),
  ],
  devtool: "inline-source-map",
};
