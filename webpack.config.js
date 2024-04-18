const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src/css"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
