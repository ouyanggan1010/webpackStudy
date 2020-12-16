const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清空打包后的文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 压缩提取css整合
const commonCssLoader = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../'
    }
},
    "css-loader",
{
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            ident: "postcss",
            plugins: [require("postcss-preset-env")()],
        },
    }
}]

module.exports = {
    entry: resolve(__dirname, "../src/js/index.js"),
    output: {
        // 打包后的js会输出到build/js/built.js
        filename: "js/built.[contenthash:10].js",
        path: resolve(__dirname, "../build")
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: /src/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                fix: true,
            },
        }, {
            oneOf: [{
                test: /\.css$/,
                use: [...commonCssLoader]
            }, {
                test: /\.scss$/,
                use: [
                    ...commonCssLoader,
                    "sass-loader"
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 4 * 1024,
                    esModule: false,
                    name: "[hash:10].[ext]",
                    outputPath: "imgs"
                }
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                exclude: /\.(js|json|css|scss|png|jpg|gif|html)$/,
                loader: "file-loader",
                options: {
                    name: "[hash:10].[ext]",
                    // 资源的输出路径
                    outputPath: "orther"
                }
            }, {
                test: /\.js$/,
                include: /src/,
                loader: "babel-loader",
                options: {
                    // 预设：指示babel做怎样的兼容性处理
                    // 预设环境的兼容性处理
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                // 按需加载
                                useBuiltIns: "usage",
                                // 指定core-js的版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: "60",
                                    firefox: "50",
                                    ie: "9",
                                    safari: "10",
                                    edge: "17"
                                }
                            }
                        ]
                    ],
                },
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "../src/index.html"),
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        // 提取css
        new MiniCssExtractPlugin({
            // 默认是将所有css文件下的样式都整合到mian.css中，默认名字是mian.css
            // 对输出的文件进行重命名与输出到某个文件夹中
            filename: "css/built.[contenthash:10].css"
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        // 清空打包后的目录
        new CleanWebpackPlugin()
    ],
    mode: "production"
}