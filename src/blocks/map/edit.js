import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

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
	} = attributes || {};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [mapAttributes, setMapAttributes] = useState({
		longitude,
		latitude,
		zoom,
		pitch,
		bearing,
		style,
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setAttributes({ ...mapAttributes });
	}, [mapAttributes, setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Options')}>
					<RangeControl
						label={__('Zoom')}
						value={zoom}
						onChange={(newZoom) => setAttributes({ zoom: newZoom })}
						min={0}
						max={22}
					/>
					<RangeControl
						label={__('Pitch')}
						value={pitch}
						onChange={(newPitch) =>
							setAttributes({ pitch: newPitch })
						}
						min={0}
						max={60}
					/>
					<RangeControl
						label={__('Bearing')}
						value={bearing}
						onChange={(newBearing) =>
							setAttributes({ bearing: newBearing })
						}
						min={0}
						max={360}
					/>
					<TextControl
						label={__('Longitude')}
						value={longitude}
						onChange={(newLongitude) =>
							setAttributes({ longitude: newLongitude })
						}
					/>
					<TextControl
						label={__('Latitude')}
						value={latitude}
						onChange={(newLatitude) =>
							setAttributes({ latitude: newLatitude })
						}
					/>
					<TextControl
						label={__('Style')}
						value={style}
						onChange={(newStyle) =>
							setAttributes({ style: newStyle })
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
					updateCallback={setMapAttributes}
				/>
			</div>
		</>
	);
}
