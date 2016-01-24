const path = require("path");

module.exports = {
	entry: "./src/main.ts",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "dashboard.js"
	},
	resolve: {
		extensions: [
			'',
			'.ts',
			'.js',
			'.json',
			'.css',
			'.html',
			'.styl'
		]
	},
	devtool: 'source-map',
	module: {
		loaders: [{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			}, {
				test: /\.html$/,
				loader: 'raw-loader'
			}, {
				test: /\.styl$/,
				loader: 'raw-loader!postcss-loader!stylus-loader'
			}
		]
	}
};
