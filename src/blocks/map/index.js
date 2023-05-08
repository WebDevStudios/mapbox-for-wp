import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import json from './block.json';

import './style.scss';

export const blockStyle = {};

const { name } = json;

registerBlockType(name, {
	...json,
	edit,
	save: () => null,
	attributes: {
		longitude: {
			type: 'number',
			default: 0,
		},
		latitude: {
			type: 'number',
			default: 0,
		},
		zoom: {
			type: 'number',
			default: 0,
		},
		pitch: {
			type: 'number',
			default: 0,
		},
		bearing: {
			type: 'number',
			default: 0,
		},
		style: {
			type: 'string',
			default: '',
		},
		hideControls: {
			type: 'boolean',
			default: false,
		},
		staticMap: {
			type: 'boolean',
			default: false,
		},
	},
});
