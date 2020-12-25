const { resolve } = require("path");
const fs = require("fs");

// html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// vue
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 环境
const mode = process.env.NODE_ENV;

// 根据pages下的文件夹自动生成入口数组对象
const pagesDirPath = resolve(__dirname, "./src/pages");

/* ---------------新增多个入口------------- */
const getEntries = () => {
  let result = fs.readdirSync(pagesDirPath);
  let entry = {};
  result.forEach((item) => {
    entry[item] = resolve(__dirname, `./src/pages/${item}/index.js`);
  });
  return entry;
};
/* ---------------扫描pages文件夹，为每个页面生成一个插件实例对象------------- */
const generatorHtmlWebpackPlugins = () => {
  const arr = [];
  // [ 'index', 'login' ]
  let result = fs.readdirSync(pagesDirPath);
  result.forEach((item) => {
    //判断页面目录下有无自己的index.html
    let templatePath = resolve(__dirname, "./src/template.html");
    arr.push(
      new HtmlWebpackPlugin({
        template: templatePath,
        filename: `${item}.html`,
        // 多页面多入口必须写这个属性，否则会将所有入口文件都引入
        chunks: ["manifest", "vendor", item],
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
        },
      })
    );
  });
  return arr;
};
/* ---------------公共的loader------------- */
const loaders = [
  {
    test: /\.(png|jpg|gif)$/,
    loader: "url-loader",
    options: {
      limit: 4 * 1024,
      esModule: false,
      name: "[hash:10].[ext]",
      outputPath: "imgs",
    },
  },
  {
    test: /\.html$/,
    loader: "html-loader",
  },
  {
    exclude: /\.(js|json|css|scss|png|jpg|gif|html|vue)$/,
    loader: "file-loader",
    options: {
      name: "[hash:10].[ext]",
      // 资源的输出路径
      outputPath: "orther",
    },
  },
];
/* ---------------公共的resolve参数设置------------- */
const resolveObj = {
  alias: {
    vue$: "vue/dist/vue.esm.js",
  },
}
  
module.exports = {
  resolve,
  VueLoaderPlugin,
  mode,
  getEntries,
  generatorHtmlWebpackPlugins,
  loaders,
  resolveObj
};
