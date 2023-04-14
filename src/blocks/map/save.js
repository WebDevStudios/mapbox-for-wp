import { useBlockProps } from "@wordpress/block-editor";
import { blockStyle } from "./index";

const { RawHTML } = wp.element;

export default function save() {
	const blockProps = useBlockProps.save({ style: blockStyle });
	const shortcode = "[mapbox_wp]";

	return (
		<div {...blockProps}>
			<RawHTML>{shortcode}</RawHTML>
		</div>
	);
}
