import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";
import save from "./save";
import json from "./block.json";

import "./style.scss";

export const blockStyle = {};

const { name } = json;

console.log(name);

registerBlockType(name, {
	title: "Mapbox",
	edit,
	save,
	attributes: {
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
