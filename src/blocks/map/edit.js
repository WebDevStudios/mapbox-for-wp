import { useState, useEffect } from "react";
import Map from "@core/components/Map/Map";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

import { blockStyle } from "./index";

const { RawHTML } = wp.element;

export default function edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ style: blockStyle });

	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};
	const { zoom = 0, pitch = 0, bearing = 0 } = attributes || {};

	const [mapAttributes, setMapAttributes] = useState({
		longitude: 0,
		latitude: 0,
		zoom,
		pitch,
		bearing,
	});

	useEffect(() => {
		setAttributes({ ...mapAttributes });
	}, [mapAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Map Options")}>
					<RangeControl
						label={__("Zoom")}
						value={zoom || 0}
						onChange={(newZoom) => setAttributes({ zoom: newZoom })}
						min={0}
						max={22}
					/>
					<RangeControl
						label={__("Pitch")}
						value={pitch || 0}
						onChange={(newPitch) => setAttributes({ pitch: newPitch })}
						min={0}
						max={60}
					/>
					<RangeControl
						label={__("Bearing")}
						value={bearing || 0}
						onChange={(newBearing) => setAttributes({ bearing: newBearing })}
						min={0}
						max={360}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Map
					mapboxToken={mapboxToken}
					mapboxStyle={mapboxStyle}
					mapboxLongitude={mapAttributes.longitude}
					mapboxLatitude={mapAttributes.latitude}
					mapboxZoom={mapAttributes.zoom}
					mapboxPitch={mapAttributes.pitch}
					mapboxBearing={mapAttributes.bearing}
					updateCallback={setMapAttributes}
				/>
			</div>
		</>
	);
}
