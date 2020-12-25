const {
  resolve,
  VueLoaderPlugin,
  mode,
  getEntries,
  generatorHtmlWebpackPlugins,
  loaders,
  resolveObj,
} = require("./webpack.config.com.js");

module.exports = {
  entry: getEntries(),
  output: {
    // 打包后的js会输出到build/js/built.js
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      ...loaders,
    ],
  },
  plugins: [...generatorHtmlWebpackPlugins(), new VueLoaderPlugin()],
  resolve: resolveObj,
  mode,
  devtool: "eval-source-map",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
  },
};
