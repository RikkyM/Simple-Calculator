const path = require("path");
const config = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[contenthash].js",
    clean: true,
  },
  // watch: true,
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    liveReload: true,
    allowedHosts: [".ngrok-free.app"],
  },
});
