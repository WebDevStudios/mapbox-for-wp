import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";
import save from "./save";
import json from "./block.json";

import "./style.scss";

export const blockStyle = {};

const { name } = json;

registerBlockType(name, {
	edit,
	save,
});
