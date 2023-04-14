import { useState, useRef, useEffect } from "react";
import { apiFetch } from "@wordpress/api";

import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
	const { mapboxToken = "", mapboxStyle = "" } = props;

	const [map, setMap] = useState(null);
	const mapRef = useRef(null);

	useEffect(() => {
		if (map) return;

		mapboxgl.accessToken = mapboxToken;

		const newMap = new mapboxgl.Map({
			container: mapRef.current,
			style: `mapbox://styles/mapbox/${mapboxStyle}`,
			center: [0, 1],
			zoom: 4,
		});

		newMap.addControl(new mapboxgl.NavigationControl());
		newMap.addControl(new mapboxgl.FullscreenControl());

		setMap(newMap);
	}, [map, mapboxToken]);

	return (
		<div>
			<div className="map-container" style={{ height: "500px" }}>
				<div ref={mapRef} style={{ width: "100%", height: "100%" }} />
			</div>
		</div>
	);
};
export default Map;
