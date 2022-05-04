const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common-config');

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		compress: true,
		port: 9000,
	},
});
