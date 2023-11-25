module.exports = {
  mode: "production",
  entry: {
    hello: "./hello/a.js",
    // b: "./hello/b.js",
  },
  output: {
    filename: "bundle.js",
    clean: true,
  },
};
