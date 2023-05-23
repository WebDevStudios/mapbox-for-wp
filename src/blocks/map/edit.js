import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import Map from '../../core/components/Map/Map';
import { blockStyle } from './index';

export default function edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ style: blockStyle }); // eslint-disable-line react-hooks/rules-of-hooks
	const { mapboxToken = '', mapboxDefaultStyle = '' } = mbwpData || {}; // eslint-disable-line no-undef

	const {
		longitude = 0,
		latitude = 0,
		zoom = 0,
		pitch = 0,
		bearing = 0,
		style = mapboxDefaultStyle,
		hideControls = false,
		staticMap = false,
	} = attributes || {};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [mapAttributes, setMapAttributes] = useState({
		longitude,
		latitude,
		zoom,
		pitch,
		bearing,
		style,
		hideControls,
		staticMap,
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setAttributes({ ...mapAttributes });
	}, [mapAttributes, setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Options', 'mapbox-for-wp')}>
					<RangeControl
						label={__('Zoom', 'mapbox-for-wp')}
						value={zoom}
						onChange={(newZoom) => setAttributes({ zoom: newZoom })}
						min={0}
						max={22}
					/>
					<RangeControl
						label={__('Pitch', 'mapbox-for-wp')}
						value={pitch}
						onChange={(newPitch) =>
							setAttributes({ pitch: newPitch })
						}
						min={0}
						max={60}
					/>
					<RangeControl
						label={__('Bearing', 'mapbox-for-wp')}
						value={bearing}
						onChange={(newBearing) =>
							setAttributes({ bearing: newBearing })
						}
						min={0}
						max={360}
					/>
					<TextControl
						label={__('Longitude', 'mapbox-for-wp')}
						value={longitude}
						onChange={(newLongitude) =>
							setAttributes({ longitude: newLongitude })
						}
					/>
					<TextControl
						label={__('Latitude', 'mapbox-for-wp')}
						value={latitude}
						onChange={(newLatitude) =>
							setAttributes({ latitude: newLatitude })
						}
					/>
					<TextControl
						label={__('Style', 'mapbox-for-wp')}
						value={style}
						onChange={(newStyle) =>
							setAttributes({ style: newStyle })
						}
					/>
					<ToggleControl
						label={__('Hide Controls', 'mapbox-for-wp')}
						checked={hideControls}
						onChange={(newHideControls) =>
							setMapAttributes({
								hideControls: newHideControls,
							})
						}
					/>
					<ToggleControl
						label={__('Static Map', 'mapbox-for-wp')}
						checked={staticMap}
						onChange={(newStaticMap) =>
							setMapAttributes({ staticMap: newStaticMap })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Map
					mapboxToken={mapboxToken}
					mapboxStyle={style || mapboxDefaultStyle}
					mapboxLongitude={longitude}
					mapboxLatitude={latitude}
					mapboxZoom={zoom}
					mapboxPitch={pitch}
					mapboxBearing={bearing}
					mapboxHideControls={hideControls}
					updateCallback={setMapAttributes}
				/>
			</div>
		</>
	);
}
