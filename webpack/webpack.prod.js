const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// module.exports = Object.assign({}, common, {
//   mode: "production",
//   plugins:[xxx]
// });

module.exports = merge(common, {
  mode: "production",
  plugins: [new CleanWebpackPlugin(), new CopyWebpackPlugin(["public"])],
});
