import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";
import save from "./save";
import json from "./block.json";

import "./style.scss";

export const blockStyle = {};

const { name, title } = json;

registerBlockType(name, {
	title,
	edit,
	save,
	attributes: {
		longitude: {
			type: "number",
			default: 0,
		},
		latitude: {
			type: "number",
			default: 0,
		},
		zoom: {
			type: "number",
			default: 0,
		},
		pitch: {
			type: "number",
			default: 0,
		},
		bearing: {
			type: "number",
			default: 0,
		},
	},
});
