const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		'map-block': './src/blocks/map',
		'map-core': './src/core',
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl'),
		},
	},
};
