const { resolve } = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        // 键表示是最终打包生成的[name]（在output中可使用）---->jquery
        // 值表示要打包哪些库，用数组表示打包多个到一个名称为jquery的文件中
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        // 打包的库向外暴露出去的的内容叫什么名字
        library: '[name]_[hash]'
    },
    plugins: [
        // 打包生成一个manifest.json文件--->提供和jquery的映射关系，通过映射能知道jquery这个库不需要打包，
        // 并且暴露的内容名称是[name]_[hash]
        new webpack.DllPlugin({
            // 映射库的暴露内容的名称，与output的library是对应的
            name: '[name]_[hash]',
            // 映射关系文件的输出的路径与名称
            path: resolve(__dirname, 'dll/manifest.json')
        })
    ],
    mode: 'production'
}