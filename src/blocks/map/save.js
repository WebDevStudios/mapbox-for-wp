import { useBlockProps } from "@wordpress/block-editor";
import { blockStyle } from "./index";

const { RawHTML } = wp.element;

export default function save({ attributes }) {
	const { zoom = 0, pitch = 0, bearing = 0 } = attributes || {};
	const blockProps = useBlockProps.save({ style: blockStyle });
	const shortcode = `[mapbox_wp zoom="${encodeURIComponent(
		zoom
	)}" pitch="${encodeURIComponent(pitch)}" bearing="${encodeURIComponent(
		bearing
	)}"]`;

	return (
		<div {...blockProps}>
			<RawHTML>{shortcode}</RawHTML>
		</div>
	);
}
