const {
	resolve
} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 每次打包都删除之前打包好的目录文件，避免重复
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 提高打包速度
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
	}
]

module.exports = {
	entry: ["./src/js/index.js", "./src/index.html"],
	output: {
		filename: "js/built.[contenthash:10].js",
		path: resolve(__dirname, "./build/"),
		chunkFilename: 'vendorsJs/[name].[contenthash:10]_chunk.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			// exclude: /node_modules/,
			include: /resolve(__dirname, "src")/,
			enforce: 'pre',
			loader: 'eslint-loader',
			options: {
				fix: true,
			},
		}, {
			oneOf: [{
				test: /\.css$/,
				use: [...proCssLoader]
			}, {
				test: /\.scss$/,
				use: [...proCssLoader, "sass-loader"]
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
				// exclude: /node_modules/,
				include: /resolve(__dirname, "src")/,
					use: [
					// 	{
					// 	loader: "thread-loader",
					// 	options: {
					// 		workers: 2 //表示两个进程
					// 	}
					// },
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
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
						}
					}
				]
			}]
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: {
				// 移除空格
				collapseWhitespace: true,
				// 移除注释
				removeComments: true
			}
		}),
		// 每次打包都删除之前打包好的目录文件，避免重复
		new CleanWebpackPlugin(),
		// 提取css
		new MiniCssExtractPlugin({
			filename: "css/built.[contenthash:10].css"
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin(),
		// 提高打包速度
		// new HardSourceWebpackPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	mode: "production"
};