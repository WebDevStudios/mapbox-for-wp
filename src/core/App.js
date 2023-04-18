import { useState, useEffect } from "react";

import Map from "./components/Map/Map";

const App = () => {
	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};

	const [mapboxCoords, setMapboxCoords] = useState([0, 0]);
	const [mapboxZoom, setMapboxZoom] = useState(0);
	const [mapboxPitch, setMapboxPitch] = useState(0);
	const [mapboxBearing, setMapboxBearing] = useState(0);

	useEffect(() => {
		const mapboxForWP = document.getElementById("mapbox-for-wp");

		const longitude = mapboxForWP.getAttribute("data-longitude") || 0;
		const latitude = mapboxForWP.getAttribute("data-latitude") || 0;

		const zoom = mapboxForWP.getAttribute("data-zoom") || 0;
		const pitch = mapboxForWP.getAttribute("data-pitch") || 0;
		const bearing = mapboxForWP.getAttribute("data-bearing") || 0;

		setMapboxCoords([longitude, latitude]);
		setMapboxZoom(zoom);
		setMapboxPitch(pitch);
		setMapboxBearing(bearing);
	}, []);

	return (
		<div>
			<Map
				mapboxToken={mapboxToken}
				mapboxStyle={mapboxStyle}
				mapboxCoords={mapboxCoords}
				mapboxZoom={mapboxZoom}
				mapboxPitch={mapboxPitch}
				mapboxBearing={mapboxBearing}
			/>
		</div>
	);
};

export default App;
