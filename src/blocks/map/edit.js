import Map from "@core/components/Map/Map";
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

import { blockStyle } from "./index";

const { RawHTML } = wp.element;

export default function edit() {
	const blockProps = useBlockProps({ style: blockStyle });
	const shortcode = "[mapbox_wp]";

	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};

	return (
		<div {...useBlockProps()}>
			<Map mapboxToken={mapboxToken} mapboxStyle={mapboxStyle} />
		</div>
	);
}
