import { useState, useEffect } from 'react';

import Map from './components/Map/Map';
import StaticMap from './components/Map/StaticMap';

const App = () => {
	const { mapboxToken = '', mapboxDefaultStyle = '' } = mbwpData || {}; // eslint-disable-line no-undef

	const [mapboxLongitude, setMapboxLongitude] = useState(0);
	const [mapboxLatitude, setMapboxLatitude] = useState(0);
	const [mapboxZoom, setMapboxZoom] = useState(0);
	const [mapboxPitch, setMapboxPitch] = useState(0);
	const [mapboxBearing, setMapboxBearing] = useState(0);
	const [mapboxStyle, setMapboxStyle] = useState(mapboxDefaultStyle);
	const [mapboxHideControls, setMapboxHideControls] = useState(false);
	const [mapboxStatic, setMapboxStatic] = useState(false);

	useEffect(() => {
		const mapboxForWP = document.getElementById('mapbox-for-wp');

		const longitude = mapboxForWP.getAttribute('data-longitude') || 0;
		const latitude = mapboxForWP.getAttribute('data-latitude') || 0;
		const zoom = mapboxForWP.getAttribute('data-zoom') || 0;
		const pitch = mapboxForWP.getAttribute('data-pitch') || 0;
		const bearing = mapboxForWP.getAttribute('data-bearing') || 0;

		const style =
			decodeURIComponent(mapboxForWP.getAttribute('data-style')) ||
			mapboxDefaultStyle;

		const hideControls =
			mapboxForWP.getAttribute('data-hide-controls') || false;

		const staticMap = mapboxForWP.getAttribute('data-static-map') || false;

		setMapboxLongitude(longitude);
		setMapboxLatitude(latitude);
		setMapboxZoom(zoom);
		setMapboxPitch(pitch);
		setMapboxBearing(bearing);

		setMapboxStyle(style);

		setMapboxHideControls(hideControls);
		setMapboxStatic(staticMap);
	}, [
		mapboxLongitude,
		mapboxLatitude,
		mapboxZoom,
		mapboxPitch,
		mapboxBearing,
		mapboxStyle,
		mapboxDefaultStyle,
		mapboxHideControls,
		mapboxStatic,
	]);

	if (mapboxStatic) {
		return (
			<div>
				<StaticMap
					mapboxToken={mapboxToken}
					mapboxStyle={mapboxStyle}
					mapboxLongitude={mapboxLongitude}
					mapboxLatitude={mapboxLatitude}
					mapboxZoom={mapboxZoom}
					mapboxPitch={mapboxPitch}
					mapboxBearing={mapboxBearing}
				/>
			</div>
		);
	}

	return (
		<div>
			<Map
				mapboxToken={mapboxToken}
				mapboxStyle={mapboxStyle}
				mapboxLongitude={mapboxLongitude}
				mapboxLatitude={mapboxLatitude}
				mapboxZoom={mapboxZoom}
				mapboxPitch={mapboxPitch}
				mapboxBearing={mapboxBearing}
				mapboxHideControls={mapboxHideControls}
			/>
		</div>
	);
};

export default App;
