import { useRef, useEffect } from 'react';

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
		updateCallback = () => {},
	} = props;

	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current || !mapboxToken) return;

		mapboxgl.accessToken = mapboxToken;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: mapboxStyle,
			center: [mapboxLongitude, mapboxLatitude],
			zoom: mapboxZoom,
			pitch: mapboxPitch,
			bearing: mapboxBearing,
		});

		map.current.addControl(new mapboxgl.NavigationControl());
		map.current.addControl(new mapboxgl.FullscreenControl());

		map.current.on('moveend', () => {
			const { lng: longitude, lat: latitude } = map.current.getCenter();
			const zoom = map.current.getZoom();
			const pitch = map.current.getPitch();
			const bearing = map.current.getBearing();

			updateCallback({ longitude, latitude, zoom, pitch, bearing });
		});
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
		if (!map.current) return;

		map.current.setCenter(
			new mapboxgl.LngLat(mapboxLongitude, mapboxLatitude)
		);
	}, [mapboxLongitude, mapboxLatitude]);

	useEffect(() => {
		if (!map.current) return;

		map.current.setZoom(mapboxZoom);
	}, [mapboxZoom]);

	useEffect(() => {
		if (!map.current) return;

		map.current.setPitch(mapboxPitch);
	}, [mapboxPitch]);

	useEffect(() => {
		if (!map.current) return;

		map.current.setBearing(mapboxBearing);
	}, [mapboxBearing]);

	useEffect(() => {
		if (!map.current) return;

		map.current.setStyle(mapboxStyle);
	}, [mapboxStyle]);

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
