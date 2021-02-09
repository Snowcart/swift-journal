const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

module.exports = {
	entry: { main: path.resolve(__dirname, './src/index.tsx') },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	context: __dirname,
	node: {
		global: false
	},
	plugins: [
		new webpack.DefinePlugin({
			// Placeholder for global used in any node_modules, avoids Content Security Policy script-src 'unsafe-eval'
			global: 'window'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './src/index.html'),
			inject: 'body',
			alwaysWriteToDisk: true,
			hash: true
		}),
		new HtmlWebpackHarddiskPlugin(),
		new AppManifestWebpackPlugin({
			logo: path.resolve(__dirname, './images/my-logo.png'),
			inject: true,
			config: {
				appName: 'SWiFT Journal',
				background: '#fff',
				theme_color: '#fff',
				display: 'standalone',
				orientation: 'portrait',
				start_url: '/today',
				version: '1.0'
			}
		})
	],
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
		alias: {
			react: path.resolve(__dirname, './node_modules/react')
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].v-[hash].[ext]',
							outputPath: 'images/'
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].v-[hash].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	}
};
