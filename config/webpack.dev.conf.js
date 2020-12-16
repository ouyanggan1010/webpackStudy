const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: resolve(__dirname, "../src/js/index.js"),
    output: {
        // 打包后的js会输出到build/js/built.js
        filename: "js/built.js",
        path: resolve(__dirname, "../build")
    },
    module: {
        // 样式是通过js生成style标签将样式放入的head中的，所以暂时不需要有输出目录
        // 因为css-loader的原因，将css打包到js中，与js是一体的
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }, {
            // outputPath表示输出到build下的那个目录中
            test: /\.(png|jpg|gif)$/,
            loader: "url-loader",
            options: {
                limit: 4 * 1024,
                // 由于html-loader处理的使用commonjs模块化，而url-loader默认使用的es模块化，需要将esModule设置为false
                // 关闭es模块化
                esModule: false,
                name: "[hash:10].[ext]",
                // 资源的输出路径
                outputPath: "imgs"
            }
        }, {
            // 处理html中的img资源，将html中的img引入，再通过url-loader来处理
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "../src/index.html")
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, "../build"),
        compress: true,
        port: 5000
    }
}