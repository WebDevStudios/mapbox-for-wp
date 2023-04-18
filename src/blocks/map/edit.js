import { useState, useEffect } from "react";
import Map from "@core/components/Map/Map";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

import { blockStyle } from "./index";

const { RawHTML } = wp.element;

export default function edit({ attributes, setAttributes }) {
	const [coordinates, setCoordinates] = useState({
		longitude: 0,
		latitude: 0,
	});

	useEffect(() => {
		const { lng, lat } = coordinates;

		setAttributes({
			longitude: lng,
			latitude: lat,
		});
	}, [coordinates]);

	const blockProps = useBlockProps({ style: blockStyle });

	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};
	const { zoom = 0, pitch = 0, bearing = 0 } = attributes || {};

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
					mapboxLongitude={coordinates.longitude}
					mapboxLatitude={coordinates.latitude}
					mapboxZoom={zoom}
					mapboxPitch={pitch}
					mapboxBearing={bearing}
					updateCallback={setCoordinates}
				/>
			</div>
		</>
	);
}
