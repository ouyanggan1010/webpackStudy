const {
  resolve,
  VueLoaderPlugin,
  mode,
  getEntries,
  generatorHtmlWebpackPlugins,
  loaders,
  resolveObj,
} = require("./webpack.config.com.js");

// 每次打包都删除之前打包好的目录文件，避免重复
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 提高打包速度
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


// 样式loader
const proCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../",
    },
  },
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
        plugins: [require("postcss-preset-env")()],
      },
    },
  },
];

module.exports = {
  entry: getEntries(),
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "./build/"),
    chunkFilename: "vendorsJs/[name].[contenthash:10]_chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: /resolve(__dirname, "src")/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...proCssLoader],
          },
          {
            test: /\.scss$/,
            use: [...proCssLoader, "sass-loader"],
          },
          ...loaders
        ],
      },
    ],
  },
  plugins: [
    ...generatorHtmlWebpackPlugins(),
    // 每次打包都删除之前打包好的目录文件，避免重复
    new CleanWebpackPlugin(),
    // 提取css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:10].css",
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // 提高打包速度
    // new HardSourceWebpackPlugin()
    // vue
    new VueLoaderPlugin(),
  ],
  resolve: resolveObj,
  optimization: {
    splitChunks: {
      chunks: "all",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 打包的优先级
          priority: -10,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .replace(/\\/g, "/")
              .replace(/^.*node_modules\//, "")
              .replace(/\/.*$/, "");
            return `${cacheGroupKey}~${moduleFileName}`;
          },
        },
      },
    },
  },
  mode
};
