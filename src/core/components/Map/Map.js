import { useRef, useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = (props) => {
	const {
		mapboxToken = '',
		mapboxStyle = '',
		mapboxLongitude = 0,
		mapboxLatitude = 0,
		mapboxZoom = 0,
		mapboxPitch = 0,
		mapboxBearing = 0,
		mapboxHideControls = false,
		updateCallback = () => {},
	} = props;

	const mapContainer = useRef(null);
	const map = useRef(null);
	const [mapReady, setMapReady] = useState(false);

	useEffect(() => {
		if (map.current || !mapboxToken) return;

		if (mapboxLongitude === 0 && mapboxLatitude === 0) {
			return;
		}

		mapboxgl.accessToken = mapboxToken;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: mapboxStyle,
			center: [mapboxLongitude, mapboxLatitude],
			zoom: mapboxZoom,
			pitch: mapboxPitch,
			bearing: mapboxBearing,
		});

		map.current.on('moveend', () => {
			const { lng: longitude, lat: latitude } = map.current.getCenter();
			const zoom = map.current.getZoom();
			const pitch = map.current.getPitch();
			const bearing = map.current.getBearing();

			updateCallback({ longitude, latitude, zoom, pitch, bearing });
		});

		setMapReady(true);
	}, [
		map,
		mapboxBearing,
		mapboxLatitude,
		mapboxLongitude,
		mapboxPitch,
		mapboxStyle,
		mapboxToken,
		mapboxZoom,
		updateCallback,
	]);

	useEffect(() => {
		if (!mapReady) return;

		map.current.setCenter(
			new mapboxgl.LngLat(mapboxLongitude, mapboxLatitude)
		);
	}, [mapboxLongitude, mapboxLatitude, mapReady]);

	useEffect(() => {
		if (!mapReady) return;

		map.current.setZoom(mapboxZoom);
	}, [mapboxZoom, mapReady]);

	useEffect(() => {
		if (!mapReady) return;

		map.current.setPitch(mapboxPitch);
	}, [mapboxPitch, mapReady]);

	useEffect(() => {
		if (!mapReady) return;

		map.current.setBearing(mapboxBearing);
	}, [mapboxBearing, mapReady]);

	useEffect(() => {
		if (!mapReady) return;

		map.current.setStyle(mapboxStyle);
	}, [mapboxStyle, mapReady]);

	useEffect(() => {
		if (!mapReady) return;

		if (!mapboxHideControls) {
			const navControl = new mapboxgl.NavigationControl();
			const fullscreenControl = new mapboxgl.FullscreenControl();

			map.current.addControl(navControl);
			map.current.addControl(fullscreenControl);

			return () => {
				map.current.removeControl(navControl);
				map.current.removeControl(fullscreenControl);
			};
		}
	}, [mapboxHideControls, mapReady]);

	if (!mapboxToken) {
		return (
			<div>
				<p>{__('Mapbox not configured.', 'mapbox-for-wp')}</p>
			</div>
		);
	}

	return (
		<div>
			<div className="map-container" style={{ height: '500px' }}>
				<div
					ref={mapContainer}
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
		</div>
	);
};

export default Map;
