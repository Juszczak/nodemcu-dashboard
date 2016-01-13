const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "dashboard.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
};
