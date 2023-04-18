import { useState, useEffect } from "react";

import Map from "./components/Map/Map";

const App = () => {
	const { mapboxToken = "", mapboxStyle = "" } = mbwp_data || {};

	const [mapboxZoom, setMapboxZoom] = useState(0);
	const [mapboxPitch, setMapboxPitch] = useState(0);
	const [mapboxBearing, setMapboxBearing] = useState(0);

	useEffect(() => {
		const mapboxForWP = document.getElementById("mapbox-for-wp");

		const zoom = mapboxForWP.getAttribute("data-zoom") || 0;
		const pitch = mapboxForWP.getAttribute("data-pitch") || 0;
		const bearing = mapboxForWP.getAttribute("data-bearing") || 0;

		setMapboxZoom(zoom);
		setMapboxPitch(pitch);
		setMapboxBearing(bearing);
	}, []);

	return (
		<div>
			<Map
				mapboxToken={mapboxToken}
				mapboxStyle={mapboxStyle}
				mapboxZoom={mapboxZoom}
				mapboxPitch={mapboxPitch}
				mapboxBearing={mapboxBearing}
			/>
		</div>
	);
};

export default App;
