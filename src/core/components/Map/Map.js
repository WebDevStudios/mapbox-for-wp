import { useState, useRef, useEffect } from "react";
import { apiFetch } from "@wordpress/api";

import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
	const {
		mapboxToken = "",
		mapboxStyle = "",
		mapboxZoom = 0,
		mapboxPitch = 0,
		mapboxBearing = 0,
	} = props;

	const [map, setMap] = useState(null);
	const mapRef = useRef(null);

	useEffect(() => {
		if (map) return;

		mapboxgl.accessToken = mapboxToken;

		const newMap = new mapboxgl.Map({
			container: mapRef.current,
			style: `mapbox://styles/mapbox/${mapboxStyle}`,
			center: [0, 1],
			zoom: mapboxZoom,
			pitch: mapboxPitch,
			bearing: mapboxBearing,
		});

		newMap.addControl(new mapboxgl.NavigationControl());
		newMap.addControl(new mapboxgl.FullscreenControl());

		setMap(newMap);
	}, [map]);

	useEffect(() => {
		if (!map) return;
		map.setZoom(mapboxZoom);
	}, [mapboxZoom]);

	useEffect(() => {
		if (!map) return;
		map.setPitch(mapboxPitch);
	}, [mapboxPitch]);

	useEffect(() => {
		if (!map) return;
		map.setBearing(mapboxBearing);
	}, [mapboxBearing]);

	return (
		<div>
			<div className="map-container" style={{ height: "500px" }}>
				<div ref={mapRef} style={{ width: "100%", height: "100%" }} />
			</div>
		</div>
	);
};
export default Map;
