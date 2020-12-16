const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清空打包后的文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV === "development";

// 压缩提取css整合
const proCssLoader = [{
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
const devCssLoader = ["style-loader", "css-loader"]

let configs = {
    mode,
    entry: ["./src/js/index.js", "./src/index.html"],
    output: {
        // 打包后的js会输出到build/js/built.js
        filename: devMode ? "js/built.js" : "js/built.[contenthash:10].js",
        path: resolve(__dirname, "build"),
        chunkFilename: devMode ? 'js/[name]_chunk.js' : 'js/[name].[contenthash:10]_chunk.js',
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
                use: devMode ? [...devCssLoader] : [...proCssLoader]
            }, {
                test: /\.scss$/,
                use: devMode ? [...devCssLoader, "sass-loader"] : [...proCssLoader, "sass-loader"]
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
                    cacheDirectory: true,
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: "usage",
                                corejs: {
                                    version: 3
                                },
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
            template: "./src/index.html",
            filename: 'index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        // 提取css
        new MiniCssExtractPlugin({
            filename: "css/built.[contenthash:10].css"
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        // 清空打包后的目录
        new CleanWebpackPlugin()
    ],
    devtool: devMode ? "eval-source-map" : "source-map"
}
/* -------------------判断开发与生产环境-------------- */
if (devMode) {
    configs.devServer = {
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 5000,
        hot: true
    }
} else {
    configs.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    }
}

module.exports = configs;