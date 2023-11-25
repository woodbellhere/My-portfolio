module.exports = {
  // mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "js/bundle.js",
  },
  devtool: "cheap-eval-module-source-map",
  devServer: {
    hot: true,
    contentBase: "public",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg?g|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "img",
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ title: "a show case" })],
};
